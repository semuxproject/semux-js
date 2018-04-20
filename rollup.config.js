const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sourceMaps = require('rollup-plugin-sourcemaps');
const typescript = require('rollup-plugin-typescript2');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');
const json = require('rollup-plugin-json');

const pkg = require('./package.json');

const libraryName = 'Semux';

module.exports = {
  input: `index.ts`,
  output: [
    {file: pkg.main, name: libraryName, format: 'umd', sourcemap: true},
    {file: pkg.module, format: 'es', sourcemap: true}
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [
  ],
  plugins: [
    json({
      include: 'node_modules/**',
      preferConst: true,
    }),

    builtins(),

    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),

    // node.globals
    globals(),

    // Compile TypeScript files
    typescript({useTsconfigDeclarationDir: true, tsconfig: "./tsconfig.json"}),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};