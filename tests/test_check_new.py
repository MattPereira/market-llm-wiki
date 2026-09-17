import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location(
    "check_new", Path(__file__).parents[1] / "scripts" / "check_new.py"
)
check_new = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(check_new)


class CheckNewTests(unittest.TestCase):
    def test_stored_state_tracks_each_source_separately(self):
        with tempfile.TemporaryDirectory() as directory:
            raw = Path(directory) / "creator"
            raw.mkdir()
            (raw / "youtube.md").write_text(
                "video_id: abc\nupload_date: 2026-09-10\n", encoding="utf-8"
            )
            (raw / "substack.md").write_text(
                "post_id: 123\npost_date: 2026-09-08\n", encoding="utf-8"
            )
            with patch.object(check_new, "RAW_DIR", Path(directory)):
                state = check_new.stored_state("creator")

        self.assertEqual(state["YouTube"], ({"abc"}, "2026-09-10"))
        self.assertEqual(state["Substack"], ({"123"}, "2026-09-08"))

    def test_unseen_keeps_missing_same_day_items_but_not_older_items(self):
        state = {"YouTube": ({"stored"}, "2026-09-10"), "Substack": (set(), "")}
        items = [
            check_new.Item("creator", "YouTube", "new", "2026-09-11", "New", "new-url"),
            check_new.Item("creator", "YouTube", "same-day", "2026-09-10", "Same", "same-url"),
            check_new.Item("creator", "YouTube", "stored", "2026-09-10", "Stored", "stored-url"),
            check_new.Item("creator", "YouTube", "old", "2026-09-09", "Old", "old-url"),
        ]

        self.assertEqual([item.identifier for item in check_new.unseen(items, state)], ["new", "same-day"])


if __name__ == "__main__":
    unittest.main()
