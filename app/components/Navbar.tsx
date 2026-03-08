"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="absolute z-20 inset-0 h-32 container-padding flex justify-end md:justify-center items-center">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between w-full">
          <Logo />

          <div className="flex-1 flex justify-between max-w-lg xl:max-w-xl text-sm lg:text-md text-neutral-400">
            <h6>Home</h6>
            <h6>Tentang Kami</h6>
            <h6>Paket Layanan</h6>
            <h6>Konsultasi</h6>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden ml-auto text-neutral-400 cursor-pointer"
        >
          <MenuIcon size={32} strokeWidth={1} />
        </button>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-72 bg-[#050816] border-l border-white/10
  transform transition-transform duration-300 ease-in-out
  ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button onClick={() => setOpen(false)} className="cursor-pointer">
            <X className="text-neutral-400" />
          </button>
        </div>

        {/* Menu items */}
        <div className="flex flex-col gap-6 px-8 text-neutral-300">
          <h6>Home</h6>
          <h6>Tentang Kami</h6>
          <h6>Paket Layanan</h6>
          <h6>Konsultasi</h6>
        </div>
      </div>
    </>
  );
}
