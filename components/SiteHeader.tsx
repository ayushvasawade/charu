"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { href: "#about", label: "About Us" },
  { href: "#courses", label: "Courses" },
  { href: "#trainers", label: "Trainers" },
  { href: "#features", label: "Features" },
  { href: "#reviews", label: "Reviews" },
  { href: "#why", label: "Why Choose Us" },
  { href: "#start", label: "Start Your Journey" },
  { href: "#instagram", label: "Instagram" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape and lock body scroll while menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-40 mx-auto w-full max-w-6xl px-6 transition-transform duration-200 ${
        scrolled ? "scale-102 shadow-soft" : ""
      }`}
    >
      <nav className="backdrop-blur-sm rounded-full bg-white/60 dark:bg-black/60 border border-transparent px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/Charu_logo.png" 
              alt="Charu Wealth Academy Logo" 
              width={40} 
              height={40}
              className="h-10 w-auto"
              priority
            />
            <span className="text-xl font-semibold text-[var(--text)]">
              Charu Wealth Academy
            </span>
          </Link>
        </div>

          <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  // Only handle smooth scroll for hash links, not external URLs
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.getElementById(item.href.substring(1));
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
                className="group relative inline-block text-sm font-medium text-var-text hover:text-[var(--accent)] transition-colors"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 block h-0.5 w-0 bg-[var(--accent)] transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((s) => !s)}
            className="p-2 rounded-md"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18M6 18L18 6" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30"
          role="dialog"
          aria-modal="true"
          onKeyDown={(e) => {
            if (e.key === "Escape") setMenuOpen(false);
          }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden
          />

          <div className="relative mt-20 mx-6 rounded-lg bg-[#181818] text-white p-6 shadow-lg">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      // Only handle smooth scroll for hash links, not external URLs
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        const element = document.getElementById(item.href.substring(1));
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }
                      setMenuOpen(false);
                    }}
                    className="block text-lg font-medium hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
