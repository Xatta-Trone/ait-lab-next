"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { NavLinks, type NavItem } from "@/data/navLinks";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = NavLinks;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clear timeout on cleanup
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  const handleDropdownEnter = (title: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(title);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // Increased timeout for better UX
    setHoverTimeout(timeout);
  };

  const toggleMobileDropdown = (title: string) => {
    setMobileOpenDropdowns((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActiveLink = (item: NavItem): boolean => {
    if (item.href && pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child) => pathname === child.href);
    }
    return false;
  };

  const renderDesktopNavItem = (item: NavItem) => {
    if (item.children) {
      const isActive = isActiveLink(item);
      return (
        <div
          key={item.title}
          className="relative"
          onMouseEnter={() => handleDropdownEnter(item.title)}
          onMouseLeave={handleDropdownLeave}
        >
          <button
            className={cn(
              "flex items-center gap-1 h-9 px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "text-blue-500" : "",
              pathname === "/" && !scrolled
                ? "text-white hover:text-white"
                : "hover:text-blue-500"
            )}
          >
            {item.title}
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                activeDropdown === item.title ? "rotate-180" : ""
              )}
            />
          </button>

          {/* Custom Dropdown with improved positioning */}
          {activeDropdown === item.title && (
            <div
              className="absolute top-full left-0 mt-2 w-max min-w-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 py-1"
              onMouseEnter={() => handleDropdownEnter(item.title)}
              onMouseLeave={handleDropdownLeave}
            >
              {item.children.map((child) => (
                <Link
                  key={child.title}
                  href={child.href!}
                  className="group block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative whitespace-nowrap w-fit"
                >
                  {child.title}
                  <span
                    className={cn(
                      "absolute bottom-1 left-4 right-4 h-0.5 bg-blue-500 transition-all duration-300",
                      pathname === child.href
                        ? "w-[calc(100%-2rem)]"
                        : "w-0 group-hover:w-[calc(100%-2rem)]"
                    )}
                  ></span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    const isActive = pathname === item.href;
    return (
      <Link
        key={item.title}
        href={item.href!}
        className={cn(
          "relative group h-9 px-4 py-2 text-sm font-medium transition-colors flex items-center",
          isActive ? "text-blue-500" : "",
          pathname === "/" && !scrolled
            ? "text-white hover:text-white"
            : "hover:text-blue-500"
        )}
      >
        {item.title}
        <span
          className={cn(
            "absolute -bottom-0.5 left-4 right-4 h-0.5 transition-all duration-300",
            isActive
              ? "w-[calc(100%-2rem)]"
              : "w-0 group-hover:w-[calc(100%-2rem)]",
            pathname === "/" && !scrolled ? "bg-white" : "bg-blue-500"
          )}
        ></span>
      </Link>
    );
  };

  const renderMobileNavItem = (item: NavItem) => {
    if (item.children) {
      const isOpen = mobileOpenDropdowns.includes(item.title);
      const isActive = isActiveLink(item);

      return (
        <div key={item.title} className="space-y-2">
          <button
            onClick={() => toggleMobileDropdown(item.title)}
            className={cn(
              "w-full text-left text-sm font-medium transition-colors px-2 py-1 rounded-md hover:bg-accent flex items-center justify-between",
              isActive ? "text-blue-500 bg-blue-500/10" : "hover:text-blue-500"
            )}
          >
            {item.title}
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                isOpen ? "rotate-180" : ""
              )}
            />
          </button>
          {isOpen && (
            <div className="ml-4 space-y-2">
              {item.children.map((child) => (
                <SheetClose asChild key={child.title}>
                  <Link
                    href={child.href!}
                    className={cn(
                      "block text-sm transition-colors px-2 py-1 rounded-md hover:bg-accent",
                      pathname === child.href
                        ? "text-blue-500 bg-blue-500/10"
                        : "hover:text-blue-500"
                    )}
                  >
                    {child.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          )}
        </div>
      );
    }

    const isActive = pathname === item.href;
    return (
      <SheetClose asChild key={item.title}>
        <Link
          href={item.href!}
          className={cn(
            "text-sm font-medium transition-colors px-2 py-1 rounded-md hover:bg-accent",
            isActive ? "text-blue-500 bg-blue-500/10" : "hover:text-blue-500"
          )}
        >
          {item.title}
        </Link>
      </SheetClose>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass-nav shadow-md" : "bg-transparent"
      )}
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
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => renderDesktopNavItem(item))}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile navigation with Sheet */}
        <div className="flex items-center gap-2 lg:hidden">
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
                {navItems.map((item) => renderMobileNavItem(item))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
