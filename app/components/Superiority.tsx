import { Sparkle } from "lucide-react";
import React from "react";
import Glow from "./Glow";

export default function Superiority() {
  const superiorityData = [
    {
      id: 1,
      title: "Pengerjaan Terstruktur",
      description:
        "Setiap project dikerjakan dengan alur yang jelas mulai dari analisis kebutuhan, pengembangan, hingga tahap penyelesaian.",
    },
    {
      id: 2,
      title: "Kode yang Rapi dan Mudah Dipelihara",
      description:
        "Penulisan kode dilakukan dengan standar yang baik sehingga lebih mudah dipahami dan dikembangkan kembali di masa depan.",
    },
    {
      id: 3,
      title: "Komunikasi yang Jelas",
      description:
        "Proses diskusi dan koordinasi dilakukan secara terbuka agar kebutuhan project dapat dipahami dengan baik.",
    },
    {
      id: 4,
      title: "Estimasi yang Transparan",
      description:
        "Estimasi biaya dan waktu pengerjaan disampaikan secara jelas sebelum project dimulai.",
    },
    {
      id: 5,
      title: "Fleksibel Sesuai Kebutuhan Project",
      description:
        "Pengembangan Layanan dapat disesuaikan dengan berbagai jenis project, mulai dari tugas kecil hingga pengembangan sistem yang lebih kompleks.",
    },
  ];
  return (
    <div className="flex relative z-10 overflow-hidden flex-col w-full justify-center items-center card-outline py-10 px-8">
      <div className="flex flex-col justify-center items-center text-center">
        <h4 className="font-code-next text-center text-primary">
          Kenapa Memilih Kami?
        </h4>
        <h3>Keunggulan Layanan</h3>
      </div>
      <div className="gap-4 flex flex-col divide-y divide-neutral-500/50 w-full mt-6">
        {superiorityData.map(({ id, title, description }) => (
          <div key={id} className="flex flex-col gap-2 py-4">
            <div className="flex gap-2">
              <Sparkle
                className="size-5"
                strokeWidth={0}
                fill="#882fff"
                absoluteStrokeWidth={true}
              />
              <h5>{title}</h5>
            </div>
            <p>{description}</p>
          </div>
        ))}
      </div>

      <Glow className="-top-18 -left-12 -z-20" size="xl" />

      <Glow className="bottom-10 left-12 -z-20" size="xl" />
    </div>
  );
}
