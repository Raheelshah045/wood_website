"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logoImg from "../../../public/logo.png";

const stats = [
  { value: "20+", label: "Years of Craft" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Custom Built" },
  { value: "5★", label: "Client Satisfaction" },
];

const values = [
  {
    icon: "🪵",
    title: "Premium Materials Only",
    desc: "We use Grade-A wood boards, imported European laminates, and heavy-duty hardware — no compromises.",
  },
  {
    icon: "📐",
    title: "Precision Engineering",
    desc: "Every millimetre matters. We combine modern CAD layout technology with traditional artisan joinery techniques.",
  },
  {
    icon: "🤝",
    title: "Client-First Philosophy",
    desc: "From first consultation to final installation, your vision drives every decision we make.",
  },
  {
    icon: "🏆",
    title: "Built to Last Generations",
    desc: "Our furniture isn't just beautiful — it's engineered to endure decades of daily use without compromise.",
  },
];

export default function AboutPage() {
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
      {/* Hero Section */}
      <section className="py-32 px-6 md:px-14 bg-gradient-to-br from-brand-bg-dark to-brand-bg relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Our Story
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-espresso mb-6 rv d1">
              Crafted with<br />
              <span className="italic text-brand-copper font-normal">Passion &amp; Precision</span>
            </h1>
            <p className="text-[1.08rem] leading-relaxed text-brand-txt-muted font-light mb-4 rv d2">
              Ahmed Wood Art is a premium furniture and interior woodwork brand dedicated to transforming homes and commercial spaces with handcrafted quality. From elegantly laminated kitchen cabinets to stunning wardrobes and custom dressing units — every piece is built to last a lifetime.
            </p>
            <p className="text-[1.08rem] font-medium italic text-brand-copper mb-6 rv d2">
              &ldquo;Rooted in Quality. Built for Life.&rdquo;
            </p>
            <p className="text-[1.02rem] leading-relaxed text-brand-txt-muted font-light rv d3 mb-8">
              Our material values guide everything we select: only premium grade wood board, imported laminates, and long-lasting hinges and hardware. We combine traditional artisan techniques with modern CAD layouts to deliver architectural perfection — exclusively serving Karachi.
            </p>
            <div className="rv d3">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg hover:shadow-brand-walnut/30 transition-all duration-300 no-underline inline-block"
              >
                Start Your Project
              </Link>
            </div>
          </div>

          {/* Logo orb */}
          <div className="flex justify-center rv d2">
            <div className="logo-spin relative">
              <div className="w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full bg-brand-bg border-[2.5px] border-brand-copper flex items-center justify-center shadow-2xl shadow-brand-walnut/25 relative overflow-hidden">
                <div className="absolute -inset-4 rounded-full border border-brand-copper/30 ring-pulse-1 pointer-events-none" />
                <div className="absolute -inset-8 rounded-full border border-brand-copper/14 ring-pulse-2 pointer-events-none" />
                <Image
                  src={logoImg}
                  alt="Ahmed Wood Art Logo"
                  fill
                  className="object-cover rounded-full p-[5%]"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-brand-espresso py-14 px-6 md:px-14">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="rv" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="font-bebas text-4xl md:text-5xl text-brand-copper-lt leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[0.72rem] tracking-[3px] uppercase text-brand-white/40 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 md:px-14 bg-gradient-to-br from-brand-bg to-brand-bg-dark relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center justify-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Our Values
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-espresso rv d1">
              What Sets Us <span className="italic text-brand-copper font-normal">Apart</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((val, i) => (
              <div
                key={i}
                className="p-8 border border-brand-copper/18 bg-white/40 hover:border-brand-copper hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-copper/10 transition-all duration-400 group rv"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="text-3xl mb-4 block">{val.icon}</span>
                <h3 className="font-playfair text-xl font-bold text-brand-espresso mb-2">{val.title}</h3>
                <p className="text-[0.9rem] leading-relaxed text-brand-txt-muted font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Craftsmanship Walkthrough */}
      <section className="py-24 px-6 md:px-14 bg-brand-espresso text-brand-white relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rv">
              <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper-lt flex items-center gap-4 mb-4">
                <span className="w-8 h-[1.5px] bg-brand-copper-lt inline-block" />
                The Workshop
              </div>
              <h2 className="font-playfair text-3xl md:text-5xl font-bold leading-tight text-brand-white mb-6">
                Where Raw Lumber<br />
                <span className="italic text-brand-copper-lt font-normal">Becomes Masterpieces</span>
              </h2>
              <p className="text-[1.05rem] leading-relaxed text-brand-bg/75 font-light mb-6">
                Every customized panel and wardrobe door starts its journey in our dedicated Karachi workshop. Here, our artisans combine standard hand tools with industrial wood machinery to deliver flawless symmetry.
              </p>
              <p className="text-[1.05rem] leading-relaxed text-brand-bg/75 font-light mb-8">
                We handle everything in-house: from initial wood board selection and moisture-proofing to hydraulic laminate pressing, hand sanding, and pre-assembly testing. This guarantees that your cabinets fit together with millimetre precision when they arrive at your home.
              </p>
              <Link
                href="/process"
                className="px-8 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.88rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg transition-all duration-300 no-underline inline-block"
              >
                Explore Our Creation Process
              </Link>
            </div>
            <div className="space-y-8 rv d2">
              {[
                { step: "Phase 1: Board Curing & Selection", desc: "We select wood sheets based on core density and treat them against wood-borers and moisture before any cuts are made." },
                { step: "Phase 2: High-Pressure Laminate Pressing", desc: "Laminates are pressed under heavy mechanical compression to ensure zero bubbles, peeling, or corner lift for years." },
                { step: "Phase 3: Millimetre-Precision Edging", desc: "We use heavy-duty edge-banders to apply seamless protective seals around every board corner, keeping out dampness." },
                { step: "Phase 4: Pre-Assembly Dry Runs", desc: "Every drawer box and modular cabinet frame is fully dry-fitted in our workshop first to verify door alignment." }
              ].map((phase, i) => (
                <div key={i} className="border-l-2 border-brand-copper/40 pl-6 hover:border-brand-copper transition-colors duration-300">
                  <h3 className="font-bebas text-lg text-brand-copper-lt tracking-wider mb-2">{phase.step}</h3>
                  <p className="text-sm leading-relaxed text-brand-bg/55 font-light">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-14 bg-gradient-to-br from-brand-bg-dark to-brand-bg relative z-10 border-t border-brand-copper/15">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center justify-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Information
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-espresso rv d1">
              Frequently Asked <span className="italic text-brand-copper font-normal">Questions</span>
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "What types of wood sheets and boards do you use?",
                a: "We construct our modular cabinets and wardrobes using premium MDF, high-grade plywood, and solid wood boards depending on the project type. For kitchens, we prioritize water-resistant MDF and high-grade laminates to combat steam and humidity. Every board is source-verified for structural density."
              },
              {
                q: "Do you offer free on-site design consultations and measurements?",
                a: "Yes! We offer on-site visits across Karachi. Our designer visits your location to take precise measurements, inspect the wall structure, and show you physical samples of our laminates and wood finishes. Once measurements are taken, we provide a detailed 3D design and quotation."
              },
              {
                q: "How long does it take to build and install a custom kitchen or wardrobe?",
                a: "Typically, fabrication takes 3 to 5 weeks in our workshop depending on project scale. Since 90% of the cutting and assembly happens in our workshop, actual on-site installation at your home is completed in just 2 to 5 days, minimizing any disruption to your household."
              },
              {
                q: "What kind of hardware warranty do you provide?",
                a: "We only use premium international hardware brands like Blum, Hettich, and Samet for hinges, hydraulic lifters, and sliding rails. These carry manufacturer guarantees, and we stand by our installations, offering adjustments and maintenance support after installation."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-8 border border-brand-copper/15 bg-white/40 hover:bg-white/60 transition-colors duration-300 rv" style={{ transitionDelay: `${idx * 0.08}s` }}>
                <h3 className="font-playfair text-lg font-bold text-brand-espresso mb-3 flex items-start gap-3">
                  <span className="text-brand-copper">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-[0.92rem] leading-relaxed text-brand-txt-muted font-light pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 rv d2">
            <p className="text-[0.88rem] text-brand-txt-muted mb-4">Have another question not answered here?</p>
            <Link
              href="/contact"
              className="text-brand-copper hover:text-brand-walnut font-bebas tracking-[2px] text-[0.85rem] uppercase font-bold border-b border-brand-copper/30 hover:border-brand-walnut transition-colors duration-300 no-underline"
            >
              Ask Our Woodwork Experts Directly
            </Link>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 px-6 md:px-14 bg-brand-espresso text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-white mb-4 rv">
            Ready to Build Something<br />
            <span className="italic text-brand-copper-lt font-normal">Extraordinary?</span>
          </h2>
          <p className="text-brand-bg/60 mb-8 rv d1 font-light">
            Contact us today for a free design consultation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center rv d2">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg transition-all duration-300 no-underline"
            >
              Get In Touch
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3.5 border border-brand-white/25 text-brand-white/70 font-bebas tracking-[3px] text-[0.95rem] hover:border-brand-white hover:text-brand-white transition-all duration-300 no-underline"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
