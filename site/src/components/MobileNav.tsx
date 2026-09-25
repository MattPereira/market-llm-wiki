import {
  RiFileTextLine,
  RiHashtag,
  RiMenuLine,
  RiUserLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import { cn } from "cn";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sections } from "@/lib/nav";

// Lives here rather than in nav.ts: icon components can't cross the island boundary as props.
const icons: Record<(typeof sections)[number]["href"], RemixiconComponentType> =
  {
    "/summaries/": RiFileTextLine,
    "/creators/": RiUserLine,
    "/topics/": RiHashtag,
  };

export function MobileNav({ active }: { active?: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-ink-muted">
          <RiMenuLine />
          <span className="sr-only">Open navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-3 pt-14">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav>
          <ul className="flex flex-col gap-1">
            {sections.map(({ href, label }) => {
              const Icon = icons[href];
              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={href === active ? "page" : undefined}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "lg" }),
                      "h-10 w-full justify-start gap-3 text-base font-normal [&_svg]:size-5",
                      href === active && "bg-accent text-accent-foreground",
                    )}
                  >
                    <Icon />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
