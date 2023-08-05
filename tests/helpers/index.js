const fs = require('fs/promises');
const pathFn = require('path');
const { JSDOM } = require('jsdom');
const SegfaultHandler = require('segfault-handler');

SegfaultHandler.registerHandler();


const PUBLIC_DIR = pathFn.resolve(__dirname, "..", "..", "public");

async function recursiveRoutes(basedir, prefixUrl) {
    prefixUrl = prefixUrl || basedir;

    const entries = await fs.readdir(basedir, { encoding: 'utf-8', withFileTypes: true });
    // current level files to routes
    const fileRoutes = entries.filter(e => e.isFile()).map(e => pathFn.join(prefixUrl, e.name));
    // routes coming from subdirs
    let subRoutes = entries.filter(e => e.isDirectory())
        .map(e => recursiveRoutes(pathFn.join(basedir, e.name), pathFn.join(prefixUrl, e.name)));
    subRoutes = await Promise.all(subRoutes);
    subRoutes = subRoutes.flatMap(e => e);
    return fileRoutes.concat(subRoutes);
}

async function listRoutes() {
    return await recursiveRoutes(pathFn.join(PUBLIC_DIR, 'blog'), '/');
}

async function getRoute(path) {
    return await JSDOM.fromFile(pathFn.join(PUBLIC_DIR, path));
}

async function getRouteFile(path) {
    return await fs.readFile(pathFn.join(PUBLIC_DIR, path), { encoding: 'utf-8' });
}

async function getHexo(level) {
    const Hexo = require('hexo');
    const hexo = new Hexo();
    hexo.log.level = level || 40 // WARN;
    await hexo.init();
    return hexo;
}

module.exports.getRoute = getRoute;
module.exports.getRouteFile = getRouteFile;
module.exports.getHexo = getHexo;
module.exports.listRoutes = listRoutes;
