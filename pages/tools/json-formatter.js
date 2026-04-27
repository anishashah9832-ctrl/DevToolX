import { useState } from "react";
import Layout from "../../components/Layout";

export default function JsonFormatter() {
  const [input, setInput] = useState('{"hello":"world","items":[1,2,3]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError("Invalid JSON: " + e.message);
      setOutput("");
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <Layout title="JSON Formatter">
      <h1>JSON Formatter</h1>
      <p className="muted">Paste JSON below and pretty-print or minify it.</p>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='{"key": "value"}'
      />
      <div className="row">
        <button className="btn" onClick={format}>Pretty Print</button>
        <button className="btn secondary" onClick={minify}>Minify</button>
        <button className="btn secondary" onClick={clear}>Clear</button>
      </div>
      {error && <div className="error">{error}</div>}
      {output && <pre>{output}</pre>}
    </Layout>
  );
}
