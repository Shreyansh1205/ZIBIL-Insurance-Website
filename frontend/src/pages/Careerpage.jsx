import React, { useMemo, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Briefcase,
    MapPin,
    Clock,
    Search,
    Upload,
    Check,
    X,
    ArrowRight,
    Sparkles,
    Users,
    Heart,
    Rocket,
} from "lucide-react";

const JOBS = [
    {
        id: "sr-advisor",
        title: "Senior Insurance Advisor",
        team: "Advisory",

        type: "Full-time",
        summary:
            "Own client relationships end-to-end — design employee benefits programs and negotiate with insurers.",
    },
    {
        id: "claims-lead",
        title: "Claims Concierge Lead",
        team: "Operations",

        type: "Full-time",
        summary: "Lead a pod of concierges who fight for every claim, every time. High empathy, high ownership.",
    },
    {
        id: "fs-engineer",
        title: "Full-Stack Engineer",
        team: "Engineering",

        type: "Full-time",
        summary:
            "Ship our HR dashboard and claims tooling. TypeScript, React, Node and a healthy respect for craft.",
    },
    {
        id: "product-designer",
        title: "Product Designer",
        team: "Design",

        type: "Full-time",
        summary: "Shape a delightful, human product in a category that badly needs both. Portfolio required.",
    },
    {
        id: "bd-manager",
        title: "Business Development Manager",
        team: "Growth",

        type: "Full-time",
        summary: "Bring modern companies onto Zuari. You know how to open doors and close thoughtful deals.",
    },
    {
        id: "underwriting-analyst",
        title: "Underwriting Analyst",
        team: "Advisory",

        type: "Full-time",
        summary: "Turn data into sharper pricing and better recommendations for our clients.",
    },
    {
        id: "content-intern",
        title: "Content & Comms Intern",
        team: "Marketing",

        type: "Internship",
        summary: "Write words that make insurance feel human. 6-month paid internship.",
    },
];

const TEAMS = ["All", "Advisory", "Operations", "Engineering", "Design", "Growth", "Marketing"];

