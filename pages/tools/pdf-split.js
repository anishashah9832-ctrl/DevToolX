import { useState } from "react";
import Layout from "../../components/Layout";

export default function PdfSplit() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const split = async () => {
    if (!file) {
      setError("Please choose a PDF first.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const src = await PDFDocument.load(bytes);
      if (src.getPageCount() < 1) {
        setError("PDF has no pages.");
        setBusy(false);
        return;
      }
      const out = await PDFDocument.create();
      const [first] = await out.copyPages(src, [0]);
      out.addPage(first);
      const data = await out.save();
      const blob = new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "first-page.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError("Split failed: " + e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout title="Split PDF">
      <h1>Split PDF</h1>
      <p className="muted">Extracts the first page of the uploaded PDF as a new file.</p>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
          setError("");
        }}
      />
      <div className="row">
        <button className="btn" onClick={split} disabled={busy || !file}>
          {busy ? "Working…" : "Extract first page"}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </Layout>
  );
}
