'use strict';

const util = require('util');
const crypto = require('crypto');

const xkcd_get = util.promisify(require('xkcd-api').get);

async function randomXkcd() {
    const comics = this.site.data.xkcd || [];
    const infos = await Promise.all(comics.map(c => xkcd_get(c)));
    // build a JSON list with less info to include in the page
    const list = infos.map(el => ({
        num: el.num,
        alt: el.alt,
        title: el.title,
        img: el.img
    }));

    const tag_id = crypto.randomBytes(4).toString('hex');
    return `<a id="${tag_id}" ref="external" target="_blank"><img data-proofer-ignore/></a>
    <script type="text/javascript" data-pjax>
        (() => {
            window.xkcd_infos = window.xkcd_infos || ${JSON.stringify(list)};
            const thecomic = xkcd_infos[Math.floor(Math.random() * xkcd_infos.length)];
            const atag = document.getElementById("${tag_id}");
            if (atag) {
                atag.setAttribute('href', 'https://xkcd.com/' + thecomic.num);
                atag.firstChild.setAttribute('src', thecomic.img);
                atag.firstChild.setAttribute('alt', thecomic.title);
                atag.firstChild.setAttribute('title', thecomic.alt);
            }
        })();
    </script>`;
}

hexo.extend.tag.register('random_xkcd', randomXkcd, { ends: false, async: true });
