import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  Check, Landmark, Stethoscope, FileQuestion, Briefcase, Users, ListChecks, Scale, FileText,
  MessageCircle, Smartphone, PiggyBank, X, ArrowRight, Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE, TESTIMONIALS } from "@/config/site";
import { supabase } from "@/integrations/supabase/client";
import bundle from "@/assets/covers-bundle.jpg";

const TITLE = "Opiekun bez paniki – poradniki dla opiekunów rodzica z demencją";
const DESC = "3 praktyczne poradniki, które przeprowadzą Cię krok po kroku przez formalności, pieniądze i pracę, gdy rodzic choruje na demencję. Bez prawniczego żargonu.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BOOKS = [
  {
    title: "Kto podpisze za mamę?",
    tagline: "Formalności i decyzje, zanim będzie za późno",
    tone: "bg-navy text-navy-foreground",
    items: [
      "Pełnomocnictwo u notariusza krok po kroku: co wpisać, ile kosztuje, jak przygotować wizytę",
      "Pełnomocnictwo do konta w banku i jak sprawić, żeby bank je honorował",
      "Upoważnienia w przychodni i szpitalu – 2 minuty, 0 zł",
      "ZUS, poczta, urzędy, media – kto przyjmie jakie pełnomocnictwo",
      "Co zrobić, gdy jest już za późno: ubezwłasnowolnienie i kurator",
      "Jak chronić rodzica przed oszustami: zastrzeżenie PESEL, ustawienia banku, umowy podpisane bez świadomości",
    ],
  },
  {
    title: "Pieniądze na opiekę",
    tagline: "Świadczenia, ulgi i koszty opieki – bez zgadywania",
    tone: "bg-gold-soft text-foreground",
    items: [
      "Mapa świadczeń: dodatek pielęgnacyjny, świadczenie wspierające, zasiłki, bon senioralny",
      "Orzeczenia i komisje: jak się przygotować i jak skutecznie się odwołać",
      "Dom opieki (DPS) i ZOL: ile kosztuje, kto płaci, kiedy możesz być zwolniony z opłaty",
      "Opiekunka, usługi z gminy, opieka wytchnieniowa, teleopieka",
      "Ulga rehabilitacyjna w PIT – także za ostatnie lata",
      "Gotowe wzory pism, arkusz budżetu, dziennik opieki do komisji",
    ],
  },
  {
    title: "Między etatem a opieką",
    tagline: "Jak opiekować się rodzicem i nie stracić pracy",
    tone: "bg-sage text-accent-foreground",
    items: [
      "Twoje prawa w pracy: urlop opiekuńczy, zwolnienie z powodu siły wyższej, praca zdalna",
      "Jak rozmawiać z szefem i gotowe wzory wniosków",
      "6 scenariuszy awaryjnych: co robić, gdy rodzic zniknie albo trafi do szpitala, a Ty jesteś w pracy",
      "Rodzina, partner, rodzeństwo – jak nie stracić bliskich",
      "Jak rozpoznać wypalenie opiekuna i gdzie szukać wsparcia",
    ],
  },
];

const PROBLEMS = [
  { icon: Landmark, text: "Bank nie chce rozmawiać z Tobą o koncie mamy – nawet gdy trzeba zapłacić za jej leki." },
  { icon: Stethoscope, text: "Lekarz nie powie Ci, co dzieje się z tatą, bo nie masz upoważnienia." },
  { icon: FileQuestion, text: "Nie wiesz, jakie świadczenia Wam przysługują, a urzędnik sam nic nie powie." },
  { icon: Briefcase, text: "Szef patrzy krzywo, gdy kolejny raz wychodzisz wcześniej." },
  { icon: Users, text: "Rodzeństwo pyta, gdzie są pieniądze, a Ty nie śpisz od tygodni." },
];

