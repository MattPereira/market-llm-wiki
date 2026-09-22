import { describe, expect, it } from "vitest";
import { parseTopics, topicName, topicSlug, topicSlugs } from "./topics.js";

describe("parseTopics", () => {
  it("maps each topic slug to its display name", () => {
    const topics = parseTopics(`[crypto]\nname = "Crypto"\n`);

    expect(topics.get("crypto")).toBe("Crypto");
  });

  it("rejects a topic without a name", () => {
    expect(() => parseTopics(`[macro]\n`)).toThrow(/macro/);
  });
});

describe("topicName", () => {
  it("reads the real topics.toml", () => {
    expect(topicName("ai")).toBe("AI");
  });

  it("fails loudly for a topic outside the vocabulary", () => {
    expect(() => topicName("defi")).toThrow(/defi/);
  });
});

describe("topicSlugs", () => {
  it("lists the whole vocabulary", () => {
    expect(topicSlugs()).toEqual(
      expect.arrayContaining(["macro", "crypto", "ai"]),
    );
  });
});

describe("topicSlug", () => {
  it("accepts a topic in the vocabulary", () => {
    expect(topicSlug.parse("macro")).toBe("macro");
  });

  it("names the offending topic and the vocabulary when it fails", () => {
    expect(() => topicSlug.parse("defi")).toThrow(/defi/);
    expect(() => topicSlug.parse("defi")).toThrow(/crypto/);
  });
});
