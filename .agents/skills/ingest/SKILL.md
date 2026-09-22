---
name: ingest
version: 2
description: Ingest sources into the wiki/ directory — from a URL the user gives, or by checking tracked creators for new content.
---

# Process

## 1. Choose source content
- **User gave a URL:** use it. Covers creators not yet tracked in `creators.toml`.
- **No URL:** run `uv run scripts/check_new.py`
  - Show the results as a numbered list (date, creator, source, title) and stop until the user picks one.

## 2. Execute the ingestion script
- Call `uv run scripts/ingest.py <url>`
- If it warns the slug `is not in creators.toml`, tell the user to add the creator there with a `channel` or `host`, so `check_new.py` tracks them from now on.

## 3. Summarize the raw content
- Find the newly created raw source file and call the skill tool with "summarize"

## 4. Append an entry to `wiki/log.md`

**Example:**
```md
## [2026-09-07] ingest | Atención
  - Added: [summary](summaries/arthur-hayes/2026-09-02-atencion.md)
  - Notes: Added Hayes’s dollar-liquidity thesis; no contradictions found.
```

## 5. Restart the Astro dev server
- In `site/`, run `npx astro dev status`; if running, `npx astro dev stop`
- Then `npx astro dev --background`
