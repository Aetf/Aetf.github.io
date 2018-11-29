'use strict';

const pathFn = require('path');
const fs = require('hexo-fs');
const _ = require('lodash');
const Promise = require('bluebird');
const moment = require('moment');
const yaml = require('js-yaml');
const url = require('url');

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
function normalizeSourceData(data, content) {
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
        citekey: '',
        badges: [],
        links: [],
        bibtex: 'bibtex.txt',
        abstract: 'abstract.txt',
    }
    _.defaults(data, defData);
    for (const confkey of Object.keys(data.conferences)) {
        let conf = data.conferences[confkey];
        _.defaults(conf, defConf);
        if (!data.types.hasOwnProperty(conf.cat)) {
            hexo.log.e(`Conference ${confkey} has unknown category: "${conf.cat}"`);
        }
        // make date a moment object
        conf.date = moment(conf.date);
    }

    // parse content and add it as a list to items
    let items = [];
    try {
        items = yaml.safeLoad(content);
    } catch (err) {
        hexo.log.e(`Error parsing publication content: ${err}`);
    }

    // clean up items
    for (let item of items) {
        _.defaults(item, defItem);
        // check conference
        if (!data.conferences.hasOwnProperty(item.confkey)) {
            hexo.log.e(`Publication item ${item.title} has unknwon conference: "${item.confkey}"`);
        }
        // parse links
        item.links = item.links.map(link => {
            let [name, href] = link.split(' || ');
            if (href == null) {
                hexo.log.w(`Publication item ${item.title} has a link without url: ${name}`);
                href = '';
            }

            if (!/^[a-z][a-z0-9+.-]*:/.test(href)) {
                // append base
                href = data.publication_dir + '/' + href;
            }

            return { name, href };
        });
    }

    return Promise.map(items, item =>
        fs.readFile(pathFn.join(hexo.source_dir, data.publication_dir, item.citekey, item.bibtex))
        .catch(err => {
            return item.bibtex;
        })
        .then(content => item.bibtex = content)
    ).then(() =>
        Promise.map(items, item =>
            fs.readFile(pathFn.join(hexo.source_dir, data.publication_dir, item.citekey, item.abstract))
            .catch(err => {
                return item.abstract;
            })
            .then(content => hexo.render.render({ text: content, engine: 'markdown' }))
            .then(content => item.abstract = content)
        )
    ).then(() => ({ config: data, items: items }));
}

/**
 *
 * @param {*} args Arguments to the tag. An array of string, they are whitespace splited.
 * @param {*} content The content between the open and end tag.
 */
function publicationsTag(args, content) {
    const widgets_dir = pathFn.join(hexo.base_dir, 'widgets');

    return normalizeSourceData(this.site.data.pubconfig, content).then(data => {
        let { config, items } = data;
        const locals = bindHelpers({
            args: args,
            // directly inject items into the template context
            pubconfig: config,
            publications: items,
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

hexo.extend.tag.register('publications', publicationsTag, { ends: true, async: true });