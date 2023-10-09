import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const font = Roboto({ subsets: ["latin"], display: "swap", weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: 'Cantinho da Moda | ADMIN',
  description: 'Administre os produtos e informações da sua loja',
}

export default function RootLayout( {children}: {children: React.ReactNode} ) {
  return (
    <html lang="pt-br">
      <body className={font.className} suppressHydrationWarning={true}>
        <Navbar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}