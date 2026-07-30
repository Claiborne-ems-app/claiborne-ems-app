"use client";

import Link from "next/link";
import { BookOpen, Home, Settings, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const itemClass = "relative flex min-h-14 min-w-16 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[0.69rem] font-medium transition duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400";
  const linkClass = (active: boolean) => `${itemClass} ${active ? "text-sky-300" : "text-slate-500 hover:text-slate-300"}`;
  const iconClass = (active: boolean) => `flex h-7 items-center justify-center transition-colors ${active ? "text-sky-300" : "text-slate-400"}`;
  const toolsActive = pathname.startsWith("/tools");

  return (
    <nav aria-label="Primary navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-slate-950/86 pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center px-2 py-1.5 text-slate-400">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={linkClass(pathname === "/")}>
          <span className={iconClass(pathname === "/")}><Home aria-hidden="true" className="h-[1.35rem] w-[1.35rem]" strokeWidth={pathname === "/" ? 2.25 : 1.8} /></span>
          <span>Home</span>
        </Link>
        <Link href="/protocols" aria-current={pathname.startsWith("/protocols") ? "page" : undefined} className={linkClass(pathname.startsWith("/protocols"))}>
          <span className={iconClass(pathname.startsWith("/protocols"))}><BookOpen aria-hidden="true" className="h-[1.35rem] w-[1.35rem]" strokeWidth={pathname.startsWith("/protocols") ? 2.25 : 1.8} /></span>
          <span>Protocols</span>
        </Link>
        <Link href="/tools" aria-current={toolsActive ? "page" : undefined} className={linkClass(toolsActive)}>
          <span className={iconClass(toolsActive)}><Wrench aria-hidden="true" className="h-[1.35rem] w-[1.35rem]" strokeWidth={toolsActive ? 2.25 : 1.8} /></span>
          <span>Tools</span>
        </Link>
        <Link href="/settings" aria-current={pathname === "/settings" ? "page" : undefined} className={linkClass(pathname === "/settings")}>
          <span className={iconClass(pathname === "/settings")}><Settings aria-hidden="true" className="h-[1.35rem] w-[1.35rem]" strokeWidth={pathname === "/settings" ? 2.25 : 1.8} /></span>
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
