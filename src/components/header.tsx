"use client";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Button } from "./ui/button";
import WidthConstraint from "./ui/width-constraint";

const MobileMenu = ({ check }: { check: boolean; isScrolled: boolean }) => {
  return (
    <div className="rounded-b-3xl bg-background">
      <WidthConstraint className="w-full">
        <AnimatePresence>
          {check && (
            <motion.nav
              key="nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <ul className="flex flex-col gap-4 py-4">
                {ROUTES.map((route) => {
                  return (
                    <li
                      key={route.label}
                      className="border-b border-border w-full first:pt-4 last:border-none pb-4"
                    >
                      <Button
                        asChild
                        variant="link"
                        className="text-foreground text-start border-none p-0 flex items-start justify-start"
                      >
                        <Link href={route.href} className="font-[600] w-full">
                          {route.label}
                        </Link>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </WidthConstraint>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav className="hidden lg:flex">
      <ul className="flex gap-10 capitalize font-[500]">
        {ROUTES.map((route) => {
          return (
            <li key={route.href} className="flex items-center gap-1">
              <Link
                href={route.href}
                className={cn(
                  "text-sm font-semibold transition-colors text-primary hover:text-secondary"
                )}
              >
                {route.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [check, setCheck] = useState(false);
  const navRef = useRef<HTMLHeadingElement | null>(null);
  const pathname = usePathname();

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setCheck(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      if (window.scrollY !== 0) {
        setCheck(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCheck(false);
  }, [pathname]);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 z-[20] w-screen py-1 overflow-clip",
        "border-b border-border bg-background lg:h-[80px]"
      )}
    >
      <WidthConstraint className="flex gap-10 justify-between items-center h-full py-2">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="Globafin Logo"
            className=""
            width={80}
            height={80}
          />
        </Link>
        <NavBar />
        <div className="flex items-center justify-center gap-4">
          <Button className="bg-tertiary text-white rounded-full">
            <Link href="/create-account">Create Account</Link>
          </Button>
          <HiOutlineMenuAlt3
            size={30}
            onClick={() => setCheck(!check)}
            className={`flex lg:hidden`}
          />
        </div>
      </WidthConstraint>
      <MobileMenu check={check} isScrolled={isScrolled} />
    </header>
  );
};

export default Header;
