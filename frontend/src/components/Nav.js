import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToId } from "./Sections";

const LINKS = [
  ["The Chicken Whisperer?", "story", "nav-story"],
  ["Our Unique Chicken Oil", "chicken-oil", "nav-oil"],
  ["Our Range of Sustainable Foods", "products", "nav-range"],
  ["Trade and Wholesale Partners", "trade", "nav-trade"],
  ["Pet Nutrition", "pet", "nav-pet"],
  ["The Shop", "shop", "nav-shop"],
  ["Our Contact Details", "contact", "nav-contact"],
];

export default function Nav() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  const toTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        data-testid="main-nav"
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          show ? "border-b border-[#1c2b1e]/10 bg-[#f1e7d5]/95 backdrop-blur-sm" : "border-b border-transparent bg-transparent"
        }`}
        initial={false}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3.5 sm:px-8">
          <button
            onClick={toTop}
            data-testid="nav-brand"
            className={`cursor-pointer font-display text-sm font-bold uppercase tracking-[0.22em] text-[#1c2b1e] transition-all duration-500 hover:text-[#C89D3C] ${
              show ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            The Chicken Whisperer
          </button>

          <motion.button
            onClick={() => setOpen(true)}
            data-testid="nav-menu-button"
            aria-label="Open menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className={`cursor-pointer rounded-full p-2 transition-colors duration-500 ${
              show ? "text-[#1c2b1e]" : "bg-[#f1e7d5]/75 text-[#1c2b1e] hover:bg-[#f1e7d5]"
            }`}
          >
            <Menu size={26} strokeWidth={1.6} />
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="nav-mobile-overlay"
            className="fixed inset-0 z-[60] flex flex-col bg-[#16130c]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-5 py-3.5 sm:px-8">
              <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[#C89D3C]">
                The Chicken Whisperer
              </span>
              <button
                onClick={() => setOpen(false)}
                data-testid="nav-close-button"
                aria-label="Close menu"
                className="cursor-pointer text-[#f1e7d5]"
              >
                <X size={28} strokeWidth={1.6} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {LINKS.map(([label, id, tid], i) => (
                <motion.button
                  key={tid}
                  onClick={() => go(id)}
                  data-testid={`${tid}-mobile`}
                  className="cursor-pointer py-2 text-left font-display text-2xl uppercase tracking-[0.14em] text-[#f1e7d5] transition-colors hover:text-[#C89D3C] sm:text-3xl"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 + i * 0.06 }}
                >
                  {label}
                </motion.button>
              ))}
            </nav>
            <p className="px-8 pb-8 font-display text-[10px] uppercase tracking-[0.35em] text-[#C89D3C]/70">
              team@thechickenwhisperer.co.uk
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
