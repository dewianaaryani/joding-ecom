"use client";

import React, { useState } from "react";
import Glow from "./Glow";
import { MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { FormContactProps } from "../lib/type";

export default function FormContact({
  setIsOpen,
  selectedPlan = "Layanan Joding",
}: FormContactProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const data = {
      whatsapp: formData.get("whatsapp") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      plan: selectedPlan,
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });

      alert("Request sent! I’ll contact you shortly.");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-6">
      <div className="flex relative z-10 overflow-hidden flex-col w-full justify-center items-center card-outline py-10 px-8 max-w-md bg-background">
        <div className="flex flex-col justify-center items-center text-center">
          <h3>Isi Data</h3>
          <h4 className="font-code-next text-center text-primary">
            Kami akan segera menghubungi Anda
          </h4>
        </div>

        <div className="gap-4 flex flex-col w-full mt-6">
          {selectedPlan && (
            <p className="text-sm text-neutral-400">Paket: {selectedPlan}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
            <div className="gap-2 flex flex-col">
              <label>Nomor Whatsapp</label>
              <input
                name="whatsapp"
                placeholder="08xxxxxxxxxx"
                className=""
                required
              />
            </div>

            <div className="gap-2 flex flex-col">
              <label className="">Email</label>
              <input
                name="email"
                type="email"
                placeholder="email@gmail.com"
                className=""
                required
              />
            </div>

            <div className="gap-2 flex flex-col">
              <label>Pesan (opsional)</label>
              <textarea
                name="message"
                placeholder="Ceritakan kebutuhan kamu..."
                className=""
              />
            </div>

            <button
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-secondary w-full px-2 py-3 rounded-lg text-xs font-semibold hover:bg-secondary/80 transition disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim"}
              <Send className="size-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-neutral-700"></div>
              <p className="text-xs text-neutral-400 whitespace-nowrap">Atau</p>
              <div className="flex-1 h-px bg-neutral-700"></div>
            </div>

            {/* WhatsApp */}
            <Link
              href={`https://wa.me/6287874739802?text=Halo%20saya%20tertarik%20dengan%20${
                selectedPlan ?? "layanan Anda"
              }`}
              target="_blank"
              className="flex items-center justify-center gap-2 border border-secondary bg-secondary w-full px-2 py-3 rounded-lg text-xs font-semibold hover:bg-secondary/80 transition"
            >
              Diskusi cepat via WhatsApp
              <MessageCircle className="size-4" />
            </Link>

            {/* Cancel */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="border border-secondary w-full px-2 py-3 rounded-lg text-xs font-semibold hover:bg-secondary transition"
            >
              Batal
            </button>
          </div>
        </div>

        <Glow className="-top-18 -left-12 -z-20" size="xl" />
        <Glow className="bottom-10 left-12 -z-20" size="xl" />
      </div>
    </div>
  );
}
