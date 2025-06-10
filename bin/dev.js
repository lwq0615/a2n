#!/usr/bin/env node

function dev(options, args) {
  try {
    const webpack = require('webpack')
    const { webpackDevConfig } = require('../main/config/webpack-dev.config')
    const webpackConfig = webpackDevConfig(options, args)

    webpack(webpackConfig, (err, stats) => {
      if (err || stats?.compilation?.errors?.length) {
        console.error(err || stats?.compilation?.errors)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = dev