import Head from "next/head";
import Link from "next/link";
import Navbar from "./Navbar";

export default function Layout({ title, children }) {
  const pageTitle = title ? `${title} – DevTools` : "DevTools";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="container">
        <Link href="/" className="back">← All tools</Link>
        <div className="tool">{children}</div>
      </main>
    </>
  );
}
