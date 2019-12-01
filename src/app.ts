import 'reflect-metadata'
import'./init/initEnv'
import { initKoa, initPostgraphile } from './init/'
import * as routes from './routes/'
// import Router from '@koa/router';
import { pg} from './db/'

const app = initKoa()
initPostgraphile(app)

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

const waitPg = async (): Promise<void> => {
  await pg.select(pg.raw("1"))
  console.log('data base connected')
  app.listen(3001);
}

waitPg()

console.log(process.env.DB_PG_PORT)
