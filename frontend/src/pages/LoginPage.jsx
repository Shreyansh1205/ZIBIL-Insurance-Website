import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, Sparkles, Check } from "lucide-react";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => setDone(false), 2400);
    }, 1400);
  };

  const tx = (mouse.x - 0.5) * 30;
  const ty = (mouse.y - 0.5) * 30;

  return (
    <main>
      <Navbar />

      <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-32 -left-24 h-[520px] w-[520px] animate-blob bg-grad-warm opacity-40 blur-3xl"
            style={{ transform: `translate(${tx}px, ${ty}px)` }}
          />
          <div
            className="absolute -bottom-40 -right-24 h-[560px] w-[560px] animate-blob bg-grad-cool opacity-40 blur-3xl"
            style={{ animationDelay: "-6s", transform: `translate(${-tx}px, ${-ty}px)` }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, var(--ink) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          {/* Left: story panel */}
          <div className="hidden lg:flex flex-col justify-between animate-reveal">
            <div>
              {/* <span className="inline-flex items-center gap-2 rounded-full border border-(--border)/60 bg-(--card)/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-(--coral) backdrop-blur">
                <Sparkles size={14} /> Welcome back
              </span> */}
              <h1 className="mt-6 font-display text-5xl leading-[1.05] xl:text-6xl">
                Sign in to your  dashboard.
              </h1>
              <p className="mt-6 max-w-md text-lg text-(--muted-foreground)">
                Manage policies, track claims in real-time, and take care of your benefits — all in one warmly-designed workspace.
              </p>

              <ul className="mt-10 space-y-3">
                {[
                  "Live claim tracking across all providers",
                  "One-click claim support and assistance",
                  "One-click endorsements and dependent updates"
                  

                ].map((f, i) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 animate-reveal"
                    style={{ animationDelay: `${0.15 * (i + 1)}s` }}
                  >
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-(--teal)/20 text-(--teal)">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="text-(--foreground)/85">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Floating stat card */}
            {/* <div className="relative mt-12 hidden xl:block">
              <div className="animate-float-slow rounded-3xl border border-(--border)/60 bg-(--card)/80 p-6 shadow-soft backdrop-blur w-fit">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-grad-warm text-white">
                    <Shield size={18} />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">99.98%</div>
                    <div className="text-xs text-(--muted-foreground)">Uptime last 90 days</div>
                  </div>
                </div>
              </div>
              <div
                className="animate-float absolute -right-8 -bottom-6 rounded-2xl border border-(--border)/60 bg-(--card)/80 p-4 shadow-soft backdrop-blur"
                style={{ animationDelay: "-2s" }}
              >
                <div className="text-xs uppercase tracking-wider text-(--muted-foreground)">Claims settled</div>
                <div className="mt-1 font-display text-2xl">₹412 Cr+</div>
              </div>
            </div> */}
          </div>

          {/* Right: form card */}
          <div className="relative animate-reveal" style={{ animationDelay: "0.1s" }}>
            <div className="absolute -inset-1 rounded-[2rem] bg-grad-warm opacity-20 blur-2xl" />
            <div className="relative rounded-[2rem] border border-(--border)/60 bg-(--card)/90 p-8 shadow-soft backdrop-blur-xl md:p-10">
              <div className="mb-8">
                <h2 className="font-display text-3xl md:text-4xl">Log in</h2>
              </div>

              {/* Social */}
            
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Google",
                    icon: <GoogleIcon />,
                    link: "https://accounts.google.com/",
                  },
                  {
                    label: "Microsoft",
                    icon: <MicrosoftIcon />,
                    link: "https://login.microsoftonline.com/",
                  },
                ].map((p) => (
                  <Link
                    key={p.label}
                    to={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center justify-center gap-3 rounded-full border border-[#e6dece] bg-[#fdfbf6] px-5 text-[16px] font-medium text-[#1f2937] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8cfbf] hover:bg-white hover:shadow-sm"
                  >
                    <span className="flex shrink-0 items-center justify-center">
                      {p.icon}
                    </span>

                    <span>{p.label}</span>
                  </Link>
                ))}
              </div>



              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-(--border)" />
                <span className="text-xs uppercase tracking-wider text-(--muted-foreground)">or with email</span>
                <div className="h-px flex-1 bg-(--border)" />
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <Field
                  icon={<Mail size={16} />}
                  label="Work email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@company.com"
                  required
                />
                <Field
                  icon={<Lock size={16} />}
                  label="Password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  required
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="text-(--muted-foreground) transition hover:text-(--foreground)"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />

                <div className="flex items-center justify-between text-sm">
                  <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                    <span
                      onClick={() => setRemember(!remember)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${remember ? "bg-(--coral)" : "bg-(--border)"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${remember ? "translate-x-4" : "translate-x-0.5"
                          }`}
                      />
                    </span>
                    <span className="text-(--muted-foreground)">Remember me</span>
                  </label>
                  <a href="#" className="font-medium text-(--coral) hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading || done}
                  className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-(--primary) px-5 py-3 text-sm font-semibold text-(--primary-foreground) shadow-soft transition hover:-translate-y-0.5 disabled:opacity-90"
                >
                  <span className="absolute inset-0 -translate-x-full bg-grad-warm transition-transform duration-500 group-hover:translate-x-0" />
                  <span className="relative z-10 flex items-center gap-2">
                    {done ? (
                      <>
                        <Check size={16} className="animate-tick" /> Signed in
                      </>
                    ) : loading ? (
                      <>
                        <Spinner /> Signing you in…
                      </>
                    ) : (
                      <>
                        Log in <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* <p className="mt-6 text-center text-xs text-(--muted-foreground)">
                Protected by 256-bit encryption · SOC 2 Type II
              </p> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

function Field({ icon, label, type, value, onChange, placeholder, required, trailing }) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-(--muted-foreground)">{label}</label>
      <div
        className={`group relative flex items-center gap-3 rounded-xl border bg-(--background)/60 px-3.5 py-3 transition ${active ? "border-(--coral) ring-4 ring-(--coral)/10" : "border-(--border) hover:border-(--foreground)/30"
          }`}
      >
        <span className={`transition ${active ? "text-(--coral)" : "text-(--muted-foreground)"}`}>{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={placeholder}
          required={required}
          className="flex-1 bg-transparent text-sm text-(--foreground) placeholder:text-(--muted-foreground)/60 focus:outline-none"
        />
        {trailing}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-(--primary-foreground)/30 border-t-(--primary-foreground)" />
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.4 2.4 30 0 24 0 14.6 0 6.4 5.4 2.4 13.3l7.8 6C12.1 13.5 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.6-4.9 7.3l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.7z" />
      <path fill="#FBBC05" d="M10.2 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6C.9 16.5 0 20.1 0 24s.9 7.5 2.4 10.7l7.8-6z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6.4 0-11.9-4-13.8-9.7l-7.8 6C6.4 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#F25022" d="M1 1h10v10H1z" />
      <path fill="#7FBA00" d="M13 1h10v10H13z" />
      <path fill="#00A4EF" d="M1 13h10v10H1z" />
      <path fill="#FFB900" d="M13 13h10v10H13z" />
    </svg>
  );
}

export default LoginPage;