import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  Heart,
  Shield,
  Users,
  Sparkles,
  Building2,
  Stethoscope,
  Umbrella,
  Check,
  Star,
  Zap,
  Flame,
  Ship,
  Motorbike
} from "lucide-react";
import careImg from "../assets/careImg.jpg";
import familyImg from "../assets/familyImg.jpg";
import businessImg from "../assets/businessImg.jpg";
import { Rotator, Counter } from "../components/dynamic-bits";
import { Navbar } from "../components/Navbar";
import { useReveal } from "../hooks/useReveal";
import Footer from "../components/Footer";
const HeroScene = lazy(() => import("../components/HeroScene"));
import Adventz_logo from "../assets/Comp/Adventz.jpg";
import Farmhub_logo from "../assets/Comp/Farmhub.jpg";
import GSMA_logo from "../assets/Comp/GSMA.jpg";
import JaiKisan_logo from "../assets/Comp/JaiKisaaan.jpg";
import MCFL_logo from "../assets/Comp/MCFL.jpg";
import Nymwac_logo from "../assets/Comp/Nymwac.jpg";
import Simon_logo from "../assets/Comp/Simon_India.jpg";
import Snackpure from "../assets/Comp/Snackpure.jpg";
import Stylespa from "../assets/Comp/Stylespa.jpg";
import Taxmaco_logo from "../assets/Comp/Taxmaco_Rail.jpg";
import Zuari_Envien from "../assets/Comp/Zuari_Envien.jpg";
import Zuari_Furniture from "../assets/Comp/Zuari_Furniture.jpg";
import Zuari_GardernCity from "../assets/Comp/Zuari_GardenCity.jpg";
import Zuari_Industries from "../assets/Comp/Zuari_Industries.jpg";
import Zuari_Infraworld from "../assets/Comp/Zuari_Infraworld.jpg";
import Zuari_Money from "../assets/Comp/Zuari_Money.jpg";
import Zuari_Premium from "../assets/Comp/Zuari_Premium.jpg";
import Zuari_RainForest from "../assets/Comp/Zuari_RainForest.jpg";
import Zuari_IAV from "../assets/Comp/Zuari-IAV.jpg";
import Aditya_Birla_Logo from "../assets/Partners/Aditya_birla.webp";
import Aviva_logo from "../assets/Partners/aviva_logo.webp";
import Bgil_logo from "../assets/Partners/BGIL_logo.jpg";
import HDFC_Life from "../assets/Partners/HDFCLife.png";
import ICICI_Lombard from "../assets/Partners/icici_lombard_logo.jpg";
import ICICI_prudential from "../assets/Partners/Icici_prudential.png";
import Iffco_tokio from "../assets/Partners/Iffco_tokio.jpg";
import Magma_Logo from "../assets/Partners/Magma_Logo.svg";
import Nia from "../assets/Partners/NIA_logo.png";
import Oriental_Insure from "../assets/Partners/Oriental_insure.jpg";
import Royal_Sundaram from "../assets/Partners/rs_logo.png";
import TataAig from "../assets/Partners/TataAigLogo.svg";
import Zurich_logo from "../assets/Partners/zurich_logo.avif";
import Future_Generali from "../assets/Partners/Future_Generali.png";
import Induslnd_General from "../assets/Partners/Induslnd_General.png";



