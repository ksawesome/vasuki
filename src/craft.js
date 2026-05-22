import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCraft() {
  const panels = document.querySelectorAll('.craft-panel');
  const images = document.querySelectorAll('#craftImages .craft-img');
  if (!panels.length || !images.length) return;

  // Animate each panel in on scroll
  panels.forEach((panel, i) => {
    gsap.fromTo(panel,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Cross-fade images based on which panel is in view
    ScrollTrigger.create({
      trigger: panel,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => activateImage(i),
      onEnterBack: () => activateImage(i),
    });
  });

  function activateImage(index) {
    images.forEach((img, i) => {
      if (i === index) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }
}
