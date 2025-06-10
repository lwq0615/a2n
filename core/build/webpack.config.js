const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

const getConfig = (type) => {
  return {
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
    experiments: {
      outputModule: type === 'module',
    },
    output: {
      path: path.resolve(process.cwd(), './core/dist'),
      filename: `a2n.core.${type === 'module' ? 'm' : 'c'}js`,
      library: {
        // name: 'a2n',
        type: type,
      },
    },
    plugins: [type === 'commonjs' && new CleanWebpackPlugin()],
  }
}

function build(type) {
  return new Promise((resolve, reject) => {
    try {
      webpack(getConfig(type), (err, stats) => {
        if (err || stats?.compilation?.errors?.length) {
          reject(err || stats?.compilation?.errors)
        } else {
          resolve()
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

build('commonjs')
  .then(() => {
    return build('module')
  })
  .then(() => {
    console.log('build success')
  })
  .catch((err) => {
    console.error(err)
  })
