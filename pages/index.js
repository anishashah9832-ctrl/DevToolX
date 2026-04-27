import Head from "next/head";
import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import ToolCard from "../components/ToolCard";

const TOOLS = [
  {
    category: "Developer Tools",
    items: [
      { href: "/tools/json-formatter", title: "JSON Formatter", description: "Pretty-print and validate JSON." },
      { href: "/tools/diff-checker", title: "Diff Checker", description: "Compare two texts and highlight changes." },
      { href: "/tools/encryption", title: "Encryption Tool", description: "SHA256 hash and Base64 encode/decode." },
      { href: "/tools/code-editor", title: "Code Editor", description: "Monaco editor with JS syntax highlighting." },
    ],
  },
  {
    category: "PDF Tools",
    items: [
      { href: "/tools/pdf-text", title: "PDF to Text", description: "Extract text from a PDF file." },
      { href: "/tools/pdf-merge", title: "Merge PDF", description: "Combine multiple PDFs into one." },
      { href: "/tools/pdf-split", title: "Split PDF", description: "Extract the first page of a PDF." },
      { href: "/tools/image-to-pdf", title: "Image to PDF", description: "Convert images to a single PDF." },
    ],
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [search]);

  return (
    <>
      <Head>
        <title>DevToolX – All-in-One Developer Tools</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Free online developer tools: JSON formatter, diff checker, encryption, code editor, PDF merge/split/to-text, image to PDF."
        />
      </Head>

      <Navbar search={search} setSearch={setSearch} />

      <main className="container">
        {/* ✅ Title + Subtitle added */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
            DevToolX — All-in-One Developer Tools
          </h1>
          <p style={{ color: "#666", marginTop: "10px" }}>
            Fast, free, and browser-based utilities. No installation. No backend.
          </p>
        </div>

        {filtered.length === 0 && (
          <p className="muted">No tools match "{search}".</p>
        )}

        {filtered.map((cat) => (
          <section key={cat.category}>
            <h2 className="section-title">{cat.category}</h2>
            <div className="grid">
              {cat.items.map((t) => (
                <ToolCard key={t.href} {...t} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}