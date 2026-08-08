import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);

  const bootMessages = [
    { text: "BIOS v2.6.0 - ANALOG GLITCH SYSTEMS", delay: 0 },
    { text: "Initializing memory... OK", delay: 200 },
    { text: "Loading kernel modules...", delay: 400 },
    { text: ">> dev_portfolio.sys loaded", delay: 600 },
    { text: ">> creativity_engine.dll loaded", delay: 800 },
    { text: ">> caffeine_processor.exe loaded", delay: 1000 },
    { text: "Mounting file systems... OK", delay: 1200 },
    { text: "Starting network services...", delay: 1400 },
    { text: ">> Connection established: INTERNET", delay: 1600 },
    { text: "Loading user profile: RISHABH.JAISWAL", delay: 1800 },
    { text: "Initializing GUI...", delay: 2000 },
    { text: "", delay: 2200 },
    { text: "SYSTEM READY.", delay: 2400 },
  ];

  useEffect(() => {
    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, msg.text]);
        setProgress((index + 1) / bootMessages.length * 100);
      }, msg.delay);
    });

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(completeTimer);
  }, []);

  return (
    <motion.div
      data-testid="boot-sequence"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center z-[100]"
    >
      {/* CRT Effect Border */}
      <div className="w-full max-w-2xl mx-4">
        <div className="crt-frame p-8">
          {/* Terminal Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#3E3E3E]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
            </div>
            <span className="font-code text-xs text-[#757575]">
              system_boot.exe
            </span>
          </div>

          {/* Boot Messages */}
          <div className="font-code text-sm space-y-1 min-h-[300px]">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  line.includes("SYSTEM READY")
                    ? "text-[#39FF14] glow-cyan font-bold mt-4"
                    : line.includes(">>") || line.includes("OK")
                    ? "text-[#00F5FF]"
                    : line.includes("Loading") || line.includes("Initializing")
                    ? "text-[#FFBE0B]"
                    : "text-[#ABABAB]"
                }`}
              >
                {line.includes("SYSTEM READY") && (
                  <span className="inline-block w-2 h-4 bg-[#39FF14] animate-pulse mr-2" />
                )}
                {line}
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 pt-4 border-t border-[#3E3E3E]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-retro text-xs text-[#757575]">
                LOADING PORTFOLIO
              </span>
              <span className="font-retro text-xs text-[#00F5FF]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="progress-vhs">
              <motion.div
                className="progress-vhs-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Skip Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onComplete}
          data-testid="skip-boot"
          className="w-full mt-4 py-2 text-center font-code text-sm text-[#757575] hover:text-[#00F5FF] transition-colors"
        >
          Press any key to skip...
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BootSequence;
