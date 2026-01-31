"use client";

import { ROUTES, RouteItem } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { HiChevronDown } from "react-icons/hi2";
import { Button } from "./ui/button";
import WidthConstraint from "./ui/width-constraint";

const MobileMenu = ({ check }: { check: boolean; isScrolled: boolean }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
                  const hasChildren = route.children && route.children.length > 0;
                  const isOpen = openDropdown === route.label;

                  return (
                    <li
                      key={route.label}
                      className="border-b border-border w-full first:pt-4 last:border-none pb-4"
                    >
                      {hasChildren ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => setOpenDropdown(isOpen ? null : route.label)}
                            className="flex items-center justify-between w-full font-[600] text-foreground"
                          >
                            {route.label}
                            <HiChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                isOpen && "rotate-180"
                              )}
                            />
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 space-y-2"
                              >
                                {route.children!.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    {child.label}
                                    {child.description && (
                                      <span className="block text-xs text-muted-foreground/70 mt-0.5">
                                        {child.description}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Button
                          asChild
                          variant="link"
                          className="text-foreground text-start border-none p-0 flex items-start justify-start"
                        >
                          <Link href={route.href!} className="font-[600] w-full">
                            {route.label}
                          </Link>
                        </Button>
                      )}
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="hidden lg:flex" ref={dropdownRef}>
      <ul className="flex gap-10 capitalize font-[500]">
        {ROUTES.map((route) => {
          const hasChildren = route.children && route.children.length > 0;
          const isOpen = openDropdown === route.label;

          return (
            <li key={route.label} className="relative flex items-center gap-1">
              {hasChildren ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : route.label)}
                    onMouseEnter={() => setOpenDropdown(route.label)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-semibold transition-colors text-primary hover:text-secondary"
                    )}
                  >
                    {route.label}
                    <HiChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute top-full left-0 mt-2 min-w-[240px] rounded-xl border border-border bg-background shadow-lg overflow-hidden z-50"
                      >
                        <div className="py-2">
                          {route.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-3 hover:bg-muted/50 transition-colors"
                            >
                              <span className="block text-sm font-semibold text-foreground">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="block text-xs text-muted-foreground mt-0.5">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={route.href!}
                  className={cn(
                    "text-sm font-semibold transition-colors text-primary hover:text-secondary"
                  )}
                >
                  {route.label}
                </Link>
              )}
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
        "fixed top-0 z-[20] w-screen py-1",
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
