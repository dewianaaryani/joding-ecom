"use client";

import React, { JSX, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import gsap from "gsap";

export default function BugFixingCard(): JSX.Element {
  const codeRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  const wrongCode: string = `for($i = 0; $i <= count($numbers); $i++) {
  $total += $numbers[$i];
}`;

  const rightCode: string = `for($i = 0; $i < count($numbers); $i++) {
  $total += $numbers[$i];
}`;

  useEffect(() => {
    const codeEl = codeRef.current;
    const cursor = cursorRef.current;

    if (!codeEl || !cursor) return;

    codeEl.textContent = wrongCode;

    const tl = gsap.timeline({ delay: 1 });

    tl.to(searchRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
    });

    tl.to(codeEl, {
      filter: "blur(4px)",
      duration: 0.5,
    });

    tl.to(errorRef.current, {
      opacity: 1,
      duration: 0.4,
    });

    tl.to(codeEl, {
      filter: "blur(0px)",
      duration: 0.5,
    });

    // erase wrong code
    tl.to(
      {},
      {
        duration: wrongCode.length * 0.04,
        onUpdate: function () {
          const progress = Math.floor(wrongCode.length * this.progress());
          codeEl.textContent = wrongCode.slice(0, wrongCode.length - progress);
        },
      },
    );

    // type correct code
    tl.to(
      {},
      {
        duration: rightCode.length * 0.05,
        onUpdate: function () {
          const progress = Math.floor(rightCode.length * this.progress());
          codeEl.textContent = rightCode.slice(0, progress);
        },
      },
    );

    // blinking cursor
    gsap.to(cursor, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.6,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl bg-black p-6 rounded-xl border border-purple-600 font-mono text-sm text-white">
      {/* Search icon */}
      <div
        ref={searchRef}
        className="absolute right-4 top-4 opacity-0 scale-50 text-purple-400"
      >
        <Search size={20} />
      </div>

      {/* Code */}
      <pre className="whitespace-pre-wrap">
        <code>
          <span ref={codeRef}></span>
          <span ref={cursorRef} className="text-purple-400">
            |
          </span>
        </code>
      </pre>

      {/* Error underline */}
      <div
        ref={errorRef}
        className="absolute left-6 top-18 w-65 h-0.5 bg-red-500 opacity-0"
      />
    </div>
  );
}
