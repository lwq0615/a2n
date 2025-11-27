<h1 align="center">a2n</h1>

<div align="center">
  
基于Spring设计理念开发的NodeJs服务端框架（>=V2.1.0）

[NPM][npm-url]&nbsp;&nbsp;&nbsp;&nbsp;[Github][github-url]

[npm-url]: https://www.npmjs.com/package/a2n
[github-url]: https://github.com/lwq0615/a2n
[a2n-export-plugin-url]: https://github.com/lwq0615/a2n-export-plugin

</div>

## ✨ 语言

- 🌍 基于 NodeJs+Express+TS 进行开发
- 🌈 采用了 Java 语言 Spring 框架的设计理念

## ✨ 特性

- 🌍 无需配置即可快速启动项目
- 🔨 实现了 Spring 中 AOP，IOC，自动配置等主要的功能
- 🌈 支持自定义装饰器
- 📦 自动追踪的全局ctx上下文
- 🔨 根据文件目录和类结构自动生成接口

## 📦 快速开始

- 初始化 npm 环境

```bash
npm init
```

- 安装依赖

```bash
npm install a2n
```

- package.json 添加启动命令

```json
"scripts": {
  "dev": "a2n dev",
  "build": "a2n build",
  "pnpm:init": "a2n pnpm:init"
}
```

> 如果使用的是pnpm，需要在install后运行`pnpm pnpm:init`

- 运行服务

```bash
npm run dev
```

- 打包

```bash
npm run build
```

> 打包后的产物在根目录`dist`文件夹内，入口文件为`a2n.serve.js`，通过`node dist/a2n.serve.js`运行

## 🔨 项目结构

- 配置文件 a2n.config.js

> a2n.config.js 为项目配置文件，配置项如下，a2n有一份默认的配置文件，如果需要修改覆盖它，只需要在项目根目录创建名为 a2n.config.js 的文件

```js
module.exports = {
  // 全局接口前缀
  baseUrl: '/api',
  // 导出接口的前缀
  apiExportBaseUrl: '',
  // 组件扫描路径，该路径下的js,ts文件将会被容器扫描，默认src
  componentScan: 'src',
  // 服务启动端口号，默认8080
  port: 8088,
  // 一些自定义的配置项
  datasource: {
    url: 'mysql:127.0.0.1:3306'
  },
  // webpack配置，值可以是以下两种情况
  // 1.一个object，会通过webpack-merge与默认webpack配置进行合并
  // 2.也可以是一个函数，入参: [程序提供的默认webpack配置, webpack-merge的merge函数]，返回值：最终的webpack配置
  webpack: {
    ...
  } || (baseWebpackConfig, merge) => ({...})
}
```

- ts语言配置

> 在项目启动时，程序会在根目录默认生成一份ts配置文件，通过修改根目录下的 tsconfig.json 配置ts语言能力。

## 🔨 配置环境变量

> 在 2.0.4 版本中，a2n 集成了 dotenv 插件，可以自定义环境变量，在项目启动时，程序会自动加载根目录下的 .env 文件，该文件内容会注入到 process.env 中，如果需要自定义环境变量，可以通过命令行指定 -e 或者 --env 参数指定自定义的环境变量文件。

- package.json

```js
"scripts": {
  // 不指定 -e 或 --env，默认读取根目录下 .env 文件
  "dev": "a2n dev",
  // 指定任意的参数名称，例如 --env production，读取根目录下 .env.production 文件
  "build": "a2n dev --env production"
},
```

- .env

```env
APP_TITLE = a2n服务端框架
```

- 在程序中获取环境变量值

```ts
console.log(process.env.APP_TITLE)
```

> 优先级：通过 -e 或 --env 指定的配置文件如果存在同名参数，则会覆盖默认的 .env 文件

## 🌈 如何使用

> 在根目录下创建 src 文件夹（a2n.config.js 中配置的 componentScan 属性，此处以 src 为例），在 src 文件夹下创建 .ts 或 .js 文件，并 export
> default 导出默认 Class，该 Class 将会被容器扫描注册

### 编写接口

```ts
import { Control, Get, Query, Post, Body, Put, Req, Res, Request, Response } from 'a2n'

/**
 * 使用@Control标记一个Class
 * Class下的@Get，@Post，@Delete，@Put，@RequestMapping方法都会被注册为接口，方法return的值作为接口返回值
 */
@Control('/user')
export default class UserControl {
  @Get('/get')
  get(@Query query: any, @Query('name') name: string) {
    // 使用@Query注入url携带的参数，@Query("name")表示注入url参数中名称为name的参数
    return query.name
  }

  @Post('/post')
  get1(@Body body: any, @Body('name') name: string) {
    // 使用@Body注入请求报文携带的参数，@Body("name")表示注入请求报文中名称为name的参数
    return body
  }

  @Put('/put')
  get1(@Req request: Request, @Res response: Response) {
    // 使用@Req注入请求对象，@Res注入响应对象
    // 请求和响应对象使用参考express的Request、Response使用方法 https://nodejs.cn/express/4x/api/req/
  }
}
```

### 依赖注入

