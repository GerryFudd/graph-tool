/*
 The following was shamelessly copied and adapted from the react-bootstrap library.
 ~ https://github.com/react-bootstrap/react-bootstrap/blob/v0.32.4/tools/build.js ~
 */
const fse = require('fs-extra');
const execa = require('execa');
const path = require('path');

const clean = async dir => fse.existsSync(dir) && fse.remove(dir);

const step = (name, root, fn) => async () => {
  console.log(`Building: ${name}`);
  await clean(root);
  await fn();
  console.log(`Built: ${name}`);
};

const libRoot = path.resolve(__dirname, '../lib');
const srcRoot = path.resolve(__dirname, '../src/components');
const buildLib = step('commonjs modules', libRoot, () =>
  execa.shell(`npx babel ${srcRoot} --out-dir ${libRoot} --env-name "lib"`, {
    stdio: ['pipe', 'pipe', 'inherit']
  })
);

buildLib().catch(err => {
  if (err) {
    console.error(err.message);
  }
  process.exit(1);
});
