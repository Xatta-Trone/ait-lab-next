import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/home-page/footer";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - Artificial Intelligence in Transportation (AIT Lab)",
  description:
    "Artificial Intelligence in Transportation Lab at Texas State University",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <div className="min-h-screen bg-background relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="fixed inset-0 bg-gradient-mesh z-0 pointer-events-none"></div>
              <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
              <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>

              {/* Content */}
              <div className="relative z-10">
                <Navbar />
                <main>{children}</main>
                <Footer />
              </div>
            </div>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
