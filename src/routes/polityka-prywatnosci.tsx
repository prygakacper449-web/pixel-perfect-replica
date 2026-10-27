import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/polityka-prywatnosci")({
  head: () => ({
    meta: [
      { title: "Polityka prywatności – Opiekun bez paniki" },
      { name: "description", content: "Jak przetwarzamy Twoje dane osobowe i pliki cookie." },
      { property: "og:title", content: "Polityka prywatności – Opiekun bez paniki" },
      { property: "og:description", content: "Jak przetwarzamy Twoje dane osobowe i pliki cookie." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage title="Polityka prywatności">
      <p>Tu wkrótce pojawi się treść polityki prywatności i plików cookie.</p>
    </LegalPage>
  ),
});
