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
    className="cursor-pointer rounded-full border border-[#1c2b1e]/50 bg-transparent px-6 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1c2b1e] transition-colors duration-300 hover:bg-[#1c2b1e] hover:text-[#f1e7d5] sm:px-8 sm:py-3 sm:text-xs"
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
            <motion.div style={{ x: imgX, y: imgY }} className="absolute inset-0">
              <img
                src="/hero-bg.jpg"
                alt=""
                data-testid="hero-image"
                className="hero-layer hero-bg"
                draggable={false}
              />
              <motion.img
                src="/hero-chicken.png"
                alt=""
                data-testid="hero-chicken"
                className="hero-layer hero-fg"
                draggable={false}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
              />
              <motion.img
                src="/hero-logo.png"
                alt="The Chicken Whisperer"
                data-testid="hero-logo"
                className="hero-layer hero-fg"
                draggable={false}
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
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
          data-testid="hero-taglines"
          className="absolute inset-x-4 bottom-[19%] z-10 flex flex-col items-center gap-3 text-center sm:gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 1.9 }}
        >
          <p
            data-testid="hero-tagline-main"
            className="font-display text-[11px] font-medium uppercase leading-relaxed tracking-[0.3em] text-[#22301f] sm:text-sm md:text-base"
          >
            Original foods made with British chicken.
            <br />
            Founded on principle.
          </p>
          <span className="h-px w-10 bg-[#22301f]/70" />
          <p
            data-testid="hero-tagline-sub"
            className="font-display text-[10px] uppercase tracking-[0.45em] text-[#d9b56a] [text-shadow:0_1px_10px_rgba(10,13,9,0.5)] sm:text-xs"
          >
            Trade. Retail. Private Label.
          </p>
        </motion.div>

        <motion.div
          data-testid="hero-launch-line"
          className="absolute inset-x-0 bottom-6 z-10 hidden flex-col items-center gap-2 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.3 }}
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[0.45em] text-[#e6c27a] [text-shadow:0_1px_12px_rgba(10,13,9,0.6)]">
            Launching September 2026
          </span>
          <a
            href="mailto:team@thechickenwhisperer.co.uk"
            data-testid="hero-email-link"
            className="font-display text-xs uppercase tracking-[0.35em] text-[#e6c27a]/85 [text-shadow:0_1px_12px_rgba(10,13,9,0.6)] transition-opacity hover:opacity-75"
          >
            team@thechickenwhisperer.co.uk
          </a>
        </motion.div>
      </section>

      <motion.div
        data-testid="hero-cta"
        className="bg-[#f1e7d5] px-6 py-12 sm:px-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 2.2 }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="hidden md:block" data-testid="intro-copy">
            <h2 className="font-display text-3xl leading-snug text-[#1c2b1e] lg:text-4xl">
              Original foods made with British chicken. Founded on principle.
            </h2>
            <p className="mt-4 max-w-2xl font-display text-base leading-relaxed text-[#3a362c] sm:text-lg">
              Farm To Pantry uses unique processes to create premium ingredients from 100% British, High-Welfare chicken. We are wholly committed to provenance that fully supports our British farmers and will never use frozen, imported ingredients. We are proudly building one of the UK&rsquo;s most sustainable and ethical food businesses; starting with our suppliers, to our loyal team, to our customers. From Farm To Pantry.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 md:flex-col md:items-stretch">
            <HeroBtn onClick={() => scrollToId("chicken-oil")} testId="hero-discover-btn">
              Discover Our Pure Chicken Oil
            </HeroBtn>
            <HeroBtn onClick={() => scrollToId("trade")} testId="hero-trade-btn">
              Trade Enquiries
            </HeroBtn>
          </div>
        </div>
      </motion.div>

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
