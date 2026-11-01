// Cramio landing — vanilla JS. Progressive enhancement only: the page
// renders fully without this file.
(function () {
  'use strict';

  // reveal content once JS is confirmed working
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  // ---- footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ---- mobile nav: close the <details> panel after following a link ----
  var mobileNav = document.querySelector('.mobile-nav');
  if (mobileNav) {
    mobileNav.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (link) mobileNav.removeAttribute('open');
    });
  }

  // ---- scroll reveal ----
  var targets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (targets.length === 0) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  // Stagger siblings that land on screen at the same time (feature grid,
  // steps, FAQ) without hard-coding per-index delays.
  var siblingIndex = function (el) {
    var i = 0;
    while ((el = el.previousElementSibling)) i++;
    return i;
  };
  targets.forEach(function (el) {
    var parent = el.parentElement;
    var siblings = parent ? parent.querySelectorAll(':scope > .reveal') : [];
    if (siblings.length > 1 && siblingIndex(el) < siblings.length) {
      el.style.setProperty('--reveal-delay', Math.min(siblingIndex(el) * 70, 350) + 'ms');
    }
  });

  var observer = new IntersectionObserver(
    function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-visible');
          observer.unobserve(entries[i].target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  targets.forEach(function (el) { observer.observe(el); });
})();
