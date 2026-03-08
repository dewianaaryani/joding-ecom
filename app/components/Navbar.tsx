import React from "react";
import Logo from "./Logo";
import { MenuIcon, TextAlignEndIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="absolute inset-0 h-32 container-padding flex justify-end md:justify-center items-center">
      <div className="hidden md:flex items-center justify-between w-full">
        <Logo />
        <div className="flex-1 flex justify-between max-w-lg xl:max-w-xl text-sm lg:text-md text-neutral-400">
          <h6>Home</h6>
          <h6>Tentang Kami</h6>
          <h6>Paket Layanan</h6>
          <h6>Konsultasi</h6>
        </div>
      </div>
      <div>
        <MenuIcon
          strokeWidth={1}
          className="md:hidden size-8 ml-auto text-neutral-400"
        />
      </div>
    </div>
  );
}
