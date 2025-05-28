import { Button } from "../ui/button";
import WidthConstraint from "../ui/width-constraint";

const Banner = () => {
  return (
    <section className="px-10">
      <div className="bg-tertiary rounded-t-3xl">
        <WidthConstraint className="text-center py-20 space-y-10">
          <h2 className="text-[100px] font-bold text-white leading-[1em]">
            Become a part of the <br /> Globafin Family
          </h2>
          <div className="flex justify-center gap-4">
            <Button>Give us a call</Button>
            <Button variant="outline">Create an account</Button>
          </div>
        </WidthConstraint>
      </div>
    </section>
  );
};

export default Banner;
