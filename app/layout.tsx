import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import ContextProvider from "@/providers/ContextProvider";

import "./globals.css";

const font = Roboto({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "Cantinho da Moda | ADMIN",
  description: "Administre os produtos e informações da sua loja",
}

export default function RootLayout( {children}: {children: React.ReactNode} ) {
  const session = getServerSession();

  if (!session) return NextResponse.redirect("/api/auth/sigin");

  return (
    <html lang="en-US">
      <body className={font.className} suppressHydrationWarning={true}>
        <ContextProvider>
          <div className="flex relative w-full h-screen bg-gray-50 dark:bg-neutral-900">
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}