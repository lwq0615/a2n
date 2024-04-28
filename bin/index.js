#!/usr/bin/env node

// 命令行工具
const { program } = require('commander')
const pkg = require('../package.json')
const dev = require('./dev')
const build = require('./build')
const path = require('path')
const fs = require('fs')

/**
 * 生成ts配置文件
 * @param onSuccess 生成ts成功后事件
 */
function initTs(onSuccess) {
  const tsconfigPath = path.resolve(process.cwd(), './tsconfig.json')
  if (!fs.existsSync(tsconfigPath)) {
    console.log("create tsconfig.json file")
    const tsconfigTemplate = path.resolve(__dirname, '../tsconfig.json')
    fs.readFile(tsconfigTemplate, async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      // data 是二进制类型，需要转换成字符串
      const content = data.toString()
      fs.writeFile(tsconfigPath, content, {
        flag: 'w'
      }, (err) => {
        if (err) {
          console.error(err)
          return
        }
        onSuccess()
      })
    })
  }else {
    onSuccess()
  }
}


program.name('a2n')
  .version(pkg.version)
  .usage('<command> [args]')
program.command('dev')
  .description('start server')
  .action((options, command) => {
    initTs(() => dev(command.args))
  })
program.command('build')
  .description('build server')
  .action((options, command) => {
    initTs(() => build(command.args))
  })
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()


