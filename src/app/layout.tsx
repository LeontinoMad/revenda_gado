import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Revenda de Gado Biduca",
  description: "Revenda de Gado na regição de  Pelotas - RS",
  keywords: ["revenda", "gado", "bois", "vacas", "terneiros"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

