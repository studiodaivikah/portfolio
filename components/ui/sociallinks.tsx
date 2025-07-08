import React from "react";

import Link from "next/link";
import Image from "next/image";
const FooterImageItems = [
  //   { key: 1, label: "x", href: "/", src: "/assets/icons/x.svg" },
  { key: 2, label: "Instagram", href: "/", src: "/icons/instagram_filled.svg" },
  { key: 1, label: "Linkedin", href: "/", src: "/icons/linkedin_filled.svg" },
  //   { key: 1, label: "Youtube", href: "/", src: "/assets/icons/youtube.svg" },
  {
    key: 3,
    label: "Whatsapp",
    href: "/",
    src: "/icons/whatsapp_filled.svg",
  },
];

const SocialLinks = () => {
  return (
    <main className="mt-1 flex space-x-4 sm:justify-center">
      {FooterImageItems.map((v) => (
        <Link
          href={v.href}
          key={v.key}
          className="flex size-9 items-center justify-center rounded-full bg-black ring-1 ring-slate-400 hover:bg-slate-300"
        >
          <Image height={20} width={20} alt={v.label} src={v.src} />
        </Link>
      ))}
    </main>
  );
};

export default SocialLinks;
