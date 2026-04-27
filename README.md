# DevTools (Next.js)

A responsive developer tools website with multiple working tools (JSON formatter,
diff checker, encryption, code editor, PDF tools, image-to-PDF).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Tools

- **Developer Tools**: JSON Formatter, Diff Checker, Encryption (SHA256 / Base64), Code Editor (Monaco)
- **PDF Tools**: PDF to Text, Merge PDF, Split PDF (first page), Image to PDF

## Stack

Next.js 14 (Pages Router) + React 18, client-side only. Libraries: `@monaco-editor/react`,
`diff-match-patch`, `crypto-js`, `pdf-lib`, `pdfjs-dist`, `jspdf`.
