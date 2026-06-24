"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1500 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    const colorWarmOrange = new THREE.Color("#f57c00");
    const colorWhite = new THREE.Color("#ffffff");
    const colorBlueGlow = new THREE.Color("#29b6f6");
    
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      
      const rand = Math.random();
      let color = colorWarmOrange;
      if (rand > 0.8) color = colorWhite;
      else if (rand > 0.7) color = colorBlueGlow;
      
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      p.color.toArray(colors, i * 3);
    });
    return colors;
  }, [particles, count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { factor, speed, xFactor, yFactor, zFactor } = particle;
      // Slow float using sine wave
      const t = (particle.t += speed);
      
      // Mouse parallax
      particle.mx += (state.pointer.x * 20 - particle.mx) * 0.02;
      particle.my += (state.pointer.y * 20 - particle.my) * 0.02;
      
      dummy.position.set(
        (particle.mx) + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my) + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      // Soft breathing scale
      const s = 1 + Math.sin(t * 2) * 0.5;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>
      <meshBasicMaterial 
        vertexColors={true} 
        transparent={true} 
        opacity={0.4} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </instancedMesh>
  );
}

export default function CinematicLayer() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 5, pointerEvents: "none" }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 30] }} gl={{ alpha: true, antialias: false }} dpr={[1, 2]}>
        <Particles count={1000} />
      </Canvas>
    </div>
  );
}
