import Image from "next/image";
import React from "react";
interface Props {
  src1: string;
  src2: string;
  alt: string;
}
export default function StackedImage({ src1, src2, alt }: Props) {
  return (
    <div className="relative w-full aspect-4/3 max-w-xl">
      {/* Back image - right and up */}
      <Image
        src={src1}
        alt={`${alt}1`}
        fill
        className="object-contain scale-70 translate-x-[15%] -translate-y-[10%]"
      />

      {/* Front image - left and down */}
      <Image
        src={src2}
        alt={`${alt}2`}
        fill
        className="object-contain scale-70 -translate-x-[15%] translate-y-[10%] z-10"
      />
    </div>
  );
}
