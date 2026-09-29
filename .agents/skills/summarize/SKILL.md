---
name: summarize
version: 1
description: Summarize content from wiki/raw/ and update the wiki index.
---

## 1. Abridge the Raw

Draft from the Raw alone, following its order and emphasis.

- Use H2s for major arguments or topic shifts; merge or drop minor sections.
- Mark turns within long sections with short **bold run-in labels**.
- Bold decisive claims, figures, or actors sparingly. For a citation the author
  emphasizes, bold the full reference phrase on first mention and link its URL
  when available.
- Cut repetition, pleasantries, sponsor reads, and tangents. Correct transcript
  errors in names, tickers, and numbers from context.

Target a percentage of the Raw's `word_count`, bounded by 150–1,500 words:

| Source length | Summary length |
|---------------|----------------|
| under 1,000   | 25–30%         |
| 1,000–5,000   | 20–25%         |
| 5,000–10,000  | 15–20%         |
| over 10,000   | 10–15%         |

Keep the thesis, predictions, and positions. To meet the target, drop whole
points, starting with background, anecdotes, and repeated figures. Retained
points carry their full reasoning.

## 2. Check the draft

- Walk the Raw section by section: account for its major arguments, predictions,
  and positions; keep authorship clear and every sentence grounded in the Raw.
- Skim headings and bold text: they reveal the argument's main turns in order.
- Check the word count against the target.
- **Cold read:** each paragraph makes sense without the Raw; every figure names
  its measure and comparison. Restore missing reasoning or drop the point.

## 3. Save to `wiki/summaries/<creator>/<date>-<title>.md`

Use this frontmatter:

```yaml
---
type: summary
agent: codex
source: ../../raw/<creator>/<date>-<title>.md
title: "Source title"
url: https://example.com/source
publish_date: YYYY-MM-DD
created_at: YYYY-MM-DDTHH:MM:SSZ
blurb: "..."
topics: ["macro", "crypto"]
---
```

- `publish_date`: copy the Raw's `upload_date` (YouTube) or `post_date` (Substack).
- `created_at`: run `date -u +%Y-%m-%dT%H:%M:%SZ` at save time.
- `blurb`: one sentence, at most 25 words, ending in a period; state what the
  source delivers (its claim or conclusion).
- `topics`: apply every slug from `topics.toml` whose boundary comment fits the
  content. One or two is normal. If none fit, propose a slug, display name, and
  boundary comment; get approval before editing `topics.toml`.

Open the body with the title as an H1 and a byline:
`**<Creator>** · <publish_date> · <duration> · [watch](<url>)`.
For written posts, omit duration and use `[read](<url>)`.

## 4. Regenerate `wiki/index.md`

```sh
cd site && pnpm generate-index
```
