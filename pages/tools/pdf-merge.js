import { useState } from "react";
import Layout from "../../components/Layout";

export default function PdfMerge() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onChange = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
    setError("");
  };

  const merge = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const src = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const out = await merged.save();
      const blob = new Blob([out], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError("Merge failed: " + e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout title="Merge PDF">
      <h1>Merge PDF</h1>
      <p className="muted">Select 2 or more PDFs; they'll be merged in the chosen order.</p>
      <input type="file" accept="application/pdf" multiple onChange={onChange} />
      {files.length > 0 && (
        <ol>
          {files.map((f, i) => <li key={i}>{f.name}</li>)}
        </ol>
      )}
      <div className="row">
        <button className="btn" onClick={merge} disabled={busy || files.length < 2}>
          {busy ? "Merging…" : "Merge & Download"}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </Layout>
  );
}