const TRANSFORM = [
  ["Chaos papierów i strach, że coś przegapisz.", "Jedna lista, jedna teczka, wiesz dokładnie, co już masz, a co załatwić."],
  ["Bezradność w banku, u notariusza i w przychodni.", "Wiesz, z jakim dokumentem iść i co powiedzieć."],
  ["Płacisz z własnej kieszeni, bo nie wiesz o świadczeniach.", "Wiesz, o co złożyć wniosek, gdzie i w jakiej kolejności."],
  ["Wybór: mama albo praca.", "Znasz swoje prawa w pracy i masz gotowe wzory wniosków."],
  ["Kłótnie z rodzeństwem o pieniądze.", "Przejrzysta tabela kosztów i zasady spisane czarno na białym."],
  ["Noce bez snu i poczucie winy.", "Plan na kryzysy i więcej czasu, żeby po prostu być z rodzicem."],
];

const BENEFITS = [
  { icon: ListChecks, t: "Konkretnie, krok po kroku", d: "Zamiast ogólników: co, gdzie, z jakim dokumentem i w jakiej kolejności." },
  { icon: Scale, t: "Aktualne przepisy", d: "Kwoty i zasady według stanu na 2026 r." },
  { icon: FileText, t: "Gotowe wzory", d: "Wnioski i pisma do skopiowania i uzupełnienia." },
  { icon: MessageCircle, t: "Ludzkim językiem", d: "Bez prawniczego żargonu, czytasz w 10 minut przy kawie." },
  { icon: Smartphone, t: "Na telefonie i na papierze", d: "PDF czytasz wszędzie albo drukujesz do teczki." },
  { icon: PiggyBank, t: "Oszczędność czasu i pieniędzy", d: "Jedna przeoczona rzecz może kosztować miesiące w urzędach. Tu masz wszystko w jednym miejscu." },
];

const FOR_WHO = [
  "Dla Ciebie, jeśli Twój rodzic dostał diagnozę demencji lub zaczyna zapominać.",
  "Jeśli pracujesz i opiekujesz się rodzicem jednocześnie.",
  "Jeśli mieszkasz daleko lub za granicą, a rodzic jest w Polsce.",
  "Jeśli rodzic jest jeszcze sprawny, ale chcesz zabezpieczyć się, zanim będzie za późno.",
];

const FAQ = [
  ["W jakiej formie dostanę poradniki?", "W formie plików PDF. Link do pobrania trafia na Twój e-mail zaraz po płatności. Możesz czytać na telefonie, tablecie, komputerze albo wydrukować."],
  ["Mama ma już diagnozę. Czy nie jest za późno?", "Często nie. Wiele rzeczy da się załatwić, dopóki rodzic rozumie, co podpisuje. Poradnik pomaga to ocenić. Jeśli rzeczywiście jest za późno, opisujemy drogę sądową krok po kroku."],
  ["Rodzic jest jeszcze zdrowy. Czy to dla mnie?", "Tak – to najlepszy moment. Najwięcej spraw załatwia się najłatwiej i najtaniej, zanim pojawi się choroba."],
  ["Czy przepisy są aktualne?", "Poradniki opisują stan prawny i kwoty na 2026 r. W tekście zaznaczamy też planowane zmiany w prawie."],
  ["Czy to zastępuje prawnika?", "Nie. To praktyczny przewodnik, a nie porada prawna w Twojej indywidualnej sprawie. W wielu sytuacjach wystarczy, a w trudniejszych pomoże Ci przygotować się do rozmowy z prawnikiem."],
  ["Mieszkam za granicą. Czy to mi pomoże?", "Tak. Poradniki opisują polskie przepisy i podpowiadają, co załatwić na miejscu, żeby potem działać na odległość."],
  ["Czy mogę kupić tylko jeden poradnik?", "Tak. Każdy poradnik możesz kupić osobno. Pakiet jest korzystniejszy cenowo i obejmuje wszystkie trzy obszary: formalności, pieniądze i pracę."],
  ["Nie dostałam maila z plikami. Co robić?", `Sprawdź folder spam i oferty. Jeśli nadal nic nie ma, napisz na ${SITE.contactEmail} – odpiszemy i wyślemy pliki.`],
];

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-5 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mx-auto mb-10 max-w-3xl text-center text-3xl md:text-5xl">{children}</h2>;
}

