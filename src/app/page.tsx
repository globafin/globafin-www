import Contact from "@/components/contact";
import CoreValues from "@/components/core-values";
import FAQs from "@/components/faqs";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";

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