```ts
import { Autowired, Bean, Config, PostConstruct, BeanScope, Scope, getBean, getBeans } from 'a2n'
import RoleService from './RoleService'
import OtherBean from './OtherBean'

// @Service将该类交给bean容器管理，与@Bean具有相同的功能，只是命名不同
@Service
// @Scope定义了bean的创建方式，BeanScope.PROTOTYPE：多例，每次获取创建新的bean
// BeanScope.REQUEST，每个请求生成一次bean
// BeanScope.SINGLETON（默认），在单例池生成bean，每次从单例池获取
@Scope(BeanScope.PROTOTYPE)
export default class UserServicer {
  // 获取一个RoleService类型的bean注入到role属性
  // 从2.0.15版本开始，可以省略Autowired的装饰器参数，根据ts类型进行注入
  @Autowired
  role: RoleService

  // 从a2n.config.js配置文件中查询datasource.url注入到url属性中
  @Config('datasource.url')
  url: string = null

  @PostConstruct
  init() {
    // bean创建并完成依赖注入后，将会执行@PostConstruct的内容
    console.log(this.role)
    console.log(this.url)
  }

  async getUser() {
    // 可以通过getBean手动获取bean
    const other = await getBean<OtherBean>(OtherBean)
    // getBeans会获取所有属于或者继承自OtherBean的bean
    const others = await getBeans<OtherBean>(OtherBean)
  }
}
```

### 拦截器

```ts
import { Bean, Interceptor, Context } from 'a2n'

/**
 * 继承Interceptor类并注入到容器中，该类会被注册为拦截器
 * return false拦截请求
 */
@Bean
export default class AuthInterceptor extends Interceptor {
  /**
   * 拦截器校验方法
   * @param req 请求对象
   * @param ctx 请求上下文
   * @returns false：拦截，true：不拦截
   */
  async doFilter(req: Request, ctx: Context): boolean {
    // 从2.1.0版本开始，doFilter的第二个参数变更为ctx，ctx内包含了之前的所有参数内容
    if (ctx.request.baseUrl === '/user') {
      return true
    } else {
      return false
    }
  }
}
```

### 自动配置

a2n也提供了SpringBoot中的自动配置功能，通过`yarn add`或者`npm i`（暂不支持pnpm）添加到node_modules的依赖包中，如果包含`__a2n.inject.js`文件，则a2n会自动查找并引入该文件。因此，只要在该文件中引入Bean相关代码，在安装此依赖包时，相关的Bean都会被自动注入容器中

> 以下是开发一个简单的a2n依赖包的案例

- 创建一个npm项目（a2n-dep），在项目根目录创建`__a2n.inject.js`文件，在该文件内引入需要自动注入到容器中的bean
  ![image](https://github.com/user-attachments/assets/aac856be-e3ee-4b9c-8ef3-8aa37d70e070)

- 编写src/User.ts代码，不需要安装a2n直接引入，并使用@Bean装饰器（如果`a2n-dep`项目中需要引入其他依赖，请添加依赖到`peerDependencies`中）

```ts
import { AppLifecycle, Bean } from 'a2n'

// 继承AppLifecycle的bean都会被注册为生命周期管理器
@Bean
export default class AppLife extends AppLifecycle {
  // 在a2n启动完成后触发该函数
  afterAppStart() {
    console.log('dep start')
  }
  // 在a2n程序关闭时触发函数
  afterAppClose() {
    console.log('app close')
  }
}
```

- 效果：当一个a2n项目引入此依赖包（yarn add a2n-dep或npm i a2n-dep）后，a2n项目启动成功后，会打印`dep start`

### 自定义装饰器

通过自定义装饰器，配合Aspect切面实现对函数的精准切面控制

- 定义一个自定义装饰器，装饰需要切入的函数

```ts
import { Bean, Context, getContext, registerCustomDecorator } from 'a2n'

export const CustomAspect: MethodDecorator = (target, name) => {
  registerCustomDecorator(CustomAspect, target, name)
}

@Bean
export default class UserService {
  @CustomAspect
  getUser(query: any) {
    const ctx: Context = getContext()
    return ctx.request.path
  }
}
```

- 添加一个切面类，在被`CustomAspect`装饰的函数执行前插入逻辑

```ts
import { Aspect, Before } from 'a2n'
import { CustomAspect } from '@/src/UserService'

@Aspect
export default class AspectHandler {
  @Before(CustomAspect)
  before() {
    console.log('before')
  }
}
```

- 至此，调用任何装饰了`CustomAspect`的bean函数，都会触发`AspectHandler.before`逻辑，例如`UserService.getUser`函数，

### ApiExport自动生成接口

快速将一个类的所有函数导出为接口，主要目的是配合[a2n-export-plugin][a2n-export-plugin-url]插件使用

```ts
// src/api-export.ts
import { ApiExport, ApiExportRequest } from '@core/control/api-export'

@ApiExport
export default class ExportApi extends ApiExportRequest {
  async getName(id: number, age: number) {
    return [id, age]
  }
}
```

在以上demo中，通过为类添加@ApiExport装饰器，生成如下接口

- url: /api-export/getName <br/>
- body: [id, age]

> - url的生成规则：baseUrl+apiExportBaseUrl+文件路径+函数名（baseUrl和apiExportBaseUrl来源于a2n配置文件，文件路径为基于componentScan的相对路径）
>   <br/>
> - body参数的规则：body传参固定为数组，数组中的每个元素会被解构到函数的入参

请求接口

```ts
axios.post('/api-export/getName', [id, age])
```
