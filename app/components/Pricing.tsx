"use client";
import { Check, MessageCircle, Send } from "lucide-react";
import React, { useState } from "react";
import Glow from "./Glow";
import { GlowPattern } from "../lib/type";

import FormContact from "./FormContact";

export default function Pricing() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const pricingData = [
    {
      title: "Basic Task",
      description:
        "Cocok untuk kebutuhan sederhana seperti perbaikan kode atau penyesuaian fitur kecil.",
      key: [
        "Perbaikan bug atau error pada kode",
        "Penyesuaian atau penambahan fitur sederhana",
        "Waktu pengerjaan relatif cepat",
      ],
    },
    {
      title: "Standard Project",
      description:
        "Dirancang untuk project dengan ruang lingkup menengah, seperti tugas akademik atau pengembangan website dengan beberapa fitur utama.",
      key: [
        "Pengembangan fitur sesuai kebutuhan project",
        "Struktur kode yang rapi dan mudah dipelihara",
        "Tampilan yang responsive",
        "Dokumentasi dasar project",
      ],
    },
    {
      title: "Advanced Project",
      description:
        "Cocok untuk pengembangan sistem atau website dengan kebutuhan yang lebih kompleks.",
      key: [
        "Pengembangan website atau aplikasi secara custom",
        "Integrasi dengan database",
        "Optimasi performa aplikasi",
        "Dukungan prioritas selama pengerjaan",
        "Dokumentasi lengkap project",
      ],
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
      <div className="container-padding">
        <h4 className="font-code-next title-section">Paket Layanan</h4>
        <div className="grid relative grid-cols-1 lg:grid-cols-3 gap-8 mt-12 ">
          {pricingData.map(({ title, description, key }, index) => (
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
                <p className="">{description}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedPlan(title);
                  setIsOpen(true);
                }}
                className="border border-secondary w-full px-2 py-3 rounded-lg text-xs font-semibold"
              >
                Pilih {title}
              </button>
              <div className="flex flex-col gap-2">
                <h6 className="">Includes</h6>
                <div className="flex flex-col gap-2">
                  {key.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Check className="size-5 shrink-0 text-primary" />{" "}
                      <p className="text-neutral-300 leading-5">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
      {isOpen && (
        <FormContact setIsOpen={setIsOpen} selectedPlan={selectedPlan} />
      )}
    </section>
  );
}
