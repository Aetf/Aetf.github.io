const test = require('ava');
const { getRouteFile } = require('./helpers');

test('prism bundle contains language', async t => {
    const js = await getRouteFile('assets/prism-bundle.js');
    t.regex(js, /prism-bash/);
    t.regex(js, /prism-c/);
    t.regex(js, /prism-cpp/);
});
