import type { Metadata } from "next";
import "../style/globals.css";

export const metadata: Metadata = {
  title: "FlorDen POS",
  description: "FlorDen Point of Sale Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}

