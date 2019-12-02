/* eslint-disable new-cap */
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { isFunction } from 'lodash'

function isConstructor(f) {
  try {
    Reflect.construct(String, [], f)
  } catch (e) {
    return false
  }
  return true
}

const METHOD_METADATA = 'method'
const PATH_METADATA = 'path'

const Controller = (path: string): ClassDecorator => (target): void => {
  Reflect.defineMetadata(PATH_METADATA, path, target)
}

// eslint-disable-next-line max-len
const createMappingDecorator = (method: string) => (path: string): MethodDecorator => (target, key, descriptor): void => {
  Reflect.defineMetadata(PATH_METADATA, path, descriptor.value!)
  Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value!)
}

const Get = createMappingDecorator('GET')
const Post = createMappingDecorator('POST')

function mapRoute(instance: Record<string, any>): object {
  const prototype = Object.getPrototypeOf(instance)

  // 筛选出类的 methodName
  const methodsNames = Object.getOwnPropertyNames(prototype)
    .filter((item) => !isConstructor(item) && isFunction(prototype[item]))
  return methodsNames.map((methodName) => {
    const fn = prototype[methodName]

    // 取出定义的 metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn)
    const method = Reflect.getMetadata(METHOD_METADATA, fn)
    return {
      route,
      method,
      fn,
      methodName,
    }
  })
}

@Controller('/testController')
class SomeClass {
  @Get('/aa')
  someGetMethod() {
    return 'hello world'
  }

  @Post('/bb')
  somePostMethod() {}
}


console.log(Reflect.getMetadata(PATH_METADATA, SomeClass))

console.log(mapRoute(new SomeClass()))
