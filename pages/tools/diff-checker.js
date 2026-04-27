import { useMemo, useState } from "react";
import DiffMatchPatch from "diff-match-patch";
import Layout from "../../components/Layout";

export default function DiffChecker() {
  const [a, setA] = useState("The quick brown fox jumps over the lazy dog.");
  const [b, setB] = useState("The quick red fox leaps over the lazy dog!");

  const html = useMemo(() => {
    const dmp = new DiffMatchPatch();
    const diffs = dmp.diff_main(a, b);
    dmp.diff_cleanupSemantic(diffs);
    return dmp.diff_prettyHtml(diffs);
  }, [a, b]);

  return (
    <Layout title="Diff Checker">
      <h1>Diff Checker</h1>
      <p className="muted">Highlights insertions and deletions between two texts.</p>
      <div className="two-col">
        <textarea value={a} onChange={(e) => setA(e.target.value)} placeholder="Original text" />
        <textarea value={b} onChange={(e) => setB(e.target.value)} placeholder="Changed text" />
      </div>
      <h3>Result</h3>
      <div
        className="diff"
        style={{
          padding: "0.75rem",
          border: "1px solid var(--border)",
          borderRadius: 6,
          background: "var(--code-bg)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  );
}
