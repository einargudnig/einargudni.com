import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import TextInput from "ink-text-input";
import { writeQuote } from "../utils/writeQuote.js";

interface AddQuoteProps {
  onBack: () => void;
}

type Field = "text" | "author" | "source" | "confirm";

export function AddQuote({ onBack }: AddQuoteProps) {
  const [field, setField] = useState<Field>("text");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [savedPath, setSavedPath] = useState<string | null>(null);

  useInput((input, key) => {
    if (key.escape) {
      onBack();
    }
    if (field === "confirm" && input.toLowerCase() === "y") {
      const path = writeQuote({
        text,
        author,
        source: source || undefined,
      });
      setSavedPath(path);
    }
    if (field === "confirm" && input.toLowerCase() === "n") {
      onBack();
    }
    if (savedPath && key.return) {
      onBack();
    }
  });

  const handleSubmit = () => {
    if (field === "text" && text.trim()) {
      setField("author");
    } else if (field === "author" && author.trim()) {
      setField("source");
    } else if (field === "source") {
      setField("confirm");
    }
  };

  if (savedPath) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="green">Quote saved successfully!</Text>
        <Text color="gray">{savedPath}</Text>
        <Text color="gray" dimColor>
          Press Enter to continue...
        </Text>
      </Box>
    );
  }

  if (field === "confirm") {
    return (
      <Box flexDirection="column" padding={1}>
        <Text bold>Review your quote:</Text>
        <Box marginY={1}>
          <Text color="cyan">"{text}"</Text>
        </Box>
        <Text>
          — {author}
          {source ? `, ${source}` : ""}
        </Text>
        <Box marginTop={1}>
          <Text>Save this quote? (y/n)</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold>Add a new quote</Text>
      <Text color="gray" dimColor>
        Press Escape to go back
      </Text>

      <Box marginTop={1} flexDirection="column">
        <Box>
          <Text color={field === "text" ? "cyan" : "gray"}>Quote text: </Text>
          {field === "text" ? (
            <TextInput value={text} onChange={setText} onSubmit={handleSubmit} />
          ) : (
            <Text>{text}</Text>
          )}
        </Box>

        {(field === "author" || field === "source") && (
          <Box>
            <Text color={field === "author" ? "cyan" : "gray"}>Author: </Text>
            {field === "author" ? (
              <TextInput value={author} onChange={setAuthor} onSubmit={handleSubmit} />
            ) : (
              <Text>{author}</Text>
            )}
          </Box>
        )}

        {field === "source" && (
          <Box>
            <Text color="cyan">Source (optional): </Text>
            <TextInput value={source} onChange={setSource} onSubmit={handleSubmit} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
