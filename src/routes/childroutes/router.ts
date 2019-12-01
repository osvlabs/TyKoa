import Router from '@koa/router'

const router = new Router()
router.prefix('/child')
export { router, router as default }