function Tick({ className = "bg-sage text-accent-foreground" }: { className?: string }) {
  return (
    <span className={`mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full ${className}`}>
      <Check className="size-4" strokeWidth={3} />
    </span>
  );
}

function BuyLink({ children, variant = "cta" as const }: { children: ReactNode; variant?: "cta" | "ctaOutline" }) {
  return (
    <Button asChild variant={variant} size="xl" className="w-full sm:w-auto">
      <a href={SITE.paymentLink}>{children}</a>
    </Button>
  );
}

function Cover({ book }: { book: (typeof BOOKS)[number] }) {
  return (
    <div className={`flex aspect-[3/4] w-28 shrink-0 flex-col justify-between rounded-lg p-3 shadow-lift ${book.tone}`}>
      <span className="text-[10px] uppercase tracking-widest opacity-70">{SITE.brand}</span>
      <span className="font-display text-sm leading-tight">{book.title}</span>
    </div>
  );
}

function LeadForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setState("loading");
    const { error } = await supabase.from("leads").insert({ email: email.trim().toLowerCase(), consent: true });
    setState(error ? "error" : "ok");
  };
  if (state === "ok")
    return <p className="rounded-2xl bg-sage-soft p-6 text-center text-lg">Dziękujemy! Checklista jest w drodze na Twój e-mail.</p>;
  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-4">
      <label className="sr-only" htmlFor="lead-email">E-mail</label>
      <input
        id="lead-email" type="email" required maxLength={255} value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="Twój e-mail"
        className="h-14 w-full rounded-full border-2 border-input bg-card px-6 text-lg outline-none focus:border-primary"
      />
      <label className="flex items-start gap-3 text-base">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1.5 size-5 accent-primary" />
        Zgadzam się na otrzymywanie wiadomości e-mail
      </label>
      <Button type="submit" variant="cta" size="xl" className="w-full" disabled={state === "loading"}>
        {state === "loading" ? "Wysyłanie…" : "Wyślij mi checklistę"}
      </Button>
      {state === "error" && <p className="text-center text-destructive">Coś poszło nie tak. Spróbuj ponownie.</p>}
    </form>
  );
}

