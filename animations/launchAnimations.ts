import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const glitchKeyframes = [
  { x: -2, opacity: 0.7, duration: 0.05 },
  { x: 3, opacity: 1, duration: 0.06 },
  { x: -4, opacity: 0.6, duration: 0.04 },
  { x: 2, opacity: 0.9, duration: 0.05 },
  { x: -1, opacity: 0.5, duration: 0.05 },
  { x: 4, opacity: 1, duration: 0.06 },
  { x: -3, opacity: 0.65, duration: 0.05 },
  { x: 1, opacity: 0.85, duration: 0.05 },
  { x: 0, opacity: 1, duration: 0.08 },
  { x: -2, opacity: 0.6, duration: 0.05 },
  { x: 2, opacity: 1, duration: 0.06 },
  { x: -5, opacity: 0.7, duration: 0.04 },
  { x: 3, opacity: 0.95, duration: 0.05 },
  { x: -1, opacity: 0.6, duration: 0.05 },
  { x: 2, opacity: 1, duration: 0.06 },
  { x: -3, opacity: 0.75, duration: 0.05 },
  { x: 1, opacity: 0.9, duration: 0.06 },
  { x: -2, opacity: 0.6, duration: 0.05 },
  { x: 0, opacity: 1, duration: 0.07 },
];

const sweepKeyframes = [
  { xPercent: -140, opacity: 0, duration: 0 },
  { xPercent: -80, opacity: 0.5, duration: 0.4 },
  { xPercent: -30, opacity: 0.9, duration: 0.4 },
  { xPercent: 20, opacity: 0.7, duration: 0.4 },
  { xPercent: 70, opacity: 0.4, duration: 0.4 },
  { xPercent: 140, opacity: 0, duration: 0.4 },
  { xPercent: -140, opacity: 0, duration: 0 },
];

const flareKeyframes = [
  { scale: 0.6, opacity: 0, duration: 0.2 },
  { scale: 1.1, opacity: 0.8, duration: 0.25 },
  { scale: 0.9, opacity: 0.4, duration: 0.25 },
  { scale: 1.4, opacity: 0.9, duration: 0.2 },
  { scale: 0.7, opacity: 0.2, duration: 0.3 },
  { scale: 1.2, opacity: 0.85, duration: 0.2 },
  { scale: 0.5, opacity: 0, duration: 0.25 },
];

const orbitSteps = [
  { rotation: 0, scale: 0.9, duration: 0.6 },
  { rotation: 45, scale: 1.05, duration: 0.8 },
  { rotation: 90, scale: 0.95, duration: 0.8 },
  { rotation: 130, scale: 1.1, duration: 0.7 },
  { rotation: 170, scale: 0.9, duration: 0.6 },
  { rotation: 210, scale: 1.05, duration: 0.8 },
  { rotation: 260, scale: 0.98, duration: 0.7 },
  { rotation: 320, scale: 1.08, duration: 0.9 },
  { rotation: 360, scale: 0.92, duration: 0.6 },
];

const meterKeyframes = [
  { scaleX: 0.2, duration: 0.4 },
  { scaleX: 0.4, duration: 0.4 },
  { scaleX: 0.6, duration: 0.4 },
  { scaleX: 0.9, duration: 0.4 },
  { scaleX: 0.5, duration: 0.4 },
  { scaleX: 0.8, duration: 0.4 },
  { scaleX: 0.35, duration: 0.4 },
  { scaleX: 0.75, duration: 0.4 },
  { scaleX: 0.25, duration: 0.4 },
];

const shimmerKeyframes = [
  { opacity: 0.15, duration: 0.2 },
  { opacity: 0.5, duration: 0.2 },
  { opacity: 0.25, duration: 0.2 },
  { opacity: 0.7, duration: 0.2 },
  { opacity: 0.2, duration: 0.2 },
  { opacity: 0.6, duration: 0.2 },
  { opacity: 0.1, duration: 0.2 },
];

const rasterKeyframes = [
  { opacity: 0.05, duration: 0.2 },
  { opacity: 0.18, duration: 0.2 },
  { opacity: 0.08, duration: 0.2 },
  { opacity: 0.22, duration: 0.2 },
  { opacity: 0.1, duration: 0.2 },
  { opacity: 0.26, duration: 0.2 },
  { opacity: 0.06, duration: 0.2 },
];

const driftKeyframes = [
  { x: -12, y: 6, opacity: 0.2, duration: 0.4 },
  { x: 14, y: -4, opacity: 0.5, duration: 0.4 },
  { x: -8, y: 10, opacity: 0.3, duration: 0.4 },
  { x: 10, y: -6, opacity: 0.6, duration: 0.4 },
  { x: -6, y: 8, opacity: 0.2, duration: 0.4 },
  { x: 12, y: -2, opacity: 0.45, duration: 0.4 },
  { x: 0, y: 0, opacity: 0.2, duration: 0.4 },
];

const edgeBlinkKeyframes = [
  { opacity: 0.15, duration: 0.3 },
  { opacity: 0.6, duration: 0.3 },
  { opacity: 0.25, duration: 0.3 },
  { opacity: 0.75, duration: 0.3 },
  { opacity: 0.2, duration: 0.3 },
  { opacity: 0.55, duration: 0.3 },
];

