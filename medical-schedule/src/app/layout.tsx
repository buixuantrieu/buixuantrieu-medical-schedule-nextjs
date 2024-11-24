import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@/providers/query-client/query-client-provider";
import { Toaster } from "react-hot-toast";
import { ModeToggle } from "@/components/mode-toggle";

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
            <Toaster position="top-center" />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <div className="fixed bottom-1 right-1 z-10">
                <ModeToggle />
              </div>
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}
