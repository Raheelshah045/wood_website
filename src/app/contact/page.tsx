"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FormInputs {
  name: string;
  email: string;
  phone: string;
  message: string;
  projectType: string;
  timeline: string;
}

export default function ContactPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formInputs, setFormInputs] = useState<FormInputs>({
    name: "",
    email: "",
    phone: "",
    message: "",
    projectType: "residential",
    timeline: "flexible",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formData = new FormData();
      formData.append("name", formInputs.name);
      formData.append("email", formInputs.email);
      formData.append("phone", formInputs.phone);
      formData.append("message", formInputs.message);
      formData.append("projectType", formInputs.projectType);
      formData.append("timeline", formInputs.timeline);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Thank you! Your wood art inquiry has been submitted successfully.",
        });
        setFormInputs({
          name: "",
          email: "",
          phone: "",
          message: "",
          projectType: "residential",
          timeline: "flexible",
        });
        setSelectedFile(null);
        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || "Failed to submit inquiry. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        success: false,
        message: "A network error occurred. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-28 px-6 md:px-14 bg-brand-bg relative z-10 flex-grow flex flex-col justify-center min-h-[calc(100vh-200px)]">
      <div className="max-w-4xl mx-auto w-full text-center mb-14">
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
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full">
        <a
          href="tel:+923172568882"
          className="p-8 border border-brand-copper/22 bg-white/45 flex flex-col items-center gap-3 text-brand-espresso hover:border-brand-copper hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-copper/15 transition-all duration-350 rv"
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
      <div className="max-w-2xl mx-auto border border-brand-copper/20 bg-white/30 backdrop-blur-md p-8 md:p-12 shadow-xl shadow-brand-walnut/5 rv d3 w-full">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 align-start text-left">
              <label htmlFor="projectType" className="text-xs uppercase tracking-wider text-brand-txt-muted font-semibold">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formInputs.projectType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/60 border border-brand-copper/20 text-brand-espresso focus:border-brand-copper focus:bg-white focus:outline-none transition-colors duration-300"
              >
                <option value="residential">Residential (House)</option>
                <option value="commercial">Commercial (Office/Retail)</option>
                <option value="art_commission">Custom Art Piece</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 align-start text-left">
              <label htmlFor="timeline" className="text-xs uppercase tracking-wider text-brand-txt-muted font-semibold">
                Desired Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formInputs.timeline}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/60 border border-brand-copper/20 text-brand-espresso focus:border-brand-copper focus:bg-white focus:outline-none transition-colors duration-300"
              >
                <option value="urgent">Urgent</option>
                <option value="3months">Within 3 Months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
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
          <div className="flex flex-col gap-2 align-start text-left">
            <label htmlFor="file" className="text-xs uppercase tracking-wider text-brand-txt-muted font-semibold">
              Upload Reference Photo (optional)
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 bg-white/60 border border-brand-copper/20 text-brand-espresso focus:border-brand-copper focus:bg-white focus:outline-none transition-colors duration-300 file:mr-4 file:py-1.5 file:px-3.5 file:border-0 file:text-xs file:font-semibold file:bg-brand-copper/20 file:text-brand-copper hover:file:bg-brand-copper/30 file:cursor-pointer"
            />
          </div>

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

      {/* Budget Estimator Guide */}
      <div className="max-w-2xl mx-auto mt-20 border border-brand-copper/20 bg-white/30 backdrop-blur-md p-8 md:p-12 shadow-xl shadow-brand-walnut/5 rv w-full">
        <h3 className="font-playfair text-xl font-bold text-brand-espresso mb-4 text-center">
          How Woodwork Pricing is Determined
        </h3>
        <p className="text-xs leading-relaxed text-brand-txt-muted font-light mb-6 text-center">
          Every project is unique. To help you plan, we calculate pricing based on four key factors. Learn more about our custom builds on our <Link href="/process" className="text-brand-copper font-medium hover:underline">Process page</Link>.
        </p>
        <div className="space-y-4">
          {[
            { title: "Linear or Square Footage", desc: "Kitchen cabinets and wardrobes are measured per running foot. Upper cabinets and lower drawers are calculated separately based on depth." },
            { title: "Sheet Core Board Quality", desc: "Water-resistant MDF and commercial plywood cost slightly more than standard particle board, but prevent warping under damp Karachi coastal air." },
            { title: "Laminate vs. Veneer Finishes", desc: "Thermo-fused textured laminates offer exceptional value and durability. Natural walnut or oak veneer finishes require manual polish and staining, representing our premium category." },
            { title: "Hinges & Glides Hardware", desc: "Using entry-level local hardware keeps costs low. Upgrading to European Blum or Hettich soft-close hydraulic runners ensures durability, backed by lifetime smooth motion." }
          ].map((item, idx) => (
            <div key={idx} className="border-b border-brand-copper/10 pb-3 last:border-b-0 last:pb-0">
              <h4 className="font-bebas text-sm text-brand-copper tracking-wider mb-1">{item.title}</h4>
              <p className="text-xs leading-relaxed text-brand-txt-muted font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Location & Hours */}
      <div className="max-w-2xl mx-auto mt-16 text-center rv">
        <h3 className="font-playfair text-xl font-bold text-brand-espresso mb-3">
          Our Karachi Workshop
        </h3>
        <p className="text-sm text-brand-txt-muted font-light mb-4">
          Sector 15, Korangi Industrial Area, Karachi, Pakistan
        </p>
        <div className="inline-block border border-brand-copper/30 bg-white/20 px-6 py-3 rounded">
          <span className="text-[0.72rem] tracking-[2px] uppercase text-brand-copper font-semibold block mb-1">Business Hours</span>
          <span className="text-xs text-brand-txt-muted font-light block">Monday – Saturday: 10:00 AM – 7:00 PM</span>
          <span className="text-xs text-brand-txt-muted font-light block">Sunday: Closed</span>
        </div>
        <p className="text-xs text-brand-txt-muted/70 mt-4 italic">
          Please schedule an appointment via WhatsApp or Call before visiting so our senior designers are available to host you.
        </p>
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
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          @ahmed_woodart
        </a>
      </div>
    </section>
  );
}
