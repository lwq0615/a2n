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
const { getDevConfig } = require('../main/config/a2n-config')
const { exec } = require('./exec')

/**
 * 生成ts配置文件
 */
function initTs(options) {
  const a2nConfig = getDevConfig(options?.config)
  const tsConfigPath = path.resolve(process.cwd(), './tsconfig.json')
  if (fs.existsSync(tsConfigPath)) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    console.info(symbols.info, chalk.hex('#4e8ed3')('create config file for ts'))
    const tsconfigTemplate = path.resolve(__dirname, '../tsconfig.json')
    fs.readFile(tsconfigTemplate, async (err, data) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      // data 是二进制类型，需要转换成字符串
      const content = data.toString()
      const tsConfig = JSON.parse(content)
      tsConfig.compilerOptions.paths = {
        '@/*': [`./${a2nConfig.componentScan}/*`.replaceAll('\\', '/').split('/').filter(Boolean).join('/')],
      }
      fs.writeFile(
        tsConfigPath,
        JSON.stringify(tsConfig, null, 2),
        {
          flag: 'w',
        },
        (err) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve()
        },
      )
    })
  })
}

program
  .name('a2n')
  .version(pkg.version)
  .usage('<command> [args]')
  .option('-e, --env <name>', 'set env name')
  .option('-c, --config <file>', 'set config file')
program
  .command('dev')
  .description('start server')
  .action((options, command) => {
    initTs(program.opts()).then(() => dev(program.opts(), command.args))
  })
program
  .command('build')
  .description('build server')
  .action((options, command) => {
    initTs(program.opts()).then(() => build(program.opts(), command.args))
  })
program
  .command('pnpm:init')
  .description('init pnpm dependencies')
  .action(async (options, command) => {
    const installCmd = Object.keys(pkg.dependencies).reduce((cmd, dep) => {
      return cmd + ` ${dep}@${pkg.dependencies[dep]}`
    }, 'pnpm install')
    await exec(installCmd)
  })
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()
