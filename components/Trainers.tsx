"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

const trainerImages = "/Akash_and_Gargi.png";

type Trainer = {
  id: string;
  name: string;
  bio: string;
  expertise: string[];
  image: string;
  socials: { href: string; type: "linkedin" | "instagram" | "twitter" }[];
};

const TRAINERS: Trainer[] = [
  {
    id: "t1",
    name: "Aakash",
    bio: "Senior Trader & Mentor with 8+ years of live trading experience across equities and derivatives.",
    expertise: ["Live Execution", "Risk Management", "Strategy Building"],
    image: "/trainer-1.png",
    socials: [
      { href: "#", type: "linkedin" },
      { href: "#", type: "instagram" },
    ],
  },
  {
    id: "t2",
    name: "Gargi Barge",
    bio: "Market analyst and educator focused on practical, result-driven trading systems and psychology.",
    expertise: ["Technical Analysis", "System Design", "Community Coaching"],
    image: "public/images/Aakash dada nd Gargi didi.png",
    socials: [
      { href: "#", type: "linkedin" },
      { href: "#", type: "twitter" },
    ],
  },
];

function SocialIcon({ type }: { type: Trainer["socials"][0]["type"] }) {
  const common = "w-5 h-5 transition-transform duration-200";
  if (type === "linkedin")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-12h4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (type === "instagram")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7.77V8a10.66 10.66 0 01-7.69-3.9s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5A4.5 4.5 0 0023 3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Trainers() {
  const container = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(!!(mq && mq.matches));

    if (!container.current || (mq && mq.matches)) return;

    const els = Array.from(container.current.querySelectorAll('[data-trainer]')) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-trainer") || "";
            setVisible((s) => ({ ...s, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="trainers" className="bg-white py-20 px-6 scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFCF25] text-center">
          Meet Our Expert Trainers
          <span className={`block h-1 bg-[#FFCF25] mt-4 mx-auto ${"underline-draw"}`} />
        </h2>

        <div ref={container} className="mt-12">
          <article
            data-trainer="trainers"
            className="group relative flex flex-col md:flex-row items-center gap-8 md:gap-6"
          >
            {/* Akash - Left Side */}
            <div className={`md:w-1/3 w-full flex flex-col items-center md:items-start p-4 md:p-6 bg-white/50 rounded-lg border-l-4 border-[#FFCF25] ${prefersReducedMotion ? "" : visible["trainers"] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"} transition-all duration-700`} style={prefersReducedMotion ? { transition: "none" } : undefined}>
              <h3 className="text-xl md:text-2xl font-bold text-[#181818] text-center md:text-left">{TRAINERS[0].name}</h3>
              <p className="mt-3 text-sm md:text-base text-[#333333] text-center md:text-left leading-relaxed">{TRAINERS[0].bio}</p>
              
              <ul className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                {TRAINERS[0].expertise.map((e) => (
                  <li key={e} className="text-xs md:text-sm text-[#181818] bg-[#FFCF25]/20 px-3 py-1.5 rounded-md font-medium border border-[#FFCF25]/30">
                    {e}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-3">
                {TRAINERS[0].socials.map((s) => (
                  <a
                    key={s.type}
                    href={s.href}
                    className="group w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#FFCF25]/30 text-[#181818] hover:text-[#FFCF25] hover:bg-[#FFCF25]/10 hover:border-[#FFCF25] transition-all duration-200 hover:scale-110"
                    aria-label={`${TRAINERS[0].name} on ${s.type}`}
                  >
                    <SocialIcon type={s.type} />
                  </a>
                ))}
              </div>
            </div>

            {/* Image - Middle */}
            <div className={`md:w-1/3 w-full flex justify-center ${prefersReducedMotion ? "" : visible["trainers"] ? "opacity-100 scale-100" : "opacity-0 scale-95"} transition-all duration-700 delay-200`} style={prefersReducedMotion ? { transition: "none" } : undefined}>
              <div className="overflow-hidden rounded-lg">
                <Image 
                  src={trainerImages} 
                  alt="Akash and Gargi - Expert Trainers" 
                  className="w-full h-auto object-cover"
                  width={600}
                  height={600}
                  quality={100}
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Gargi - Right Side */}
            <div className={`md:w-1/3 w-full flex flex-col items-center md:items-end p-4 md:p-6 bg-white/50 rounded-lg border-r-4 border-[#FFCF25] ${prefersReducedMotion ? "" : visible["trainers"] ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"} transition-all duration-700 delay-300`} style={prefersReducedMotion ? { transition: "none" } : undefined}>
              <h3 className="text-xl md:text-2xl font-bold text-[#181818] text-center md:text-right">{TRAINERS[1].name}</h3>
              <p className="mt-3 text-sm md:text-base text-[#333333] text-center md:text-right leading-relaxed">{TRAINERS[1].bio}</p>
              
              <ul className="mt-4 flex flex-wrap gap-2 justify-center md:justify-end">
                {TRAINERS[1].expertise.map((e) => (
                  <li key={e} className="text-xs md:text-sm text-[#181818] bg-[#FFCF25]/20 px-3 py-1.5 rounded-md font-medium border border-[#FFCF25]/30">
                    {e}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-3">
                {TRAINERS[1].socials.map((s) => (
                  <a
                    key={s.type}
                    href={s.href}
                    className="group w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#FFCF25]/30 text-[#181818] hover:text-[#FFCF25] hover:bg-[#FFCF25]/10 hover:border-[#FFCF25] transition-all duration-200 hover:scale-110"
                    aria-label={`${TRAINERS[1].name} on ${s.type}`}
                  >
                    <SocialIcon type={s.type} />
                  </a>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
