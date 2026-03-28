import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { startProps } from "../lib/type";
import { CircleDollarSignIcon, Globe, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function Deployment({ start }: startProps) {
  const deploymentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!start) return;
      if (!deploymentRef.current) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]");

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.out" },
      });

      items.forEach((item, i) => {
        tl.to(item, {
          opacity: 1,
          duration: 0.4,
        });

        tl.to({}, { duration: 0.4 });
      });
    },
    {
      scope: deploymentRef,
      dependencies: [start],
    },
  );

  return (
    <div className="grid-cols-1 md:grid-cols-2 grid w-full gap-4 items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-2 lg:gap-8 p-10 lg:p-13 h-full w-full border-primary border rounded-2xl">
        <h4 className="text-primary text-center lg:text-start w-full">
          Powered By
        </h4>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Image
            src="vercel.svg"
            alt="Vercel"
            width={180}
            height={180}
            className="size-40"
          />
          <h2 className="text-4xl md:text-5xl 2xl:text-7xl text-black text-shadow-primary text-shadow-lg/40">
            Vercel
          </h2>
        </div>
      </div>
      <div
        ref={deploymentRef}
        className="flex flex-col gap-4 justify-start items-start w-full p-5 px-10 card-outline bg-primary/4 backdrop-blur-2xl text-start"
      >
        <div
          data-step
          className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 opacity-40"
        >
          {/* icon */}
          <div className="flex justify-center">
            <div className="flex border border-primary text-primary rounded-xl shadow shadow-primary/80 p-2 size-12 justify-center items-center">
              <Zap className="size-6" />
            </div>
          </div>

          {/* text */}
          <div className="flex items-center">
            <h5>Performa Website Cepat</h5>
          </div>

          {/* vertical line */}
          <div className="flex justify-center">
            <div
              data-line
              className="w-0.5 h-8 bg-linear-to-b from-primary/60 to-primary"
            />
          </div>
        </div>

        <div
          data-step
          className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 opacity-40"
        >
          <div className="flex justify-center">
            <div className="flex border border-primary text-primary rounded-xl p-2 size-12 justify-center items-center">
              <Globe className="size-6" />
            </div>
          </div>

          <div className="flex items-center">
            <h5>Hosting Stabil & Andal</h5>
          </div>

          <div className="flex justify-center">
            <div
              data-line
              className="w-[2px] h-8 bg-gradient-to-b from-primary/60 to-primary"
            />
          </div>
        </div>

        <div
          data-step
          className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 opacity-40"
        >
          <div className="flex justify-center">
            <div className="flex border border-primary text-primary rounded-xl p-2 size-12 justify-center items-center">
              <ShieldCheck className="size-6" />
            </div>
          </div>

          <div className="flex items-center">
            <h5>Keamanan HTTPS Otomatis</h5>
          </div>

          <div className="flex justify-center">
            <div
              data-line
              className="w-[2px] h-8 bg-gradient-to-b from-primary/60 to-primary"
            />
          </div>
        </div>

        <div
          data-step
          className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 opacity-40"
        >
          <div className="flex justify-center">
            <div className="flex border border-primary text-primary rounded-xl p-2 size-12 justify-center items-center">
              <CircleDollarSignIcon className="size-6" />
            </div>
          </div>

          <div className="flex items-center">
            <h5>Tersedia Paket Gratis</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
