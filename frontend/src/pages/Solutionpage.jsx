import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { Stethoscope, Umbrella, Users, Building2, Heart, Plane, ShieldCheck, Briefcase, ArrowRight, Check, Car, Home, GraduationCap, Scale, Boxes, HardHat, X } from "lucide-react";
import Footer from '../components/Footer';
import { Navbar } from '../components/Navbar';
const Solutionpage = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [selectedSolution, setSelectedSolution] = useState(null);

  const individualSolutions = [
    { icon: Stethoscope, title: "Health Insurance", desc: "Comprehensive medical cover tailored to you and your family.", features: ["Cashless hospitalization", "Pre & post hospitalization", "No-claim bonus"], color: "bg-(--coral)/15 text-(--coral)", details: "Choose from individual or family floater plans with sum insured options up to ₹1 Cr. Includes access to a 10,000+ hospital cashless network and coverage for daycare procedures." },
    { icon: Umbrella, title: "Term Life Insurance", desc: "Affordable financial security for your loved ones.", features: ["High cover, low premium", "Tax benefits", "Flexible payout options"], color: "bg-(--teal)/15 text-(--teal)", details: "Get life cover up to ₹5 Cr at a fraction of traditional plan costs. Premiums qualify for deductions under Section 80C, with payouts as lump sum, monthly income, or a mix of both." },
    { icon: Car, title: "Motor Insurance", desc: "Complete protection for your car or two-wheeler.", features: ["Own damage cover", "Third-party liability", "Zero depreciation add-on"], color: "bg-(--sun)/40 text-(--foreground)", details: "Covers accidental damage, theft, and third-party liability as per the Motor Vehicles Act. Add-ons like zero depreciation and engine protection keep claim payouts closer to full value." },
    { icon: Home, title: "Home Insurance", desc: "Safeguard your home and belongings from the unexpected.", features: ["Structure & contents cover", "Fire & natural calamities", "Burglary protection"], color: "bg-(--primary)/10 text-(--primary)", details: "Protects your home's structure and contents against fire, flood, earthquake, and burglary. Optional cover for jewellery, electronics, and rent for alternate accommodation during repairs." },
    { icon: Plane, title: "Travel Insurance", desc: "Stay covered on every trip, near or far.", features: ["Trip cancellation", "Medical emergencies abroad", "Lost baggage cover"], color: "bg-(--teal)/10 text-(--foreground)", details: "Available for single trips or annual multi-trip cover. Includes emergency medical evacuation, trip delay compensation, and 24/7 global assistance helpline." },
  ];

  const teamSolutions = [
    { icon: Heart, title: "Employee Wellness Solutions", desc: "Preventive health programs that keep teams thriving.", features: ["Annual health checks", "Mental wellness", "Fitness challenges"], color: "bg-(--coral)/15 text-(--coral)", details: "A structured wellness calendar covering annual diagnostics, mental health counselling sessions, and team fitness challenges — designed to reduce absenteeism and long-term claims costs." },
    { icon: Stethoscope, title: "Group Health Insurance", desc: "Cashless medical cover for employees and dependents.", features: ["10,000+ hospitals", "Maternity & OPD", "Day-one coverage"], color: "bg-(--teal)/15 text-(--teal)", details: "No waiting period for pre-existing conditions from day one of employment. Covers spouse, children, and optionally parents, with maternity and outpatient (OPD) benefits built in." },
    { icon: Umbrella, title: "Group Term Life Insurance", desc: "Financial protection for every employee's family.", features: ["Up to ₹5 Cr sum", "No medicals", "Instant onboarding"], color: "bg-(--sun)/40 text-(--foreground)", details: "Simplified underwriting means employees are covered from their first day without individual medical tests. Sum insured can be structured as a flat cover or a multiple of salary." },
    { icon: Users, title: "Group Personal Accident Cover", desc: "Worldwide accident protection with 24/7 support.", features: ["Global coverage", "Disability payouts", "Family benefit"], color: "bg-(--primary)/10 text-(--primary)", details: "Covers accidental death and permanent/partial disability anywhere in the world, including work travel. Optional extension to cover an employee's family at a nominal additional premium." },
    { icon: Check, title: "Claim Assistance", desc: "Seamless claim processing with dedicated support with 24/7 availability.", features: ["Dedicated claim handlers", "24/7 support", "Fast claim settlement"], color: "bg-(--teal)/10 text-(--foreground)", details: "Every enrolled company gets a named claims concierge who tracks each claim end-to-end, escalating directly with insurers to resolve disputes and speed up settlement timelines." },
  ];
  

  const businessSolutions = [
    { icon: ShieldCheck, title: "Cyber Insurance", desc: "Defense against ransomware, breaches and lawsuits.", features: ["Incident response", "Ransom cover", "Regulatory fines"], color: "bg-(--coral)/15 text-(--coral)", details: "Covers costs of forensic investigation, data breach notification, ransom negotiation, and third-party lawsuits arising from a cyber incident, including regulatory fines where insurable by law." },
    { icon: Briefcase, title: "Directors' & Officers' Insurance", desc: "Personal liability cover for founders and executives.", features: ["Investor mandated", "Legal defense", "EPL cover"], color: "bg-(--teal)/15 text-(--teal)", details: "Protects personal assets of directors and officers against claims of mismanagement, often a prerequisite for investors before closing a funding round. Includes employment practices liability (EPL) cover." },
    { icon: Scale, title: "Commercial General Liability", desc: "Third-party bodily injury and property damage cover.", features: ["Premises liability", "Product liability", "Legal costs"], color: "bg-(--sun)/40 text-(--foreground)", details: "Covers legal liability if a third party is injured on your premises or by your product, including associated legal defense costs — a common requirement in commercial leases and vendor contracts." },
    { icon: Boxes, title: "Asset Insurance", desc: "Cover for offices, equipment, and inventory.", features: ["Fire & perils", "Machinery breakdown", "Business interruption"], color: "bg-(--primary)/10 text-(--primary)", details: "Protects physical assets — office equipment, machinery, and stock — against fire, theft, and natural perils, with optional business interruption cover for lost income during downtime." },
    { icon: HardHat, title: "Workmen Compensation Policy", desc: "Statutory cover for workplace injuries and claims.", features: ["Statutory compliance", "Medical expenses", "Disability benefit"], color: "bg-(--coral)/15 text-(--coral)", details: "Meets statutory obligations under the Employee Compensation Act, covering medical expenses, disability benefits, and compensation payouts for workplace injuries or death." },
    { icon: Building2, title: "Business Property", desc: "End-to-end protection for your physical premises.", features: ["Building cover", "Contents cover", "Rent loss"], color: "bg-(--teal)/15 text-(--teal)", details: "Covers the building structure and its contents against fire, natural disasters, and vandalism, with rent-loss cover to offset income if the premises become temporarily unusable." },
  ];

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-2">
        <div className="relative overflow-hidden rounded-4xl bg-grad-cool p-12 md:p-20 )">
          <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-coral opacity-30 blur-3xl animate-blob" />
          <div className="relative text-(--cream) w-full">
            <h1 className="mt-4 font-display text-5xl md:text-6xl text-center w-full">Your Business Our Commitment.</h1>
          </div>
        </div>

        <section className="mt-8 mx-auto max-w-sm px-6 py-10">
          <div className="rounded-4xl bg-(--primary) py-6 px-2  text-(--primary-foreground)">
            <h2 className="text-4xl text-center">Individual</h2>
          </div>
        </section>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {individualSolutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                onClick={() => setSelectedSolution(s)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedSolution(s);
                }}
                className="group relative overflow-hidden rounded-3xl border border-(--border)/60 bg-(--card) p-6 transition hover:-translate-y-1 hover:shadow-soft cursor-pointer"
                style={{ animation: `reveal-up 0.6s ${i * 80}ms both` }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-grad-warm opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${s.color}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>

              </div>
            );
          })}
        </div>

        

        <section className="mt-8 mx-auto max-w-sm px-6 py-10">
          <div className="rounded-4xl bg-(--primary) py-6 px-2  text-(--primary-foreground)">
            <h2 className="text-4xl text-center">For Your Team</h2>
          </div>
        </section>

        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5">
          {teamSolutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                onClick={() => setSelectedSolution(s)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedSolution(s);
                }}
                className="group relative overflow-hidden rounded-3xl border border-(--border)/60 bg-(--card) p-6 transition hover:-translate-y-1 hover:shadow-soft cursor-pointer"
                style={{ animation: `reveal-up 0.6s ${i * 80}ms both` }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-grad-warm opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${s.color}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>

              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">

        <section className="mt-8 mx-auto max-w-sm px-6 py-10">
          <div className="rounded-4xl bg-(--primary) py-6 px-2  text-(--primary-foreground)">
            <h2 className="text-4xl text-center">For Your Business</h2>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {businessSolutions.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                onClick={() => setSelectedSolution(s)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedSolution(s);
                }}
                className="group relative overflow-hidden rounded-3xl border border-(--border)/60 bg-(--card) p-6 transition hover:-translate-y-1 hover:shadow-soft cursor-pointer"
                style={{ animation: `reveal-up 0.6s ${i * 80}ms both` }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-grad-warm opacity-0 blur-2xl transition-opacity group-hover:opacity-30" />
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${s.color}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--coral)" strokeWidth={3} />
                      <span className="text-(--foreground)/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10  text-center  ">

          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-(--foreground) px-6 py-3 text-sm font-semibold text-(--cream) transition hover:-translate-y-0.5">
            Book a call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {selectedSolution && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-(--foreground)/40 p-4 backdrop-blur-sm animate-reveal"
          onClick={() => setSelectedSolution(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-(--border)/60 bg-(--card) p-8 shadow-soft"
          >
            <button
              onClick={() => setSelectedSolution(null)}
              className="absolute right-4 top-4 rounded-full bg-(--foreground) p-1.5 text-(--background) transition hover:opacity-80"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {(() => {
              const SolutionIcon = selectedSolution.icon;
              return (
                <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${selectedSolution.color}`}>
                  <SolutionIcon className="h-7 w-7" />
                </span>
              );
            })()}

            <h3 className="mt-5 font-display text-3xl">{selectedSolution.title}</h3>
            <p className="mt-3 text-(--muted-foreground)">{selectedSolution.desc}</p>

            {selectedSolution.features && (
              <ul className="mt-6 space-y-2.5 border-t border-(--border)/60 pt-6">
                {selectedSolution.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-(--coral)" strokeWidth={3} />
                    <span className="text-(--foreground)/80">{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {selectedSolution.details && (
              <p className="mt-6 border-t border-(--border)/60 pt-6 text-sm leading-relaxed text-(--muted-foreground)">
                {selectedSolution.details}
              </p>
            )}

            <Link
              to="/contact"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-(--primary-foreground) shadow-soft transition hover:-translate-y-0.5"
            >
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      <Footer />

    </main>
  )
}

export default Solutionpage