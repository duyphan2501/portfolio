import type { Metadata } from "next";

import { MotionProvider } from "@/components/effects/motion-provider";
import { SiteEffects } from "@/components/effects/site-effects";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Phan Nhut Duy | Fullstack Engineer",
    template: "%s | Phan Nhut Duy",
  },
  description:
    "Fullstack engineer focused on concurrency, distributed state, and real-time communication.",
  keywords: [
    "Fullstack Engineer",
    "Next.js",
    "Node.js",
    "Redis",
    "WebRTC",
    "RabbitMQ",
  ],
  authors: [{ name: "Phan Nhut Duy" }],
  openGraph: {
    title: "Phan Nhut Duy | Fullstack Engineer",
    description:
      "Portfolio featuring reliable systems built with Redis, RabbitMQ, WebRTC, and Next.js.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phan Nhut Duy | Fullstack Engineer",
    description:
      "Concurrency, distributed state, and real-time communication.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <SiteEffects />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
