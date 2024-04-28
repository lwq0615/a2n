#!/usr/bin/env node

function dev(args) {
  try {
    const webpack = require("webpack")
    const webpackConfigHot = require("../main/config/webpack-dev.config")

    webpack(webpackConfigHot).watch({
      aggregateTimeout: 300
    }, (err, stats) => {
      if (err || stats.errors) {
        console.error(err || stats.errors)
      }
    });
  } catch (err) {
    console.error(err)
  }
}

module.exports = dev