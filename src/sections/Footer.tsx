import { Github, Linkedin, Instagram, Youtube } from "lucide-react";

const navItems = [
  { label: "opportunities", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About us", href: "#stats" },
  { label: "Founders", href: "#testimonials" },
  { label: "Contact us", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/artem-pivtorak/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/karotvip_official?igsh=MW13c2VzM2Q2azFqdw==", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/@Karotvip_official", label: "YouTube" },
  { icon: Github, href: "https://github.com/Artem-Pivtorak", label: "GitHub" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-dark-secondary pt-16 pb-8">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12 items-center">
          {/* Logo & Description */}
          <div>
            <a href="#" className="inline-flex items-start mb-4">
              <img src="/logo.png" alt="KAROTYP" className="h-40 w-auto" />
            </a>
            <p className="font-inter text-sm text-text-secondary">
              We build technologies that you can trust today — and that remain relevant tomorrow.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center">
            <h4 className="font-mono text-xs uppercase tracking-[2px] text-[#473090] mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="font-inter text-sm text-text-secondary hover:text-white transition-colors duration-300 text-left"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-mono text-xs uppercase tracking-[2px] text-[#473090] mb-6">
              Social networks
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-dark-card border border-white/[0.08] flex items-center justify-center text-text-muted hover:text-neon-orange hover:border-neon-orange/30 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5">
          <p className="font-inter text-xs text-text-muted text-center">
            &copy; 2023-2026 KAROTVIP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
