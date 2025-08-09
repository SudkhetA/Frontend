import { Metadata, Viewport } from "next";
import { JSX } from "@emotion/react/jsx-runtime";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "@/theme";
import "@/styles/app.css";
import LayoutClient from "./layout-client";

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

export default function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <html lang="th">
      <body className="m-0">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <LayoutClient>
              {children}
            </LayoutClient>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}