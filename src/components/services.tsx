import { SERVICES } from "@/lib/constants";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import WidthConstraint from "./ui/width-constraint";

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-32">
      <WidthConstraint className="space-y-10">
        <h2 className="text-3xl font-bold text-center text-gray-900">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service, idx) => (
            <Card key={idx} className="border-none shadow-none">
              <CardContent className="space-y-4 px-0">
                <div className="bg-primary w-16 h-16 text-primary-foreground rounded-full p-2 flex items-center justify-center">
                  <Image src={service.icon} alt={service.title} width={30} height={30} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default Services;
