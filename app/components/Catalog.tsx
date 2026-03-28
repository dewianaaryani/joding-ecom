"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import MacbookModel from "./models/Macbook";
import { Environment, OrbitControls } from "@react-three/drei";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import ServicesGrid from "./ServicesGrid";

export default function Catalog() {
  return (
    <section className="w-full">
      <div className="container-padding flex flex-col gap-12 justify-center items-center text-center py-40 w-full">
        <h4 className="font-code-next title-section max-w-lg">
          Kami dapat membantu dengan
        </h4>

        <ServicesGrid />
      </div>
    </section>
  );
}
