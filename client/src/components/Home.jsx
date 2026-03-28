import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import home from "../assets/home.jpg";
import "./Home.css";

const CATEGORIES = [
  { emoji: "🍝", name: "Italian",     count: "4,820" },
  { emoji: "🍱", name: "Japanese",    count: "3,241" },
  { emoji: "🍛", name: "Indian",      count: "5,130" },
  { emoji: "🌮", name: "Mexican",     count: "2,987" },
  { emoji: "🥘", name: "Middle East", count: "2,102" },
  { emoji: "🫕", name: "African",     count: "1,890" },
  { emoji: "🥗", name: "American",    count: "3,560" },
  { emoji: "🥐", name: "French",      count: "1,750" },
  { emoji: "🍜", name: "Thai",        count: "2,340" },
  { emoji: "🥟", name: "Chinese",     count: "4,210" },
  { emoji: "🌿", name: "Vegan",       count: "3,918" },
  { emoji: "🍰", name: "Desserts",    count: "2,670" },
];

const RECIPES = [
  {
    featured: true,
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80",
    cuisine: "Moroccan",
    title: "Slow-Cooked Lamb & Apricot Tagine",
    desc: "A warming Moroccan classic packed with fragrant spices, tender lamb, sweet apricots, and toasted almonds. Perfect for gatherings.",
  },
  {
    img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&q=80",
    cuisine: "Vietnamese",
    title: "Hanoi-Style Beef Pho",
    desc: "Silky broth, rice noodles and fresh herbs.",
  },
  {
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80",
    cuisine: "Turkish",
    title: "Crispy Adana Chicken Wraps",
    desc: "Smoky minced chicken with pomegranate drizzle.",
  },
  {
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80",
    cuisine: "Indian",
    title: "Creamy Butter Chicken",
    desc: "Tender chicken simmered in a rich, velvety tomato and butter sauce with warming aromatic spices.",
  },
  {
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    cuisine: "Mediterranean",
    title: "Chickpea & Roasted Pepper Wraps",
    desc: "Quick, vibrant, plant-based perfection.",
  },
];

const HOW_IT_WORKS = [
  { num: "01", icon: "🔍", title: "Explore & Discover", desc: "Browse thousands of recipes by cuisine, ingredient, cooking time, or dietary preference." },
  { num: "02", icon: "✍️", title: "Share Your Recipe",  desc: "Upload your recipe with photos and step-by-step instructions for the global community." },
  { num: "03", icon: "⭐", title: "Rate & Review",       desc: "Leave honest ratings and helpful comments. Your feedback helps every cook improve." },
  { num: "04", icon: "🌐", title: "Connect Globally",   desc: "Follow cooks worldwide, exchange culinary traditions, and build your recipe collection." },
];

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

function RevealSection({ children, className }) {
  const ref = useReveal();
  return <div ref={ref} className={`hm-reveal ${className || ""}`}>{children}</div>;
}



export default function Home() {
  return (
    <div className="hm-page">

      {/* HERO */}
      <section className="hm-hero">
        <div className="hm-hero-inner">
          <h1 className="hm-hero-title">
            The World's Recipes,<br />
            <em>One Atlas.</em>
          </h1>

          <p className="hm-hero-desc">
            Discover and share recipes from around the world.
          </p>

          <Link to="/recipes" className="hm-btn-primary">
            Explore Recipes
          </Link>
        </div>
      </section>

      {/* CATEGORIES */}
          <section className="hm-categories">
        <div className="hm-cat-header">
          <div className="hm-cat-header-left">
            <span className="hm-eyebrow">Browse by Cuisine</span>
            <h2 className="hm-section-title">Every Culinary Corner Covered</h2>
          </div>
          <Link to="/recipes" className="hm-btn-ghost">View all -&gt;</Link>
        </div>

        <RevealSection>
          <div className="hm-cat-grid">
            {CATEGORIES.map((c) => (
              <Link className="hm-cat-card" to="/recipes" key={c.name}>
                <span className="hm-cat-icon">{c.emoji}</span>
                <span className="hm-cat-name">{c.name}</span>
                <span className="hm-cat-count">{c.count} recipes</span>
              </Link>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* RECIPES */}
      <section className="hm-recipes">
        <h2>Recipes</h2>
      </section>

      {/* HOW */}
      <section className="hm-how">
        <h2>How it works</h2>
      </section>

    </div>
  );
}