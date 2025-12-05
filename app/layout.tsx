import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/wallet-provider";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phenix Nest - Mystical Marketplace for Witches & Sorcerers",
  description: "Trade enchanted goods, rare ingredients, and magical artifacts for $GUL tokens on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </WalletProvider>
      </body>
    </html>
  );
}

