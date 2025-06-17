import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { TokenProvider } from "@/context/TokenContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { Layout } from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "コミュニティ掲示板システム",
  description: "大学生向けコミュニティ掲示板システム",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <TokenProvider>
            <NotificationProvider>
              <Layout>
                {children}
              </Layout>
              <Toaster />
            </NotificationProvider>
          </TokenProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
