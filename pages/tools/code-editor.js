import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";

// Monaco must be client-side only — disable SSR.
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <p className="muted">Loading editor…</p>,
});

const DEFAULT_CODE = `// Try editing this code
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("world"));
`;

export default function CodeEditor() {
  const [code, setCode] = useState(DEFAULT_CODE);

  return (
    <Layout title="Code Editor">
      <h1>Code Editor</h1>
      <p className="muted">Monaco editor with JavaScript syntax highlighting.</p>
      <div style={{ border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden" }}>
        <MonacoEditor
          height="500px"
          defaultLanguage="javascript"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          theme={
            typeof document !== "undefined" &&
            document.documentElement.classList.contains("dark")
              ? "vs-dark"
              : "light"
          }
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </Layout>
  );
}
