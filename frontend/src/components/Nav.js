import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
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
          <>
            <div
              className="fixed inset-0 z-[55]"
              data-testid="nav-backdrop"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              data-testid="nav-dropdown"
              className="fixed right-4 top-16 z-[60] w-72 border border-[#1c2b1e]/15 bg-[#f1e7d5] py-2 shadow-[0_20px_50px_-16px_rgba(20,16,8,0.4)] sm:right-8"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top right" }}
            >
              {LINKS.map(([label, id, tid], i) => (
                <motion.button
                  key={tid}
                  onClick={() => go(id)}
                  data-testid={`${tid}-mobile`}
                  className="block w-full cursor-pointer px-6 py-3 text-left font-display text-sm font-semibold uppercase tracking-[0.16em] text-[#1c2b1e] transition-colors hover:bg-[#1c2b1e]/5 hover:text-[#C89D3C]"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.04 + i * 0.04 }}
                >
                  {label}
                </motion.button>
              ))}
              <p className="border-t border-[#1c2b1e]/10 px-6 pb-2 pt-3 font-display text-[9px] uppercase tracking-[0.3em] text-[#1c2b1e]/50">
                team@thechickenwhisperer.co.uk
              </p>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
