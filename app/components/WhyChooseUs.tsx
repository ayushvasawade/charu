"use client";

import React, { useEffect, useRef, useState } from "react";

const reasons = [
  "World-Class Mentors",
  "Real, Practical Trading Strategies",
  "Proven Student Success",
  "Supportive Community & Networking",
];

const trustBadges = [
  { label: "Verified Results", emoji: "🏆" },
  { label: "Live Trading", emoji: "📈" },
  { label: "Mentor-led", emoji: "👨‍🏫" },
  { label: "Community", emoji: "🤝" },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="why-choose-heading"
      className="bg-white py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            id="why-choose-heading"
            className="text-3xl md:text-4xl font-extrabold text-[var(--accent)] inline-block"
          >
            Why Choose Us
          </h2>

          {/* underline draw */}
          <div
            className={`underline-draw mt-4 mx-auto ${inView ? "show" : ""}`}
            aria-hidden
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <ul className="space-y-6">
              {reasons.map((r, idx) => (
                <li
                  key={r}
                  className={`flex items-start gap-4 ${inView ? "reveal in" : "reveal"}`}
                  style={{ transitionDelay: `${idx * 90}ms` }}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center icon-pop ${inView ? "in" : ""}`}
                    aria-hidden
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.28 15.3a1 1 0 0 1-1.36 1.44l-3.5-3.16a1 1 0 0 1-.12-1.42l.12-.14a1 1 0 0 1 1.42-.12l2.86 2.58 5.48-6.22a1 1 0 0 1 1.52 1.28l-6.5 7.37z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--charcoal)]">{r}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {trustBadges.map((b, i) => (
              <div
                key={b.label}
                role="button"
                tabIndex={0}
                className={`group transform-gpu transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] flex items-center gap-3 p-4 rounded-lg border border-gray-100 shadow-sm bg-white
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                hover:-translate-y-2 hover:shadow-lg hover:border-transparent`}
                style={{
                transitionDelay: `${i * 90}ms`,
                willChange: "transform, opacity, boxShadow, backgroundColor, color",
                }}
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--accent)]/8 group-hover:bg-[var(--accent)]/12 flex items-center justify-center text-[var(--accent)] text-xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                {b.emoji}
                </div>

                <div>
                <div className="text-sm font-semibold text-[var(--charcoal)] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[var(--accent)]">
                  {b.label}
                </div>
                </div>
              </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
