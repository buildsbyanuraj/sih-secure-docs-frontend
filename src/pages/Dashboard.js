import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Welcome, {user?.username} ({user?.role})</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <nav style={{ marginTop: 20 }}>
        <Link to="/documents" style={{ marginRight: 16 }}>Documents / Search</Link>
        {user?.role !== "JUDGE" && <Link to="/upload" style={{ marginRight: 16 }}>Upload Document</Link>}
        {user?.role === "ADMIN" && <Link to="/audit">Audit Log</Link>}
      </nav>

      {user?.role === "JUDGE" && <p style={{ marginTop: 20 }}>You have view-only access. Upload/edit is disabled for your role.</p>}
      {user?.role === "ADMIN" && <p style={{ marginTop: 20 }}>You have full access including the audit trail.</p>}
    </div>
  );
}