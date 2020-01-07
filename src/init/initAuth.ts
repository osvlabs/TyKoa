import Koa, { Next, Middleware } from 'koa'
import * as jwt from 'jsonwebtoken'

function initAuth(app: Koa): Middleware {
  if (app.context && !app.context.jwt) {
    // eslint-disable-next-line no-param-reassign
    app.context.jwt = jwt
  }
  // eslint-disable-next-line consistent-return
  const middleware = function auth(ctx: Koa.Context, next: Next): Promise<void> | void {
    if (!ctx.header || !ctx.header.authorization) {
      return next()
    }
    const parts = ctx.header.authorization.split(' ')
    if (parts.length === 2) {
      const scheme = parts[0]
      const credentials = parts[1]

      if (/^Bearer$/i.test(scheme)) {
        ctx.state.credentials = credentials
        return next()
      }
    }
    ctx.response.status = 401
    ctx.response.body = 'Bad Authorization header format. Format is "Authorization: Bearer <token>"'
  }
  return middleware
}

export { initAuth, initAuth as default }
