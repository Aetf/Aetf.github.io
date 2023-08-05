const test = require('ava');
const { getRoute, listRoutes } = require('./helpers');
const SegfaultHandler = require('segfault-handler');

SegfaultHandler.registerHandler();


test('has tags in header', async t => {
    const dom = await getRoute('blog/2016/08/20/gsoc-kdevelop-lldb-final-report/index.html');
    const elems = dom.window.document.body.querySelectorAll('.post-header-tags');
    t.is(elems.length, 1);
});

test('post routes are stable', async t => {
    const routes = await listRoutes();
    routes.sort();
    t.snapshot(routes);
})
