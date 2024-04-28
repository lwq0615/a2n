const { getWebConfig } = require('./webpack.config.js');
const path = require('path');

module.exports = getWebConfig({
  mode: 'production',
  entry: [path.resolve(__dirname, "../start.ts")]
})