function Index() {
  return (
    <div className="pb-24 md:pb-0">
      <header className="px-5 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-display text-xl font-semibold">{SITE.brand}</span>
          <a href="#cennik" className="hidden text-base font-medium underline-offset-4 hover:underline md:block">Cennik</a>
        </div>
      </header>

      {/* HERO */}
      <section className="px-5 pt-6 pb-16 md:pt-12 md:pb-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <Reveal>
            <h1 className="text-[2.1rem] md:text-6xl">
              Mama zaczyna zapominać. <span className="text-muted-foreground">Ty nie możesz sobie pozwolić na zapomnienie o niczym.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl">
              3 praktyczne poradniki, które przeprowadzą Cię krok po kroku przez formalności, pieniądze i pracę, gdy rodzic choruje na demencję. Bez prawniczego żargonu. Bez paniki.
            </p>
            <ul className="mt-6 space-y-3">
              {["Co podpisać, zanim będzie za późno", "Jakie pieniądze należą się Twojemu rodzicowi i Tobie", "Jak opiekować się rodzicem i nie stracić pracy"].map((b) => (
                <li key={b} className="flex gap-3 font-medium"><Tick className="bg-primary text-primary-foreground" />{b}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild variant="cta" size="xl"><a href="#cennik">Chcę pakiet 3 poradników – {SITE.bundlePrice} zł</a></Button>
              <a href="#co-dostajesz" className="text-center font-medium underline underline-offset-4">Zobacz, co jest w środku ↓</a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">PDF • natychmiast na e-mail • czytasz na telefonie lub drukujesz</p>
          </Reveal>
          <Reveal delay={150}>
            <img src={bundle} alt="Okładki trzech poradników Opiekun bez paniki" width={1280} height={1024} className="w-full rounded-3xl shadow-lift" />
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <Section className="bg-secondary">
        <H2>Czy to brzmi znajomo?</H2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, text }, i) => (
            <Reveal key={text} delay={i * 60}>
              <div className="flex h-full gap-4 rounded-2xl bg-card p-6 shadow-soft">
                <Icon className="size-7 shrink-0 text-primary" />
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mx-auto mt-12 max-w-2xl text-center font-display text-2xl md:text-3xl">
            Nie jesteś sama. I nie musisz wszystkiego rozgryzać sama.
          </p>
        </Reveal>
      </Section>

      {/* TRANSFORMATION */}
      <Section>
        <H2>Co zmieni się w Twoim życiu</H2>
        <div className="mx-auto max-w-4xl space-y-4">
          <div className="hidden grid-cols-2 gap-4 px-2 text-sm font-semibold uppercase tracking-widest md:grid">
            <span className="text-muted-foreground">Teraz</span><span className="text-sage">Po przeczytaniu</span>
          </div>
          {TRANSFORM.map(([before, after], i) => (
            <Reveal key={before} delay={i * 50}>
              <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                <div className="flex gap-3 rounded-2xl bg-muted p-5 text-muted-foreground">
                  <X className="mt-1 size-5 shrink-0" />
                  <p><span className="mr-1 text-xs font-semibold uppercase tracking-widest md:hidden">Teraz:</span>{before}</p>
                </div>
                <div className="flex gap-3 rounded-2xl border-2 border-sage/40 bg-card p-5 shadow-soft">
                  <Tick />
                  <p className="font-medium"><span className="mr-1 text-xs font-semibold uppercase tracking-widest text-sage md:hidden">Po:</span>{after}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PRODUCT */}
      <Section id="co-dostajesz" className="bg-secondary">
        <H2>Co dostajesz</H2>
        <div className="grid gap-6 lg:grid-cols-3">
          {BOOKS.map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <article className="h-full rounded-3xl bg-card p-6 shadow-soft md:p-8">
                <div className="flex items-end gap-4">
                  <Cover book={b} />
                  <div>
                    <h3 className="text-2xl">{b.title}</h3>
                    <p className="mt-1 text-base text-muted-foreground">{b.tagline}</p>
                  </div>
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">W środku</p>
                <ul className="mt-3 space-y-3 text-base">
                  {b.items.map((it) => <li key={it} className="flex gap-3"><Tick />{it}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl border-2 border-primary bg-gold-soft p-6 text-center text-lg font-medium md:p-8 md:text-xl">
            W pakiecie: 3 poradniki (ponad 150 stron), wzory pism, checklisty, tabele i plan działania na pierwsze tygodnie.
          </div>
        </Reveal>
      </Section>

      {/* BENEFITS */}
      <Section>
        <H2>Dlaczego te poradniki</H2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 60}>
              <div className="h-full rounded-2xl border bg-card p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gold-soft"><Icon className="size-6 text-foreground" /></span>
                <h3 className="mt-4 text-xl">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FOR WHO */}
      <Section className="bg-sage-soft">
        <H2>Dla kogo jest ten pakiet</H2>
        <div className="mx-auto max-w-3xl">
          <ul className="space-y-4">
            {FOR_WHO.map((f) => <li key={f} className="flex gap-3 rounded-2xl bg-card p-5 text-lg shadow-soft"><Tick />{f}</li>)}
          </ul>
          <p className="mt-8 border-l-4 border-sage pl-4 text-base text-muted-foreground">
            Nie jest to porada prawna w Twojej indywidualnej sprawie. W skomplikowanych sytuacjach (spory sądowe, spadki) warto skonsultować się z prawnikiem – poradnik pomoże Ci przygotować się do tej rozmowy.
          </p>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="cennik">
        <H2>Wybierz, czego potrzebujesz</H2>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="lg:order-2">
            <div className="relative rounded-3xl border-2 border-primary bg-card p-7 shadow-lift md:p-10">
              <span className="absolute -top-4 left-7 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">Najczęściej wybierane</span>
              <h3 className="text-2xl md:text-3xl">Pakiet 3 poradników</h3>
              <p className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-4xl md:text-5xl">{SITE.bundlePrice} zł</span>
                <s className="text-lg text-muted-foreground">{SITE.singleSum} zł</s>
              </p>
              <ul className="mt-6 space-y-3">
                {BOOKS.map((b) => <li key={b.title} className="flex gap-3 font-medium"><Tick />{b.title}</li>)}
              </ul>
              <div className="mt-8"><BuyLink>Kup pakiet i zacznij dziś <ArrowRight /></BuyLink></div>
            </div>
          </Reveal>
          <div className="space-y-4 lg:order-1">
            {BOOKS.map((b) => (
              <Reveal key={b.title}>
                <div className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-5">
                  <div>
                    <h3 className="text-lg">{b.title}</h3>
                    <p className="font-display text-xl">{SITE.singlePrice} zł</p>
                  </div>
                  <Button asChild variant="ctaOutline" size="lg"><a href={SITE.paymentLink}>Kup</a></Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center text-base text-muted-foreground">Płatność online • PDF trafia na Twój e-mail od razu po płatności.</p>
      </Section>

      {/* LEAD */}
      <Section className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl">Nie jesteś gotowa na zakup? Zacznij od darmowej listy</h2>
          <p className="mt-4 mb-8 text-lg opacity-85">
            Pobierz bezpłatną checklistę „3 dokumenty, zanim będzie za późno” i sprawdź w 5 minut, czy Twoja rodzina jest zabezpieczona.
          </p>
          <div className="text-foreground [&_label]:text-navy-foreground"><LeadForm /></div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <H2>Co mówią czytelnicy</H2>
        {TESTIMONIALS.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-3xl border-2 border-dashed p-10 text-center">
            <Quote className="mx-auto size-10 text-primary" />
            <p className="mt-4 text-lg text-muted-foreground">Tu pojawią się opinie pierwszych czytelników.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.text} className="rounded-2xl bg-card p-6 shadow-soft">
                <Quote className="size-6 text-primary" />
                <blockquote className="mt-3">{t.text}</blockquote>
                <figcaption className="mt-4 text-sm font-semibold">{t.author}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>

      {/* FAQ */}
      <Section className="bg-secondary">
        <H2>Najczęstsze pytania</H2>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="rounded-2xl border-none bg-card px-5 shadow-soft">
              <AccordionTrigger className="py-5 text-left text-lg font-semibold hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* FINAL CTA */}
      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-5xl">Twój rodzic potrzebuje Cię spokojnej, nie zagubionej.</h2>
            <p className="mt-5 mb-8 text-lg md:text-xl">Zacznij od jednego popołudnia z poradnikiem. Reszta pójdzie krok po kroku.</p>
            <BuyLink>Kup pakiet – {SITE.bundlePrice} zł</BuyLink>
          </div>
        </Reveal>
      </Section>

      {/* FOOTER */}
      <footer className="border-t px-5 py-10 text-base">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl font-semibold">{SITE.brand}</p>
            <div className="mt-2 flex gap-4">
              <a href={SITE.tiktok} className="underline">TikTok</a>
              <a href={SITE.instagram} className="underline">Instagram</a>
            </div>
          </div>
          <nav className="flex gap-5">
            <Link to="/regulamin" className="hover:underline">Regulamin</Link>
            <Link to="/polityka-prywatnosci" className="hover:underline">Polityka prywatności</Link>
            <Link to="/kontakt" className="hover:underline">Kontakt</Link>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-6xl text-sm text-muted-foreground">
          Treści mają charakter informacyjny i nie stanowią porady prawnej w indywidualnej sprawie. Historie w naszych filmach są fabularyzowane.
        </p>
      </footer>

      {/* STICKY MOBILE BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t bg-card/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="leading-tight">
          <p className="text-xs text-muted-foreground">Pakiet 3 poradników</p>
          <p className="font-display text-lg font-semibold">{SITE.bundlePrice} zł</p>
        </div>
        <Button asChild variant="cta" size="lg" className="h-12 px-6"><a href={SITE.paymentLink}>Kup pakiet</a></Button>
      </div>

      <CookieBanner />
    </div>
  );
}
