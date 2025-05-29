import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import WidthConstraint from "../ui/width-constraint";
import HeroBanner from "./banner";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="py-20 lg:h-[calc(100vh-80px)] mt-[80px] scroll-mt-20 bg-[url('/assets/hero.svg')] flex justify-center items-center bg-cover bg-center relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20"></div>
        <div className="relative z-10 w-full">
          <WidthConstraint className="grid grid-cols-1 w-full lg:grid-cols-2 gap-10 md:pt-20">
            <div className="space-y-5 sm:space-y-10 text-white pb-10 md:pb-20 lg:pb-32">
              <h1 className="text-5xl lg:text-6xl xl:text-[4rem] lg:text-nowrap font-bold">
                Finance That Moves <br className="hidden sm:block" /> You Forward
              </h1>
              <p className="text-white max-w-lg">
                We hold your money with established financial institutions, so it&apos;s
                separate from our own accounts and in our normal.
              </p>
              <div className="flex gap-4">
                <Button>Get Started</Button>
                <Button variant="outline">About Us</Button>
              </div>
            </div>
            <div className="flex justify-end items-end">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4  w-full">
                <Card className="bg-transparent backdrop-blur-sm border-[#ffffff20] shadow-none rounded-b-none">
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-white">
                      <Image
                        src="/assets/hero-icon-2.svg"
                        alt="Hero Image"
                        width={40}
                        height={40}
                      />
                      <h2 className="text-3xl font-black">34B</h2>
                    </div>
                    <hr className="border-[#ffffff20]" />
                    <p className="text-white text-lg">Money Managed</p>
                  </CardContent>
                </Card>
                <Card className="bg-transparent backdrop-blur-sm border-[#ffffff20] shadow-none rounded-b-none">
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-white">
                      <Image
                        src="/assets/hero-icon-1.svg"
                        alt="Hero Image"
                        width={40}
                        height={40}
                      />
                      <h2 className="text-3xl font-black">433+</h2>
                    </div>
                    <hr className="border-[#ffffff20]" />
                    <p className="text-white text-lg">Higher Transactions</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </WidthConstraint>
        </div>
      </section>
      <HeroBanner />
    </>
  );
};

export default Hero;
