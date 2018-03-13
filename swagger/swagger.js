const path = require('path');
const fs = require('fs');
const pom = path.resolve('semux', 'pom.xml');
const swaggerJson = path.resolve('semux', 'target', 'swagger-ui', 'swagger.json');
const SemuxAPI = path.resolve('lib', 'SemuxAPI.ts');
const assert = require('assert');

function generateSwaggerJson() {
  const mvn = require('maven').create({
    cwd: path.resolve(".", "semux")
  });
  return mvn
    .execute(["clean", "package"], {"skipTests": true})
    .then(() => assert(fs.existsSync(swaggerJson)), `${swaggerJson} file doesn't exist.`);
}

function generateTypescript(file) {
  assert(fs.existsSync(swaggerJson), `${swaggerJson} file doesn't exist.`);
  // TODO
  return Promise.resolve(fs.writeFileSync(SemuxAPI, tsSourceCode));
}

/**
assert(fs.existsSync(pom), `${pom} file doesn't exist.`);
generateSwaggerJson()
  .then(() => generateTypescript(swaggerJson))
  .catch(err => console.error(err));
 */
generateTypescript(swaggerJson)