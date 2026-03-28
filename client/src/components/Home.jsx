import { Link } from "react-router-dom";
import "./Home.css";

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
        <h2>Categories</h2>
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