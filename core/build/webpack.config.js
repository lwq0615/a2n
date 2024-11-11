const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
  mode: 'production',
  target: 'node',
  entry: './core/index.ts',
  module: {
    rules: [
      {
        test: /[.ts?|.js?]$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@core': path.resolve(process.cwd(), './core'),
      '@': path.resolve(process.cwd(), './'),
    },
  },
  output: {
    filename: 'a2n.core.js',
    path: path.resolve(process.cwd(), './core/dist'),
    library: 'a2n',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
}