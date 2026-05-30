"use client";

import { useEffect } from "react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    label: "Consultation & Concept",
    desc: "We begin with an in-depth consultation to understand your space, lifestyle, and aesthetic vision. Whether it's a kitchen, wardrobe, or full interior — we listen first.",
    detail: "Home visit available across Karachi",
  },
  {
    number: "02",
    label: "3D Design & Material Selection",
    desc: "Our team creates detailed digital mockups so you can visualise every piece before a single cut is made. Alongside, you select from our premium laminate, wood, and hardware catalogue.",
    detail: "Full CAD rendering included",
  },
  {
    number: "03",
    label: "Handcrafted Fabrication",
    desc: "Skilled craftsmen build your furniture piece by piece in our workshop — using premium Grade-A board, precision joinery, and meticulous quality checks at every stage.",
    detail: "Built in-house, no outsourcing",
  },
  {
    number: "04",
    label: "Delivery & Installation",
    desc: "Our installation team delivers and fits everything perfectly to your space. We leave only after ensuring every door, drawer, and panel is aligned to perfection.",
    detail: "Full professional installation",
  },
  {
    number: "05",
    label: "After-Sale Support",
    desc: "Our relationship doesn't end at installation. We offer post-installation check-ins and are always available if you need adjustments, repairs, or future additions.",
    detail: "Ongoing client support",
  },
];

const whyUs = [
  { icon: "🇵🇰", label: "Karachi Based", desc: "Serving all areas of Karachi with on-site visits." },
  { icon: "⏱️", label: "On-Time Delivery", desc: "We commit to timelines and stick to them — every project." },
  { icon: "🎨", label: "100% Custom", desc: "Nothing off the shelf — every piece is built to your exact specifications." },
  { icon: "💰", label: "Fair Transparent Pricing", desc: "Detailed quotes with no hidden charges. What we quote is what you pay." },
];

