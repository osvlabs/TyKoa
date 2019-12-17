import Koa from 'koa'
import Router from '@koa/router'
import {
  mapRoute, PATH_METADATA,
} from '../decorators'
import TestController from '../routes/test'

function initRoute(app: Koa): void {
  const routerOption = {
    // TODO prefix /xxx check
    prefix: Reflect.getMetadata(PATH_METADATA, TestController) || '',
  }
  const router = new Router(routerOption)

  const infoArr = mapRoute(new TestController())
  // TODO globby folder scan
  infoArr.forEach((routeClass: any) => {
    router[String(routeClass.method).toLowerCase()](routeClass.route, routeClass.fn)
  })
  app.use(router.routes())
}

export { initRoute, initRoute as default }
