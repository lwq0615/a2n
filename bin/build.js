#!/usr/bin/env node

function build(args) {
  try {
    const webpack = require("webpack")
    const webpackConfig = require("../main/config/webpack-build.config")

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