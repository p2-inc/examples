import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phase Two · Next.js + NextAuth.js",
  description: "Keycloak login for a Next.js app with NextAuth.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
