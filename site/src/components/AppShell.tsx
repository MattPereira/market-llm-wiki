import type { ReactNode } from "react";
import {
  RiFileTextLine,
  RiHashtag,
  RiSearchLine,
  RiUserLine,
} from "@remixicon/react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Lives here rather than in Base.astro: icon components can't cross the island boundary as props.
const links = [
  { href: "/", label: "Creators", icon: RiUserLine },
  { href: "/summaries/", label: "Summaries", icon: RiFileTextLine },
  { href: "/topics/", label: "Topics", icon: RiHashtag },
  { href: "/search/", label: "Search", icon: RiSearchLine },
];

interface Props {
  active?: string;
  themeToggle?: ReactNode;
  children?: ReactNode;
}

export function AppShell({ active, themeToggle, children }: Props) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <a
            href="/"
            className="text-ink-strong px-2 py-1.5 font-serif text-lg font-semibold"
          >
            Market Wiki
          </a>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map(({ href, label, icon: Icon }) => (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton asChild isActive={href === active}>
                      <a
                        href={href}
                        aria-current={href === active ? "page" : undefined}
                      >
                        <Icon />
                        <span>{label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="border-edge flex h-14 items-center gap-2 border-b px-3">
          <SidebarTrigger className="text-ink-muted" />
          <div className="ml-auto flex items-center">{themeToggle}</div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
