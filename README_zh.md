#  TyKoa  
目前是一个玩具型 TypeScript + Koa 2 后端API快速开发模版  

# 设计原则  
借助TypeScript的装饰器(decorators), 可以实现类似Java语言的 注解(annotation), 借此来实现类似Spring的自动扫包 / 依赖注入。  

同时，egg / midway等框架虽功能完善，但对初学者研究核心实现不太友好；依赖过多第三方库，导致风险不可控。  
故，自造此玩具模版。将来会把核心功能抽出，单独成为一个npm包。  

> **持续完善中。欢迎贡献代码，一起玩耍。  
开源不难，难的是持续维护**


# 主要特性
> 1. TypeScript + Koa 2
> 1. 自动扫描routes目录下的类, 自动挂载如`@Controller('/modulePath')`(类装饰器)和`@Post('/methodPath')`(方法装饰器)上的路由。
> 1. `@Autowired`装饰器，不必写constructor，不必new， 参见`routes/test.ts`中的`testService`。  
> 1. 无ORM，使用[knex](https://knexjs.org/)操作数据库  
> 1. 使用PostGraphile，自动生成PostgreSQL数据库内的接口
> 1. 配置文件支持，.env为主配置文件 / conf路径下为生产/开发环境中的配置文件，会覆盖.env中的配置项

# 系统要求  
> 1. Node.js v10.x 版本或更新  
> 1. PostgreSQL ( 如前所述，基于knex，稍作修改即可支持其它数据库。但GraphQL / PostGraphile依赖PostgreSQL，如使用其它数据库，GraphQL相关初始化代码也请一并移除 )  

# 使用方法  
postgres数据库中需要有一张名为`user_tb`的表，结构和数据不限  
conf/ 中配置好数据库  
```
npm install  
npm run n
```
默认启动在 `http://localhost:3000/`  
graphiql挂载在 `http://localhost:3000/gql/graphiql`  
graphql挂载在 `http://localhost:3000/gql/graphql`  

其它事宜，参见以上readme，并查看package.json和项目代码。  


# TODO  

> 1. ~~Better routes, like scanning directories then require, using globby~~  
> 1. ~~duplicated route path warning.~~  
> 1. IoC container, using [injection](injection) or [tsyringe](https://github.com/microsoft/tsyringe) or [Inversify](https://github.com/inversify/InversifyJS)
> 1. ~~add service directory~~
> 1. ~~jsonwebtoken~~
> 1. Better README
> 1. Better logger
> 1. Plugins support (like eggjs?..)
> 1. CLI support to quickly generate structure
> 1. RPC


## main third party dependencies:  
> 1. TypeScript + its decorators + reflect-metadata  
> 1. Koa 2
> 1. Knex.js , a SQL query builder
> 1. pg , Postgresql Nodejs driver
> 1. PostGraphile , make GraphQL and Postgres things easy
> 1. dotenv , configurations in .env files


## dev dependencies:  
> 1. nodemon , auto restart node when code changes
> 1. ts-node , execute .ts files without building to .js
> 1. eslint , typescript-eslint ( TSLint is deprecated )
> 1. concurrently , run multiple commands at one time
> 1. open-cli , open URL in browser, through terminal.  

## Other
> inspired by:  
https://github.com/midwayjs/midway/  

> Other similar projects:  
https://github.com/thinkkoa/koatty