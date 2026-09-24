import { useEffect, useRef, type CSSProperties } from "react";
import { RiCircleFill } from "@remixicon/react";

export function ReadingProgress() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      const progress = scrollable > 0 ? scrollTop / scrollable : 0;
      // Written straight to the DOM so scrolling never re-renders the shell.
      track.current?.style.setProperty(
        "--progress",
        String(Math.min(1, Math.max(0, progress))),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    // Catches height changes from late-loading images and fonts, not just viewport resizes.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("scroll", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={track}
      aria-hidden="true"
      // x-only clip: stops the knob overhanging the right edge into a horizontal scrollbar, without cropping its height.
      className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 overflow-x-clip"
      style={{ "--progress": 0 } as CSSProperties}
    >
      <div className="bg-ink-strong h-full origin-left scale-x-(--progress)" />
      <div className="absolute inset-0 translate-x-[calc(var(--progress)*100%)]">
        <RiCircleFill className="text-ink-strong absolute top-1/2 left-0 size-2.5 -translate-1/2" />
      </div>
    </div>
  );
}
