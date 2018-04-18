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
      /**
      "safari_11",
      "safari_10",
      "safari_9.1",
      "ie_11",
      "edge_16",
      "chrome_65",
      "firefox_59",
      "iphone_7",
      "iphone_8",
      "android_4.4",
      "android_5",
      "android_6",
      "android_7.0",
      "android_7.1",
      "android_8.0",
       **/
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
      'iphone_7': {
        'base': 'BrowserStack',
        'os': 'ios',
        'os_version' : '10.3',
        'device' : 'iPhone 7',
        'real_mobile' : 'true',
      },
      'iphone_8': {
        'base': 'BrowserStack',
        'os': 'ios',
        'os_version' : '11.0',
        'device' : 'iPhone 8',
        'real_mobile' : 'true',
      },
      "android_4.4": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '4.4',
        'device' : 'Google Nexus 5',
        'real_mobile' : 'true',
      },
      "android_5": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '5.0',
        'device' : 'Samsung Galaxy S6',
        'real_mobile' : 'true',
      },
      "android_6": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '6.0',
        'device' : 'Google Nexus 6',
        'real_mobile' : 'true',
      },
      "android_7.0": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '7.0',
        'device' : 'Samsung Galaxy S8',
        'real_mobile' : 'true',
      },
      "android_7.1": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '7.1',
        'device' : 'Samsung Galaxy Note 8',
        'real_mobile' : 'true',
      },
      "android_8.0": {
        'base': 'BrowserStack',
        'os': 'android',
        'os_version' : '8.0',
        'device' : 'Google Pixel',
        'real_mobile' : 'true',
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