import React from "react";

import Image from "next/image";
const FooterImageItems = [
  {
    key: 1,
    label: "Linkedin",
    href: "https://www.linkedin.com/company/studio-daivikah/",
    src: "/icons/linkedin_filled.svg",
  },
  {
    key: 2,
    label: "Instagram",
    href: "https://www.instagram.com/studio.daivikah?igsh=NHFnbjJ2cmpxYXRh&utm_source=qr",
    src: "/icons/instagram_filled.svg",
  },
  {
    key: 3,
    label: "Whatsapp",
    href: "https://wa.me/917550237036?text=Hello%20Studio%20Daivikah",
    src: "/icons/whatsapp_filled.svg",
  },
];

const SocialLinks = () => {
  return (
    <main className="mt-1 flex space-x-4 sm:justify-center">
      {FooterImageItems.map((v) => (
        <a
          rel="noopener noreferrer"
          href={v.href}
          key={v.key}
          target="_blank"
          className="flex size-9 items-center justify-center rounded-full bg-black ring-1 ring-slate-400 hover:bg-slate-300"
        >
          <Image height={20} width={20} alt={v.label} src={v.src} />
        </a>
      ))}
    </main>
  );
};

export default SocialLinks;
