import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const footerContacts = [
    {
      id: 1,
      title: "Instagram",
      href: "https://www.instagram.com/joding.dev/",
      icon: "instagram",
      src: "/icons/instagram.png",
    },
    {
      id: 2,
      title: "Whatsapp",
      href: "https://wa.me/6281250274260",
      icon: "whatsapp",
      src: "/icons/whatsapp.png",
    },
    {
      id: 3,
      title: "Email",
      href: "mailto:hello@joding.dev",
      icon: "email",
      src: "/icons/vector.png",
    },
  ];
  return (
    <section id="footer">
      <div className="container-padding">
        <div className="grid grid-cols-3">
          {footerContacts.map(({ id, title, href, src }) => (
            <Link key={id} href={href} className="flex gap-2">
              <div className="flex size-8">
                <Image
                  width={100}
                  height={100}
                  src={src}
                  alt={title}
                  className="object-contain w-full h-full"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
