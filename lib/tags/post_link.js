import { htmlTag } from 'hexo-util';

/**
 * Post link tag
 *
 * Syntax:
 *   {% post_link slug[#fragment] [title] %}
 */
export default function register(hexo) {
    const Post = hexo.model('Post');

    function postLinkTag(args) {
        let slug = args.shift();

        if (!slug) return;

        let frag = '';
        [slug, frag] = slug.split('#');
        if (!frag) {
            frag = '';
        }

        if (frag.length > 0) {
            frag = '#' + frag;
        }

        let post = Post.findOne({ slug });
        if (!post) return;

        let title = args.length ? args.join(' ') : post.title;

        return htmlTag('a', {
            href: hexo.config.root + post.path + frag,
            title: title
        }, title);
    }

    hexo.extend.tag.register('post_link', postLinkTag, { ends: false });
}
