import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Claiborne County EMS Protocols",
    short_name: "Claiborne EMS",
    description: "Claiborne County EMS protocol reference.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [
      {
        src: "/icons/claiborne-ems-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/claiborne-ems-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
