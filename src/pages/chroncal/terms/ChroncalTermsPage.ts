import { Head } from "@effect/ui";
import { Html, HtmlHead } from "@effect/ui/html";
import { Schema } from "effect";
import { ExternalLink } from "../../../components/ExternalLink.ts";
import { HomeLink } from "../../../components/HomeLink.ts";
import {
  pageTitle,
  ProseParagraph,
  ProseRule,
  ProseSection,
} from "../../../components/ProseSection.ts";
import { AppRoute } from "../../../routes.ts";

export const ChroncalTermsPage = Html.component({
  name: "ChroncalTermsPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: () => [
    Head.title("Chroncal — Terms of Service"),
    HtmlHead.meta({
      name: "description",
      content:
        "Terms for the Chroncal Google OAuth client, a personal-use registration with no warranty.",
    }),
  ],
  view: (h) =>
    h.section
      .class("w-full max-w-2xl space-y-8 print:space-y-6 mb-8")
      .children(
        h.div.children(
          h.h1.class(pageTitle).children("Chroncal — Terms of Service"),
          h.p
            .class("mt-1 text-sm font-mono text-muted-foreground")
            .children("Updated 9. Sep, 2026"),
        ),
        ProseSection(h, "Scope").children(
          ProseParagraph(h).children(
            "These terms cover the Google OAuth client named ",
            h.strong.children("Chroncal"),
            ", which I registered and operate personally so that my own installation of ",
            ExternalLink(h, "https://github.com/DouglasdeMoura/chroncal").children("chroncal"),
            " can reach my own Google Calendars. It is a personal registration, not a product, not a service offered to the public, and not a commercial offering.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "The software itself").children(
          ProseParagraph(h).children(
            "chroncal is third-party open-source software written by Douglas de Moura. It is not mine, I do not distribute it, and your use of it is governed by its own license and terms in its repository — not by this page. This page concerns only the OAuth client registration that lets a local copy of it authenticate against Google.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "No warranty").children(
          ProseParagraph(h).children(
            "The OAuth client is provided as-is, with no warranty of any kind, express or implied. There is no uptime commitment and no support obligation. I may change, suspend or delete the registration at any time without notice, which would stop any authorized installation from syncing.",
          ),
          ProseParagraph(h).children(
            "To the extent permitted by law, I accept no liability for any loss or damage arising from use of the client, including lost, duplicated or corrupted calendar data. Calendar sync writes to live calendars; keep your own backups.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "Your data").children(
          ProseParagraph(h).children(
            "Calendar data stays on the machine running the software and is never transmitted to me. See the ",
            h.a.attr("href", AppRoute.print(AppRoute.ChroncalPrivacy())).children("privacy policy"),
            " for detail. Access can be revoked at any time from ",
            ExternalLink(h, "https://myaccount.google.com/permissions").children(
              "Google Account permissions",
            ),
            ".",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "Governing law and contact").children(
          ProseParagraph(h).children(
            "These terms are governed by the laws of Iceland. Questions go to ",
            ExternalLink(h, "mailto:einargudnig@gmail.com").children("einargudnig@gmail.com"),
            ".",
          ),
        ),
        HomeLink(h),
      ),
});
