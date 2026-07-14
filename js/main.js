(() => {
  'use strict';

  /* ===== Mobile nav ===== */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  function closeMenu() {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    const open = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', toggleMenu);
  mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
    if (e.matches) closeMenu();
  });

  /* ===== Hero floats: responsive scale, wide-only gating, outward nudge ===== */
  const heroFloatDefs = {
    'hf-1': { w: 230, h: 175, side: 'left' },
    'hf-2': { w: 120, h: 150, side: 'left', wideOnly: true },
    'hf-3': { w: 260, h: 165, side: 'right' },
    'hf-4': { w: 165, h: 125, side: 'left' },
    'hf-5': { w: 140, h: 175, side: 'right' },
    'hf-6': { w: 225, h: 170, side: 'left' },
    'hf-7': { w: 135, h: 165, side: 'left', wideOnly: true },
    'hf-8': { w: 200, h: 155, side: 'right' }
  };
  function layoutHeroFloats() {
    const w = window.innerWidth;
    const heroWide = w > 768;
    const heroXWide = w >= 1560;
    const scale = w >= 1560 ? 1 : w >= 1200 ? 0.85 : w >= 1000 ? 0.68 : 0.55;
    Object.entries(heroFloatDefs).forEach(([id, def]) => {
      const fig = document.getElementById(id);
      if (!fig) return;
      const visible = heroWide && (!def.wideOnly || heroXWide);
      fig.style.display = visible ? 'flex' : 'none';
      if (!visible) return;
      const card = fig.querySelector('.hero-float-card');
      card.style.width = Math.round(def.w * scale) + 'px';
      card.style.height = Math.round(def.h * scale) + 'px';
      fig.style.marginLeft = scale < 0.7 && def.side === 'left' ? '-3%' : '';
      fig.style.marginRight = scale < 0.7 && def.side === 'right' ? '-3%' : '';
    });
  }
  window.addEventListener('resize', layoutHeroFloats);
  layoutHeroFloats();

  /* ===== Marquee track (built once, two copies for a seamless loop) ===== */
  const marqueeItems = ['Duda Specialist', 'Jean Lorenz Recato', '500+ Sites Shipped', 'White-Label Partner', 'US / AU / EU'];
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const frag = document.createDocumentFragment();
    for (let copy = 0; copy < 2; copy++) {
      marqueeItems.forEach((text) => {
        const t = document.createElement('span');
        t.className = 'mq-text';
        t.textContent = text;
        frag.appendChild(t);
        const d = document.createElement('span');
        d.className = 'mq-dot';
        frag.appendChild(d);
      });
    }
    marqueeTrack.appendChild(frag);
  }

  /* ===== FAQ accordion ===== */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ===== Process timeline ===== */
  const tlSteps = [
    { days: 'Day 1', title: 'Your project kicks off', desc: 'Brief received, scope confirmed. We review your goals, competitors, and content on a kickoff call — you’ll have a clear plan and timeline before the day is out.' },
    { days: 'Day 2–3', title: 'Design direction takes shape', desc: 'Homepage design direction drafted in Duda — real layout, real type, not vague moodboards. You react, I refine. One clear direction locked before any build-out.' },
    { days: 'Day 4–6', title: 'The full site gets built', desc: 'Every page built out in Duda: layouts, navigation, forms, mobile breakpoints. You can watch progress on a live staging link the whole time — no radio silence.' },
    { days: 'Day 7–10', title: 'Content & SEO go in', desc: 'Copy placed, images optimized, headings structured, local schema and metadata written. The site isn’t just pretty — it’s built to rank and convert from day one.' },
    { days: 'Day 11–12', title: 'You review, I revise', desc: 'Two structured revision rounds. You mark up anything that feels off; changes land within 24 hours. No endless loops — just focused fixes until it’s right.' },
    { days: 'Day 13–14', title: 'Launch & handoff', desc: 'Domain connected, redirects mapped, analytics wired, launch checklist run. You get a walkthrough of editing your own site — plus documentation your team can run without me.' }
  ];
  const tlTabs = document.querySelectorAll('.tl-tab');
  const tlCurrentTitle = document.getElementById('tlCurrentTitle');
  const tlCurrentNum = document.getElementById('tlCurrentNum');
  const tlCurrentDesc = document.getElementById('tlCurrentDesc');
  const tlNextTitle = document.getElementById('tlNextTitle');
  const tlNextDesc = document.getElementById('tlNextDesc');

  function renderTimeline(step) {
    tlTabs.forEach((tab, i) => tab.classList.toggle('active', i === step));
    const current = tlSteps[step];
    const next = tlSteps[step + 1] || { title: 'You’re live', desc: 'The site is shipped, indexed, and yours. Most clients move into a light support arrangement — or just call me the next time they need something built.' };
    tlCurrentTitle.textContent = current.title;
    tlCurrentNum.textContent = '0' + (step + 1);
    tlCurrentDesc.textContent = current.desc;
    tlNextTitle.textContent = next.title;
    tlNextDesc.textContent = next.desc;
  }
  tlTabs.forEach((tab) => {
    tab.addEventListener('click', () => renderTimeline(Number(tab.dataset.step)));
  });
  renderTimeline(0);

  /* ===== Contact form (mailto fallback) ===== */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmit');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const name = d.get('firstName') + ' ' + d.get('lastName');
    const body = encodeURIComponent('Service: ' + d.get('service') + '\n\n' + d.get('message') + '\n\n— ' + name + ' (' + d.get('email') + ')');
    window.open('mailto:jeanrecato25@gmail.com?subject=' + encodeURIComponent('Project inquiry from ' + name) + '&body=' + body);
    submitBtn.textContent = 'Message sent ✓';
  });

  /* ===== Scroll reveal ===== */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  requestAnimationFrame(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const frames = reduced.matches
          ? [{ opacity: 0 }, { opacity: 1 }]
          : [{ opacity: 0, transform: 'translateY(16px)', filter: 'blur(6px)' }, { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' }];
        en.target.animate(frames, { duration: reduced.matches ? 150 : 800, easing: 'cubic-bezier(0.32,0.72,0,1)', fill: 'forwards' });
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  });

  /* ===== Fast-count stats, reset when out of view ===== */
  const statEls = document.querySelectorAll('.stat-num');
  const statsGrid = document.getElementById('statsGrid');
  let statRaf = null;
  function setStats(progress) {
    statEls.forEach((el) => {
      const end = Number(el.dataset.end);
      const suffix = el.dataset.suffix;
      el.textContent = Math.round(end * progress) + suffix;
    });
  }
  if (statsGrid) {
    const statsIo = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          cancelAnimationFrame(statRaf);
          const t0 = performance.now();
          const dur = 1100;
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            setStats(1 - Math.pow(1 - p, 3));
            if (p < 1) statRaf = requestAnimationFrame(tick);
          };
          statRaf = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(statRaf);
          setStats(0);
        }
      });
    }, { threshold: 0.35 });
    statsIo.observe(statsGrid);
  }
})();
