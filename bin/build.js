#!/usr/bin/env node

function build(options, args) {
  try {
    const webpack = require('webpack')
    const { webpackBuildConfig } = require('../main/config/webpack-build.config')
    const webpackConfig = webpackBuildConfig(options, args)

    webpack(webpackConfig, (err, stats) => {
      if (err || stats?.compilation?.errors?.length) {
        console.error(err || stats?.compilation?.errors)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = build
