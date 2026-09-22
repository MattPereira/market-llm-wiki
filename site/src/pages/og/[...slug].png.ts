import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { creatorName } from "../../lib/creators";
import { ogByline } from "../../lib/og";
import { renderOgImage } from "../../lib/og-image";
import { creatorSlug } from "../../lib/summaries";

export const getStaticPaths: GetStaticPaths = async () => {
  const summaries = await getCollection("summaries");
  return summaries.map((summary) => ({
    params: { slug: summary.id },
    props: { summary },
  }));
};

export const GET: APIRoute<{ summary: CollectionEntry<"summaries"> }> = async ({
  props: { summary },
}) => {
  const png = await renderOgImage({
    title: summary.data.title,
    byline: ogByline(
      creatorName(creatorSlug(summary.id)),
      summary.data.upload_date,
    ),
    blurb: summary.data.blurb,
  });
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
