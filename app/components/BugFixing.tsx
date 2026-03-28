"use client";

import React, { useEffect, useRef } from "react";
import { SearchCodeIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/all";
import { startProps } from "../lib/type";

gsap.registerPlugin(MotionPathPlugin);
export default function BugFixing({ start }: startProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const operatorRef = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      if (!start) return;
      if (!codeRef.current || !iconRef.current || !operatorRef.current) return;

      const tl = gsap.timeline({
        repeat: -1, // infinite loop
        repeatDelay: 1, // pause between loops
        onRepeat: () => {
          // reset operator for next loop
          if (operatorRef.current) {
            operatorRef.current.textContent = "<=";
            operatorRef.current.style.textDecoration = "none";
          }
        },
      });

      // blur code
      tl.to(codeRef.current, {
        filter: "blur(6px)",
        duration: 0.5,
      });

      // move icon to center
      tl.to(
        iconRef.current,
        {
          bottom: "50%",
          right: "50%",
          xPercent: 50,
          yPercent: 50,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2",
      );

      // circular scanning motion
      tl.to(iconRef.current, {
        duration: 3,
        ease: "sine.inOut",
        motionPath: {
          path: [
            { x: 0, y: -80 },
            { x: 80, y: 0 },
            { x: 0, y: 80 },
            { x: -80, y: 0 },
            { x: 0, y: -80 },
          ],
        },
      });
      tl.to(iconRef.current, {
        opacity: 0,
      });
      // remove blur
      tl.to(codeRef.current, {
        filter: "blur(0px)",
        duration: 0.4,
      });

      // flash red (error detection)
      tl.to(operatorRef.current, {
        color: "#ef4444",
        duration: 0.5,
        yoyo: true,
        repeat: 2,
      });

      // underline error
      tl.to(operatorRef.current, {
        textDecorationLine: "underline",
        textDecorationStyle: "wavy",
        textDecorationColor: "#ef4444",
        textUnderlineOffset: "4px",
        duration: 0.3,
      });

      // pause
      tl.to({}, { duration: 0.6 });

      // erase "="
      tl.to(
        {},
        {
          duration: 0.2,
          onStart: () => {
            if (operatorRef.current) {
              operatorRef.current.textContent = "<";
            }
          },
        },
      );

      // remove underline
      tl.to(operatorRef.current, {
        textDecorationLine: "none",
        duration: 0.2,
      });
      // pause
      tl.to({}, { duration: 1 });
    },
    {
      scope: containerRef,
      dependencies: [start],
    },
  );

  return (
    <div
      className="flex flex-col gap-4 border border-primary bg-secondary/20 rounded-xl px-8 py-4 w-full max-w-xl relative"
      ref={containerRef}
    >
      {/* window dots */}
      <div className="flex gap-1">
        <div className="text-2xl lg:text-3xl text-red-500">●</div>
        <div className="text-2xl lg:text-3xl text-yellow-500">●</div>
        <div className="text-2xl lg:text-3xl text-green-500">●</div>
      </div>

      {/* code container */}
      <div
        ref={codeRef}
        className="relative space-y-2 leading-relaxed text-left transition-all"
      >
        <p>
          <span className="text-purple-400">&lt;?php</span>
        </p>

        <div className="pl-4">
          <p>
            <span className="text-blue-300">$numbers</span> =
            <span className="text-yellow-300"> [2,4,6,8,10]</span>;
          </p>

          <p>
            <span className="text-blue-300">$total</span> =
            <span className="text-orange-300"> 0</span>;
          </p>

          <br />

          <p>
            <span className="text-pink-400">for</span>(
            <span className="text-blue-300"> $i</span>{" "}
            <span ref={operatorRef} className="text-blue-300">
              &lt;=
            </span>
            <span className="text-orange-300">0</span>;
            <span className="text-blue-300"> $i</span> {"<="}
            <span className="text-green-300"> count</span>(
            <span className="text-blue-300">$numbers</span>);
            <span className="text-blue-300">$i</span>++) {"{"}
          </p>

          <p className="pl-4">
            <span className="text-blue-300">$total</span> +=
            <span className="text-blue-300"> $numbers[$i]</span>;
          </p>

          <p>{"}"}</p>

          <br />

          <p>
            <span className="text-blue-300">$average</span> =
            <span className="text-blue-300"> $total</span> /
            <span className="text-green-300"> count</span>(
            <span className="text-blue-300">$numbers</span>);
          </p>

          <br />

          <p>
            <span className="text-green-300">echo</span>
            <span className="text-yellow-300"> "Average: "</span>.
            <span className="text-blue-300"> $average</span>;
          </p>
        </div>

        <p>
          <span className="text-purple-400">?&gt;</span>
        </p>
      </div>

      {/* animated search icon */}
      <div ref={iconRef} className="absolute right-6 bottom-0 text-primary">
        <SearchCodeIcon className="size-8 md:size-12" />
      </div>
    </div>
  );
}
