'use strict';

const pathFn = require('path');
const fs = require('hexo-fs');
const defaults = require('lodash/defaults');
const Promise = require('bluebird');

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
 * Async, returns Promise
 * @param {*} publications 
 */
function normalizeSourceData(data) {
    const defData = {
        publication_dir: '',
        types: {},
        conferences: {},
        items: []
    };
    const defConf = {
        venue: '',
        name: '',
        date: '2018-01-01',
        url: '',
        acceptance: '',
        cat: '',
    }
    const defItem = {
        title: '',
        authors: [],
        confkey: '',
        badges: [],
        links: [],
        bibtex: '',
        abstract: '',
    }
    defaults(data, defData);
    for (const confkey of Object.keys(data.conferences)) {
        let conf = data.conferences[confkey];
        defaults(conf, defConf);
        if (!data.types.hasOwnProperty(conf.cat)) {
            hexo.log.e(`Conference ${confkey} has unknown category: "${conf.cat}"`);
        }
    }

    for (let item of data.items) {
        defaults(item, defItem);
        if (!data.conferences.hasOwnProperty(item.confkey)) {
            hexo.log.e(`Publication item ${item.title} has unknwon conference: "${item.confkey}"`);
        }
    }

    return Promise.map(data.items, item =>
        fs.readFile(pathFn.join(hexo.source_dir, data.publication_dir, item.bibtex))
            .catch(err => {
                return item.bibtex;
            })
            .then(content => item.bibtex = content)
    ).then(() =>
        Promise.map(data.items, item =>
            fs.readFile(pathFn.join(hexo.source_dir, data.publication_dir, item.abstract))
                .catch(err => {
                    return item.abstract;
                })
                .then(content => item.abstract = content)
        )
    ).then(() => data);
}

/**
 *
 * @param {*} args Arguments to the tag. An array of string, they are whitespace splited.
 */
function publicationsTag(args) {
    const widgets_dir = pathFn.join(hexo.base_dir, 'widgets');

    return normalizeSourceData(this.site.data.publications).then(data => {
        this.site.data.publications = data;

        const locals = bindHelpers({
            args: args,
            // emulate hexo's own local environment in the rendering
            config: hexo.config,
            theme: Object.assign({}, hexo.config, hexo.theme.config, hexo.config.theme_config),
            layout: 'layout',
            cache: false,
            env: hexo.env,
            page: this,
            view_dir: widgets_dir
        });

        return hexo.render.render({
            path: pathFn.join(widgets_dir, 'pub_item.ejs')
        }, locals);
    })
}

hexo.extend.tag.register('publications', publicationsTag, { ends: false, async: true });