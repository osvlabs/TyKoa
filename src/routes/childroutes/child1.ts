import { router } from './router'

router.get('/test/1', async (ctx, next) => {
  ctx.body = 'Hello World Child 1!' + JSON.stringify(ctx.header);
  await next()
});
router.get('/test/2', async (ctx, next) => {
  ctx.body = 'Hello World Child 2!' + JSON.stringify(ctx.header);
  await next()
});

export { router, router as default}