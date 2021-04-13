const test = require('ava');
const { getRoute } = require('./helpers');

test('home page contains OCS site verification', async t => {
    const dom = await getRoute('index.html');
    const metas = dom.window.document.head.querySelectorAll('meta[name="ocs-site-verification"]');
    t.is(metas.length, 1);
});
