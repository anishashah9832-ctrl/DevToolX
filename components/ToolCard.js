import Link from "next/link";

export default function ToolCard({ href, title, description }) {
  return (
    <Link href={href} className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}
