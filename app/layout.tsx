import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegistration from "../components/offline/ServiceWorkerRegistration";
import OfflineNavigationFallback from "../components/offline/OfflineNavigationFallback";

export const metadata: Metadata = {
  title: "Claiborne EMS Protocols",
  description: "Claiborne County EMS protocol reference.",
  applicationName: "Claiborne EMS Protocols",
  appleWebApp: {
    capable: true,
    title: "Claiborne EMS Protocols",
    statusBarStyle: "black-translucent",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  icons: {
    icon: [
      {
        url: "/icons/covenant-health-air-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icons/covenant-health-air-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/covenant-health-air-apple-touch.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <ServiceWorkerRegistration />
        <OfflineNavigationFallback />
      </body>
    </html>
  );
}
