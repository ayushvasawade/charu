"use client";

import { useEffect, useRef, useState } from "react";
// CTAButton removed from Hero: Explore Courses link will reuse its styles

export default function Hero() {
  const [showUnderline, setShowUnderline] = useState(false);
  const [ctaIn, setCtaIn] = useState(false);
  const [imageIn, setImageIn] = useState(false);
  // Elfsight embed will be injected via script; no ref needed

  useEffect(() => {
    const u = setTimeout(() => setShowUnderline(true), 300);
    const c = setTimeout(() => setCtaIn(true), 450);
    const i = setTimeout(() => setImageIn(true), 550);
    return () => {
      clearTimeout(u);
      clearTimeout(c);
      clearTimeout(i);
    };
  }, []);

  // Inject Elfsight platform script once on client mount
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("elfsight-platform-script")) return;

    const script = document.createElement("script");
    script.id = "elfsight-platform-script";
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // no cleanup: keep script for the lifetime of the app (Elfsight re-uses it)
  }, []);

  // Inject CSS override to hide Elfsight credits/badge inside our specific widget container
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("elfsight-hide-badge-style")) return;

    const style = document.createElement("style");
    style.id = "elfsight-hide-badge-style";
    style.innerHTML = `
      /* Hide Elfsight badge/credit elements for the specific app instance */
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 .elfsight-badge,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 .elfsight-credit,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 .elfsight-copyright,
      .elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 a[href*="elfsight"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
      }
    `;

    document.head.appendChild(style);

    // keep style for the app lifetime; no cleanup necessary
  }, []);

  return (
    <section className="relative flex w-full items-center justify-center px-6 py-20 md:py-28 min-h-screen">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex w-full flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-var-text">
              {(
                "Unlock Your Financial Future with Charu Trading Academy"
              ).split(" ").map((word, idx) => (
                <span key={idx} className="inline-block mr-2">
                  <span className="fill-from-bottom" tabIndex={0} data-word={word}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <div className="mb-6">
              <span className={`underline-draw ${showUnderline ? "show" : ""}`} aria-hidden />
            </div>

            <p className="mb-8 max-w-xl text-base sm:text-lg text-gray-300">
              Practical courses, personalized mentorship, and live market sessions to help you trade confidently.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#courses"
                className="inline-flex w-full md:w-auto items-center justify-center rounded-full bg-[var(--cta)] px-5 py-3 text-sm font-semibold text-black shadow-cta transition-transform duration-200 hover:scale-105 hover:shadow-cta-glow focus:outline-none focus:ring-4 focus:ring-[var(--cta-ring)] self-start sm:self-center"
              >
                Explore Courses
              </a>
            </div>
          </div>

          <div
            className={`w-full md:flex-1 max-w-none rounded-none bg-transparent p-0 transition-transform duration-700 ease-out md:block ${
              imageIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {/* TradingView widget container. We programmatically insert the TradingView embed script
                so the JSON config remains intact and initializes inside this container. */}
              {/* Elfsight Stocks embed (replaces previous TradingView widget) */}
              {/* Elfsight Stocks | Untitled Stocks */}
              <div
                className="elfsight-app-e7bfb344-26d7-4010-91de-bc46ae989e20 h-[40vh] md:h-[60vh] lg:h-[80vh] w-full md:w-[480px] lg:w-[640px] md:ml-auto rounded-none overflow-hidden"
                data-elfsight-app-lazy
              />
          </div>
        </div>
      </div>
    </section>
  );
}
