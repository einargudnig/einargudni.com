import { Html } from "@effect/ui/html";
import { Schema } from "effect";
import { Image } from "../../../components/Image.ts";
import { pageTitle } from "../../../components/ProseSection.ts";
import { AppRoute } from "../../../routes.ts";

const paragraph = "flex max-w-md text-md text-foreground ";

export const TldrIsPage = Html.component({
  name: "TldrIsPage",
  model: Schema.Struct({}),
  message: Schema.Never,
}).make({
  init: () => ({}),
  update: ($) => $.model,
  view: (h) =>
    h.section.class("w-full max-w-2xl space-y-8 print:space-y-6 mb-8").children(
      h.div.class("flex items-center justify-between").children(
        h.h1.class(pageTitle).children("Hæhæ!"),
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
          "Ég er Einar! Ég er forritari og hef mikinn áhuga á nýjustu tækni. Ég er vanur að búa til veflausnir með React og TypeScript. Ég er lausnamiðaður og legg áherslu á góða notendaupplifun.",
        ),
      h.p
        .class(paragraph)
        .children(
          "Ég get hjálpað til við þróa veflausnir, setja upp kerfi, nýsmíði og uppfærslur.",
        ),
      h.p
        .class(paragraph)
        .children(
          "Ég hef unnið sem forritari síðan 2020, bæði hjá fyrirtækjum og sem sjálfstæður verktaki.",
        ),
      h.p
        .class(paragraph)
        .children(
          "Þú getur séð hvað ég hef verið að gera hér á þessari síðu eða haft samband við mig í gegnum netfangið einargudnig@gmail.com",
        ),
      h.div
        .class("flex justify-start")
        .children(
          h.a
            .attr("href", AppRoute.print(AppRoute.TldrEn()))
            .class("mr-2 p-2 -m-2")
            .children("This page in English ", h.span.attr("aria-hidden", "true").children("🇬🇧")),
        ),
    ),
});
