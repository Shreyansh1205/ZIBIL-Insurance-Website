import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";

const STORAGE_KEY = "zuari-privacy-preferences";

// Cookie categories shown in the "Customize Consent Preferences" panel.
// "necessary" is always on and can't be toggled off.
const CATEGORIES = [
  {
    key: "necessary",
    label: "Necessary",
    locked: true,
    description:
      "Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.",
  },
  {
    key: "functional",
    label: "Functional",
    locked: false,
    description:
      "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
  },
  {
    key: "analytics",
    label: "Analytics",
    locked: false,
    description:
      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
  },
  {
    key: "advertisement",
    label: "Advertisement",
    locked: false,
    description:
      "Advertisement cookies are used to provide visitors with customized advertisements based on the pages you visited previously and to analyze the effectiveness of the ad campaigns.",
  },
];

const DEFAULT_PREFS = { necessary: true, functional: false, analytics: false, advertisement: false };
const ALL_ACCEPTED_PREFS = { necessary: true, functional: true, analytics: true, advertisement: true };

/**
 * PrivacyNotice
 *
 * A full-width cookie consent banner shown on first visit (and again
 * if consent was never recorded, e.g. storage was cleared). Presents:
 *  - A summary row with "Cookie Preferences" (expand), "Deny", "Accept All"
 *  - An expandable panel listing each cookie category with its own toggle
 *  - "Save My Preferences" to persist a custom selection
 *
 * The choice is persisted to localStorage so the banner doesn't show
 * again on future visits. Swap `persistAndClose` for real analytics/ad
 * script toggling (e.g. gating a GA/GTM snippet) once those are wired up.
 *
 * Note: this file is intentionally NOT named "CookieConsent.jsx" or
 * similar — many browser ad blockers ship filter rules that block any
 * request whose URL contains "cookie" (e.g. EasyList's cookie-notice
 * filters), which in dev mode blocks Vite's module request outright
 * and can crash the whole app. Keep this filename/export as-is, or if
 * renaming, avoid "cookie", "consent", "gdpr", and "banner" in the path.
 */
export default function PrivacyNotice() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable (e.g. privacy mode) — show the banner
      // every visit rather than blocking on a preference we can't save.
      setVisible(true);
    }
  }, []);

  const persistAndClose = (values) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...values, decidedAt: new Date().toISOString() }));
    } catch {
      // Ignore write failures; the banner will just reappear next visit.
    }
    // Hook point for real cookie/script gating, e.g.:
    // if (values.analytics) loadAnalyticsScript();
    setClosing(true);
    setTimeout(() => setVisible(false), 250);
  };

  const acceptAll = () => persistAndClose(ALL_ACCEPTED_PREFS);
  const deny = () => persistAndClose(DEFAULT_PREFS);
  const savePreferences = () => persistAndClose(prefs);

  const toggleCategory = (key) => {
    if (key === "necessary") return; // always on, can't be disabled
    setPrefs((current) => ({ ...current, [key]: !current[key] }));
  };

  const toggleExpanded = (key) => {
    setOpenCategory((current) => (current === key ? null : key));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={[
        "fixed inset-x-0 bottom-0 z-50",
        closing ? "animate-[notice-out_0.25s_ease-in_forwards]" : "animate-[notice-in_0.4s_cubic-bezier(0.16,1,0.3,1)_both]",
      ].join(" ")}
    >
      <div className="relative max-h-[85vh] overflow-y-auto border-t border-(--border)/60 bg-(--ink) text-(--cream) shadow-soft">
        <button
          type="button"
          onClick={deny}
          aria-label="Dismiss and deny non-essential cookies"
          className="absolute right-4 top-4 text-(--cream)/60 transition hover:text-(--cream) sm:right-6"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Summary row */}
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl pr-8">
              <h2 className="font-display text-lg">Cookie Consent</h2>
              <p className="mt-2 text-sm leading-relaxed text-(--cream)/75">
                We use cookies on this site to improve your browsing experience, analyse
                individualised usage and website traffic, tailor content to your preferences, and
                make your interactions with our website more meaningful. To learn more about the
                cookies we use and how you can change your preferences, please read our{" "}
                <a href="/privacy" className="underline underline-offset-2 hover:text-(--cream)">
                  Cookie Policy
                </a>{" "}
                and visit our Cookie Preferences Manager. By clicking "Accept All," you consent to
                the use of cookies.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setShowPreferences((s) => !s)}
                aria-expanded={showPreferences}
                className="inline-flex items-center gap-1.5 rounded-full border border-(--cream)/25 px-5 py-2.5 text-sm font-semibold text-(--cream) transition hover:border-(--cream)/50"
              >
                Cookie Preferences
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showPreferences ? "rotate-180" : ""}`} />
              </button>

              <button
                type="button"
                onClick={deny}
                className="rounded-full border border-(--cream)/25 px-5 py-2.5 text-sm font-semibold text-(--cream) transition hover:border-(--cream)/50"
              >
                Deny
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-(--coral) px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>

        {/* Expandable preferences panel */}
        {showPreferences && (
          <div className="border-t border-(--cream)/10">
            <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8">
              <h3 className="font-display text-base">Customize Consent Preferences</h3>
              <p className="mt-2 text-sm text-(--cream)/70">
                We use cookies to help you navigate efficiently and perform certain functions. You
                will find detailed information about all cookies under each consent category
                below. The cookies that are categorized as "Necessary" are stored on your browser
                as they are essential for enabling the basic functionalities of the site.
              </p>

              <div className="mt-6 divide-y divide-(--cream)/10 border-y border-(--cream)/10">
                {CATEGORIES.map((cat) => {
                  const isOpen = openCategory === cat.key;
                  const isOn = prefs[cat.key];

                  return (
                    <div key={cat.key} className="py-4">
                      <div className="flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => toggleExpanded(cat.key)}
                          aria-expanded={isOpen}
                          className="flex items-center gap-2 text-left text-sm font-semibold text-(--cream)"
                        >
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4 shrink-0 text-(--cream)/60" />
                          ) : (
                            <ChevronRight className="h-4 w-4 shrink-0 text-(--cream)/60" />
                          )}
                          {cat.label}
                        </button>

                        {cat.locked ? (
                          <span className="shrink-0 text-xs font-semibold text-(--teal)">
                            Always Active
                          </span>
                        ) : (
                          <button
                            type="button"
                            role="switch"
                            aria-checked={isOn}
                            aria-label={`Toggle ${cat.label} cookies`}
                            onClick={() => toggleCategory(cat.key)}
                            className={[
                              "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                              isOn ? "bg-(--teal)" : "bg-(--cream)/20",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                                isOn ? "translate-x-5.5" : "translate-x-0.5",
                              ].join(" ")}
                            />
                          </button>
                        )}
                      </div>

                      {isOpen && (
                        <p className="mt-2 pl-6 text-sm leading-relaxed text-(--cream)/65">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={savePreferences}
                  className="rounded-full border border-(--cream)/25 px-5 py-2.5 text-sm font-semibold text-(--cream) transition hover:border-(--cream)/50"
                >
                  Save My Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes notice-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes notice-out {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(24px); }
        }
      `}</style>
    </div>
  );
}