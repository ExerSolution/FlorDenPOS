"use client";

import "../style/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" data-theme="dark">
        <body className={` antialiased`}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}

