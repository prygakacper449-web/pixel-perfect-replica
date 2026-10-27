import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/regulamin")({
  head: () => ({
    meta: [
      { title: "Regulamin – Opiekun bez paniki" },
      { name: "description", content: "Regulamin sklepu Opiekun bez paniki." },
      { property: "og:title", content: "Regulamin – Opiekun bez paniki" },
      { property: "og:description", content: "Regulamin sklepu Opiekun bez paniki." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <LegalPage title="Regulamin">
      <p>Tu wkrótce pojawi się treść regulaminu.</p>
    </LegalPage>
  ),
});
