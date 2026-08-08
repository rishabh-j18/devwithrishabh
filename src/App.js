import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
import { motion, AnimatePresence } from "framer-motion";
import "@/App.css";

// Components
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BootSequence from "@/components/BootSequence";
import NoiseOverlay from "@/components/NoiseOverlay";

// Pages
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import SkillsPage from "@/pages/SkillsPage";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";

// Content
import content from "@/data/content.json";

function App() {
  const [isBooting, setIsBooting] = useState(true);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  useEffect(() => {
    // Boot sequence timer
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 3000);

    return () => clearTimeout(bootTimer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen dark bg-[#0A0A0A]">
      <BrowserRouter>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          {isBooting ? (
            <BootSequence key="boot" onComplete={handleBootComplete} />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <NoiseOverlay />
              <Navigation content={content} />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage content={content} />} />
                  <Route path="/projects" element={<ProjectsPage content={content} />} />
                  <Route path="/skills" element={<SkillsPage content={content} />} />
                  <Route path="/contact" element={<ContactPage content={content} />} />
                  <Route path="/about" element={<AboutPage content={content} />} />
                </Routes>
              </main>
              <Footer content={content} />
            </motion.div>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}

export default App;
