import { Link } from "react-router-dom";
import "../styles/Home.css";
import mapImage from "../assets/world.svg";

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1 className="fade-in fade-delay-1">country resource map</h1>
        <p className="hero-subtitle fade-in fade-delay-2">
          an interactive world map designed to easily connect people with humanitarian resources with just a click.
        </p>
        <Link to="/map" className="cta-button fade-in fade-delay-4">view resources here</Link>
      </div>
    </div>
  );
}
