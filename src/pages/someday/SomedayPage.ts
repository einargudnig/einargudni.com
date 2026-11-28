import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { HomeLink } from "../../components/HomeLink.ts";
import { pageTitle } from "../../components/ProseSection.ts";

const SOMEDAYS = [
  {
    title: "Someday, I want to work at my dream company",
    body: "I really don't know what my dream company is, but I want to work at a place where I can learn a lot, have fun and be surrounded by great people. I want to be in a place where I can grow and be challenged. In someways my current company matches all of these things, but I still early in my career and there are lot of great companies out there.",
  },
  {
    title: "Someday, I want to live abroad",
    body: "Iceland is great, has it pros and it's cons, like all places. But I would like to try to live abroad sometime, preferably somewhere warmer",
  },
  {
    title: "Someday, I want to speak a tech conference",
    body: "I have been to a few conferences, and I think it would be fun challenge to speak at one. I have to prepare, practice and do uncomfortable things to get there. It also means I need to know the stuff I will be talking about!",
  },
  {
    title: "Someday, I want to learn to fly",
    body: "Not that I want to become a pilot and work as one. Airplanes, flight and the sky has always fascinated me. I think it would be fun to learn to fly.",
  },
  {
    title: "Someday, I want to work because I want to",
    body: 'I want to be at the place where I work because I do it for fun, not because it pays the salary. Of course the "salary" has to come way, but I want to be in the situation where I can choose where and if I work because I want to, not because I have to.',
  },
];

const padding = (i: number) => (i === 0 ? "pb-8" : i === SOMEDAYS.length - 1 ? "pt-8" : "py-8");

export const SomedayPage = Html.component({
  name: "SomedayPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  view: (h) =>
    h.section
      .class("w-full max-w-2xl space-y-8 print:space-y-6 mb-8")
      .children(
        h.h1.class(pageTitle, "mb-6").children("Someday"),
        h.div
          .class("divide-y divide-border/50 stagger-list")
          .children(
            SOMEDAYS.map(({ title, body }, i) =>
              h.div
                .key(title)
                .class(padding(i))
                .children(
                  h.p.class("text-brand text-lg font-mono mb-3").children(title),
                  h.p
                    .class("leading-relaxed max-w-[65ch] text-muted-foreground text-pretty")
                    .children(body),
                ),
            ),
          ),
        HomeLink(h),
      ),
});
