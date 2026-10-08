import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import * as fs from "fs";
import * as path from "path";

interface ListQuotesProps {
  onBack: () => void;
}

interface Quote {
  text: string;
  author: string;
  source?: string;
  date: string;
  filename: string;
}

function parseQuoteFile(content: string, filename: string): Quote | null {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const textMatch = frontmatter.match(/text:\s*"(.+?)"/);
  const authorMatch = frontmatter.match(/author:\s*"(.+?)"/);
  const sourceMatch = frontmatter.match(/source:\s*"(.+?)"/);
  const dateMatch = frontmatter.match(/date:\s*(\d{4}-\d{2}-\d{2})/);

  if (!textMatch || !authorMatch || !dateMatch) return null;

  return {
    text: textMatch[1].replace(/\\"/g, '"'),
    author: authorMatch[1].replace(/\\"/g, '"'),
    source: sourceMatch?.[1]?.replace(/\\"/g, '"'),
    date: dateMatch[1],
    filename,
  };
}

export function ListQuotes({ onBack }: ListQuotesProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const quotesDir = path.resolve(process.cwd(), "../../content/quotes");

    if (!fs.existsSync(quotesDir)) {
      return;
    }

    const files = fs.readdirSync(quotesDir).filter((f) => f.endsWith(".mdx"));
    const parsed = files
      .map((filename) => {
        const content = fs.readFileSync(path.join(quotesDir, filename), "utf-8");
        return parseQuoteFile(content, filename);
      })
      .filter((q): q is Quote => q !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setQuotes(parsed);
  }, []);

  useInput((input, key) => {
    if (key.escape) {
      onBack();
    }
    if (key.upArrow && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
    if (key.downArrow && selectedIndex < quotes.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  });

  if (quotes.length === 0) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="yellow">No quotes found.</Text>
        <Text color="gray" dimColor>
          Press Escape to go back
        </Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold>Your Quotes ({quotes.length})</Text>
      <Text color="gray" dimColor>
        Use arrow keys to navigate, Escape to go back
      </Text>

      <Box marginTop={1} flexDirection="column">
        {quotes.map((quote, index) => (
          <Box
            key={quote.filename}
            marginY={1}
            flexDirection="column"
            borderStyle={index === selectedIndex ? "round" : undefined}
            borderColor={index === selectedIndex ? "cyan" : undefined}
            paddingX={index === selectedIndex ? 1 : 0}
          >
            <Text color={index === selectedIndex ? "cyan" : "white"}>"{quote.text}"</Text>
            <Text color="gray">
              — {quote.author}
              {quote.source ? `, ${quote.source}` : ""} ({quote.date})
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
