import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function CovenantHealthEmsLogo({
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white ${className}`}>
      <Image
        src="/branding/covenant-health-ems-logo.svg"
        alt="Covenant Health Emergency Medical Services"
        width={962}
        height={575}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}

export function CovenantHealthEmsMark({ className = "" }: Pick<LogoProps, "className">) {
  return (
    <span className={`relative block overflow-hidden rounded-xl bg-white ${className}`}>
      <Image
        src="/branding/covenant-health-ems-app-icon.svg"
        alt=""
        fill
        sizes="44px"
        className="object-cover"
      />
    </span>
  );
}
