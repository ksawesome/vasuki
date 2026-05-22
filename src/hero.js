import * as THREE from 'three';

export function initHero() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Particle system
  const count = 800;
  const positions = new Float32Array(count * 3);
  const velocities = [];
  const basePositions = [];

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 60;
    const y = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 20;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    basePositions.push({ x, y, z });
    velocities.push({
      x: (Math.random() - 0.5) * 0.005,
      y: (Math.random() - 0.5) * 0.005,
      z: (Math.random() - 0.5) * 0.002
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Generate a soft circular particle texture via canvas
  const particleCanvas = document.createElement('canvas');
  particleCanvas.width = 32;
  particleCanvas.height = 32;
  const ctx = particleCanvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(201,168,76,1)');
  gradient.addColorStop(0.4, 'rgba(201,168,76,0.6)');
  gradient.addColorStop(1, 'rgba(201,168,76,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  const particleTexture = new THREE.CanvasTexture(particleCanvas);

  const material = new THREE.PointsMaterial({
    color: 0xC9A84C,
    size: 0.4,
    map: particleTexture,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse interaction
  const mouse = { x: 0, y: 0 };
  const heroEl = document.getElementById('home');

  heroEl.addEventListener('mousemove', (e) => {
    mouse.x = ((e.clientX / window.innerWidth) * 2 - 1) * 30;
    mouse.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 20;
  });

  // Simple noise function (simplified Perlin-like)
  function noise(x, y, t) {
    return Math.sin(x * 0.3 + t) * Math.cos(y * 0.3 + t * 0.7) * 0.5;
  }

  let time = 0;

  function animate() {
    requestAnimationFrame(animate);
    time += 0.003;

    const pos = geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const base = basePositions[i];
      const vel = velocities[i];

      // Noise-based drift
      const nx = noise(base.x, base.y, time + i * 0.01);
      const ny = noise(base.y, base.x, time * 0.8 + i * 0.01);

      pos[i3] = base.x + nx * 2 + Math.sin(time + i) * vel.x * 40;
      pos[i3 + 1] = base.y + ny * 2 + Math.cos(time + i) * vel.y * 40;
      pos[i3 + 2] = base.z + Math.sin(time * 0.5 + i) * vel.z * 20;

      // Mouse attraction (~30px radius mapped to world space)
      const dx = mouse.x - pos[i3];
      const dy = mouse.y - pos[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      const attractRadius = 8;

      if (dist < attractRadius) {
        const force = (1 - dist / attractRadius) * 0.15;
        pos[i3] += dx * force;
        pos[i3 + 1] += dy * force;
      }
    }

    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
