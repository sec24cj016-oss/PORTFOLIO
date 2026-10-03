import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralCore3DProps {
  className?: string;
}

export const NeuralCore3D: React.FC<NeuralCore3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for all core elements
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Holographic Core (Icosahedron Wireframe)
    const innerGeom = new THREE.IcosahedronGeometry(4.8, 2);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerWireMat);
    coreGroup.add(innerMesh);

    // 2. High-Density Neural Nodes at vertices
    const nodeCount = 42;
    const nodeGeometry = new THREE.SphereGeometry(0.18, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.9,
    });

    const nodeInstanced = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);
    const dummy = new THREE.Object3D();
    const nodePositions: THREE.Vector3[] = [];

    // Distribute nodes around spherical surface
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 5.2 + (Math.random() - 0.5) * 0.4;
      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);
      dummy.position.copy(pos);
      dummy.updateMatrix();
      nodeInstanced.setMatrixAt(i, dummy.matrix);
    }
    nodeInstanced.instanceMatrix.needsUpdate = true;
    coreGroup.add(nodeInstanced);

    // 3. Dynamic Synapse Neural Lines between nearby nodes
    const linePositions: number[] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 4.2) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.22,
    });
    const synapseLines = new THREE.LineSegments(lineGeom, lineMat);
    coreGroup.add(synapseLines);

    // 4. Orbiting Dimensional Ring (AI Latent Orbit)
    const ringGeom = new THREE.RingGeometry(7.5, 7.6, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
    });
    const ringMesh1 = new THREE.Mesh(ringGeom, ringMat);
    ringMesh1.rotation.x = Math.PI / 2.3;
    ringMesh1.rotation.y = Math.PI / 5;
    coreGroup.add(ringMesh1);

    const ringGeom2 = new THREE.RingGeometry(8.4, 8.48, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 3;
    ringMesh2.rotation.z = Math.PI / 4;
    coreGroup.add(ringMesh2);

    // 5. Ambient Cloud Particles
    const particleCount = 180;
    const particleGeom = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const r = 6 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particleCoords[i] = r * Math.sin(phi) * Math.cos(theta);
      particleCoords[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      particleCoords[i + 2] = r * Math.cos(phi);
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    coreGroup.add(particleSystem);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 1.2;
      targetRotationX = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth rotation damping towards mouse
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        coreGroup.rotation.x = currentRotationX + Math.sin(elapsed * 0.4) * 0.1;
        coreGroup.rotation.y = currentRotationY + elapsed * 0.25;

        // Counter-orbit rings
        ringMesh1.rotation.z = elapsed * 0.15;
        ringMesh2.rotation.z = -elapsed * 0.2;

        // Subtle breathing scale on the inner core
        const pulse = 1 + Math.sin(elapsed * 1.8) * 0.03;
        innerMesh.scale.set(pulse, pulse, pulse);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      innerGeom.dispose();
      innerWireMat.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      ringGeom2.dispose();
      ringMat2.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className={`relative w-full h-[380px] sm:h-[450px] lg:h-[540px] flex items-center justify-center ${className}`}>
      {/* Background ambient radial glow behind neural core */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none -z-10" />
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
        aria-label="Interactive 3D Neural Intelligence Core Visual"
      />
      {/* Corner telemetry crosshairs */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400/50 pointer-events-none select-none">
        [NEURAL_CORE // R:5.2 AZ:312°]
      </div>
      <div className="absolute bottom-2 right-2 text-[10px] font-mono text-violet-400/50 pointer-events-none select-none">
        [INFERENCE_ENGINE // STATUS: NOMINAL]
      </div>
    </div>
  );
};
