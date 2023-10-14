import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import ContextProvider from '@/context/ContextProvider';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';

const font = Roboto({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: 'Cantinho da Moda | ADMIN',
  description: 'Administre os produtos e informações da sua loja',
}

export default function RootLayout( {children}: {children: React.ReactNode} ) {
  return (
    <html lang="pt-br">
      <body className="overflow-hidden" suppressHydrationWarning={true}>
        <ContextProvider>

          <main className="flex bg-gray-50 dark:bg-neutral-900">
            <Navbar />
            
            <section className="w-full my-2 mx-3">
              <Header />
              {children}
            </section>
          </main>

        </ContextProvider>
      </body>
    </html>
  );
}