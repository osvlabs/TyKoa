
import Koa from 'koa'
import { pg } from '../db/index'
import { initPostgraphile } from './initKoa'
import { initRoute } from './initRoute'


async function init(app: Koa): Promise<void> {
  initPostgraphile(app)
  const waitPg = async (): Promise<void> => {
    await pg.select(pg.raw('1'))
    // eslint-disable-next-line no-console
    console.log('data base connected')
  }
  await waitPg()
  initRoute(app)
}

export { init, init as default }
export * from './initKoa'
export * from './initRoute'
