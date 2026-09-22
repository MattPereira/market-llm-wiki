import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { OG_HEIGHT, OG_WIDTH, ogTitleSize } from "./og.js";

// Satori can't parse Tailwind v4's oklch() values, so these are the stone
// tokens the dark theme uses (see global.css), as hex.
const surface = "#1c1917";
const inkStrong = "#e7e5e4";
const ink = "#d6d3d1";
const inkMuted = "#a8a29e";

const require = createRequire(import.meta.url);

// Satori reads ttf/otf/woff but not woff2, which is all public/fonts ships.
const readFont = (file: string) => readFile(require.resolve(file));

const loadFonts = async () => [
  {
    name: "Inter",
    weight: 400 as const,
    data: await readFont("@fontsource/inter/files/inter-latin-400-normal.woff"),
  },
  {
    name: "Inter",
    weight: 600 as const,
    data: await readFont("@fontsource/inter/files/inter-latin-600-normal.woff"),
  },
  {
    name: "Source Serif 4",
    weight: 600 as const,
    data: await readFont(
      "@fontsource/source-serif-4/files/source-serif-4-latin-600-normal.woff",
    ),
  },
];

let fonts: ReturnType<typeof loadFonts> | undefined;

interface OgCard {
  title: string;
  byline: string;
  blurb: string;
}

const Card = ({ title, byline, blurb }: OgCard) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 72px",
      backgroundColor: surface,
      fontFamily: "Inter",
    }}
  >
    <div
      style={{
        display: "block",
        lineClamp: 3,
        fontFamily: "Source Serif 4",
        fontWeight: 600,
        fontSize: ogTitleSize(title),
        lineHeight: 1.15,
        letterSpacing: "-0.01em",
        color: inkStrong,
      }}
    >
      {title}
    </div>
    <div style={{ marginTop: 20, fontSize: 30, color: inkMuted }}>{byline}</div>
    {/* Satori has no inline rich text, and ignores textIndent when wrapping, so
        the whole line is laid out in regular weight and a bold "TLDR:" is painted
        over the regular one. The wider space absorbs bold's extra width. */}
    <div
      style={{
        display: "flex",
        position: "relative",
        marginTop: 44,
        fontSize: 34,
        lineHeight: 1.45,
      }}
    >
      <div style={{ display: "block", lineClamp: 4, color: ink }}>
        {`TLDR:\u2004${blurb}`}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontWeight: 600,
          color: inkStrong,
          backgroundColor: surface,
        }}
      >
        TLDR:
      </div>
    </div>
  </div>
);

export const renderOgImage = async (
  card: OgCard,
): Promise<Uint8Array<ArrayBuffer>> => {
  fonts ??= loadFonts();
  const svg = await satori(<Card {...card} />, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: await fonts,
  });
  // Copied out of the Node Buffer, whose ArrayBufferLike backing Response won't take.
  return new Uint8Array(new Resvg(svg).render().asPng());
};
