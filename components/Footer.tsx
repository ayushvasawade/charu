"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { name: "About Us", href: "#about" },
    { name: "Courses", href: "#courses" },
    { name: "Trainers", href: "#trainers" },
    { name: "Features", href: "#features" },
    { name: "Reviews", href: "#reviews" },
    { name: "Why Choose Us", href: "#why" },
    { name: "Start Your Journey", href: "#start" },
    { name: "Instagram", href: "#instagram" },
  ];

  return (
    <footer className="bg-[#181818] text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Overview */}
          <div>
            <a href="/" aria-label="Charu Wealth Academy home" className="inline-flex items-center gap-3">
              <Image 
                src="/Charu_logo.png" 
                alt="Charu Wealth Academy Logo" 
                width={40} 
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-semibold">Charu Wealth Academy</span>
            </a>

            <p className="mt-4 text-sm text-gray-200">Empowering you to trade with confidence.</p>

            <p className="mt-6 text-xs text-gray-400">© {year} Charu Wealth Academy. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-400 font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      // Only handle smooth scroll for hash links
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        const element = document.getElementById(link.href.substring(1));
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }
                    }}
                    className="text-white hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818]"
                  >
                    <span className="underline-offset-2 hover:underline">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-yellow-400 font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-200">
              <li>
                <a
                  href="mailto:support@charutradingacademy.com"
                  className="hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818]"
                  aria-label="Email support"
                >
                  support@charutradingacademy.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+911234567890"
                  className="hover:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818]"
                  aria-label="Call us"
                >
                  +91 12345 67890
                </a>
              </li>

              <li className="flex items-start gap-2">
                <svg className="mt-1 flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#FFCF25" />
                  <circle cx="12" cy="9" r="2.5" fill="#181818" />
                </svg>
                <span className="text-gray-200">123 Market Street, Mumbai, India</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-yellow-400 font-semibold">Follow Us</h3>

            <p className="mt-4 text-sm text-gray-200">Stay connected — quick updates, tips and community highlights.</p>

            <div className="mt-4 flex items-center gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-transparent border border-transparent text-white hover:text-[#181818] hover:bg-yellow-400 transform transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7 0h4.8v2.2h.1c.7-1.3 2.4-2.2 3.9-2.2 4.2 0 5 2.8 5 6.4V24h-5v-7.1c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V24H7V8z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-transparent border border-transparent text-white hover:text-[#181818] hover:bg-yellow-400 transform transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 8zm6.5-3a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="https://www.twitter.com"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-transparent border border-transparent text-white hover:text-[#181818] hover:bg-yellow-400 transform transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M22 5.9c-.7.3-1.4.6-2.2.7.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.7-2.5.9C18.2 4.5 17.2 4 16.1 4c-1.6 0-2.9 1.3-2.9 2.9 0 .2 0 .5.1.7C10.6 7.5 8 6 6.1 4c-.3.5-.4 1.1-.4 1.7 0 1.3.7 2.5 1.8 3.1-.6 0-1.1-.2-1.6-.4v.1c0 1.4 1 2.6 2.3 2.9-.2.1-.5.1-.8.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.2 3 2.2-1.1.9-2.4 1.4-3.8 1.4H6c1.4.9 3 1.4 4.7 1.4 5.6 0 8.6-4.6 8.6-8.6v-.4c.6-.4 1.2-1 1.6-1.6-.6.3-1.3.5-2 .6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom small print */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500 text-center">
            Designed with care — accessible, responsive and branded for Charu Wealth Academy.
          </p>
        </div>
      </div>
    </footer>
  );
}
