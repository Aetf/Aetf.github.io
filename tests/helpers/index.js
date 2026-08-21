import fs from 'fs/promises';
import pathFn from 'path';
import { fileURLToPath } from 'url';

import { JSDOM } from 'jsdom';

const __dirname = pathFn.dirname(fileURLToPath(import.meta.url));
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

export async function listRoutes() {
    return await recursiveRoutes(pathFn.join(PUBLIC_DIR, 'blog'), '/');
}

export async function getRoute(path) {
    return await JSDOM.fromFile(pathFn.join(PUBLIC_DIR, path));
}

export async function getRouteFile(path) {
    return await fs.readFile(pathFn.join(PUBLIC_DIR, path), { encoding: 'utf-8' });
}

export async function getHexo(level) {
    // import lazily so tests not using hexo don't pay for loading it
    const { default: Hexo } = await import('hexo');
    const hexo = new Hexo();
    hexo.log.level = level || 40 // WARN;
    await hexo.init();
    return hexo;
}
