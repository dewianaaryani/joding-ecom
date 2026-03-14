import { ArrowRight } from "lucide-react";
import React from "react";

export default function Ads() {
  return (
    <div className="container-padding flex flex-col gap-12 justify-center items-center text-center py-40">
      <h4 className="font-code-next title-section max-w-lg">
        Dapatkan Sekarang dengan{" "}
        <span className="text-primary">Diskon 10%</span>
      </h4>
      <button className="button-primary w-fit mx-auto xl:mx-0 inline-flex items-center gap-2">
        Konsultasi Sekarang
        <ArrowRight strokeWidth={3} size={18} />
      </button>
    </div>
  );
}
