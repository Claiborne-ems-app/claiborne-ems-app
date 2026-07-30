import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

type Props = {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
};

export default function CategoryCard({
  href,
  title,
  subtitle,
  icon,
  accent,
}: Props) {
  const Icon = icon;

  return (
    <Link
      href={href}
      className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <div className="flex h-full min-h-40 flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.065] to-white/[0.035] p-4 shadow-sm transition duration-150 group-active:scale-[0.98] group-active:bg-white/[0.08]">
        <div className="flex items-start justify-between gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${accent}`}>
            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
          </div>
          <ChevronRight aria-hidden="true" className="mt-2 h-4 w-4 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-slate-400" />
        </div>

        <div className="mt-auto pt-4 text-left text-[1.02rem] font-semibold leading-5 tracking-[-0.01em] text-white">
          {title}
        </div>

        <p className="mt-1.5 text-left text-xs leading-4 text-slate-400">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
