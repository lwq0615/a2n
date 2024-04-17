#!/usr/bin/env node

const webpack = require("webpack")
const webpackConfig = require("../main/config/webpack.config")


webpack(webpackConfig, (err, stat) => {
  if(err) {
    console.error(err)
  }
})

