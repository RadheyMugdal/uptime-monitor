import "@/styles/globals.css";

import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { Nunito } from 'next/font/google';

export const metadata: Metadata = {
  title: "Uptime Monitor - Never Miss a Downtime Again",
  description:
    "Professional uptime monitoring for websites, APIs, and services. Get instant alerts via Email, Discord, Slack, and Webhooks. 99.9% uptime guarantee with 24/7 monitoring.",
  keywords: [
    "uptime monitoring",
    "website monitoring",
    "API monitoring",
    "downtime alerts",
    "incident management",
    "status page",
    "monitoring service",
    "website uptime",
    "server monitoring",
    "reliability monitoring",
  ],
  authors: [{ name: "Uptime Monitor Team" }],
  creator: "Uptime Monitor",
  publisher: "Uptime Monitor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://uptimemonitor.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Uptime Monitor - Never Miss a Downtime Again",
    description:
      "Professional uptime monitoring for websites, APIs, and services. Get instant alerts via Email, Discord, Slack, and Webhooks.",
    url: "https://uptimemonitor.com",
    siteName: "Uptime Monitor",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Uptime Monitor - Professional Website Monitoring",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uptime Monitor - Never Miss a Downtime Again",
    description:
      "Professional uptime monitoring for websites, APIs, and services. Get instant alerts via Email, Discord, Slack, and Webhooks.",
    images: ["/og-image.jpg"],
    creator: "@uptimemonitor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
  manifest: "/site.webmanifest",
};



const nunito = Nunito({
  subsets: ['latin'], // include required subsets
  display: "swap",
  variable: '--font-nunito', // optional for CSS variable
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} subpixel-antialiased`} suppressHydrationWarning>
      <body>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster />
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
