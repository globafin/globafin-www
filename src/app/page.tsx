import Contact from "@/components/contact";
import CoreValues from "@/components/core-values";
import FAQs from "@/components/faqs";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
import { siteConfig } from "@/lib/config/metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.name}`,
  description: siteConfig.description,
  keywords: ["Globafin", "Microfinance", "Digital Banking", "NeoBank"],
  alternates: {
    canonical: "/",
  },
  authors: [
    {
      name: "Globafin",
      url: siteConfig.url,
    },
  ],
  creator: "Globafin Team",
  openGraph: {
    type: "website",
    locale: "en",
    url: siteConfig.url,
    title: `${siteConfig.name}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: siteConfig.ogImage,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@globafin_",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <CoreValues />
      <Testimonials />
      <Stats />
      <Contact />
      <FAQs />
    </main>
  );
}
