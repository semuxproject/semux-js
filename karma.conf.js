const merge = require('lodash').merge;
const commons = require('./karma.common.conf');

module.exports = function(config) {
  config.set(merge(commons, {

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-electron-launcher',
      'karma-safari-launcher',
      'karma-ie-launcher',
      'karma-edge-launcher',
      "karma-rollup-preprocessor",
      "karma-transform-path-preprocessor",
      'karma-mocha',
      "karma-mocha-reporter",
      "karma-sourcemap-loader"
    ],

    customLaunchers: {
      IE11: {
        base: 'IE',
        'x-ua-compatible': 'IE=edge'
      }
    },

    browsers: ["Chrome", "Firefox", "Electron"],

    client: {
      useIframe: false,
      captureConsole: true
    },

    concurrency: 8,

  }));
}