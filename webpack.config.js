const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'a2n',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};