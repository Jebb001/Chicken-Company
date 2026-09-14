import { motion } from "framer-motion";

const REVEAL = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

const EMAIL = "team@thechickenwhisperer.co.uk";
const mailto = (subject) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

export const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export const Btn = ({ children, onClick, href, variant = "solid", testId }) => {
  const cls =
    variant === "solid"
      ? "bg-[#1c2b1e] text-[#f1e7d5] hover:bg-[#2a3d2c]"
      : "border border-[#1c2b1e]/40 text-[#1c2b1e] hover:border-[#1c2b1e] hover:bg-[#1c2b1e]/5";
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      data-testid={testId}
      className={`inline-block cursor-pointer rounded-full px-7 py-3 font-display text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-300 sm:text-sm ${cls}`}
    >
      {children}
    </Tag>
  );
};

const Headline = ({ children }) => (
  <h2 className="font-display text-4xl leading-tight text-[#1c2b1e] sm:text-5xl">{children}</h2>
);

const Copy = ({ children }) => (
  <div className="space-y-5 font-display text-base leading-relaxed text-[#3a362c] sm:text-lg">{children}</div>
);

const Shell = ({ id, testId, children, dark = false }) => (
  <section
    id={id}
    data-testid={testId}
    className={`relative overflow-hidden ${dark ? "bg-[#16130c] text-[#f1e7d5]" : "bg-[#f1e7d5]"}`}
  >
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">{children}</div>
  </section>
);

const Photo = ({ src, alt, testId }) => (
  <motion.img
    {...REVEAL}
    src={src}
    alt={alt}
    data-testid={testId}
    className="h-auto w-full object-cover"
    draggable={false}
    loading="lazy"
  />
);

const Bullet = ({ children }) => (
  <li className="flex items-start gap-3">
    <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#b98a2f]" />
    <span>{children}</span>
  </li>
);

export const StorySection = () => (
  <Shell id="story" testId="section-story">
    <div className="grid items-center gap-10 sm:gap-16 md:grid-cols-2">
      <Photo src="/photo-story.jpg" alt="Our founder walking the pasture with his chickens at dawn" testId="story-photo" />
      <motion.div {...REVEAL}>
        <Headline>&ldquo;The Chicken Whisperer&rdquo;</Headline>
        <div className="mt-6" />
        <Copy>
          <p>The name given to our Founder following his passion to develop first of their kind foods from the world&rsquo;s most consumed protein.</p>
          <p>But new products become meaningless without two key principles behind their creation: where our farmed animals come from, and their standards of welfare.</p>
          <p>Both of these form everything that&rsquo;s important to us, and that&rsquo;s supporting our British Farmers. We will never import any chicken. Our welfare standards are too important, and so is the traceability and origin of our chicken. By working exclusively with Cranswick PLC, and their Red Tractor accreditation, our customers can be assured they are supporting the finest British produce, from Farm To Pantry.</p>
          <p>Add to these core beliefs our return to a traditional, pure, sustainable approach to food. These are the basis of everything we will do, just as it should be.</p>
        </Copy>
      </motion.div>
    </div>
  </Shell>
);

export const ProductsSection = () => (
  <Shell id="products" testId="section-products">
    <motion.div {...REVEAL} className="mx-auto max-w-3xl text-center">
      <Headline>More unique, premium foods</Headline>
      <div className="mt-6" />
      <Copy>
        <p>
          As we launch our{" "}
          <button
            onClick={() => scrollToId("chicken-oil")}
            data-testid="products-oil-link"
            className="cursor-pointer font-semibold text-[#1c2b1e] underline decoration-[#b98a2f] decoration-2 underline-offset-4 transition-colors hover:text-[#b98a2f]"
          >
            Pure Chicken Oil
          </button>
          , we are already developing a number of further unique, sustainable foods and ingredients, all made from our High Welfare, British farmed chicken. Including traditional cooking fats, stocks, gravies and other chilled and ambient pantry products.
        </p>
      </Copy>
    </motion.div>

    <div className="mt-16 flex justify-center">
      <motion.div {...REVEAL} className="max-w-xl">
        <ul className="space-y-5 font-display text-lg text-[#1c2b1e] sm:text-xl">
          <Bullet>High-welfare British chicken</Bullet>
          <Bullet>No seed oils or additives</Bullet>
          <Bullet>Made for home cooks and professional kitchens</Bullet>
          <Bullet>A growing range of original chicken ingredients</Bullet>
        </ul>
        <div className="mt-10 text-center">
          <Btn onClick={() => scrollToId("chicken-oil")} testId="products-discover-btn">Discover Our Pure Chicken Oil</Btn>
        </div>
      </motion.div>
    </div>

    <motion.div {...REVEAL} className="mt-16 border-y border-[#1c2b1e]/15 py-10 text-center" data-testid="range-growing-band">
      <h3 className="font-display text-xl uppercase tracking-[0.25em] text-[#1c2b1e]">The Range Is Growing</h3>
      <p className="mx-auto mt-4 max-w-2xl font-display text-base leading-relaxed text-[#3a362c] sm:text-lg">
        Farm To Pantry is developing a wider range of original British chicken ingredients, including traditional cooking fats, stocks, gravies and other premium pantry products.
      </p>
      <div className="mt-8">
        <Btn variant="ghost" onClick={() => scrollToId("trade")} testId="products-trade-btn">Trade Enquiries</Btn>
      </div>
    </motion.div>
  </Shell>
);

