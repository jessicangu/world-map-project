import { Link } from "react-router-dom";
import "../styles/Home.css";
import mapImage from "../assets/world.svg";

export default function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>country resource map</h1>
        <p>an interactive world map designed to easily connect people with humanitarian resources</p>
        <img src={mapImage} alt="World Map" className="map-img" />
        <Link to="/map" className="cta-button">view resources here</Link>
      </div>
    </div>
  );
}
