import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { ExternalLink } from "../../components/ExternalLink.ts";
import { HomeLink } from "../../components/HomeLink.ts";
import { pageTitle } from "../../components/ProseSection.ts";

const REFERRALS = [
  {
    name: "Raycast",
    description: "The best macOS productivity app.",
    url: "https://raycast.com/?via=einar",
  },
  {
    name: "WHOOP",
    description: "Get a free WHOOP and one month free when you join with my link.",
    url: "https://join.whoop.com/11514F27",
  },
];

export const ReferralsPage = Html.component({
  name: "ReferralsPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  view: (h) =>
    h.section
      .class("w-full max-w-2xl space-y-8 print:space-y-6 mb-8")
      .children(
        h.h1.class(pageTitle).children("Referrals"),
        h.p
          .class("-mt-4 text-muted-foreground")
          .children(
            "Products and services I use and recommend. Use these links to get a discount (and I might get one too).",
          ),
        h.div
          .class("prose prose-neutral dark:prose-invert space-y-6")
          .children(
            REFERRALS.map((referral) =>
              h.div
                .key(referral.name)
                .children(
                  h.p.class("text-brand text-lg font-mono").children(referral.name),
                  h.p.children(referral.description),
                  ExternalLink(h, referral.url).children("Get started →"),
                ),
            ),
          ),
        HomeLink(h),
      ),
});
