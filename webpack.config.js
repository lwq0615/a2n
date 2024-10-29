const path = require('path');
const { getWebConfig } = require('./main/config/webpack.config.js');
const nodeExternals = require('webpack-node-externals');
const { HotModuleReplacementPlugin } = require('webpack')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const webpack = require("webpack")
const pkg = require('./package.json')


const webpackConfig =  getWebConfig({
  entry: ["./main/start.ts", 'webpack/hot/poll?1000'],
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, "./core"),
      '@': path.resolve(__dirname, "./"),
      [pkg.name]: path.resolve(__dirname, "./core")
    }
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      // 启动的文件
      name: 'a2n.serve.js'
    })
  ]
})

try {
  webpack(webpackConfig).watch({
    aggregateTimeout: 300
  }, (err, stats) => {
    if (err || stats.errors) {
      console.error(err || stats.errors)
    }
  });
} catch (err) {
  console.error(err)
}
