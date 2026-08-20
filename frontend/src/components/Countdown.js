import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TARGET = new Date("2026-09-01T00:00:00+01:00").getTime();

const parts = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    ["DAYS", Math.floor(s / 86400)],
    ["HRS", Math.floor((s % 86400) / 3600)],
    ["MIN", Math.floor((s % 3600) / 60)],
    ["SEC", s % 60],
  ];
};

const Digit = ({ value, label }) => (
  <div className="flex flex-col items-center" data-testid={`countdown-${label.toLowerCase()}`}>
    <div className="relative h-[1.15em] overflow-hidden font-display text-lg font-medium tracking-[0.18em] text-[#f2d18a] sm:text-xl">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block tabular-nums"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="mt-1 font-display text-[9px] tracking-[0.42em] text-[#c9a45c]/70">{label}</span>
  </div>
);

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = parts(TARGET - now);

  return (
    <motion.div
      data-testid="launch-countdown"
      className="pointer-events-none absolute inset-x-0 top-[5.5%] z-10 flex flex-col items-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 2.1 }}
    >
      <div className="flex items-center gap-4 rounded-full border border-[#c9a45c]/30 bg-[#0a0d09]/70 px-6 py-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.45)] sm:gap-6 sm:px-9">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c9a45c]/70 sm:w-14" />
        {units.map(([label, value], i) => (
          <div key={label} className="flex items-center gap-4 sm:gap-6">
            <Digit value={value} label={label} />
            {i < units.length - 1 && <span className="-mt-4 font-display text-[#c9a45c]/50">·</span>}
          </div>
        ))}
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#c9a45c]/70 sm:w-14" />
      </div>
    </motion.div>
  );
}
