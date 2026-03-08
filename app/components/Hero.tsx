import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div
      className="flex relative w-full overflow-hidden min-h-[80vh] gap-10 
bg-linear-to-b from-[#0A1546] via-[#091234] to-background"
    >
      <div className="z-10 flex-col justify-center items-center h-full py-40 px-14 max-w-2xl">
        <div className="flex flex-col gap-6 text-center">
          <div className="flex flex-col gap-6 text-center">
            <h1 className="font-code-next title">
              Joding Solve Your Coding Problems Faster 🚀
            </h1>
            <p>
              Mulai dari tugas kuliah, pembuatan website, hingga perbaikan bug,
              semuanya bisa kami bantu dengan cepat dan rapi.
            </p>
          </div>
          <button className="button-primary w-fit mx-auto inline-flex items-center gap-2">
            Konsultasi Sekarang
            <ArrowRight strokeWidth={3} size={18} />
          </button>
        </div>
        <div className="flex relative w-full justify-center mt-10">
          <div className="absolute py-8 flex flex-col h-full w-full justify-between">
            <p className="text-image-hero">Fast</p>
            <p className="text-image-hero ml-auto">Clean</p>
          </div>
          <Image
            src="/img/hero.png"
            alt="kalana"
            width={500}
            height={500}
            loading="eager"
            className="object-cover w-full max-w-2xl"
          />
        </div>
      </div>
      <div className="absolute -top-20 -left-20 radial-blue-glow size-60 glow-size-sm"></div>
      <div className="absolute top-20 -right-20 radial-purple-glow glow-size-sm"></div>
      <div className="absolute bottom-20 -left-20 radial-purple-glow glow-size-sm"></div>
    </div>
  );
}
