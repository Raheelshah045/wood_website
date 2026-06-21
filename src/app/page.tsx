"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Static imports for asset optimization and layout shift prevention
import logoImg from "../../public/logo.webp";
import imgKitchenMarble from "../../public/images/kitchen-marble.webp";
import imgWardrobeRustic from "../../public/images/wardrobe-rustic.webp";
import imgDressingTable from "../../public/images/dressing-table.webp";
import imgKitchenBlackGold from "../../public/images/kitchen-black-gold.webp";
import imgBedDoubleGold from "../../public/images/bed-double-gold.webp";
import imgBedLuxuryBeige from "../../public/images/bed-luxury-beige.webp";
import imgWardrobeFloral from "../../public/images/wardrobe-floral.webp";
import imgWardrobeDiamond from "../../public/images/wardrobe-diamond.webp";
import imgArchedSlidingDoor from "../../public/images/arched-sliding-door.webp";
import imgCabinetChevron from "../../public/images/cabinet-chevron.webp";
import imgAestheticDoor from "../../public/images/Aesthatic-Door.webp";
import imgNewKitchenCabinets from "../../public/images/New-kitchen-cabinets.webp";
import imgSmallWardrobe from "../../public/images/small-wardrobe.webp";

const heroSlides = [
  {
    id: "slide_01",
    imgSrc: imgAestheticDoor,
    alt: "Aesthetic White Arched Double Door entrance custom installation by Ahmed Wood Art",
  },
  {
    id: "slide_02",
    imgSrc: imgNewKitchenCabinets,
    alt: "Premium Modular Marble-Finish Kitchen cabinets custom installation by Ahmed Wood Art",
  },
  {
    id: "slide_03",
    imgSrc: imgBedLuxuryBeige,
    alt: "Luxury Tufted Bedroom Bed Unit by Ahmed Wood Art",
  },
  {
    id: "slide_04",
    imgSrc: imgWardrobeDiamond,
    alt: "Diamond Mirror Wardrobe with elegant finishes by Ahmed Wood Art",
  },
  {
    id: "slide_05",
    imgSrc: imgKitchenBlackGold,
    alt: "Premium Black and Gold Modular Kitchen by Ahmed Wood Art",
  },
  {
    id: "slide_06",
    imgSrc: imgWardrobeRustic,
    alt: "Bespoke Walnut Boardroom Table and Workspace woodwork by Ahmed Wood Art",
  }
];

const featuredProjects = [
  {
    id: "project_16",
    title: "Royal Arched Double Door",
    img: imgAestheticDoor,
    category: "Residential",
    desc: "Bespoke solid wood white arched double doors featuring delicate shadows cast by custom overhead floral vine placements.",
  },
  {
    id: "project_17",
    title: "Marble Textured Kitchen Cabinets",
    img: imgNewKitchenCabinets,
    category: "Residential",
    desc: "Luxury custom kitchen cabinetry featuring seamless marble texture laminate fronts and integrated premium cooktop alignment.",
  },
  {
    id: "project_18",
    title: "Golden Mesh Glass Cabinet",
    img: imgSmallWardrobe,
    category: "Residential",
    desc: "Handcrafted burled walnut storage showcase featuring custom golden geometric pattern mesh inserts and premium metal handle accents.",
  },
  {
    id: "project_15",
    title: "Arched Sliding Door Partition",
    img: imgArchedSlidingDoor,
    category: "Residential",
    desc: "Bespoke solid wood arched entrance partition featuring integrated sliding glass doors.",
  },
  {
    id: "project_01",
    title: "Marble Finish Kitchen",
    img: imgKitchenMarble,
    category: "Residential",
    desc: "Custom modular kitchen cabinetry with premium marble finish laminates.",
  },
  {
    id: "project_13",
    title: "Chevron Corner Cabinet",
    img: imgCabinetChevron,
    category: "Residential",
    desc: "Bespoke corner showcase cabinet featuring a handcrafted chevron-patterned wood veneer facade.",
  },
  {
    id: "project_10",
    title: "Black & Gold Marble Kitchen",
    img: imgKitchenBlackGold,
    category: "Residential",
    desc: "Premium modular kitchen cabinetry with custom black marble front panels, golden vein highlights.",
  },
  {
    id: "project_11",
    title: "Royal Diamond Tufted Bed",
    img: imgBedDoubleGold,
    category: "Residential",
    desc: "Bespoke double bed featuring white leatherette diamond tufting, polished dark wood frame.",
  },
];



