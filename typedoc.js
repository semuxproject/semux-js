module.exports = {
  name: "semux-js",
  out: "docs",
  target: "es5",
  theme: "default",
  mode: "file",
  excludeNotExported: true,
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: false,
  ignoreCompilerErrors: "lib",
  includeDeclarations: false,
  include: [
    "src/index.ts"
  ],
  exclude: [
    "node_modules/**/*",
  ],
};