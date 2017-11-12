'use strict';

const KATEX_INLINE_MARKER = "<span class=\"katex\">";
const KATEX_BLOCK_MARKER = "<span class=\"katex-display\">";

function Injector(hexo) {
    this.hexo = hexo;
}

Injector.prototype._shouldInject = function (src) {
    var should = src.indexOf(KATEX_INLINE_MARKER) >= 0 || src.indexOf(KATEX_BLOCK_MARKER) >= 0;
    return should;
}

Injector.prototype._inject = function (inject) {
    const css = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.css';
    inject.headEnd.link({ rel: 'stylesheet', href: css },
                        { shouldInject: this._shouldInject.bind(this) });
};

Injector.prototype.register = function () {
    var { hexo, _inject } = this;

    hexo.extend.filter.register('inject_ready', _inject.bind(this));
};

new Injector(hexo).register()