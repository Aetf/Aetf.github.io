'use strict';

const pathFn = require('path');

function bindHelpers(locals) {
    const helpers = hexo.extend.helper.list();
    const keys = Object.keys(helpers);
    let key = '';

    for (let i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        locals[key] = helpers[key].bind(locals);
    }

    return locals;
}

/**
 *
 * @param {*} args Arguments to the tag. An array of string, they are whitespace splited.
 */
function publicationsTag(args) {
    const widgets_dir = pathFn.join(hexo.base_dir, 'widgets');
    const locals = {
        args: args,
        // emulate hexo's own local environment in the rendering
        config: hexo.config,
        theme: Object.assign({}, hexo.config, hexo.theme.config, hexo.config.theme_config),
        layout: 'layout',
        cache: false,
        env: hexo.env,
        page: this,
        view_dir: widgets_dir
    };

    return hexo.render.render({
        path: pathFn.join(widgets_dir, 'pub_item.ejs')
    }, bindHelpers(locals));
}

hexo.extend.tag.register('publications', publicationsTag, { ends: false, async: true });