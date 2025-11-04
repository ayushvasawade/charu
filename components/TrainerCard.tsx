"use client";

import { FC } from "react";

export const TrainerCard: FC<{
  name: string;
  title: string;
  bio: string;
  reverse?: boolean;
}> = ({ name, title, bio, reverse = false }) => {
  return (
    <article className={`group flex items-center gap-8 rounded-2xl bg-[var(--subtle)] p-6 shadow-sm ${reverse ? "flex-row-reverse" : ""}`}>
      <div className="flex-shrink-0">
        <div className="h-28 w-28 rounded-lg bg-white shadow-md flex items-center justify-center text-xl font-semibold text-[var(--text)]">
          {name.split(" ")[0][0]}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-bold text-[var(--text)]">{name}</h3>
        <p className="mb-2 text-sm font-medium text-[var(--charcoal)]">{title}</p>
        <p className="text-sm text-[var(--text)]">{bio}</p>

        <div className="mt-4 flex gap-3">
          <a aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--text)] shadow transition-transform duration-150 hover:scale-110 hover:bg-[var(--accent-1)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-2-2 2 2 0 00-2 2v6h-4v-12h4v2.2a4 4 0 014-2.2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--text)] shadow transition-transform duration-150 hover:scale-110 hover:bg-[var(--accent-1)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default TrainerCard;
