"use client";

import { useEffect, useRef, useState } from "react";

type Review = {
  id: string;
  rating: number;
  text: string;
  name: string;
  meta?: string;
};

const REVIEWS: Review[] = [
  {
    id: "r1",
    rating: 5,
    text: "Charu Trading Academy transformed my approach to the markets — practical lessons, live sessions, and mentorship that actually works.",
    name: "Priya K.",
    meta: "Student — Foundations of Trading",
  },
  {
    id: "r2",
    rating: 5,
    text: "I doubled my consistency after following the risk management modules. The live trading sessions are priceless.",
    name: "Sahil M.",
    meta: "Student — Technical Patterns",
  },
  {
    id: "r3",
    rating: 4,
    text: "Supportive community and clear mentorship. The strategies are practical and easy to implement.",
    name: "Neha R.",
    meta: "Student — Mentorship Program",
  },
  {
    id: "r4",
    rating: 5,
    text: "Excellent course material and live walkthroughs — helped me build a trading plan that suits my style.",
    name: "Karan S.",
    meta: "Student — Options & Derivatives",
  },
];

function Stars({ count = 5 }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#FFCF25]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(!!(mq && mq.matches));

    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerPage(3);
      else if (w >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    // clamp index when itemsPerPage changes
    const maxIndex = Math.max(0, REVIEWS.length - itemsPerPage);
    if (index > maxIndex) setIndex(maxIndex);
  }, [itemsPerPage, index]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(REVIEWS.length - itemsPerPage, i + 1));

  // touch handlers for swipe
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (startX.current === null) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX.current;
      if (Math.abs(dx) > 50) {
        if (dx < 0) next(); else prev();
      }
      startX.current = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart as any);
      el.removeEventListener("touchend", onTouchEnd as any);
    };
  }, [itemsPerPage]);

  const translate = `-${(index * 100) / itemsPerPage}%`;
  const transitionStyle = prefersReducedMotion ? { transition: "none" } : { transition: "transform 480ms cubic-bezier(.2,.9,.3,1)" };

  return (
    <section id="reviews" className="bg-white py-20 px-6 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFCF25] text-center">
          Student Reviews
          <span className="block h-1 bg-[#FFCF25] mt-4 mx-auto underline-draw" />
        </h2>

        <div className="mt-8 relative">
          <div className="flex items-center justify-end gap-3 mb-4">
            <button aria-label="Previous reviews" onClick={prev} className="carousel-btn p-2 rounded-md bg-white/90 shadow-sm hover:bg-white" disabled={index === 0}>
              ‹
            </button>
            <button aria-label="Next reviews" onClick={next} className="carousel-btn p-2 rounded-md bg-white/90 shadow-sm hover:bg-white" disabled={index >= REVIEWS.length - itemsPerPage}>
              ›
            </button>
          </div>

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="slider-track flex gap-6"
              role="list"
              aria-label="Student testimonials"
              style={{ transform: `translateX(${translate})`, ...transitionStyle }}
            >
              {REVIEWS.map((r) => (
                <article
                  key={r.id}
                  role="listitem"
                  className="review-card bg-[#F6F6F6] rounded-lg p-6 transition-transform duration-300 hover:scale-105"
                  style={{ flex: `0 0 calc(100% / ${itemsPerPage})` }}
                >
                  <div className="flex items-start justify-between">
                    <Stars count={r.rating} />
                    <span className="text-sm text-[#212121]">"</span>
                  </div>

                  <p className="mt-4 text-[#181818]">{r.text}</p>

                  <div className="mt-4 text-sm text-[#212121] font-semibold">{r.name}</div>
                  {r.meta ? <div className="text-xs text-[#666]">{r.meta}</div> : null}
                </article>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-[#666] md:hidden">Swipe to view more reviews</div>
        </div>
      </div>
    </section>
  );
}
