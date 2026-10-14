import React, { useEffect, useState } from 'react'
import { useSearchParams } from "react-router";
import { Navbar } from '../components/Navbar';
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { useContact } from '../hooks/useContact';
import Footer from '../components/Footer';
import { toast, Toaster } from 'react-hot-toast';
import Loading from '../components/Loading';
import SliderCaptcha from '../components/SliderCaptcha';

export const Contactpage = () => {
  const [searchParams] = useSearchParams();
  const [sent, setSent] = useState(false);
  const { loading, handleContactSave } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: searchParams.get("email") || "",
    phoneNo: "",
    message: "",
  })
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const emailFromHomepage = searchParams.get("email") || "";

    if (emailFromHomepage) {
      setFormData((current) => ({ ...current, email: emailFromHomepage }));
    }

    { window.scrollTo({ top: 0, behavior: "smooth" }) }

  }, [searchParams]);


  const resetCaptcha = () => {
    setCaptchaVerified(false);
    setCaptchaResetKey((k) => k + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error("Please agree to the Terms of Use and Privacy Notice");
      return;
    }

    if (!captchaVerified) {
      toast.error("Please slide to verify you're human");
      return;
    }
    const response = await handleContactSave(formData);

    if (response?.errors?.errors?.[0]) {
      toast.error(response.errors?.errors[0].msg);
      resetCaptcha();
      return;
    }

    if (response.success) {
      toast.success("Contact saved successfully");
      setSent(true);
      resetCaptcha();
    } else {
      toast.error("Error saving contact:");
      resetCaptcha();
    }
  }

  return (
    <main className="relative">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        containerStyle={{ zIndex: 1000 }}
      />
      {loading ? (
        <div className="fixed inset-0 z-40 bg-(--background)/80 backdrop-blur-sm">
          <Loading />
        </div>
      ) : null}
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pt-22 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-reveal">
            <span className="text-sm font-semibold uppercase tracking-wider text-(--coral)">Contact Us</span>

            

            
            <div className="mt-10 space-y-4">
              {[
                { i: Mail, l: "Email", v: "wecare@zuariinsurance.in" },
                { i: Phone, l: "Phone", v: "011-45494500" },
                {
                  i: MapPin,
                  l: "Offices",
                  v: "A-32, First Floor, Mohan Cooperative Industrial Estate Mathura Road, Badarpur, New Delhi-110044",
                },
              ].map((c) => {
                const Icon = c.i;

                return (
                  <div
                    key={c.l}
                    className="flex items-center gap-4 rounded-2xl border border-(--border)/60 bg-(--card) p-4 transition hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--coral)/15 text-(--coral)">
                      <Icon className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-(--muted-foreground)">
                        {c.l}
                      </p>
                      <p className="font-medium">{c.v}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-grad-cool opacity-25 blur-2xl animate-blob" />

            <form
              onSubmit={handleSubmit}
              onInvalid={resetCaptcha}
              className={`rounded-4xl border border-(--border)/60 bg-(--card) p-8 shadow-soft md:p-10 ${loading ? "pointer-events-none opacity-60" : ""}`}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-(--coral) text-(--cream) animate-tick">
                    <Check className="h-8 w-8" strokeWidth={3} />
                  </span>

                  <h3 className="mt-6 font-display text-2xl">
                    Thanks, we got it.
                  </h3>

                  <p className="mt-2 max-w-sm text-(--muted-foreground)">
                    A Zuari Insurance Brokers Limited advisor will reach out to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-3xl">Get in Touch</h2>

                  
                  <div className="mt-6 grid gap-4">
                    <Field
                      label="Full name"
                      name="name"
                      placeholder="Enter Your Full Name"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      placeholder="Enter your Email"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <Field
                      label="Phone Number"
                      name="phoneNo"
                      type="number"
                      placeholder="Enter your Phone Number"
                      length={10}
                      onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                    />

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-(--foreground)/70">Message</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us what you're looking for…"
                        className="w-full resize-none rounded-xl border border-(--border) bg-(--background) px-4 py-3 text-sm outline-none transition focus:border-(--coral) focus:ring-2 focus:ring-(--coral)/30"
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
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


                    <SliderCaptcha
                      onVerify={setCaptchaVerified}
                      disabled={loading}
                      resetSignal={captchaResetKey}
                    />
                    {/* <div>
                    <p>By continuing, you agree to Zuari Insuranc
                    <Link to="">Terms of Use </Link> and <Link to="/privacy" >Privacy Notice</Link>
                    </p>
                    </div> */}

                    <button disabled={loading || !captchaVerified || !agreedToTerms} className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-(--primary) px-6 py-3.5 text-sm font-semibold text-(--primary-foreground) shadow-soft transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
                      Submit
                      <Send className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
function Field({ label, name, type = "text", value, placeholder, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-foreground/70">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-coral focus:ring-2 focus:ring-coral/30"
      />
    </div>
  );
}

export default Contactpage