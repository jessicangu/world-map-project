export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav style={{ background: "#1d1a20", padding: "1rem", color: "#fff" }}>
      <a href="/" style={{ marginRight: "1rem", color: "#dcbfff" }}>Home</a>
      <a href="/admin/contact" style={{ marginRight: "1rem", color: "#dcbfff" }}>Contact</a>
      {isLoggedIn ? (
        <>
          <a href="/admin" style={{ marginRight: "1rem", color: "#dcbfff" }}>Dashboard</a>
          <button onClick={onLogout} style={{ backgroundColor: "#443d4b", color: "#fff" }}>Logout</button>
        </>
      ) : (
        <a href="/admin/login" style={{ color: "#dcbfff" }}>Admin Login</a>
      )}
    </nav>
  );
}
