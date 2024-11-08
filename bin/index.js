#!/usr/bin/env node

// 命令行工具
const { program } = require('commander')
const pkg = require('../package.json')
const dev = require('./dev')
const build = require('./build')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const symbols = require('log-symbols')
const { getDevConfig } = require('../main/config/getConfig')


/**
 * 生成ts配置文件
 * @param onSuccess 生成ts成功后事件
 */
function initTs(onSuccess, options) {
  const tsconfigPath = path.resolve(process.cwd(), './tsconfig.json')
  if (!fs.existsSync(tsconfigPath)) {
    console.info(symbols.info, chalk.hex('#4e8ed3')('create tsconfig.json file'))
    const tsconfigTemplate = path.resolve(__dirname, '../tsconfig.json')
    fs.readFile(tsconfigTemplate, async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      // data 是二进制类型，需要转换成字符串
      const content = data.toString()
      const tsConfig = JSON.parse(content)
      const a2nConfig = getDevConfig(options?.config)
      tsConfig.compilerOptions.paths = {
        '@/*': [`./${a2nConfig.componentScan}/*`.replaceAll('\\', '/').split('/').join('/')],
      }
      fs.writeFile(tsconfigPath, JSON.stringify(tsConfig, null, 2), {
        flag: 'w',
      }, (err) => {
        if (err) {
          console.error(err)
          return
        }
        onSuccess()
      })
    })
  } else {
    onSuccess()
  }
}


program.name('a2n')
  .version(pkg.version)
  .usage('<command> [args]')
  .option('-e, --env <name>', 'set env name')
  .option('-c, --config <file>', 'set config file')
program.command('dev')
  .description('start server')
  .action((options, command) => {
    initTs(() => dev(program.opts(), command.args), program.opts())
  })
program.command('build')
  .description('build server')
  .action((options, command) => {
    initTs(() => build(program.opts(), command.args), program.opts())
  })
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()


