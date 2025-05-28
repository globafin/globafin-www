import WidthConstraint from "./ui/width-constraint";

const Stats = () => {
  return (
    <section className="py-20">
      <WidthConstraint className="grid grid-cols-1 md:grid-cols-3 gap-20">
        <div className="space-y-5">
          <h3 className="text-2xl font-[700]">Years of Operations</h3>
          <p className="text-7xl font-bold text-primary pb-5">14+</p>
          <hr className="w-[90%] h-[2px] bg-[#00473714]/10" />
        </div>
        <div className="space-y-5">
          <h3 className="text-2xl font-[700]">Happy Customers</h3>
          <p className="text-7xl font-bold text-primary pb-5">5000+</p>
          <hr className="w-[90%] h-[2px] bg-[#00473714]/10" />
        </div>
        <div className="space-y-5">
          <h3 className="text-2xl font-[700]">Transactions Per Day</h3>
          <p className="text-7xl font-bold text-primary pb-5">120+</p>
          <hr className="w-[90%] h-[2px] bg-[#00473714]/10" />
        </div>
      </WidthConstraint>
    </section>
  );
};

export default Stats;
