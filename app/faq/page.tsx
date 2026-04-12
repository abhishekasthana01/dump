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
            className=" px-5 py-2 lg:hidden ml-20 rounded-lg bg-primary text-white text-center font-semibold hover:bg-primary-dark transition-colors"
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
   HERO
   ═══════════════════════════════════════════════════ */
function FAQHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/image3.png"
          alt="Central Valley Disposal truck at work"
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
              Frequently Asked Questions
            </span>
          </div>

          <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
            Everything You Need
            <br />
            <span className="text-white">to Know</span>
          </h1>

          <p className="animate-fade-in-up delay-200 mt-6 text-lg md:text-xl text-gray-200/90 max-w-xl leading-relaxed">
            Renting a dumpster can bring up questions about size, pricing,
            placement, and what materials are allowed. We&apos;ve got answers.
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
   FAQ INTRO
   ═══════════════════════════════════════════════════ */
function FAQIntro() {
  const obs = useInView();

  return (
    <section className="py-16 md:py-20 bg-white">
      <div
        ref={obs.ref}
        className={`max-w-4xl mx-auto px-5 md:px-8 text-center ${
          obs.isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
          Everything You Need to Know About{" "}
          <span className="gradient-text">Renting a Dumpster</span>
        </h2>
        <p className="mt-6 text-muted text-[17px] leading-relaxed max-w-3xl mx-auto">
          Renting a dumpster can bring up questions about size, pricing,
          placement, and what materials are allowed. To make your cleanup easier,
          we&apos;ve gathered helpful answers to what customers in Merced County,
          CA ask most. For personal guidance, call{" "}
          <a
            href="tel:2093581710"
            className="text-primary font-semibold hover:underline"
          >
            (209) 358-1710
          </a>
          , and our team will help you choose the right container.
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
   ACCORDION ITEM
   ═══════════════════════════════════════════════════ */
function AccordionItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-400 overflow-hidden ${
        isOpen ? "ring-2 ring-primary/20" : ""
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-7 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-4 pr-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
            {index + 1}
          </span>
          <span className="text-[16px] md:text-[17px] font-semibold text-foreground group-hover:text-primary transition-colors">
            {question}
          </span>
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full bg-surface flex items-center justify-center transition-all duration-300 ${
            isOpen ? "bg-primary rotate-45" : "group-hover:bg-primary/10"
          }`}
        >
          <span
            className={`text-xl font-light leading-none ${
              isOpen ? "text-white" : "text-primary"
            }`}
          >
            +
          </span>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-7 pb-6">
          <p className="text-muted text-[15px] leading-relaxed ml-12">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ LIST
   ═══════════════════════════════════════════════════ */
function FAQList() {
  const obs = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqsLeft = [
    {
      q: "What Dumpster Size Should I Choose?",
      a: "The right size depends on your project. Smaller home cleanouts require less space, while construction, demolition, or landscaping jobs may need larger containers. Tell us what you're removing, and we'll recommend the best option.",
    },
    {
      q: "How Long Can I Keep the Dumpster?",
      a: "You can keep the dumpster long enough to finish your cleanup without rushing. We offer 7 days free of rental. After 7 days, there is a rental fee per day. We do not automatically pick up the dumpster until you inform us that the job is complete. Call us to discuss availability that fits your timeline.",
    },
    {
      q: "What Items Are Not Allowed in the Dumpster?",
      a: "We cannot accept TVs, computer monitors, hazardous materials, paint with liquid, flammable liquids, batteries, fluorescent bulbs or chemicals. If you're unsure about an item, we're happy to help you confirm.",
    },
    {
      q: "How Does Delivery and Pickup Work?",
      a: "We drop the dumpster at your home, business, or job site in a convenient location. Once you're done, just let us know—we'll return for pickup and haul everything away.",
    },
    {
      q: "Do I Need to Be Home for Delivery or Pickup?",
      a: "Not always. As long as the deposit, signed contract, and placement details are confirmed beforehand, our team can deliver or pick up the dumpster without anyone present.",
    },
    {
      q: "What Happens If I Fill the Dumpster Too High?",
      a: "For safety, dumpsters must be level-loaded, equal with the side of the dumpster. To avoid trip charges, remove overloaded excessive debris before pick up. We can offer tips on loading efficiently.",
    },
    {
      q: "Can I Mix Different Types of Debris Together?",
      a: "Yes, debris can be mixed together for an additional fee. Heavy items must be kept separate such as large amounts of concrete or dirt for safe and proper disposal. Tell us what you have, and we'll match you with the right container at the right price. Additional charges for tires, mattresses, and appliances.",
    },
  ];

  const faqsRight = [
    {
      q: "How Much Does It Cost to Rent a Dumpster?",
      a: "Pricing depends on dumpster size, debris type, and rental duration. We offer competitive, transparent rates. Call (209) 358-1710 for a project-based quote.",
    },
    {
      q: "Do You Provide Dumpster Rentals for Businesses?",
      a: "Yes. We support contractors, landscapers, property managers, retail stores, warehouses, industrial sites, and more with reliable debris removal.",
    },
    {
      q: "Where Can the Dumpster Be Placed?",
      a: "Driveways, street curb, backyard accessible, parking areas, job-site clearings, and flat stable surfaces are all good options. We'll help you choose a safe, accessible placement.",
    },
    {
      q: "How Should I Prepare for Delivery?",
      a: "Clear the area of vehicles, equipment, or obstacles. Open gates if needed and ensure the drop-off location is accessible.",
    },
    {
      q: "Can I Schedule a Dumpster on Short Notice?",
      a: "Availability varies day by day. Call us to check open slots—our team will do everything possible to meet your timeline.",
    },
    {
      q: "How Do I Know If a Dumpster Is Right for My Cleanup?",
      a: "If your project produces more waste than normal trash service can handle—such as furniture, construction debris, yard waste, or heavy materials—a roll-off dumpster is the ideal solution.",
    },
    {
      q: "Do I Need a Permit for a Dumpster?",
      a: "Most residential driveways do not require a permit, but street placement or certain commercial areas may. Check with your local municipality, or call us and we can help you determine if a permit is needed.",
    },
    {
      q: "Can the Dumpster Damage My Driveway?",
      a: "Dumpsters are heavy, especially when filled, but damage is uncommon. To protect your surface, we recommend placing wood boards or protective material under the container. Our team can advise you on proper placement to avoid issues.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-blue-subtle">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {/* Left column */}
          <div className="space-y-4">
            {faqsLeft.map((faq, i) => (
              <div
                key={faq.q}
                className={obs.isVisible ? "animate-fade-in-up" : "opacity-0"}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <AccordionItem
                  question={faq.q}
                  answer={faq.a}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                />
              </div>
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {faqsRight.map((faq, i) => {
              const globalIdx = faqsLeft.length + i;
              return (
                <div
                  key={faq.q}
                  className={obs.isVisible ? "animate-fade-in-up" : "opacity-0"}
                  style={{ animationDelay: `${(i + faqsLeft.length) * 60}ms` }}
                >
                  <AccordionItem
                    question={faq.q}
                    answer={faq.a}
                    index={globalIdx}
                    isOpen={openIndex === globalIdx}
                    onToggle={() =>
                      setOpenIndex(openIndex === globalIdx ? null : globalIdx)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
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
              Call Us Today for Availability
              <br />
              and Expert Guidance
            </h2>
            <p className="mt-6 text-gray-200 text-lg max-w-2xl mx-auto">
              Our team is here to make your cleanup simple and stress-free.
              Contact Central Valley Disposal to get the right dumpster for your
              project.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:2093581710"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Call (209) 358-1710
              </a>
              <a
                href="mailto:centralvalleydisposal@comcast.net"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════ */
function ContactSection() {
  const obs = useInView();

  return (
    <section className="py-20 md:py-28 bg-gradient-blue-subtle">
      <div ref={obs.ref} className="max-w-7xl mx-auto px-5 md:px-8">
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
export default function FAQPage() {
  return (
    <main>
      {/* <TopBar /> */}
      <Navbar />
      <FAQHero />
      <FAQIntro />
      <FAQList />
      <FinalCTA />
      <ContactSection />
      <Footer />
    </main>
  );
}
