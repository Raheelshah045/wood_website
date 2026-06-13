"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import imgKitchenMarble from "../../../public/images/kitchen-marble.png";
import imgWardrobeRustic from "../../../public/images/wardrobe-rustic.png";
import imgDressingTable from "../../../public/images/dressing-table.png";
import imgPremiumBed from "../../../public/images/premium-bed.png";
import imgWardrobeLog from "../../../public/images/wardrobe-log.png";
import imgWardrobeFloral from "../../../public/images/wardrobe-floral.png";
import imgWardrobeDiamond from "../../../public/images/wardrobe-diamond.jpg";
import imgCabinetMaroon from "../../../public/images/cabinet-maroon.jpg";
import imgWardrobeFloralDetail from "../../../public/images/wardrobe-floral-detail.jpg";
import imgKitchenBlackGold from "../../../public/images/kitchen-black-gold.jpg";
import imgBedDoubleGold from "../../../public/images/bed-double-gold.jpg";
import imgBedLuxuryBeige from "../../../public/images/bed-luxury-beige.jpg";
import imgCabinetChevron from "../../../public/images/cabinet-chevron.jpg";
import imgPetHouse from "../../../public/images/pet-house.png";


const projects = [
  {
    id: "project_01",
    title: "Marble Finish Kitchen",
    img: imgKitchenMarble,
    category: "residential",
    desc: "Custom modular kitchen cabinetry with premium marble finish laminates designed for modern luxury homes.",
    delay: "",
  },
  {
    id: "project_02",
    title: "Bespoke Walnut Boardroom Table",
    img: imgWardrobeRustic,
    category: "commercial",
    desc: "Custom solid wood conference table with integrated connectivity for modern corporate office spaces.",
    delay: "d1",
  },
  {
    id: "project_03",
    title: "Dressing Table Unit",
    img: imgDressingTable,
    category: "residential",
    desc: "Premium wood vanity dressing table featuring a custom illuminated mirror and smart drawer dividers.",
    delay: "d2",
  },
  {
    id: "project_04",
    title: "Premium Office Credenza",
    img: imgPremiumBed,
    category: "commercial",
    desc: "Luxury office sideboard crafted with grain-matched walnut veneer and custom brass hardware.",
    delay: "d1",
  },
  {
    id: "project_05",
    title: "Log Texture Paneling",
    img: imgWardrobeLog,
    category: "commercial",
    desc: "Bespoke accent wall paneling with realistic log-grain texture for upscale retail and lobbies.",
    delay: "d2",
  },
  {
    id: "project_06",
    title: "Floral Glass Wardrobe",
    img: imgWardrobeFloral,
    category: "residential",
    desc: "Floor-to-ceiling bedroom wardrobe with custom floral glass panels and integrated LED lighting.",
    delay: "d3",
  },
  {
    id: "project_07",
    title: "Diamond Mirror Wardrobe",
    img: imgWardrobeDiamond,
    category: "residential",
    desc: "Elegant custom wardrobe featuring diamond-patterned mirrored doors and velvet-lined drawer systems.",
    delay: "",
  },
  {
    id: "project_08",
    title: "Maroon Floral Cabinet",
    img: imgCabinetMaroon,
    category: "art_commissions",
    desc: "Bespoke hand-carved storage cabinet with deep maroon floral laminate inlays and vintage brass legs.",
    delay: "d1",
  },
  {
    id: "project_09",
    title: "Floral Wood Art Detail",
    img: imgWardrobeFloralDetail,
    category: "art_commissions",
    desc: "Detailed close-up showing custom hand-carved floral woodwork and gold leaf accents.",
    delay: "d2",
  },
  {
    id: "project_10",
    title: "Black & Gold Marble Kitchen",
    img: imgKitchenBlackGold,
    category: "residential",
    desc: "Premium modular kitchen cabinetry with custom black marble front panels, golden vein highlights, and soft-close mechanisms.",
    delay: "",
  },
  {
    id: "project_11",
    title: "Royal Diamond Tufted Bed",
    img: imgBedDoubleGold,
    category: "residential",
    desc: "Bespoke double bed featuring white leatherette diamond tufting, polished dark wood frame, and detailed gold-leaf trim borders.",
    delay: "d1",
  },
  {
    id: "project_12",
    title: "Luxury Upholstered Bed Unit",
    img: imgBedLuxuryBeige,
    category: "residential",
    desc: "Custom high-back upholstered bed in premium beige fabric, complete with matching side tables and integrated reading lamps.",
    delay: "d2",
  },
  {
    id: "project_13",
    title: "Chevron Corner Cabinet",
    img: imgCabinetChevron,
    category: "residential",
    desc: "Bespoke corner showcase cabinet featuring a handcrafted chevron-patterned wood veneer facade and integrated display section.",
    delay: "",
  },
  {
    id: "project_14",
    title: "Custom Two-Tier Pet House",
    img: imgPetHouse,
    category: "art_commissions",
    desc: "Bespoke two-level wooden pet residence featuring a peaked roof, solid wood structural frame, and wire mesh panels.",
    delay: "d1",
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Intersection Observer for scroll-reveal animations
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
    <section className="py-28 px-6 md:px-14 bg-brand-espresso relative z-10 flex-grow min-h-[calc(100vh-200px)]">
      <div className="max-w-6xl mx-auto mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper-lt flex items-center gap-4 mb-4 rv">
            <span className="w-8 h-[1.5px] bg-brand-copper-lt inline-block" />
            Portfolio
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-white rv d1">
            Our Finest<br />
            <span className="italic text-brand-copper-lt font-normal">Creations</span>
          </h2>
          <p className="text-base text-brand-bg/75 max-w-lg mt-4 font-light rv d2">
            Bespoke carpentry installations for luxury homes, modern offices, and unique spaces.
          </p>
        </div>
        {/* Categories Tab Filter Row */}
        <div className="flex flex-wrap gap-3 rv d2">
          {[
            { id: "all", name: "All" },
            { id: "residential", name: "Residential" },
            { id: "commercial", name: "Commercial" },
            { id: "art_commissions", name: "Art Pieces" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 text-xs uppercase tracking-[2px] font-bebas transition-all duration-300 border ${
                selectedCategory === cat.id
                  ? "bg-brand-copper text-brand-white border-brand-copper"
                  : "bg-transparent text-brand-white/70 border-brand-white/10 hover:text-brand-white hover:border-brand-white/30"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
          .map((item, index) => (
            <div
              key={item.id}
              className={`gi relative overflow-hidden group aspect-square bg-brand-deepbrown rv ${item.delay}`}
            >
              <Image
                src={item.img}
                alt={item.desc}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-750 ease-out"
                placeholder="blur"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                <span className="font-playfair text-lg text-brand-bg font-semibold">{item.title}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/7 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 pointer-events-none" />
            </div>
          ))}
      </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 px-6 md:px-14 bg-gradient-to-br from-brand-bg-dark to-brand-bg relative z-10 border-t border-brand-copper/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center justify-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Project Profiles
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-brand-espresso rv d1">
              Case Studies &amp; <span className="italic text-brand-copper font-normal">Details</span>
            </h2>
          </div>
          <div className="space-y-16">
            {[
              {
                title: "DHA Phase 6 Marble-Finish Kitchen",
                challenge: "The client wanted a clean, modern kitchen layout that looked like heavy solid marble but was lightweight, highly functional, and completely water-resistant to survive heavy daily cooking steam.",
                solution: "We designed modular cabinet frames using moisture-resistant Grade-A boards. The fronts were pressed with imported high-gloss marble laminates, and edges were seamlessly bound with heavy-duty sealers. German soft-close drawers and pull-out pantry shelves were installed for maximized storage.",
                materials: "Water-resistant MDF, Glossy Marble-pattern Laminate, Blum Soft-close Hinges."
              },
              {
                title: "Clifton Executive Corporate Boardroom",
                challenge: "A corporate client required an imposing 14-foot boardroom table that could comfortably fit 12 executives, with completely hidden electrical wiring and high durability.",
                solution: "We engineered a robust structural frame with solid wood legs. The table top was crafted using matching walnut veneer sheets laid out in an elegant chevron design. We integrated matching copper wiring boxes into the center of the table that open with gas-spring mechanisms.",
                materials: "Solid Walnut base, matched Walnut Veneer, copper cabling enclosures."
              },
              {
                title: "Gulshan-e-Iqbal Sliding Glass Wardrobe",
                challenge: "An irregular bedroom wall with a structural column made pre-built wardrobes impossible. The client wanted maximum hanging space with a modern aesthetic.",
                solution: "We designed a fitted, floor-to-ceiling sliding wardrobe that curves around the wall column. We installed custom floral-etched glass doors with a sliding aluminum tracks system. The interior has integrated drawer dividers and automatic LED lighting that turns on when doors glide open.",
                materials: "High-density particle board base, Floral Glass doors, LED lighting kits, aluminum tracks."
              }
            ].map((cs, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-brand-copper/10 pb-12 last:border-b-0 last:pb-0 rv" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="lg:col-span-4">
                  <h3 className="font-playfair text-xl font-bold text-brand-espresso mb-2">{cs.title}</h3>
                  <div className="text-xs font-bebas tracking-[2px] text-brand-copper uppercase font-semibold">Project Walkthrough</div>
                </div>
                <div className="lg:col-span-8 space-y-4">
                  <p className="text-sm leading-relaxed text-brand-txt-muted font-light">
                    <strong className="font-medium text-brand-espresso block mb-1">Design Challenge:</strong>
                    {cs.challenge}
                  </p>
                  <p className="text-sm leading-relaxed text-brand-txt-muted font-light">
                    <strong className="font-medium text-brand-espresso block mb-1">Our Solution:</strong>
                    {cs.solution}
                  </p>
                  <div className="pt-2">
                    <span className="text-[0.7rem] tracking-[1.5px] uppercase font-bold text-brand-copper block">Materials Specified:</span>
                    <span className="text-xs text-brand-txt-muted font-light">{cs.materials}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finishes Catalogue */}
      <section className="py-24 px-6 md:px-14 bg-brand-espresso text-brand-white relative z-10 border-t border-brand-copper/15">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper-lt flex items-center justify-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper-lt inline-block" />
              Customization
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white rv d1">
              Select Your Premium <span className="italic text-brand-copper-lt font-normal">Finishes</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { type: "Super Matte Finishes", desc: "Anti-fingerprint, velvety textures that give wardrobes and cabinets a clean, premium, architectural appearance." },
              { type: "High Gloss Acrylics", desc: "Reflective, mirror-like finishes ideal for modern kitchens, giving an expansive, bright feeling to small rooms." },
              { type: "Textured Wood-Grain", desc: "Highly tactile laminates that mimic raw oak, deep walnut, and rustic pine without the vulnerability of unsealed wood." },
              { type: "Metallic & Marble", desc: "Luxury pattern designs that look like marble, quartz, or brushed metal to add stunning accent features." }
            ].map((f, idx) => (
              <div key={idx} className="p-8 border border-brand-copper/15 bg-white/5 hover:border-brand-copper/40 transition-colors duration-300 rv" style={{ transitionDelay: `${idx * 0.08}s` }}>
                <h3 className="font-bebas text-base text-brand-copper-lt tracking-wider mb-2">{f.type}</h3>
                <p className="text-xs leading-relaxed text-brand-bg/50 font-light">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 rv d2">
            <p className="text-sm text-brand-bg/60 mb-4">Want to see how we build these?</p>
            <div className="flex justify-center gap-4">
              <Link
                href="/process"
                className="px-8 py-3.5 border border-brand-white/20 text-brand-white font-bebas tracking-[3px] text-[0.88rem] hover:bg-white hover:text-brand-espresso transition-all duration-300 no-underline inline-block"
              >
                Our Workflow Process
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.88rem] hover:bg-brand-walnut hover:-translate-y-[3px] transition-all duration-300 no-underline inline-block"
              >
                Request Sample Viewing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
