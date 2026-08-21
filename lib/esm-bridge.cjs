'use strict';

const pathFn = require('path');
const { pathToFileURL } = require('url');

// Hexo runs files under scripts/ as CJS text in a vm sandbox, where ESM syntax
// and direct dynamic import() are unavailable (hexojs/hexo#5525). Each script is
// therefore a one-line CJS stub calling this bridge, which lives outside the vm
// and can import() the real ESM module from lib/. Delete the stubs and this file
// once hexo loads ESM scripts natively (hexojs/hexo#5820).
exports.load = function load(hexo, relToLib) {
    const url = pathToFileURL(pathFn.join(__dirname, relToLib));
    return import(url.href).then(m => m.default(hexo));
};
