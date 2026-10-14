import { Link } from "react-router";
import {
  Activity,
  ArrowLeft,
  Building2,
  FileText,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const content = {
  customer: {
    kicker: "CUSTOMER PORTAL",
    icon: UserRound,
    title: "Your insurance workspace is almost ready.",
    text: "We are putting the finishing touches on a single place to manage your policies, claims and documents.",
  },
  corporate: {
    kicker: "CORPORATE PORTAL",
    icon: Building2,
    title: "Your organization's portal is almost ready.",
    text: "We are putting the finishing touches on a connected workspace for employee benefits, policies and claims.",
  },
  default: {
    kicker: "CLIENT PORTAL",
    icon: ShieldCheck,
    title: "Our client portal is almost ready.",
    text: "We are putting the finishing touches on a simple workspace for your policies, claims and documents.",
  },
};

const highlights = [
  { icon: Activity, label: "Live policy visibility" },
  { icon: ShieldCheck, label: "Faster claims assistance" },
  { icon: FileText, label: "Documents in one place" },
];

const ComingSoonPage = ({ portal = "default" }) => {
  const page = content[portal] || content.default;
  const Icon = page.icon;

  return (
    <main>
      <Navbar />

      <section className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-[#f4f7fb] px-6 py-20">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[480px] w-[480px] animate-pulse rounded-full bg-[#1769e0]/15 blur-3xl" />
          <div
            className="absolute -bottom-40 -right-32 h-[520px] w-[520px] animate-pulse rounded-full bg-[#0b2749]/15 blur-3xl"
            style={{ animationDelay: "1.2s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #071b36 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Card */}
        <div className="relative w-full max-w-[680px] rounded-[2rem] border border-[#dce5ef] bg-white/90 p-8 text-center shadow-[0_30px_80px_rgba(7,27,54,0.10)] backdrop-blur-xl md:p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#eaf3ff] text-[#1769e0]">
            <Icon size={28} />
          </div>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#dbe7f5] bg-[#f3f8ff] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1769e0]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1769e0] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1769e0]" />
            </span>
            Coming Soon
          </span>

          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8293a8]">
            {page.kicker}
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-[#071b36] md:text-4xl">
            {page.title}
          </h1>

          <p className="mx-auto mt-4 max-w-[500px] text-[15px] leading-7 text-[#63728a]">
            {page.text}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {highlights.map(({ icon: HighlightIcon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-[#e4eaf2] bg-white px-4 py-2 text-[12px] font-semibold text-[#3b4f69]"
              >
                <HighlightIcon size={14} className="text-[#1769e0]" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#071b36] px-6 text-[13px] font-bold text-white shadow-[0_10px_25px_rgba(7,27,54,0.16)] transition hover:-translate-y-0.5 hover:bg-[#1769e0]"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#dce7f2] bg-white px-6 text-[13px] font-bold text-[#10233f] transition hover:-translate-y-0.5 hover:border-[#c5d6e8]"
            >
              <Mail size={16} />
              Contact Us
            </Link>
          </div>

          <p className="mt-8 text-[12px] leading-6 text-[#8c99aa]">
            Need help with a policy or claim right now? Write to{" "}
            <a
              href="mailto:wecare@zuariinsurance.in"
              className="font-semibold text-[#1769e0] hover:underline"
            >
              wecare@zuariinsurance.in
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ComingSoonPage;