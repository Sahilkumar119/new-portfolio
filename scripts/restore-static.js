// Post-build cleanup that runs AFTER react-snapshot. Two jobs:
//
// 1. Make /learn mount cleanly on direct loads. react-snapshot serves a
//    prerendered document for /learn whose #root holds homepage DOM (the
//    crawl never finishes client-routing to the Learn page). React then
//    HYDRATES that mismatched DOM at the /learn route and the layout corrupts
//    (course list lands off-screen). In-app navigation works because it is a
//    clean client mount with no hydration. src/index.js uses react-snapshot's
//    render(), which mounts fresh when #root is empty and hydrates when it has
//    children. So we write build/learn.html (and build/learn/index.html) as a
//    copy of index.html with an EMPTY #root: React mounts the real Learn page
//    fresh, no hydration, no broken layout.
//
// 2. Restore the static course tree. While crawling, react-snapshot can also
//    overwrite the real course index.html (copied from public/) with a
//    PageNotFound render. Re-copy public/learn so the real files win.
const fs = require('fs');
const path = require('path');

const BUILD = path.join(__dirname, '../build');
const SRC = path.join(__dirname, '../public/learn');
const DEST = path.join(BUILD, 'learn');

// Return index.html as a clean SPA shell for /learn: empty #root plus the
// prerendered MUI JSS <style> tags removed.
//
// Two problems this solves, both from react-snapshot baking the homepage
// snapshot into the /learn document:
//   - Empty #root makes react-snapshot's render() mount fresh (no hydration of
//     mismatched homepage DOM at the /learn route).
//   - Removing the homepage's `data-jss` styles stops a class-name collision:
//     MUI v4 numbers classes jss1, jss2... off a global counter, so the
//     homepage's `jss1` (a flex container) lingered in <head> while the client
//     restarted the counter and gave the Learn root the same `jss1`, inheriting
//     display:flex and shoving the course list off-screen. With the prerendered
//     styles gone, the client regenerates every rule in one pass with unique
//     numbers, so no rule is shared across two style passes.
function emptyRootShell() {
  let html = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');
  html = html.replace(/<style[^>]*data-jss[\s\S]*?<\/style>/g, '');
  const marker = '<div id="root">';
  const start = html.indexOf(marker);
  if (start === -1) return html;
  const firstScript = html.indexOf('<script', start);
  if (firstScript === -1) return html;
  return html.slice(0, start) + '<div id="root"></div>' + html.slice(firstScript);
}

// 1. restore the real static course files first (creates build/learn/ tree)
if (fs.existsSync(SRC)) {
  fs.cpSync(SRC, DEST, { recursive: true, force: true });
  console.log('Restored static /learn course files into build/.');
} else {
  console.log('No public/learn to restore, skipping course copy.');
}

// 2. write empty-root shells for /learn and /learn/ so they mount cleanly
const shell = emptyRootShell();
fs.mkdirSync(DEST, { recursive: true });
fs.writeFileSync(path.join(BUILD, 'learn.html'), shell);
fs.writeFileSync(path.join(DEST, 'index.html'), shell);
console.log('Wrote empty-root /learn shells (build/learn.html, build/learn/index.html).');
