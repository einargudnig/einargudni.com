import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { ExternalLink } from "../../components/ExternalLink.ts";
import { pageHead } from "../../components/head.ts";
import { HomeLink } from "../../components/HomeLink.ts";
import { LifeOs } from "../../components/LifeOs.ts";
import { LifeOsFeeds } from "../../components/LifeOsFeeds.ts";
import {
  pageTitle,
  ProseParagraph,
  ProseRule,
  ProseSection,
} from "../../components/ProseSection.ts";

export const NowPage = Html.component({
  name: "NowPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: () =>
    pageHead({
      title: "What I'm doing now",
      description: "Current projects, interests, and focus areas",
      image: "/og/now.png",
    }),
  view: (h) =>
    h.section
      .class("w-full max-w-2xl space-y-8 print:space-y-6 mb-8")
      .children(
        h.div.children(
          h.h1.class(pageTitle).children("Now"),
          h.p
            .class("mt-1 text-sm font-mono text-muted-foreground")
            .children("Updated 12. Jan, 2026"),
        ),
        ProseSection(h, "Baby").children(
          ProseParagraph(h).children(
            "Expecting our first baby this June! Super exciting and scary at the same time. One of things you can't get a lot of practice with beforehand.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "HYROX").children(
          ProseParagraph(h).children(
            "Back training for a HYROX competition in March 2026. This time it will be Pro Singles. The goal is to finish under 1:15:00. We just started a six weeks peak training block.",
          ),
        ),
        ProseRule(h),
        ProseSection(h, "Reading").children(
          ProseParagraph(h).children(
            "I am listening to ",
            ExternalLink(
              h,
              "https://www.goodreads.com/book/show/204567.The_Expectant_Father?from_search=true&from_srp=true&qid=mAwSnMYB4F&rank=1",
            ).children("The Expectant Father: Facts, Tips and Advices for Dads-to-be"),
            " It's time to prepare!",
          ),
        ),
        ProseRule(h),
        LifeOs(h),
        LifeOsFeeds(h),
        HomeLink(h),
      ),
});
