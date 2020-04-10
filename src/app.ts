import 'reflect-metadata'
import './init/initEnv'
import { initKoa, init } from './init/index'

import './decorators/index'

/* eslint-disable func-names */
const main = async function (): Promise<void> {
  const app = initKoa()

  await init(app)
  // eslint-disable-next-line no-console
  console.log(process.env.DB_MYSQL_PORT)
  app.listen(3000)
}

main()
