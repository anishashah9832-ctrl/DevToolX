import { useState } from "react";
import Layout from "../../components/Layout";

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read " + file.name));
    reader.onload = () => {
      const img = new Image();
      img.onload = () =>
        resolve({
          dataUrl: reader.result,
          width: img.naturalWidth,
          height: img.naturalHeight,
          type: file.type,
        });
      img.onerror = () => reject(new Error("Invalid image: " + file.name));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageToPdf() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
    setError("");
  };

  const convert = async () => {
    if (files.length === 0) {
      setError("Please choose at least one image.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const { jsPDF } = await import("jspdf");
      const images = [];
      for (const f of files) images.push(await readImage(f));

      const first = images[0];
      const orientation = first.width >= first.height ? "landscape" : "portrait";
      const pdf = new jsPDF({
        orientation,
        unit: "pt",
        format: [first.width, first.height],
      });

      images.forEach((img, idx) => {
        if (idx > 0) {
          pdf.addPage([img.width, img.height], img.width >= img.height ? "landscape" : "portrait");
        }
        const fmt =
          img.type === "image/png" ? "PNG" :
          img.type === "image/webp" ? "WEBP" : "JPEG";
        pdf.addImage(img.dataUrl, fmt, 0, 0, img.width, img.height);
      });

      pdf.save("images.pdf");
    } catch (e) {
      setError("Conversion failed: " + e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layout title="Image to PDF">
      <h1>Image to PDF</h1>
      <p className="muted">Upload images (JPG, PNG, WebP). They'll be combined into one PDF in the selected order.</p>
      <input type="file" accept="image/*" multiple onChange={onChange} />
      {files.length > 0 && (
        <ol>
          {files.map((f, i) => <li key={i}>{f.name}</li>)}
        </ol>
      )}
      <div className="row">
        <button className="btn" onClick={convert} disabled={busy || files.length === 0}>
          {busy ? "Converting…" : "Convert to PDF"}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </Layout>
  );
}
