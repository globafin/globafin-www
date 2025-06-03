export const SERVICES = [
  {
    icon: "/assets/icons/savings.svg", // Savings Account
    title: "Savings Account",
    description:
      "This package is designed to enable client build enough saving for future occurrences. Interest is earned on saving deposit beyond GHS 100. We provide flexible withdrawal avenue and customer get their statement of accounts on monthly basis or upon request. One can start saving with a minimum of GHS 5.00.",
  },
  {
    icon: "/assets/icons/susu.svg", // Susu Account
    title: "Susu Account",
    description:
      "Daily savings with the option of having money collected from client's premises or making payments in branch. Client decides daily contribution of a fixed amount. Savings with the opportunity of taking a loan facility to the tune of 3 times the amount saved after three months.",
  },
  {
    icon: "/assets/icons/fixed-deposit.svg", // Fixed Deposit
    title: "Fixed Deposit",
    description:
      "This investment package is designed to enable save with the company for competitive interest returns. The investment period ranges from 3 months, 6 months and 12 months. The principal investment amount is restricted during the investment period.",
  },
  {
    icon: "/assets/icons/personal-loan.svg", // Personal Loan
    title: "Personal Loan",
    description:
      "This loan package is designed for salary workers. The amount granted depends on the debt servicing ratio of the customer. The DSR should not exceed 40% and the loan tenor is maximum of 24 months.. Employer undertaking is also required to ensure that deduction is made at source and paid to the institution in due time.",
  },
  {
    icon: "/assets/icons/clearing-loan.svg", // Clearing Loan
    title: "Clearing Loan",
    description:
      "This loan package is designed for SMEs who regularly import and require facility to support their clearing charges. The loan tenor is 3 months maximum. The facility is granted to clients with active accounts with the institution. Acceptable collateral etc.includes imported item, Guarantor, Credit Insurance, Post-dated cheques.",
  },
  {
    icon: "/assets/icons/commercial-loan.svg", // Commercial Loan
    title: "Commercial Loan",
    description:
      "This loans package designed for Small and Medium Scale Enterprises (SMEs) who require working capital or fixed assets for their businesses. This is offered to client with active account operated for at least 3 months. The repayment tenor for the working capital loan is 12 months. Acceptable Collateral includes Vehicle, Guarantor, Insurance, Lien on savings and compulsory deposits, Post-dated cheques.",
  },
];

export const ROUTES = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export const CORE_VALUES = [
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

export const TESTIMONIALS = [
  {
    image: "/assets/testimonials/1.png", // Replace with your actual image path
    quote:
      "I've used Globaiin MicroFinance Limited for years! They are consistent and that's important to me. I own a small business and really appreciate the personal interest the team have taken in my success. Thanks so much!",
    name: "Mr. Kofi Appiah",
    role: "Trader",
  },
  {
    image: "/assets/testimonials/2.jpg",
    quote:
      "My wife and I were looking to get a car loan because our family just got a little bigger! Globafin MicroFinance Limited made the process simple and straightforward. And their follow-up after our purchase? Now that's great customer service!",
    name: "Mr. Anthony",
    role: "Business Man",
  },
];

export const FAQS_CONTENT = [
  {
    question: "What services does Globafin offer?",
    answer:
      "Globafin provides comprehensive microfinance services including business loans, personal loans, savings accounts, and financial education programs to help Nigerians achieve their financial goals.",
  },
  {
    question: "How can I apply for a loan?",
    answer:
      "You can apply for a loan through our website by creating an account, completing your profile, and submitting a loan application. Our team will review your application and get back to you within 24-48 hours.",
  },
  {
    question: "What are the requirements for getting a loan?",
    answer:
      "To qualify for a loan, you need to be at least 18 years old, have a valid government-issued ID, provide proof of income or business registration, and have a bank account. Additional requirements may vary based on the loan type.",
  },
  {
    question: "What interest rates do you offer?",
    answer:
      "Our interest rates are competitive and vary based on the loan type, amount, and repayment period. We offer flexible terms and transparent pricing with no hidden fees. Contact us for specific rates.",
  },
  {
    question: "How long does it take to get approved for a loan?",
    answer:
      "Most loan applications are processed within 24-48 hours. The exact timeline depends on the completeness of your application and the type of loan you're applying for.",
  },
  {
    question: "What happens if I can't make a payment?",
    answer:
      "We understand that financial situations can change. If you're having trouble making a payment, please contact us immediately. We offer flexible repayment options and can work with you to find a solution.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support team through our website's contact form, email, or by joining our community on Discord. We're available to help with any questions or concerns you may have.",
  },
];

export const GLOBAFIN_MICROFINANCE_EMAIL = "customer@globafinmicrofinance.com";
export const GLOBAFIN_MICROFINANCE_PHONE = "+233 57 769 9963";

export const COOKIE_NAMES = {
  UserLocation: "___gbf_user_location__",
  UserSession: "___gbf_user_session__",
};

export enum LogEvents {
  VisitLandingPage = "visit_landing_page",
}

export const PATHS = {
  index: "/",
  services: "#services",
  about: "#about",
  contact: "#contact",
};

export const COOKIE_OPTIONS = {
  sameSite: "strict" as const,
  secure: true,
  expires: 365, // 1 year
} as const;
