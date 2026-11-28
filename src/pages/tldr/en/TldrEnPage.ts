import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { Image } from "../../../components/Image.ts";
import { pageTitle } from "../../../components/ProseSection.ts";
import { AppRoute } from "../../../routes.ts";

const paragraph = "flex max-w-md text-md text-foreground ";

export const TldrEnPage = Html.component({
  name: "TldrEnPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  view: (h) =>
    h.section.class("w-full max-w-2xl space-y-8 print:space-y-6 mb-8").children(
      h.div.class("flex items-center justify-between").children(
        h.h1.class(pageTitle).children("Hello!"),
        Image(h, {
          src: "/images/avatar.jpeg",
          alt: "Einar Gudni",
          width: 150,
          height: 150,
        }).class("rounded-full grayscale"),
      ),
      h.p
        .class(paragraph)
        .children(
          "I am Einar! I am a developer with a strong interest in the latest technology. I am experienced in building web solutions using React and TypeScript. I am solution-oriented and focus on providing a great user experience.",
        ),
      h.p
        .class(paragraph)
        .children(
          "I can help with developing web solutions, setting up systems, building new systems and maintanance.",
        ),
      h.p
        .class(paragraph)
        .children(
          "I have worked as developer since 2020, both for companies and as a freelance developer.",
        ),
      h.p
        .class(paragraph)
        .children(
          "You can see what I have been working on here on this site or contact me via email at einargudnig@gmail.com",
        ),
      h.div
        .class("flex justify-start")
        .children(
          h.a
            .attr("href", AppRoute.print(AppRoute.TldrIs()))
            .class("mr-2 p-2 -m-2")
            .children("Þessi síða á Íslensku ", h.span.attr("aria-hidden", "true").children("🇮🇸")),
        ),
    ),
});
