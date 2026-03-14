"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import MacbookModel from "./models/Macbook";
import { Environment, OrbitControls } from "@react-three/drei";

export default function Catalog() {
  return (
    <div className="flex w-full h-[600px]">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        {/* Lights */}
        <directionalLight position={[5, 8, -5]} intensity={0.6} />
        <directionalLight position={[-5, 3, 5]} intensity={0.3} />

        {/* 3D Model */}
        <MacbookModel scale={0.08} position={[0, -1, 0]} />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />

        {/* Realistic reflections */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
