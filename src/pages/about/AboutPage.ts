import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { ExternalLink } from "../../components/ExternalLink.ts";
import { pageHead } from "../../components/head.ts";
import { HomeLink } from "../../components/HomeLink.ts";
import { Image } from "../../components/Image.ts";
import {
  pageTitle,
  ProseParagraph,
  ProseRule,
  ProseSection,
} from "../../components/ProseSection.ts";

export const AboutPage = Html.component({
  name: "AboutPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  head: () =>
    pageHead({
      title: "About Me",
      description: "Software engineer, builder, and lifelong learner",
      image: "/og/about.png",
    }),
  view: (h) =>
    h.section.class("w-full max-w-2xl space-y-8 print:space-y-6 mb-8").children(
      h.div.class("flex items-start justify-between gap-6").children(
        h.h1.class(pageTitle).children("About"),
        Image(h, {
          src: "/images/avatar.jpeg",
          alt: "Einar Gudni",
          width: 96,
          height: 96,
        }).class(
          "rounded-full grayscale hover:grayscale-0 transition-[filter] duration-500 ease-[var(--ease-in-out)] shrink-0",
        ),
      ),
      ProseSection(h, "Who").children(
        ProseParagraph(h).children(
          "I am Einar Gudni, usually called Einar, a software developer born and raised in Iceland. I am a triplet, and I have two great sisters. My parents are some of my biggest role models.",
        ),
        ProseParagraph(h).children(
          "I am curious by nature but didn't start coding until I started computer science at the University of Iceland. I graduated in 2020 and I think few things have been as rewarding as learning to code.",
        ),
        ProseParagraph(h).children(
          'A big part of my identity revolves around sports and being active. I trained football and handball when growing up, and I have been doing CrossFit for the last 9 years. "If you don\'t use it, you lose it." So I try to use it as much I can. ',
        ),
      ),
      ProseRule(h),
      ProseSection(h, "What").children(
        ProseParagraph(h).children(
          "I love to wander around the web and see what other people are building it inspires me a lot. If I had all the time in the world I would spend it tinkering on things.",
        ),
        ProseParagraph(h).children(
          "I work as a developer for ",
          ExternalLink(h, "https://maul.is").children("Maul"),
          ", a small company that wants to change how you experience your work lunch. It is so much fun to be a part of a small team with great people. High agency and a lot of responsibility. Your voice is heard and lot of opportunities to learn from others.",
        ),
        ProseParagraph(h).children(
          "I do some freelance work on the side, and have been adding features and rebuilding the system for ",
          ExternalLink(h, "https://gigover.com").children("gigover"),
        ),
      ),
      ProseRule(h),
      ProseSection(h, "Why").children(
        ProseParagraph(h).children(
          "I remember that I loved building LEGO when I was small, at some point I loved to draw houses, like an architecture, being the only boy it came naturally to me to play alone and I think that is where my love for building things started.",
        ),
        ProseParagraph(h).children(
          "Over the last years I've started to realize more and more how important it is to have a long-term mindset. I believe that given time and effort I am capable of doing anything I set my mind to. That still means that I have to work hard and continue to improve.",
        ),
        ProseParagraph(h).children(
          "My current inspiration is minimalistic and simple design, well crafted software that makes sense to use.",
        ),
      ),
      HomeLink(h),
    ),
});
