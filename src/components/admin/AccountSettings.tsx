"use client";

import { useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

const inputCls =
  "w-full rounded-[5px] border border-line bg-card px-3 py-2 text-sm text-ink outline-none focus:border-brand";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-faint";

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[10px] border border-line bg-card p-5 md:p-6">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export default function AccountSettings({ session }: { session: Session }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pwStatus, setPwStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [pwError, setPwError] = useState("");

  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [emailError, setEmailError] = useState("");

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    if (password.length < 6) {
      setPwError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setPwError("Passwords don't match.");
      return;
    }
    setPwStatus("saving");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setPwStatus("error");
      setPwError(error.message);
      return;
    }
    setPwStatus("saved");
    setPassword("");
    setConfirm("");
    setTimeout(() => setPwStatus("idle"), 3000);
  }

  async function changeEmail(e: React.FormEvent) {
    e.preventDefault();
    setEmailError("");
    setEmailStatus("saving");
    const { error } = await supabase.auth.updateUser({ email });
    if (error) {
      setEmailStatus("error");
      setEmailError(error.message);
      return;
    }
    setEmailStatus("saved");
    setEmail("");
    setTimeout(() => setEmailStatus("idle"), 5000);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card title="Change password" description="Update the password used to sign in to this dashboard.">
        <form onSubmit={changePassword} className="space-y-4">
          <label className="block">
            <span className={labelCls}>New password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              minLength={6}
              required
            />
          </label>
          <label className="block">
            <span className={labelCls}>Confirm new password</span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputCls}
              minLength={6}
              required
            />
          </label>
          {pwError && <p className="text-sm text-red-600">{pwError}</p>}
          {pwStatus === "saved" && <p className="text-sm text-brand">✓ Password updated</p>}
          <button type="submit" disabled={pwStatus === "saving"} className="btn btn-primary !py-2.5">
            {pwStatus === "saving" ? "Saving…" : "Update password"}
          </button>
        </form>
      </Card>

      <Card
        title="Change login email"
        description={`Currently signed in as ${session.user.email}. Changing this sends a confirmation link to the new address — it only takes effect once that link is clicked.`}
      >
        <form onSubmit={changeEmail} className="space-y-4">
          <label className="block">
            <span className={labelCls}>New email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder="lanigansconstruction@gmail.com"
              required
            />
          </label>
          {emailError && <p className="text-sm text-red-600">{emailError}</p>}
          {emailStatus === "saved" && (
            <p className="text-sm text-brand">✓ Confirmation link sent — check the new inbox to finish the change.</p>
          )}
          <button type="submit" disabled={emailStatus === "saving"} className="btn btn-primary !py-2.5">
            {emailStatus === "saving" ? "Sending…" : "Update email"}
          </button>
        </form>
      </Card>
    </div>
  );
}
