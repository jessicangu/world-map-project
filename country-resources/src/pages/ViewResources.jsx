import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ViewResources.css";

const countries = [
  "Turkey", "Syria", "Ukraine", "Sudan", "Afghanistan",
  "Ethiopia", "Yemen", "Lebanon", "Iran"
];

const categories = ["legal", "food", "education", "shelter", "medical", "safety"];

export default function ViewResources() {
  const [resources, setResources] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  const fetchResources = async () => {
    try {
      const query = [];
      if (countryFilter) query.push(`country=${countryFilter}`);
      if (categoryFilter) query.push(`category=${categoryFilter}`);
      const res = await fetch(`/api/resources?${query.join("&")}`);
      const data = await res.json();
      setResources(data);
    } catch (err) {
      console.error("Failed to fetch resources", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [countryFilter, categoryFilter]);

  const handleSoftDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to soft delete this resource?");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/resources/${id}`, {
        method: "DELETE",
      });
      fetchResources();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (id) => {
    const confirmEdit = window.confirm("Edit this resource?");
    if (!confirmEdit) return;
    navigate(`/admin/edit-resource/${id}`);
  };

  return (
    <div className="view-resources-container">
      <h2>view & manage resources</h2>

      <div className="filter-bar">
        <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>
          <option value="">all countries</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">all categories</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {resources.length === 0 ? (
        <p className="no-resources">no resources found.</p>
      ) : (
        <ul className="resource-list">
          {resources.map((res) => (
            <li key={res._id} className="resource-card">
              <div className="resource-header">
                <strong>{res.name}</strong> <span className="category-tag">({res.category})</span>
              </div>
              <p>{res.description}</p>
              <p><em>{res.country}</em></p>
              {res.website && (
                <p>
                  website: <a href={res.website} target="_blank" rel="noreferrer">{res.website}</a>
                </p>
              )}
              <p>address: {res.address}</p>
              <p>verified: {res.verified ? "✅" : "❌"}</p>

              <div className="button-group">
                <button className="edit-btn" onClick={() => handleEdit(res._id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleSoftDelete(res._id)}>Soft Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
