import { Check } from "lucide-react";
import React from "react";
import Glow from "./Glow";
import { GlowPattern } from "../lib/type";

export default function Review() {
  const reviewData = [
    {
      title: "Online Photocopy App",
      catClient: "Mahasiswa",
      client: "Confidential Client",
      category: "Advanced Project",
      review: "Hasil sesuai harapan",
    },
    {
      title: "Simple Python Coding",
      catClient: "Mahasiswa",
      client: "Confidential Client",
      category: "Basic Task",
      review: "Pengerjaan cepat dan terstruktur",
    },
    {
      title: "Charity App",
      catClient: "Mahasiswa",
      client: "Confidential Client",
      category: "Standard Project",
      review: "Mantap",
    },
  ];
  const glowInsidePatterns: GlowPattern[][] = [
    [
      // {
      //   color: "purple",
      //   size: "md",
      //   position: "bottom-80 md:bottom-0 -left-20",
      // },
      { color: "purple", size: "sm", position: "-top-10 right-0" },
      { color: "blue", size: "sm", position: "-bottom-10 left-0" },
    ],
    [
      { color: "blue", size: "sm", position: "-top-10 -left-8" },
      {
        color: "purple",
        size: "sm",
        position: "-bottom-10 right-1/4",
        opacity: "medium",
      },
    ],
    [
      {
        color: "purple",
        size: "sm",
        position: "-top-10 right-1/4",
        opacity: "medium",
      },
      { color: "blue", size: "sm", position: "bottom-6 -right-20" },
    ],
  ];
  const glowOutsidePatterns: GlowPattern[] = [
    { color: "purple", size: "sm", position: "-top-10 right-0" },
    { color: "blue", size: "sm", position: "-bottom-10 left-0" },
  ];
  return (
    <section id="paket-layanan">
      <div className="container-padding pt-40 flex flex-col lg:flex-row justify-center items-center w-full lg:items-start gap-6">
        <div className="lg:max-w-xl text-center lg:text-left max-w-none w-full flex flex-col gap-2 justify-center items-center lg:items-start">
          <h4 className="font-code-next flex title-section text-primary">
            Testimoni
          </h4>
          <p>Beberapa testimoni yang telah diberikan</p>
        </div>
        <div className="flex flex-col gap-8 w-full">
          {reviewData.map(
            ({ title, catClient, client, category, review }, index) => (
              <div
                key={title}
                className="flex flex-col relative gap-6 px-8 md:px-12 lg:px-8 py-10 card-outline justify-start items-start overflow-hidden"
              >
                {glowInsidePatterns[index]?.map((glow, i) => (
                  <Glow
                    key={i}
                    color={glow.color}
                    size={glow.size}
                    opacity={glow.opacity || "low"}
                    className={`${glow.position} -z-5`}
                  />
                ))}
                <div className="flex flex-col gap-2">
                  <h5 className="font-bold text-xl">{title}</h5>
                  <p className="">{category}</p>
                </div>
                <h6 className="">"{review}"</h6>

                <div className="flex flex-col">
                  <p className="text-neutral-300 leading-5">{client}</p>
                  <p className="">{catClient}</p>
                </div>
              </div>
            ),
          )}
          {glowOutsidePatterns.map((glow, i) => (
            <Glow
              key={i}
              color={glow.color}
              size={glow.size}
              opacity={glow.opacity || "low"}
              className={`${glow.position} -z-10`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
