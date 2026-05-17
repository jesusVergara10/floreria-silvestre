"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// 6 petals evenly distributed around the center (60° apart)
const PETAL_ANGLES = [0, 1, 2, 3, 4, 5].map((i) => (i * Math.PI) / 3);

function FlowerMesh() {
  const groupRef = useRef<THREE.Group>(null!);

  const { petalGeometry, centerGeometry, material } = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absellipse(0, 0.3, 0.12, 0.24, 0, Math.PI * 2, false, 0);

    const petalGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.015,
      bevelSegments: 5,
    });

    // Centered on Z=0 so the flower is symmetric front/back
    petalGeometry.translate(0, 0, -0.05);

    const centerGeometry = new THREE.SphereGeometry(0.1, 32, 32);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.03,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      envMapIntensity: 2.5,
    });

    return { petalGeometry, centerGeometry, material };
  }, []);

  // Y rotation reveals 3D depth; X wobble adds organic life
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.7;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <group ref={groupRef}>
      {PETAL_ANGLES.map((angle, i) => (
        <mesh key={i} geometry={petalGeometry} material={material} rotation={[0, 0, angle]} />
      ))}
      <mesh geometry={centerGeometry} material={material} />
    </group>
  );
}

export default function FloatingFlower() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none w-[130px] h-[130px]">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[3, 3, 3]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-3, -2, 1]} intensity={1} color="#c8d8ff" />
        <pointLight position={[2, 1, 2]} intensity={2} color="#ffffff" />
        <pointLight position={[-1, -2, -1]} intensity={0.8} color="#ffeedd" />
        <Environment preset="studio" />
        <FlowerMesh />
      </Canvas>
    </div>
  );
}