function RevealItem({ children, className = "", delay = 0, offset = 40 }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${offset}px)`,
        transition: `all 0.9s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const Homepage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { ref, visible } = useReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const logos = [
    {
      name: "Adventz Limited",
      url: Adventz_logo,
    },
    {
      name: "Farmhub",
      url: Farmhub_logo,
    },
    {
      name: "Zuari Management Services",
      url: GSMA_logo
    },
    {
      name: "Jai Kisan",
      url: JaiKisan_logo
    },
    {
      name: "Nymwac",
      url: Nymwac_logo
    },
    {
      name: "Simon India",
      url: Simon_logo
    },
    {
      name: "Snackpure",
      url: Snackpure
    },
    {
      name: "Stylespa",
      url: Stylespa
    },
    {
      name: "Taxmaco Rail",
      url: Taxmaco_logo
    },
    {
      name: "Zuari Envien",
      url: Zuari_Envien
    },
    {
      name: "Zuari Furniture",
      url: Zuari_Furniture
    },
    {
      name: "Zuari Garden City",
      url: Zuari_GardernCity
    },
    {
      name: "Zuari Industries",
      url: Zuari_Industries
    },
    {
      name: "Zuari Infraworld",
      url: Zuari_Infraworld
    },
    {
      name: "Zuari Money",
      url: Zuari_Money
    },
    {
      name: "Zuari Premium",
      url: Zuari_Premium
    },
    {
      name: "Zuari Rain Forest",
      url: Zuari_RainForest
    },
    {
      name: "Zuari IAV",
      url: Zuari_IAV
    }
  ];
  const Partners = [
    {
      name: "Aditya_Birla_Logo",
      url: Aditya_Birla_Logo
    },
    {
      name: "Aviva_logo",
      url: Aviva_logo,
      height: "h-8", bg: "bg-white"
    },
    {
      name: "Bgil_logo",
      url: Bgil_logo  
    },
    {
      name: "HDFC_Life",
      url: HDFC_Life
    },
    { 
      name: "ICICI Lombard", 
      url: ICICI_Lombard, 
      height: "h-8", bg: "bg-black" 
    },
    {
      name: "ICICI_prudential",
      url: ICICI_prudential
    },
    {
      name: "Iffco_tokio",
      url: Iffco_tokio
    },
    {
      name: "Magma_Logo",
      url: Magma_Logo
    },
    {
      name: "Nia",
      url: Nia,
      bg: "bg-black"
    },
    {
      name: "Oriental_Insure",
      url: Oriental_Insure,
      bg: "bg-white"
    },
    {
      name: "Royal_Sundaram",
      url: Royal_Sundaram
    },
    {
      name: "TataAig",
      url: TataAig
    },
    {
      name: "Zurich_logo",
      url: Zurich_logo
    },
    {
      name: "Future_Generali",
      url: Future_Generali
    },
    {
      name: "Induslnd_General",
      url: Induslnd_General
    }

  ];

  const marqueeItems = Array(4).fill(logos).flat();
  const marqueePartners = Array(4).fill(Partners).flat();

  const Solutions = [
    {
      icon: Stethoscope,
      title: "Health",
      desc: "Comprehensive group medical cover with maternity, OPD, and mental wellness built in.",
      color: "bg-(--coral)/15 text-(--coral)",
    },
    {
      icon: Motorbike,
      title: "Motor",
      desc: "Comprehensive motor insurance for personal and commercial vehicles.",
      color: "bg-(--primary)/15 text-(--foreground)",
    },

    {
      icon: Users,
      title: "Liability",
      desc: "Third-party liability cover for directors, officers, and businesses.",
      color: "bg-(--sun)/40 text-(--foreground)",
    },
    {
      icon: Building2,
      title: "Engineering",
      desc: "Protection for construction projects and engineering assets.",
      color: "bg-(--teal)/15 text-(--teal)",
    },
    {
      icon: Flame,
      title: "Fire",
      desc: "Comprehensive fire insurance for buildings and contents.",
      color: "bg-(--sun)/40 text-(--coral)",
    },
    {
      icon: Ship,
      title: "Marine",
      desc: "Insurance for construction, machinery, and equipment — from fire to marine cargo.",
      color: "bg-(--teal)/15 text-(--teal)",
    },
    {
      icon: Users,
      title: "Miscellaneous",
      desc: "Tailored insurance solutions for unique business needs.",
      color: "bg-(--primary)/15 text-(--foreground)",
    },
    {
      icon: Heart,
      title: "Life",
      desc: "Financial safety net for every employee's family — instant onboarding, no medicals.",
      color: "bg-(--coral)/15 text-(--coral)",
    },
  ];

  const rows = [
    {
      badge: "For Employees",
      title: "A pocket-sized benefits companion.",
      body: "Every covered employee gets a modern app: instant e-cards, network hospital search, teleconsults, and cashless claim tracking.",
      bullets: [
        "24/7 doctor on chat",
        "Family enrollment",
        "Wellness credits & rewards",
      ],
      img: careImg,
      align: "left",
    },
    {
      badge: "For Families",
      title: "One umbrella for the people who matter most.",
      body: "Dependents, parents, and life partners — all covered under a single, portable plan that follows them anywhere in India.",
      bullets: [
        "Parents cover",
        "Pan-India cashless network",
        "Maternity & newborn included",
      ],
      img: familyImg,
      align: "right",
    },
    {
      badge: "For HR & Departments",
      title: "Dashboards, not spreadsheets.",
      body: "See enrollment, claims, and utilization in real-time. Add employees in bulk, download endorsements, and get renewal alerts before they matter.",
      bullets: [
        "Bulk onboarding",
        "Claims analytics",
        "HRMS integrations",
      ],
      img: businessImg,
      align: "left",
    },
  ];

  const items = [
    {
      q: "Onboarding 300 employees took a weekend. Claims that used to take weeks now settle in a day.",
      n: "Priya Menon",
      r: "Head of People, Northwind",
    },
    {
      q: "The dashboard alone saved our HR team 20 hours a month. But the humans behind it are the real product.",
      n: "Rahul Iyer",
      r: "COO, Vertex Labs",
    },
    {
      q: "We've had four claims this year. Every single one was closed without me lifting a finger.",
      n: "Ananya Rao",
      r: "Founder, Kite & Co",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    navigate(`/contact?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <div>
      <Navbar />

      <section className="hero-stage">
        <div className="hero-mesh" aria-hidden="true" />
        <div className="hero-grid-lines" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-6 pt-16 pb-24 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pt-24">
          <div className="animate-reveal">
            <span className="hero-badge">
              <Sparkles className="h-3.5 w-3.5" />
              IRDAI licensed insurance brokers
            </span>
            <h1 className="hero-title mt-6 font-display text-5xl leading-[1.05] tracking-tight md:text-7xl">
              Insurance your{" "}
              <Rotator words={["team", "family", "business", "future"]} />
              <br />
              actually deserves.
            </h1>
            <p className="hero-lede mt-6 max-w-lg text-lg">
              Zuari Insurance Brokers Limited provides motor, health, life and
              business insurance, with one advisor accountable from quote to claim.
            </p>

            <form className="mt-8 flex max-w-md flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Your email"
                className="hero-input w-full rounded-full px-5 py-3.5 text-sm outline-none transition"
              />
              <button type="submit" className="hero-cta group whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-semibold transition">
                <span className="flex items-center justify-center gap-1.5">
                  Contact Us
                  <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
                </span>
              </button>
            </form>

            <dl className="hero-stats">
              <div><dt>Insurer partners</dt><dd>15+</dd></div>
              <div><dt>Policy lines</dt><dd>Motor, health, life, marine</dd></div>
              <div><dt>Claims support</dt><dd>Dedicated desk</dd></div>
            </dl>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-glow" aria-hidden="true" />
            <Suspense fallback={null}><HeroScene variant="shield" /></Suspense>
            <div className="hero-chip hero-chip-a"><Shield className="h-4 w-4" /> Cover reviewed</div>
            <div className="hero-chip hero-chip-b"><Check className="h-4 w-4" /> Claim settled</div>
            <div className="hero-chip hero-chip-c"><Star className="h-4 w-4" /> Renewal on time</div>
          </div>
        </div>
      </section>

      <section className="border-y border-(--border)/60 bg-(--background)/60 py-8">
        <p className="mb-6 text-center text-md font-medium uppercase tracking-wider text-(--muted-foreground)">
          Trusted by companies
        </p>

        <div className="relative overflow-hidden">
          <div className="flex w-max shrink-0 animate-marquee">
            {marqueeItems.map((logo, i) => (
              <span
                key={i}
                className="mx-8 flex shrink-0 items-center whitespace-nowrap font-display text-2xl font-semibold text-(--foreground)/40"
              >
                {logo?.url ? (
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="h-10 w-24 object-contain md:h-12 md:w-28"
                  />
                ) : (
                  logo?.name
                )}
              </span>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-(--background) to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-(--background) to-transparent" />
        </div>
      </section>


      <section id="solutions" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-(--coral)">
              What we do
            </span>
            <h2 className="mt-2 max-w-2xl font-display text-4xl md:text-5xl">
              Insurance programs.
            </h2>
          </div>

        </div>

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          {Solutions.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className="group relative overflow-hidden rounded-3xl border border-(--border)/60 bg-(--card) p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-soft"
                style={{ animation: `reveal-up 0.7s ${i * 100}ms both` }}
              >
                 <Link
                  to="/solutions"
                  // className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-(--foreground)/80 transition group-hover:text-(--coral)"
                >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-grad-warm opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${it.color}`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm text-(--muted-foreground)">
                  {it.desc}
                </p>
                </Link>
                {/* <Link
                  to="/solutions"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-(--foreground)/80 transition group-hover:text-(--coral)"
                >
                  Learn more{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link> */}
              </div>
            );
          })}
        </div>
      </section>
      <section className="border-y border-(--border)/60 bg-(--background)/60 py-8">
        <p className="mb-6 text-center text-md font-medium uppercase tracking-wider text-(--muted-foreground)">
          Partners
        </p>

        <div className="relative overflow-hidden">
          <div className="flex w-max shrink-0 animate-marquee">
            {marqueePartners.map((Partners, i) => (
              <span
                key={i}
                className="mx-8 flex shrink-0 items-center whitespace-nowrap font-display text-2xl font-semibold text-(--foreground)/40"
              >
                {Partners?.url ? (
                  <span className={`inline-flex items-center justify-center ${Partners.bg || ""}`}>
                    <img
                      src={Partners.url}
                      alt={Partners.name}
                      className={`w-auto object-contain ${Partners.height || "h-10 md:h-12"}`}
                    />
                  </span>
                ) : (
                  Partners?.name
                )}
              </span>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-(--background) to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-(--background) to-transparent" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-24 px-6 py-24">
        {rows.map((row, i) => (
          <RevealItem
            key={row.title}
            className={`grid gap-12 md:grid-cols-2 md:items-center ${row.align === "right" ? "md:[&>*:first-child]:order-2" : ""}`}
            delay={i * 120}
          >
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-grad-cool opacity-20 blur-2xl animate-blob" />
              <div className="overflow-hidden rounded-4xl bg-(--card) shadow-soft">
                <img
                  src={row.img}
                  alt={row.title}
                  loading="lazy"
                  width={1000}
                  height={1200}
                  className="h-full md:h-[80vh] md:max-h-175 w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-(--secondary) px-3 py-1 text-xs font-semibold uppercase tracking-wider text-(--foreground)/70">
                <Zap className="h-3 w-3 text-(--coral)" />
                {row.badge}
              </span>
              <h3 className="mt-4 font-display text-4xl leading-tight md:text-5xl">
                {row.title}
              </h3>
              <p className="mt-4 text-lg text-(--muted-foreground)">
                {row.body}
              </p>
              <ul className="mt-6 space-y-3">
                {row.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--coral) text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-(--foreground)/80">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </section>

      <section className="relative overflow-hidden bg-grad-warm py-20">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-white blur-3xl animate-float-slow" />
          <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-teal blur-3xl animate-float" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center text-white">

          <h2 className="max-w-3xl font-display text-4xl md:text-6xl">
            Your Protection. <span className="italic"> Our Promise.</span>
          </h2>
          <p className="max-w-2xl text-white/90">
            From claim registration to settlement, we make the process straightforward, transparent, and hassle-free.
          </p>
          <Link
            to="/contact"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-(--foreground) shadow-soft transition hover:-translate-y-0.5"
          >
            Talk to a specialist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="max-w-2xl font-display text-4xl md:text-5xl">
            Loved by the teams that{" "}
            <span className="text-grad">wear the pager</span>.
          </h2>
          <div className="hidden items-center gap-1 md:flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-(--coral) text-(--coral)" />
            ))}
            <span className="ml-2 text-sm font-semibold">
              4.9 · 800+ reviews
            </span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <figure
              key={t.n}
              className="group relative overflow-hidden rounded-3xl border border-(--border)/60 bg-(--card) p-8 transition hover:-translate-y-1 hover:shadow-soft"
              style={{ animation: `reveal-up 0.7s ${i * 150}ms both` }}
            >
              <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-grad-cool opacity-0 blur-2xl transition-opacity group-hover:opacity-40" />
              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-(--coral) text-(--coral)"
                  />
                ))}
              </div>
              <blockquote className="font-display text-lg leading-snug">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-(--border)/60 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grad-warm font-semibold text-white">
                  {t.n.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.n}</p>
                  <p className="text-xs text-(--muted-foreground)">{t.r}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-(--primary) p-12 text-(--primary-foreground) md:p-20">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-grad-warm opacity-40 blur-3xl animate-blob" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal opacity-30 blur-3xl animate-float-slow" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Ready for Insurance</h2>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-(--foreground) shadow-soft transition hover:-translate-y-0.5"
              >
                Get in Touch
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
