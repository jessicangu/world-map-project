// src/App.jsx
import React, { useState, useRef } from "react";
import Map from "./components/Map";
import SidePanel from "./components/SidePanel";
import "./index.css";

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef();

  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    setLoading(true);
    setCountryData(null);
    setResources([]); // Reset resources

    // Fetch general country data from Rest Countries API
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const d = data[0];
        setCountryData({
          name: d.name.common,
          flag: d.flags.png,
          capital: d.capital?.[0] || "N/A",
          area: `${d.area.toLocaleString("de-DE")} km<sup>2</sup>`,
          currency: Object.values(d.currencies || {}).map((c) => c.name),
          languages: Object.values(d.languages || {}),
        });
      })
      .catch((err) => {
        console.error("Rest Countries API error:", err);
        setCountryData(null);
      });

    // Fetch humanitarian resources from your Express backend
    fetch(`http://localhost:5000/api/resources?country=${encodeURIComponent(countryName)}`)
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => {
        console.error("Backend resource fetch error:", err);
        setResources([]);
      })
      .finally(() => setLoading(false));
  };

  const closePanel = () => {
    setCountryData(null);
    setResources([]);
    setSelectedCountry(null);
    mapRef.current?.resetHighlight(); // Reset country hover highlight
  };

  return (
    <>
      <Map onCountryClick={handleCountryClick} ref={mapRef} />
      <SidePanel
        data={countryData}
        resources={resources}
        loading={loading}
        onClose={closePanel}
      />
    </>
  );
}

export default App;
