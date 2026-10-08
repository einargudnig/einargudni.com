// Bodies for the agent-discovery documents. They are shared because each one
// is published at both a /api/* path and its RFC-mandated /.well-known/* path.
//
// There is no filesystem on Workers, so llms.txt is inlined at build time
// rather than read from public/ at request time as it was under Next.
import { createHash } from "node:crypto";
import { deepDives, posts, work } from "@/.velite";
import llmsIntro from "../content/llms.txt?raw";

export const SITE_URL = "https://einargudni.com";

export const CACHE_HEADERS = { "Cache-Control": "public, max-age=3600" };

type IndexLine = { title: string; permalink: string; note?: string };

// Links point at the .md form so an agent can follow them without knowing
// about Accept negotiation; that is the convention llms.txt readers expect.
const indexSection = (heading: string, lines: IndexLine[]) =>
  [
    `## ${heading}`,
    "",
    ...lines.map(
      ({ title, permalink, note }) =>
        `- [${title}](${SITE_URL}${permalink}.md)${note ? `: ${note}` : ""}`,
    ),
  ].join("\n");

const published = <T extends { draft: boolean }>(entries: T[]) => entries.filter((e) => !e.draft);

// The hand-written intro carries the guidance; the index is generated so a new
// entry can never be missing from it.
export const llmsBody =
  [
    llmsIntro.trimEnd(),
    indexSection("Blog posts", published(posts)),
    indexSection(
      "Deep dives",
      published(deepDives).map((d) => ({ ...d, note: d.topic })),
    ),
    indexSection(
      "Use cases",
      published(work).map((w) => ({ ...w, note: `${w.client}: ${w.summary}` })),
    ),
  ].join("\n\n") + "\n";

const sha256 = (input: string) => createHash("sha256").update(input).digest("hex");

// Agent Skills Discovery RFC v0.2.0
export const agentSkills = () => ({
  $schema: "https://agentskills.io/schemas/index/v0.2.0.json",
  skills: [
    {
      name: "site-overview",
      type: "llms-txt",
      description:
        "Human-curated site map and agent guidance for einargudni.com. Covers writing, about pages, and preferred citation targets.",
      url: `${SITE_URL}/llms.txt`,
      sha256: sha256(llmsBody),
    },
    {
      name: "markdown-negotiation",
      type: "content-negotiation",
      description:
        "Blog posts, deep-dives and use cases return their MDX source as text/markdown when requested via Accept: text/markdown.",
      url: `${SITE_URL}/blog`,
    },
  ],
});

// RFC 9727 — API Catalog. Returns application/linkset+json pointing at the
// handful of real endpoints this site exposes. No OpenAPI spec exists, so
// service-desc references llms.txt as the closest human+machine description.
export const apiCatalog = () => ({
  linkset: [
    {
      anchor: `${SITE_URL}/api/md`,
      "service-desc": [{ href: `${SITE_URL}/llms.txt`, type: "text/markdown" }],
      "service-doc": [{ href: `${SITE_URL}/llms.txt`, type: "text/markdown" }],
      status: [{ href: `${SITE_URL}/`, type: "text/html" }],
    },
    {
      anchor: `${SITE_URL}/.well-known/agent-skills/index.json`,
      "service-desc": [
        {
          href: "https://agentskills.io/schemas/index/v0.2.0.json",
          type: "application/schema+json",
        },
      ],
      "service-doc": [
        {
          href: "https://github.com/cloudflare/agent-skills-discovery-rfc",
          type: "text/html",
        },
      ],
      status: [{ href: `${SITE_URL}/`, type: "text/html" }],
    },
  ],
});

// RFC 8414 — OAuth 2.0 Authorization Server Metadata.
// This site operates no authorization server. The document is published for
// discoverability only: empty grant_types_supported tells agents there is
// nothing to authenticate against.
export const oauthAuthorizationServer = () => ({
  issuer: SITE_URL,
  grant_types_supported: [] as string[],
  response_types_supported: [] as string[],
  token_endpoint_auth_methods_supported: [] as string[],
});

// RFC 9728 — OAuth 2.0 Protected Resource Metadata.
// No protected resources exist on this site. Document is published for
// discoverability: empty authorization_servers and scopes_supported tell
// agents there is nothing here that requires a token.
export const oauthProtectedResource = () => ({
  resource: SITE_URL,
  authorization_servers: [] as string[],
  scopes_supported: [] as string[],
  bearer_methods_supported: [] as string[],
});

// MCP Server Card (SEP-1649, schema still under review in
// modelcontextprotocol PR #2127). This site does not run an MCP server —
// capabilities is deliberately empty to avoid advertising tools that
// don't exist.
export const mcpServerCard = () => ({
  serverInfo: {
    name: "einargudni.com",
    version: "0.0.0",
    description:
      "Personal site of Einar Guðni. No MCP server is hosted here — this card exists for discoverability.",
  },
  transport: {
    type: "none",
    url: null,
  },
  capabilities: {},
});
