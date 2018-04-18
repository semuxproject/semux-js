module.exports = function(config) {
  config.set({
    basePath: '.',

    plugins: [
      'karma-browserstack-launcher',
      "karma-rollup-preprocessor",
      "karma-transform-path-preprocessor",
      'karma-mocha',
      "karma-mocha-reporter",
      "karma-sourcemap-loader"
    ],

    browserStack: {
      project: 'semux-js-sdk',
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_KEY
    },

    browsers: [
      // in command line
    ],

    customLaunchers: {
      'safari_11': {
        'base': 'BrowserStack',
        'os' : 'OS X',
        'os_version' : 'High Sierra',
        'browser' : 'Safari',
        'browser_version' : '11.0'
      },
      'safari_10': {
        'base': 'BrowserStack',
        'os' : 'OS X',
        'os_version' : 'Sierra',
        'browser' : 'Safari',
        'browser_version' : '10.0'
      },
      'safari_9.1': {
        'base': 'BrowserStack',
        'os' : 'OS X',
        'os_version' : 'El Capitan',
        'browser' : 'Safari',
        'browser_version' : '9.1'
      },
      'ie_11': {
        'base': 'BrowserStack',
        'os' : 'Windows',
        'os_version' : '7',
        'browser' : 'IE',
        'browser_version' : '11.0'
      },
      'edge_16': {
        'base': 'BrowserStack',
        'os' : 'Windows',
        'os_version' : '10',
        'browser' : 'Edge',
        'browser_version' : '16.0'
      },
      'chrome_65': {
        'base': 'BrowserStack',
        'os' : 'Windows',
        'os_version' : '10',
        'browser' : 'Chrome',
        'browser_version' : '65.0'
      },
      'firefox_59': {
        'base': 'BrowserStack',
        'os' : 'Windows',
        'os_version' : '10',
        'browser' : 'Firefox',
        'browser_version' : '59.0'
      },
      'ios_5.1': {
        'base': 'BrowserStack',
        real_mobile: false,
        device: 'iPhone 4S',
        os: 'ios',
        'os_version': '5.1',
        'browser_version': null,
        browser: 'Mobile Safari'
      },
      'ios_6.0': {
        'base': 'BrowserStack',
        real_mobile: false,
        device: 'iPhone 4S (6.0)',
        os: 'ios',
        'os_version': '6.0',
        'browser_version': null,
        browser: 'Mobile Safari'
      },
      'ios_7.0': {
        'base': 'BrowserStack',
        real_mobile: false,
        device: 'iPhone 5S',
        os: 'ios',
        'os_version': '7.0',
        'browser_version': null,
        browser: 'Mobile Safari'
      },
      "android_4.4": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '4.4',
        'device' : 'Google Nexus 5',
        'real_mobile' : true,
      },
      "android_5.0": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '5.0',
        'device' : 'Samsung Galaxy S6',
        'real_mobile' : true,
      },
      "android_6.0": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '6.0',
        'device' : 'Google Nexus 6',
        'real_mobile' : true,
      },
      "android_7.0": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '7.0',
        'device' : 'Samsung Galaxy S8',
        'real_mobile' : true,
      },
      "android_7.1": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '7.1',
        'device' : 'Samsung Galaxy Note 8',
        'real_mobile' : true,
      },
      "android_8.0": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '8.0',
        'device' : 'Google Pixel',
        'real_mobile' : true,
      }
    },

    frameworks: ['mocha'],

    reporters: ['mocha'],

    port: 9876,

    files: [
      { pattern: "test/index.ts", watched: false }
    ],

    preprocessors: {
      "test/index.ts": ['rollup', 'transformPath']
    },

    rollupPreprocessor: {
      output: {
        format: 'iife',   // Helps prevent naming collisions.
        name: 'SemuxTest',    // Required for 'iife' format.
        sourcemap: "inline"
      },
      plugins: [require('rollup-plugin-glob-import')()].concat(require('./rollup.config').plugins),
    },

    transformPathPreprocessor: {
      transformer: path => path.replace(/\.ts$/i, ".js")
    },

    singleRun: true,

    concurrency: 1,

    browserNoActivityTimeout: 100000
  })
}