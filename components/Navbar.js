import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar({ search, setSearch }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  };

  const showSearch = typeof setSearch === "function";

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link href="/" className="brand">⚡ DevTools</Link>
        {showSearch ? (
          <input
            type="text"
            className="search"
            placeholder="Search tools..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
        ) : (
          <div style={{ flex: 1 }} />
        )}
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {mounted ? (theme === "dark" ? "☀️" : "🌙") : "🌙"}
        </button>
      </div>
    </header>
  );
}
