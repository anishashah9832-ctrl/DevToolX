import { useState } from "react";
import Layout from "../../components/Layout";

export default function PdfText() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    setText("");
    try {
      // Dynamic imports — pdfjs is browser-only.
      const pdfjsLib = await import("pdfjs-dist/build/pdf");
      // Use the matching CDN worker for the installed version.
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let full = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((it) => it.str);
        full += `\n\n--- Page ${i} ---\n` + strings.join(" ");
      }
      setText(full.trim());
    } catch (err) {
      setError("Failed to read PDF: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="PDF to Text">
      <h1>PDF to Text</h1>
      <p className="muted">Upload a PDF to extract its text content.</p>
      <input type="file" accept="application/pdf" onChange={handleFile} />
      {loading && <p className="muted">Extracting…</p>}
      {error && <div className="error">{error}</div>}
      {text && <pre>{text}</pre>}
    </Layout>
  );
}
