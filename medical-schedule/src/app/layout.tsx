import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@/providers/query-client/query-client-provider";

const roboto = Roboto({ subsets: ["vietnamese"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "Medical Schedule",
  description: "Design By Xuan Trieu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={roboto.className}>
          <QueryClientProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}