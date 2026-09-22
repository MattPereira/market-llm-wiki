---
name: ingest
version: 3
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

## 5. Ensure the Astro site is on port 4321
- Check `http://127.0.0.1:4321/` and confirm it serves the Market LLM Wiki. If it does, keep that server running; the site updates as files change. A live response takes precedence over `astro dev status`, which depends on a lock file and can miss a server started in another agent session.
- If the HTTP check fails, use `ss -ltn '( sport = :4321 )'` to check whether the port is free. If free, run `npx astro dev --background --port 4321` in `site/`. Confirm the reported URL and the live response both use 4321.
- If another service owns 4321, identify it and report the conflict. If Astro starts on another port, stop that newly started instance. Finish only when the wiki responds on 4321 or the port conflict is reported.
