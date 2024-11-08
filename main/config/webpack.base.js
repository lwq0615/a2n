const path = require('path')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')
const { getDevConfig } = require('./getConfig')
const dotenv = require('dotenv')
const pkg = require('../../package.json')
const fs = require('fs')
const { HotModuleReplacementPlugin } = require('webpack')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const defaultConfigFile = path.resolve(__dirname, './a2n.default.config.js')

/**
 * 获取webpack配置文件
 * @param options 启动参数
 * @param args 启动命令参数
 * @returns webpack配置文件
 */
function getWebConfig(webpackConfig, options, args) {
  // 配置文件
  let a2nConfigPath = path.resolve(
    process.cwd(),
    options?.config || './a2n.config.js'
  )
  if (!fs.existsSync(a2nConfigPath)) {
    console.info('tip: config file "' + a2nConfigPath + '" not exist!')
    console.info('tip: use default config\n')
    a2nConfigPath = defaultConfigFile
  }
  const a2nConfig = getDevConfig(options?.config)
  const env = dotenv.config({
    path: path.resolve(process.cwd(), '.env'), // 环境变量配置文件路径
    encoding: 'utf8', // 编码方式，默认utf8
    debug: false, // 是否开启debug，默认false
  }).parsed

  // 自定义环境变量配置文件
  if (options?.env) {
    const customEnv = dotenv.config({
      path: path.resolve(process.cwd(), '.env.' + options.env),
      encoding: 'utf8',
      debug: false,
    }).parsed
    Object.assign(env, customEnv)
  }

  Object.keys(env).forEach((key) => {
    env[key] = JSON.stringify(env[key])
  })

  const baseConfig = {
    mode: 'development',
    target: 'node',
    module: {
      rules: [
        { include: path.resolve(__dirname, '../start.ts') },
        { exclude: /node_modules/ },
      ].map((item) => {
        return merge(
          {
            test: /[.ts?|.js?]$/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: false, // 设置为 false 进行完整类型检查，报错时中断构建
                  configFile: path.resolve(process.cwd(), './tsconfig.json'),
                },
              },
            ],
          },
          item
        )
      }),
    },
    output: {
      filename: 'a2n.serve.js',
      path: path.resolve(__dirname, '../../dist'),
      library: 'a2n',
      libraryTarget: 'umd',
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
    stats: 'errors-only',
    plugins: [
      new CleanWebpackPlugin(),
      new DefinePlugin({
        'process.env': {
          ...env,
          cwd: JSON.stringify(process.cwd()),
          componentScan: JSON.stringify(a2nConfig.componentScan),
          a2nConfigPath: JSON.stringify(a2nConfigPath),
          npmName: JSON.stringify(pkg.name),
        },
      }),
      new FriendlyErrorsWebpackPlugin(),
    ],
  }
  // 基于当前环境的webpack配置文件，此时还没有与a2n.config.js的webpack配置合并
  const envWebpackConfig = merge(baseConfig, webpackConfig)
  if (a2nConfig.webpack) {
    // 合并a2n.config.js自定义的webpack配置
    if (typeof a2nConfig.webpack === 'function') {
      return a2nConfig.webpack(envWebpackConfig, merge)
    } else {
      return merge(envWebpackConfig, a2nConfig.webpack)
    }
  } else {
    return envWebpackConfig
  }
}

// 开发环境热更新相关配置
function getDevWebConfig(config) {
  return merge(
    {
      devtool: 'source-map',
      devServer: {
        hot: true,
      },
      watch: true,
      watchOptions: {
        aggregateTimeout: 1000,
        poll: 1000,
      },
      plugins: [
        new HotModuleReplacementPlugin(),
        new RunScriptWebpackPlugin({
          // 启动的文件
          name: 'a2n.serve.js',
        }),
      ],
    },
    config
  )
}

module.exports = {
  getWebConfig,
  getDevWebConfig,
}
