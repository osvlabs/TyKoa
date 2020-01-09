#  TyKoa  
A quickstart template for TypeScript + Koa 2    

# Feature  
> 1. TypeScript + Koa 2
> 1. Auto scan routes, configure routes using `@Controller('/path')` above class,  and `@Post('/subPath')` above each function ( other HTTP methods are also supported )  

# System Requirements  
> 1. Node.js latest v10.x or newer  
> 1. PostgreSQL ( if you use MySQL, need to configure right driver for knex, and disable PostGraphile manually )  

# Usage  

1. first things first, input postgres configurations in `conf/local`  
1. then:  
```
npm install  
npm run n (dev mode)  
open http://localhost:3000/test/2  

( or, open http://localhost:3000/test/1 , you should ensure you have a table named `user_tb` first )  
  
-----------------------------------------------------------

npm run build ( use tsc to build codes for production )
npm start (run compiled codes for production)
```

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