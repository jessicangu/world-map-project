// EditResource.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editResource.css";

const countries = [
  "Turkey", "Syria", "Ukraine", "Sudan", "Afghanistan",
  "Ethiopia", "Yemen", "Lebanon", "Iran"
];

const categories = ["legal", "food", "education", "shelter", "medical", "safety"];

export default function EditResource() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await fetch(`/api/resources/${id}`);
        if (!res.ok) throw new Error("failed to fetch resource");
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error("error loading resource:", err);
        setMessage("error loading resource.");
      }
    };

    fetchResource();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("are you sure you want to update this resource?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/resources/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("resource updated successfully!");
        setTimeout(() => navigate("/admin/view-resource"), 1500);
      } else {
        setMessage(data.error || "update failed.");
      }
    } catch (err) {
      console.error("update error:", err);
      setMessage("network error.");
    }
  };

  if (!form) return <p style={{ padding: "2rem" }}>loading resource data...</p>;

  return (
    <form onSubmit={handleSubmit} className="edit-resource-form">
      <h2>edit resource</h2>

      <label>
        country:
        <select name="country" value={form.country || ""} onChange={handleChange} required>
          <option value="">select country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        category:
        <select name="category" value={form.category || ""} onChange={handleChange} required>
          <option value="">select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>

      <label>
        name:
        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="resource name"
          required
        />
      </label>

      <label>
        description:
        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="description"
        />
      </label>

      <label>
        website:
        <input
          name="website"
          value={form.website || ""}
          onChange={handleChange}
          placeholder="website URL"
        />
      </label>

      <label>
        address:
        <input
          name="address"
          value={form.address || ""}
          onChange={handleChange}
          placeholder="address"
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          name="verified"
          checked={form.verified || false}
          onChange={handleChange}
        />
        verified
      </label>

      <button type="submit">save changes</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}
