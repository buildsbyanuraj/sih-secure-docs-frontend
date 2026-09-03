import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AuditLogPage() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/audit/")
      .then((res) => setLogs(res.data))
      .catch(() => setError("You don't have permission to view the audit log (Admin only)."));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Audit Trail</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table width="100%" cellPadding="6" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th align="left">Time</th>
            <th align="left">User</th>
            <th align="left">Action</th>
            <th align="left">Detail</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}