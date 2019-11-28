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
// const api: {
//   [key: string]: {
//     router: Router<any, {}>
//   }
// } = routes
const api: any = routes
Object.keys(api).forEach(v => {
  if (api[v] && api[v].router) { // api[v] is a module alias
    app.use(api[v].router.routes())
  }else if (api[v] && api[v].routes && api[v].get) { // api[v] is a router / Router instance
    app.use(api[v].routes())
  }
})

app.listen(3000);