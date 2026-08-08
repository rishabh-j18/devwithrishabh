import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Monitor } from "lucide-react";

const ScreenshotModal = ({ screenshots, initialIndex = 0, onClose, projectTitle }) => {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % screenshots.length);
  }, [screenshots.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, onClose]);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="screenshot-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="screenshot-modal-container"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X className="w-4 h-4" />
          </button>

          {/* Prev Button */}
          {screenshots.length > 1 && (
            <button className="modal-nav-btn prev" onClick={prev} aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* CRT Monitor Frame */}
          <div className="screenshot-modal-crt">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={screenshots[current]}
                alt={`${projectTitle} screenshot ${current + 1}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            <div className="crt-scanlines" />
          </div>

          {/* Next Button */}
          {screenshots.length > 1 && (
            <button className="modal-nav-btn next" onClick={next} aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Counter */}
          <p className="modal-counter">
            {String(current + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
            &nbsp;·&nbsp;{projectTitle}
          </p>

          {/* Thumbnails */}
          {screenshots.length > 1 && (
            <div className="modal-thumbnails">
              {screenshots.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Thumb ${i + 1}`}
                  className={`modal-thumb ${i === current ? "active" : ""}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScreenshotModal;
