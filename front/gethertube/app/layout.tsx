import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigator from "@/components/Navigator";
import ToastProvider from "@/components/toast/ToastProvider";
import Toast from "@/components/toast/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gethertube",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-900`}>
        <ToastProvider>
          <Navigator />
          <div className="h-[calc(100%-48px)]">{children}</div>
          <Toast />
          {/* {children} */}
        </ToastProvider>
      </body>
    </html>
  );
}
