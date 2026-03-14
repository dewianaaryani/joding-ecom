import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import Glow from "./Glow";

export default function Hero() {
  return (
    <section
      id="Hero"
      className="flex relative w-full overflow-hidden min-h-[80vh] lg:min-h-screen gap-10 justify-center items-center
"
    >
      <div className="z-10 flex flex-col xl:flex-row justify-center xl:justify-start items-center h-full py-40 px-14 md:px-32 max-w-3xl md:max-w-none w-full gap-0 lg:gap-12">
        <div className="flex flex-col gap-6 lg:gap-14 max-w-xl lg:max-w-2xl xl:max-w-xl">
          <div className="flex flex-col gap-4 text-center xl:text-left">
            <h1 className="font-code-next title">
              Joding Solve Your Coding Problems Faster 🚀
            </h1>
            <p className="lead-description">
              Mulai dari tugas kuliah, pembuatan website, hingga perbaikan bug,
              semuanya bisa kami bantu dengan cepat dan rapi.
            </p>
          </div>
          <button className="button-primary w-fit mx-auto xl:mx-0 inline-flex items-center gap-2">
            Konsultasi Sekarang
            <ArrowRight strokeWidth={3} size={18} />
          </button>
        </div>
        <div className="flex-1 mx-auto relative w-full justify-center mt-10 max-w-xl">
          <div className="absolute py-8 flex flex-col h-full w-full justify-between">
            <p className="text-image-hero">Fast</p>
            <p className="text-image-hero ml-auto">Clean</p>
          </div>
          <Image
            src="/img/hero.png"
            alt="kalana"
            width={800}
            height={800}
            loading="eager"
            className="object-cover w-full"
          />
        </div>
      </div>
      <Glow
        color="purple"
        size="md"
        opacity="medium"
        className="top-10 -right-20"
      />
      <Glow
        color="blue"
        size="md"
        opacity="medium"
        className="-top-20 -left-20"
      />
      <Glow
        color="purple"
        size="md"
        opacity="low"
        className="bottom-80 md:bottom-0 -left-20"
      />
    </section>
  );
}
