"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─────────── Intersection Observer Hook ─────────── */
function useInView(threshold = 0.15) {
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
   TOP BAR — Call Us (Mobile Only)
   ═══════════════════════════════════════════════════ */
function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0a1628] text-white lg:hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-10">
        <div className="hidden sm:flex items-center gap-4 text-xs text-gray-300">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            Mon–Fri 8AM–5PM
          </span>
          <span className="w-px h-3 bg-gray-600" />
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
            Serving Merced County, CA
          </span>
        </div>
        <a
          href="tel:2093581710"
          className="flex items-center gap-2 ml-auto px-4 py-1.5 rounded-md bg-primary hover:bg-primary-dark text-white text-xs font-bold tracking-wide transition-all duration-300 hover:-translate-y-px"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
          Call Us: (209) 358-1710
        </a>
      </div>
    </div>
  );
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
              scrolled ? "text-primary" : "text-red-200"
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
                : "bg-white text-navy hover:bg-gray-50"
            }`}
          >
            (209) 358-1710
          </a>
        </div>
                 <a
            href="tel:2093581710"
            className=" px-5 py-2 lg:hidden  rounded-lg bg-primary text-white text-center font-semibold hover:bg-primary-dark transition-colors"
          >
            Call Us
          </a>
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
         
        </div>
      </div>
    </nav>
  );
}
/* ═══════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/image.png"
          alt="Central Valley Disposal truck with roll-off dumpster"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/90 via-[#0f1d3a]/82 to-[#1a1a2e]/80" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-32 md:py-40 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-200 font-medium">
              Serving Merced County Since 1985
            </span>
          </div>

          <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
            You Fill &rsquo;Em,
            <br />
            <span className="text-red-300">We Haul &rsquo;Em!</span>
          </h1>

          <p className="animate-fade-in-up delay-200 mt-6 text-lg md:text-xl text-gray-200/90 max-w-xl leading-relaxed">
            Reliable roll-off dumpster solutions for every cleanup. From household cleanouts to
            construction debris — dependable, on-time service you can count on.
          </p>

          <div className="animate-fade-in-up delay-400 mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:2093581710"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Call for Pricing
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Explore Services
            </a>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-in-up delay-600 mt-14 flex flex-wrap gap-x-8 gap-y-3 text-gray-300/80 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-red-400" />
              35+ Years Experience
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-red-400" />
              Family-Owned &amp; Operated
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-red-400" />
              No Hidden Fees
            </span>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
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
   INTRO / ABOUT SECTION
   ═══════════════════════════════════════════════════ */
function Intro() {
  const obs = useInView();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div
        ref={obs.ref}
        className={`max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
          obs.isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Text */}
        <div className={obs.isVisible ? "animate-slide-left" : ""}>
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
            Your Local Partner for{" "}
            <span className="gradient-text">Simple &amp; Affordable</span>{" "}
            Dumpster Rentals
          </h2>
          <p className="mt-6 text-muted leading-relaxed text-[17px]">
            Cleanup shouldn&apos;t slow down your momentum. That&apos;s why we offer straightforward
            roll-off dumpster services tailored to household cleanouts, demolition projects,
            construction jobs, landscaping work, and general waste removal. Our team communicates
            clearly, arrives on time, and helps you choose the right container for your project.
          </p>
          <p className="mt-4 text-muted leading-relaxed text-[17px]">
            Being family-owned since 1985 means we bring decades of experience and neighbor-focused
            service to every job. We&apos;re large enough to handle high-volume hauling needs, yet
            small enough to treat every project with personal care.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <div>
              <div className="text-3xl font-extrabold text-primary">35+</div>
              <div className="text-sm text-muted mt-1">Years of Experience</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-3xl font-extrabold text-primary">1985</div>
              <div className="text-sm text-muted mt-1">Family-Owned Since</div>
            </div>
            <div className="w-px bg-border" />
            <div>
              <div className="text-3xl font-extrabold text-primary">100%</div>
              <div className="text-sm text-muted mt-1">Locally Operated</div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className={obs.isVisible ? "animate-slide-right delay-200" : ""}>
          <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
            <Image
              src="/image6.png"
              alt="Central Valley Disposal dumpster with American flag"
              width={700}
              height={470}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS — PROCESS
   ═══════════════════════════════════════════════════ */
