import { useState } from "react";
import "../styles/adminResourceForm.css";

const countries = [
  "Turkey", "Syria", "Ukraine", "Sudan", "Afghanistan",
  "Ethiopia", "Yemen", "Lebanon", "Iran"
];

const categories = ["legal", "food", "education", "shelter", "medical", "safety"];

export default function AdminResourceForm() {
  const [form, setForm] = useState({
    country: "",
    category: "legal",
    name: "",
    description: "",
    website: "",
    address: "",
    verified: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("resource added!");
        setForm({
          country: "",
          category: "legal",
          name: "",
          description: "",
          website: "",
          address: "",
          verified: false,
        });
      } else {
        setMessage(`error: ${data.error}`);
      }
    } catch {
      setMessage("network error.");
    }
  };

  return (
    <div className="resource-form-container">
      <h2>add new resource</h2>
      <form className="resource-form" onSubmit={handleSubmit}>
        <label>
          country
          <select name="country" value={form.country} onChange={handleChange} required>
            <option value="">select a country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label>
          category
          <select name="category" value={form.category} onChange={handleChange}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label>
          resource name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="resource name"
            required
          />
        </label>

        <label>
          description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="short description"
          />
        </label>

        <label>
          website
          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="https://example.org"
          />
        </label>

        <label>
          address
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="street, city, zip"
          />
        </label>

        <label className="checkbox-row">
          <input
            type="checkbox"
            name="verified"
            checked={form.verified}
            onChange={handleChange}
          />
          verified?
        </label>

        <button type="submit">add Resource</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}
