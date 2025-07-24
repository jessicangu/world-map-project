import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/adminDashboard.css";

export default function AdminDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="user-dropdown">
          <button onClick={() => setMenuOpen(!menuOpen)} className="user-btn">
            👤 {user?.username}
          </button>
          {menuOpen && (
            <ul className="dropdown-menu">
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          )}
        </div>
        <nav>
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/add-resource">Add Resource</Link></li>
            <li><Link to="/admin/view-resource">View Resource</Link></li>
            <li><Link to="/admin/contact">Contact</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">
        <div className="admin-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
