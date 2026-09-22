import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { parse } from "smol-toml";

export function requiredString(
  table: unknown,
  field: string,
  slug: string,
  file: string,
): string {
  const value = (table as Record<string, unknown> | undefined)?.[field];
  if (typeof value !== "string" || value === "") {
    throw new Error(`${file}: [${slug}] has no "${field}"`);
  }
  return value;
}

/** Both vocabulary files are tables-of-tables keyed by slug, each carrying a `name`. */
export function parseNamedTables(toml: string, file: string): Map<string, string> {
  return new Map(
    Object.entries(parse(toml)).map(([slug, table]) => [
      slug,
      requiredString(table, "name", slug, file),
    ]),
  );
}

/**
 * Walks up from the cwd rather than resolving against `import.meta.url`: Astro
 * bundles this module into `dist/.prerender/chunks/`, so a module-relative path
 * points somewhere that does not exist by the time the static routes render.
 */
function repoFile(file: string): string {
  let dir = resolve(process.cwd());

  for (;;) {
    const candidate = join(dir, file);
    if (existsSync(candidate)) return candidate;

    const parent = dirname(dir);
    if (parent === dir) throw new Error(`${file} not found above ${process.cwd()}`);
    dir = parent;
  }
}

export const readRepoFile = (file: string): string =>
  readFileSync(repoFile(file), "utf8");

export function loadNamedTables(file: string): Map<string, string> {
  return parseNamedTables(readRepoFile(file), file);
}

export function nameFor(
  table: Map<string, string>,
  slug: string,
  file: string,
): string {
  const name = table.get(slug);
  if (name === undefined) throw new Error(`${file} defines no "${slug}"`);
  return name;
}
