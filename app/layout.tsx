import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { dark } from "@clerk/themes";
import { ModalProvider } from "@/components/providers/modal-provider";
import { AuthProvider } from "@/context/auth-context";
import {Toaster} from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "People Portal",
  description: "Connect with your peers",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "/images/logo.svg",
        href: "/images/logo.svg",
      },
      {
        media: "(prefers-color-scheme:dark)",
        url: "/images/logo-dark.svg",
        href: "/images/logo-dark.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="people-portal-theme-2"
            >
              <Toaster richColors position="bottom-center" />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </AuthProvider>
    </ClerkProvider>
  );
}
