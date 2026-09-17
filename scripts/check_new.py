#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///
"""Report creator content newer than the latest raw source already stored.

Usage: uv run scripts/check_new.py [creator ...]

This script only reads remote listings and wiki/raw/. To ingest one result, pass its
URL to `uv run scripts/ingest.py <url>`.
"""

import argparse
import json
import re
import sys
import tomllib
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "wiki" / "raw"
CREATORS = ROOT / "creators.toml"
YOUTUBE_FEED = "https://www.youtube.com/feeds/videos.xml?"
SUBSTACK_LIMIT = 20
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"


@dataclass(frozen=True)
class Item:
    creator: str
    source: str
    identifier: str
    date: str
    title: str
    url: str


class ListingError(Exception):
    pass


def get(url: str) -> bytes:
    try:
        request = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.read()
    except (urllib.error.URLError, TimeoutError) as error:
        raise ListingError(f"could not check {url}: {error}") from error


def stored_state(creator: str) -> dict[str, tuple[set[str], str]]:
    """Stored identifiers and newest date, independently for each source."""
    state = {
        "YouTube": (set(), ""),
        "Substack": (set(), ""),
    }
    for path in (RAW_DIR / creator).glob("*.md"):
        text = path.read_text(encoding="utf-8")
        for source, id_key, date_key in (
            ("YouTube", "video_id", "upload_date"),
            ("Substack", "post_id", "post_date"),
        ):
            found_id = re.search(rf"^{id_key}:\s*([^\s]+)", text, re.M)
            if not found_id:
                continue
            found_date = re.search(rf"^{date_key}:\s*(\d{{4}}-\d{{2}}-\d{{2}})", text, re.M)
            ids, newest = state[source]
            ids.add(found_id.group(1))
            state[source] = (ids, max(newest, found_date.group(1) if found_date else ""))
    return state


def youtube_items(creator: str, channel: str, long_form_only: bool) -> list[Item]:
    channel_id = channel.rstrip("/").rsplit("/", 1)[-1]
    query = f"playlist_id=UULF{channel_id[2:]}" if long_form_only else f"channel_id={channel_id}"
    try:
        body = get(YOUTUBE_FEED + query)
    except ListingError:
        if not long_form_only:
            raise
        body = get(YOUTUBE_FEED + f"channel_id={channel_id}")

    items = []
    for entry in re.findall(r"<entry>(.*?)</entry>", body.decode("utf-8"), re.S):
        fields = [re.search(pattern, entry, re.S) for pattern in (
            r"<yt:videoId>(.*?)</yt:videoId>",
            r"<published>(.*?)</published>",
            r"<title>(.*?)</title>",
        )]
        if not all(fields):
            continue
        video_id, published, title = (field.group(1) for field in fields)
        items.append(Item(
            creator, "YouTube", video_id, published[:10], title,
            f"https://www.youtube.com/watch?v={video_id}",
        ))
    return items


def substack_items(creator: str, host: str) -> list[Item]:
    host = host.rstrip("/")
    try:
        posts = json.loads(get(f"{host}/api/v1/archive?sort=new&limit={SUBSTACK_LIMIT}"))
    except json.JSONDecodeError as error:
        raise ListingError(f"unexpected archive response from {host}") from error

    items = []
    for post in posts:
        if post.get("audience") != "everyone":
            continue
        identifier = str(post.get("id") or "")
        slug = post.get("slug") or ""
        if not identifier or not slug:
            continue
        url = post.get("canonical_url") or f"{host}/p/{slug}"
        items.append(Item(
            creator, "Substack", identifier, (post.get("post_date") or "")[:10],
            post.get("title") or slug, url,
        ))
    return items


def unseen(items: list[Item], state: dict[str, tuple[set[str], str]]) -> list[Item]:
    """Missing items from the latest stored date onward; same-day items stay visible."""
    found = []
    for item in items:
        stored_ids, latest_date = state[item.source]
        if item.identifier not in stored_ids and (not latest_date or item.date >= latest_date):
            found.append(item)
    return found


def main() -> int:
    parser = argparse.ArgumentParser(description="Check configured creators for new content.")
    parser.add_argument("creators", nargs="*", help="creator slugs; default: all configured creators")
    args = parser.parse_args()

    creators = tomllib.loads(CREATORS.read_text(encoding="utf-8"))
    wanted = args.creators or list(creators)
    unknown = [creator for creator in wanted if creator not in creators]
    if unknown:
        parser.error(f"unknown creator(s): {', '.join(unknown)}")

    new_items = []
    failed = False
    for creator in wanted:
        config = creators[creator]
        state = stored_state(creator)
        if config.get("host"):
            try:
                new_items.extend(unseen(substack_items(creator, config["host"]), state))
            except ListingError as error:
                print(f"{creator} Substack: {error}", file=sys.stderr)
                failed = True
        if config.get("channel"):
            try:
                new_items.extend(unseen(youtube_items(
                    creator, config["channel"], config.get("long_form_only", False)
                ), state))
            except ListingError as error:
                print(f"{creator} YouTube: {error}", file=sys.stderr)
                failed = True

    new_items.sort(key=lambda item: (item.date, item.creator, item.source), reverse=True)
    if not new_items:
        print("No new content.")
    else:
        for item in new_items:
            print(f"{item.date}  {item.creator}  {item.source}  {item.title}\n  {item.url}")
        print(f"\n{len(new_items)} new item(s).")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
