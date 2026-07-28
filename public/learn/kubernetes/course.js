/* Shared behaviour for every Kubernetes course page:
   reading-progress bar, copy-to-clipboard on code blocks, TOC scroll-spy.
   All three are no-ops when the elements they need are absent, so the same
   file is safe to load on the course index as well as a module page. */
(function () {
  // reading progress
  var bar = document.getElementById('progress');
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // copy-to-clipboard
  document.querySelectorAll('.copybtn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.closest('.codeblock').querySelector('code');
      navigator.clipboard.writeText(code.innerText).then(function () {
        var orig = btn.innerHTML;
        btn.classList.add('done');
        btn.innerHTML = '<svg><use href="#i-check"/></svg>Copied';
        setTimeout(function () { btn.classList.remove('done'); btn.innerHTML = orig; }, 1600);
      });
    });
  });

  // scroll-spy on the sidebar TOC
  var links = [].slice.call(document.querySelectorAll('#toc a'));
  if (!links.length) return;
  var map = new Map(links.map(function (a) { return [a.getAttribute('href').slice(1), a]; }));
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove('active'); });
      var a = map.get(e.target.id);
      if (a) a.classList.add('active');
    });
  }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
  document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });
})();
