module.exports = function(config) {
  config.set({
    basePath: '.',

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      "karma-rollup-preprocessor",
      "karma-transform-path-preprocessor",
      'karma-mocha',
      "karma-mocha-reporter",
      "karma-sourcemap-loader"
    ],

    browsers: ['Chrome', "Firefox"],

    frameworks: ['mocha'],

    reporters: ['mocha'],

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

    concurrency: 8
  })
}