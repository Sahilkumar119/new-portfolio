// react-snapshot prerenders /learn and crawls its links, including the
// /learn/docker/ course card. That path has no React route, so it renders
// PageNotFound and react-snapshot writes the 404 SPA shell over the real
// build/learn/docker/index.html copied from public/. Re-copy the static
// course tree after snapshotting so the real files win.
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '../public/learn');
const DEST = path.join(__dirname, '../build/learn');

if (!fs.existsSync(SRC)) {
  console.log('No public/learn to restore, skipping.');
  process.exit(0);
}

// recursive copy, overwriting clobbered files; never deletes the catalogue
// prerender (build/learn/index.html) since public/learn has no index.html
fs.cpSync(SRC, DEST, { recursive: true, force: true });
console.log('Restored static /learn course files into build/.');
