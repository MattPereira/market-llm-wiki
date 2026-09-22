import { z } from "astro/zod";
import { parse } from "smol-toml";
import { readRepoFile, requiredString } from "./vocabulary.js";

const FILE = "topics.toml";

interface Topic {
  name: string;
  description: string;
}

export const parseTopics = (toml: string): Map<string, Topic> =>
  new Map(
    Object.entries(parse(toml)).map(([slug, table]) => [
      slug,
      {
        name: requiredString(table, "name", slug, FILE),
        description: requiredString(table, "description", slug, FILE),
      },
    ]),
  );

const topics = parseTopics(readRepoFile(FILE));

function topicFor(slug: string): Topic {
  const topic = topics.get(slug);
  if (topic === undefined) throw new Error(`${FILE} defines no "${slug}"`);
  return topic;
}

export const topicName = (slug: string): string => topicFor(slug).name;

export const topicDescription = (slug: string): string =>
  topicFor(slug).description;

const isTopic = (slug: string): boolean => topics.has(slug);

export const topicSlugs = (): string[] => [...topics.keys()];

/**
 * The vocabulary is a closed set, so a typo must fail the build rather than
 * silently create an orphan Topic page nothing else links to.
 */
export const topicSlug = z.string().superRefine((slug, ctx) => {
  if (isTopic(slug)) return;
  ctx.addIssue({
    code: "custom",
    message: `"${slug}" is not in ${FILE} (have: ${topicSlugs().join(", ")})`,
  });
});
