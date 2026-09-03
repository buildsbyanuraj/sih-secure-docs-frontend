import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [query, setQuery] = useState("");
  const [verifyResult, setVerifyResult] = useState({});

  async function fetchDocs(search = "") {
    const res = await api.get("/documents/", { params: { search } });
    setDocs(res.data);
  }

  useEffect(() => {
    fetchDocs();
  }, []);

  async function handleVerify(id) {
    try {
      const res = await api.get(`/documents/${id}/verify/`);
      setVerifyResult((prev) => ({ ...prev, [id]: res.data.intact ? "✅ Intact" : "⚠️ Tampered" }));
    } catch {
      setVerifyResult((prev) => ({ ...prev, [id]: "⚠️ Tampered / Mismatch" }));
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Case Documents</h2>
      <input
        placeholder="Search by case number, title, type..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchDocs(query)}
        style={{ width: "100%", padding: 8, marginBottom: 16 }}
      />
      <table width="100%" cellPadding="6" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ccc" }}>
            <th align="left">Case #</th>
            <th align="left">Title</th>
            <th align="left">Type</th>
            <th align="left">Uploaded By</th>
            <th align="left">Integrity</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{doc.case_number}</td>
              <td>{doc.title}</td>
              <td>{doc.doc_type}</td>
              <td>{doc.uploaded_by_name}</td>
              <td>
                <button onClick={() => handleVerify(doc.id)}>Verify</button>
                {verifyResult[doc.id] && <span style={{ marginLeft: 8 }}>{verifyResult[doc.id]}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}