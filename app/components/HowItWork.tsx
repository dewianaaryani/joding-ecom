import React from "react";
import Glow from "./Glow";

export default function HowItWork() {
  const steps = [
    {
      id: 1,
      title: "Kirim Detail Project",
      description:
        "Sampaikan deskripsi project, teknologi yang digunakan, serta estimasi deadline yang diinginkan.",
    },
    {
      id: 2,
      title: "Estimasi Biaya dan Waktu ",
      description:
        "Kami akan meninjau kebutuhan project dan memberikan estimasi biaya serta waktu pengerjaan secara jelas.",
    },
    {
      id: 3,
      title: "Proses Pengerjaan",
      description:
        "Project dikerjakan dengan kode yang rapi dan terstruktur, disertai update progres bila diperlukan.",
    },
    {
      id: 4,
      title: "Penyelesaian & Revisi",
      description:
        "Hasil project akan dikirim setelah selesai, dengan opsi revisi untuk memastikan sesuai kebutuhan.",
    },
  ];
  return (
    <div className="flex col-span-1 lg:col-span-2 relative z-10 overflow-hidden flex-col w-full justify-center items-center card-outline py-12 px-8">
      <h3 className="text-center">
        Bekerja Bersama Kami dengan{" "}
        <span className="text-primary">4 Langkah Mudah</span>
      </h3>
      <div className="gap-8 xl:gap-16 grid grid-cols-1 xl:grid-cols-2 w-full mt-6 xl:mt-12 max-w-2xl xl:max-w-5xl 2xl:max-w-7xl justify-center items-center">
        {steps.map(({ id, title, description }, index) => (
          <div key={id} className="flex gap-6 justify-center items-center">
            <h1 className="text-3xl text-secondary font-semibold">
              {String(index + 1).padStart(2, "0")}
            </h1>
            <div className="flex flex-col gap-2">
              <h5 className="underline decoration-secondary decoration-2">
                {title}
              </h5>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>

      <Glow className="top-0 -z-20" size="md" color="purple" opacity="high" />
      <Glow className="bottom-42 -right-12 -z-20" size="sm" opacity="low" />
    </div>
  );
}
