#!/usr/bin/env node

try {
  const webpack = require("webpack")
  const webpackConfig = require("../main/config/webpack.config")

  webpack(webpackConfig, (err, stats) => {
    if (err || stats.errors) {
      console.error(err || stats.errors)
    }
  })
} catch (err) {
  console.error(err)
}