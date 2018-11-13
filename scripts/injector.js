'use strict';

const fs = require('hexo-fs');
const pathFn = require('path');
const _ = require('lodash');

const INJECTED_FILES = [
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/jBox/0.4.9/jBox.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jBox/0.4.9/themes/TooltipDark.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jBox/0.4.9/jBox.min.js'
];

/**
 * Fallback as css
 * @param {*} inject 
 * @param {*} path 
 * @param {*} opts 
 */
function injectBasedOnExt(inject, path, opts) {
    if (_.endsWith(path, '.js')) {
        inject.bodyEnd.script({ type: 'text/javascript', src: path }, opts);
    } else {
        // treat anything not ending in js as css
        inject.headEnd.link({ rel: 'stylesheet', href: path }, opts);
    }
}

function Injector(hexo) {
    this.hexo = hexo;
}

Injector.prototype._inject = function (inject) {
    // Inject all third party files
    INJECTED_FILES.forEach(el => {
        if (_.isString(el)) {
            injectBasedOnExt(inject, el);
        } else {
            _.castArray(el.path).forEach(path => {
                injectBasedOnExt(inject, path, { shouldInject: el.shouldInject });
            }, this);
        }
    }, this);

    // Inject all local files found in /assets/theme/inject
    const siteRoot = pathFn.join(__dirname, '..', 'source');
    const injectedAssets = pathFn.join(siteRoot, 'assets', 'theme', 'inject');
    const files = fs.listDirSync(injectedAssets);
    files.map(el => pathFn.join(injectedAssets, el))
        .map(el => pathFn.relative(siteRoot, el))
        .map(el => hexo.config.root + el)
        .forEach(el => injectBasedOnExt(inject, el));
};

Injector.prototype.register = function () {
    var { hexo, _inject } = this;

    hexo.extend.filter.register('inject_ready', _inject.bind(this));
};

new Injector(hexo).register()