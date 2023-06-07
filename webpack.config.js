import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');


export default {
  mode: 'development',
  target: 'node',
  entry: './packages/core/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'packages/core')
    }
  },
  output: {
    filename: 'a2n.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'a2n',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};