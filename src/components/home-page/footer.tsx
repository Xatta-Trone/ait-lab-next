import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { NavLinks } from "@/data/navLinks";

const quickLinks = NavLinks;

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/subasishdas/" },
  { name: "Twitter", href: "https://x.com/subasish_das" },
  { name: "GitHub", href: "https://github.com/subasish" },
  {
    name: "Research Gate",
    href: "https://www.researchgate.net/profile/Subasish-Das",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gray-50/80 dark:bg-black/20 backdrop-blur-sm">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-bold text-xl mb-4 gradient-text">AIT Lab</h3>
            <p className="text-foreground/70 max-w-md mb-6">
              Advancing transportation through cutting-edge AI research at Texas
              State University. Our mission is to develop innovative solutions
              for transportation safety and operations.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="glass-card px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-white/20 transition-colors"
                >
                  {link.name}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              {quickLinks.slice(4).map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 mt-12 pt-8 text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} AIT Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
