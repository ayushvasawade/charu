"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // show loader for ~2200ms then fade (restored original timing)
    const showTimer = setTimeout(() => setFading(true), 2200);
    const hideTimer = setTimeout(() => setVisible(false), 2600);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-400 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >

      <div className="flex flex-col items-center gap-4">
        <div className="text-2xl font-extrabold text-var-text">
          <span className="text-[var(--accent)]">Charu</span>{" "}
        <span className="text-black">Trading Academy</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="loader-dot bg-[var(--accent)]" />
          <span className="loader-dot bg-[var(--accent)]" style={{ animationDelay: "120ms" }} />
          <span className="loader-dot bg-[var(--accent)]" style={{ animationDelay: "240ms" }} />
        </div>
      </div>
    </div>
  );
}
