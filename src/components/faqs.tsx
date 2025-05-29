import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS_CONTENT } from "@/lib/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import WidthConstraint from "./ui/width-constraint";

const FAQs = () => {
  return (
    <section id="faq">
      <WidthConstraint className="py-20 space-y-10">
        <h1 className="text-3xl font-bold text-center">Frequently asked questions</h1>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {FAQS_CONTENT.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border last:border rounded-lg"
              >
                <AccordionTrigger className="text-left data-[state=open]:border-b pb-4 px-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground p-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Still have a question?{" "}
          <Button variant="link" className="px-0 text-muted-foreground">
            <Link href="#contact"> Submit A ticket</Link>
          </Button>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default FAQs;
