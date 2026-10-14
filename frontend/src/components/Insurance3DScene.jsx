import { useEffect, useRef } from "react";
import * as THREE from "three";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const phase = (progress, a, b) => smoothstep(a, b, progress);
const lerp = (a, b, t) => a + (b - a) * t;

function createShieldShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 1.45);
  shape.bezierCurveTo(0.62, 1.12, 1.05, 0.96, 1.05, 0.38);
  shape.bezierCurveTo(1.04, -0.48, 0.48, -1.02, 0, -1.45);
  shape.bezierCurveTo(-0.48, -1.02, -1.04, -0.48, -1.05, 0.38);
  shape.bezierCurveTo(-1.05, 0.96, -0.62, 1.12, 0, 1.45);
  return shape;
}

function createCheckShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.35, 0.05);
  shape.lineTo(-0.12, -0.22);
  shape.lineTo(0.38, 0.35);
  return shape;
}

/**
 * Insurance3DScene Component
 * Enhanced with support for multiple visual concepts and improved performance
 * 
 * Props:
 * - concept: 'quantum' | 'minimal' | 'organic' | 'luxury' (optional)
 * - intensity: 'high' | 'medium' | 'low' (controls animation intensity)
 */
export default function Insurance3DScene({ concept = "quantum", intensity = "medium" }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return undefined;
    }

    // Check for reduced motion preference
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    const onMotionChange = (event) => {
      reducedMotion = event.matches;
    };
    reducedMotionQuery.addEventListener?.("change", onMotionChange);

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Adjust fog based on concept
    const fogColors = {
      quantum: 0x0a0e27,
      minimal: 0x0d1b2a,
      organic: 0x0a0a0a,
      luxury: 0x0f0f0f,
    };
    
    scene.fog = new THREE.FogExp2(fogColors[concept] || 0xf7f9fc, 0.028);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 120);
    camera.position.set(0, 0.2, 10.5);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.setAttribute("aria-hidden", "true");
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const core = new THREE.Group();
    const rings = new THREE.Group();
    const network = new THREE.Group();
    const architecture = new THREE.Group();
    const cards = new THREE.Group();
    const orbits = new THREE.Group();
    const ambientOrbs = new THREE.Group();
    root.add(core, rings, network, architecture, cards, orbits, ambientOrbs);

    // Lighting — enhanced for different concepts
    const ambientIntensities = {
      quantum: 1.5,
      minimal: 1.2,
      organic: 1.35,
      luxury: 1.0,
    };

    const ambient = new THREE.AmbientLight(0xffffff, ambientIntensities[concept] || 1.35);
    scene.add(ambient);

    const keyLightColors = {
      quantum: 0x00d9ff,
      minimal: 0xe11d48,
      organic: 0x14b8a6,
      luxury: 0xd4af37,
    };

    const key = new THREE.PointLight(keyLightColors[concept] || 0x2d7fe8, 28, 22);
    key.position.set(4.5, 3.2, 6);
    scene.add(key);

    const warm = new THREE.PointLight(0xff9a62, 16, 18);
    warm.position.set(-4.2, -2.2, 4.5);
    scene.add(warm);

    const fill = new THREE.PointLight(0x5ea8ff, 8, 14);
    fill.position.set(0, 4, -2);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xc99a45, 0.55);
    rim.position.set(-3, 2, -4);
    scene.add(rim);

    // ── Core shield ──────────────────────────────────────────
    const shieldMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfdfefe,
      metalness: 0.22,
      roughness: 0.16,
      transmission: 0.38,
      transparent: true,
      opacity: 0.82,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      side: THREE.DoubleSide,
      envMapIntensity: 1.2,
    });

    const shield = new THREE.Mesh(
      new THREE.ExtrudeGeometry(createShieldShape(), {
        depth: 0.18,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize: 0.04,
        bevelThickness: 0.04,
      }),
      shieldMaterial
    );
    shield.scale.setScalar(1.32);
    core.add(shield);

    const shieldEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(shield.geometry),
      new THREE.LineBasicMaterial({
        color: 0x1769e0,
        transparent: true,
        opacity: 0.78,
      })
    );
    shieldEdges.scale.copy(shield.scale);
    core.add(shieldEdges);

    // Inner energy core
    const heart = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.52, 3),
      new THREE.MeshStandardMaterial({
        color: 0x1769e0,
        metalness: 0.35,
        roughness: 0.15,
        transparent: true,
        opacity: 0.88,
        emissive: 0x0a3a8a,
        emissiveIntensity: 0.35,
      })
    );
    core.add(heart);

    const innerWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.95, 2),
      new THREE.MeshBasicMaterial({
        color: 0x5ea8ff,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      })
    );
    core.add(innerWire);

    // Soft glow sphere behind shield
    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.55, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0x1769e0,
        transparent: true,
        opacity: 0.06,
        depthWrite: false,
      })
    );
    core.add(glowSphere);

    // ── Orbital rings ────────────────────────────────────────
    const ringSpecs = [
      [2.05, 0.02, 0x1769e0, 0.62, 0.32],
      [2.48, 0.015, 0xff9a62, 0.38, 0.78],
      [2.92, 0.011, 0x5ea8ff, 0.26, 1.22],
      [3.35, 0.008, 0xc99a45, 0.18, 0.55],
    ];
    const ringMeshes = ringSpecs.map(([radius, tube, color, opacity, rot]) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 14, 200),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      );
      mesh.rotation.x = rot;
      rings.add(mesh);
      return mesh;
    });

    // ── Network nodes ────────────────────────────────────────
    const nodePositions = [];
    const nodeGroup = new THREE.Group();
    network.add(nodeGroup);

    // Adjust node count based on intensity
    const nodeCount = intensity === "high" ? 24 : intensity === "medium" ? 18 : 12;

    for (let i = 0; i < nodeCount; i += 1) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = i % 2 ? 2.55 : 3.05;
      const pos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.68,
        (i % 3 - 1) * 0.32
      );
      nodePositions.push(pos);
      const size = i % 4 === 0 ? 0.075 : i % 3 === 0 ? 0.055 : 0.04;
      const color = i % 4 === 0 ? 0xff9a62 : i % 3 === 0 ? 0xc99a45 : 0x1769e0;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(size, 14, 14),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.85,
        })
      );
      node.position.copy(pos);
      node.userData.phase = i * 0.41;
      node.userData.baseScale = size / 0.05;
      nodeGroup.add(node);
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1769e0,
      transparent: true,
      opacity: 0.14,
    });
    const goldLineMaterial = new THREE.LineBasicMaterial({
      color: 0xc99a45,
      transparent: true,
      opacity: 0.1,
    });

    for (let i = 0; i < nodePositions.length; i += 1) {
      const a = nodePositions[i];
      const b = nodePositions[(i + 1) % nodePositions.length];
      const geometry = new THREE.BufferGeometry().setFromPoints([a, b]);
      network.add(new THREE.Line(geometry, lineMaterial));
      if (i % 3 === 0) {
        const geometry2 = new THREE.BufferGeometry().setFromPoints([
          a,
          new THREE.Vector3(0, 0, 0),
          nodePositions[(i + 7) % nodePositions.length],
        ]);
        network.add(new THREE.Line(geometry2, goldLineMaterial));
      }
    }

    // ── Architectural data frames ────────────────────────────
    const frameMaterial = new THREE.LineBasicMaterial({
      color: 0x1769e0,
      transparent: true,
      opacity: 0.11,
    });
    const frame = new THREE.Group();
    architecture.add(frame);

    const frameLevels = [-2.5, -1.25, 0, 1.25, 2.5];
    frameLevels.forEach((y, index) => {
      const width = 6.2 - index * 0.38;
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-width, y, -0.85),
        new THREE.Vector3(width, y, -0.85),
      ]);
      frame.add(new THREE.Line(geometry, frameMaterial));
    });
    [-3.2, -1.1, 1.1, 3.2].forEach((x) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, -2.9, -0.85),
        new THREE.Vector3(x * 0.75, 2.9, -0.85),
      ]);
      frame.add(new THREE.Line(geometry, frameMaterial));
    });

    // ── Floating product cards ───────────────────────────────
    const cardData = [
      { text: "FAMILY", color: 0xff9a62, pos: [-3.7, 1.65, 0.25], rot: -0.09 },
      { text: "HEALTH", color: 0x1769e0, pos: [3.65, 1.15, 0.15], rot: 0.09 },
      { text: "BUSINESS", color: 0x1769e0, pos: [-3.45, -1.55, 0.2], rot: 0.07 },
      { text: "CLAIMS", color: 0xc99a45, pos: [3.4, -1.75, 0.25], rot: -0.07 },
    ];
    const cardMeshes = [];
    cardData.forEach((data, index) => {
      const group = new THREE.Group();
      const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(1.65, 0.68),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.78,
          side: THREE.DoubleSide,
        })
      );
      const border = new THREE.LineSegments(
        new THREE.EdgesGeometry(panel.geometry),
        new THREE.LineBasicMaterial({
          color: data.color,
          transparent: true,
          opacity: 0.55,
        })
      );
      const accent = new THREE.Mesh(
        new THREE.PlaneGeometry(0.08, 0.68),
        new THREE.MeshBasicMaterial({
          color: data.color,
          transparent: true,
          opacity: 0.7,
        })
      );
      accent.position.x = -0.785;
      group.add(panel, border, accent);
      group.position.set(...data.pos);
      group.rotation.z = data.rot;
      group.userData.base = group.position.clone();
      group.userData.index = index;
      group.userData.color = data.color;
      cards.add(group);
      cardMeshes.push(group);
    });

    // ── Orbiting accent spheres ──────────────────────────────
    const orbitData = [
      { r: 3.8, speed: 0.18, y: 0.4, size: 0.08, color: 0x1769e0 },
      { r: 4.2, speed: -0.12, y: -0.6, size: 0.06, color: 0xff9a62 },
      { r: 3.5, speed: 0.22, y: 1.1, size: 0.05, color: 0xc99a45 },
      { r: 4.5, speed: -0.09, y: -1.2, size: 0.07, color: 0x5ea8ff },
    ];
    const orbitMeshes = orbitData.map((d) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(d.size, 12, 12),
        new THREE.MeshBasicMaterial({
          color: d.color,
          transparent: true,
          opacity: 0.7,
        })
      );
      mesh.userData = { ...d, angle: Math.random() * Math.PI * 2 };
      orbits.add(mesh);
      return mesh;
    });

    // Soft ambient orbs for depth
    for (let i = 0; i < 8; i++) {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.35 + Math.random() * 0.5, 16, 16),
        new THREE.MeshBasicMaterial({
          color: i % 2 ? 0x1769e0 : 0xc99a45,
          transparent: true,
          opacity: 0.03 + Math.random() * 0.03,
          depthWrite: false,
        })
      );
      orb.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        -2 - Math.random() * 4
      );
      orb.userData.phase = Math.random() * Math.PI * 2;
      orb.userData.speed = 0.15 + Math.random() * 0.25;
      ambientOrbs.add(orb);
    }

    // ── Flowing data particles ───────────────────────────────
    const particleCount = intensity === "high" ? 820 : intensity === "medium" ? 600 : 400;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleData = new Float32Array(particleCount * 4);
    for (let i = 0; i < particleCount; i += 1) {
      const r = 3.0 + Math.random() * 4.5;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 6.5;
      particlePositions[i * 3] = Math.cos(a) * r;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4.2;
      particleData[i * 4] = r;
      particleData[i * 4 + 1] = a;
      particleData[i * 4 + 2] = y;
      particleData[i * 4 + 3] = Math.random() * Math.PI * 2;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x1769e0,
        size: 0.032,
        transparent: true,
        opacity: 0.48,
        sizeAttenuation: true,
        depthWrite: false,
      })
    );
    network.add(particles);

    // Secondary gold particle layer
    const goldCount = intensity === "high" ? 180 : intensity === "medium" ? 120 : 80;
    const goldPositions = new Float32Array(goldCount * 3);
    const goldData = new Float32Array(goldCount * 3);
    for (let i = 0; i < goldCount; i++) {
      const r = 2.2 + Math.random() * 2.8;
      const a = Math.random() * Math.PI * 2;
      goldPositions[i * 3] = Math.cos(a) * r;
      goldPositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      goldPositions[i * 3 + 2] = Math.sin(a) * r * 0.4;
      goldData[i * 3] = r;
      goldData[i * 3 + 1] = a;
      goldData[i * 3 + 2] = Math.random() * Math.PI * 2;
    }
    const goldGeometry = new THREE.BufferGeometry();
    goldGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(goldPositions, 3)
    );
    const goldParticles = new THREE.Points(
      goldGeometry,
      new THREE.PointsMaterial({
        color: 0xc99a45,
        size: 0.04,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
        depthWrite: false,
      })
    );
    network.add(goldParticles);

    // ── Scroll & pointer state ───────────────────────────────
    const scroll = { target: 0, current: 0 };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const updateScroll = () => {
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scroll.target = clamp(window.scrollY / max);
    };
    const onPointerMove = (event) => {
      pointer.tx =
        (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
      pointer.ty =
        (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };
    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    updateScroll();
    resize();

    const clock = new THREE.Clock();
    let animationFrame = 0;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const dt = reducedMotion ? 0.1 : intensity === "high" ? 0.065 : 0.08;
      scroll.current += (scroll.target - scroll.current) * dt;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const p = scroll.current;
      const hero = 1 - smoothstep(0.04, 0.2, p);
      const protectionPhase = phase(p, 0.1, 0.28);
      const familyPhase = phase(p, 0.25, 0.44);
      const businessPhase = phase(p, 0.4, 0.6);
      const claimsPhase = phase(p, 0.55, 0.76);
      const trustPhase = phase(p, 0.72, 1);

      // Camera cinematic path
      const cameraX = pointer.x * 0.65 + Math.sin(p * Math.PI * 2) * 0.6;
      const cameraY =
        pointer.y * -0.4 + Math.sin(p * Math.PI) * 0.28 + hero * 0.15;
      const cameraZ =
        10.5 -
        protectionPhase * 2.1 -
        businessPhase * 0.85 +
        trustPhase * 1.4;
      camera.position.x += (cameraX - camera.position.x) * 0.04;
      camera.position.y += (cameraY - camera.position.y) * 0.04;
      camera.position.z += (cameraZ - camera.position.z) * 0.04;
      camera.lookAt(
        Math.sin(p * Math.PI * 2) * 0.4,
        Math.cos(p * Math.PI) * 0.18,
        0
      );

      // Root transform
      root.rotation.y = pointer.x * 0.05 + p * Math.PI * 0.48;
      root.rotation.x =
        pointer.y * -0.03 + Math.sin(p * Math.PI * 2) * 0.04;
      root.position.y = Math.sin(time * 0.4) * 0.04 - p * 0.22;

      // Core
      const expansion =
        1 + protectionPhase * 0.14 + businessPhase * 0.2 + claimsPhase * 0.26;
      core.scale.setScalar(1.1 + hero * 0.06);
      core.position.z = Math.sin(p * Math.PI) * 0.25;
      shield.rotation.y = time * 0.1 + p * Math.PI * 0.9;
      shieldEdges.rotation.y = shield.rotation.y;
      heart.rotation.y = -time * 0.5 + p * Math.PI * 2.2;
      heart.rotation.x = Math.sin(time * 0.55) * 0.14;
      heart.scale.setScalar(0.95 + Math.sin(time * 1.8) * 0.06);
      innerWire.rotation.y = time * 0.16;
      innerWire.rotation.x = time * 0.1;
      innerWire.scale.setScalar(expansion);
      glowSphere.scale.setScalar(1 + Math.sin(time * 0.8) * 0.08);

      // Rings
      ringMeshes[0].rotation.z += 0.0028 + p * 0.007;
      ringMeshes[1].rotation.z -= 0.002 + p * 0.0055;
      ringMeshes[2].rotation.z += 0.0014 + p * 0.0035;
      if (ringMeshes[3]) ringMeshes[3].rotation.z -= 0.001 + p * 0.0025;
      rings.rotation.y = p * Math.PI * 0.9;
      rings.scale.setScalar(1 + protectionPhase * 0.2 + trustPhase * 0.14);

      // Network nodes
      nodeGroup.rotation.z = -p * Math.PI * 1.25;
      nodeGroup.rotation.x = Math.sin(p * Math.PI * 2) * 0.14;
      nodeGroup.children.forEach((node) => {
        const pulse =
          1 + Math.sin(time * 2.2 + node.userData.phase) * 0.28;
        node.scale.setScalar(
          pulse * (0.7 + claimsPhase * 0.55) * (node.userData.baseScale || 1)
        );
      });

      network.rotation.y = -p * Math.PI * 0.58;
      network.position.z = -businessPhase * 0.5;

      // Particles
      particles.rotation.y += 0.0006;
      const pos = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i += 1) {
        const idx = i * 3;
        const d = particleData[i * 4 + 3];
        const baseR = particleData[i * 4];
        const angle =
          particleData[i * 4 + 1] + time * (0.03 + (i % 7) * 0.0018);
        pos[idx] =
          Math.cos(angle) * (baseR + Math.sin(time * 0.45 + d) * 0.2);
        pos[idx + 1] =
          particleData[i * 4 + 2] + Math.sin(time * 0.7 + d) * 0.09;
        pos[idx + 2] =
          Math.sin(angle) * (baseR * 0.4) +
          Math.cos(time * 0.45 + d) * 0.28;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Gold particles
      goldParticles.rotation.y -= 0.0004;
      const gPos = goldGeometry.attributes.position.array;
      for (let i = 0; i < goldCount; i++) {
        const idx = i * 3;
        const angle = goldData[i * 3 + 1] + time * 0.025;
        const r = goldData[i * 3];
        gPos[idx] = Math.cos(angle) * r;
        gPos[idx + 1] =
          Math.sin(time * 0.5 + goldData[i * 3 + 2]) * 0.15 +
          (i % 5 - 2) * 0.4;
        gPos[idx + 2] = Math.sin(angle) * r * 0.45;
      }
      goldGeometry.attributes.position.needsUpdate = true;

      // Architecture
      architecture.rotation.y = p * Math.PI * 0.22;
      architecture.position.z = -1.2 - familyPhase * 0.4;
      architecture.scale.setScalar(0.88 + businessPhase * 0.22);

      // Cards
      cardMeshes.forEach((card, index) => {
        const phaseFactor = clamp((p - 0.16 - index * 0.075) / 0.26);
        const targetZ = -0.2 + phaseFactor * 1.55;
        card.position.z += (targetZ - card.position.z) * 0.055;
        card.position.y =
          card.userData.base.y + Math.sin(time * 0.65 + index) * 0.06;
        card.rotation.y =
          Math.sin(time * 0.32 + index) * 0.05 + pointer.x * 0.03;
        card.rotation.x = Math.sin(time * 0.28 + index * 0.5) * 0.03;
      });

      // Orbiting accents
      orbitMeshes.forEach((mesh) => {
        const d = mesh.userData;
        d.angle += d.speed * 0.012;
        mesh.position.x = Math.cos(d.angle) * d.r;
        mesh.position.z = Math.sin(d.angle) * d.r * 0.55;
        mesh.position.y = d.y + Math.sin(time * 0.6 + d.angle) * 0.15;
        mesh.scale.setScalar(1 + Math.sin(time * 2 + d.angle) * 0.15);
      });

      // Ambient orbs
      ambientOrbs.children.forEach((orb) => {
        orb.position.y +=
          Math.sin(time * orb.userData.speed + orb.userData.phase) * 0.0015;
        orb.material.opacity =
          0.025 +
          Math.sin(time * 0.4 + orb.userData.phase) * 0.015 +
          trustPhase * 0.02;
      });

      // Phase-driven emphasis
      shieldMaterial.opacity =
        0.58 + hero * 0.2 + trustPhase * 0.1;
      innerWire.material.opacity =
        0.18 + protectionPhase * 0.18 + claimsPhase * 0.14;
      particles.material.opacity =
        0.3 + businessPhase * 0.28 + trustPhase * 0.14;
      goldParticles.material.opacity =
        0.2 + familyPhase * 0.2 + trustPhase * 0.15;
      key.intensity = 20 + protectionPhase * 18 + claimsPhase * 12;
      warm.intensity = 10 + familyPhase * 12 + trustPhase * 9;
      fill.intensity = 6 + businessPhase * 8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      reducedMotionQuery.removeEventListener?.("change", onMotionChange);
      scene.traverse((object) => {
        object.geometry?.dispose?.();
        if (Array.isArray(object.material))
          object.material.forEach((m) => m.dispose());
        else object.material?.dispose?.();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [concept, intensity]);

  return (
    <div ref={containerRef} className="zuari-3d-stage" aria-hidden="true" />
  );
}