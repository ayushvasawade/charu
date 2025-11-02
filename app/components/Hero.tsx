"use client";

import { useEffect, useState } from "react";
import CTAButton from "./CTAButton";

export default function Hero() {
  const [showUnderline, setShowUnderline] = useState(false);
  const [ctaIn, setCtaIn] = useState(false);
  const [imageIn, setImageIn] = useState(false);

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
              <div className={`transform transition-all duration-500 ${ctaIn ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
                <CTAButton />
              </div>

              <a href="#courses" className="text-sm font-medium text-var-text hover:text-[var(--accent)] self-start sm:self-center">
                Explore Courses
              </a>
            </div>
          </div>

          <div className={`w-full max-w-sm rounded-2xl bg-[var(--subtle)] p-6 shadow-soft transition-transform duration-700 ease-out md:block ${imageIn ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
            <div className="h-48 w-full rounded-lg bg-gradient-to-tr from-white to-[var(--accent)]/10" />
            <p className="mt-4 text-sm text-[var(--charcoal)]">Live market dashboard preview</p>
          </div>
        </div>
      </div>
    </section>
  );
}
