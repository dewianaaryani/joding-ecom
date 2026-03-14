"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import MacbookModel from "./models/Macbook";
import { Environment, OrbitControls } from "@react-three/drei";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function Catalog() {
  return (
    <section className="">
      <div className="container-padding flex flex-col gap-12 justify-center items-center text-center py-40">
        <h4 className="font-code-next title-section max-w-lg">
          Kami dapat membantu dengan
        </h4>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="flex justify-between items-center card-outline p-5">
            <h5 className="">Website App</h5>
            <ArrowDown className="size-5" />
          </div>
          <div className="flex flex-col gap-4 card-outline p-5">
            <div className="flex justify-between items-center">
              <h5 className="">Website App</h5>
              <ArrowUp className="size-5" />
            </div>
            <div></div>
          </div>

          <div></div>
        </div>
      </div>
    </section>
  );
}
