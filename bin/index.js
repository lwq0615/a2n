#!/usr/bin/env node

// 命令行工具
const { program } = require('commander')
const pkg = require('../package.json')
const dev = require('./dev')
const build = require('./build')


program.name('a2n')
  .version(pkg.version)
  .usage('<command> [args]')
program.command('dev')
  .description('start server')
  .action((options, command) => {
    dev(command.args)
  })
program.command('build')
  .description('build server')
  .action((options, command) => {
    build(command.args)
  })
program.parse(process.argv)
// 当没有输入参数的时候给个提示
if (program.args.length < 1) return program.help()
