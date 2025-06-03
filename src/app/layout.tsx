import Footer from "@/components/footer";
import Header from "@/components/header";
import MainLayout from "@/layouts/main.layout";
import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased overflow-x-clip`}>
        <Analytics />
        <MainLayout>
          <Header />
          <Toaster />
          {children}
          <Footer />
        </MainLayout>
      </body>
    </html>
  );
}
