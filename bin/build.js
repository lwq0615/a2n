#!/usr/bin/env node

const webpack = require("webpack")
const webpackConfig = require("../main/config/webpack.config")


webpack(webpackConfig, (err, stats) => {
  if(err || stats.errors) {
    console.error(err || stats.errors)
  }
})

