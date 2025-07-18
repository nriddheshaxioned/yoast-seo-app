"use client";
//@ts-ignore
import { Paper, Researcher, SeoAssessor, ContentAssessor } from "yoastseo";

export function analyzeSeo({
  title,
  description,
  keyword,
}: {
  title: string;
  description: string;
  keyword: string;
}) {
  const paper = new Paper({
    title: title,
    description: description,
    keyword: keyword,
    locale: "en_US",
  });

  console.log("Paper", paper);

  const seoAssessor = new SeoAssessor(paper);
  console.log("seoAssessor", seoAssessor);

  const contentAssessor = new ContentAssessor(paper);
  console.log("contentAssessor", contentAssessor);

  // const researcher = new Researcher(paper);
  // const results = researcher.getSEOAnalysis();

  // const titleResults = results.filter((r) => r.identifier === "titleWidth");
  // const descResults = results.filter((r) => r.identifier === "metaDescriptionLength");

  seoAssessor.assess();
  contentAssessor.assess();

  const seoResults = seoAssessor.getResults();
  const contentResults = contentAssessor.getResults();

  const allResults = [...seoResults, ...contentResults];

  const titleResults = allResults.filter((r) => r.identifier === "titleWidth");
  const descResults = allResults.filter((r) => r.identifier === "metaDescriptionLength");

  return {
    titleResults,
    descResults,
    allResults,
  };
}
