import { describe, expect, it } from "vitest";
import { ogByline, ogImagePath, ogTitle, ogTitleSize } from "./og.js";

describe("ogByline", () => {
  it("joins Creator and upload date, with no Source link", () => {
    expect(ogByline("Bankless", new Date("2026-05-25"))).toBe(
      "Bankless · May 25, 2026",
    );
  });
});

describe("ogTitleSize", () => {
  it("keeps titles up to 60 characters large", () => {
    expect(ogTitleSize("x".repeat(60))).toBe(64);
  });

  it("steps longer titles down so they don't crowd out the Blurb", () => {
    expect(ogTitleSize("x".repeat(61))).toBe(52);
  });
});

describe("ogImagePath", () => {
  it("mirrors the Summary's permalink under /og/", () => {
    expect(ogImagePath("kyla-scanlon/2026-09-05-ai-agents")).toBe(
      "/og/kyla-scanlon/2026-09-05-ai-agents.png",
    );
  });
});

describe("ogTitle", () => {
  it("appends the Creator so title-only cards still name it", () => {
    expect(ogTitle("AI Agents", "Kyla Scanlon")).toBe(
      "AI Agents · Kyla Scanlon",
    );
  });
});
