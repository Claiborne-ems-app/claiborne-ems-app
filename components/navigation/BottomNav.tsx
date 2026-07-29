"use client";

import Link from "next/link";
import { BookOpen, Home, Settings, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const itemClass = "flex min-h-14 min-w-16 flex-col items-center justify-center gap-1.5 rounded-xl px-2 text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400";
  const linkClass = (active: boolean) => `${itemClass} ${active ? "text-sky-300" : "text-slate-400 hover:text-slate-200"}`;
  const iconClass = (active: boolean) => `flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${active ? "bg-sky-500/15 text-sky-300 ring-1 ring-inset ring-sky-400/20" : "bg-slate-900 text-slate-400"}`;

  return (
    <nav aria-label="Primary navigation" className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-800 bg-slate-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around px-3 py-2 text-slate-400">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={linkClass(pathname === "/")}>
          <span className={iconClass(pathname === "/")}><Home aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} /></span>
          <span>Home</span>
        </Link>
        <Link href="/protocols" aria-current={pathname.startsWith("/protocols") ? "page" : undefined} className={linkClass(pathname.startsWith("/protocols"))}>
          <span className={iconClass(pathname.startsWith("/protocols"))}><BookOpen aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} /></span>
          <span>Protocols</span>
        </Link>
        <Link href="/tools" aria-current={pathname === "/tools" ? "page" : undefined} className={linkClass(pathname === "/tools")}>
          <span className={iconClass(pathname === "/tools")}><Wrench aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} /></span>
          <span>Tools</span>
        </Link>
        <Link href="/settings" aria-current={pathname === "/settings" ? "page" : undefined} className={linkClass(pathname === "/settings")}>
          <span className={iconClass(pathname === "/settings")}><Settings aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} /></span>
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
