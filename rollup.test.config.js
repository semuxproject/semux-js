module.exports = {
  input: 'test/index.ts',
  output: {
    file: 'test/index.js',
    format: 'iife',   // Helps prevent naming collisions.
    name: 'SemuxTest',    // Required for 'iife' format.
    sourcemap: true,
  },
  plugins: [
    require('rollup-plugin-glob-import')(),
  ].concat(require('./rollup.config').plugins).concat([require('rollup-plugin-istanbul')({
    exclude: ['src/**/*.spec.ts', 'node_modules']
  })]),
};