/**
 * MAYAVERSE — Digital Marketing Agency
 * script.js v1.0
 *
 * Modules:
 *  1. State & Init
 *  2. Navigation (scroll-aware, mobile menu)
 *  3. Canvas Ember Physics Engine
 *  4. Hero Reveal Animations (GSAP)
 *  5. Scroll Reveal Animations (GSAP ScrollTrigger)
 *  6. Animated Stat Counters
 *  7. CTA Section Embers
 *  8. Silhouette Ember Ring (CSS)
 *  9. Performance Optimizations
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ============================================================
  // 1. STATE & INIT
  // ============================================================

  gsap.registerPlugin(ScrollTrigger);

  // Initialize Lenis Smooth Scroll Engine
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean easeOutExpo curve
    smooth: true,
    mouseMultiplier: 1.05,
    smoothTouch: false, // Keep native inertia on mobile viewports
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const state = {
    mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    scrollY: 0,
    isMobile: window.innerWidth < 768,
  };

  window.addEventListener('mousemove', (e) => {
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
  });

  window.addEventListener(
    'scroll',
    () => {
      state.scrollY = window.scrollY;
    },
    { passive: true }
  );

  // ============================================================
  // 2. NAVIGATION
  // ============================================================

  const nav = document.getElementById('site-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileClose = document.getElementById('mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Scroll-aware nav
  const navObserver = new IntersectionObserver(
    ([entry]) => {
      nav.classList.toggle('scrolled', !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );

  const heroSection = document.getElementById('home');
  if (heroSection) navObserver.observe(heroSection);

  // Mobile menu
  const openMobileMenu = () => {
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (typeof lenis !== 'undefined') lenis.stop();
  };
  const closeMobileMenu = () => {
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (typeof lenis !== 'undefined') lenis.start();
  };

  hamburger?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

  // ============================================================
  // INTERACTIVE MAYA DOSSIER TABS & INTEL CODES
  // ============================================================
  const dossierTabButtons = document.querySelectorAll('.dossier-tab-btn');
  const dossierPanels = document.querySelectorAll('.dossier-panel');
  const dossierSubTabs = document.querySelectorAll('.dossier-sub-tab');
  const dossierSubPanels = document.querySelectorAll('.dossier-sub-panel');
  const founderCard = document.getElementById('founder-card-dossier');

  // Trigger skill bar slide fills when entering Codex subtab
  const triggerSkillBars = () => {
    if (!founderCard) return;
    founderCard.classList.add('active-bars');
    const skillBars = founderCard.querySelectorAll('.skill-bar-inner');
    skillBars.forEach((bar) => {
      const pct = bar.getAttribute('data-percentage') || '0%';
      bar.style.width = pct;
    });
  };

  const resetSkillBars = () => {
    if (!founderCard) return;
    founderCard.classList.remove('active-bars');
    const skillBars = founderCard.querySelectorAll('.skill-bar-inner');
    skillBars.forEach((bar) => {
      bar.style.width = '0%';
    });
  };

  // Run cyber laser declassifying sweep
  const triggerLaserScan = () => {
    if (!founderCard) return;
    founderCard.classList.remove('scanning');
    // Force DOM reflow to restart CSS animation
    void founderCard.offsetWidth;
    founderCard.classList.add('scanning');
  };

  // Main Tabs (Agency Codex vs Meet Maya)
  dossierTabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-dossier-tab');

      // Update active button state
      dossierTabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Swap panels
      dossierPanels.forEach((panel) => {
        if (panel.getAttribute('data-panel') === targetTab) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Special reveals for Founder Dossier
      if (targetTab === 'founder') {
        triggerLaserScan();
        // If codex subtab is already active, trigger bars immediately
        const activeSubTab = document.querySelector('.dossier-sub-tab.active');
        if (activeSubTab && activeSubTab.getAttribute('data-sub-tab') === 'codex') {
          setTimeout(triggerSkillBars, 300);
        }
      } else {
        resetSkillBars();
      }
    });
  });

  // Secondary Sub-tabs inside Founder Dossier (Archetype / Codex / Manifesto)
  dossierSubTabs.forEach((subTab) => {
    subTab.addEventListener('click', () => {
      const targetSub = subTab.getAttribute('data-sub-tab');

      // Update subtab active state
      dossierSubTabs.forEach((st) => st.classList.remove('active'));
      subTab.classList.add('active');

      // Swap sub-panels
      dossierSubPanels.forEach((panel) => {
        if (panel.getAttribute('data-sub-panel') === targetSub) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Animate skill bars if clicking Codex
      if (targetSub === 'codex') {
        setTimeout(triggerSkillBars, 100);
      } else {
        resetSkillBars();
      }
    });
  });

  // Hero portal centerpiece cinematic redirect transition to maya.html
  const heroPortalLink = document.getElementById('hero-portal-link');
  heroPortalLink?.addEventListener('click', (e) => {
    e.preventDefault();

    // Play stunning cinematic exit flash
    gsap.to('.hero-crucible-portal', {
      scale: 1.15,
      filter: 'brightness(3) contrast(1.5) drop-shadow(0 0 50px #dc2626)',
      opacity: 0,
      duration: 0.6,
      ease: 'power4.inOut',
    });

    gsap.to('main, header', {
      opacity: 0,
      y: -30,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        window.location.href = 'maya.html';
      },
    });
  });

  // ============================================================
  // 3. CANVAS EMBER PHYSICS ENGINE
  // ============================================================

  const canvasEmber = document.getElementById('canvas-ember');
  if (canvasEmber) {
    const ctx = canvasEmber.getContext('2d');
    let W = (canvasEmber.width = window.innerWidth);
    let H = (canvasEmber.height = window.innerHeight);

    window.addEventListener('resize', () => {
      W = canvasEmber.width = window.innerWidth;
      H = canvasEmber.height = window.innerHeight;
      state.isMobile = W < 768;
    });

    class Ember {
      constructor(initY = null) {
        this.reset(initY);
      }

      reset(initY = null) {
        this.x = Math.random() * W;
        this.y = initY !== null ? initY : H + Math.random() * 30;

        const r = Math.random();
        if (r < 0.12) {
          // Foreground bokeh
          this.layer = 'fg';
          this.size = Math.random() * 5 + 4;
          this.speedY = -(Math.random() * 1.8 + 1.2);
          this.speedX = (Math.random() - 0.5) * 0.7;
          this.opacity = Math.random() * 0.3 + 0.1;
          this.decay = Math.random() * 0.003 + 0.001;
        } else if (r < 0.72) {
          // Midground standard
          this.layer = 'mg';
          this.size = Math.random() * 2.2 + 1;
          this.speedY = -(Math.random() * 1.2 + 0.4);
          this.speedX = (Math.random() - 0.5) * 0.35;
          this.opacity = Math.random() * 0.9 + 0.2;
          this.decay = Math.random() * 0.0018 + 0.0006;
        } else {
          // Background dust
          this.layer = 'bg';
          this.size = Math.random() * 0.7 + 0.2;
          this.speedY = -(Math.random() * 0.45 + 0.2);
          this.speedX = (Math.random() - 0.5) * 0.12;
          this.opacity = Math.random() * 0.5 + 0.1;
          this.decay = Math.random() * 0.0006 + 0.0002;
        }

        // Warm fire palette — oranges and golds from Brand Kit
        const palette = [
          '220, 38, 38' /* Brand Vibrant Crimson */,
          '230, 21, 21' /* Brand Vibrant Crimson Core */,
          '148, 163, 184' /* Steel Alloy */,
          '139, 13, 13' /* Brand Deep Crimson */,
        ];
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.wiggle = Math.random() * 0.022;
        this.wiggleVal = Math.random() * 100;
      }

      update(dt = 1) {
        this.y += this.speedY * dt;
        this.wiggleVal += this.wiggle * dt;
        this.x += (this.speedX + Math.sin(this.wiggleVal) * 0.22) * dt;
        this.opacity -= this.decay * dt;

        if (this.opacity <= 0 || this.y < -30 || this.x < -20 || this.x > W + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();

        if (this.layer === 'fg' && !state.isMobile) {
          const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
          grad.addColorStop(0, `rgba(${this.color}, ${this.opacity * 0.9})`);
          grad.addColorStop(0.4, `rgba(${this.color}, ${this.opacity * 0.35})`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
          ctx.fill();
        }
      }
    }
    const emberCount = state.isMobile ? 60 : 160;
    const embers = Array.from({ length: emberCount }, () => {
      const e = new Ember(Math.random() * H);
      return e;
    });

    let lastTime = performance.now();
    function animate(time = performance.now()) {
      const dt = Math.min((time - lastTime) / 16.666, 3);
      lastTime = time;

      ctx.clearRect(0, 0, W, H);

      // Draw background embers
      embers.forEach((e) => {
        e.update(dt);
        e.draw();
      });

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // ============================================================
  // 4. HERO REVEAL ANIMATIONS (GSAP)
  // ============================================================

  const heroTl = gsap.timeline({ delay: 0.25 });

  heroTl
    .fromTo(
      '#hero-visual',
      {
        opacity: 0,
        scale: 0.92,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.3,
        ease: 'power3.out',
      },
      0
    )
    .fromTo(
      '#portal-sheen',
      { backgroundPosition: '-150% -150%' },
      {
        backgroundPosition: '150% 150%',
        duration: 1.8,
        ease: 'power2.out',
      },
      0.3
    )
    .fromTo(
      '.brand-logo-img',
      {
        opacity: 0,
        y: -15,
        scale: 0.92,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      },
      0
    )
    .to(
      '#hero-eyebrow',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      },
      0.08
    )
    .fromTo(
      '#hero-headline',
      {
        opacity: 0,
        scale: 1.12,
        y: 25,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
      },
      0.14
    )
    .to(
      '#hero-subheadline',
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power4.out',
      },
      0.22
    )
    .to(
      '#hero-cta-group',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      },
      0.32
    )

    .to(
      '#hero-scroll-indicator',
      {
        opacity: 0.5,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.55
    );

  // Centerpiece logo and portal visual animations removed from hero

  // ============================================================
  // 5. SCROLL REVEAL ANIMATIONS (GSAP ScrollTrigger)
  // ============================================================

  // Mission strip
  gsap.fromTo(
    '.mission-word',
    {
      opacity: 0,
      y: 20,
    },
    {
      scrollTrigger: { trigger: '.mission-strip', start: 'top 85%' },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    }
  );

  // About section
  gsap.to('#about-text', {
    scrollTrigger: { trigger: '#about', start: 'top 75%' },
    opacity: 1,
    x: 0,
    duration: 1.6,
    ease: 'power4.out',
  });

  gsap.to('#about-visual', {
    scrollTrigger: { trigger: '#about', start: 'top 70%' },
    opacity: 1,
    x: 0,
    duration: 1.6,
    ease: 'power4.out',
    delay: 0.2,
  });

  // Services cards
  gsap.to('.service-card', {
    scrollTrigger: { trigger: '#services', start: 'top 75%' },
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
  });

  // Portfolio cards
  gsap.to('.portfolio-card', {
    scrollTrigger: { trigger: '#portfolio', start: 'top 75%' },
    opacity: 1,
    y: 0,
    duration: 1.1,
    stagger: 0.15,
    ease: 'power3.out',
  });

  // Process steps
  gsap.to('.process-step', {
    scrollTrigger: { trigger: '#process', start: 'top 75%' },
    opacity: 1,
    y: 0,
    duration: 1.0,
    stagger: 0.2,
    ease: 'power3.out',
  });

  // Why pillars
  gsap.to('.why-pillar', {
    scrollTrigger: { trigger: '#why', start: 'top 75%' },
    opacity: 1,
    y: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
  });

  // CTA section
  gsap.to('#cta-inner', {
    scrollTrigger: { trigger: '#contact', start: 'top 70%' },
    opacity: 1,
    y: 0,
    duration: 1.4,
    ease: 'power4.out',
  });

  // ============================================================
  // 6. ANIMATED STAT COUNTERS
  // ============================================================

  const statNumbers = document.querySelectorAll('.stat-number');

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }

        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => statObserver.observe(el));

  // ============================================================
  // 7. CTA SECTION EMBERS (Dynamic DOM particles)
  // ============================================================

  const ctaEmberLayer = document.getElementById('cta-ember-layer');
  if (ctaEmberLayer) {
    const count = state.isMobile ? 12 : 35;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'cta-ember';

      const x = Math.random() * 100;
      const size = Math.random() * 5 + 2;
      const delay = Math.random() * 10;
      const duration = Math.random() * 8 + 8;
      const drift = (Math.random() - 0.5) * 100;
      const opacity = Math.random() * 0.65 + 0.2;

      el.style.cssText = `
        position: absolute;
        bottom: -20px;
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, #cbd5e1 0%, #dc2626 70%, transparent 100%);
        box-shadow: 0 0 ${size * 2}px rgba(220, 38, 38, 0.9), 0 0 ${size * 4}px rgba(185, 28, 28, 0.5);
        opacity: 0;
        pointer-events: none;
        animation: riseAndDrift ${duration}s linear infinite;
        animation-delay: ${delay}s;
        --opacity: ${opacity};
        --drift: ${drift};
      `;
      ctaEmberLayer.appendChild(el);
    }
  }

  // ============================================================
  // 7.5 SERVICES SECTION BACKGROUND EMBERS
  // ============================================================

  const servicesEmberLayer = document.getElementById('services-ember-layer');
  if (servicesEmberLayer) {
    const count = state.isMobile ? 12 : 28;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'services-ember';

      const x = Math.random() * 100;
      const size = Math.random() * 4 + 2;
      const delay = Math.random() * 12;
      const duration = Math.random() * 10 + 10;
      const drift = (Math.random() - 0.5) * 80;
      const opacity = Math.random() * 0.5 + 0.15;

      el.style.cssText = `
        position: absolute;
        bottom: -20px;
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, #cbd5e1 0%, #dc2626 70%, transparent 100%);
        box-shadow: 0 0 ${size * 2}px rgba(220, 38, 38, 0.9), 0 0 ${size * 4}px rgba(185, 28, 28, 0.5);
        opacity: 0;
        pointer-events: none;
        animation: riseAndDrift ${duration}s linear infinite;
        animation-delay: ${delay}s;
        --opacity: ${opacity};
        --drift: ${drift};
      `;
      servicesEmberLayer.appendChild(el);
    }
  }

  // ============================================================
  // 8. BUTTON SPARK EFFECT
  // ============================================================

  const fireButtons = document.querySelectorAll('.btn-fire-primary');

  fireButtons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      // Spawn 6 tiny cinematic sparks on hover
      for (let i = 0; i < 6; i++) {
        const spark = document.createElement('span');
        const size = Math.random() * 2 + 1.5;
        spark.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: #e2e8f0;
          box-shadow: 0 0 8px #dc2626, 0 0 3px #cbd5e1;
          top: 50%;
          left: 50%;
          pointer-events: none;
          z-index: 10;
          transform: translate(-50%, -50%);
        `;
        btn.appendChild(spark);

        const angle = Math.random() * 360 * (Math.PI / 180);
        const dist = Math.random() * 65 + 35;

        gsap.to(spark, {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          opacity: 0,
          scale: 0.1,
          duration: 0.5 + Math.random() * 0.4,
          ease: 'power2.out',
          onComplete: () => spark.remove(),
        });
      }
    });
  });

  // ============================================================
  // 8.5 BRAND IGNITER INTERACTIVE STRATEGY BUILDER
  // ============================================================

  const budgetSlider = document.getElementById('budget-slider');
  const budgetDisplay = document.getElementById('budget-display');
  const goalButtons = document.querySelectorAll('.goal-btn');
  const roiProjection = document.getElementById('roi-projection');
  const leadsProjection = document.getElementById('leads-projection');
  const channelContainer = document.getElementById('channel-tags-container');
  const checklistContainer = document.getElementById('blueprint-checklist-container');

  const strategyData = {
    launch: {
      roiBase: 3.2,
      roiVar: 1.2,
      leadCost: 650,
      channels: ['Digital Foundations', 'Identity Forging', 'Narrative Engineering'],
      checklist: [
        'Perform extensive competitor & voice audit',
        'Build conversion-engineered Digital Foundations',
        'Forge premium visual identity & branding assets',
        'Establish core social identity guidelines',
      ],
    },
    traffic: {
      roiBase: 3.8,
      roiVar: 1.6,
      leadCost: 520,
      channels: ['Visibility Ascension', 'Strategic Expansion', 'Content Authority'],
      checklist: [
        'Perform intent-based keyword research for Visibility Ascension',
        'Activate high-ROI paid Strategic Expansion campaigns',
        'Implement content schedule for Content Authority',
        'Configure deep behavioral analytics tracking',
      ],
    },
    conversion: {
      roiBase: 4.2,
      roiVar: 2.2,
      leadCost: 440,
      channels: ['Digital Foundations', 'Narrative Engineering', 'Empire Expansion'],
      checklist: [
        'Conduct page-by-page layout friction audits',
        'Deploy Narrative Engineering to refine sales copywriting',
        'Configure secondary abandoned cart flows',
        'Implement dynamic hotjar user heatmapping',
      ],
    },
    local: {
      roiBase: 3.0,
      roiVar: 1.8,
      leadCost: 380,
      channels: ['Local Dominance', 'Strategic Expansion', 'Identity Forging'],
      checklist: [
        'Optimize GMB Profile for Local Dominance',
        'Execute comprehensive local directories citation campaign',
        'Deploy geo-targeted ads for Strategic Expansion',
        'Setup organic automated review-acquisition engine',
      ],
    },
  };

  let activeGoal = 'launch';

  function formatBudget(val) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  }

  function updateStrategyBlueprint() {
    if (!budgetSlider) return;
    const budget = parseInt(budgetSlider.value, 10);
    const data = strategyData[activeGoal];

    // Calculate dynamic ROI (higher budgets increase efficiency)
    const budgetFactor = (budget - 30000) / (500000 - 30000); // 0 to 1
    const projectedRoi = (data.roiBase + budgetFactor * data.roiVar).toFixed(1);

    // Calculate Leads
    const projectedLeads = Math.round(budget / data.leadCost);

    // Update Text Outputs
    if (budgetDisplay) {
      budgetDisplay.textContent = formatBudget(budget);
    }

    // Animate numbers smoothly using GSAP
    if (roiProjection && leadsProjection) {
      gsap.to(roiProjection, {
        textContent: projectedRoi,
        duration: 0.4,
        snap: { textContent: 0.1 },
        ease: 'power2.out',
      });

      gsap.to(leadsProjection, {
        textContent: projectedLeads,
        duration: 0.4,
        snap: { textContent: 1 },
        ease: 'power2.out',
      });
    }

    // Render Channels
    if (channelContainer) {
      channelContainer.innerHTML = '';
      data.channels.forEach((ch) => {
        const tag = document.createElement('span');
        tag.className = 'channel-tag';
        tag.textContent = ch;
        channelContainer.appendChild(tag);
      });
    }

    // Render Checklist
    if (checklistContainer) {
      checklistContainer.innerHTML = '';
      data.checklist.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<i data-lucide="check" class="check-icon"></i> ${item}`;
        checklistContainer.appendChild(li);
      });
    }

    // Update Channel Chart Bar Heights dynamically
    const chartWeights = {
      launch: { seo: 30, sem: 20, web: 95, brand: 90, content: 40 },
      traffic: { seo: 95, sem: 90, web: 40, brand: 50, content: 75 },
      conversion: { seo: 60, sem: 85, web: 90, brand: 70, content: 65 },
      local: { seo: 85, sem: 70, web: 50, brand: 40, content: 45 },
    };

    const weights = chartWeights[activeGoal];
    if (weights) {
      Object.keys(weights).forEach((channel) => {
        const bar = document.getElementById(`bar-${channel}`);
        if (bar) {
          // Add minor dynamic budget variation (+/- 15%)
          let weightVal = weights[channel];
          if (channel === 'sem' || channel === 'content') {
            weightVal = Math.min(100, Math.round(weightVal + budgetFactor * 15));
          } else if (channel === 'web') {
            weightVal = Math.min(100, Math.round(weightVal + budgetFactor * 10));
          }
          bar.style.setProperty('--bar-h', `${weightVal}%`);
          const valEl = bar.querySelector('.chart-bar-val');
          if (valEl) {
            valEl.textContent = `${weightVal}%`;
          }
        }
      });
    }

    // Reinitialize Lucide Icons inside checklist
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Bind Events
  if (budgetSlider) {
    budgetSlider.addEventListener('input', updateStrategyBlueprint);
  }

  goalButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      goalButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeGoal = btn.getAttribute('data-goal');
      updateStrategyBlueprint();
    });
  });

  // Initial calculation trigger
  if (budgetSlider && checklistContainer) {
    updateStrategyBlueprint();
  }

  // ============================================================
  // 8.8 HIGH-INERTIA BASALT PANEL GLOW INTERPOLATION (LERP)
  // ============================================================

  const glowCards = document.querySelectorAll(
    '.service-card, .about-stat, .about-quote-card, .goal-btn, .proj-card, .portfolio-card, .dark-metal-method, .story-glyph-card, .why-pillar, .step-content'
  );

  glowCards.forEach((card) => {
    card.cardData = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      isHovered: false,
      initialized: false,
    };

    card.addEventListener('mouseenter', () => {
      card.cardData.isHovered = true;
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.cardData.targetX = e.clientX - rect.left;
      card.cardData.targetY = e.clientY - rect.top;

      if (!card.cardData.initialized) {
        card.cardData.currentX = card.cardData.targetX;
        card.cardData.currentY = card.cardData.targetY;
        card.cardData.initialized = true;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.cardData.isHovered = false;
      if (card.classList.contains('service-card')) {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      }
      if (card.classList.contains('portfolio-card')) {
        card.style.transform = '';
      }
      card.cardData.initialized = false;
    });
  });

  function updateCardGlows() {
    glowCards.forEach((card) => {
      const data = card.cardData;
      if (data && data.isHovered) {
        // Butter-smooth LERP
        data.currentX += (data.targetX - data.currentX) * 0.08;
        data.currentY += (data.targetY - data.currentY) * 0.08;
        card.style.setProperty('--x', `${data.currentX}px`);
        card.style.setProperty('--y', `${data.currentY}px`);

        // Real-time 3D perspective magnetic tilt for service cards
        if (card.classList.contains('service-card')) {
          const rect = card.getBoundingClientRect();
          const halfWidth = rect.width / 2;
          const halfHeight = rect.height / 2;
          // Calculate offset angles relative to the card's midpoint
          const tiltX = ((data.currentY - halfHeight) / halfHeight) * -6; // max 6deg
          const tiltY = ((data.currentX - halfWidth) / halfWidth) * 6; // max 6deg
          card.style.setProperty('--tilt-x', `${tiltX}deg`);
          card.style.setProperty('--tilt-y', `${tiltY}deg`);
        }

        // 3D perspective magnetic tilt for portfolio cards
        if (card.classList.contains('portfolio-card')) {
          const rect = card.getBoundingClientRect();
          const halfWidth = rect.width / 2;
          const halfHeight = rect.height / 2;
          const tiltX = ((data.currentY - halfHeight) / halfHeight) * -5;
          const tiltY = ((data.currentX - halfWidth) / halfWidth) * 5;
          card.style.transform = `translateY(-12px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
      }
    });
    requestAnimationFrame(updateCardGlows);
  }
  requestAnimationFrame(updateCardGlows);

  // ============================================================
  // 8.9 HIGH-INERTIA 3D MAGNETIC BUTTON EFFECT
  // ============================================================

  const magneticButtons = document.querySelectorAll(
    '.btn-fire-primary, .btn-fire-outline, .btn-fire-small, .btn-ghost, .btn-molten-giant'
  );

  if (!state.isMobile) {
    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        // Magnetic slide pull
        gsap.to(btn, {
          x: x * 0.32,
          y: y * 0.32,
          duration: 0.35,
          ease: 'power2.out',
        });

        // 3D Text shift depth
        const btnText = btn.querySelector('.btn-fire-text, span, i');
        if (btnText) {
          gsap.to(btnText, {
            x: x * 0.12,
            y: y * 0.12,
            duration: 0.35,
            ease: 'power2.out',
          });
        }
      });

      btn.addEventListener('mouseleave', () => {
        // Rebound wiggles w/ spring spring elasticity
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1.1, 0.45)',
        });
        const btnText = btn.querySelector('.btn-fire-text, span, i');
        if (btnText) {
          gsap.to(btnText, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1.1, 0.45)',
          });
        }
      });
    });
  }

  // ============================================================
  // 8.96 V4.0 — PORTFOLIO / PROCESS / WHY SECTION UPGRADES
  // ============================================================

  // Portfolio: ROI badge counter reveal on scroll
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const portfolioObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const roiEl = card.querySelector('.portfolio-roi');
          if (roiEl) {
            setTimeout(() => {
              roiEl.style.opacity = '0';
              roiEl.style.transform = 'scale(0.8)';
              gsap.to(roiEl, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.6)',
              });
            }, i * 150);
          }
          portfolioObserver.unobserve(card);
        }
      });
    },
    { threshold: 0.4 }
  );
  portfolioCards.forEach((card) => portfolioObserver.observe(card));

  // Process: Sequential lava connector reveal
  const processSection = document.getElementById('process');
  if (processSection) {
    const processObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger step numbers with glowing ring burst
            document.querySelectorAll('.step-number').forEach((el, i) => {
              setTimeout(() => {
                el.style.borderColor = 'rgba(220, 38, 38, 0.75)';
                el.style.boxShadow =
                  '0 0 20px rgba(220, 38, 38, 0.45), 0 0 40px rgba(153, 27, 27, 0.2)';
                el.style.background = 'rgba(185, 28, 28, 0.12)';
                gsap.fromTo(
                  el,
                  { scale: 0.6, opacity: 0 },
                  { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2)' }
                );
              }, i * 250);
            });
            processObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    processObs.observe(processSection);
  }

  // Why section: pillar reveal with fire spark burst
  const whySection = document.getElementById('why');
  if (whySection) {
    const whyObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.why-pillar').forEach((pillar, i) => {
              setTimeout(() => {
                // Spawn 4 micro sparks from pillar icon
                const icon = pillar.querySelector('.pillar-icon');
                if (icon && !state.isMobile) {
                  for (let s = 0; s < 4; s++) {
                    const spark = document.createElement('span');
                    spark.style.cssText = `
                      position: absolute;
                      width: 3px; height: 3px;
                      border-radius: 50%;
                      background: #94a3b8;
                      box-shadow: 0 0 6px #dc2626;
                      pointer-events: none;
                      z-index: 20;
                    `;
                    icon.appendChild(spark);
                    const angle = (s / 4) * Math.PI * 2;
                    gsap.to(spark, {
                      x: Math.cos(angle) * 30,
                      y: Math.sin(angle) * 30,
                      opacity: 0,
                      duration: 0.6 + Math.random() * 0.3,
                      ease: 'power2.out',
                      onComplete: () => spark.remove(),
                    });
                  }
                }
              }, i * 120);
            });
            whyObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    whyObs.observe(whySection);
  }

  // ============================================================
  // 8.95 CINEMATIC TEXT WORD/CHARACTER REVEAL GLOW SWEEPS
  // ============================================================

  const revealTitles = document.querySelectorAll('.section-title, .cta-headline');
  if (!state.isMobile) {
    revealTitles.forEach((title) => {
      gsap.fromTo(
        title,
        { opacity: 0, y: 35, filter: 'blur(8px) brightness(1.6)' },
        {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          filter: 'blur(0px) brightness(1)',
          duration: 1.4,
          ease: 'power3.out',
        }
      );
    });
  }

  // ============================================================
  // 8.98 HIGH-INERTIA 3D SCROLL-TRIGGERED PARALLAX SECTIONS
  // ============================================================

  const parallaxSections = document.querySelectorAll(
    '.about-section, .services-section, .portfolio-section, .process-section, .why-section, .igniter-section'
  );

  if (!state.isMobile) {
    parallaxSections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          transformOrigin: 'top center',
          rotationX: -2.5,
          opacity: 0.9,
          y: 35,
        },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
          rotationX: 0,
          opacity: 1,
          y: 0,
          ease: 'none',
        }
      );
    });
  }

  // ============================================================
  // 8.7 DYNAMIC CANVAS LAVA STREAM ENGINE
  // ============================================================

  const canvasLava = document.getElementById('canvas-lava');
  if (canvasLava && !state.isMobile) {
    const ctxL = canvasLava.getContext('2d');
    let wL = (canvasLava.width = window.innerWidth);
    let hL = (canvasLava.height = canvasLava.offsetHeight || 220);

    window.addEventListener('resize', () => {
      wL = canvasLava.width = window.innerWidth;
      hL = canvasLava.height = canvasLava.offsetHeight || 220;
    });

    let lastLavaTime = performance.now();
    let time = 0;
    function drawLava(currentTime = performance.now()) {
      const dt = Math.min((currentTime - lastLavaTime) / 16.666, 3);
      lastLavaTime = currentTime;

      // Skip rendering if scrolled past the hero section to optimize CPU usage
      if (state.scrollY > 400) {
        requestAnimationFrame(drawLava);
        return;
      }

      ctxL.clearRect(0, 0, wL, hL);
      time += 0.003 * dt;

      // Draw three overlapping layered sine waves of molten crimson/orange magma
      const waves = [
        { amplitude: 24, frequency: 0.003, speed: 0.006, color: 'rgba(122, 10, 10, 0.45)' },
        { amplitude: 18, frequency: 0.005, speed: -0.009, color: 'rgba(255, 26, 26, 0.35)' },
        { amplitude: 12, frequency: 0.007, speed: 0.012, color: 'rgba(220, 38, 38, 0.55)' },
      ];

      waves.forEach((w) => {
        ctxL.beginPath();
        const grad = ctxL.createLinearGradient(0, 0, 0, hL);
        grad.addColorStop(0, w.color);
        grad.addColorStop(0.6, 'rgba(26, 2, 2, 0.85)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 1)');

        ctxL.fillStyle = grad;
        ctxL.moveTo(0, hL);

        for (let x = 0; x <= wL; x += 15) {
          const y = hL - 35 + Math.sin(x * w.frequency + time * w.speed * 80) * w.amplitude;
          ctxL.lineTo(x, y);
        }

        ctxL.lineTo(wL, hL);
        ctxL.closePath();
        ctxL.fill();
      });

      requestAnimationFrame(drawLava);
    }
    requestAnimationFrame(drawLava);
  }

  // ============================================================
  // 9. PERFORMANCE — Reduced Motion Respect
  // ============================================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Immediately show all animated elements, skip motion
    document
      .querySelectorAll(
        '#hero-eyebrow, #hero-headline, #hero-subheader-hud, #hero-subheadline, #hero-cta-group, #hero-trust-strip, #hero-visual'
      )
      .forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });

    // Kill all GSAP animations
    gsap.globalTimeline.clear();
  }

  // ============================================================
  // 9.5 CONTACT SECTION ACTIVE TELEMETRY OBSERVER
  // ============================================================
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const contactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contactSection.classList.add('contact-active');
          } else {
            contactSection.classList.remove('contact-active');
          }
        });
      },
      { threshold: 0.15 }
    );
    contactObserver.observe(contactSection);
  }

  // ============================================================
  // 9.8 ALL SERVICES MODAL
  // ============================================================

  const asmModal = document.getElementById('all-services-modal');
  const asmOpenBtn = document.getElementById('btn-see-all-services');
  const asmCloseBtn = document.getElementById('asm-close');
  const asmBackdrop = document.getElementById('asm-backdrop');
  const asmCtaBtn = document.getElementById('asm-cta-btn');

  function openServicesModal() {
    if (!asmModal) return;
    asmModal.classList.add('asm-open');
    document.body.style.overflow = 'hidden';
    if (typeof lenis !== 'undefined') lenis.stop();

    // Reinit Lucide icons inside modal
    if (window.lucide) window.lucide.createIcons();

    // Attach spotlight LERP to modal cards
    const modalCards = asmModal.querySelectorAll('.asm-card');
    modalCards.forEach((card) => {
      if (card._asmInited) return;
      card._asmInited = true;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow = card.querySelector('.asm-card-glow');
        if (glow) {
          glow.style.setProperty('--x', `${x}px`);
          glow.style.setProperty('--y', `${y}px`);
        }
      });
    });

    // Focus close button for accessibility
    setTimeout(() => asmCloseBtn?.focus(), 100);
  }

  function closeServicesModal() {
    if (!asmModal) return;
    asmModal.classList.remove('asm-open');
    document.body.style.overflow = '';
    if (typeof lenis !== 'undefined') lenis.start();
    asmOpenBtn?.focus();
  }

  asmOpenBtn?.addEventListener('click', openServicesModal);
  asmCloseBtn?.addEventListener('click', closeServicesModal);
  asmBackdrop?.addEventListener('click', closeServicesModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && asmModal?.classList.contains('asm-open')) {
      closeServicesModal();
    }
  });

  // When CTA inside modal is clicked — close modal then scroll to contact
  asmCtaBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    closeServicesModal();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  });

  // ============================================================
  // V5.0 APEX INTERACTIVE ADDITIONS
  // ============================================================

  // 1. Portfolio Filter Tabs Click Handler
  const filterTabs = document.querySelectorAll('.pf-tab');
  const filterCards = document.querySelectorAll('.portfolio-card');
  if (filterTabs.length && filterCards.length) {
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const filterVal = tab.getAttribute('data-filter');

        filterCards.forEach((card) => {
          if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              clearProps: 'transform',
              onStart: () => {
                card.style.display = '';
              },
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.95,
              duration: 0.3,
              onComplete: () => {
                card.style.display = 'none';
              },
            });
          }
        });
      });
    });
  }

  // 2. Proof Strip + Why Stats Counter IntersectionObserver
  const counterElements = document.querySelectorAll(
    '.proof-number[data-target], .why-stat-num[data-target]'
  );
  if (counterElements.length) {
    const startCounter = (el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const isDecimal = el.classList.contains('proof-decimal');
      const duration = 2; // seconds
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val);
        },
      });
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    counterElements.forEach((el) => counterObserver.observe(el));
  }

  // 3. Portfolio Stat Bar scroll/viewport animation trigger
  const statBarObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.portfolio-card').forEach((card) => {
    statBarObserver.observe(card);
  });

  // 4. Vertical Lava Spine dynamic charging path
  const processTimeline = document.querySelector('.process-timeline');
  const spineFill = document.getElementById('spine-fill');
  const processSteps = document.querySelectorAll('.process-step');

  if (processTimeline && spineFill && processSteps.length) {
    ScrollTrigger.create({
      trigger: processTimeline,
      start: 'top 60%',
      end: 'bottom 60%',
      scrub: true,
      onUpdate: (self) => {
        spineFill.style.height = `${self.progress * 100}%`;
        processSteps.forEach((step) => {
          const stepRect = step.getBoundingClientRect();
          const triggerPoint = window.innerHeight * 0.6;
          if (stepRect.top < triggerPoint) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      },
    });
  }

  // 5. Testimonial Cards GSAP stagger reveal
  if (document.querySelector('.testimonial-card')) {
    gsap.from('.testimonial-card', {
      scrollTrigger: {
        trigger: '.testimonials-row',
        start: 'top 85%',
      },
      opacity: 0,
      y: 40,
      duration: 1.0,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }
});