export const ChickenOilSection = () => (
  <section id="chicken-oil" data-testid="section-chicken-oil" className="relative bg-[#f1e7d5]">
    <motion.div {...REVEAL} className="relative overflow-hidden">
      <img src="/photo-pour.jpg" alt="Farm To Pantry chicken oil pouring over roast potatoes" data-testid="chicken-oil-photo" className="h-auto w-full" draggable={false} loading="lazy" />
    </motion.div>
    <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:px-10 sm:py-24">
      <motion.div {...REVEAL}>
        <Copy>
          <p className="text-lg sm:text-xl">Our journey starts with our luxurious, flavour-rich chicken oil, naturally manufactured from our newly developed recipe. It is naturally rich in monounsaturated fat, Omega 3 and 6, contains no cholesterol or salt. Its high smoke point makes it a versatile addition to your pantry.</p>
        </Copy>
        <ul className="mx-auto mt-10 max-w-xl space-y-4 text-left font-display text-base text-[#3a362c] sm:text-lg">
          <Bullet>Create the ultimate Sunday roast with a splash over the bird, make the ultimate crispy potatoes, and add it to your gravy for flavour and finish.</Bullet>
          <Bullet>Stir fry a quick chicken, mushroom and rice.</Bullet>
          <Bullet>Use it as the base for a seed-oil free salad dressing.</Bullet>
        </ul>
        <div className="mt-12 border-t border-[#1c2b1e]/15 pt-10">
          <Copy>
            <p>We are developing a number of further unique, sustainable foods and ingredients for the Farm To Pantry brand and private label partners, all made from our High-Welfare, British farmed chicken. These will include traditional cooking fats, stocks, gravies and other premium pantry products.</p>
          </Copy>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Btn onClick={() => scrollToId("shop")} testId="oil-shop-btn">Visit The Shop</Btn>
          <Btn variant="ghost" onClick={() => scrollToId("trade")} testId="oil-trade-btn">Trade Enquiries</Btn>
        </div>
      </motion.div>
    </div>
  </section>
);

export const PetSection = () => (
  <Shell id="pet" testId="section-pet">
    <div className="grid items-center gap-10 sm:gap-16 md:grid-cols-2">
      <motion.div {...REVEAL} className="order-2 md:order-1">
        <Headline>Pet Nutrition</Headline>
        <div className="mt-6" />
        <Copy>
          <p>Farm To Pantry is developing British chicken oils and protein ingredients for use in pet supplements, treats and functional nutrition products.</p>
          <p>We work with manufacturers and brand owners to explore suitable formats, specifications and product-development opportunities.</p>
        </Copy>
        <div className="mt-8">
          <Btn href={mailto("Pet Nutrition Project")} testId="pet-enquiry-btn">Discuss a Pet Nutrition Project</Btn>
        </div>
      </motion.div>
      <div className="order-1 md:order-2">
        <Photo src="/photo-pet.jpg" alt="A trainer with his dog at golden hour" testId="pet-photo" />
      </div>
    </div>
  </Shell>
);