function Process() {
  const obs = useInView();

  const steps = [
    {
      num: "01",
      title: "Choose Your Size",
      desc: "Select a dumpster size that fits your project. Not sure? We'll help you pick.",
    },
    {
      num: "02",
      title: "We Deliver",
      desc: "We deliver the dumpster to your home, job site, or commercial property — on time.",
    },
    {
      num: "03",
      title: "You Fill It",
      desc: "Fill the dumpster at your own pace as your project progresses. No rush.",
    },
    {
      num: "04",
      title: "We Haul It",
      desc: "Once you're done, we pick it up and haul everything away. That simple.",
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 bg-gradient-blue-subtle">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${
            obs.isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Renting a Dumpster Should Be{" "}
            <span className="gradient-text">Simple</span>
          </h2>
          <p className="mt-4 text-muted text-lg">
            Four straightforward steps to get your project rolling.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative group bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 ${
                obs.isVisible
                  ? `animate-fade-in-up delay-${(i + 1) * 100}`
                  : "opacity-0"
              }`}
            >
              {/* Step number */}
              <div className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                {step.num}
              </div>
              <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-3 text-muted text-[15px] leading-relaxed">{step.desc}</p>

              {/* Connector line (desktop) */}
              {i < 3 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-border" />
              )}
            </div>
          ))}
        </div>

        <p
          className={`text-center mt-10 text-muted text-[15px] max-w-xl mx-auto ${
            obs.isVisible ? "animate-fade-in delay-500" : "opacity-0"
          }`}
        >
          This process keeps your space clear, supports safety, and prevents debris from slowing
          down your work.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════════ */
function Services() {
  const obs = useInView();

  const services = [
    {
      title: "Household Cleanouts",
      desc: "Ideal for attics, basements, garages, move-outs, estate cleanouts, and general decluttering. Load furniture, boxes, broken items, and non-hazardous household waste.",
      image: "/image5.png",
    },
    {
      title: "Demolition Projects",
      desc: "Handles debris from interior, exterior, or structural demolition. Dispose of drywall, flooring, wood, fixtures, and remodeling debris.",
      image: "/image2.png",
    },
    {
      title: "Construction Jobs",
      desc: "Perfect for contractors needing dependable debris control. Great for job-site debris, renovation scraps, framing leftovers, and packaging materials.",
      image: "/image3.png",
    },
    {
      title: "Landscaping & Home Improvement",
      desc: "A great choice for yard waste, trimmings, soil, fencing, and renovation debris.",
      image: "/image4.png",
    },
  ];

  const moreServices = [
    {
      title: "Concrete, Asphalt, or Dirt",
      desc: "Special containers for heavy materials. Tell us what you have so we match you with the correct dumpster.",
    },
    {
      title: "Recyclable Materials",
      desc: "We can discuss options for clean loads of metal-approved recyclables.",
    },
    {
      title: "General Waste",
      desc: "Flexible for mixed loads and multi-phase projects.",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${
            obs.isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Explore Our{" "}
            <span className="gradient-text">Dumpster Services</span>
          </h2>
          <p className="mt-4 text-muted text-lg">
            Whatever your cleanup calls for, we have a roll-off solution to match.
          </p>
        </div>

        {/* Main service cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className={`group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 ${
                obs.isVisible
                  ? `animate-fade-in-up delay-${(i + 1) * 100}`
                  : "opacity-0"
              }`}
            >
              <div className="relative h-56 md:h-64 overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-[#0a1628]/20 to-transparent" />
                <h3 className="absolute bottom-5 left-6 text-xl md:text-2xl font-bold text-white">
                  {svc.title}
                </h3>
              </div>
              <div className="p-6 bg-white">
                <p className="text-muted leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional services row */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {moreServices.map((svc, i) => (
            <div
              key={svc.title}
              className={`bg-surface rounded-2xl p-7 hover:bg-surface-alt transition-all duration-400 ${
                obs.isVisible
                  ? `animate-fade-in-up delay-${(i + 5) * 100}`
                  : "opacity-0"
              }`}
            >
              <h4 className="text-lg font-bold text-foreground">{svc.title}</h4>
              <p className="mt-3 text-muted text-[15px] leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   RESTRICTED ITEMS
   ═══════════════════════════════════════════════════ */
function RestrictedItems() {
  const obs = useInView();

  const items = [
    "TVs or computer monitors",
    "Hazardous materials",
    "Paint cans with liquid",
    "Flammable or combustible liquids",
    "Chemicals or toxic waste",
    "Batteries",
    "Fluorescent bulbs",
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-blue-subtle">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className={obs.isVisible ? "animate-slide-left" : "opacity-0"}>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              Important Info
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
              Items That <span className="gradient-text">Cannot Be Placed</span> in Our Dumpsters
            </h2>
            <p className="mt-4 text-muted text-[17px] leading-relaxed">
              To keep your project safe and compliant, certain items cannot be accepted. If
              you&apos;re unsure about a particular item, give us a call — we&apos;re happy to help.
            </p>

            <div className="mt-8 space-y-3">
              {items.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-4 bg-white rounded-xl px-5 py-3.5 shadow-sm ${
                    obs.isVisible
                      ? `animate-fade-in-up delay-${(i + 1) * 100}`
                      : "opacity-0"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={obs.isVisible ? "animate-slide-right delay-200" : "opacity-0"}>
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
              <Image
                src="/image4.png"
                alt="Roll-off dumpster on a job site"
                width={700}
                height={470}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
            <div className="mt-6 bg-white rounded-xl p-5 shadow-card text-center">
              <p className="text-muted text-sm leading-relaxed">
                Not sure if an item is accepted?{" "}
                <a href="tel:2093581710" className="text-primary font-semibold hover:underline">
                  Call us at (209) 358-1710
                </a>{" "}
                and we&apos;ll help determine the proper disposal method.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   IDEAL FOR (Residential & Commercial)
   ═══════════════════════════════════════════════════ */
function IdealFor() {
  const obs = useInView();

  const uses = [
    "Home improvements",
    "Rental property cleanups",
    "Business renovations",
    "Retail cleanouts",
    "Warehouse organizing",
    "Construction and demolition",
    "Landscaping upgrades",
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <div className={`order-2 md:order-1 ${obs.isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
              <Image
                src="/image3.png"
                alt="Central Valley Disposal truck loading dumpster"
                width={700}
                height={470}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
          </div>

          {/* Content */}
          <div className={`order-1 md:order-2 ${obs.isVisible ? "animate-slide-right delay-200" : "opacity-0"}`}>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              Residential &amp; Commercial
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
              Waste &amp; Debris Disposal for{" "}
              <span className="gradient-text">Every Property Type</span>
            </h2>
            <p className="mt-4 text-muted text-[17px] leading-relaxed">
              We support both homes and businesses with dependable waste handling solutions. From
              single-cleanup rentals to consistent support for remodels or landscaping companies, our
              dumpsters help maintain clean, organized properties.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {uses.map((use, i) => (
                <div
                  key={use}
                  className={`flex items-center gap-3 bg-surface rounded-xl px-4 py-3 ${
                    obs.isVisible
                      ? `animate-fade-in-up delay-${(i + 1) * 100}`
                      : "opacity-0"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   WHY CHOOSE US
   ═══════════════════════════════════════════════════ */
function WhyUs() {
  const obs = useInView();

  const reasons = [
    { title: "35+ Years Experience", desc: "Decades of industry expertise in Merced County waste management." },
    { title: "Local Professionals", desc: "A team that understands your project needs and community." },
    { title: "No Hidden Fees", desc: "Transparent pricing with no surprise charges." },
    { title: "Smooth Scheduling", desc: "Dependable communication and reliable timing." },
    { title: "Flexible Delivery", desc: "Pickup and delivery that works with your timeline." },
    { title: "Right-Sized Dumpsters", desc: "Ideal container sizes for any project scope." },
    { title: "Clean Containers", desc: "Durable, well-maintained dumpsters every time." },
    { title: "Friendly Service", desc: "Quick responses from a team that genuinely cares." },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #12243d 100%)' }}>
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${
            obs.isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-red-300 mb-4 bg-white/10 px-4 py-1.5 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Why Choose Central Valley Disposal
          </h2>
          <p className="mt-4 text-gray-300 text-lg">
            Our commitment to reliability, friendly service, fair pricing, and a long history of
            community service sets us apart.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className={`group bg-white/8 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-500 hover:-translate-y-1 ${
                obs.isVisible
                  ? `animate-scale-in delay-${(i + 1) * 100}`
                  : "opacity-0"
              }`}
            >
              <h4 className="text-lg font-bold text-white">{r.title}</h4>
              <p className="mt-2 text-gray-300/80 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CTA BANNER
   ═══════════════════════════════════════════════════ */
function CTA() {
  const obs = useInView();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div ref={obs.ref} className="max-w-5xl mx-auto px-5 md:px-8">
        <div
          className={`relative rounded-3xl overflow-hidden ${
            obs.isVisible ? "animate-scale-in" : "opacity-0"
          }`}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/image2.png"
              alt="Dumpster being hauled"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/92 via-[#0f1d3a]/87 to-[#1a1a2e]/82" />
          </div>

          <div className="relative z-10 text-center py-16 md:py-24 px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Start Your Cleanup With a<br />
              Dumpster You Can Depend On
            </h2>
            <p className="mt-6 text-gray-200 text-lg max-w-2xl mx-auto">
              Whether your project is big or small, Central Valley Disposal has the right roll-off
              container and a team ready to help.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:2093581710"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Call (209) 358-1710
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT & FOOTER
   ═══════════════════════════════════════════════════ */
function Contact() {
  const obs = useInView();

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-blue-subtle">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${
            obs.isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-muted text-lg">
            Reach out today to schedule your dumpster delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Phone */}
          <div
            className={`bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 text-center hover:-translate-y-1 ${
              obs.isVisible ? "animate-fade-in-up delay-100" : "opacity-0"
            }`}
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
            </div>
            <h4 className="mt-5 text-lg font-bold text-foreground">Phone</h4>
            <a
              href="tel:2093581710"
              className="mt-2 inline-block text-primary text-xl font-bold hover:underline"
            >
              (209) 358-1710
            </a>
          </div>

          {/* Email */}
          <div
            className={`bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 text-center hover:-translate-y-1 ${
              obs.isVisible ? "animate-fade-in-up delay-200" : "opacity-0"
            }`}
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
            </div>
            <h4 className="mt-5 text-lg font-bold text-foreground">Email</h4>
            <a
              href="mailto:centralvalleydisposal@comcast.net"
              className="mt-2 inline-block text-primary font-semibold hover:underline text-[15px] break-all"
            >
              centralvalleydisposal@comcast.net
            </a>
          </div>

          {/* Address */}
          <div
            className={`bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 text-center hover:-translate-y-1 ${
              obs.isVisible ? "animate-fade-in-up delay-300" : "opacity-0"
            }`}
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
            </div>
            <h4 className="mt-5 text-lg font-bold text-foreground">Address</h4>
            <p className="mt-2 text-muted font-medium">
              3218 N Buhach Rd<br />
              Atwater, California 95301
            </p>
          </div>
        </div>

        {/* Business Hours */}
        <div
          className={`mt-10 max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-card text-center ${
            obs.isVisible ? "animate-fade-in-up delay-400" : "opacity-0"
          }`}
        >
          <h4 className="text-lg font-bold text-foreground mb-4">Business Hours</h4>
          <div className="space-y-2 text-muted">
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
          <p className="mt-5 text-sm text-muted">
            Accepting Check, Cash, and Credit Card with Service Fee for Payment.
          </p>
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
    <footer className="bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold tracking-tight">Central Valley</span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
                Disposal
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              Family-owned since 1985. Reliable roll-off dumpster rentals proudly serving Merced
              County, California.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Quick Links
            </h5>
            <div className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "Roll-Off Dumpster Services", href: "/roll-off-dumpster-services" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((l) =>
                l.href.startsWith("/") ? (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    className="block text-blue-200/70 hover:text-white transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Contact Info
            </h5>
            <div className="space-y-3 text-sm text-gray-400">
              <a href="tel:2093581710" className="block hover:text-white transition-colors">
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
          <p className="text-gray-500 text-xs">
            We service Merced County, excluding the city limits of Merced, Los Banos, Dos Palos and
            Livingston.
          </p>
          <p className="mt-3 text-gray-500/60 text-xs">
            &copy; {new Date().getFullYear()} Central Valley Disposal. All rights reserved.{" "}
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>{" "}
            |{" "}
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function Home() {
  return (
    <main>
      {/* <TopBar /> */}
      <Navbar />
      <Hero />
      <Intro />
      <Process />
      <Services />
      <RestrictedItems />
      <IdealFor />
      <WhyUs />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
