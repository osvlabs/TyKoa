import { router } from './router'

router.get('/test/1', async (ctx, next) => {
  ctx.body = 'Hello World 1!' + JSON.stringify(ctx.header);
  await next()
});
router.get('/test/2', async (ctx, next) => {
  ctx.body = 'Hello World 2!' + JSON.stringify(ctx.header);
  await next()
});

export { router, router as default}