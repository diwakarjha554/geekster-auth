import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import "@/stylesheets/globals.css";

import ThemeDataProvider from "@/context/theme-data-provider";
import ClientOnly from "@/components/ui/ClientOnly";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Geekster Auth",
    template: "%s",
  },
  description:
    "Geekster Auth is a authentication website.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <Toaster />
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDataProvider>
            <ClientOnly>
              <Header />
            </ClientOnly>
            {children}
          </ThemeDataProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
