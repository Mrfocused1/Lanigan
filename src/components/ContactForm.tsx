"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useContent } from "./ContentProvider";

const budgets = ["Under £5k", "£5k–£10k", "£10k–£20k", "£20k+", "Not sure yet"];

type State = "idle" | "loading" | "done" | "error";

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactForm() {
  const { services } = useContent();
  const ref = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim() || null,
      phone: String(fd.get("phone") || "").trim() || null,
      service: String(fd.get("service") || "") || null,
      postcode: String(fd.get("postcode") || "").trim() || null,
      budget: String(fd.get("budget") || "") || null,
      message: String(fd.get("message") || "").trim() || null,
      source: "website",
    };

    if (!payload.name || (!payload.email && !payload.phone)) {
      setState("error");
      setError("Please add your name and either an email or phone number.");
      return;
    }

    const { error: err } = await supabase.from("lanigan_leads").insert(payload);
    if (err) {
      setState("error");
      setError("Something went wrong — please call us instead.");
      return;
    }
    setState("done");
    ref.current?.reset();
  }

  if (state === "done") {
    return (
      <div className="rounded-[6px] border border-line bg-card p-10 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-tint text-2xl text-brand">
          ✓
        </div>
        <h3 className="font-display mt-6 text-2xl font-semibold text-ink">Enquiry received</h3>
        <p className="mt-3 text-muted">
          Thanks — we&apos;ve got your details and will be in touch shortly to arrange a visit.
        </p>
        <button onClick={() => setState("idle")} className="btn btn-ghost mt-7">
          Send another
        </button>
      </div>
    );
  }

  const input =
    "field w-full rounded-[5px] border border-line bg-card px-4 py-3.5 text-ink outline-none transition placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/15";
  const select = `${input} cursor-pointer appearance-none pr-10`;

  return (
    <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Full name *" className={input} required />
        <input name="phone" type="tel" placeholder="Phone" className={input} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="email" type="email" placeholder="Email" className={input} />
        <input name="postcode" placeholder="Postcode" className={input} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <select name="service" className={select} defaultValue="">
            <option value="" disabled>
              Service needed
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          <Chevron />
        </div>
        <div className="relative">
          <select name="budget" className={select} defaultValue="">
            <option value="" disabled>
              Approx. budget
            </option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>
      <textarea
        name="message"
        rows={4}
        placeholder="Tell us about the project…"
        className={`${input} resize-none`}
      />

      {state === "error" && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={state === "loading"} className="btn btn-primary w-full justify-center sm:w-auto">
        {state === "loading" ? "Sending…" : "Send enquiry →"}
      </button>
      <p className="text-xs text-faint">
        We&apos;ll only use your details to respond to your enquiry.
      </p>
    </form>
  );
}
