/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-default */
import { Next, default as Koa } from 'koa'
import { TestService } from '../services'
import {
  Controller, Get, Autowired, Post,
} from '../decorators'
import { getConfig } from '../util'


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

  @Post()
  login(ctx: Koa.Context, next: Next): Promise<void> {
    const { username, password } = ctx.request.body
    if (username === '1' && password === '1') {
      const token = ctx.jwt.sign(
        { username },
        getConfig('SECRET'),
        {
          expiresIn: '24h', // expires in 24 hours
        },
      )
      ctx.body = { token }
      return next()
    }
    ctx.response.status = 401
    ctx.body = 'login failed'
    return next()
  }
}
