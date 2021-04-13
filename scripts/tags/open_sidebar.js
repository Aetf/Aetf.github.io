'use strict';

const _ = require('lodash');

/**
 * A link to open sidebar. Basically only adds open-sidebar class to the tag.
 *
 * Syntax:
 *   {% open_sidebar text [, title] %}
 */
function openSidebarTag(args) {
    var [text, title] = args.join(' ').split(',');
    if (!text) return;

    if (title) {
        title = _.trim(title);
        title = `title="${title}"`;
    }
    // the href has to be a fragment, so it's pjax safe
    return `<a href="#" class="open-sidebar" ${title} >${text}</a>`;
};

hexo.extend.tag.register('open_sidebar', openSidebarTag, { ends: false });
