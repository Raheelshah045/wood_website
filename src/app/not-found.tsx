import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex-grow flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-br from-brand-bg-dark to-brand-bg relative z-10 select-none">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center justify-center gap-4 mb-4">
          <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
          404 Error
          <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
        </div>
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-espresso mb-6">
          This space doesn&apos;t<br />
          <span className="italic text-brand-copper font-normal">exist yet.</span>
        </h1>
        <p className="text-base md:text-lg text-brand-txt-muted max-w-md mx-auto mb-10 font-light">
          The link you followed might be broken, or the page may have moved.
        </p>
        <Link
          href="/"
          className="px-9 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg hover:shadow-brand-walnut/30 transition-all duration-300 no-underline inline-block"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
