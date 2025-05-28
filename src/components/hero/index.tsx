import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import WidthConstraint from "../ui/width-constraint";
import HeroBanner from "./banner";

const Hero = () => {
  return (
    <>
      <section className="py-20 lg:h-[calc(100vh-80px)] mt-[80px] bg-[url('/assets/hero.jpg')] flex justify-center items-center bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40"></div>
        <div className="relative z-10 w-full">
          <WidthConstraint className="grid grid-cols-1 w-full lg:grid-cols-2 gap-10 max-w-[1500px]">
            <div className="space-y-10 text-white pb-20 lg:pb-32">
              <h1 className="text-6xl font-bold">
                Finance That Moves <br /> You Forward
              </h1>
              <p className="text-white max-w-lg">
                We hold your money with established financial institutions, so it's
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
                      <h2 className="text-3xl font-black">34B</h2>
                    </div>
                    <hr className="border-[#ffffff20]" />
                    <p className="text-white text-lg">Money Managed</p>
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
