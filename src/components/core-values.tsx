import { FaCheck } from "react-icons/fa";
import { Card, CardContent } from "./ui/card";
import WidthConstraint from "./ui/width-constraint";

const coreValues = [
  {
    title: "Growth",
    description:
      "We embrace continuous improvement evolving with every challenge and opportunity",
  },
  {
    title: "Loyalty",
    description: "Our commitment to lasting relationships drives every decision we make.",
  },
  {
    title: "Objective",
    description: "We lead with clarity and fairness, guided by facts over bias.",
  },
  {
    title: "Beneficial",
    description:
      "Every action we take is designed to create meaningful, positive impact.",
  },
  {
    title: "Integrity",
    description: "We do what's right — consistently transparently, and with purpose.",
  },
  {
    title: "Nobility",
    description:
      "We hold ourselves to a higher standard, honoring our mission with dignity and respect.",
  },
];

const CoreValues = () => {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <WidthConstraint className="space-y-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="col-span-5">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Our Core Values</h2>
        </div>
        <div className="col-span-7 grid grid-cols-1 md:grid-cols-2 gap-10">
          {coreValues.map((value, idx) => (
            <Card key={idx} className="border-none shadow-none py-0 bg-transparent">
              <CardContent className="space-y-4">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center border border-blue-100">
                  <FaCheck className="text-blue-600" size={16} />
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
