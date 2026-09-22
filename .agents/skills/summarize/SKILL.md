---
name: summarize
version: 1
description: How to summarize and process content from /wiki/raw/
---

# Process

## 1. Abridge the raw source

The Summary is an abridgment: the source, shortened, in the source's own shape.
Draft from the Raw alone; each source gets the shape its own content calls for.
Follow its order and emphasis. Use H2s for the argument's major turns or topic
shifts, not for every source section; merge or drop minor sections.
Within a long section, mark meaningful turns in the argument with short
**bold run-in labels** at the start of paragraphs. Use inline bold sparingly
for a decisive claim, figure, or actor. When the author explicitly emphasizes a
cited person, work, or source, bold the full reference phrase on first mention
and link it to the cited URL when available.

Cut repetition, pleasantries, sponsor reads, and tangents off the core content.
Use attribution sparingly; prefer pronouns when referring to the source's author.
Transcripts are raw — fix names, tickers, and numbers from context.

Done when a draft body covers the source's major arguments, predictions, and
positions start to finish.

## 2. Check the draft against the source

Walk the source section by section. Confirm each major argument, prediction, and
position appears with authorship clear, and that every sentence in the draft
traces back to the source.

Skim the body headings and bold text; they should reveal the argument's main
turns in source order.

Then check length against the Raw's `word_count`:

| Source length | Summary length |
|---------------|----------------|
| under 1,000   | 25–30%         |
| 1,000–5,000   | 20–25%         |
| 5,000–10,000  | 15–20%         |
| over 10,000   | 10–15%         |

Always stay between 150 and 1,500 words. The Raw is linked for detail, so when
the target forces cuts, keep the thesis, predictions, and positions, and cut
background, anecdotes, and repeated figures first.

Done when every major argument, prediction, and position is accounted for and the
draft is within the length target.

## 3. Save the summary to `wiki/summaries/<creator>/<date>-<title>.md`

Start the file with YAML front matter

```yaml
---
type: summary
agent: codex
source: ../../raw/<creator>/<date>-<title>.md
title: "Source title"
url: https://example.com/source
upload_date: YYYY-MM-DD
blurb: "One concise sentence saying what this source delivers."
topics: ["macro", "crypto"]
---
```

`blurb` and `topics` are required on every summary — the reading site's content
schema rejects a summary missing either.

Open the body with the title as an H1 and a byline:
`**<Creator>** · <upload_date> · <duration> · [watch](<url>)`. For written posts,
drop the duration and use `[read](<url>)`. The Site strips both; they let the file
read standalone in Obsidian.

### blurb

One sentence, 25 words or fewer, ending in a period. Helps an agent decide whether to open the summary when answering user questions about wiki content. Say what the source delivers, not what it covers: "Maeda favors gradual accumulation into the bottom." beats "A video about crypto markets."

### topics

Pick from the slugs defined in `topics.toml` at the repo root, reading each entry's
comment to find where its boundary sits. Apply every Topic that genuinely fits, and
none that only nearly fit — one or two is normal, four means you are stretching.

**Never invent a Topic.** If nothing in `topics.toml` fits, stop and ask the user
whether to add one, proposing a slug, display name, and the boundary comment that
would go with it. Only edit `topics.toml` after they say yes. A vocabulary that
grows a Topic per summary is worse than no vocabulary.

## 4. Regenerate `wiki/index.md`

```sh
cd site && pnpm generate-index
```

The Index is generated from Summary frontmatter — never hand-edit it. The command
fails naming the file and field if a Summary's frontmatter is invalid; fix the
frontmatter and rerun rather than editing the Index.
