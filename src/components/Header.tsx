"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoImg from "../../public/logo.webp";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

// Pages whose hero section has a DARK background — header text must be white
const darkHeroPages = ["/portfolio", "/"];

export default function Header() {
  const [isNavSolid, setIsNavSolid] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isDarkPage = darkHeroPages.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavSolid(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Determine text/icon color based on scroll state and page background
  const isLightText = isDarkPage && !isNavSolid && !isMobileOpen;

  const logoTitleColor = isLightText ? "text-brand-white" : "text-brand-espresso";
  const logoSubColor = isLightText ? "text-brand-white/55" : "text-brand-txt-muted";
  const hamburgerColor = isLightText ? "bg-brand-white" : "bg-brand-espresso";

  return (
    <>
      <nav
        id="nav"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[600] px-6 py-4 md:px-14 flex items-center justify-between transition-all duration-400 ${
          isNavSolid || isMobileOpen
            ? "bg-brand-bg/95 backdrop-blur-xl border-b border-brand-copper/20 shadow-md"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline group">
          <Image
            src={logoImg}
            alt="Ahmed Wood Art Logo"
            width={46}
            height={46}
            className="object-cover rounded-full border-[1.5px] border-brand-copper group-hover:scale-105 transition-transform duration-300"
            placeholder="blur"
          />
          <div>
            <div className={`font-bebas text-[1.25rem] tracking-[4px] leading-none transition-colors duration-300 ${logoTitleColor}`}>
              Ahmed Wood Art
            </div>
            <div className={`font-cormorant text-[0.62rem] tracking-[2px] uppercase transition-colors duration-300 ${logoSubColor}`}>
              Rooted in Quality. Built for Life.
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 lg:gap-10 list-none m-0 p-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const baseLink = isLightText
              ? "text-brand-white/80 hover:text-brand-white"
              : "text-brand-espresso hover:text-brand-copper";
            const activeLink = isLightText
              ? "text-brand-white after:w-full"
              : "text-brand-copper after:w-full";

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`no-underline text-[0.78rem] tracking-[3px] uppercase font-semibold transition-colors duration-300 relative
                    after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:h-[1.5px] after:bg-brand-copper
                    hover:after:w-full after:transition-all after:duration-350
                    ${isActive ? activeLink : `${baseLink} after:w-0`}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger – mobile only */}
        <button
          id="mobile-menu-btn"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 relative z-[700]"
        >
          <span
            className={`block h-[1.8px] rounded-full transition-all duration-300 origin-center ${hamburgerColor} ${
              isMobileOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
            }`}
          />
          <span
            className={`block h-[1.8px] rounded-full transition-all duration-300 ${hamburgerColor} ${
              isMobileOpen ? "w-0 opacity-0" : "w-5"
            }`}
          />
          <span
            className={`block h-[1.8px] rounded-full transition-all duration-300 origin-center ${hamburgerColor} ${
              isMobileOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Nav Drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[500] flex flex-col justify-center items-center bg-brand-bg/98 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="list-none flex flex-col gap-7 items-center p-0 m-0">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className={`transition-all duration-500 ${
                isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
              style={{ transitionDelay: isMobileOpen ? `${i * 75 + 80}ms` : "0ms" }}
            >
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setIsMobileOpen(false)}
                className={`font-bebas text-[2.2rem] tracking-[8px] no-underline transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-brand-copper"
                    : "text-brand-espresso hover:text-brand-copper"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile CTA strip */}
        <div
          className={`mt-14 flex flex-col items-center gap-4 transition-all duration-500 ${
            isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileOpen ? "500ms" : "0ms" }}
        >
          <a
            href="https://wa.me/923172568882"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-brand-copper text-brand-white font-bebas tracking-[3px] text-[0.9rem] no-underline hover:bg-brand-walnut transition-colors duration-300"
          >
            WhatsApp Us
          </a>
          <p className="text-[0.68rem] tracking-[2px] uppercase text-brand-txt-muted">
            0317 2568882 · ahmedwoodart66@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}
