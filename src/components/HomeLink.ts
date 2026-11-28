import type { Html } from "@effect/ui/html";
import { ArrowLeft } from "lucide";
import { AppRoute } from "../routes.ts";
import { Icon } from "./Icon.ts";

// The "← Home" link at the foot of the static pages.
export const HomeLink = <M>(h: Html.H<M>) =>
  h.div.class("flex justify-start").children(
    h.a
      .attr("href", AppRoute.print(AppRoute.Home()))
      .class(
        "inline-flex items-center gap-1.5 p-2 -m-2 font-mono text-xs text-muted-foreground hover:text-brand transition-colors",
      )
      .children(Icon(h, ArrowLeft, "h-3.5 w-3.5"), "Home"),
  );
