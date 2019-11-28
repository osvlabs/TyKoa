import { router } from './router'

router.get('/test/3', async (ctx, next) => {
  ctx.body = 'Hello World 3!' + JSON.stringify(ctx.header);
  await next()
});
router.get('/test/4', async (ctx, next) => {
  ctx.body = 'Hello World 4!' + JSON.stringify(ctx.header);
  await next()
});

export { router, router as default}