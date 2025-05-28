import WidthConstraint from "../ui/width-constraint";

const HeroBanner = () => {
  return (
    <section className="bg-primary text-white py-10">
      <WidthConstraint className="flex flex-col items-center justify-between">
        <h3 className="text-2xl font-bold">Dial</h3>
        <h2 className="text-[100px] font-bold leading-none">*447*1#</h2>
        <p className="text-2xl font-bold">For 24/7 Service</p>
      </WidthConstraint>
    </section>
  );
};

export default HeroBanner;
