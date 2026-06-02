// Post-build cleanup that runs AFTER react-snapshot. Two jobs:
//
// 1. Drop the prerendered /learn page. react-snapshot crawls the homepage's
//    Learn link and snapshots the scroll/animation-driven /learn page mid-
//    animation (course names still opacity:0), writing a broken build/learn.html
//    that Vercel then serves on direct loads. Deleting it makes /learn fall
//    through to the SPA rewrite (-> index.html) so it always renders live.
//
// 2. Restore the static course tree. While crawling, react-snapshot also visits
//    the course paths (/learn/docker/, /learn/sql/), renders PageNotFound, and
//    overwrites the real course index.html copied from public/. Re-copy public/
//    learn so the real files win.
const fs = require('fs');
const path = require('path');

const BUILD = path.join(__dirname, '../build');
const SRC = path.join(__dirname, '../public/learn');
const DEST = path.join(BUILD, 'learn');

// 1. remove prerendered /learn artifacts (NOT the course subdirs under build/learn/)
for (const artifact of [path.join(BUILD, 'learn.html'), path.join(DEST, 'index.html')]) {
  if (fs.existsSync(artifact)) {
    fs.rmSync(artifact);
    console.log(`Removed prerendered /learn artifact: ${path.relative(BUILD, artifact)}`);
  }
}

// 2. restore the real static course files
if (!fs.existsSync(SRC)) {
  console.log('No public/learn to restore, skipping.');
  process.exit(0);
}
fs.cpSync(SRC, DEST, { recursive: true, force: true });
console.log('Restored static /learn course files into build/.');
