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

export const ChroncalPrivacyPage = Html.component({
  name: "ChroncalPrivacyPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: () => [
    Head.title("Chroncal — Privacy Policy"),
    HtmlHead.meta({
      name: "description",
      content:
        "How the Chroncal Google OAuth client handles calendar data. Everything stays on the local machine.",
    }),
  ],
  view: (h) =>
    h.section
      .class("w-full max-w-2xl space-y-8 print:space-y-6 mb-8")
      .children(
        h.div.children(
          h.h1.class(pageTitle).children("Chroncal — Privacy Policy"),
          h.p
            .class("mt-1 text-sm font-mono text-muted-foreground")
            .children("Updated 9. Sep, 2026"),
        ),
        ProseSection(h, "What this is").children(
          ProseParagraph(h).children(
            "This page describes how the Google OAuth client named ",
            h.strong.children("Chroncal"),
            " handles data. I registered and operate that client personally, for my own use. It is not operated by a company and it has no other users.",
          ),
          ProseParagraph(h).children(
            ExternalLink(h, "https://github.com/DouglasdeMoura/chroncal").children("chroncal"),
            " itself is third-party open-source software: a terminal calendar, todo and journal manager that runs locally and talks to calendar servers over CalDAV. I registered this OAuth client so that my own copy of chroncal can reach my own Google Calendars.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "What it accesses").children(
          ProseParagraph(h).children(
            "One scope: ",
            h.code.children("https://www.googleapis.com/auth/calendar"),
            ". With it, the application reads and writes calendar data for the Google Account that signs in — events and their titles, times, locations, descriptions, attendees, reminders and the calendars those events belong to.",
          ),
          ProseParagraph(h).children(
            "It requests nothing else. No mail, no contacts, no files, no profile data beyond what is needed to complete sign-in.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "Where the data goes").children(
          ProseParagraph(h).children(
            "Nowhere except the computer running the application. Calendar data is written to a local SQLite database — on macOS at ",
            h.code.children("~/Library/Application Support/chroncal/chroncal.db"),
            ". OAuth tokens and the client secret are held in the operating system keychain.",
          ),
          ProseParagraph(h).children(
            "There is no server, no hosted backend, no database I control, no analytics and no third-party processor. Network traffic goes directly between the local machine and Google's CalDAV endpoints. I have no ability to see the calendar data of anyone who signs in, because none of it is transmitted to me.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "Sharing").children(
          ProseParagraph(h).children(
            "None. Calendar data is not sold, rented, shared, published or transferred to any third party. It is not used for advertising, profiling or training machine learning models.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "Retention and deletion").children(
          ProseParagraph(h).children(
            "Data lives on the local machine until it is deleted there. Removing the SQLite database file removes the stored copy of the calendar.",
          ),
          ProseParagraph(h).children(
            "Access can be withdrawn at any time from ",
            ExternalLink(h, "https://myaccount.google.com/permissions").children(
              "Google Account permissions",
            ),
            ". Revoking it invalidates the stored tokens immediately; the application can then no longer read or write anything.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "Limited use").children(
          ProseParagraph(h).children(
            "Use and transfer of information received from Google APIs adheres to the ",
            ExternalLink(
              h,
              "https://developers.google.com/terms/api-services-user-data-policy",
            ).children("Google API Services User Data Policy"),
            ", including its Limited Use requirements.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "Contact").children(
          ProseParagraph(h).children(
            "Questions about this policy go to ",
            ExternalLink(h, "mailto:einargudnig@gmail.com").children("einargudnig@gmail.com"),
            ". The terms for this client are on the ",
            h.a
              .attr("href", AppRoute.print(AppRoute.ChroncalTerms()))
              .children("terms of service page"),
            ".",
          ),
        ),
        HomeLink(h),
      ),
});
