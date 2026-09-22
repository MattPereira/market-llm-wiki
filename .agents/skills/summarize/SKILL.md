---
name: summarize
version: 1
description: How to summarize and process content from /wiki/raw/
---

# Process

## 1. Abridge the raw source

The Summary is an abridgment: the source, shortened, in the source's own shape.
Draft from the Raw alone; each source gets the shape its own content calls for.
Follow its order and emphasis; name headings after its sections or topic shifts.

Cut repetition, pleasantries, sponsor reads, and tangents off the core content.
Use attribution sparingly; prefer pronouns when referring to the source's author.
Transcripts are raw — fix names, tickers, and numbers from context.

Done when a draft body covers the source start to finish.

## 2. Check the draft against the source

Walk the source section by section — by chapter for transcripts that have
`chapters`. Confirm each claim, call, number, and chain of reasoning appears at the
weight the source gives it, with authorship clear, and that every sentence
in the draft traces back to the source. Add what is missing; remove what does not
trace.

Then check length against the Raw's `word_count` and `type`. Completeness wins over
brevity: summaries of longer source content should be roughly 10-15% of the source length;
written posts and shorter source content should be 30% of the source length.
Use best judgement to decide how long a summary should be.

Done when every section of the source is accounted for in the draft.

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
topics: ["macro", "crypto-markets"]
---
```

`blurb` and `topics` are required on every summary — the reading site's content
schema rejects a summary missing either.

Open the body with the title as an H1 and a byline:
`**<Creator>** · <upload_date> · <duration> · [watch](<url>)`. For written posts,
drop the duration and use `[read](<url>)`. The Site strips both; they let the file
read standalone in Obsidian.

### blurb

One sentence, 25 words or fewer, ending in a period. Helps an agent decide whether to open the summary when answering user questions about wiki content. Say what the sourcedelivers, not what it covers: "Maeda favors gradual accumulation into the bottom." beats "A video about crypto markets."

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
