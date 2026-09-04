import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import "@/App.css";

const EASE = [0.76, 0, 0.24, 1];
const CREAM = "#f1e7d5";

const PAGES = [
  {
    src: "/page-1.jpg",
    alt: "The Chicken Whisperer? — the story of our founder, our welfare principles and our support for British farmers",
    testId: "page-story",
  },
  {
    src: "/page-2.jpg",
    alt: "Pet Nutrition — high-protein premium pet foods, supplements and treats in development",
    testId: "page-pet-nutrition",
  },
  {
    src: "/page-3.jpg",
    alt: "For Food Manufacturing and Foodservice — bulk Chicken Oil supply from 5 litre PET to 1,000 litre IBCs",
    testId: "page-trade-supply",
  },
  {
    src: "/page-4.jpg",
    alt: "The Farm To Pantry range — flavour-rich chicken oil and forthcoming premium pantry products",
    testId: "page-farm-to-pantry",
  },
  {
    src: "/page-5.jpg",
    alt: "Farm To Pantry — Opening Soon",
    testId: "page-opening-soon",
  },
];

const Page = ({ src, alt, testId }) => (
  <section
    data-testid={testId}
    className="page-section relative flex h-[100svh] items-center justify-center overflow-hidden"
    style={{ background: CREAM }}
  >
    <motion.img
      src={src}
      alt={alt}
      data-testid={`${testId}-image`}
      initial={{ opacity: 0, y: 64, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="page-img h-full w-full will-change-transform"
      draggable={false}
      loading="lazy"
    />
  </section>
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
          data-testid="scroll-cue"
          className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-2 mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2.6 }}
        >
          <span className="font-display text-[10px] tracking-[0.5em] text-[#e6c27a]/80">SCROLL</span>
          <motion.span
            className="block h-8 w-px bg-gradient-to-b from-[#e6c27a]/80 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </section>

      {PAGES.map((p) => (
        <Page key={p.src} {...p} />
      ))}
    </main>
  );
}

export default App;
