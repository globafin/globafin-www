import { CORE_VALUES } from "@/lib/constants";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import WidthConstraint from "./ui/width-constraint";

const CoreValues = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50">
      <WidthConstraint className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-10">
        <div className="col-span-5">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Our Core Values</h2>
        </div>
        <div className="col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10">
          {CORE_VALUES.map((value, idx) => (
            <Card key={idx} className="border-none shadow-none py-0 bg-transparent">
              <CardContent className="space-y-4 px-0 lg:px-6">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center border border-blue-100">
                  <Image
                    src="/assets/icons/check.svg"
                    alt="check-mark"
                    width={20}
                    height={20}
                  />
                </div>
                <h3 className="font-bold text-md text-gray-900">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default CoreValues;
