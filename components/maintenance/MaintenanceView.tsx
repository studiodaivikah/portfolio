"use client";

import Image from "next/image";
import React from "react";
import { Wrench, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function MaintenanceView() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-black text-white overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Background image with moody overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/herobg.jpg"
          alt="Studio Daivikah Architecture Background"
          fill
          priority
          className="object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.1)_0,transparent_70%)] pointer-events-none" />
        
        {/* Subtle grid pattern line overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: "32px 32px"
          }}
        />
      </div>

      {/* Top Header / Logo Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-10 pt-6 sm:pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Image
            src="/images/logo.png"
            alt="Studio Daivikah Logo"
            width={72}
            height={72}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-bold tracking-wider text-white uppercase">
              STUDIO DAIVIKAH
            </span>
            <span className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-amber-400 font-light uppercase">
              Architecture & Interior Studio
            </span>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
          </span>
          <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
            Maintenance In Progress
          </span>
        </div>
      </header>

      {/* Hero / Maintenance Notice Content */}
      <main className="relative z-20 w-full max-w-4xl mx-auto px-5 sm:px-6 py-8 sm:py-16 flex flex-col items-center text-center my-auto">
        {/* Mobile Status Badge */}
        <div className="sm:hidden flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-md mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase">
            Maintenance In Progress
          </span>
        </div>

        {/* Icon Accent */}
        <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-amber-700/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
          <Wrench className="relative w-8 h-8 sm:w-10 sm:h-10 text-amber-400 animate-pulse" />
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-3 sm:mb-4">
          WEBSITE IS UNDER <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            MAINTENANCE
          </span>
        </h1>

        <p className="text-base sm:text-xl font-medium text-amber-300/90 mb-3 sm:mb-4 tracking-wide px-2">
          Stay Tuned — We&apos;re Crafting Something Extraordinary!
        </p>

        <p className="text-xs sm:text-base text-gray-300 max-w-2xl leading-relaxed mb-8 sm:mb-10 px-2">
          Studio Daivikah digital experience is currently undergoing scheduled enhancements and architectural updates. 
          We will be back live shortly with refined design showcases, project portfolios, and digital services.
        </p>

        {/* Responsive Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-lg mb-10 sm:mb-12 px-2">
          <a
            href="https://wa.me/917550237036?text=Hello%20Studio%20Daivikah%2C%20I%20saw%20the%20website%20is%20under%20maintenance"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-30 w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-[0.97] touch-manipulation transition-all duration-200 cursor-pointer min-h-[50px]"
          >
            <Image
              src="/icons/whatsapp_filled.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              className="w-5 h-5 shrink-0 brightness-0"
            />
            <span className="whitespace-nowrap">Chat on WhatsApp</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>

          <a
            href="mailto:studiodavikah@gmail.com"
            className="relative z-30 w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/15 text-white font-semibold text-sm sm:text-base tracking-wide backdrop-blur-md active:scale-[0.97] touch-manipulation transition-all duration-200 cursor-pointer min-h-[50px]"
          >
            <Mail className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">Email Us</span>
          </a>
        </div>

        {/* Contact Info Grid Box */}
        <div className="w-full max-w-3xl rounded-2xl bg-white/[0.03] border border-white/10 p-5 sm:p-8 backdrop-blur-xl shadow-2xl">
          <h3 className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-amber-400 mb-5 sm:mb-6 text-center sm:text-left">
            Need Immediate Assistance? Get In Touch
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-left">
            {/* Direct Call */}
            <a 
              href="tel:+917550237036"
              className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors group cursor-pointer"
            >
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-amber-400/50 transition-colors shrink-0">
                <Phone className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</span>
                <span className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                  +91 75502 37036
                </span>
              </div>
            </a>

            {/* Email */}
            <a 
              href="mailto:studiodavikah@gmail.com"
              className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors group cursor-pointer"
            >
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-amber-400/50 transition-colors shrink-0">
                <Mail className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">Email</span>
                <span className="text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                  studiodavikah@gmail.com
                </span>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-start gap-3.5 p-3 rounded-xl">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 shrink-0">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">Location</span>
                <span className="text-xs font-medium text-gray-300 leading-snug">
                  Surapet Main Rd, Chennai, TN
                </span>
              </div>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] sm:text-xs text-gray-400 tracking-wider uppercase font-medium">
              Follow Us For Updates
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/studio-daivikah/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 active:bg-white/25 border border-white/10 hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
              >
                <Image src="/icons/linkedin_filled.svg" alt="LinkedIn" width={16} height={16} className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="https://www.instagram.com/studio.daivikah?igsh=NHFnbjJ2cmpxYXRh&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 active:bg-white/25 border border-white/10 hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
              >
                <Image src="/icons/instagram_filled.svg" alt="Instagram" width={16} height={16} className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="https://wa.me/917550237036?text=Hello%20Studio%20Daivikah"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 active:bg-white/25 border border-white/10 hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
              >
                <Image src="/icons/whatsapp_filled.svg" alt="WhatsApp" width={16} height={16} className="w-4 h-4 shrink-0" />
              </a>
              <a
                href="https://www.facebook.com/share/15spjwC4w9/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/15 active:bg-white/25 border border-white/10 hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
              >
                <Image src="/icons/facebook_filled.svg" alt="Facebook" width={16} height={16} className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-20 w-full py-5 sm:py-6 px-5 border-t border-white/10 text-center bg-black/40 backdrop-blur-md">
        <p className="text-[11px] sm:text-xs text-gray-400 tracking-wide">
          © {new Date().getFullYear()} Studio Daivikah. All rights reserved. Architectural &amp; Interior Practice.
        </p>
      </footer>
    </div>
  );
}
