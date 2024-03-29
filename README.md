<h1 align="center">a2n</h1>

<div align="center">
  
一套基于Spring设计理念开发的NodeJs服务端框架。

[NPM][npm-url]&nbsp;&nbsp;&nbsp;&nbsp;[Github][github-url]

[npm-url]: https://www.npmjs.com/package/a2n
[github-url]: https://github.com/lwq0615/a2n
  
</div>

> 作为一名软件开发搬砖仔，今年年初毕业后找了一份前端开发的工作，技术栈主要是 Vue，虽然工作内容只有前端，但是自己也是懂一些后端。平时我比较倾向于用 Java Spring 来写接口，在深入学习 Spring 的设计理念之后，就想着自己也写一个实用的框架出来，但是 Java 出色的框架已经很多了，我也不是专业的 Java 工程师，所以选择了使用 Node 来开发一个服务端框架，对 Node 感兴趣的小伙伴可以前往 Github 或者 NPM 下载体验。

## ✨ 特性

- 🌍 基于 NodeJs+Express 进行开发。
- 🌈 采用了 Java 语言 Spring 框架的设计理念，实现了 Spring 中 AOP，IOC 等主要的功能。
- ⚙️ 在体验 Spring 设计模式的同时，又可以使用 npm 强大的插件功能。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- 📦 如果你曾经是一个Java程序员并且有一定的Js基础，那么可以以极低的学习成本使用a2n进行开发。

## 📦 搭建

- 安装脚手架

```bash
npm install a2n-cli -g
```

- 初始化项目基础代码环境

```bash
a2n-cli create <project-name>
```

- 进入项目目录

```bash
cd <project-name>
```

- 安装依赖

```bash
npm install
```

- 启动服务

```bash
npm run dev
```

- 打包

```bash
npm run build
```

## 🔨 项目结构

- 配置文件 a2n.config.js

```js
module.exports = {
  // 全局接口前缀
  baseUrl: '/api',
  // 组件扫描路径，该路径下的js,ts文件将会被容器扫描，默认src
  componentScan: 'src',
  // 服务启动端口号
  port: 8088,
  // 一些自定义的配置项
  datasource: {
    url: '123lll'
  }
}
```

- 启动入口 main

> main 目录下的文件为项目启动和打包相关的文件，start.ts 为入口文件，config 中为本地开发和打包时的 webpack 配置文件，由于本地开发环境需要实现代码热更新，因此将 webpack 配置文件进行拆分。

- ts语言配置

> 通过根目录下的 tsconfig.json 配置ts语言能力。

## 🌈 如何使用

### 编写接口

```ts
import { Control, Get, Query, Post, Body, Put, Req, Res, Request, Response } from 'a2n';

/**
 * 使用@Control标记一个Class
 * Class下的@Get，@Post，@Delete，@Put，@RequestMapping方法都会被注册为接口，方法return的值作为接口返回值
 */
@Control("/user")
export default class UserControl{

  @Get("/get")
  get(@Query query: any, @Query("name") name: string){
    // 使用@Query注入url携带的参数，@Query("name")表示注入url参数中名称为name的参数
    return query.name
  }

  @Post("/post")
  get1(@Body body: any, @Body("name") name: string){
    // 使用@Body注入请求报文携带的参数，@Body("name")表示注入请求报文中名称为name的参数
    return body
  }

  @Put("/put")
  get1(@Req request: Request, @Res response: Response){
    // 使用@Req注入请求对象，@Res注入响应对象
    // 请求和响应对象使用参考express的Request、Response使用方法 https://nodejs.cn/express/4x/api/req/
  }

}
```

### 依赖注入

```ts
import { Autowired, Bean, Config, PostConstruct, BeanScope, Scope, getBean, getBeans } from "a2n";
import RoleService from "./RoleService";
import OtherBean from "./OtherBean";

// @Service将该类交给bean容器管理，与@Bean具有相同的功能，只是命名不同
@Service
// @Scope定义了bean的创建方式，BeanScope.PROTOTYPE：多例，每次获取创建新的bean
// BeanScope.SINGLETON（默认），在单例池生成bean，每次从单例池获取
@Scope(BeanScope.PROTOTYPE)
export default class UserServicer {

  // 获取一个RoleService类型的bean注入到role属性
  @Autowired(RoleService)
  role: any = null

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
import { Bean, Interceptor, Request, Response, BeanClass } from "a2n";

/**
 * 继承Interceptor类并注入到容器中，该类会被注册为拦截器
 * return false拦截请求
 */
@Bean
export default class AuthInterceptor extends Interceptor {

  /**
   * 拦截器校验方法
   * @param req 请求对象
   * @param res 响应对象
   * @param Cons 请求进入的Control类
   * @param methodName 请求进入Control的方法名
   * @returns false：拦截，true：不拦截
   */
  doFilter(req: Request, res: Response, Cons: BeanClass, methodName: string): boolean {
    if(req.baseUrl === "/user") {
      return true
    }else {
      return false
    }
  }

}
```
