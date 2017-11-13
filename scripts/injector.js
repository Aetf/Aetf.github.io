'use strict';

const fs = require('hexo-fs');
const pathFn = require('path');
const _ = require('lodash');

const KATEX_INLINE_MARKER = "<span class=\"katex\">";
const KATEX_BLOCK_MARKER = "<span class=\"katex-display\">";

function shouldInjectKaTex (src) {
    var should = src.indexOf(KATEX_INLINE_MARKER) >= 0 || src.indexOf(KATEX_BLOCK_MARKER) >= 0;
    return should;
}

function Injector(hexo) {
    this.hexo = hexo;
}

Injector.prototype._inject = function (inject) {
    const css = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.css';
    inject.headEnd.link({ rel: 'stylesheet', href: css }, { shouldInject: shouldInjectKaTex });

    const siteRoot = pathFn.join(__dirname, '..', 'source');
    const injectedAssets = pathFn.join(siteRoot, 'assets', 'theme', 'inject');
    const files = fs.listDirSync(injectedAssets);
    files.map(el => pathFn.join(injectedAssets, el))
        .map(el => pathFn.relative(siteRoot, el))
        .map(el => hexo.config.root + el)
        .forEach(el => {
        if (_.endsWith(el, '.js')) {
            inject.bodyEnd.script({ type: 'text/javascript', src: el });
        } else if (_.endsWith(el, '.css')) {
            inject.headEnd.link({ rel: 'stylesheet', href: el });
        }
    });
};

Injector.prototype.register = function () {
    var { hexo, _inject } = this;

    hexo.extend.filter.register('inject_ready', _inject.bind(this));
};

new Injector(hexo).register()