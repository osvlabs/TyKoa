import Koa from 'koa'
import * as routes from '../routes/index'

function initRoute(app: Koa): void {
  const api: any = routes
  Object.keys(api).forEach((v) => {
    if (api[v] && api[v].router) { // api[v] is a module alias
      app.use(api[v].router.routes())
    } else if (api[v] && api[v].routes && api[v].get) { // api[v] is a router / Router instance
      app.use(api[v].routes())
    }
  })
}

export { initRoute, initRoute as default }
