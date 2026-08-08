import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Terminal,
  Heart,
} from "lucide-react";

const Footer = ({ content }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: content.social.github, label: "GitHub" },
    { icon: Linkedin, href: content.social.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: content.social.instagram, label: "Instagram" },
  ];

  return (
    <footer
      data-testid="footer"
      className="border-t-4 bg-[#0A0A0A] border-[#3E3E3E]"
    >
      {/* Neon Divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#FF006E] p-0.5">
                <div
                  className="w-full h-full rounded-md flex items-center justify-center bg-[#0A0A0A]"
                >
                  <Terminal className="w-5 h-5 text-[#00F5FF]" />
                </div>
              </div>
              <span className="font-retro text-sm text-[#00F5FF] glow-cyan">
                {content.personal.name.toUpperCase()}
              </span>
            </div>
            <p
              className="max-w-md mb-6 text-[#ABABAB]"
            >
              {content.personal.bio.substring(0, 150)}...
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`footer-${social.label.toLowerCase()}`}
                    className="social-link"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-retro text-xs text-[#00F5FF] mb-4">NAVIGATE</h4>
            <ul className="space-y-2">
              {["Home", "Projects", "Skills", "About", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                      className="text-sm transition-colors hover:text-[#00F5FF] text-[#ABABAB]"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-retro text-xs text-[#00F5FF] mb-4">CONTACT</h4>
            <ul className="space-y-3">
              <li
                className="flex items-center gap-2 text-sm text-[#ABABAB]"
              >
                <Mail className="w-4 h-4 text-[#FF006E]" />
                {content.personal.email}
              </li>
              <li
                className="flex items-center gap-2 text-sm text-[#ABABAB]"
              >
                <Phone className="w-4 h-4 text-[#39FF14]" />
                {content.personal.phone}
              </li>
              <li
                className="flex items-center gap-2 text-sm text-[#ABABAB]"
              >
                <MapPin className="w-4 h-4 text-[#FFBE0B]" />
                {content.personal.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 border-[#2D2D2D]"
        >
          <p
            className="text-sm flex items-center gap-1 text-[#757575]"
          >
            © {currentYear} {content.personal.name}. Crafted with{" "}
            <Heart className="w-4 h-4 text-[#FF006E] fill-[#FF006E]" /> &{" "}
            <span className="text-[#8B6F47]">☕</span>
          </p>
          <p className="font-retro text-xs text-[#00F5FF] glow-cyan">
            {content.personal.domain}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
