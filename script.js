/* ═══════════════════════════════════════════════════════
   Nails, Lashes & Esthetics — interactions
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ───────── Navbar: solid background after scrolling ───────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ───────── Mobile menu ───────── */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  const scrim = document.querySelector('.nav-scrim');

  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  scrim.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ───────── Scroll spy: highlight the section in view ───────── */
  const spyLinks = Array.from(menu.querySelectorAll('a:not(.btn)'));
  const sectionFor = new Map();
  spyLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) sectionFor.set(section, link);
  });

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          spyLinks.forEach((l) => l.classList.remove('active'));
          const link = sectionFor.get(entry.target);
          if (link) link.classList.add('active');
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionFor.forEach((_link, section) => spy.observe(section));
  }

  /* ───────── Gentle fade-in reveals ───────── */
  document.querySelectorAll('.stagger').forEach((group) => {
    group.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 90}ms`;
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          revealer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => revealer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in-view'));
  }

  /* ───────── Footer year ───────── */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ───────── Booking form (front-end only) ───────── */
  const form = document.getElementById('booking-form');
  const success = document.getElementById('booking-success');
  const successText = document.getElementById('booking-success-text');
  const dateInput = document.getElementById('bk-date');
  const againBtn = document.getElementById('booking-again');

  // No booking in the past: today is the earliest selectable date
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateInput.min = today.toISOString().slice(0, 10);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const firstName = String(data.get('name')).trim().split(/\s+/)[0];
    const service = String(data.get('service'));
    const time = String(data.get('time'));
    const date = new Date(`${data.get('date')}T00:00:00`);
    const prettyDate = date.toLocaleDateString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    successText.textContent =
      `Thank you, ${firstName}! Your request for ${service} on ${prettyDate} at ${time} ` +
      `has been received. We'll text you shortly to confirm your appointment. ✨`;

    form.hidden = true;
    success.hidden = false;
    success.focus();
  });

  againBtn.addEventListener('click', () => {
    form.reset();
    success.hidden = true;
    form.hidden = false;
    document.getElementById('bk-name').focus();
  });
})();
