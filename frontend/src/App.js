import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import "@/App.css";
import {
  StorySection,
  ProductsSection,
  ChickenOilSection,
  PetSection,
  TradeSection,
  ShopSection,
  ContactSection,
  scrollToId,
} from "@/components/Sections";

const EASE = [0.76, 0, 0.24, 1];

const HeroBtn = ({ children, onClick, testId }) => (
  <button
    onClick={onClick}
    data-testid={testId}
    className="cursor-pointer rounded-full border border-[#c9a45c]/60 bg-[#0a0d09]/55 px-6 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e6c27a] backdrop-blur-sm transition-colors duration-300 hover:bg-[#c9a45c] hover:text-[#16130c] sm:px-8 sm:py-3 sm:text-xs"
  >
    {children}
  </button>
);

function App() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const imgX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const imgY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const frame = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const onMove = (e) => {
    const r = frame.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <main data-testid="site-root" className="bg-[#151009]">
      <section
        ref={frame}
        onMouseMove={onMove}
        data-testid="hero-page"
        className="relative h-[100svh] w-full overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.08, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.6, ease: EASE, delay: 0.3 }}
          >
            <motion.div style={{ x: imgX, y: imgY }} className="h-full w-full">
              <img
                src="/hero.png"
                alt="The Chicken Whisperer — Original foods made with British chicken. Launching September 2026."
                data-testid="hero-image"
                className="hero-desktop-img hero-fit absolute inset-0 h-full w-full will-change-transform"
                draggable={false}
              />
              <img
                src="/hero-mobile.jpg"
                alt="The Chicken Whisperer — Original foods made with British chicken. Launching September 2026."
                data-testid="hero-image-mobile"
                className="hero-mobile-img absolute inset-0 h-full w-full object-cover will-change-transform"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="grain pointer-events-none absolute inset-0" />

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-[#c9a45c]"
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.9 }}
        />

        <motion.div
          data-testid="hero-cta"
          className="absolute inset-x-0 bottom-[9%] z-10 flex flex-wrap items-center justify-center gap-3 px-4 sm:gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 2.2 }}
        >
          <HeroBtn onClick={() => scrollToId("chicken-oil")} testId="hero-discover-btn">
            Discover Our Pure Chicken Oil
          </HeroBtn>
          <HeroBtn onClick={() => scrollToId("trade")} testId="hero-trade-btn">
            Trade Enquiries
          </HeroBtn>
        </motion.div>
      </section>

      <StorySection />
      <ProductsSection />
      <ChickenOilSection />
      <PetSection />
      <TradeSection />
      <ShopSection />
      <ContactSection />
    </main>
  );
}

export default App;