const Careerpage = () => {
    const [query, setQuery] = useState("");
    const [team, setTeam] = useState("All");
    const [activeJob, setActiveJob] = useState(null);
    const [cvOpen, setCvOpen] = useState(false);

    const filtered = useMemo(() => {
        return JOBS.filter((j) => {
            if (team !== "All" && j.team !== team) return false;
            if (query && !`${j.title} ${j.summary} ${j.team}`.toLowerCase().includes(query.toLowerCase()))
                return false;
            return true;
        });
    }, [query, team]);

    return (
        <div>
            <Navbar />

            <div className="pt-12 pb-20">
                {/* Hero */}
                <section className="relative overflow-hidden">
                    <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-grad-warm opacity-20 blur-3xl animate-blob" />
                    <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-grad-cool opacity-20 blur-3xl animate-blob" />
                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="max-w-3xl animate-reveal">

                            <h1 className="mt-5 font-display text-10xl leading-tight md:text-6xl">
                                Accelerate Your Career at Zuari Insurance Brokers Limited 
                                
                            </h1>
                            {/* <span className="text-(--coral)"> Join us to reshape the insurance landscape explore the perfect role for you.</span> */}

                            <div className="mt-8 flex flex-wrap gap-3">

                                <a
                                    href="#openings"
                                    className="group inline-flex items-center gap-2 rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-(--primary-foreground) shadow-soft transition hover:-translate-y-0.5"
                                >
                                    See open roles
                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                </a>
                                <button
                                    onClick={() => setCvOpen(true)}
                                    className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--card) px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-soft"
                                >
                                    <Upload className="h-4 w-4" /> Just drop your CV
                                </button>
                            </div>
                        </div>


                    </div>
                </section>

                {/* Openings */}
                <section id="openings" className="mx-auto mt-18 max-w-7xl px-6">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <span className="text-sm font-semibold uppercase tracking-wider text-(--coral)">Current Openings</span>
                            {/* <h2 className="mt-2 font-display text-4xl md:text-5xl">Find your seat.</h2> */}

                        </div>

                    </div>

                    {/* Filters */}
                    <div className="mt-8 grid gap-3 rounded-2xl border border-(--border)/60 bg-(--card) p-4 md:grid-cols-[1fr_auto_auto]">
                        <label className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted-foreground)" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search roles…"
                                className="w-full rounded-xl border border-(--border) bg-(--background) pl-11 pr-4 py-3 text-sm outline-none transition focus:border-(--coral) focus:ring-2 focus:ring-(--coral)/30"
                            />
                        </label>
                        {/* <Select value={team} onChange={setTeam} options={TEAMS} label="Team" /> */}
                    </div>

                    {/* Job list */}
                    <ul className="mt-6 space-y-3">
                        {filtered.map((job, idx) => (
                            <li
                                key={job.id}
                                className="group animate-reveal rounded-2xl border border-(--border)/60 bg-(--card) p-5 transition hover:-translate-y-0.5 hover:border-(--coral)/40 hover:shadow-soft"
                                style={{ animationDelay: `${idx * 40}ms` }}
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="truncate font-display text-xl">{job.title}</h3>
                                            <span className="rounded-full bg-(--coral)/10 px-2 py-0.5 text-xs font-medium text-(--coral)">
                                                {job.team}
                                            </span>
                                        </div>
                                        <p className="mt-1 line-clamp-1 text-sm text-(--muted-foreground)">{job.summary}</p>
                                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-(--muted-foreground)">

                                            <span className="inline-flex items-center gap-1.5">
                                                <Clock className="h-3.5 w-3.5" /> {job.type}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5">
                                                <Briefcase className="h-3.5 w-3.5" /> {job.team}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setActiveJob(job)}
                                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-(--primary) px-5 py-2.5 text-sm font-semibold text-(--primary-foreground) shadow-soft transition group-hover:-translate-y-0.5"
                                    >
                                        Apply
                                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </li>
                        ))}
                        {filtered.length === 0 && (
                            <li className="rounded-2xl border border-dashed border-(--border)/60 bg-(--card) p-10 text-center">
                                <p className="font-medium">No roles match right now.</p>
                                <p className="mt-1 text-sm text-(--muted-foreground)">
                                    Drop your CV and we'll reach out when something opens.
                                </p>
                                <button
                                    onClick={() => setCvOpen(true)}
                                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-(--primary) px-5 py-2.5 text-sm font-semibold text-(--primary-foreground) shadow-soft"
                                >
                                    <Upload className="h-4 w-4" /> Submit CV
                                </button>
                            </li>
                        )}
                    </ul>
                </section>

                {/* CV CTA */}
                <section className="mx-auto mt-24 max-w-7xl px-6">
                    <div className="relative overflow-hidden rounded-[2rem] border border-(--border)/60 bg-grad-cool p-10 md:p-14">
                        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-(--coral)/20 blur-3xl animate-blob" />
                        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                            <div className="max-w-xl">
                                <h3 className="font-display text-3xl md:text-4xl">Join Us!</h3>
                                
                            </div>
                            <button
                                onClick={() => setCvOpen(true)}
                                className="inline-flex items-center gap-2 rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-(--primary-foreground) shadow-soft transition hover:-translate-y-0.5"
                            >
                                <Upload className="h-4 w-4" /> Upload your CV
                            </button>
                        </div>
                    </div>
                </section>

                {/* Modals */}
                {activeJob && <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />}
                {cvOpen && <ApplyModal onClose={() => setCvOpen(false)} />}
            </div>

            <Footer />
        </div>
    );
};

