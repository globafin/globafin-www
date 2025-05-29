import { Button } from "../ui/button";
import WidthConstraint from "../ui/width-constraint";

const Banner = () => {
  return (
    <section className="px-5 max-w-[1350px] mx-auto">
      <WidthConstraint className="text-center py-14 md:py-20 space-y-10 bg-tertiary rounded-t-3xl px-0">
        <h2 className="text-3xl lg:text-[70px] xl:text-[100px] font-bold text-white leading-[1em]">
          Become a part of the <br /> Globafin Family
        </h2>
        <div className="flex justify-center gap-4">
          <Button>Give us a call</Button>
          <Button variant="outline">Create an account</Button>
        </div>
      </WidthConstraint>
    </section>
  );
};

export default Banner;
