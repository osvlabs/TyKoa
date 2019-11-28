import 'reflect-metadata'
import Koa from 'koa'
import * as routes from './routes/index'
import Router from '@koa/router';
const app = new Koa();

// logger

app.use(async (ctx, next) => {       
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
const api: {
  [key: string]: {
    router: Router<any, {}>
  }
} = routes
Object.keys(api).forEach(v => {
  app.use(api[v].router.routes())
})

app.listen(3000);