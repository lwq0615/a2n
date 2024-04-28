const path = require('path');
const { getWebConfig } = require('./main/config/webpack.config.js');
const nodeExternals = require('webpack-node-externals');
const { HotModuleReplacementPlugin } = require('webpack')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const webpack = require("webpack")


const webpackConfig =  getWebConfig({
  entry: ["./main/start.ts", 'webpack/hot/poll?1000'],
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@core': path.resolve(__dirname, "./core"),
      '@': path.resolve(__dirname, "./"),
      'a2n': path.resolve(__dirname, "./core")
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