export const TradeSection = () => (
  <Shell id="trade" testId="section-trade">
    <div className="grid items-center gap-10 sm:gap-16 md:grid-cols-2">
      <Photo src="/photo-chef.jpg" alt="A chef at work in a professional kitchen" testId="trade-photo" />
      <motion.div {...REVEAL}>
        <Headline>British Chicken Oil for Food Manufacturing and Foodservice</Headline>
        <div className="mt-6" />
        <ul className="space-y-3 font-display text-base text-[#3a362c] sm:text-lg">
          <Bullet>Bulk supply for manufacturers, foodservice operators and ingredient users</Bullet>
          <Bullet>Available formats from 5 litre PET containers to 1,000 litre IBCs</Bullet>
          <Bullet>British provenance</Bullet>
          <Bullet>Full traceability and technical documentation (SALSA)</Bullet>
          <Bullet>Suitable specifications subject to application</Bullet>
          <Bullet>Bespoke and co-manufacturing discussions welcomed</Bullet>
        </ul>
        <p className="mt-6 font-display text-base italic leading-relaxed text-[#3a362c] sm:text-lg">
          Tell us the format, volume and application you require, and our team will discuss the most appropriate supply option.
        </p>
        <div className="mt-8">
          <Btn href={mailto("Trade Enquiry")} testId="trade-enquiry-btn">Make a Trade Enquiry</Btn>
        </div>
      </motion.div>
    </div>
  </Shell>
);

export const ShopSection = () => (
  <Shell id="shop" testId="section-shop">
    <div className="grid items-center gap-10 sm:gap-16 md:grid-cols-2">
      <motion.div {...REVEAL} className="order-2 md:order-1">
        <p className="font-display text-xl tracking-[0.25em] text-[#b98a2f] sm:text-2xl">FARM TO PANTRY</p>
        <div className="mt-4"><Headline>Opening Soon.</Headline></div>
        <div className="mt-6" />
        <Copy>
          <p>Our first Farm To Pantry product, High-Welfare British Chicken Oil, will soon be available in 250ml bottles.</p>
        </Copy>
        <div className="mt-8 flex flex-wrap gap-4">
          <Btn href={mailto("Join the Launch List")} testId="shop-launch-list-btn">Join the Launch List</Btn>
          <Btn variant="ghost" onClick={() => scrollToId("trade")} testId="shop-trade-btn">Trade Enquiries</Btn>
        </div>
      </motion.div>
      <div className="order-1 mx-auto max-w-sm md:order-2">
        <Photo src="/photo-bottle.jpg" alt="Farm To Pantry High-Welfare British Chicken Oil, 250ml bottle" testId="shop-photo" />
      </div>
    </div>
  </Shell>
);

const CATEGORIES = [
  ["Retail and general enquiries", "Retail / General Enquiry", "contact-cat-retail"],
  ["Food manufacturing and foodservice", "Food Manufacturing & Foodservice Enquiry", "contact-cat-foodservice"],
  ["Pet nutrition", "Pet Nutrition Enquiry", "contact-cat-pet"],
  ["Distribution and wholesale", "Distribution & Wholesale Enquiry", "contact-cat-wholesale"],
  ["Press and partnerships", "Press & Partnerships Enquiry", "contact-cat-press"],
];

export const ContactSection = () => (
  <Shell id="contact" testId="section-contact" dark>
    <motion.div {...REVEAL} className="mx-auto max-w-3xl text-center">
      <h2 className="font-display text-4xl leading-tight text-[#e6c27a] sm:text-5xl">Contact</h2>
      <div className="mt-6" />
      <p className="font-display text-base leading-relaxed text-[#f1e7d5]/80 sm:text-lg">
        Every enquiry is read by our team. Choose the route that fits best and we will come back to you.
      </p>
    </motion.div>
    <motion.div {...REVEAL} className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map(([label, subject, tid]) => (
        <a
          key={tid}
          href={mailto(subject)}
          data-testid={tid}
          className="border border-[#e6c27a]/25 px-6 py-5 text-center font-display text-sm uppercase tracking-[0.2em] text-[#f1e7d5] transition-colors duration-300 hover:border-[#e6c27a] hover:bg-[#e6c27a]/10"
        >
          {label}
        </a>
      ))}
    </motion.div>
    <motion.div {...REVEAL} className="mt-16 border-t border-[#e6c27a]/20 pt-8 text-center">
      <a href={mailto("Hello")} data-testid="contact-email-link" className="font-display text-lg tracking-[0.2em] text-[#e6c27a] transition-opacity hover:opacity-80">
        {EMAIL.toUpperCase()}
      </a>
      <p className="mt-4 font-display text-xs uppercase tracking-[0.3em] text-[#f1e7d5]/50">
        The Chicken Whisperer · Farm To Pantry · Launching September 2026
      </p>
    </motion.div>
  </Shell>
);
