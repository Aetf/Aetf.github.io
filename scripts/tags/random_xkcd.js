'use strict';

const util = require('util');
const Promise = require('bluebird');

const xkcd_get = util.promisify(require('xkcd-api').get);

function randomXkcd() {
    var comics = this.site.data.xkcd;

    return Promise.all(comics.map(c => xkcd_get(c))).then(infos => {
        // make it into a dict for easier lookup
        // build a list with less info
        var comics = infos.map(el => {
            return {
                num: el.num,
                alt: el.alt,
                title: el.title,
                img: el.img
            };
        });
        var json = JSON.stringify(comics);

        return `<a ref="external" target="_blank"><img class="no-fancybox" /></a>
        <script type="text/javascript">
            var xkcd_infos = ${json};
            var thecomic = xkcd_infos[Math.floor(Math.random() * xkcd_infos.length)];
            var scripts = document.getElementsByTagName('script'),
                currentScript = scripts[scripts.length - 1],
                atag = currentScript.previousElementSibling;
            atag.setAttribute('href', 'https://xkcd.com/' + thecomic.num);
            atag.firstChild.setAttribute('src', thecomic.img);
            atag.firstChild.setAttribute('alt', thecomic.title);
            atag.firstChild.setAttribute('title', thecomic.alt);
            //currentScript.parentNode.insertBefore(newNode, currentScript.nextSibling);
        </script>`;
    });
}

hexo.extend.tag.register('random_xkcd', randomXkcd, { ends: false, async: true });