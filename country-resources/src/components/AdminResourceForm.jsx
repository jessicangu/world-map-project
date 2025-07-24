import { useState, useEffect } from "react";

// countries
const countries = [
  "Turkey", "Syria", "Ukraine", "Sudan", "Afghanistan", "Ethiopia", "Yemen", "Lebanon", "Iran"
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
    verified: false
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
        setForm({ country: "", category: "legal", name: "", description: "", website: "", address: "", verified: false });
      } else {
        setMessage(`error: ${data.error}`);
      }
    } catch {
      setMessage("network error.");
    }
  };

  return ( // form for adding resources
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}>
      <select name="country" value={form.country} onChange={handleChange} required>
        <option value="">select country</option>
        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select name="category" value={form.category} onChange={handleChange}>
        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Resource Name" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="website" value={form.website} onChange={handleChange} placeholder="Website URL" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />

      <label>
        <input type="checkbox" name="verified" checked={form.verified} onChange={handleChange} />
        verified
      </label>

      <button type="submit">add resource</button>
      {message && <p>{message}</p>}
    </form>
  );
}
