import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import SidePanel from "./components/SidePanel";
import AdminResourceForm from "./components/AdminResourceForm";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminContact from "./pages/AdminContact";
import ViewResources from "./pages/ViewResources";
import EditResource from "./pages/EditResource";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef();
  const location = useLocation();

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

  const isAdminPath = location.pathname.startsWith("/admin") && isLoggedIn;

  return (
    <>
      {!isAdminPath && <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />}

    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/map"
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
      <Route path="/about" element={<About />} />

      <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
      <Route
        path="/admin"
        element={
          isLoggedIn ? (
            <AdminDashboard user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/admin/login" />
          )
        }
      >
        <Route index element={<div style={{ padding: "2rem" }}>welcome to the admin dashboard</div>} />
        <Route path="add-resource" element={<AdminResourceForm user={user} />} />
        <Route path="view-resource" element={<ViewResources />} />
        <Route path="edit-resource/:id" element={<EditResource />} />
        <Route path="contact" element={<AdminContact />} />
      </Route>

    </Routes>

    </>
  );
}

export default App;
