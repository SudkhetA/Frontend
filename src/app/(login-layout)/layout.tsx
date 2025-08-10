import { Metadata, Viewport } from "next";
import { JSX } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Tepmplate",
    default: "Tepmplate"
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function LoginLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="th">
      <body className="m-0">
        <main className="h-screen bg-stone-400">{children}</main>
      </body>
    </html>
  );
}