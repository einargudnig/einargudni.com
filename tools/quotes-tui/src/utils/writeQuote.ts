import * as fs from "fs";
import * as path from "path";
import slugify from "slugify";

export interface QuoteData {
  text: string;
  author: string;
  source?: string;
}

export function writeQuote(data: QuoteData): string {
  const date = new Date().toISOString().split("T")[0];
  const slug = slugify(`${data.author}-${data.text.slice(0, 30)}`.toLowerCase(), { strict: true });
  const filename = `${date}-${slug}.mdx`;

  const quotesDir = path.resolve(process.cwd(), "../../content/quotes");

  if (!fs.existsSync(quotesDir)) {
    fs.mkdirSync(quotesDir, { recursive: true });
  }

  const frontmatter = [
    "---",
    `text: "${data.text.replace(/"/g, '\\"')}"`,
    `author: "${data.author.replace(/"/g, '\\"')}"`,
    data.source ? `source: "${data.source.replace(/"/g, '\\"')}"` : null,
    `date: ${date}`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const filePath = path.join(quotesDir, filename);
  fs.writeFileSync(filePath, frontmatter + "\n", "utf-8");

  return filePath;
}
