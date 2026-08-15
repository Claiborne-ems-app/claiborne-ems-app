import Link from "next/link";
import { type LucideIcon } from "lucide-react";

type Props = {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  surface: string;
};

export default function CategoryCard({
  href,
  title,
  subtitle,
  icon,
  accent,
  surface,
}: Props) {
  const Icon = icon;

  return (
    <Link
      href={href}
      className="group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
    >
      <div className={`flex aspect-square min-h-40 flex-col items-center justify-center rounded-[1.35rem] border p-4 text-center shadow-sm transition duration-150 group-active:scale-[0.98] ${surface}`}>
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset ${accent}`}>
          <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={2} />
        </div>

        <div className="mt-4 text-[1.02rem] font-bold leading-5 tracking-[-0.01em] text-white">
          {title}
        </div>

        <p className="mt-1.5 text-xs leading-4 text-white/85">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
