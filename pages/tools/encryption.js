import { useState } from "react";
import CryptoJS from "crypto-js";
import Layout from "../../components/Layout";

export default function Encryption() {
  const [text, setText] = useState("Hello, world!");
  const [b64, setB64] = useState("");
  const [decoded, setDecoded] = useState("");
  const [error, setError] = useState("");

  const sha256 = text ? CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex) : "";

  const doEncode = () => {
    try {
      const wordArray = CryptoJS.enc.Utf8.parse(text);
      setB64(CryptoJS.enc.Base64.stringify(wordArray));
      setError("");
    } catch (e) {
      setError("Encode failed: " + e.message);
    }
  };

  const doDecode = () => {
    try {
      const wordArray = CryptoJS.enc.Base64.parse(b64);
      setDecoded(CryptoJS.enc.Utf8.stringify(wordArray));
      setError("");
    } catch (e) {
      setError("Invalid Base64 input.");
      setDecoded("");
    }
  };

  return (
    <Layout title="Encryption Tool">
      <h1>Encryption Tool</h1>
      <p className="muted">SHA256 hash and Base64 encode/decode.</p>

      <h3>Input text</h3>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />

      <h3>SHA256 Hash</h3>
      <pre>{sha256 || "—"}</pre>

      <h3>Base64</h3>
      <div className="row">
        <button className="btn" onClick={doEncode}>Encode input → Base64</button>
        <button className="btn secondary" onClick={doDecode}>Decode Base64 below</button>
      </div>
      <textarea
        value={b64}
        onChange={(e) => setB64(e.target.value)}
        placeholder="Base64 string"
      />
      {error && <div className="error">{error}</div>}
      {decoded && (
        <>
          <h3>Decoded text</h3>
          <pre>{decoded}</pre>
        </>
      )}
    </Layout>
  );
}
