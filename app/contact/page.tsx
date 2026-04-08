"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─────────── Intersection Observer Hook ─────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ═══════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Roll-Off Dumpster Services", href: "/roll-off-dumpster-services" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-card py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-tight group">
          <span
            className={`text-xl md:text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-primary" : "text-white"
            }`}
          >
            Central Valley
          </span>
          <span
            className={`text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${
              scrolled ? "text-accent" : "text-blue-200"
            }`}
          >
            Disposal
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/15 ${
                scrolled
                  ? "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:2093581710"
            className={`ml-3 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              scrolled
                ? "bg-primary text-white hover:bg-primary-dark shadow-card"
                : "bg-white text-primary hover:bg-blue-50"
            }`}
          >
            (209) 358-1710
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 rounded transition-all duration-300 ${
              scrolled ? "bg-foreground" : "bg-white"
            } ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 rounded transition-all duration-300 ${
              scrolled ? "bg-foreground" : "bg-white"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 rounded transition-all duration-300 ${
              scrolled ? "bg-foreground" : "bg-white"
            } ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      <div
        className={`lg:hidden glass shadow-card overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-[400px] mt-2" : "max-h-0"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-foreground/80 font-medium hover:bg-primary/5 hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:2093581710"
            className="mt-2 px-5 py-3 rounded-lg bg-primary text-white text-center font-semibold hover:bg-primary-dark transition-colors"
          >
            Call (209) 358-1710
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
function ContactHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/image6.png"
          alt="Central Valley Disposal dumpster"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c1f4d]/88 via-[#1a3a7a]/78 to-[#0c4a6e]/82" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-36 md:py-44 w-full">
        <div className="max-w-3xl">
          <div className="animate-fade-in inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-blue-100 font-medium">
              Get In Touch
            </span>
          </div>

          <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
            Connect With
            <br />
            <span className="text-blue-300">Central Valley Disposal</span>
          </h1>

          <p className="animate-fade-in-up delay-200 mt-6 text-lg md:text-xl text-blue-100/90 max-w-xl leading-relaxed">
            in Merced County, CA. Reach out today to schedule your dumpster
            delivery or ask us anything.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0 80V40C240 0 480 0 720 20C960 40 1200 60 1440 40V80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT FORM & INFO
   ═══════════════════════════════════════════════════ */
function ContactFormSection() {
  const obs = useInView();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Frontend only — no backend
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* LEFT — Contact Info */}
          <div
            className={`lg:col-span-2 ${
              obs.isVisible ? "animate-slide-left" : "opacity-0"
            }`}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              Contact Info
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
              Connect With Central Valley Disposal in{" "}
              <span className="gradient-text">Merced County, CA</span>
            </h2>

            <div className="mt-10 space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-black text-primary">P</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-1">
                    Phone
                  </h4>
                  <a
                    href="tel:2093581710"
                    className="text-xl font-bold text-primary hover:underline"
                  >
                    (209) 358-1710
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-black text-primary">E</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:centralvalleydisposal@comcast.net"
                    className="text-primary font-semibold hover:underline text-[15px] break-all"
                  >
                    centralvalleydisposal@comcast.net
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-black text-primary">A</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-1">
                    Address
                  </h4>
                  <p className="text-foreground font-medium">
                    3218 N Buhach Rd
                    <br />
                    Atwater, California 95301
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-10 bg-surface rounded-2xl p-6">
              <h4 className="text-lg font-bold text-foreground mb-4">
                Business Hours
              </h4>
              <div className="space-y-2.5 text-muted">
                <div className="flex justify-between">
                  <span className="font-medium">Monday – Friday</span>
                  <span>8:00 am – 5:00 pm</span>
                </div>
                <div className="w-full h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-medium">Saturday – Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div
            className={`lg:col-span-3 ${
              obs.isVisible ? "animate-slide-right delay-200" : "opacity-0"
            }`}
          >
            {!submitted ? (
              <div className="bg-surface rounded-3xl p-8 md:p-10 shadow-card">
                <h3 className="text-2xl font-extrabold text-foreground mb-2">
                  Send Us a Message
                </h3>
                <p className="text-muted text-[15px] mb-8">
                  Fill out the form below and our team will get back to you
                  promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 text-[15px]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 text-[15px]"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 text-[15px]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 text-[15px]"
                        placeholder="(209) 555-0123"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 text-[15px] resize-none"
                      placeholder="Tell us about your project or ask us a question..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-surface rounded-3xl p-8 md:p-10 shadow-card text-center py-20">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <span className="text-4xl text-green-600">✓</span>
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-3">
                  Message Sent!
                </h3>
                <p className="text-muted text-[16px] leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out. Our team will get back to you as
                  soon as possible. For immediate assistance, call{" "}
                  <a
                    href="tel:2093581710"
                    className="text-primary font-semibold hover:underline"
                  >
                    (209) 358-1710
                  </a>
                  .
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      message: "",
                    });
                  }}
                  className="mt-8 px-8 py-3 rounded-xl bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#0c1f4d] text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold tracking-tight">
                Central Valley
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
                Disposal
              </span>
            </div>
            <p className="mt-4 text-blue-200/70 text-sm leading-relaxed max-w-xs">
              Family-owned since 1985. Reliable roll-off dumpster rentals proudly
              serving Merced County, California.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider text-blue-200 mb-4">
              Quick Links
            </h5>
            <div className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                {
                  label: "Roll-Off Dumpster Services",
                  href: "/roll-off-dumpster-services",
                },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-blue-200/70 hover:text-white transition-colors text-sm"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider text-blue-200 mb-4">
              Contact Info
            </h5>
            <div className="space-y-3 text-sm text-blue-200/70">
              <a
                href="tel:2093581710"
                className="block hover:text-white transition-colors"
              >
                (209) 358-1710
              </a>
              <a
                href="mailto:centralvalleydisposal@comcast.net"
                className="block hover:text-white transition-colors break-all"
              >
                centralvalleydisposal@comcast.net
              </a>
              <p>3218 N Buhach Rd, Atwater, CA 95301</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="mt-3 text-blue-200/40 text-xs">
            &copy; {new Date().getFullYear()} Central Valley Disposal. All rights
            reserved.{" "}
            <a href="#" className="hover:text-white transition-colors">
              Terms of Use
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════ */
export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />
      <ContactFormSection />
      <Footer />
    </main>
  );
}