function Select({ value, onChange, options, label }) {
    return (
        <label className="flex items-center gap-2 rounded-xl border border-border bg-(--background) px-3 py-2 text-sm">
            <span className="text-xs uppercase tracking-wider text-(--muted-foreground)">{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="min-w-[8rem] bg-transparent py-1 pr-2 text-sm outline-none"
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </label>
    );
}

function ApplyModal({ job, onClose }) {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [sent, setSent] = useState(false);
    const inputRef = useRef(null);

    const isGeneral = !job;

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f) setFile(f);
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-(--foreground)/40 p-4 backdrop-blur-sm animate-reveal"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-(--border)/60 bg-(--card) shadow-soft"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-(--secondary)"
                    aria-label="Close"
                >
                    <X className="h-4 w-4" />
                </button>

                {sent ? (
                    <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-(--coral) text-white animate-tick">
                            <Check className="h-8 w-8" strokeWidth={3} />
                        </span>
                        <h3 className="mt-6 font-display text-2xl">Application received.</h3>
                        <p className="mt-2 max-w-sm text-sm text-(--muted-foreground)">
                            Thanks for applying{job ? ` for ${job.title}` : ""}. Our Talent Acquisition team reviews every submission and
                            will be in touch soon.
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!agreedToTerms) return;
                            setSent(true);
                        }}
                        className="p-8"
                    >
                        <p className="text-xs font-semibold uppercase tracking-wider text-(--coral)">
                            {isGeneral ? "General application" : "Apply for"}
                        </p>
                        <h3 className="mt-1 font-display text-2xl">{isGeneral ? "Send us your CV" : job.title}</h3>
                        {!isGeneral && (
                            <p className="mt-1 text-sm text-(--muted-foreground)">
                                {job.team} · {job.type}
                            </p>
                        )}

                        <div className="mt-6 grid gap-4">
                            <ModalField label="Full name" name="name" placeholder="Enter Your Full Name" />
                            <ModalField label="Email" name="email" type="email" placeholder="Enter your Email" />
                            <ModalField label="Phone" name="phone" placeholder="Enter Your Phone Number" />
                            {isGeneral && (
                                <ModalField
                                    label="Which team interests you?"
                                    name="interest"
                                    placeholder="Engineering, Advisory, Design…"
                                />
                            )}

                            {/* CV upload */}
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-(--foreground)/70">
                                    Upload CV (PDF or DOCX)
                                </label>
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragging(true);
                                    }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={onDrop}
                                    onClick={() => inputRef.current?.click()}
                                    className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition ${dragging
                                        ? "border-(--coral) bg-(--coral)/5"
                                        : "border-(--border)  bg-(--background) hover:border-(--coral)/60"
                                        }`}
                                >
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--coral)/15 text-(--coral)">
                                        <Upload className="h-4 w-4" />
                                    </span>
                                    {file ? (
                                        <>
                                            <p className="text-sm font-medium">{file.name}</p>
                                            <p className="text-xs text-(--muted-foreground)">
                                                {(file.size / 1024).toFixed(0)} KB · click to replace
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm font-medium">Drag & drop or click to upload</p>
                                            <p className="text-xs text-(--muted-foreground)">PDF or DOCX up to 5MB</p>
                                        </>
                                    )}
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                        required={!file}
                                    />
                                </div>
                            </div>

                            <label className="flex items-start gap-2.5 text-xs text-(--muted-foreground)">
                                <input
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-(--border) accent-(--coral)"
                                />
                                <span>
                                    By continuing, you agree to Zuari Insurance Brokers Limited <a href="/" className="underline">Terms of Use</a> and <a href="/privacy" className="underline">Privacy Notice</a>.
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={!agreedToTerms}
                                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-(--primary) px-6 py-3 text-sm font-semibold text-(--primary-foreground) shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Submit application
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

function ModalField({ label, name, type = "text", placeholder }) {
    return (
        <div>
            <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-(--foreground)/70">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                className="w-full rounded-xl border border-(--border) bg-background px-4 py-3 text-sm outline-none transition focus:border-(--coral) focus:ring-2 focus:ring-(--coral)/30"
            />
        </div>
    );
}

export default Careerpage;