export default function ProcessPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const revealElements = document.querySelectorAll(".rv");
    revealElements.forEach((el) => observer.observe(el));
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="py-32 px-6 md:px-14 bg-gradient-to-br from-brand-bg-dark to-brand-bg relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center lg:text-left mb-16">
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center justify-center lg:justify-start gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Our Process
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-espresso mb-6 rv d1">
              Bespoke Creation<br />
              <span className="italic text-brand-copper font-normal">Workflow</span>
            </h1>
            <p className="text-[1.08rem] leading-relaxed text-brand-txt-muted font-light max-w-2xl rv d2">
              Every project follows a meticulous path — from your initial vision to flawless delivery. Here&apos;s exactly how we turn your idea into a masterpiece.
            </p>
          </div>

          {/* Steps — vertical timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-[2.2rem] top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-brand-copper via-brand-copper/30 to-transparent" />

            <div className="flex flex-col gap-10">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="rv flex flex-col lg:flex-row gap-6 lg:gap-10 items-start"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* Number badge */}
                  <div className="flex-shrink-0 w-[4.4rem] h-[4.4rem] rounded-full bg-brand-espresso border-2 border-brand-copper flex items-center justify-center relative z-10 shadow-lg shadow-brand-walnut/20">
                    <span className="font-bebas text-xl text-brand-copper-lt tracking-wider">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-8 border border-brand-copper/20 bg-white/40 hover:border-brand-copper hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-copper/10 transition-all duration-400">
                    <h2 className="font-playfair text-xl md:text-2xl font-bold text-brand-espresso mb-3">
                      {step.label}
                    </h2>
                    <p className="text-[0.95rem] leading-relaxed text-brand-txt-muted font-light mb-4">
                      {step.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[0.72rem] tracking-[2.5px] uppercase text-brand-copper font-semibold">
                      <span className="w-3 h-[1px] bg-brand-copper inline-block" />
                      {step.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 md:px-14 bg-brand-espresso relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper-lt flex items-center justify-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper-lt inline-block" />
              Why Choose Us
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-white rv d1">
              The Ahmed Wood Art <span className="italic text-brand-copper-lt font-normal">Difference</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={i}
                className="p-8 border border-brand-copper/15 bg-white/5 hover:border-brand-copper/40 hover:-translate-y-1 transition-all duration-400 text-center rv"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-bebas tracking-[2px] text-brand-copper-lt text-base mb-2">{item.label}</h3>
                <p className="text-[0.83rem] text-brand-white/45 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Checklist */}
      <section className="py-24 px-6 md:px-14 bg-gradient-to-br from-brand-bg to-brand-bg-dark relative z-10 border-t border-brand-copper/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center justify-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Preparation
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-espresso rv d1">
              Your Pre-Consultation <span className="italic text-brand-copper font-normal">Checklist</span>
            </h2>
            <p className="text-sm text-brand-txt-muted max-w-md mx-auto mt-4 font-light rv d2">
              To make our initial design measurement session as productive as possible, we recommend gathering a few details beforehand.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: "✓",
                title: "1. Take Approximate Dimensions",
                desc: "Measure the general height, width, and depth of the walls where the kitchen cabinet, wardrobe, or paneling will be fitted. Don't worry about being precise — we will verify the exact millimetres during our visit."
              },
              {
                num: "✓",
                title: "2. Collect Visual Inspiration",
                desc: "Browse our online gallery or save pictures from Pinterest, Instagram, or catalogs that showcase the style, colors, and layout configurations you want."
              },
              {
                num: "✓",
                title: "3. Identify Core Layout Needs",
                desc: "Think about specific storage problems. Do you need extra drawer partitions for jewelry? High hanging rails for long dresses? Pull-out trays for spices? List them down."
              },
              {
                num: "✓",
                title: "4. Consider Your Finish Preferences",
                desc: "Determine if you prefer high-gloss modern finishes, soft-touch matte surfaces, or natural textured wood grains. We will bring actual physical samples to match your wall paint."
              }
            ].map((chk, idx) => (
              <div key={idx} className="p-8 border border-brand-copper/15 bg-white/40 hover:bg-white/60 transition-colors duration-300 rv" style={{ transitionDelay: `${idx * 0.08}s` }}>
                <span className="w-8 h-8 rounded-full bg-brand-copper/10 text-brand-copper flex items-center justify-center text-sm font-bold mb-4">{chk.num}</span>
                <h3 className="font-playfair text-lg font-bold text-brand-espresso mb-2">{chk.title}</h3>
                <p className="text-xs leading-relaxed text-brand-txt-muted font-light">{chk.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 rv d2">
            <Link
              href="/portfolio"
              className="text-brand-copper hover:text-brand-walnut font-bebas tracking-[2px] text-[0.85rem] uppercase font-bold border-b border-brand-copper/30 hover:border-brand-walnut transition-colors duration-300 no-underline"
            >
              Browse Our Portfolio For Visual Ideas
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 px-6 md:px-14 bg-brand-espresso text-brand-white relative z-10 border-t border-brand-copper/15">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper-lt flex items-center justify-center gap-4 mb-4 rv">
            <span className="w-8 h-[1.5px] bg-brand-copper-lt inline-block" />
            Location Support
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white rv d1">
            Serving All Major Areas in <span className="italic text-brand-copper-lt font-normal">Karachi</span>
          </h2>
          <p className="text-sm text-brand-bg/60 max-w-md mx-auto mt-4 mb-14 font-light rv d2">
            We provide on-site measurement consultations and final professional installations across all residential and commercial zones in Karachi.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "DHA (Phases 1-8)",
              "Clifton",
              "PECHS / Tariq Road",
              "Gulshan-e-Iqbal",
              "Bahria Town / Malik",
              "Federal B. Area",
              "KDA Scheme 1 & 33",
              "North Nazimabad"
            ].map((loc, idx) => (
              <div key={idx} className="p-5 border border-brand-white/10 bg-white/5 hover:border-brand-copper-lt transition-colors duration-300 rv" style={{ transitionDelay: `${idx * 0.05}s` }}>
                <span className="font-bebas text-sm text-brand-copper-lt tracking-wider">{loc}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-bg/50 mt-10 rv d2">
            Outside these areas? Contact us directly to confirm support for your neighborhood.
          </p>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 px-6 md:px-14 bg-brand-bg text-center border-t border-brand-copper/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-espresso mb-4 rv">
            Ready to Start?
          </h2>
          <p className="text-brand-txt-muted mb-8 rv d1 font-light">
            Reach out and let&apos;s discuss your next project. A free consultation is just one call away.
          </p>
          <div className="rv d2">
            <Link
              href="/contact"
              className="px-9 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg hover:shadow-brand-walnut/30 transition-all duration-300 no-underline inline-block"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
