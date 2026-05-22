import './style.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHero } from './hero.js';
import { initCollections } from './collections.js';
import { initCraft } from './craft.js';
import { initContact } from './contact.js';

gsap.registerPlugin(ScrollTrigger);

// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ===== PAGE LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('loaded');
    initHeroAnimations();
  }, 2400);
});

// ===== CUSTOM CURSOR =====
const cursorRing = document.getElementById('cursorRing');
const cursorDot = document.getElementById('cursorDot');
let ringX = 0, ringY = 0, dotX = 0, dotY = 0;

if (cursorRing && cursorDot && window.matchMedia('(pointer: fine)').matches) {
  document.body.style.cursor = 'none';

  document.addEventListener('mousemove', (e) => {
    dotX = e.clientX;
    dotY = e.clientY;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
  });

  function updateRing() {
    ringX += (dotX - ringX) * 0.15;
    ringY += (dotY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(updateRing);
  }
  updateRing();

  // Expand on hover over links/buttons
  const hoverTargets = document.querySelectorAll('a, button, .card-cta, .pill');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('expanded'));
  });
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;
  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${progress})`;
  }
});

// ===== NAVBAR SCROLL STATE =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    // Stagger links in
    gsap.fromTo(mobileLinks, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.15 }
    );
  });

  mobileNavClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

// ===== SCROLL INDICATOR FADE =====
const scrollIndicator = document.getElementById('scrollIndicator');
window.addEventListener('scroll', () => {
  if (scrollIndicator) {
    scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
  }
});

// ===== HERO ENTRY ANIMATIONS =====
function initHeroAnimations() {
  // Title letter stagger
  const title = document.getElementById('heroTitle');
  if (title) {
    const text = title.textContent;
    title.innerHTML = '';
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(40px)';
      title.appendChild(span);
    });
    gsap.to(title.querySelectorAll('span'), {
      opacity: 1, y: 0, stagger: 0.06, duration: 0.8,
      ease: 'power3.out', delay: 1.0
    });
  }

  // Tagline
  gsap.to('#heroTagline', { opacity: 1, duration: 0.8, delay: 2.8, ease: 'power2.out' });
  // Rule
  gsap.to('#heroRule', { opacity: 1, duration: 0.6, delay: 3.2, ease: 'power2.out' });
  // Subline
  gsap.to('#heroSubline', { opacity: 1, duration: 0.8, delay: 3.4, ease: 'power2.out' });
}

// ===== GOLD DUST ON HERO MOUSE MOVE =====
const heroSection = document.getElementById('home');
if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 4; i++) {
      const dust = document.createElement('span');
      dust.classList.add('gold-dust');
      const dx = (Math.random() - 0.5) * 50;
      const dy = Math.random() * 50 + 10;
      dust.style.setProperty('--dx', dx + 'px');
      dust.style.setProperty('--dy', dy + 'px');
      dust.style.left = e.clientX + (Math.random() - 0.5) * 10 + 'px';
      dust.style.top = e.clientY + (Math.random() - 0.5) * 10 + 'px';
      dust.style.width = (Math.random() * 3 + 2) + 'px';
      dust.style.height = dust.style.width;
      heroSection.appendChild(dust);
      setTimeout(() => dust.remove(), 1200);
    }
  });
}

// ===== SECTION TITLE CLIP-PATH REVEALS =====
const sectionTitles = document.querySelectorAll(
  '.collections-header h2, .craft-header h2, .world-header h2, .bridal-header h2, .contact-form-wrap h2'
);
sectionTitles.forEach(title => {
  gsap.to(title, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: title,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    }
  });
});

// ===== ABOUT BELIEFS STAGGER =====
const beliefs = document.querySelectorAll('.belief');
beliefs.forEach((belief, i) => {
  gsap.to(belief, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: i * 0.2,
    scrollTrigger: {
      trigger: belief,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    }
  });
});

// ===== WORLD QUOTE PARALLAX =====
const worldQuote = document.getElementById('worldQuote');
if (worldQuote) {
  gsap.to(worldQuote, {
    y: -80,
    scrollTrigger: {
      trigger: '#world',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
    }
  });
}

// ===== WORLD HEADER PARALLAX =====
const worldHeader = document.querySelector('.world-header h2');
if (worldHeader) {
  gsap.to(worldHeader, {
    y: -40,
    scrollTrigger: {
      trigger: '#world',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.3,
    }
  });
}

// ===== BRIDAL TIMELINE ANIMATIONS =====
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, i) => {
  const isOdd = i % 2 === 0;
  gsap.fromTo(item.querySelector('.timeline-card'),
    { opacity: 0, x: isOdd ? -60 : 60 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    }
  );

  // Node glow
  const node = item.querySelector('.timeline-node');
  ScrollTrigger.create({
    trigger: item,
    start: 'top 75%',
    end: 'bottom 25%',
    onEnter: () => node.classList.add('in-view'),
    onLeave: () => node.classList.remove('in-view'),
    onEnterBack: () => node.classList.add('in-view'),
    onLeaveBack: () => node.classList.remove('in-view'),
  });
});

// ===== INIT MODULES =====
initHero();
initCollections();
initCraft();
initContact();
