import React from "react";
import OrbitSystem from "./Orbit";

export default function Tech() {
  return (
    <div className="flex flex-col card-outline w-full overflow-hidden">
      <div className="flex flex-col gap-4 px-8 py-10">
        <h3>Teknologi yang Digunakan</h3>
        <p>
          Setiap project dikerjakan dengan alur yang jelas mulai dari analisis
          kebutuhan, pengembangan, hingga tahap penyelesaian.
        </p>
      </div>
      <div className="relative flex-1 flex">
        <OrbitSystem />
      </div>
    </div>
  );
}
