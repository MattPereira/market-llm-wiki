import { describe, expect, it } from "vitest";
import {
  parseTopics,
  topicDescription,
  topicName,
  topicSlug,
  topicSlugs,
} from "./topics.js";

describe("parseTopics", () => {
  it("maps each topic slug to its name and description", () => {
    const topics = parseTopics(
      `[crypto]\nname = "Crypto"\ndescription = "Token theses."\n`,
    );

    expect(topics.get("crypto")).toEqual({
      name: "Crypto",
      description: "Token theses.",
    });
  });

  it("rejects a topic without a name", () => {
    expect(() => parseTopics(`[macro]\ndescription = "Rates."\n`)).toThrow(
      /\[macro\] has no "name"/,
    );
  });

  it("rejects a topic without a description", () => {
    expect(() => parseTopics(`[macro]\nname = "Macro"\n`)).toThrow(
      /\[macro\] has no "description"/,
    );
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

describe("topicDescription", () => {
  it("reads the real topics.toml", () => {
    expect(topicDescription("ai")).not.toBe("");
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
