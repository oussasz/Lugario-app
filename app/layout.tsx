import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/Provider";

export const metadata: Metadata = {
  title: "Lugario",
  description: "Lugario — Discover stays, plan trips, and manage reservations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          <Navbar />
          <main className="pb-16 md:pt-28 pt-24">{children}</main>
        </Providers>
      </body>
      {process.env.NODE_ENV === "production" &&
      process.env.GA_MEASUREMENT_ID ? (
        <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID} />
      ) : null}
    </html>
  );
}
