import Koa from 'koa'
import Router from '@koa/router'
import fs from 'fs'
import path from 'path'
import {
  mapRoute, PATH_METADATA,
} from '../decorators'

function getFiles(dir: string): Array<string> {
  const result: Array<any> = []
  // current searching dir
  let currentDir = ''
  // relative dir compared with current initRoute.ts
  let relativeDir = '../routes'

  function deepFind(innerDir: string): Array<string> {
    const direntArr = fs.readdirSync(innerDir, { withFileTypes: true })
    direntArr.forEach((dirent) => {
      if (dirent.isFile()) {
        currentDir = path.join(innerDir, dirent.name, '../')
        relativeDir = path.relative(__dirname, currentDir).replace(/\\/g, '/')
        result.push(`${relativeDir}/${dirent.name.replace('.ts', '')}`)
      } else if (dirent.isDirectory()) {
        currentDir = path.join(innerDir, dirent.name)
        relativeDir = path.relative(__dirname, currentDir).replace(/\\/g, '/')
        deepFind(currentDir)
      }
    })
    return result
  }
  return deepFind(dir)
}

function initRoute(app: Koa): void {
  const routeFiles = getFiles(path.join(process.cwd(), 'src/routes'))
  // console.log(routeFiles)
  const routeArr: Array<string> = []
  routeFiles.forEach(async (v) => {
    let clazz
    try {
      clazz = await import(v)
    } catch (error) {
      throw new Error(error)
      return
    }
    // eslint-disable-next-line no-console
    // console.log(clazz)
    // TODO non default export detect
    const Controller = clazz.default
    if (!Controller || typeof Controller === 'object') return
    if (!Reflect.hasMetadata('path', Controller)) return
    const routerOption = {
      // TODO prefix /xxx check
      prefix: Reflect.getMetadata(PATH_METADATA, Controller) || '',
    }
    // TODO refact prepend /
    if (routerOption.prefix && String(routerOption.prefix)[0] !== '/') {
      routerOption.prefix = `/${routerOption.prefix}`
    }
    // one Class create one Router
    const router = new Router(routerOption)
    const controllerInstance = new Controller()
    const infoArr = mapRoute(controllerInstance)
    // console.log(infoArr)
    // TODO globby folder scan
    infoArr.forEach((routeMethod) => {
      // TODO duplicated route path scan / cache , warning
      // router.get() / router.post() / ...
      let routePath = routeMethod.route
      // TODO refact prepend /
      if (routePath && String(routePath)[0] !== '/') {
        routePath = `/${routePath}`
      }
      // if @Get('') or @Get() , no route info, use method name instead
      if (!routePath) {
        routePath = `/${routeMethod.fn.name || ''}`
      }
      // duplicated route check
      const fullRoutePath = `${routerOption.prefix}${routePath}`
      // console.log(fullRoutePath)
      if (routeArr.includes(fullRoutePath)) {
        throw new Error('duplicated routes detected')
      } else {
        routeArr.push(fullRoutePath)
      }
      // mount routes
      router[String(routeMethod.method).toLowerCase()](
        routePath,
        // if no .bind , `this` inside controller (route class) methods is `undefined`
        routeMethod.fn.bind(controllerInstance),
      )
    })
    // console.log(router.routes())
    app.use(router.routes())
  })
}

export { initRoute, initRoute as default }
