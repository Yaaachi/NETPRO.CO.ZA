(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EMAIL = 'ngimzwilengbiza@gmail.com';
  var ENDPOINT = 'https://formsubmit.co/ajax/' + EMAIL;
  var WA = '27783342552';

  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  function closeMenu() {
    links.classList.remove('open'); toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  }
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  var anchors = links.querySelectorAll('a');
  var navObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) anchors.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['home', 'about', 'services', 'team', 'contact'].forEach(function (id) { var el = document.getElementById(id); if (el) navObs.observe(el); });

  var revObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); revObs.unobserve(en.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { revObs.observe(el); });

  var cntObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target, target = parseInt(el.getAttribute('data-count-to'), 10), suffix = el.getAttribute('data-suffix') || '';
      cntObs.unobserve(el);
      if (reduce) return;
      var start = null, dur = 1400;
      (function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    });
  }, { threshold: .6 });
  document.querySelectorAll('[data-count-to]').forEach(function (el) { cntObs.observe(el); });

  document.querySelectorAll('.spot').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  var card = document.getElementById('logoCard');
  if (card && !reduce && window.matchMedia('(hover:hover)').matches) {
    var hero = document.getElementById('home');
    hero.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      var dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      card.style.setProperty('--ry', (dx * 16).toFixed(2) + 'deg');
      card.style.setProperty('--rx', (-dy * 14).toFixed(2) + 'deg');
    });
    hero.addEventListener('pointerleave', function () { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  }

  var cv = document.getElementById('sparks');
  if (cv && !reduce) {
    var ctx = cv.getContext('2d'), W, H, dpr = Math.min(window.devicePixelRatio || 1, 2), sparks = [], running = true;
    function resize() {
      var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize(); window.addEventListener('resize', resize);
    function spawn() {
      var n = W < 700 ? 1 : 2;
      for (var i = 0; i < n; i++) {
        var fromCorner = Math.random() < .55;
        sparks.push({
          x: fromCorner ? W * (.15 + Math.random() * .7) : Math.random() * W,
          y: H + 10, vx: (Math.random() - .5) * 1.6, vy: -(1.2 + Math.random() * 3.2),
          life: 0, max: 140 + Math.random() * 160, r: .6 + Math.random() * 1.8, h: 28 + Math.random() * 22
        });
      }
    }
    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      spawn();
      ctx.globalCompositeOperation = 'lighter';
      for (var i = sparks.length - 1; i >= 0; i--) {
        var s = sparks[i];
        s.life++; s.vx += (Math.random() - .5) * .08; s.vy += .004; s.x += s.vx; s.y += s.vy;
        var a = 1 - s.life / s.max;
        if (a <= 0 || s.y < -20) { sparks.splice(i, 1); continue; }
        var g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
        g.addColorStop(0, 'hsla(' + s.h + ',100%,65%,' + (a * .9) + ')');
        g.addColorStop(1, 'hsla(' + (s.h - 8) + ',100%,50%,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 6, 0, 6.283); ctx.fill();
        ctx.fillStyle = 'rgba(255,240,200,' + a + ')'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * .7, 0, 6.283); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(frame);
    }
    new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(frame); } else if (!vis) running = false;
    }).observe(cv);
    requestAnimationFrame(frame);
  }

  var gear = document.querySelector('.hero-gear');
  if (gear && !reduce) {
    window.addEventListener('scroll', function () {
      gear.style.transform = 'translateY(' + (Math.min(window.scrollY, 900) * .12) + 'px)';
    }, { passive: true });
  }

  var triggers = document.querySelectorAll('.acc-trigger');
  function setPanel(btn, open) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.parentNode.classList.toggle('open', open);
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
  }
  triggers.forEach(function (btn) {
    if (btn.getAttribute('aria-expanded') === 'true') setPanel(btn, true);
    btn.addEventListener('click', function () {
      var wasOpen = btn.getAttribute('aria-expanded') === 'true';
      triggers.forEach(function (o) { setPanel(o, false); });
      if (!wasOpen) setPanel(btn, true);
    });
  });
  function refreshOpen() { triggers.forEach(function (b) { if (b.getAttribute('aria-expanded') === 'true') setPanel(b, true); }); }
  window.addEventListener('resize', refreshOpen);
  window.addEventListener('load', refreshOpen);

  var brief = { service: 'Fabrication', budget: 'R250k–R900k', timeline: 'Within 30 days' };
  var serviceValues = ['Fabrication', 'Plant maintenance', 'Technical labour', 'Building works', 'Not sure yet'];
  var timingValues = ['Urgent / shutdown', 'Within 30 days', '1–3 months', '3+ months'];
  var form = document.getElementById('quoteForm');
  var fService = document.getElementById('f-service');
  var fMessage = document.getElementById('f-message');
  var serviceToForm = { 'Fabrication': 'Fabrication', 'Plant maintenance': 'General & Plant Maintenance', 'Technical labour': 'Labour Supply', 'Building works': 'General Building & Maintenance', 'Not sure yet': 'Other / Not sure yet' };

  function briefText() {
    return 'Hello NETPRO, I would like to request a project review.\n\nService: ' + brief.service + '\nBudget range: ' + brief.budget + '\nTiming: ' + brief.timeline + '\n\nPlease contact me to define the scope.';
  }
  function updateBrief() {
    document.getElementById('briefService').textContent = brief.service;
    document.getElementById('briefBudget').textContent = brief.budget;
    document.getElementById('briefTimeline').textContent = brief.timeline;
    document.getElementById('briefCode').textContent = 'NP / ' + (serviceValues.indexOf(brief.service) + 1) + '0' + (timingValues.indexOf(brief.timeline) + 1);
    document.getElementById('briefWhatsApp').href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(briefText());
  }
  document.querySelectorAll('.brief-options').forEach(function (group) {
    group.querySelectorAll('.brief-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        group.querySelectorAll('.brief-option').forEach(function (i) { i.classList.remove('is-selected'); });
        opt.classList.add('is-selected');
        brief[group.getAttribute('data-field')] = opt.getAttribute('data-value');
        updateBrief();
      });
    });
  });
  updateBrief();
  document.getElementById('briefEmail').addEventListener('click', function () {
    var opt = serviceToForm[brief.service];
    for (var i = 0; i < fService.options.length; i++) { if (fService.options[i].text === opt) fService.selectedIndex = i; }
    fMessage.value = 'Project brief\n• Service: ' + brief.service + '\n• Budget range: ' + brief.budget + '\n• Timing: ' + brief.timeline + '\n\nAdditional details:\n';
  });

  var note = document.getElementById('formNote');
  var btn = document.getElementById('sendBtn');
  var label = btn.querySelector('.btn-label');
  var formCard = document.getElementById('formCard');
  function setNote(msg, cls) { note.textContent = msg; note.className = 'form-note' + (cls ? ' ' + cls : ''); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), email = form.email.value.trim(), message = form.message.value.trim();
    if (!name || !email || !message) { setNote('Please fill in your name, email and message.', 'err'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setNote('Please enter a valid email address.', 'err'); form.email.focus(); return; }
    if (form._honey.value) return;

    var data = {
      name: name, email: email, phone: form.phone.value.trim() || '—', company: form.company.value.trim() || '—',
      service: form.service.value, message: message,
      _subject: 'New website enquiry — ' + name, _template: 'table', _captcha: 'false', _replyto: email
    };
    btn.disabled = true; btn.classList.add('is-sending'); label.textContent = 'Sending…'; setNote('');

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (res.ok && (res.j.success === 'true' || res.j.success === true)) { formCard.classList.add('done'); form.reset(); }
        else { throw new Error(res.j.message || 'send failed'); }
      })
      .catch(function () {
        setNote('We couldn\u2019t send that automatically. Opening your email app instead\u2026', 'err');
        var body = 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + data.phone + '\nCompany: ' + data.company + '\nService: ' + data.service + '\n\n' + message;
        setTimeout(function () {
          window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Website enquiry — ' + name) + '&body=' + encodeURIComponent(body);
        }, 900);
      })
      .then(function () { btn.disabled = false; btn.classList.remove('is-sending'); label.textContent = 'Send Enquiry'; });
  });
  document.getElementById('again').addEventListener('click', function () { formCard.classList.remove('done'); setNote(''); form.name.focus(); });
  if (/[?&]sent=1/.test(location.search)) { formCard.classList.add('done'); }
})();
