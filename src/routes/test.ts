/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-default */
import { Next, default as Koa } from 'koa'
import { db } from '../db'

import {
  Controller, Get, Autowired,
} from '../decorators'
import TestService from './testService'

@Controller()
export default class TestController {
  @Autowired()
  public testService: TestService

  @Get('test1')
  async someGetMethod(ctx: Koa.Context, next: Next): Promise<void> {
    const result = await db.table('user_tb').select('*')
    ctx.body = `Hello World 1!${JSON.stringify(result)} ${this.testService.testMethod('666')}`
    await next()
  }

  @Get('')
  async someGetMethod2(ctx: Koa.Context, next: Next): Promise<void> {
    ctx.body = `Hello World 2!${JSON.stringify(ctx.header)}`
    await next()
  }
}
