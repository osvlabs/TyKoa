/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-default */
import { Next, ParameterizedContext, default as Koa } from 'koa'
import { db } from '../../db'

import {
  Controller, Get,
} from '../../decorators'

@Controller('/child')
export default class TestController {
  @Get('/test/1')
  async someGetMethod(ctx: Koa.BaseContext, next: Next): Promise<void> {
    const result = await db.table('user_tb').select('*')
    ctx.body = `Hello World Child 1!${JSON.stringify(result)}`
    await next()
  }

  @Get('/test/2')
  async someGetMethod2(ctx: ParameterizedContext<any>, next: Next): Promise<void> {
    ctx.body = `Hello World Child 2!${JSON.stringify(ctx.header)}`
    await next()
  }
}
