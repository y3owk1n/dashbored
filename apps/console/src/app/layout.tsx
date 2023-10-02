import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@dashbored/tailwind-config/styles.css";

import { Toaster } from "@/components/toaster";
import { cn } from "@dashbored/utils";

import {
  defaultMetadata,
  ogMetadata,
  twitterMetadata,
} from "./shared-metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  twitter: {
    ...twitterMetadata,
  },
  openGraph: {
    ...ogMetadata,
  },
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "grainy flex min-h-full flex-col font-sans antialiased",
          inter.variable,
        )}
      >
        {props.children}
        <Toaster />
      </body>
    </html>
  );
}
