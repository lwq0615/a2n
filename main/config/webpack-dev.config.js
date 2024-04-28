const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const config = require(path.resolve(process.cwd(), './a2n.config.js'))


module.exports = {
  mode: 'development',
  target: 'node',
  entry: [path.resolve(__dirname, "../start.ts"), 'webpack/hot/poll?1000'],
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /[\.ts?|\.js?]$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
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
        cwd: JSON.stringify(process.cwd()),
        componentScan: JSON.stringify(config.componentScan),
        a2nConfig: JSON.stringify(config)
      }
    }), 
    new HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      // 启动的文件
      name: 'a2n.serve.js'
    })
  ]
};