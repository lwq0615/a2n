#!/usr/bin/env node

function build(options, args) {
  try {
    const webpack = require("webpack")
    const { webpackBuildConfig } = require("../main/config/webpack-dev.config")
    const webpackConfig = webpackBuildConfig(options, args)

    webpack(webpackConfig, (err, stats) => {
      if (err || stats.errors) {
        console.error(err || stats.errors)
      }
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = build