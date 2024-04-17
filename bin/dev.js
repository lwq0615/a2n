#!/usr/bin/env node

const webpack = require("webpack")
const webpackConfigHot = require("../main/config/webpack-hot.config")

webpack(webpackConfigHot).watch({
  // watchOptions
  aggregateTimeout: 300,
}, (err, stats) => {
  if(err) {
    console.error(err)
  }
});

