"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NavLinks } from "@/data/navLinks";
import Image from "next/image";

const navItems = NavLinks;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-nav shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex items-center gap-2 font-bold text-xl gradient-text">
              <Image
                height={50}
                width={150}
                src={"/images/ait_blue_logo.png"}
                alt="AIT Lab Logo"
              />
              {/* AIT Lab */}
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  isActive ? "text-blue-500" : ""
                } ${
                  pathname === "/" && !scrolled
                    ? "text-white hover:text-white"
                    : "hover:text-blue-500"
                }`}
              >
                {item.title}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5  transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  } ${
                    pathname === "/" && !scrolled ? "bg-white" : "bg-blue-500"
                  }`}
                ></span>
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>

        {/* Mobile navigation with Sheet */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle menu"
                className="relative"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SheetClose asChild key={item.title}>
                      <Link
                        href={item.href}
                        className={`text-sm font-medium transition-colors px-2 py-1 rounded-md hover:bg-accent ${
                          isActive
                            ? "text-blue-500 bg-blue-500/10"
                            : "hover:text-blue-500"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
