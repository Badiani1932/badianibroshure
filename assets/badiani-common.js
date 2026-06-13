/* ── Touch-device dropdown fix ──
   On tablets (no hover), the first tap opens the dropdown menu;
   the second tap on the same parent link navigates to the page.
   Tapping outside or on a sub-item closes the dropdown normally. */
(function () {
  if (window.matchMedia('(hover: hover)').matches) return;

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.topbar__dropdown > a');
    if (trigger) {
      var dd = trigger.closest('.topbar__dropdown');
      if (!dd.classList.contains('is-open')) {
        e.preventDefault();
        document.querySelectorAll('.topbar__dropdown.is-open').forEach(function (o) {
          o.classList.remove('is-open');
        });
        dd.classList.add('is-open');
        return;
      }
    }
    if (!e.target.closest('.topbar__dropdown')) {
      document.querySelectorAll('.topbar__dropdown.is-open').forEach(function (dd) {
        dd.classList.remove('is-open');
      });
    }
  });
})();

/* ── Mobile menu close buttons use real buttons, not empty # links. */
(function () {
  document.addEventListener('click', function (e) {
    var close = e.target.closest('.topbar__mobile-close');
    if (!close) return;
    e.preventDefault();
    var nav = close.closest('.topbar__mobile-nav');
    var btn = document.getElementById('hamburgerBtn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (nav) nav.classList.remove('is-open');
  });
})();

/* ── Global horizontal-lock hardening ──
   Prevents mobile Safari/Chrome side-panning from exposing white gutters. */
(function () {
  function currentY() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function lockHorizontal() {
    if (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft) {
      window.scrollTo(0, currentY());
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
    }
  }

  window.addEventListener('scroll', lockHorizontal, { passive: true });
  window.addEventListener('resize', lockHorizontal, { passive: true });
  window.addEventListener('orientationchange', function () { setTimeout(lockHorizontal, 80); }, { passive: true });
  window.addEventListener('touchend', lockHorizontal, { passive: true });
  lockHorizontal();
})();
