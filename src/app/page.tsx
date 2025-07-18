"use client";
import { useState } from "react";
import Head from "next/head";
import { analyzeSeo } from "@/utils/yoast-seo";
import { getScoreIndicator } from "@/utils/get-score-indicator";
import { parseYoastHtmlText } from "@/utils/parse-yoast-html-text";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    const analysis = analyzeSeo({title, description, keyword});
    setResult(analysis);
    console.log(analysis);
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

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleAnalyze}
        >
          Analyze SEO
        </button>

        {result && (
          <div style={{ marginTop: "2rem" }} className="flex flex-col gap-4">
            <h2>SEO Results</h2>
            {result && (
              <div style={{ marginTop: "2rem" }} className="flex flex-col gap-4">
                <h2>SEO Results</h2>
                {result.seoResults.map((item: any, index: number) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                    {getScoreIndicator(item.score)}
                    <div>{parseYoastHtmlText(item.text)}</div>
                  </div>
                ))}

                <h2 style={{ marginTop: "2rem" }}>Content Results</h2>
                {result.contentResults.map((item: any, index: number) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                    {getScoreIndicator(item.score)}
                    <div>{parseYoastHtmlText(item.text)}</div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
