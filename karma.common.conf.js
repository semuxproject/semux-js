module.exports = {
  basePath: '.',

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

  browserNoActivityTimeout: 100000
};