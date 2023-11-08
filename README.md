<h1 align="center">a2n</h1>

<div align="center">
一套基于Spring设计理念开发的NodeJs服务端框架。
</div>

## ✨ 特性

- 🌍 基于 NodeJs+Express 进行开发。
- 🌈 采用了 Java 语言 Spring 框架的设计理念，实现了 Spring 中 AOP，IOC 等主要的功能。
- ⚙️ 在体验 Spring 设计模式的同时，又可以使用 npm 强大的插件功能。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- 📦 如果你曾经是一个Java程序员并且有一定的Js基础，那么可以以极低的学习成本使用a2n进行开发。

## 📦 搭建

* 安装脚手架
```bash
npm install a2n-cli -g
```

* 初始化项目基础代码环境
```bash
a2n-cli create <project-name>
```

* 进入项目目录
```bash
cd <project-name>
```

* 安装依赖
```bash
npm install
```

## 🔨 项目结构

- 配置文件 a2n.config.js
```js
module.exports = {
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

> main 目录下的文件为项目启动和打包的入口文件，由于打包和本地开发的运行环境不同，因此使用不同的入口文件。项目的本地运行环境通过 ts-node 实现，入口文件为 main/tsnode.ts，打包构建最终程序时使用的是 webpack，入口文件为 main/start.ts。

- ts语言配置

> 通过根目录下的 tsconfig.json 配置ts语言能力。


## 🌈 如何使用

### 编写接口

```ts
import { Control, Get, Query, Post, Body, Put, Req, Res, Request, Response } from 'a2n';

/**
 * 使用@Control标记一个Clas
 * Class下的@Get，@Post，@Delete，@Put方法都会被注册为接口，方法return的值作为接口返回值
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

[项目地址](https://github.com/lwq0615/a2n)&nbsp;&nbsp;&nbsp;&nbsp;

