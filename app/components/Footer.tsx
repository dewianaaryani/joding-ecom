"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { navigations } from "../constant";
import FormContact from "./FormContact";

export default function Footer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const footerContacts = [
    {
      id: 1,
      title: "Instagram",
      content: "@jodingdotcom",
      href: "https://www.instagram.com/jodingdotcom/",
      src: "/icons/instagram.png",
      size: "size-8",
    },
    {
      id: 2,
      title: "Whatsapp",
      content: "+6287874739802",
      href: "https://wa.me/6281250274260",
      src: "/icons/whatsapp.png",
      size: "size-8",
    },
    {
      id: 3,
      title: "Email",
      content: "jodingdotcom@gmail.com",
      href: "mailto:jodingdotcom@gmail.com",
      src: "/icons/mail.png",
      size: "size-6",
    },
  ];

  return (
    <section
      id="footer"
      className="min-h-100 justify-center lg:justify-start flex items-center w-full"
    >
      <div className="flex container-padding items-center justify-center lg:justify-between lg:items-start w-full">
        <div className="hidden xl:flex">
          <div className="flex flex-col gap-6 max-w-md">
            <Logo />
            <p>
              Tertarik lebih lanjut atau sekedar ingin bertanya? {""}
              <button
                onClick={() => setIsOpen(true)}
                className="underline decoration-primary hover:text-primary transition-all"
              >
                Kontak kami sekarang
              </button>
            </p>
          </div>
        </div>
        <div className="hidden xl:flex flex-col gap-6">
          <h6>Navigasi</h6>
          {navigations.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className="flex gap-2 text-neutral-400 hover:text-primary"
            >
              {title}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-6">
          {footerContacts.map(({ id, title, content, href, src, size }) => (
            <Link
              key={id}
              href={href}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <div
                className="group flex items-center justify-center size-12 rounded-xl border border-white/10
  transition-all duration-500 ease-out
  hover:border-purple-400/40
  hover:shadow-[0_0_30px_rgba(124,58,237,0.25)]
  hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                  boxShadow:
                    "inset 0 1px 6px rgba(255,255,255,0.08), 0 6px 20px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <Image
                  src={src}
                  alt={title}
                  width={400}
                  height={400}
                  className={`object-contain ${size} transition-all duration-500 group-hover:scale-110`}
                  style={{
                    filter: "drop-shadow(0 0 5px rgba(124,58,237,0.5))",
                  }}
                />
              </div>
              <p className="hidden lg:flex">{content}</p>
            </Link>
          ))}
        </div>
      </div>
      {isOpen && <FormContact setIsOpen={setIsOpen} />}
    </section>
  );
}
