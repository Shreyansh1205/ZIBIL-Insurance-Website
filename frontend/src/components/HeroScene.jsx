import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const GOLD = 0xd8b26a;
const BLUE = 0x3b8cff;
const TEAL = 0x35d6c4;

function shieldShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 1.45);
  s.bezierCurveTo(0.62, 1.12, 1.05, 0.96, 1.05, 0.38);
  s.bezierCurveTo(1.04, -0.48, 0.48, -1.02, 0, -1.45);
  s.bezierCurveTo(-0.48, -1.02, -1.04, -0.48, -1.05, 0.38);
  s.bezierCurveTo(-1.05, 0.96, -0.62, 1.12, 0, 1.45);
  return s;
}

function buildShield() {
  const g = new THREE.Group();
  const geo = new THREE.ExtrudeGeometry(shieldShape(), {
    depth: 0.34, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.07, bevelSegments: 8, curveSegments: 48,
  });
  geo.center();
  const body = new THREE.Mesh(
    geo,
    new THREE.MeshPhysicalMaterial({
      color: 0x0d2a54, metalness: 0.55, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.1,
    })
  );
  g.add(body);

  // gold rim: slightly larger back plate
  const rim = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shieldShape(), { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.16, bevelSegments: 6, curveSegments: 48 }),
    new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.2, envMapIntensity: 1.4 })
  );
  rim.geometry.center();
  rim.position.z = -0.1;
  g.add(rim);

  // gold check mark
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.44, 0.0, 0), new THREE.Vector3(-0.14, -0.3, 0), new THREE.Vector3(0.48, 0.38, 0),
  ], false, 'catmullrom', 0.1);
  const check = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 40, 0.085, 16, false),
    new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.18, emissive: 0x6b4a14, emissiveIntensity: 0.35 })
  );
  check.position.z = 0.27;
  g.add(check);
  return g;
}

function buildOrb() {
  const g = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.8, 3),
    new THREE.MeshPhysicalMaterial({ color: 0x0f3a7a, metalness: 0.4, roughness: 0.15, clearcoat: 1, emissive: 0x0a3a8c, emissiveIntensity: 0.55 })
  );
  g.add(core);
  const wire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.08, 1),
    new THREE.MeshBasicMaterial({ color: TEAL, wireframe: true, transparent: true, opacity: 0.35 })
  );
  wire.name = 'wire';
  g.add(wire);
  return g;
}

function ring(radius, tube, color, tilt) {
  const m = new THREE.Mesh(
    new THREE.TorusGeometry(radius, tube, 24, 160),
    new THREE.MeshStandardMaterial({ color, metalness: 1, roughness: 0.25, envMapIntensity: 1.3 })
  );
  m.rotation.set(tilt[0], tilt[1], tilt[2]);
  return m;
}

/**
 * variant "shield": public hero. variant "orb": compact dashboard visual.
 * Transparent canvas so it sits on any background.
 */
export default function HeroScene({ variant = 'shield', className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return undefined; // CSS fallback behind canvas remains visible
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, variant === 'orb' ? 6.6 : 9.2);

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    const rimLight = new THREE.PointLight(BLUE, 40, 14);
    rimLight.position.set(-4, -1, 3);
    const warm = new THREE.PointLight(GOLD, 28, 14);
    warm.position.set(4, -2, 2);
    scene.add(key, rimLight, warm);

    const hero = new THREE.Group();
    const centre = variant === 'orb' ? buildOrb() : buildShield();
    hero.add(centre);

    const rings = new THREE.Group();
    if (variant === 'orb') {
      rings.add(ring(1.5, 0.018, GOLD, [Math.PI / 2.4, 0.2, 0]));
      rings.add(ring(1.78, 0.012, 0x8fc2ff, [Math.PI / 3, -0.6, 0.4]));
    } else {
      rings.add(ring(1.95, 0.022, GOLD, [Math.PI / 2.2, 0.35, 0]));
      rings.add(ring(2.2, 0.012, 0x8fc2ff, [Math.PI / 2.8, -0.5, 0.2]));
    }
    hero.add(rings);

    // orbiting satellites on the first ring
    const sats = [];
    const satGeo = new THREE.SphereGeometry(variant === 'orb' ? 0.06 : 0.09, 24, 24);
    for (let i = 0; i < 3; i += 1) {
      const m = new THREE.Mesh(satGeo, new THREE.MeshStandardMaterial({ color: i === 1 ? TEAL : GOLD, emissive: i === 1 ? TEAL : GOLD, emissiveIntensity: 0.8, metalness: 0.6, roughness: 0.2 }));
      m.userData.offset = (i / 3) * Math.PI * 2;
      rings.children[0].add(m);
      sats.push(m);
    }

    // ambient particles
    const count = variant === 'orb' ? 70 : 160;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = 2.6 + Math.random() * 2.4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.75;
      pos[i * 3 + 2] = r * Math.cos(ph) - 1;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xbfd8ff, size: 0.03, transparent: true, opacity: 0.7, depthWrite: false }));
    scene.add(hero, dust);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = (variant === 'orb' ? 6.6 : 9.2) * (w / h < 0.9 ? 1.25 : 1);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
      const r = mount.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const calm = reduce.matches ? 0 : 1;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;

      hero.rotation.y = pointer.x * 0.55 + Math.sin(t * 0.5) * 0.18 * calm;
      hero.rotation.x = pointer.y * 0.28;
      hero.position.y = Math.sin(t * 0.9) * 0.1 * calm;
      rings.rotation.z = t * 0.12 * calm;
      rings.children[1].rotation.z = -t * 0.18 * calm;
      const wire = centre.getObjectByName('wire');
      if (wire) { wire.rotation.y = t * 0.25 * calm; wire.rotation.x = t * 0.12 * calm; }
      sats.forEach((s) => {
        const a = t * 0.7 * calm + s.userData.offset;
        const rr = variant === 'orb' ? 1.5 : 1.95;
        s.position.set(Math.cos(a) * rr, Math.sin(a) * rr, 0);
      });
      dust.rotation.y = t * 0.02 * calm;
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [variant]);

  return <div ref={mountRef} className={`hero-scene ${className}`} aria-hidden="true" />;
}
