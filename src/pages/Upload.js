import { useState } from "react";
import api from "../api/axios";

export default function Upload() {
  const [caseNumber, setCaseNumber] = useState("");
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("OTHER");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("case_number", caseNumber);
    formData.append("title", title);
    formData.append("doc_type", docType);
    formData.append("file", file);

    try {
      const res = await api.post("/documents/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(`Uploaded. SHA-256 hash: ${res.data.file_hash}`);
    } catch (err) {
      setMessage("Upload failed — check your role has upload permission.");
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Upload Case Document</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Case Number" value={caseNumber} onChange={(e) => setCaseNumber(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <input placeholder="Document Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 8 }} />
        <select value={docType} onChange={(e) => setDocType(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 8 }}>
          <option value="FIR">FIR</option>
          <option value="EVIDENCE">Evidence</option>
          <option value="COURT_ORDER">Court Order</option>
          <option value="OTHER">Other</option>
        </select>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: 8 }} />
        <button type="submit" style={{ width: "100%", padding: 8 }}>Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}