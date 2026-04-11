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
   TOP BAR — Call Us
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
      className={`fixed  top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
   PAGE HERO
   ═══════════════════════════════════════════════════ */
function PageHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/image2.png"
          alt="Roll-off dumpster being hauled by Central Valley Disposal truck"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/90 via-[#0f1d3a]/82 to-[#1a1a2e]/82" />
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
            <span className="text-sm text-gray-200 font-medium">
              Serving Merced County Since 1985
            </span>
          </div>

          <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
            Roll-Off Dumpster
            <br />
            <span className="text-white">Services</span>
          </h1>

          <p className="animate-fade-in-up delay-200 mt-6 text-lg md:text-xl text-gray-200/90 max-w-xl leading-relaxed">
            Dependable roll-off dumpsters for every project type. Managing debris
            shouldn&apos;t complicate your project timeline.
          </p>

          <div className="animate-fade-in-up delay-400 mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="tel:2093581710"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Call for Pricing
            </a>
            <a
              href="#dumpster-sizes"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              View Dumpster Sizes
            </a>
          </div>
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
   INTRO
   ═══════════════════════════════════════════════════ */
function Intro() {
  const obs = useInView();
  return (
    <section className="py-20 md:py-28 bg-white">
      <div
        ref={obs.ref}
        className={`max-w-4xl mx-auto px-5 md:px-8 text-center ${
          obs.isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
          Dependable Roll-Off Dumpsters for{" "}
          <span className="gradient-text">Every Project Type</span>
        </h2>
        <p className="mt-6 text-muted text-[17px] leading-relaxed max-w-3xl mx-auto">
          At Central Valley Disposal, we provide reliable roll-off dumpster rentals across
          Merced County, CA. We support homeowners, contractors, landscapers, and businesses
          with fast, efficient waste removal. Whether you&apos;re tackling a household cleanout
          or running a multi-phase construction job, our dumpsters offer the strength, capacity,
          and convenience you need. For scheduling and availability, call{" "}
          <a href="tel:2093581710" className="text-primary font-semibold hover:underline">
            (209) 358-1710
          </a>{" "}
          today.
        </p>
        <a
          href="tel:2093581710"
          className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
        >
          Contact Us Today
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   DUMPSTER SIZES
   ═══════════════════════════════════════════════════ */
function DumpsterSizes() {
  const obs = useInView();

  const sizes = [
    {
      yard: "15",
      loads: "Approx. 5 pickup loads",
      dimensions: '12\'L x 8\'W x 3\'5"H',
      bestUse: "Heavy materials like concrete and asphalt",
      image: "/15yard.png",
      gradient: "from-[#8b1a1a] to-[#0a1628]",
      glowColor: "rgba(139, 26, 26, 0.3)",
      tag: "Compact",
    },
    {
      yard: "20",
      loads: "Approx. 8 pickup loads",
      dimensions: "18'L x 8'W x 4'H",
      bestUse:
        "Ideal for heavy-debris home clean-outs and remodeling cleanup",
      image: "/20yard.png",
      gradient: "from-[#a52222] to-[#0f1d3a]",
      glowColor: "rgba(165, 34, 34, 0.3)",
      tag: "Popular",
    },
    {
      yard: "30",
      loads: "Approx. 14 pickup loads",
      dimensions: "20'L x 8'W x 6'H",
      bestUse:
        "Ideal for office or large home renovation projects or junk removal",
      image: "/30yard.png",
      gradient: "from-[#6b1414] to-[#12243d]",
      glowColor: "rgba(107, 20, 20, 0.3)",
      tag: "Large",
    },
    {
      yard: "40",
      loads: "Approx. 16 pickup loads",
      dimensions: "22'L x 8'W x 8'H",
      bestUse: "Ideal for large construction & remodeling projects",
      image: "/40yard.png",
      gradient: "from-[#0a1628] to-[#8b1a1a]",
      glowColor: "rgba(10, 22, 40, 0.3)",
      tag: "Max Capacity",
    },
  ];

  return (
    <section
      id="dumpster-sizes"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f5f5f7 0%, #edeef2 50%, #f5f5f7 100%)",
      }}
    >
      {/* Subtle decorative elements */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #8b1a1a 0%, transparent 70%)",
        }}
      />

      <div ref={obs.ref} className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-20 ${
            obs.isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-primary mb-5 bg-primary/8 px-5 py-2 rounded-full border border-primary/10">
            Dumpster Sizes
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            Choose the Right Size for{" "}
            <span className="gradient-text">Your Project</span>
          </h2>
          <p className="mt-5 text-muted text-lg md:text-xl leading-relaxed">
            From small cleanups to large construction sites — we have a container
            to match.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {sizes.map((s, i) => (
            <div
              key={s.yard}
              className={`group relative ${
                obs.isVisible
                  ? `animate-fade-in-up delay-${(i + 1) * 100}`
                  : "opacity-0"
              }`}
            >
              {/* Glow effect behind card */}
              <div
                className="absolute -inset-1 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
                style={{ background: s.glowColor }}
              />

              {/* Card */}
              <div
                className="relative h-full bg-white rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 flex flex-col"
                style={{
                  boxShadow:
                    "0 1px 3px rgba(10,22,40,0.04), 0 8px 32px rgba(10,22,40,0.08), 0 24px 60px rgba(10,22,40,0.04)",
                }}
              >
                {/* Gradient border top */}
                <div
                  className={`h-1.5 bg-gradient-to-r ${s.gradient}`}
                />

                {/* Shimmer effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s ease-in-out infinite",
                  }}
                />

                {/* Image section — top */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center px-5 pt-8 pb-5">
                  {/* Tag */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white bg-gradient-to-r ${s.gradient} shadow-lg z-10`}
                  >
                    {s.tag}
                  </div>

                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={s.image}
                      alt={`${s.yard} Yard Dumpster with dimensions`}
                      fill
                      className="object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* Content section — bottom */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Size header */}
                  <div className="text-center mb-4">
                    <div className="flex items-baseline justify-center gap-1.5">
                      <span
                        className="text-5xl font-black tracking-tight bg-clip-text text-transparent"
                        style={{
                          backgroundImage: "linear-gradient(135deg, #0a1628, #8b1a1a)",
                        }}
                      >
                        {s.yard}
                      </span>
                      <span className="text-base font-bold text-foreground/60 uppercase tracking-wide">
                        Yard
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-muted uppercase tracking-wider mt-0.5">
                      Roll-Off Dumpster
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 flex-1">
                    <div className="bg-surface/70 rounded-xl px-4 py-3 border border-border/40">
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted/70 mb-0.5">
                        Capacity
                      </div>
                      <div className="text-foreground font-semibold text-[14px]">
                        {s.loads}
                      </div>
                    </div>

                    <div className="bg-surface/70 rounded-xl px-4 py-3 border border-border/40">
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted/70 mb-0.5">
                        Dimensions
                      </div>
                      <div className="text-foreground font-semibold text-[14px]">
                        {s.dimensions}
                      </div>
                    </div>

                    <div className="bg-surface/70 rounded-xl px-4 py-3 border border-border/40">
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted/70 mb-0.5">
                        Best For
                      </div>
                      <div className="text-muted text-[13px] leading-relaxed">
                        {s.bestUse}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="tel:2093581710"
                    className={`mt-5 block w-full text-center px-5 py-3.5 rounded-xl bg-gradient-to-r ${s.gradient} text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 relative overflow-hidden`}
                  >
                    <span className="relative z-10">
                      Call for {s.yard}-Yard Quote
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICE CATEGORIES
   ═══════════════════════════════════════════════════ */
function ServiceCategories() {
  const obs = useInView();

  const categories = [
    {
      title: "Dumpster Rentals for Household Cleanouts",
      desc: "A roll-off dumpster streamlines household cleanouts by giving you ample space to remove clutter quickly and safely. With convenient placement, flexible loading time, and room for bulky debris, it helps you stay organized and complete your cleanup with ease.",
      subtitle: "When Our Dumpsters Work Best",
      items: [
        "Furniture removal",
        "Garage, attic, or basement clearing",
        "Pre-move decluttering",
        "Estate cleanouts",
        "Seasonal cleaning",
        "Disposing of broken or outdated items",
      ],
      image: "/image5.png",
    },
    {
      title: "Dumpsters for Demolition Projects",
      desc: "Our dumpsters provide strong, reliable containment for heavy demolition debris while keeping job sites safer, cleaner, and more organized.",
      subtitle: "Materials Commonly Loaded in Our Dumpsters",
      items: [
        "Drywall and plaster",
        "Wood, studs, and framing",
        "Flooring and subfloor",
        "Roofing materials",
        "Tile, fixtures, and trim",
        "Non-hazardous construction debris",
      ],
      image: "/image2.png",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8 space-y-20">
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
              obs.isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${idx * 200}ms` }}
          >
            {/* Text — alternating order */}
            <div className={idx % 2 === 1 ? "md:order-2" : ""}>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                {cat.title}
              </h2>
              <p className="mt-4 text-muted text-[16px] leading-relaxed">
                {cat.desc}
              </p>
              <h4 className="mt-6 text-sm font-bold uppercase tracking-wider text-primary">
                {cat.subtitle}
              </h4>
              <div className="mt-4 space-y-2.5">
                {cat.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-surface rounded-xl px-4 py-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className={idx % 2 === 1 ? "md:order-1" : ""}>
              <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={700}
                  height={470}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   BUILDERS + LANDSCAPING
   ═══════════════════════════════════════════════════ */
function BuildersAndLandscaping() {
  const obs = useInView();

  return (
    <section className="py-20 md:py-28 bg-gradient-blue-subtle">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8 space-y-16">
        {/* Builders */}
        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
            obs.isVisible ? "animate-slide-left" : "opacity-0"
          }`}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
            <Image
              src="/image3.png"
              alt="Dumpster for builders and contractors"
              width={700}
              height={470}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
          </div>
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              For Contractors
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
              Dumpsters for Builders and Contractors
            </h2>
            <p className="mt-4 text-muted text-[16px] leading-relaxed">
              Construction crews rely on our dumpsters to keep job sites clean,
              safe, and efficient for new builds, remodels, additions, commercial
              projects, and more. Our durable containers handle rugged debris and
              scale to any workload, helping maintain steady workflow, safer
              conditions, and a professional site throughout every phase of the
              project.
            </p>
          </div>
        </div>

        {/* Landscaping */}
        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
            obs.isVisible ? "animate-slide-right delay-200" : "opacity-0"
          }`}
        >
          <div className="md:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
              <Image
                src="/image4.png"
                alt="Dumpster for landscaping projects"
                width={700}
                height={470}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
          </div>
          <div className="md:order-1">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              Outdoor Projects
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
              Dumpsters for Landscaping and Home Improvement
            </h2>
            <p className="mt-4 text-muted text-[16px] leading-relaxed">
              Outdoor projects create debris fast, and our dumpsters make it easy
              to manage without constant dump trips. From branches and shrubs to
              soil, sod, fencing, and renovation debris, we handle it all. Our
              containers help keep your workspace clean, speed up debris removal,
              and make bulky materials easier to manage. It&apos;s a simple way to
              keep any landscaping project on track.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   DEBRIS OPTIONS
   ═══════════════════════════════════════════════════ */
function DebrisOptions() {
  const obs = useInView();

  const options = [
    {
      title: "Heavy Material Disposal",
      desc: "Heavy debris like concrete, asphalt, soil, and stone need the right dumpster for safe hauling. Tell us what you're disposing of, and we'll match you with the proper container to prevent overweight issues and ensure smooth transport.",
    },
    {
      title: "Recyclable Material Loads",
      desc: "Some projects generate clean recyclables such as metal, cardboard, clean concrete, clean soil, or select construction materials. When possible, we offer options to separate these loads, helping reduce landfill waste and improve disposal efficiency.",
    },
    {
      title: "General Debris",
      desc: "For projects with miscellaneous household items, remodeling scraps, packaging, or non-hazardous debris, our dumpsters make cleanup easy. They're ideal for homeowners, contractors, property managers, and commercial sites.",
    },
    {
      title: "Mixed Debris",
      desc: "For projects containing mixed general debris, green waste, brush, wood, silage plastic, twine, rail-road ties, utility poles, and recyclable items, our mixed-waste dumpsters make cleanup easy without sorting for an additional tonnage fee.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${
            obs.isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
            Debris Types
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Options for Heavy, Recyclable, and{" "}
            <span className="gradient-text">Mixed Debris</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {options.map((opt, i) => (
            <div
              key={opt.title}
              className={`bg-surface rounded-2xl p-8 hover:bg-surface-alt transition-all duration-400 hover:-translate-y-1 shadow-sm hover:shadow-card ${
                obs.isVisible
                  ? `animate-fade-in-up delay-${(i + 1) * 100}`
                  : "opacity-0"
              }`}
            >
              <h3 className="text-xl font-bold text-foreground">{opt.title}</h3>
              <p className="mt-3 text-muted text-[15px] leading-relaxed">
                {opt.desc}
              </p>
            </div>
          ))}
        </div>

        <p
          className={`text-center mt-8 text-sm text-muted italic ${
            obs.isVisible ? "animate-fade-in delay-500" : "opacity-0"
          }`}
        >
          * Additional charge for tires, mattresses, and appliances.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   RESIDENTIAL & COMMERCIAL
   ═══════════════════════════════════════════════════ */
function ResidentialCommercial() {
  const obs = useInView();

  return (
    <section className="py-20 md:py-28 bg-gradient-blue-subtle">
      <div
        ref={obs.ref}
        className={`max-w-5xl mx-auto px-5 md:px-8 text-center ${
          obs.isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
          Residential &amp; Commercial
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
          Residential and Commercial{" "}
          <span className="gradient-text">Waste Management</span>
        </h2>
        <p className="mt-6 text-muted text-[17px] leading-relaxed max-w-3xl mx-auto">
          We proudly support properties of all sizes — from homes to commercial
          facilities — by providing dumpsters that reduce clutter, streamline
          workflow, and maintain safe, organized spaces. Our waste dumpster
          roll-off management services are relied on by homeowners, landscapers,
          remodeling contractors, property managers, retail stores, warehouses,
          and industrial facilities, making debris removal simple and efficient
          for a wide range of project needs.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════════════ */
function HowItWorks() {
  const obs = useInView();

  const steps = [
    {
      num: "01",
      title: "Choose Your Size",
      desc: "Select a dumpster size that fits your project's debris.",
    },
    {
      num: "02",
      title: "We Deliver",
      desc: "We deliver the dumpster to your property or job site.",
    },
    {
      num: "03",
      title: "You Fill It",
      desc: "You fill the container with approved materials at your pace.",
    },
    {
      num: "04",
      title: "We Haul It",
      desc: "We pick it up when you're done, hauling debris away safely.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
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
            How Our Roll-Off Dumpster{" "}
            <span className="gradient-text">Service Works</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`relative group bg-surface rounded-2xl p-8 hover:bg-white hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 ${
                obs.isVisible
                  ? `animate-fade-in-up delay-${(i + 1) * 100}`
                  : "opacity-0"
              }`}
            >
              <div className="text-5xl font-black text-primary/10 group-hover:text-primary/20 transition-colors duration-500">
                {step.num}
              </div>
              <h3 className="mt-2 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-muted text-[15px] leading-relaxed">
                {step.desc}
              </p>
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
          Have questions about sizes or debris types? Our team is ready to help.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CTA — You Fill 'Em
   ═══════════════════════════════════════════════════ */
function CTABanner() {
  const obs = useInView();

  return (
    <section className="py-20 md:py-28 bg-gradient-blue-subtle">
      <div ref={obs.ref} className="max-w-5xl mx-auto px-5 md:px-8">
        <div
          className={`relative rounded-3xl overflow-hidden ${
            obs.isVisible ? "animate-scale-in" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0">
            <Image
              src="/image.png"
              alt="Central Valley Disposal truck"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/92 via-[#0f1d3a]/87 to-[#1a1a2e]/82" />
          </div>

          <div className="relative z-10 text-center py-16 md:py-24 px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              You Fill &rsquo;Em,
              <br />
              We Haul &rsquo;Em!
            </h2>
            <p className="mt-6 text-gray-200 text-lg max-w-2xl mx-auto">
              No matter the size or complexity of your project, Central Valley
              Disposal provides dependable roll-off dumpsters and responsive
              customer service.
            </p>
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
    "Over 35 years of industry experience",
    "Honest, competitive pricing",
    "Friendly, knowledgeable team",
    "Reliable delivery and pickup",
    "Clear communication throughout your rental",
  ];

  return (
    <section className="py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #12243d 100%)' }}>
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-14 ${
            obs.isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-red-300 mb-4 bg-white/10 px-4 py-1.5 rounded-full">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Why Choose Central Valley Disposal for Dumpster Rentals
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
          {reasons.map((r, i) => (
            <div
              key={r}
              className={`bg-white/8 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-500 hover:-translate-y-1 ${
                obs.isVisible
                  ? `animate-scale-in delay-${(i + 1) * 100}`
                  : "opacity-0"
              }`}
            >
              <p className="text-white font-semibold text-[16px]">{r}</p>
            </div>
          ))}
        </div>

        <p
          className={`text-center mt-10 text-blue-200/70 text-sm ${
            obs.isVisible ? "animate-fade-in delay-600" : "opacity-0"
          }`}
        >
          We service Merced County, excluding the city limits of Merced, Los
          Banos, Dos Palos and Livingston.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════════════ */
function FinalCTA() {
  const obs = useInView();

  return (
    <section className="py-20 md:py-28 bg-white">
      <div
        ref={obs.ref}
        className={`max-w-4xl mx-auto px-5 md:px-8 text-center ${
          obs.isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
          Schedule Your Dumpster With a{" "}
          <span className="gradient-text">Team You Can Trust</span>
        </h2>
        <p className="mt-6 text-muted text-[17px] leading-relaxed max-w-2xl mx-auto">
          No matter the size or complexity of your project, Central Valley
          Disposal provides dependable roll-off dumpsters and responsive customer
          service. Call{" "}
          <a
            href="tel:2093581710"
            className="text-primary font-semibold hover:underline"
          >
            (209) 358-1710
          </a>{" "}
          today to secure the right container for your cleanup or construction
          needs.
        </p>
        <a
          href="tel:2093581710"
          className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-card hover:shadow-card-hover hover:-translate-y-0.5"
        >
          Contact Us Today
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════ */
function Contact() {
  const obs = useInView();

  return (
    <section id="contact-services" className="py-20 md:py-28 bg-gradient-blue-subtle">
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
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
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
              3218 N Buhach Rd
              <br />
              Atwater, California 95301
            </p>
          </div>
        </div>

        <div
          className={`mt-10 max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-card text-center ${
            obs.isVisible ? "animate-fade-in-up delay-400" : "opacity-0"
          }`}
        >
          <h4 className="text-lg font-bold text-foreground mb-4">
            Business Hours
          </h4>
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
          <div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold tracking-tight">
                Central Valley
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
                Disposal
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              Family-owned since 1985. Reliable roll-off dumpster rentals proudly
              serving Merced County, California.
            </p>
          </div>

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
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">
              Contact Info
            </h5>
            <div className="space-y-3 text-sm text-gray-400">
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
          <p className="mt-3 text-gray-500/60 text-xs">
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
export default function RollOffDumpsterServicesPage() {
  return (
    <main>
      {/* <TopBar /> */}
      <Navbar />
      <PageHero />
      <Intro />
      <DumpsterSizes />
      <ServiceCategories />
      <BuildersAndLandscaping />
      <DebrisOptions />
      <ResidentialCommercial />
      <HowItWorks />
      <CTABanner />
      <WhyUs />
      <FinalCTA />
      <Contact />
      <Footer />
    </main>
  );
}
