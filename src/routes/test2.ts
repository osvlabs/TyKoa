import { router } from './router'
import { pg } from '../db/pg'


router.get('/test/3', async (ctx, next) => {
  ctx.body = `Hello World 3!${JSON.stringify(ctx.header)}`
  await next()
})
router.get('/test/4', async (ctx, next) => {
  const result = await pg.table('user_tb').select('*')
  ctx.body = `Hello World 4!${JSON.stringify(result)}`
  await next()
})

export { router, router as default }
