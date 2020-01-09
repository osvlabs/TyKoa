import Koa, { Next, Middleware } from 'koa'
import * as jwt from 'jsonwebtoken'
import { getConfig } from '../util'

function errorResponse(ctx: Koa.Context): void {
  ctx.response.status = 401
  ctx.response.body = 'Bad Authorization header format. Format is "Authorization: Bearer <token>"'
}

function initAuth(app: Koa): Middleware {
  if (app.context && !app.context.jwt) {
    // eslint-disable-next-line no-param-reassign
    app.context.jwt = jwt
  }
  const middleware = function auth(ctx: Koa.Context, next: Next): Promise<void> | void {
    if (
      ctx.request.path === '/login'
      // warning: gql path is open
      || String(ctx.request.path).match(/\/gql.*/)
    ) {
      return next()
    }
    if (!ctx.header || !ctx.header.authorization) {
      return errorResponse(ctx)
    }
    const parts = ctx.header.authorization.split(' ')
    if (parts.length === 2) {
      const scheme = parts[0]
      const credentials = parts[1]

      if (/^Bearer$/i.test(scheme)) {
        ctx.state.credentials = credentials
        try {
          const decoded = jwt.verify(credentials, getConfig('SECRET'))
          ctx.state.decoded = decoded
          return next()
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        }
      }
    }
    errorResponse(ctx)
  }
  return middleware
}

export { initAuth, initAuth as default }
