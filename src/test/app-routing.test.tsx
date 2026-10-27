import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it, vi } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { getRouter } from "@/router";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("keeps every public page under the GitHub Pages repository base path", () => {
    vi.stubEnv("BASE_URL", "/opiekun-bez-paniki/");
    try {
      const router = getRouter();
      for (const path of ["/", "/kontakt", "/regulamin", "/polityka-prywatnosci"]) {
        expect(router.matchRoutes(`/opiekun-bez-paniki${path}`).at(-1)?.routeId).toBe(path);
        expect(router.buildLocation({ to: path }).href).toBe(`/opiekun-bez-paniki${path}`);
      }
    } finally {
      vi.unstubAllEnvs();
    }
  });
});
