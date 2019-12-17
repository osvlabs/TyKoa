import 'reflect-metadata'
import './init/initEnv'
import { initKoa, init } from './init/index'
import * as routes from './routes/index'

import './decorators/index'

/* eslint-disable func-names */
const main = async function (): Promise<void> {
  const app = initKoa()
  const api: any = routes
  Object.keys(api).forEach((v) => {
    if (api[v] && api[v].router) { // api[v] is a module alias
      app.use(api[v].router.routes())
    } else if (api[v] && api[v].routes && api[v].get) { // api[v] is a router / Router instance
      app.use(api[v].routes())
    }
  })
  await init(app)
  // eslint-disable-next-line no-console
  console.log(process.env.DB_PG_PORT)
  app.listen(3000)
}

main()
