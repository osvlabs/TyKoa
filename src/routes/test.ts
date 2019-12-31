/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-default */
import { Next, ParameterizedContext, default as Koa } from 'koa'
import { db } from '../db'

import {
  Controller, Get,
} from '../decorators'

@Controller()
export default class TestController {
  @Get('test1')
  async someGetMethod(ctx: Koa.BaseContext, next: Next): Promise<void> {
    const result = await db.table('user_tb').select('*')
    ctx.body = `Hello World 1!${JSON.stringify(result)}`
    await next()
  }

  @Get('')
  async someGetMethod2(ctx: ParameterizedContext<any>, next: Next): Promise<void> {
    ctx.body = `Hello World 2!${JSON.stringify(ctx.header)}`
    await next()
  }
}
