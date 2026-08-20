import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import "@/App.css";

const EASE = [0.76, 0, 0.24, 1];

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
    <main
      ref={frame}
      onMouseMove={onMove}
      data-testid="hero-page"
      className="relative h-[100svh] w-full overflow-hidden bg-[#0a0d09]"
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
          <motion.img
            src="/hero.png"
            alt="The Chicken Whisperer — Original foods made with British chicken. Launching September 2026."
            data-testid="hero-image"
            style={{ x: imgX, y: imgY }}
            className="hero-fit h-full w-full will-change-transform"
            draggable={false}
          />
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
    </main>
  );
}

export default App;
