"use client";

import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  LOGIN_PAGE_PATH,
  PRIVACY_POLICY_PAGE_PATH,
  TERMS_AND_CONDITIONS_PAGE_PATH,
} from "@/utils/urls";
import { COMPANY_NAME } from "@/utils/constant";
import { countries, type Country } from "@/utils/countries";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getFlagEmoji(isoCode: string): string {
  const base = isoCode.toUpperCase().slice(0, 2);
  if (!/^[A-Z]{2}$/.test(base)) return "🌐";
  return [...base]
    .map((ch) => String.fromCodePoint(0x1f1e6 + ch.charCodeAt(0) - 65))
    .join("");
}

function primaryPhoneCode(phoneCode: string): string {
  const first = phoneCode.split(",")[0].trim();
  return first.replace(/-\d+$/, "");
}

function sanitizePhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 15);
}

// ─── Country Code Dropdown ────────────────────────────────────────────────────

interface CountryCodeDropdownProps {
  selectedPhoneCode: string;
  onSelect: (country: Country) => void;
  id: string;
}

function CountryCodeDropdown({ selectedPhoneCode, onSelect, id }: CountryCodeDropdownProps) {
  const [show, setShow]     = useState(false);
  const [search, setSearch] = useState("");
  const btnRef              = useRef<HTMLButtonElement>(null);
  const panelRef            = useRef<HTMLDivElement>(null);
  const searchRef           = useRef<HTMLInputElement>(null);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  const selected = countries.find(
    (c) => primaryPhoneCode(c.phoneCode) === selectedPhoneCode
  );

  const filtered = search.trim()
    ? countries.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.phoneCode.includes(search) ||
          c.code.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  const openDropdown = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPanelStyle({
      position: "fixed",
      top:      rect.bottom + 4,
      left:     rect.left,
      width:    300,
      zIndex:   9999,
    });
    setShow(true);
    setSearch("");
    setTimeout(() => searchRef.current?.focus(), 40);
  };

  const closeDropdown = () => { setShow(false); setSearch(""); };

  useEffect(() => {
    if (!show) return;
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!btnRef.current?.contains(t) && !panelRef.current?.contains(t)) {
        closeDropdown();
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const update = () => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      setPanelStyle((prev) => ({ ...prev, top: rect.bottom + 4, left: rect.left }));
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [show]);

  return (
    <>
      {/* ── Trigger ─────────────────────────────────────────────────────────
          No border here — the .phone-field wrapper owns all borders.
          We use an inner divider line instead of a border to separate
          the flag/code section from the number input.
      ─────────────────────────────────────────────────────────────────────── */}
      <button
        ref={btnRef}
        type="button"
        onClick={() => (show ? closeDropdown() : openDropdown())}
        aria-haspopup="listbox"
        aria-expanded={show}
        aria-label="Select country code"
        className="cc-trigger"
      >
        <span className="cc-flag">
          {selected ? getFlagEmoji(selected.code) : "🌐"}
        </span>
        <span className="cc-code">{selectedPhoneCode}</span>
        <svg
          className={`cc-chevron ${show ? "cc-chevron--open" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ── Fixed-position panel ─────────────────────────────────────────────
          Rendered with position:fixed so it is never clipped by any
          overflow:hidden ancestor (including the page scroll container).
      ─────────────────────────────────────────────────────────────────────── */}
      {show && (
        <div
          ref={panelRef}
          style={panelStyle}
          className="cc-panel"
          role="listbox"
          id={`${id}-listbox`}
        >
          <div className="cc-search-wrap">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search country or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="cc-search"
            />
          </div>
          <div className="cc-list">
            {filtered.length === 0 ? (
              <p className="cc-empty">No results</p>
            ) : (
              filtered.map((c) => {
                const phone = primaryPhoneCode(c.phoneCode);
                const isSel = phone === selectedPhoneCode && c.code === (selected?.code ?? "");
                return (
                  <button
                    key={`${c.code}-${c.phoneCode}`}
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onSelect(c);
                      closeDropdown();
                    }}
                    className={`cc-option${isSel ? " cc-option--selected" : ""}`}
                  >
                    <span className="cc-option-flag">{getFlagEmoji(c.code)}</span>
                    <span className={`cc-option-code${isSel ? " cc-option-code--bold" : ""}`}>
                      {phone}
                    </span>
                    <span className="cc-option-name">{c.name}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconUser = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconPhone = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconEmail = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconLock = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SignupPage() {
  const router     = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    username:      "",
    password:      "",
    firstName:     "",
    middleName:    "",
    lastName:      "",
    email:         "",
    mobileNumber1: "",
    mobileNumber2: "",
  });

  const [phoneCode1, setPhoneCode1] = useState("+94");
  const [phoneCode2, setPhoneCode2] = useState("+94");
  const [error,        setError]        = useState<string | null>(null);
  const [loading,      setLoading]      = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "mobileNumber1" | "mobileNumber2"
  ) => {
    setFormData((prev) => ({ ...prev, [field]: sanitizePhone(e.target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const submitData = {
        ...formData,
        mobileNumber1: `${phoneCode1}${formData.mobileNumber1}`,
        mobileNumber2: formData.mobileNumber2
          ? `${phoneCode2}${formData.mobileNumber2}`
          : undefined,
        middleName: formData.middleName || undefined,
      };
      await signup(submitData);
      router.push(LOGIN_PAGE_PATH);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "sea-input w-full pl-11 pr-4 py-3 text-sm text-gray-900 bg-white border-2 rounded-xl outline-none transition-all placeholder-gray-400";

  const labelClass = "block text-sm font-semibold mb-1.5";

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");

        /* ── Design tokens ──────────────────────────────────────────────────── */
        :root {
          --sea-blue:           #0b7ea8;
          --sea-blue-dark:      #095f82;
          --sea-blue-light:     #3aadd4;
          --sea-blue-pale:      #e0f4fb;
          --sea-blue-border:    #b3e0f2;
          --sea-green:          #0e9e8e;
          --sea-green-dark:     #0b7d70;
          --sea-green-light:    #3dbfb1;
          --sea-gradient-start: #064e6e;
          --sea-gradient-end:   #0b7d70;

          /* Field dimensions — single source of truth */
          --field-height:       48px;
          --field-radius:       12px;
          --field-border:       2px solid var(--sea-blue-border);
          --field-border-focus: 2px solid var(--sea-blue);
          --field-shadow-focus: 0 0 0 3px rgba(11, 126, 168, 0.15);
          --field-bg:           #ffffff;
          --field-bg-section:   #f8fafc;

          /* Divider between country selector and number input */
          --divider-color:      var(--sea-blue-border);
        }

        /* ── Standard text / email / password inputs ───────────────────────── */
        .sea-input {
          border: var(--field-border) !important;
          height: var(--field-height);
        }
        .sea-input:focus {
          border: var(--field-border-focus) !important;
          box-shadow: var(--field-shadow-focus) !important;
        }
        .sea-input:disabled {
          background-color: var(--field-bg-section) !important;
          cursor: not-allowed;
          opacity: 0.7;
        }

        /* ═══════════════════════════════════════════════════════════════════
           PHONE FIELD
           Architecture:
             .phone-field          — the outer shell (border, radius, height)
               .cc-trigger         — left section: flag + code + chevron
               .phone-divider      — 1px vertical rule
               .phone-number-wrap  — right section: icon + <input>
                 .phone-number-icon
                 .phone-number-input
           ════════════════════════════════════════════════════════════════════ */

        /* Outer shell ─────────────────────────────────────────────────────── */
        .phone-field {
          display:       flex;
          align-items:   stretch;        /* children stretch to full height    */
          height:        var(--field-height);
          border:        var(--field-border);
          border-radius: var(--field-radius);
          background:    var(--field-bg);
          overflow:      visible;        /* MUST be visible — dropdown is fixed */
          transition:    border-color 0.15s ease, box-shadow 0.15s ease;
        }

        /* Focus ring on the whole field when any child is focused ─────────── */
        .phone-field:focus-within {
          border:     var(--field-border-focus);
          box-shadow: var(--field-shadow-focus);
        }

        /* Country-code trigger ─────────────────────────────────────────────── */
        .cc-trigger {
          /* Layout */
          display:        flex;
          align-items:    center;
          gap:            6px;
          flex-shrink:    0;
          padding:        0 10px 0 12px;
          /* Geometry — left side of the pill */
          border-radius:  calc(var(--field-radius) - 2px) 0 0 calc(var(--field-radius) - 2px);
          /* Appearance */
          background:     var(--field-bg-section);
          border:         none;
          cursor:         pointer;
          transition:     background 0.15s ease;
          /* Stop click events reaching the form */
          type:           button;
        }
        .cc-trigger:hover  { background: #edf4f8; }
        .cc-trigger:focus  { outline: none; }
        .cc-trigger:active { background: #e2eef5; }

        .cc-flag {
          font-size:   18px;
          line-height: 1;
          user-select: none;
        }

        .cc-code {
          font-size:      13px;
          font-weight:    600;
          color:          #374151;
          letter-spacing: -0.2px;
          font-variant-numeric: tabular-nums;
          white-space:    nowrap;
        }

        .cc-chevron {
          width:        12px;
          height:       12px;
          color:        #9ca3af;
          flex-shrink:  0;
          transition:   transform 0.2s ease, color 0.15s ease;
        }
        .cc-trigger:hover .cc-chevron  { color: #6b7280; }
        .cc-chevron--open              { transform: rotate(180deg); }

        /* Vertical divider between trigger and number input ──────────────── */
        .phone-divider {
          width:            1px;
          align-self:       stretch;
          background-color: var(--divider-color);
          flex-shrink:      0;
          margin:           8px 0;        /* gap top & bottom so it doesn't touch border */
        }

        /* Number input wrapper ─────────────────────────────────────────────── */
        .phone-number-wrap {
          position:   relative;
          flex:       1;
          display:    flex;
          align-items: center;
          min-width:  0;                  /* allow shrinking */
        }

        /* Phone icon ─────────────────────────────────────────────────────────
           Positioned at 12px from left of the wrapper, centred vertically.    */
        .phone-number-icon {
          position:         absolute;
          left:             12px;
          top:              50%;
          transform:        translateY(-50%);
          pointer-events:   none;
          display:          flex;
          align-items:      center;
        }

        /* Actual <input> ─────────────────────────────────────────────────────
           No border, no shadow, no radius — the outer shell handles all of
           that. Padding-left accounts for the icon (12px left + 20px icon + 8px gap). */
        .phone-number-input {
          flex:             1;
          height:           100%;
          border:           none !important;
          box-shadow:       none !important;
          outline:          none !important;
          background:       transparent;
          padding:          0 12px 0 40px;
          font-size:        14px;
          color:            #111827;
          border-radius:    0 calc(var(--field-radius) - 2px) calc(var(--field-radius) - 2px) 0;
          min-width:        0;
        }
        .phone-number-input::placeholder { color: #9ca3af; }
        .phone-number-input:disabled     { cursor: not-allowed; opacity: 0.6; }

        /* ═══════════════════════════════════════════════════════════════════
           DROPDOWN PANEL  (fixed-position, rendered outside overflow parents)
           ════════════════════════════════════════════════════════════════════ */

        .cc-panel {
          background:    #ffffff;
          border-radius: 12px;
          border:        1px solid #e5e7eb;
          box-shadow:    0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
          overflow:      hidden;
          display:       flex;
          flex-direction: column;
        }

        .cc-search-wrap {
          padding:       8px 8px 6px;
          border-bottom: 1px solid #f3f4f6;
        }

        .cc-search {
          width:         100%;
          padding:       8px 12px;
          font-size:     13px;
          border:        1px solid #e5e7eb;
          border-radius: 8px;
          background:    #f9fafb;
          outline:       none;
          color:         #111827;
          transition:    border-color 0.15s;
        }
        .cc-search:focus { border-color: var(--sea-blue); }

        .cc-list {
          overflow-y: auto;
          max-height: 240px;
        }

        .cc-empty {
          padding:    14px;
          font-size:  13px;
          color:      #9ca3af;
          text-align: center;
        }

        .cc-option {
          width:       100%;
          padding:     9px 14px;
          display:     flex;
          align-items: center;
          gap:         10px;
          border:      none;
          background:  transparent;
          cursor:      pointer;
          text-align:  left;
          transition:  background 0.1s ease;
        }
        .cc-option:hover          { background: #f0f9ff; }
        .cc-option--selected      { background: #e0f4fb; }

        .cc-option-flag {
          font-size:    16px;
          width:        22px;
          flex-shrink:  0;
          user-select:  none;
        }

        .cc-option-code {
          font-size:   12px;
          font-weight: 500;
          color:       #374151;
          width:       44px;
          flex-shrink: 0;
          font-variant-numeric: tabular-nums;
        }
        .cc-option-code--bold { font-weight: 700; color: var(--sea-blue); }

        .cc-option-name {
          font-size:   13px;
          color:       #6b7280;
          overflow:    hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cc-option--selected .cc-option-name { color: #374151; }

        /* ── Submit button ──────────────────────────────────────────────────── */
        .sea-btn {
          background: linear-gradient(135deg, var(--sea-blue), var(--sea-green));
          transition: all 0.3s ease;
        }
        .sea-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--sea-blue-dark), var(--sea-green-dark));
          box-shadow: 0 8px 25px rgba(11, 126, 168, 0.4);
          transform:  translateY(-1px);
        }
        .sea-btn:active:not(:disabled) { transform: scale(0.99); }

        .sea-checkbox { accent-color: var(--sea-blue); }
      `}</style>

      <div className="min-h-[90vh] flex">

        {/* ── Left decorative panel ─────────────────────────────────────────── */}
        <div
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--sea-gradient-start), var(--sea-gradient-end))" }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: "url('https://res.cloudinary.com/dtzrivqye/image/upload/v1772826527/a7vhwsgx4de6er8bl0z3.jpg')",
            opacity: 0.55,
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, rgba(6,78,110,0.75) 0%, rgba(11,125,112,0.65) 100%)",
          }} />
          <div className="absolute bottom-[-60px] left-[-60px] w-80 h-80 rounded-full opacity-10"
            style={{ background: "var(--sea-green-light)" }} />
          <div className="absolute top-[-40px] right-[-40px] w-56 h-56 rounded-full opacity-10"
            style={{ background: "var(--sea-blue-light)" }} />

          <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
            <h1 className="font-serif text-6xl mb-6" style={{ fontFamily: "'Dancing Script', cursive" }}>
              {COMPANY_NAME}
            </h1>
            <p className="text-xl max-w-md leading-relaxed mb-8" style={{ color: "#b3e8e4" }}>
              Travel is the only purchase that enriches you in ways beyond material wealth
            </p>
            <div className="space-y-4">
              {["Discover amazing destinations", "Exclusive travel packages", "24/7 customer support"].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.15)" }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="w-full h-16 opacity-20">
              <path d="M0,40 C100,80 300,0 400,40 L400,80 L0,80 Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* ── Right panel / form ────────────────────────────────────────────── */}
        <div className="w-full lg:w-1/2 flex items-start justify-center p-6 sm:p-8 bg-white relative overflow-y-auto">

          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at top right, rgba(11,126,168,0.06) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(14,158,142,0.06) 0%, transparent 60%)",
          }} />

          <div className="absolute top-8 right-8 pointer-events-none">
            <svg className="w-32 h-16" viewBox="0 0 200 80" fill="none">
              <path d="M 10 40 Q 60 20, 120 30 T 190 35" stroke="#0B7EA8" strokeWidth="2" strokeDasharray="4 4" opacity="0.45" />
              <path d="M 180 30 L 190 35 L 180 40 Z" fill="#0B7EA8" />
            </svg>
          </div>

          <div className="w-full max-w-2xl py-8 relative z-10">

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold mb-2" style={{
                background: "linear-gradient(135deg, var(--sea-blue), var(--sea-green))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Create Account
              </h2>
              <p className="text-gray-500 text-sm">Join us and start your journey</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {([
                  { id: "firstName",  label: "First Name",  placeholder: "John",   required: true  },
                  { id: "middleName", label: "Middle Name", placeholder: "Middle", required: false },
                  { id: "lastName",   label: "Last Name",   placeholder: "Doe",    required: true  },
                ] as const).map(({ id, label, placeholder, required }) => (
                  <div key={id}>
                    <label className={labelClass} style={{ color: "var(--sea-blue)" }}>
                      {label}{" "}
                      {required
                        ? <span className="text-red-500">*</span>
                        : <span className="text-gray-400 text-xs font-normal">(Optional)</span>}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <IconUser />
                      </div>
                      <input
                        id={id} name={id} type="text" required={required}
                        value={formData[id]}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={placeholder}
                        disabled={loading}
                        autoComplete={
                          id === "firstName" ? "given-name" :
                          id === "lastName"  ? "family-name" : "additional-name"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Username + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} style={{ color: "var(--sea-blue)" }}>
                    Username <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <IconUser />
                    </div>
                    <input
                      id="username" name="username" type="text" required
                      value={formData.username}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="johndoe"
                      disabled={loading}
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} style={{ color: "var(--sea-blue)" }}>
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <IconEmail />
                    </div>
                    <input
                      id="email" name="email" type="email" required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="john@example.com"
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className={labelClass} style={{ color: "var(--sea-blue)" }}>
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <IconLock />
                  </div>
                  <input
                    id="password" name="password"
                    type={showPassword ? "text" : "password"} required
                    value={formData.password}
                    onChange={handleChange}
                    className={`${inputClass} pr-12`}
                    placeholder="Create a strong password"
                    disabled={loading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* ── Mobile numbers ─────────────────────────────────────────────
                  Each field = .phone-field (the outer shell that owns the border)
                    ├─ <CountryCodeDropdown>  (.cc-trigger inside)
                    ├─ .phone-divider         (1px vertical rule)
                    └─ .phone-number-wrap
                         ├─ .phone-number-icon
                         └─ .phone-number-input
              ────────────────────────────────────────────────────────────────── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Primary */}
                <div>
                  <label className={labelClass} style={{ color: "var(--sea-blue)" }}>
                    Primary Mobile <span className="text-red-500">*</span>
                  </label>
                  <div className="phone-field">
                    <CountryCodeDropdown
                      selectedPhoneCode={phoneCode1}
                      onSelect={(c) => {
                        setPhoneCode1(primaryPhoneCode(c.phoneCode));
                        setFormData((prev) => ({ ...prev, mobileNumber1: "" }));
                      }}
                      id="mobile1"
                    />
                    <div className="phone-divider" />
                    <div className="phone-number-wrap">
                      <span className="phone-number-icon">
                        <IconPhone />
                      </span>
                      <input
                        id="mobileNumber1"
                        name="mobileNumber1"
                        type="tel"
                        required
                        value={formData.mobileNumber1}
                        onChange={(e) => handlePhoneChange(e, "mobileNumber1")}
                        className="phone-number-input"
                        placeholder="Phone number"
                        disabled={loading}
                        autoComplete="tel-national"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary */}
                <div>
                  <label className={labelClass} style={{ color: "var(--sea-blue)" }}>
                    Secondary Mobile{" "}
                    <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                  </label>
                  <div className="phone-field">
                    <CountryCodeDropdown
                      selectedPhoneCode={phoneCode2}
                      onSelect={(c) => {
                        setPhoneCode2(primaryPhoneCode(c.phoneCode));
                        setFormData((prev) => ({ ...prev, mobileNumber2: "" }));
                      }}
                      id="mobile2"
                    />
                    <div className="phone-divider" />
                    <div className="phone-number-wrap">
                      <span className="phone-number-icon">
                        <IconPhone />
                      </span>
                      <input
                        id="mobileNumber2"
                        name="mobileNumber2"
                        type="tel"
                        value={formData.mobileNumber2}
                        onChange={(e) => handlePhoneChange(e, "mobileNumber2")}
                        className="phone-number-input"
                        placeholder="Phone number"
                        disabled={loading}
                        autoComplete="tel-national"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div
                className="flex items-start gap-3 p-3.5 rounded-xl border"
                style={{ borderColor: "var(--sea-blue-border)", background: "var(--sea-blue-pale)" }}
              >
                <input
                  type="checkbox" id="terms" required
                  className="sea-checkbox mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer select-none">
                  I agree to the{" "}
                  <Link href={TERMS_AND_CONDITIONS_PAGE_PATH}
                    className="font-semibold transition-colors hover:underline"
                    style={{ color: "var(--sea-blue)" }}>
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href={PRIVACY_POLICY_PAGE_PATH}
                    className="font-semibold transition-colors hover:underline"
                    style={{ color: "var(--sea-blue)" }}>
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="sea-btn w-full text-white font-semibold py-4 px-6 rounded-xl focus:outline-none shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm tracking-wider"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href={LOGIN_PAGE_PATH}
                  className="font-semibold transition-colors hover:underline"
                  style={{ color: "var(--sea-green)" }}>
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>

          {/* Decorative monuments */}
          <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none select-none">
            <svg className="w-96 h-64" viewBox="0 0 400 300" fill="#0B7EA8">
              <ellipse cx="200" cy="280" rx="180" ry="20" opacity="0.3" />
              <rect x="160" y="180" width="80" height="100" rx="4" />
              <path d="M 200 140 L 140 180 L 260 180 Z" />
              <circle cx="200" cy="130" r="25" />
              <rect x="120" y="200" width="30" height="80" />
              <rect x="250" y="200" width="30" height="80" />
              <path d="M 135 200 L 120 180 L 150 180 Z" />
              <path d="M 265 200 L 250 180 L 280 180 Z" />
              <g transform="translate(80, 0)">
                <rect x="30" y="200" width="20" height="80" transform="skewX(-5)" />
                <rect x="30" y="200" width="20" height="10" />
                <rect x="30" y="220" width="20" height="10" />
                <rect x="30" y="240" width="20" height="10" />
                <rect x="30" y="260" width="20" height="10" />
              </g>
              <g transform="translate(220, 0)">
                <rect x="30" y="220" width="40" height="60" rx="2" />
                <ellipse cx="50" cy="220" rx="25" ry="20" />
                <rect x="47" y="200" width="6" height="20" />
                <circle cx="50" cy="198" r="4" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}