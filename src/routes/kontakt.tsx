import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt – Opiekun bez paniki" },
      { name: "description", content: "Skontaktuj się z nami w sprawie poradników." },
      { property: "og:title", content: "Kontakt – Opiekun bez paniki" },
      { property: "og:description", content: "Skontaktuj się z nami w sprawie poradników." },
    ],
  }),
  component: () => (
    <LegalPage title="Kontakt">
      <p>Napisz do nas: {SITE.contactEmail}</p>
    </LegalPage>
  ),
});
