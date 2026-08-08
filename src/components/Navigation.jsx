import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FolderKanban,
  Wrench,
  Mail,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Terminal,
} from "lucide-react";

const Navigation = ({ content }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/projects", label: "Projects", icon: FolderKanban },
    { path: "/skills", label: "Skills", icon: Wrench },
    { path: "/about", label: "About", icon: User },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        data-testid="main-navigation"
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b-2 bg-[#0A0A0A]/90 border-[#3E3E3E]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              data-testid="nav-logo"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#FF006E] p-0.5">
                <div
                  className="w-full h-full rounded-md flex items-center justify-center bg-[#0A0A0A]"
                >
                  <Terminal className="w-5 h-5 text-[#00F5FF]" />
                </div>
              </div>
              <span
                className="font-retro text-sm text-[#00F5FF] glow-cyan hidden sm:block"
                data-text="RJ tag"
              >
                {"<RJ/>"}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    data-testid={`nav-${link.label.toLowerCase()}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${
                      isActive(link.path)
                        ? "text-[#00F5FF] glow-cyan"
                        : "text-[#ABABAB] hover:text-[#00F5FF]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center gap-4">

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="mobile-menu-toggle"
                className="md:hidden p-2 rounded-lg bg-[#1A1A1A] text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              data-testid="mobile-menu"
              className="fixed top-0 right-0 w-4/5 max-w-xs h-full z-50 p-6 pt-24 bg-[#1A1A1A] border-l-4 border-[#8B6F47]"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive(link.path)
                          ? "bg-[#00F5FF] text-[#0A0A0A]"
                          : "text-[#ABABAB] hover:bg-[#2D2D2D]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Social Links in Mobile */}
              <div className="mt-8 pt-8 border-t border-[#3E3E3E]">
                <p className="font-retro text-xs text-[#757575] mb-4">
                  CONNECT
                </p>
                <p className="text-sm text-[#ABABAB]">
                  {content.personal.email}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
