/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-default */
import { Next, default as Koa } from 'koa'
import { db } from '../../db'

import {
  Controller, Get,
} from '../../decorators'

@Controller('child')
export default class TestController {
  // sub folder name / file name / class name counts nothing in route path
  // only method's name will be part of route if no route sepecified
  @Get('test/1')
  async someGetMethod(ctx: Koa.Context, next: Next): Promise<void> {
    const result = await db.table('user_tb').select('*')
    ctx.body = `Hello World Child 1!${JSON.stringify(result)}`
    await next()
  }

  @Get()
  async someGetMethod2(ctx: Koa.Context, next: Next): Promise<void> {
    ctx.body = `Hello World Child 2!${JSON.stringify(ctx.header)}`
    await next()
  }
}
