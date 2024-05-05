const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { getAssignConfig } = require('./a2nDefaultConfig');
const dotenv = require('dotenv');
const pkg = require("../../package.json")

let a2nConfig = {}
try {
  a2nConfig = getAssignConfig(require(path.resolve(process.cwd(), './a2n.config.js')))
} catch (err) {
  console.log('tip: config file "' + path.resolve(process.cwd(), './a2n.config.js') + '" not exist!')
  console.log('tip: use defalut config\n')
  a2nConfig = getAssignConfig()
}

/**
 * 获取webpack配置文件
 * @param options 启动参数
 * @param args 启动命令参数
 * @returns webpack配置文件
 */
function getWebConfig(webpackConfig, options, args) {
  const env = dotenv.config({
    path: path.resolve(process.cwd(), '.env'), // 环境变量配置文件路径
    encoding: 'utf8', // 编码方式，默认utf8
    debug: false, // 是否开启debug，默认false
  }).parsed;

  // 自定义环境变量配置文件
  if (options?.env) {
    const customEnv = dotenv.config({
      path: path.resolve(process.cwd(), '.env.' + options.env),
      encoding: 'utf8',
      debug: false
    }).parsed;
    Object.assign(env, customEnv)
  }

  Object.keys(env).forEach(key => {
    env[key] = JSON.stringify(env[key])
  })

  const baseConfig = {
    mode: 'development',
    target: 'node',
    module: {
      rules: [
        {
          test: /[\.ts?|\.js?]$/,
          use: 'ts-loader',
          include: path.resolve(__dirname, "../start.ts"),
        },
        {
          test: /[\.ts?|\.js?]$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ],
    },
    output: {
      filename: 'a2n.serve.js',
      path: path.resolve(__dirname, "../../dist"),
      library: 'a2n',
      libraryTarget: 'umd'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new DefinePlugin({
        'process.env': {
          ...env,
          cwd: JSON.stringify(process.cwd()),
          componentScan: JSON.stringify(a2nConfig.componentScan),
          a2nConfig: JSON.stringify(a2nConfig),
          npmName: JSON.stringify(pkg.name)
        }
      })
    ]
  };
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

module.exports = {
  getWebConfig
}