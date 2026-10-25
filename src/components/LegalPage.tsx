import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SITE } from "@/config/site";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-16">
      <Link to="/" className="text-muted-foreground underline">← {SITE.brand}</Link>
      <h1 className="mt-6 text-4xl">{title}</h1>
      <div className="mt-6 space-y-4 text-lg">{children}</div>
    </main>
  );
}
