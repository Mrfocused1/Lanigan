"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { supabase } from "@/lib/supabase";
import BrandLogo from "@/components/BrandLogo";

export default function AdminLogin() {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useGSAP(
    () => {
      gsap.from(ref.current!.querySelectorAll(".anim"), {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) setError(err.message);
  }

  const input =
    "w-full rounded-[5px] border border-line bg-card px-4 py-3.5 text-ink outline-none transition placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/15";

  return (
    <div className="grid min-h-screen bg-paper md:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden flex-col justify-between bg-ink p-12 text-paper md:flex">
        <Link href="/" aria-label="Lanigan Builds home">
          <BrandLogo className="h-12 w-auto text-paper" />
        </Link>
        <div>
          <p className="eyebrow !text-lime">Internal</p>
          <h1 className="font-display mt-4 text-5xl font-semibold leading-[0.95]">
            Lead &amp;<br />Project CRM
          </h1>
          <p className="mt-6 max-w-sm text-faint">
            Manage enquiries from the website, track the pipeline and never lose a quote.
          </p>
        </div>
        <p className="text-xs text-faint">© {new Date().getFullYear()} Lanigan Builds Ltd</p>
      </div>

      {/* Form */}
      <div ref={ref} className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-sm">
          <p className="anim eyebrow">Admin access</p>
          <h2 className="anim font-display mt-3 text-3xl font-semibold text-ink">Sign in</h2>
          <p className="anim mt-2 text-sm text-muted">Authorised staff only.</p>

          <div className="anim mt-8 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={input}
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={input}
              required
            />
          </div>

          {error && <p className="anim mt-4 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="anim btn btn-primary mt-6 w-full justify-center"
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>

          <Link href="/" className="anim link-sweep mt-6 inline-block text-sm text-muted">
            ← Back to site
          </Link>
        </form>
      </div>
    </div>
  );
}
