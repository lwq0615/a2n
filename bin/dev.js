#!/usr/bin/env node

const webpack = require("webpack")
const webpackConfigHot = require("../main/config/webpack-hot.config")

webpack(webpackConfigHot).watch({
  aggregateTimeout: 300
}, (err, stats) => {
  if(err || stats.errors) {
    console.error(err || stats.errors)
  }
});

