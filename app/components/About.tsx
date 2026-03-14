import React from "react";
import OrbitTech from "./Orbit";
import OrbitSystem from "./Orbit";
import Tech from "./Tech";
import Grid from "./Grid";

export default function About() {
  return (
    <section id="about" className="flex flex-col justify-center items-center">
      <div className="container-padding flex flex-col">
        <div className="flex flex-col gap-4 max-w-xl md:max-w-4xl mx-auto">
          <h4 className="font-code-next title-section text-primary">
            Tentang Kami
          </h4>
          <p className="text-body text-center">
            Joding menyediakan layanan bantuan coding untuk pelajar, developer,
            maupun bisnis yang membutuhkan solusi cepat dan profesional.
          </p>
        </div>
        <Grid />
      </div>
    </section>
  );
}
