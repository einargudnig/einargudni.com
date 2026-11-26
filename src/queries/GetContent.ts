import { Query } from "@effect/ui";
import { Markdown } from "@effect/ui/html";
import { Effect, Schema } from "effect";

export const Token = Schema.Struct({ text: Schema.String, color: Schema.optional(Schema.String) });
export type Token = typeof Token.Type;

export const Content = Schema.Struct({
  document: Markdown.Document,
  // One entry per code block, in document order: lines of tokens.
  code: Schema.Array(Schema.Array(Schema.Array(Token))),
});
export type Content = typeof Content.Type;

// Each content file is its own chunk, compiled and highlighted by the
// `content` plugin in vite.config.ts. The prerender ships the one a page
// shows in its state, and staleTime Infinity keeps the client from loading
// it again.
const modules = import.meta.glob<typeof Content.Encoded>("/content/**/*.md", { import: "default" });
const decode = Schema.decodeUnknownSync(Content);

export class ContentNotFound extends Schema.TaggedError<ContentNotFound>()("ContentNotFound", {
  path: Schema.String,
}) {}

export class GetContent extends Query.Service<GetContent>()("content/GetContent", {
  // velite's `path`, such as "posts/tmux".
  args: { path: Schema.String },
  success: Content,
  error: ContentNotFound,
  staleTime: "Infinity",
}) {
  static readonly layer = this.toLayer(
    Effect.succeed(({ path }) => {
      const load = modules[`/content/${path}.md`];
      if (!load) return Effect.fail(new ContentNotFound({ path }));
      // A chunk that fails to load is a defect, not a missing entry: the
      // page renders its fallback and the next visit loads again.
      return Effect.promise(() => load()).pipe(Effect.map(decode));
    }),
  );
}
