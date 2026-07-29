import Link from "next/link";
import type { LucideIcon } from "lucide-react";

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
      <div
        className="flex h-full min-h-52 cursor-pointer flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:border-slate-700 group-hover:bg-slate-800/90 group-hover:shadow-xl group-hover:shadow-black/20 group-active:translate-y-0 group-active:scale-[0.98]"
      >
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${accent}`}>
          <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.8} />
        </div>

        <div className="mt-5 text-left text-lg font-semibold leading-tight text-white">
          {title}
        </div>

        <p className="mt-2 text-left text-sm leading-5 text-slate-400">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
