import Image from "next/image";

const logoSource = "/branding/covenant-health-air-logo-cropped.png";

type CovenantHealthAirLogoProps = {
  className: string;
  priority?: boolean;
};

export default function CovenantHealthAirLogo({
  className,
  priority = false,
}: CovenantHealthAirLogoProps) {
  return (
    <Image
      src={logoSource}
      alt="Covenant Health Air"
      width={1120}
      height={560}
      priority={priority}
      className={className}
      sizes="(max-width: 640px) 260px, 320px"
    />
  );
}
