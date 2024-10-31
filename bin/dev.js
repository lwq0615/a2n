#!/usr/bin/env node

function dev(options, args) {
  try {
    const webpack = require('webpack')
    const { webpackDevConfig } = require('../main/config/webpack-dev.config')
    const webpackConfig = webpackDevConfig(options, args)

    webpack(webpackConfig).watch({
      aggregateTimeout: 300,
    }, (err, stats) => {
      if (err || stats?.compilation?.errors) {
        console.error(err || stats?.compilation?.errors)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = dev