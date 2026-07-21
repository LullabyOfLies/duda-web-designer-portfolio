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

  /* ===== Services slideshow (3s auto-advance, syncs with card hover) ===== */
  const slideWrap = document.getElementById('servicesSlideshow');
  if (slideWrap) {
    const slides = slideWrap.querySelectorAll('.services-slide');
    const cards = document.querySelectorAll('.services-row .service-card');
    let si = 0;
    let slideTimer = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    function showSlide(n) {
      slides.forEach((s, i) => {
        const active = i === n;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
    }
    function nextSlide() { si = (si + 1) % slides.length; showSlide(si); }
    function startSlides() {
      if (reducedMotion.matches || slides.length < 2) return;
      slideTimer = setInterval(nextSlide, 3000);
    }
    function stopSlides() { if (slideTimer) { clearInterval(slideTimer); slideTimer = null; } }
    slideWrap.addEventListener('mouseenter', stopSlides);
    slideWrap.addEventListener('mouseleave', startSlides);
    /* Hovering a service card shows its related image and pauses the rotation */
    cards.forEach((card, i) => {
      card.addEventListener('mouseenter', () => {
        stopSlides();
        si = i % slides.length;
        showSlide(si);
      });
      card.addEventListener('mouseleave', startSlides);
    });
    startSlides();
  }

  /* ===== Contact form (POST to Vercel serverless function) ===== */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmit');
  if (form && submitBtn) {
    const defaultLabel = submitBtn.textContent;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const payload = {
        firstName: d.get('firstName'),
        lastName: d.get('lastName'),
        email: d.get('email'),
        service: d.get('service'),
        message: d.get('message'),
        honeypot: d.get('company')
      };
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Something went wrong.');
        }
        form.hidden = true;
        const success = document.getElementById('ctaSuccess');
        if (success) success.hidden = false;
      } catch (err) {
        submitBtn.textContent = 'Try again';
        console.error('Contact submit failed:', err);
      } finally {
        setTimeout(() => {
          submitBtn.textContent = defaultLabel;
          submitBtn.disabled = false;
        }, 4000);
      }
    });
  }

  /* ===== Scroll reveal =====
     Uses a CSS class + transition (not Element.animate/fill:'forwards') because
     Safari/WebKit can drop composited fill-forwards animations on scroll, leaving
     revealed content stuck at opacity:0. Toggling a class is stable across browsers. */
  const els = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        en.target.classList.add('is-revealed');
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('is-revealed'));
  }

  /* ===== Lightbox (case study images) ===== */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCta = document.getElementById('lightboxCta');
    const lightboxClose = document.getElementById('lightboxClose');
    let lastTrigger = null;

    function openLightbox(trigger) {
      const img = trigger.querySelector('img');
      if (!img) return;
      lastTrigger = trigger;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      lightboxTitle.textContent = trigger.dataset.lightboxTitle || '';
      const url = trigger.dataset.lightboxUrl;
      if (url) {
        lightboxCta.href = url;
        lightboxCta.hidden = false;
      } else {
        lightboxCta.hidden = true;
      }
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    }
    function closeLightbox() {
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    }
    document.querySelectorAll('.lightbox-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => openLightbox(trigger));
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(trigger);
        }
      });
    });
    lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => el.addEventListener('click', closeLightbox));
    lightboxClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

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
