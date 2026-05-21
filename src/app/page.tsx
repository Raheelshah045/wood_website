"use client";

import { useEffect, useRef, useState } from "react";

interface FormInputs {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Home() {
  // Cursor position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Nav styling state
  const [isNavSolid, setIsNavSolid] = useState(false);

  // Form submission state
  const [formInputs, setFormInputs] = useState<FormInputs>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // 3D tilt reference elements
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Custom Cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth ring follow effect
  useEffect(() => {
    let animationFrameId: number;
    
    const updateRing = () => {
      setRingPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.13,
          y: prev.y + dy * 0.13,
        };
      });
      animationFrameId = requestAnimationFrame(updateRing);
    };

    animationFrameId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Handle sticky nav solid background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsNavSolid(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  // 3D Tilt Effect on Service Cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    card.style.transform = `translateY(-7px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
  };

  const handleCardMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = "";
    }
  };

  // Cursor Hover state binders
  const handleMouseEnterLink = () => setIsHovered(true);
  const handleMouseLeaveLink = () => setIsHovered(false);

  // Form Submission
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Thank you! Your wood art inquiry has been submitted successfully.",
        });
        setFormInputs({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || "Failed to submit inquiry. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "A network error occurred. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Custom Pointer Cursor */}
      <div
        id="cur"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: isHovered ? "16px" : "10px",
          height: isHovered ? "16px" : "10px",
        }}
        className="hidden md:block"
      />
      <div
        id="curR"
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
          width: isHovered ? "50px" : "36px",
          height: isHovered ? "50px" : "36px",
        }}
        className="hidden md:block"
      />

      {/* Navigation */}
      <nav
        id="nav"
        className={`fixed top-0 left-0 right-0 z-[600] px-6 py-4 md:px-14 flex items-center justify-between transition-all duration-400 ${
          isNavSolid
            ? "bg-brand-bg/88 backdrop-blur-xl border-b border-brand-copper/20 shadow-md"
            : "bg-transparent"
        }`}
      >
        <a
          href="#"
          className="flex items-center gap-3 no-underline group"
          onMouseEnter={handleMouseEnterLink}
          onMouseLeave={handleMouseLeaveLink}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Ahmed Wood Art Logo"
            className="w-[46px] h-[46px] object-cover rounded-full border-1.5 border-brand-copper group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div>
            <div className="font-bebas text-[1.25rem] tracking-[4px] text-brand-espresso leading-none">
              Ahmed Wood Art
            </div>
            <div className="font-cormorant text-[0.62rem] tracking-[2px] text-brand-txt-muted uppercase">
              Rooted in Quality. Built for Life.
            </div>
          </div>
        </a>
        <ul className="hidden md:flex gap-10 list-none">
          <li>
            <a
              href="#about"
              className="text-brand-espresso no-underline text-[0.78rem] tracking-[3px] uppercase font-semibold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:width-0 after:h-[1.5px] after:bg-brand-copper hover:text-brand-copper hover:after:w-full after:transition-all after:duration-350"
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeaveLink}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className="text-brand-espresso no-underline text-[0.78rem] tracking-[3px] uppercase font-semibold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:width-0 after:h-[1.5px] after:bg-brand-copper hover:text-brand-copper hover:after:w-full after:transition-all after:duration-350"
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeaveLink}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-brand-espresso no-underline text-[0.78rem] tracking-[3px] uppercase font-semibold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:width-0 after:h-[1.5px] after:bg-brand-copper hover:text-brand-copper hover:after:w-full after:transition-all after:duration-350"
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeaveLink}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-brand-espresso no-underline text-[0.78rem] tracking-[3px] uppercase font-semibold transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:width-0 after:h-[1.5px] after:bg-brand-copper hover:text-brand-copper hover:after:w-full after:transition-all after:duration-350"
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeaveLink}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="hero min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#d9cab0] via-[#e8dcc8] to-[#cfc0a4] wood-grain py-28 px-4"
      >
        <div className="absolute w-[600px] height-[600px] rounded-full bg-radial from-brand-copper/12 to-transparent top-1/2 left-1/2 glow-pulse pointer-events-none" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Ahmed Wood Art"
            className="w-[110px] h-[110px] rounded-full object-cover border-3 border-brand-copper shadow-lg shadow-brand-copper/25 mx-auto mb-7 animate-pop-in"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
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
            Handcrafted kitchens, wardrobes &amp; bespoke interiors — made to last generations
          </p>
          <div className="flex flex-wrap gap-5 justify-center items-center animate-fade-up">
            <a
              href="#gallery"
              className="px-9 py-3.5 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-walnut hover:-translate-y-[3px] hover:shadow-lg hover:shadow-brand-walnut/30 transition-all duration-300"
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeaveLink}
            >
              View Portfolio
            </a>
            <a
              href="https://wa.me/923172568882"
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-3.5 border-1.5 border-brand-copper text-brand-espresso font-bebas tracking-[3px] text-[0.95rem] hover:bg-brand-copper hover:text-brand-white hover:-translate-y-[3px] transition-all duration-300"
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeaveLink}
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
      <section id="about" className="py-28 px-6 md:px-14 bg-gradient-to-br from-brand-bg-dark to-brand-bg relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center gap-4 mb-4 rv">
              <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
              Our Story
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-espresso mb-6 rv d1">
              Crafted with<br />
              <span className="italic text-brand-copper font-normal">Passion &amp; Precision</span>
            </h2>
            <p className="text-[1.08rem] leading-relaxed text-brand-txt-muted font-light mb-4 rv d2">
              Ahmed Wood Art is a premium furniture and interior woodwork brand dedicated to transforming homes with handcrafted quality. From elegantly laminated kitchen cabinets to stunning wardrobes and dressing units — every piece is built to last a lifetime.
            </p>
            <p className="text-[1.08rem] font-medium italic text-brand-copper mb-8 rv d2">
              &ldquo;Rooted in Quality. Built for Life.&rdquo;
            </p>
            <div className="grid grid-cols-2 gap-6 rv d3">
              {[
                { number: "500+", label: "Projects Completed" },
                { number: "10+", label: "Years Experience" },
                { number: "100%", label: "Client Satisfaction" },
                { number: "∞", label: "Design Possibilities" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 border border-brand-copper/25 bg-white/35 backdrop-blur-sm hover:border-brand-copper hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-copper/12 transition-all duration-350"
                >
                  <div className="font-bebas text-4xl text-brand-copper leading-none mb-1">{stat.number}</div>
                  <div className="text-[0.72rem] tracking-[2px] uppercase text-brand-txt-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="logo-wrap rv d2 flex justify-center">
            <div className="logo-spin relative">
              <div className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full bg-brand-bg border-[2.5px] border-brand-copper flex items-center justify-center shadow-2xl shadow-brand-walnut/25 relative overflow-hidden">
                <div className="absolute -inset-4 rounded-full border border-brand-copper/30 ring-pulse-1 pointer-events-none" />
                <div className="absolute -inset-8 rounded-full border border-brand-copper/14 ring-pulse-2 pointer-events-none" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Ahmed Wood Art Logo"
                  className="w-[90%] h-[90%] object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section id="gallery" className="py-28 px-6 md:px-14 bg-brand-espresso relative z-10">
        <div className="max-w-6xl mx-auto mb-14">
          <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper-lt flex items-center gap-4 mb-4 rv">
            <span className="w-8 h-[1.5px] bg-brand-copper-lt inline-block" />
            Portfolio
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-white rv d1">
            Our Finest<br />
            <span className="italic text-brand-copper-lt font-normal">Creations</span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Marble Finish Kitchen",
              img: "/images/kitchen-marble.png",
              delay: "",
            },
            {
              title: "Rustic Wood Wardrobe",
              img: "/images/wardrobe-rustic.png",
              delay: "d1",
            },
            {
              title: "Dressing Table Unit",
              img: "/images/dressing-table.png",
              delay: "d2",
            },
            {
              title: "Premium Bed Design",
              img: "/images/premium-bed.png",
              delay: "d1",
            },
            {
              title: "Log Texture Wardrobe",
              img: "/images/wardrobe-log.png",
              delay: "d2",
            },
            {
              title: "Floral Glass Wardrobe",
              img: "/images/wardrobe-floral.png",
              delay: "d3",
            },
            {
              title: "Diamond Mirror Wardrobe",
              img: "/images/wardrobe-diamond.jpg",
              delay: "",
            },
            {
              title: "Maroon Floral Cabinet",
              img: "/images/cabinet-maroon.jpg",
              delay: "d1",
            },
            {
              title: "Floral Wardrobe Detail",
              img: "/images/wardrobe-floral-detail.jpg",
              delay: "d2",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`gi relative overflow-hidden group aspect-square bg-brand-deepbrown rv ${item.delay}`}
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeaveLink}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-750 ease-out"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-espresso/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                <span className="font-playfair text-lg text-brand-bg font-semibold">{item.title}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/7 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 pointer-events-none" />
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-28 px-6 md:px-14 bg-brand-bg-dark relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center gap-4 mb-4 rv">
            <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
            What We Do
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-espresso mb-12 rv d1">
            Specialised<br />
            <span className="italic text-brand-copper font-normal">Services</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🪵",
                title: "Kitchen Cabinets",
                desc: "Custom modular kitchen cabinetry with premium laminate finishes — marble, wood grain, and bespoke patterns designed to transform your kitchen.",
                delay: "",
              },
              {
                icon: "🚪",
                title: "Wardrobes & Almaris",
                desc: "Floor-to-ceiling fitted wardrobes with glass panels, decorative laminates, mirror inlays and smart storage solutions for every bedroom style.",
                delay: "d1",
              },
              {
                icon: "🪞",
                title: "Dressing Tables",
                desc: "Elegant dressing units with statement mirrors, integrated shelves and drawer systems that blend function with luxury aesthetics.",
                delay: "d2",
              },
              {
                icon: "🏠",
                title: "Interior Paneling",
                desc: "Decorative wall paneling with floral, geometric and textured laminates that add dimension and character to any living space.",
                delay: "d1",
              },
              {
                icon: "✂️",
                title: "Custom Furniture",
                desc: "One-of-a-kind bespoke furniture crafted to your exact specifications — from concept and design to final installation.",
                delay: "d2",
              },
              {
                icon: "🎨",
                title: "Design Consultation",
                desc: "Expert guidance to help you choose the perfect finishes, layouts and materials for your home renovation project.",
                delay: "d3",
              },
            ].map((srv, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseLeave={() => {
                  handleCardMouseLeave(index);
                  handleMouseLeaveLink();
                }}
                className={`p-10 border border-brand-copper/20 bg-white/40 relative overflow-hidden transition-all duration-400 group rv ${srv.delay}`}
                style={{ transformStyle: "preserve-3d" }}
                onMouseEnter={handleMouseEnterLink}
              >
                <div className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-brand-copper opacity-40 group-hover:opacity-100 transition-opacity duration-400" />
                <span className="text-4xl mb-6 block">{srv.icon}</span>
                <h3 className="font-playfair text-xl font-bold text-brand-espresso mb-3">{srv.title}</h3>
                <p className="text-[0.9rem] leading-relaxed text-brand-txt-muted font-light">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Inquiry Form Section */}
      <section id="contact" className="py-28 px-6 md:px-14 bg-brand-bg relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <div className="font-bebas tracking-[7px] text-[0.7rem] text-brand-copper flex items-center justify-center gap-4 mb-4 rv">
            <span className="w-8 h-[1.5px] bg-brand-copper inline-block" />
            Get In Touch
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-espresso mb-4 rv d1">
            Let&apos;s Build<br />
            <span className="italic text-brand-copper font-normal">Something Beautiful</span>
          </h2>
          <p className="font-playfair italic text-lg md:text-xl text-brand-walnut mb-3 rv d2">
            &ldquo;Rooted in Quality. Built for Life.&rdquo;
          </p>
          <p className="text-base text-brand-txt-muted max-w-lg mx-auto rv d2">
            Reach out via call, WhatsApp, email, or fill out our project inquiry form below. We would love to discuss your next project.
          </p>
        </div>

        {/* Contact info cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <a
            href="tel:+923172568882"
            className="p-8 border border-brand-copper/22 bg-white/45 flex flex-col items-center gap-3 text-brand-espresso hover:border-brand-copper hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-copper/15 transition-all duration-350 rv"
            onMouseEnter={handleMouseEnterLink}
            onMouseLeave={handleMouseLeaveLink}
          >
            <div className="w-13 h-13 rounded-full bg-brand-copper text-brand-white flex items-center justify-center text-xl">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
            </div>
            <span className="font-bebas tracking-[3px] text-[0.75rem] text-brand-txt-muted uppercase">Call Us</span>
            <span className="font-playfair text-lg font-bold text-brand-espresso">0317 2568882</span>
            <span className="text-[0.72rem] tracking-[1.5px] text-brand-copper uppercase font-medium">Tap to call</span>
          </a>

          <a
            href="https://wa.me/923172568882"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 border border-brand-copper/22 bg-white/45 flex flex-col items-center gap-3 text-brand-espresso hover:border-brand-copper hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-copper/15 transition-all duration-350 rv d1"
            onMouseEnter={handleMouseEnterLink}
            onMouseLeave={handleMouseLeaveLink}
          >
            <div className="w-13 h-13 rounded-full bg-[#25d366] text-brand-white flex items-center justify-center text-xl">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <span className="font-bebas tracking-[3px] text-[0.75rem] text-brand-txt-muted uppercase">WhatsApp</span>
            <span className="font-playfair text-lg font-bold text-brand-espresso">0317 2568882</span>
            <span className="text-[0.72rem] tracking-[1.5px] text-brand-copper uppercase font-medium">Chat with us</span>
          </a>

          <a
            href="mailto:ahmedwoodart66@gmail.com"
            className="p-8 border border-brand-copper/22 bg-white/45 flex flex-col items-center gap-3 text-brand-espresso hover:border-brand-copper hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-copper/15 transition-all duration-350 rv d2"
            onMouseEnter={handleMouseEnterLink}
            onMouseLeave={handleMouseLeaveLink}
          >
            <div className="w-13 h-13 rounded-full bg-brand-walnut text-brand-white flex items-center justify-center text-xl">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <span className="font-bebas tracking-[3px] text-[0.75rem] text-brand-txt-muted uppercase">Email Us</span>
            <span className="font-playfair text-sm md:text-base font-bold text-brand-espresso text-center break-all">
              ahmedwoodart66@gmail.com
            </span>
            <span className="text-[0.72rem] tracking-[1.5px] text-brand-copper uppercase font-medium">Send a message</span>
          </a>
        </div>

        {/* Project Inquiry Form */}
        <div className="max-w-2xl mx-auto border border-brand-copper/20 bg-white/30 backdrop-blur-md p-8 md:p-12 shadow-xl shadow-brand-walnut/5 rv d3">
          <h3 className="font-playfair text-2xl font-bold text-brand-espresso mb-8 text-center">
            Send Us a Project Inquiry
          </h3>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 align-start text-left">
                <label htmlFor="name" className="text-xs uppercase tracking-wider text-brand-txt-muted font-semibold">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formInputs.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Ali Khan"
                  className="px-4 py-3 bg-white/60 border border-brand-copper/20 text-brand-espresso placeholder-brand-txt-muted/50 focus:border-brand-copper focus:bg-white focus:outline-none transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col gap-2 align-start text-left">
                <label htmlFor="phone" className="text-xs uppercase tracking-wider text-brand-txt-muted font-semibold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formInputs.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 03001234567"
                  className="px-4 py-3 bg-white/60 border border-brand-copper/20 text-brand-espresso placeholder-brand-txt-muted/50 focus:border-brand-copper focus:bg-white focus:outline-none transition-colors duration-300"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 align-start text-left">
              <label htmlFor="email" className="text-xs uppercase tracking-wider text-brand-txt-muted font-semibold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formInputs.email}
                onChange={handleInputChange}
                required
                placeholder="e.g. name@example.com"
                className="w-full px-4 py-3 bg-white/60 border border-brand-copper/20 text-brand-espresso placeholder-brand-txt-muted/50 focus:border-brand-copper focus:bg-white focus:outline-none transition-colors duration-300"
              />
            </div>
            <div className="flex flex-col gap-2 align-start text-left">
              <label htmlFor="message" className="text-xs uppercase tracking-wider text-brand-txt-muted font-semibold">
                Project Details / Requirements
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formInputs.message}
                onChange={handleInputChange}
                required
                placeholder="Describe your kitchen cabinets, wardrobe dimensions, or custom furniture requirements..."
                className="w-full px-4 py-3 bg-white/60 border border-brand-copper/20 text-brand-espresso placeholder-brand-txt-muted/50 focus:border-brand-copper focus:bg-white focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>

            {/* Notification alert states */}
            {submitStatus && (
              <div
                className={`p-4 text-sm font-medium border ${
                  submitStatus.success
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-lg hover:bg-brand-walnut transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
              onMouseEnter={handleMouseEnterLink}
              onMouseLeave={handleMouseLeaveLink}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </button>
          </form>
        </div>

        {/* Instagram Follow Section */}
        <div className="text-center mt-16 rv d3">
          <p className="text-[0.75rem] tracking-[3px] uppercase text-brand-txt-muted mb-3 font-semibold">
            Follow Our Work
          </p>
          <a
            href="https://instagram.com/ahmed_woodart"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-1.5 border-brand-copper/30 px-9 py-3.5 bg-white/35 text-brand-espresso font-bebas text-2xl tracking-[4px] hover:bg-brand-copper hover:text-brand-white hover:border-brand-copper hover:-translate-y-[3px] hover:shadow-lg hover:shadow-brand-copper/25 transition-all duration-300"
            onMouseEnter={handleMouseEnterLink}
            onMouseLeave={handleMouseLeaveLink}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @ahmed_woodart
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-espresso py-8 px-6 md:px-14 flex flex-col md:flex-row items-center justify-between text-[0.72rem] tracking-[2px] uppercase text-brand-white/40 border-t border-brand-copper/10 select-none">
        <div className="font-bebas text-[1.1rem] tracking-[5px] text-brand-copper-lt mb-3 md:mb-0">
          Ahmed Wood Art
        </div>
        <div className="font-cormorant italic text-[0.82rem] tracking-[1px] text-brand-white/35 normal-case mb-3 md:mb-0">
          &ldquo;Rooted in Quality. Built for Life.&rdquo;
        </div>
        <div>&copy; 2026 Ahmed Wood Art. All rights reserved.</div>
      </footer>
    </>
  );
}
