
import Koa from 'koa'
import { db } from '../db/index'
import { initPostgraphile } from './initKoa'
import { initRoute } from './initRoute'


async function init(app: Koa): Promise<void> {
  initPostgraphile(app)
  const waitDb = async (): Promise<void> => {
    await db.select(db.raw('1'))
    // eslint-disable-next-line no-console
    console.log('data base connected')
  }
  await waitDb()
  initRoute(app)
}

export { init, init as default }
export * from './initKoa'
export * from './initRoute'
