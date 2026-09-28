import React, { useEffect, useRef, useState } from 'react';
import { Activity, LockKeyhole, MousePointer2 } from 'lucide-react';
import * as THREE from 'three';
import gatewayAsset from '../assets/gateway-constellation.svg';

type Tilt = { x: number; y: number };

export default function HeroArtifact() {
  const [tilt, setTilt] = useState<Tilt>({ x: -4, y: 4 });
  const tiltRef = useRef(tilt);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    tiltRef.current = tilt;
  }, [tilt]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.z = 5.2;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);

    const model = new THREE.Group();
    scene.add(model);
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.12, 1),
      new THREE.MeshPhysicalMaterial({ color: 0x8dfff0, emissive: 0x164e59, emissiveIntensity: 0.55, metalness: 0.42, roughness: 0.2, transparent: true, opacity: 0.9 }),
    );
    model.add(core);
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.2, 1)),
      new THREE.LineBasicMaterial({ color: 0xaa96ff, transparent: true, opacity: 0.75 }),
    );
    model.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x8dd9f1, transparent: true, opacity: 0.62 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.012, 8, 96), ringMaterial);
    ring.rotation.x = Math.PI / 2.35;
    model.add(ring);
    const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(1.82, 0.008, 8, 96), new THREE.MeshBasicMaterial({ color: 0x70e8c4, transparent: true, opacity: 0.35 }));
    ringTwo.rotation.y = Math.PI / 2.7;
    model.add(ringTwo);

    const particlePositions = new Float32Array(72 * 3);
    for (let index = 0; index < particlePositions.length; index += 3) {
      const radius = 1.65 + Math.random() * 0.8;
      const angle = Math.random() * Math.PI * 2;
      particlePositions[index] = Math.cos(angle) * radius;
      particlePositions[index + 1] = (Math.random() - 0.5) * 1.9;
      particlePositions[index + 2] = Math.sin(angle) * radius;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(particlesGeometry, new THREE.PointsMaterial({ color: 0xf2f0ff, size: 0.025, transparent: true, opacity: 0.8 }));
    model.add(particles);

    const ambient = new THREE.HemisphereLight(0xb9f3ff, 0x120d2d, 1.7);
    scene.add(ambient);
    const mintLight = new THREE.PointLight(0x70e8c4, 7, 8);
    mintLight.position.set(2, 2, 3);
    scene.add(mintLight);
    const violetLight = new THREE.PointLight(0xaa96ff, 5, 7);
    violetLight.position.set(-2, -1, 2);
    scene.add(violetLight);

    const resize = () => {
      const bounds = canvas.parentElement?.getBoundingClientRect();
      if (!bounds) return;
      renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height), false);
      camera.aspect = bounds.width / bounds.height;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    let animationFrame = 0;
    const render = () => {
      const target = tiltRef.current;
      model.rotation.x += ((target.x * Math.PI) / 180 - model.rotation.x) * 0.035;
      model.rotation.y += ((target.y * Math.PI) / 180 + 0.2 - model.rotation.y) * 0.035;
      if (!reducedMotion) {
        core.rotation.y += 0.003;
        wire.rotation.y -= 0.002;
        ring.rotation.z += 0.004;
        ringTwo.rotation.x -= 0.002;
        particles.rotation.y += 0.0015;
      }
      renderer.render(scene, camera);
      if (!reducedMotion) animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -14;
    setTilt({ x: y, y: x });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    setTilt((current) => ({
      x: Math.max(-14, Math.min(14, current.x + (event.key === 'ArrowUp' ? -2 : event.key === 'ArrowDown' ? 2 : 0))),
      y: Math.max(-14, Math.min(14, current.y + (event.key === 'ArrowLeft' ? -2 : event.key === 'ArrowRight' ? 2 : 0))),
    }));
  };

  return (
    <div className="gateway-artifact" onPointerMove={handlePointerMove} onPointerLeave={() => setTilt({ x: -4, y: 4 })} onKeyDown={handleKeyDown} tabIndex={0} aria-label="Interactive 3D gateway visualization. Use arrow keys to change its angle." role="img">
      <div className="gateway-artifact-grid" aria-hidden="true" />
      <div className="gateway-artifact-halo" aria-hidden="true" />
      <canvas ref={canvasRef} className="gateway-webgl" aria-hidden="true" />
      <div className="gateway-artifact-tilt" aria-hidden="true"><img src={gatewayAsset} alt="" /></div>
      <div className="gateway-readout gateway-readout-top"><Activity size={14} aria-hidden="true" /><span>private witness</span><b>local</b></div>
      <div className="gateway-readout gateway-readout-bottom"><LockKeyhole size={14} aria-hidden="true" /><span>gateway / 01</span><MousePointer2 size={13} aria-hidden="true" /></div>
      <div className="gateway-coordinates" aria-hidden="true">44° 58&apos; 08&quot; N / 93° 16&apos; 35&quot; W</div>
    </div>
  );
}
