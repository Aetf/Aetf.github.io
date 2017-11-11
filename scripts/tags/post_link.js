'use strict';

/**
 * Post link tag
 *
 * Syntax:
 *   {% post_link slug[#fragment] [title] %}
 */
const Post = hexo.model('Post');

function postLinkTag(args) {
    var slug = args.shift();
    var frag = '';

    if (!slug) return;

    [slug, frag] = slug.split('#');

    if (frag && frag.length > 0) {
        frag = '#' + frag;
    }

    var post = Post.findOne({ slug: slug });
    if (!post) return;

    var title = args.length ? args.join(' ') : post.title;

    return '<a href="' + hexo.config.root + post.path + frag + '" title="' + title + '">' + title + '</a>';
};

hexo.extend.tag.register('post_link', postLinkTag, { ends: false });