export const createLaunchAnimations = (root: HTMLElement) => {
  const cleanupFns: Array<() => void> = [];

  const ctx = gsap.context(() => {
    gsap.set('.launch-orbit-ring', { transformOrigin: '50% 50%' });
    gsap.set('.launch-flare', { transformOrigin: '50% 50%' });
    gsap.set('.launch-meter-fill', { transformOrigin: '0% 50%' });
    gsap.set('.launch-grid', { backgroundPosition: '0px 0px' });

    const introTl = gsap.timeline({ defaults: { ease: 'power3.out', immediateRender: false } });
    introTl
      .from('.launch-kicker', { y: 30, opacity: 0, duration: 0.7 })
      .from('.launch-title-line', { y: 120, opacity: 0, skewY: 6, stagger: 0.12, duration: 0.9 }, '-=0.4')
      .from('.launch-subtitle', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5')
      .from('.launch-action', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.4')
      .from('.launch-stat', { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.3');

    gsap.to('.launch-grid', {
      backgroundPosition: '160px 220px',
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'none',
    });

    gsap.to('.launch-glitch', {
      keyframes: glitchKeyframes,
      repeat: -1,
      repeatDelay: 1.8,
      ease: 'none',
    });

    gsap.to('.launch-sweep', {
      keyframes: sweepKeyframes,
      duration: 3.6,
      repeat: -1,
      ease: 'none',
    });

    gsap.to('.launch-flare', {
      keyframes: flareKeyframes,
      duration: 2.4,
      repeat: -1,
      ease: 'none',
    });

    gsap.to('.launch-shimmer', {
      keyframes: shimmerKeyframes,
      duration: 1.8,
      repeat: -1,
      ease: 'none',
    });

    gsap.to('.launch-raster', {
      keyframes: rasterKeyframes,
      duration: 2.4,
      repeat: -1,
      ease: 'none',
      stagger: 0.1,
    });

    gsap.to('.launch-drift', {
      keyframes: driftKeyframes,
      duration: 3.2,
      repeat: -1,
      ease: 'none',
      stagger: 0.12,
    });

    gsap.to('.launch-edge-blink', {
      keyframes: edgeBlinkKeyframes,
      duration: 2.2,
      repeat: -1,
      ease: 'none',
      stagger: 0.1,
    });

    const rings = gsap.utils.toArray<HTMLElement>('.launch-orbit-ring');
    rings.forEach((ring, index) => {
      gsap.to(ring, {
        keyframes: orbitSteps,
        duration: 8 + index * 2,
        repeat: -1,
        ease: 'none',
      });
    });

    const sparks = gsap.utils.toArray<HTMLElement>('.launch-spark');
    sparks.forEach((spark, index) => {
      gsap.fromTo(
        spark,
        { opacity: 0, scale: 0.4 },
        {
          opacity: 0.7,
          scale: 1.2,
          duration: 0.8,
          repeat: -1,
          repeatDelay: 1.4 + index * 0.1,
          yoyo: true,
          ease: 'sine.inOut',
        }
      );
    });

    const stripes = gsap.utils.toArray<HTMLElement>('.launch-stripe');
    stripes.forEach((stripe, index) => {
      gsap.fromTo(
        stripe,
        { xPercent: -120, opacity: 0 },
        {
          xPercent: 120,
          opacity: 0.25,
          duration: 6 + index,
          repeat: -1,
          ease: 'none',
          delay: index * 0.2,
        }
      );
    });

    const bars = gsap.utils.toArray<HTMLElement>('.launch-meter-fill');
    bars.forEach((bar, index) => {
      gsap.to(bar, {
        keyframes: meterKeyframes,
        duration: 3 + index * 0.3,
        repeat: -1,
        ease: 'power1.inOut',
        delay: index * 0.2,
      });
    });

    gsap.from('.launch-rail', {
      scaleX: 0,
      transformOrigin: '0% 50%',
      duration: 1.6,
      ease: 'power2.out',
    });

    gsap.from('.launch-rail-dot', {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: 'back.out(1.6)',
    });

    ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.to('.launch-title-line', { yPercent: -20 * self.progress, duration: 0.1, overwrite: true });
        gsap.to('.launch-subtitle', { yPercent: 14 * self.progress, duration: 0.1, overwrite: true });
        gsap.to('.launch-orbit', { rotation: 12 * self.progress, duration: 0.1, overwrite: true });
      },
    });

    const parallaxItems = gsap.utils.toArray<HTMLElement>('.launch-parallax');
    const parallaxSetters = parallaxItems.map((el) => ({
      el,
      x: gsap.quickSetter(el, 'x', 'px'),
      y: gsap.quickSetter(el, 'y', 'px'),
      depth: Number(el.dataset.depth || '0.2'),
    }));

    const onMove = (event: MouseEvent) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      parallaxSetters.forEach((item) => {
        item.x(nx * 30 * item.depth);
        item.y(ny * 30 * item.depth);
      });
    };

    window.addEventListener('mousemove', onMove);
    cleanupFns.push(() => window.removeEventListener('mousemove', onMove));

    ScrollTrigger.refresh();
  }, root);

  return () => {
    cleanupFns.forEach((fn) => fn());
    ctx.revert();
  };
};