export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => {
        setPrevSlide(prev);
        return (prev + 1) % heroSlides.length;
      });
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-7px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "";
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* NEW PREMIUM CINEMATIC HERO SECTION WITH SLIDESHOW & OVERLAYS */}
      {/* ========================================================================= */}
      <section
        id="home"
        className="hero min-h-screen flex items-center justify-center relative overflow-hidden bg-brand-deepbrown py-28 px-4"
      >
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeSlide;
            const isPrev = index === prevSlide;

            if (!isActive && !isPrev) return null;

            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* Ken Burns zooming wrapper when active */}
                <Image
                  src={slide.imgSrc}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={`object-cover object-center kb-slide ${
                    isActive ? "kb-active" : ""
                  }`}
                  placeholder="blur"
                />
              </div>
            );
          })}
        </div>

        {/* Tactile Wood Grain Overlay Pattern on top of backgrounds */}
        <div className="absolute inset-0 wood-grain pointer-events-none z-20 opacity-30 mix-blend-overlay" />

        {/* Subtle Dark Overlay Gradient for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-brand-espresso/90 pointer-events-none z-20" />
        
        {/* Glow pulse overlay */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-radial from-brand-copper/15 to-transparent top-1/2 left-1/2 glow-pulse pointer-events-none z-20" />

        {/* Content Container */}
        <div className="relative z-30 text-center max-w-4xl mx-auto">
          <Image
            src={logoImg}
            alt="Ahmed Wood Art"
            width={110}
            height={110}
            className="rounded-full object-cover border-3 border-brand-copper shadow-lg shadow-brand-copper/25 mx-auto mb-7 animate-pop-in"
            placeholder="blur"
            priority
          />
          <div className="inline-block font-bebas tracking-[7px] text-[0.72rem] text-brand-copper-lt border border-brand-copper/35 px-6 py-1.5 mb-7 animate-fade-up">
            Premium Furniture &amp; Woodwork — Karachi
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-black leading-none text-brand-white mb-4 animate-fade-up">
            Ahmed<br />
            <span className="italic font-normal text-brand-copper-lt block mt-2">Wood Art</span>
          </h1>
          <p className="font-playfair italic text-xl md:text-2xl text-[#ebdcd0] tracking-wide mb-3 animate-fade-up">
            &ldquo;Rooted in Quality. Built for Life.&rdquo;
          </p>
          <p className="text-base md:text-lg font-light tracking-wide text-[#dfd5c6] max-w-lg mx-auto mb-10 animate-fade-up">
            Designing architectural statements and functional wood art tailored for premium environments.
          </p>
          <div className="flex flex-wrap gap-5 justify-center items-center animate-fade-up">
            <Link
              href="/portfolio"
              className="px-9 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg hover:shadow-brand-walnut/30 transition-all duration-300 no-underline"
            >
              View Portfolio
            </Link>
            <a
              href="https://wa.me/923172568882"
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-3.5 border-1.5 border-brand-copper/70 text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-copper hover:text-brand-white hover:-translate-y-[3px] transition-all duration-300 no-underline bg-black/10 backdrop-blur-sm"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        
        {/* Scroll Indicator */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 text-brand-white/80 text-[0.62rem] tracking-[4px] uppercase flex flex-col items-center gap-2 select-none animate-fade-up z-30">
          <span>Scroll</span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" className="animate-arrow-bounce">
            <path d="M7 0v18M1 12l6 8 6-8" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ORIGINAL LIGHT HERO SECTION (COMMENTED OUT FOR REVERSIBILITY) */}
      {/* ========================================================================= */}
      {/*
      <section
        id="home"
        className="hero min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#d9cab0] via-[#e8dcc8] to-[#cfc0a4] wood-grain py-28 px-4"
      >
        <div className="absolute w-[600px] h-[600px] rounded-full bg-radial from-brand-copper/12 to-transparent top-1/2 left-1/2 glow-pulse pointer-events-none" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <Image
            src={logoImg}
            alt="Ahmed Wood Art"
            width={110}
            height={110}
            className="rounded-full object-cover border-3 border-brand-copper shadow-lg shadow-brand-copper/25 mx-auto mb-7 animate-pop-in"
            placeholder="blur"
          />
          <div className="inline-block font-bebas tracking-[7px] text-[0.72rem] text-brand-copper border border-brand-copper/35 px-6 py-1.5 mb-7 animate-fade-up">
            Premium Furniture &amp; Woodwork — Karachi
          </div>
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-black leading-none text-brand-espresso mb-4 animate-fade-up">
            Ahmed<br />
            <span className="italic font-normal text-brand-copper block mt-2">Wood Art</span>
          </h1>
          <p className="font-playfair italic text-xl md:text-2xl text-brand-walnut tracking-wide mb-3 animate-fade-up">
            &ldquo;Rooted in Quality. Built for Life.&rdquo;
          </p>
          <p className="text-base md:text-lg font-light tracking-wide text-brand-txt-muted max-w-lg mx-auto mb-10 animate-fade-up">
            Designing architectural statements and functional wood art tailored for premium environments.
          </p>
          <div className="flex flex-wrap gap-5 justify-center items-center animate-fade-up">
            <Link
              href="/portfolio"
              className="px-9 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg hover:shadow-brand-walnut/30 transition-all duration-300 no-underline"
            >
              View Portfolio
            </Link>
            <a
              href="https://wa.me/923172568882"
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-3.5 border-1.5 border-brand-copper text-brand-espresso font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-copper hover:text-brand-white hover:-translate-y-[3px] transition-all duration-300 no-underline"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 text-brand-copper text-[0.62rem] tracking-[4px] uppercase flex flex-col items-center gap-2 select-none animate-fade-up">
          <span>Scroll</span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none" className="animate-arrow-bounce">
            <path d="M7 0v18M1 12l6 8 6-8" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      </section>
      */}

      {/* Infinite Marquee Specialties */}
      <div className="overflow-hidden bg-brand-espresso py-3.5 border-y border-brand-copper/10 select-none">
        <div className="marquee-track">
          {[...Array(2)].map((_, groupIndex) => (
            <span key={groupIndex} className="flex gap-14 items-center">
              <span className="font-bebas text-[0.8rem] tracking-[4px] text-brand-bg/55 uppercase">Kitchen Cabinets</span>
              <span className="text-brand-copper-lt">✦</span>
              <span className="font-bebas text-[0.8rem] tracking-[4px] text-brand-bg/55 uppercase">Wardrobes</span>
              <span className="text-brand-copper-lt">✦</span>
              <span className="font-bebas text-[0.8rem] tracking-[4px] text-brand-bg/55 uppercase">Dressing Tables</span>
              <span className="text-brand-copper-lt">✦</span>
              <span className="font-bebas text-[0.8rem] tracking-[4px] text-brand-bg/55 uppercase">Custom Furniture</span>
              <span className="text-brand-copper-lt">✦</span>
              <span className="font-bebas text-[0.8rem] tracking-[4px] text-brand-bg/55 uppercase">Interior Paneling</span>
              <span className="text-brand-copper-lt">✦</span>
              <span className="font-bebas text-[0.8rem] tracking-[4px] text-brand-bg/55 uppercase">Laminate Finishes</span>
              <span className="text-brand-copper-lt">✦</span>
              <span className="font-bebas text-[0.8rem] tracking-[4px] text-brand-bg/55 uppercase">Rooted in Quality</span>
              <span className="text-brand-copper-lt">✦</span>
              <span className="font-bebas text-[0.8rem] tracking-[4px] text-brand-bg/55 uppercase">Built for Life</span>
              <span className="text-brand-copper-lt">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="py-24 px-6 md:px-14 bg-gradient-to-br from-brand-bg-dark to-brand-bg relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Our Story
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight text-brand-espresso mb-6 rv d1">
              Crafted with<br />
              <span className="italic text-brand-copper font-normal">Passion &amp; Precision</span>
            </h2>
            <p className="text-[1.08rem] leading-relaxed text-brand-txt-muted font-light mb-4 rv d2">
              Ahmed Wood Art is a premium furniture and interior woodwork brand dedicated to transforming homes with handcrafted quality. From elegantly laminated custom kitchen cabinets and design-driven wardrobes to bespoke dressing tables and exquisite partition panels — every single project is meticulously designed, engineered, and assembled using top-tier grade boards and European hardware to last for generations to come.
            </p>
            <p className="font-playfair italic text-brand-copper text-sm mb-10 rv d2">
              &ldquo;Rooted in Quality. Built for Life.&rdquo;
            </p>
            <div className="grid grid-cols-2 gap-5 mt-10 rv d3">
              {[
                { number: "500+", label: "Projects Completed" },
                { number: "20+", label: "Years Experience" },
                { number: "100%", label: "Client Satisfaction" },
                { number: "∞", label: "Design Possibilities" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-brand-copper/25 bg-white/35 hover:border-brand-copper hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-copper/12 transition-all duration-350"
                >
                  <div className="font-bebas text-5xl text-brand-copper leading-none">{stat.number}</div>
                  <div className="text-[0.72rem] tracking-[2px] uppercase text-brand-txt-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rotating Logo on the right */}
          <div className="flex justify-center items-center logo-wrap rv d2">
            <div className="relative logo-spin w-[300px] h-[300px] md:w-[350px] md:h-[350px]">
              {/* Outer pulsing rings */}
              <div className="absolute inset-[-16px] rounded-full border border-brand-copper/30 ring-pulse-1 pointer-events-none" />
              <div className="absolute inset-[-32px] rounded-full border border-brand-copper/14 ring-pulse-2 pointer-events-none" />

              {/* Logo Frame */}
              <div className="w-full h-full rounded-full bg-brand-bg border-2.5 border-brand-copper flex items-center justify-center shadow-2xl shadow-brand-walnut/25 relative overflow-hidden">
                <Image
                  src={logoImg}
                  alt="Ahmed Wood Art Logo"
                  width={310}
                  height={310}
                  className="object-cover rounded-full w-[90%] h-[90%]"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Highlights */}
      <section className="py-24 px-6 md:px-14 bg-brand-espresso relative z-10">
        <div className="max-w-6xl mx-auto mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper-lt flex items-center justify-center md:justify-start gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper-lt inline-block" />
              Highlights
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight text-brand-white rv d1">
              Featured<br />
              <span className="italic text-brand-copper-lt font-normal">Creations</span>
            </h2>
          </div>
          <div className="rv d2">
            <Link
              href="/portfolio"
              className="px-6 py-2.5 text-xs uppercase tracking-[2px] font-bebas transition-all duration-300 border bg-transparent text-brand-white/70 border-brand-white/10 hover:text-brand-white hover:border-brand-white/30 no-underline"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden group aspect-square bg-brand-deepbrown rv"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-750 ease-out"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                <span className="font-bebas text-xs text-brand-copper-lt uppercase tracking-wider mb-1">{item.category}</span>
                <span className="font-playfair text-lg text-brand-bg font-semibold">{item.title}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Services Specialties */}
      <section className="py-24 px-6 md:px-14 bg-brand-bg-dark relative z-10">
        <div className="max-w-6xl mx-auto text-center lg:text-left mb-12">
          <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center justify-center lg:justify-start gap-4 mb-4 rv">
            <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
            Specialties
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight text-brand-espresso mb-6 rv d1">
            Bespoke Woodwork<br />
            <span className="italic text-brand-copper font-normal">Solutions</span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: "🪵",
              title: "Kitchen Cabinets",
              desc: "Custom modular kitchen cabinetry featuring premium laminate finishes — including marble textures, wood grain veneer, and bespoke gloss layouts.",
            },
            {
              icon: "🚪",
              title: "Wardrobes & Almaris",
              desc: "Floor-to-ceiling fitted wardrobes styled with decorative glass panels, diamond-pattern mirrors, custom velvet drawer inserts, and smart organization.",
            },
            {
              icon: "🪞",
              title: "Dressing Tables",
              desc: "Elegant luxury dressing tables and floating vanities featuring custom backlit mirrors, marble tops, and velvet-lined jewelry drawers.",
            },
            {
              icon: "🏠",
              title: "Interior Paneling",
              desc: "Bespoke fluted wall paneling, decorative floral frames, and geometric partition screens to partition or elevate your living spaces.",
            },
            {
              icon: "📐",
              title: "Commercial Fittings",
              desc: "Solid walnut conference tables, executive office credenzas, reception desks, and partition paneling designed for corporate prestige.",
            },
            {
              icon: "🎨",
              title: "Custom Commissions",
              desc: "Unique, hand-carved wood art pieces and custom furniture items tailored strictly to your design sketches and room dimensions.",
            },
          ].map((srv, index) => (
            <div
              key={index}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="p-8 border border-brand-copper/20 bg-white/40 relative overflow-hidden transition-all duration-400 group hover:border-brand-copper hover:shadow-lg hover:shadow-brand-walnut/10 rv"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-3xl mb-4 block">{srv.icon}</span>
              <h3 className="font-playfair text-xl font-bold text-brand-espresso mb-2">{srv.title}</h3>
              <p className="text-[0.88rem] leading-relaxed text-brand-txt-muted font-light">{srv.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center rv d3">
          <Link
            href="/process"
            className="px-8 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg hover:shadow-brand-walnut/30 transition-all duration-300 no-underline inline-block"
          >
            Learn About Our Process
          </Link>
        </div>
      </section>

      {/* Material Standards & Quality */}
      <section className="py-24 px-6 md:px-14 bg-brand-bg relative z-10 border-t border-brand-copper/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rv">
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center gap-4 mb-4">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Material Excellence
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-bold leading-tight text-brand-espresso mb-6">
              Only the Finest Sheets,<br />
              <span className="italic text-brand-copper font-normal">Hardware &amp; Finishes</span>
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-brand-txt-muted font-light mb-6">
              At Ahmed Wood Art, we believe that longevity is the ultimate test of quality. We never cut corners. Our craftsmen exclusively utilize certified water-resistant wood sheets, premium grade core board, and thick imported laminates that resist scratches and moisture.
            </p>
            <p className="text-[1.05rem] leading-relaxed text-brand-txt-muted font-light mb-8">
              We pair these materials with high-end German hinges and soft-close drawer slides (from Blum, Hettich, and Samet) to ensure that every door swings smoothly and every drawer glides effortlessly for decades.
            </p>
            <Link
              href="/about"
              className="px-8 py-3.5 border border-brand-copper text-brand-espresso font-bebas tracking-[3px] text-[0.88rem] hover:bg-brand-copper hover:text-brand-white transition-all duration-300 no-underline inline-block"
            >
              Read About Our Material Standards
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 rv d2">
            {[
              { title: "Grade-A Core Board", desc: "Heavy density composite cores that prevent bending, warping, or sagging over time under load." },
              { title: "Imported German Hardware", desc: "Hydraulic soft-close hinges and under-mount drawer tracks rated for 100,000+ open-close cycles." },
              { title: "Thermo-Fused Laminates", desc: "High-pressure laminate sheets featuring ultra-realistic wood-grain, marble, and concrete textures." },
              { title: "Water-Resistant Sealers", desc: "Advanced edge-banding and polyurethane wood coatings that protect against Karachi's humid climate." }
            ].map((mat, i) => (
              <div key={i} className="p-6 border border-brand-copper/15 bg-white/20 hover:border-brand-copper/40 transition-colors duration-300">
                <h3 className="font-playfair text-lg font-bold text-brand-espresso mb-2">{mat.title}</h3>
                <p className="text-xs leading-relaxed text-brand-txt-muted font-light">{mat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-14 bg-brand-bg-dark relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center justify-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Client Voice
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-brand-espresso rv d1">
              Trusted by Karachi&apos;s Finest <br />
              <span className="italic text-brand-copper font-normal">Homes &amp; Offices</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Ahmed Wood Art completely transformed our kitchen in DHA Phase 6. The marble-finish cabinets look stunning, and the soft-close drawers are a dream to use. Excellent workmanship and strictly on time!",
                author: "Mrs. Nida Shah",
                location: "DHA Karachi"
              },
              {
                quote: "We commissioned a custom walnut boardroom table and custom panel wall for our corporate office in Clifton. The team was highly professional, using detailed CAD mockups to align with our branding. Strongly recommended.",
                author: "Kamran Qureshi",
                location: "Clifton, Karachi"
              },
              {
                quote: "The diamond-patterned mirror wardrobe they built for my bedroom is a masterpiece. Their attention to detail on the velvet drawer linings and integrated LED lighting shows true artistry.",
                author: "Ayesha Ahmed",
                location: "Gulshan-e-Iqbal, Karachi"
              }
            ].map((t, idx) => (
              <div key={idx} className="p-8 bg-white/50 border border-brand-copper/15 hover:border-brand-copper/35 transition-all duration-350 flex flex-col justify-between rv" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <p className="text-[0.92rem] leading-relaxed text-brand-txt-muted font-light italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-bebas text-brand-espresso text-base tracking-wider">{t.author}</div>
                  <div className="text-[0.65rem] uppercase tracking-widest text-brand-copper font-semibold">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 rv d3">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.88rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg transition-all duration-300 no-underline inline-block"
            >
              Start Your Own Story
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Contact Section */}
      <section className="py-24 px-6 md:px-14 bg-brand-bg relative z-10 border-t border-brand-copper/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-brand-espresso mb-4 rv">
            Start Your Next Custom Project
          </h2>
          <p className="text-base text-brand-txt-muted max-w-lg mx-auto mb-8 rv d1">
            Let us build something beautiful for your residence or commercial space. Share your requirements and get a free design consultation.
          </p>
          <div className="rv d2">
            <Link
              href="/contact"
              className="px-9 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg hover:shadow-brand-walnut/30 transition-all duration-300 no-underline"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
</>
  );
}
