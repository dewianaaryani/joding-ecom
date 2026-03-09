import React from "react";
import OrbitTech from "./Orbit";
import OrbitSystem from "./Orbit";

export default function About() {
  return (
    <section id="about" className="flex flex-col justify-center items-center">
      <div className="container-padding max-w-xl flex flex-col">
        <div className="flex flex-col gap-6">
          <h4 className="font-code-next text-center">Tentang Kami</h4>
          <p className="text-body text-center">
            Joding menyediakan layanan bantuan coding untuk pelajar, developer,
            maupun bisnis yang membutuhkan solusi cepat dan profesional.
          </p>
        </div>
        <div className="flex flex-col card-outline overflow-hidden h-150">
          <div className="flex flex-col gap-4 px-8 py-10">
            <h3>Teknologi yang Digunakan</h3>
            <p>
              Setiap project dikerjakan dengan alur yang jelas mulai dari
              analisis kebutuhan, pengembangan, hingga tahap penyelesaian.
            </p>
          </div>
          <OrbitSystem />
        </div>
      </div>
      <div className="flex h-screen justify-center items-center">
        <OrbitSystem />
      </div>
    </section>
  );
}
