import Koa from 'koa'
import Router from '@koa/router'
import fs from 'fs'
import path from 'path'
import {
  mapRoute, PATH_METADATA,
} from '../decorators'
import TestController from '../routes/test'

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
  routeFiles.forEach(async (v) => {
    const clazz = await import(v)
    // eslint-disable-next-line no-console
    console.log(clazz)
    const Controller = clazz.default
    if (!Controller || typeof Controller === 'object') return
    const routerOption = {
      // TODO prefix /xxx check
      prefix: Reflect.getMetadata(PATH_METADATA, Controller) || '',
    }
    const router = new Router(routerOption)
    const infoArr = mapRoute(new Controller())
    console.log(infoArr)
    // TODO globby folder scan
    infoArr.forEach((routeClass) => {
      router[String(routeClass.method).toLowerCase()](routeClass.route, routeClass.fn)
    })
    console.log(router.routes())
    app.use(router.routes())
  })
}

export { initRoute, initRoute as default }
