/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-default */
import { Next, ParameterizedContext, default as Koa } from 'koa'
import { pg } from '../db'

import {
  Controller, Get, Post,
} from '../decorators'

@Controller()
export default class TestController {
  @Get('/test/1')
  async someGetMethod(ctx: Koa.BaseContext, next: Next): Promise<void> {
    const result = await pg.table('user_tb').select('*')
    ctx.body = `Hello World 1!${JSON.stringify(result)}`
    await next()
  }

  @Post('/test/2')
  async somePostMethod(ctx: ParameterizedContext<any>, next: Next): Promise<void> {
    ctx.body = `Hello World 2!${JSON.stringify(ctx.header)}`
    await next()
  }
}
