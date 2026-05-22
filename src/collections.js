import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCollections() {
  const pin = document.getElementById('collectionsPin');
  const track = document.getElementById('collectionsTrack');
  const progressBar = document.getElementById('collectionsProgressBar');
  if (!pin || !track) return;

  // Only do horizontal pin on desktop
  const mm = gsap.matchMedia();

  mm.add('(min-width: 769px)', () => {
    const cards = track.querySelectorAll('.collection-card');
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;

    const scrollDistance = totalWidth - viewportWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.collections',
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        pin: pin,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBar) {
            progressBar.style.width = `${self.progress * 100}%`;
          }
        }
      }
    });

    tl.to(track, {
      x: -scrollDistance,
      ease: 'none',
    });

    return () => {
      // cleanup
    };
  });

  // Mobile: CSS scroll-snap handles it, no GSAP needed
}
