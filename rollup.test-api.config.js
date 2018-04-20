const merge = require("lodash").merge;
const path = require('path');

module.exports = merge(require("./rollup.test.config"), {
  input: path.resolve(__dirname, 'test', 'api', 'index.ts'),
  output: {
    file: path.resolve(__dirname, 'test', 'api', 'index.js')
  }
});