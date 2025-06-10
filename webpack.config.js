const path = require('path')
const { getWebConfig, getDevWebConfig } = require('./main/config/webpack.base.js')
const webpack = require('webpack')
const pkg = require('./package.json')

const webpackConfig = getWebConfig(
  getDevWebConfig({
    resolve: {
      alias: {
        '@core': path.resolve(__dirname, './core'),
        '@': path.resolve(__dirname, './'),
        [pkg.name]: path.resolve(__dirname, './core'),
      },
    },
  }),
)

try {
  webpack(webpackConfig, (err, stats) => {
    if (err || stats.errors) {
      console.error(err || stats.errors)
    }
  })
} catch (err) {
  console.error(err)
}
