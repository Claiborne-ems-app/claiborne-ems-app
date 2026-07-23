import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Claiborne County EMS Protocols",
    short_name: "Claiborne County EMS Protocols",
    description: "Covenant Health Air protocol reference.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      {
        src: "/icons/covenant-health-air-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/covenant-health-air-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
