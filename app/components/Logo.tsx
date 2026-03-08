import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2 font-code-next font-semibold text-2xl uppercase">
      <Image
        src="/logo.svg"
        alt="logo"
        width={200}
        height={200}
        className="size-8"
      />
      <h4>Joding</h4>
    </div>
  );
}
