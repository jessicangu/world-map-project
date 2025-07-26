import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>country resources</div>
      <div style={styles.links}>
        <Link to="/map" style={styles.link}>map</Link>
        <Link to="/about" style={styles.link}>about</Link>
        <Link to="/contact" style={styles.link}>contact</Link>
        <Link to="/admin/login" style={{ ...styles.link, ...styles.loginBtn }}>login</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 2.5rem",
    backgroundColor: "#333D29",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#EFE7D0",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#EFE7D0",
    fontSize: "0.95rem",
    transition: "opacity 0.2s",
  },
  loginBtn: {
    backgroundColor: "#A68A64",
    padding: "0.5rem 1.1rem",
    borderRadius: "999px",
    fontWeight: "bold",
  },
};
