import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import SidePanel from "./components/SidePanel";
import AdminResourceForm from "./components/AdminResourceForm";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminContact from "./pages/AdminContact";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef();

  const handleCountryClick = (countryName) => {
    setSelectedCountry(countryName);
    setLoading(true);
    setCountryData(null);
    setResources([]);

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        const d = data[0];
        setCountryData({
          name: d.name.common,
          flag: d.flags.png,
          capital: d.capital?.[0] || "N/A",
          area: `${d.area.toLocaleString("de-DE")} km²`,
          currency: Object.values(d.currencies || {}).map((c) => c.name),
          languages: Object.values(d.languages || {}),
        });
      })
      .catch((err) => {
        console.error("Rest Countries API error:", err);
        setCountryData(null);
      });

    fetch(`/api/resources?country=${encodeURIComponent(countryName)}`)
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
    mapRef.current?.resetHighlight();
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Map onCountryClick={handleCountryClick} ref={mapRef} />
              <SidePanel
                data={countryData}
                resources={resources}
                loading={loading}
                onClose={closePanel}
              />
            </>
          }
        />
        <Route
          path="/admin"
          element={
            isLoggedIn ? <AdminDashboard user={user} /> : <Navigate to="/admin/login" />
          }
        />
        <Route
          path="/admin/add-resource"
          element={
            isLoggedIn ? <AdminResourceForm user={user} /> : <Navigate to="/admin/login" />
          }
        />
        <Route path="/admin/contact" element={<AdminContact />} />
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
      </Routes>
    </>
  );
}

export default App;
