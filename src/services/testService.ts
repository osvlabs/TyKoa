import { db } from '../db'

class TestService {
  testMethod(param): string {
    return `${param} called`
  }

  async dbService(): Promise<any []> {
    const result = await db.table('user_tb').select('*')
    return result
  }
}

export { TestService, TestService as default }
