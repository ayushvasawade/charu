import Link from "next/link";

export default function CTAButton({
  label = "Start Your Journey",
  href = "#start",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-full md:w-auto items-center justify-center rounded-full bg-[var(--cta)] px-5 py-3 text-sm font-semibold text-black shadow-cta transition-transform duration-200 hover:scale-105 hover:shadow-cta-glow focus:outline-none focus:ring-4 focus:ring-[var(--cta-ring)]"
      aria-label={label}
    >
      {label}
    </Link>
  );
}
