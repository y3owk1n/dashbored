import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@dashbored/tailwind-config/styles.css";

import { headers } from "next/headers";
import { Toaster } from "@/components/toaster";
import { cn } from "@dashbored/utils";

import { TRPCReactProvider } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
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
        <TRPCReactProvider headers={headers()}>
          {props.children}
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
