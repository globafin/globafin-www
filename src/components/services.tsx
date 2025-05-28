import {
  FaBuilding,
  FaChartBar,
  FaExchangeAlt,
  FaFileInvoiceDollar,
  FaPiggyBank,
  FaUserTie,
} from "react-icons/fa";
import { Card, CardContent } from "./ui/card";
import WidthConstraint from "./ui/width-constraint";

const services = [
  {
    icon: <FaChartBar size={24} />, // Savings Account
    title: "Savings Account",
    description:
      "This package is designed to enable client build enough saving for future occurrences. Interest is earned on saving deposit beyond GHS 100. We provide flexible withdrawal avenue and customer get their statement of accounts on monthly basis or upon request. One can start saving with a minimum of GHS 5.00.",
  },
  {
    icon: <FaPiggyBank size={24} />, // Susu Account
    title: "Susu Account",
    description:
      "Daily savings with the option of having money collected from client's premises or making payments in branch. Client decides daily contribution of a fixed amount. Savings with the opportunity of taking a loan facility to the tune of 3 times the amount saved after three months.",
  },
  {
    icon: <FaFileInvoiceDollar size={24} />, // Fixed Deposit
    title: "Fixed Deposit",
    description:
      "This investment package is designed to enable save with the company for competitive interest returns. The investment period ranges from 3 months, 6 months and 12 months. The principal investment amount is restricted during the investment period.",
  },
  {
    icon: <FaUserTie size={24} />, // Personal Loan
    title: "Personal Loan",
    description:
      "This loan package is designed for salary workers. The amount granted depends on the debt servicing ratio of the customer. The DSR should not exceed 40% and the loan tenor is maximum of 24 months.. Employer undertaking is also required to ensure that deduction is made at source and paid to the institution in due time. The interest rate for this package is 5.5% monthly and acceptable Collateral includes employer undertaking, Credit Insurance, Post-dated cheques, etc.",
  },
  {
    icon: <FaExchangeAlt size={24} />, // Clearing Loan
    title: "Clearing Loan",
    description:
      "This loan package is designed for SMEs who regularly import and require facility to support their clearing charges. The loan tenor is 3 months maximum. The facility is granted to clients with active accounts with the institution and the interest rate is 5.5% per month. Acceptable collateral etc.includes imported item, Guarantor, Credit Insurance, Post-dated cheques.",
  },
  {
    icon: <FaBuilding size={24} />, // Commercial Loan
    title: "Commercial Loan",
    description:
      "This loans package designed for Small and Medium Scale Enterprises (SMEs) who require working capital or fixed assets for their businesses. This is offered to client with active account operated for at least 3 months. The repayment tenor for the working capital loan is 12 months and the interest rate is 5.5% per month. Acceptable Collateral includes Vehicle, Guarantor, Insurance, Lien on savings and compulsory deposits, Post-dated cheques.",
  },
];

const Services = () => {
  return (
    <section className="py-20 lg:py-32">
      <WidthConstraint className="space-y-10">
        <h2 className="text-3xl font-bold text-center text-gray-900">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <Card key={idx} className="border-none shadow-none">
              <CardContent className="space-y-4">
                <div className="bg-primary w-16 h-16 text-primary-foreground rounded-full p-2 flex items-center justify-center">
                  {service.icon}
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
