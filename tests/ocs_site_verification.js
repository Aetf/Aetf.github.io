import test from 'ava';

import { getRoute } from './helpers/index.js';

test('home page contains OCS site verification', async t => {
    const dom = await getRoute('index.html');
    const metas = dom.window.document.head.querySelectorAll('meta[name="ocs-site-verification"]');
    t.is(metas.length, 1);
});
