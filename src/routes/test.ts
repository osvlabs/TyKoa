/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-default */
import { Next, default as Koa } from 'koa'
import { TestService } from '../services'
import {
  Controller, Get, Autowired,
} from '../decorators'

@Controller()
export default class TestController {
  @Autowired()
  public testService: TestService

  @Get('test1')
  async someGetMethod(ctx: Koa.Context, next: Next): Promise<void> {
    const result = await this.testService.dbService()
    ctx.body = `Hello World 1!${JSON.stringify(result)} ${this.testService.testMethod(666)}`
    await next()
  }

  @Get('')
  someGetMethod2(ctx: Koa.Context): void{
    ctx.body = `Hello World 2!${JSON.stringify(ctx.header)}`
  }

  @Get('db')
  async someGetMethod3(ctx: Koa.Context): Promise<void> {
    ctx.body = await this.testService.dbService()
  }
}
