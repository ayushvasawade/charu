export default function SectionHeading({
  text,
  id,
}: {
  text: string;
  id?: string;
}) {
  return (
    <h2 id={id} className="mb-6 text-center text-2xl font-bold text-[var(--accent-1)]">
      <span className="relative inline-block">
        {text}
        <svg className="absolute left-0 -bottom-3" width="140" height="10" viewBox="0 0 140 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="animate-draw" d="M2 5 C30 12, 110 -4, 138 5" stroke="var(--accent-1)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
    </h2>
  );
}
