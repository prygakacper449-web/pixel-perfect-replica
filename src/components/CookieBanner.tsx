import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "obp-cookie-consent";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);
  if (!show) return null;
  const choose = (v: "accepted" | "declined") => {
    localStorage.setItem(KEY, v);
    setShow(false);
  };
  return (
    <div role="dialog" aria-label="Pliki cookie" className="fixed inset-x-3 bottom-24 z-50 mx-auto max-w-xl rounded-2xl border bg-card p-5 shadow-lift md:bottom-6">
      <p className="text-base">
        Używamy plików cookie, aby strona działała poprawnie, a za Twoją zgodą – do analizy ruchu.{" "}
        <Link to="/polityka-prywatnosci" className="underline">Polityka prywatności</Link>
      </p>
      <div className="mt-4 flex gap-3">
        <Button variant="cta" size="lg" onClick={() => choose("accepted")}>Akceptuję</Button>
        <Button variant="ctaOutline" size="lg" onClick={() => choose("declined")}>Odrzucam</Button>
      </div>
    </div>
  );
}
