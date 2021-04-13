'use strict';

const pathFn = require('path');

function image_version(oldPath, { thumbProfile = 'body', hugeProfile = 'huge' } = {}) {
    const dir = pathFn.dirname(oldPath);
    let base = pathFn.basename(oldPath);

    // if base already starts with a prefix
    for (const key in hexo.config.responsive_images.sizes) {
        if (base.startsWith(key + '_')) {
            thumbProfile = key;
            base = base.slice(key.length + 1);
            break;
        }
    }

    if (dir === '.') {
        return {
            thumb: thumbProfile + '_' + base,
            huge: hugeProfile + '_' + base,
        };
    }
    return {
        thumb: dir + '/' + thumbProfile + '_' + base,
        huge: dir + '/' + hugeProfile + '_' + base,
    };
}

function mediumZoomFilter(post) {
    const content = post.content;
    post.content = post.content.replace(/(<img[^>]*?) src="([^"]+)"/img, (match, p1, p2) => {
        hexo.log.info('Responsive image', p2);
        const { thumb, huge } = image_version(p2);
        return `${p1} data-zoom-src="${huge}" src="${thumb}"`;
    });

    if (content.includes('img')) {
        // console.log('after render', content);
    }
}

// the priority must before the next theme's img lazy load filter's 0
hexo.extend.filter.register('after_post_render', mediumZoomFilter, -10);
