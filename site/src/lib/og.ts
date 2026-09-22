import { formatDate } from "./format.js";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const ogByline = (creator: string, uploadDate: Date): string =>
  `${creator} · ${formatDate(uploadDate)}`;

// Past ~60 chars a 64px serif title runs to three lines and pushes the Blurb
// into its line clamp; one step down keeps both readable.
export const ogTitleSize = (title: string): number =>
  title.length > 60 ? 52 : 64;

export const ogImagePath = (id: string): string => `/og/${id}.png`;

export const ogTitle = (title: string, creator: string): string =>
  `${title} · ${creator}`;
