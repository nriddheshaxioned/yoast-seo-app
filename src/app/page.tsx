"use client";
import { useState } from "react";
import Head from "next/head";
import { analyzeSeo } from "@/utils/yoast-seo";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any | null>(null);

  const handleAnalyze = () => {
    const analysis = analyzeSeo({ title, description, keyword });
    setResult(analysis);
  };

  return (
    <div>
      <Head>
        <title>Yoast SEO Analyzer</title>
      </Head>

      <main style={{ padding: "2rem" }}>
        <h1>Yoast SEO Analyzer</h1>

        <div style={{ marginBottom: "1rem" }}>
          <input
            placeholder="Focus keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          />
          <textarea
            placeholder="Meta Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: "0.5rem", height: "100px" }}
          />
        </div>

        <button onClick={handleAnalyze}>Analyze SEO</button>

        {result && (
          <div style={{ marginTop: "2rem" }}>
            <h2>SEO Analysis Results</h2>

            <h3>Title Results</h3>
            {result.titleResults.map((res: any) => (
              <div key={res.identifier}>
                ✅ <strong>{res.identifier}</strong>: {res.text}
              </div>
            ))}

            <h3>Description Results</h3>
            {result.descResults.map((res: any) => (
              <div key={res.identifier}>
                ✅ <strong>{res.identifier}</strong>: {res.text}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
