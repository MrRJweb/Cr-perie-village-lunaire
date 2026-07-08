/* Music, Records & Luthiers — front-end behaviors (no dependencies) */
(function () {
  'use strict';

  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  /* ------------------------- sticky nav: scrolled state ------------------------- */
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------ mobile hamburger ------------------------------ */
  function setMenu(open) {
    nav.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('menu-open'));
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('menu-open') && !nav.contains(e.target)) setMenu(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 880) setMenu(false);
  });

  /* -------------------- active nav link while scrolling -------------------- */
  var navAnchors = Array.prototype.slice.call(links.querySelectorAll('a[href^="#"]'));
  var watched = navAnchors
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && watched.length) {
    var currentId = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) currentId = entry.target.id;
      });
      navAnchors.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + currentId);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    watched.forEach(function (sec) { spy.observe(sec); });
  }

  /* ---------------------------- reveal on scroll ---------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // small stagger based on position among revealed siblings
        var siblings = Array.prototype.filter.call(el.parentNode.children, function (c) {
          return c.classList && c.classList.contains('reveal');
        });
        var idx = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(idx * 70, 350) + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ------------------- repair booking form (front-end only) ------------------- */
  var form = document.getElementById('repairForm');
  var success = document.getElementById('formSuccess');
  var successMsg = document.getElementById('successMsg');
  var resetBtn = document.getElementById('formReset');

  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var data = new FormData(form);
      var name = String(data.get('name') || '').trim().split(/\s+/)[0] || 'friend';
      var phone = String(data.get('phone') || '').trim();
      var instrument = String(data.get('instrument') || 'instrument').toLowerCase();
      successMsg.textContent =
        'Thanks, ' + name + '! We’ll call you at ' + phone +
        ' within one business day to book your ' + instrument + ' onto the bench.';
      form.hidden = true;
      success.hidden = false;
      success.focus && success.setAttribute('tabindex', '-1');
      success.focus();
    });

    resetBtn.addEventListener('click', function () {
      form.reset();
      success.hidden = true;
      form.hidden = false;
      document.getElementById('rf-name').focus();
    });
  }

  /* --------------------- highlight today's row in hours --------------------- */
  var todayRow = document.querySelector('.hours-row[data-day="' + new Date().getDay() + '"]');
  if (todayRow) todayRow.classList.add('is-today');

  /* --------------------------------- footer year --------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
