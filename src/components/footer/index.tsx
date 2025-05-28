import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";
import WidthConstraint from "../ui/width-constraint";
import Banner from "./banner";

const socialLinks = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
  { icon: <FaPinterestP />, href: "#" },
];

const navLinks = [
  { label: "Help", href: "#" },
  { label: "Terms and Conditions", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Our Pricing", href: "#" },
  { label: "All Country", href: "#" },
  { label: "Refer Friends", href: "#" },
];

const Footer = () => {
  return (
    <footer className=" text-white pt-10">
      <div className="-mb-20 z-[10] relative">
        <Banner />
      </div>
      <section className="bg-secondary">
        <WidthConstraint className="pt-20 max-w-[1500px] pb-10 space-y-16">
          <div className="py-10 flex flex-col lg:flex-row md:justify-between md:items-start gap-10">
            <div className="flex-1 flex flex-col gap-8 min-w-[250px]">
              <Link href="/">
                <Image
                  src="/assets/logo-white.svg"
                  alt="Globafin Logo"
                  width={180}
                  height={60}
                  className="mb-4"
                />
              </Link>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-2">
                <span className="font-medium text-lg">Follow Us:</span>
                <div className="flex items-center gap-4">
                  {socialLinks.map((s, i) => (
                    <Link
                      key={i}
                      href={s.href}
                      className="w-14 h-14 flex items-center justify-center rounded-full border border-[#22325a] text-tertiary hover:bg-[#22325a] transition-colors"
                      aria-label="Social link"
                    >
                      {s.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col lg:items-end min-w-[250px]">
              <div className="text-left">
                <div className="mb-2 text-gray-200">Get in touch</div>
                <div className="text-tertiary mb-1">Mon - Fri 8.30AM - 16.00PM</div>
                <div className="text-tertiary mb-1">
                  info@globafinmicrofinance.com.com
                </div>
                <div className="text-tertiary mb-1">
                  Agona Swedru Akim Oda Road, Ghana
                </div>
                <div className="text-2xl md:text-3xl font-bold text-tertiary mt-2">
                  +233 57 769 9963
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-wrap justify-center gap-5 lg:gap-16 text-gray-300 text-sm">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="hover:text-tertiary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="text-center text-gray-400">
              © Globafin Microfinance Ld. 2025
            </div>
          </div>
        </WidthConstraint>
      </section>
    </footer>
  );
};

export default Footer;
