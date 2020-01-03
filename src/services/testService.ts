import { db } from '../db'

class TestService {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // eslint-disable-next-line class-methods-use-this
  testMethod(param): string {
    return `${param} called`
  }

  async dbService(): Promise<any []> {
    const result = await db.table('user_tb').select('*')
    return result
  }
}

export { TestService, TestService as default }
