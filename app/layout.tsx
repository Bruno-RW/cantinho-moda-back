import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import ContextProvider from '@/providers/ContextProvider';
import ToastProvider from '@/providers/ToastProvider';

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import './globals.css';

const font = Roboto({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: 'Cantinho da Moda | ADMIN',
  description: 'Administre os produtos e informações da sua loja',
}

export default function RootLayout( {children}: {children: React.ReactNode} ) {
  return (
    <html lang="pt-br">
      <body className={font.className} suppressHydrationWarning={true}>
        <ContextProvider>
          <ToastProvider />
          <div className="flex relative h-screen bg-gray-50 dark:bg-neutral-900">
            <Navbar />
            <main className="flex flex-col w-full gap-y-3 my-2 mx-3">
              <Header />
              <section className="mx-5">
                {children}
              </section>
            </main>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}