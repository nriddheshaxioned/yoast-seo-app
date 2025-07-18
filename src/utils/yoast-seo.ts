"use client";

import {
  Paper,
  languageProcessing,
  assessments,
  SeoAssessor,
  ContentAssessor,
  interpreters,
} from "yoastseo";

const resultToVM = (result: any) => {
  const { _identifier, score, text, marks, editFieldName } = result;
  return {
    _identifier,
    score,
    text,
    marks,
    editFieldName,
    rating: interpreters.scoreToRating(score),
  };
};

export function analyzeSeo({title, description, keyword}: {title: string, description: string, keyword: string}) {
  const KeyphraseDistributionAssessment =
    assessments.seo.KeyphraseDistributionAssessment;
  const TextTitleAssessment = assessments.seo.TextTitleAssessment;
  const WordComplexityAssessment =
    assessments.readability.WordComplexityAssessment;
  const TextAlignmentAssessment =
    assessments.readability.TextAlignmentAssessment;

  const paper = new Paper(title, {
    title: title,
    description: description,
    keyword: keyword,
    locale: "en_US",
  });
  
  console.log("Paper", paper);

  const researcher = new languageProcessing.AbstractResearcher(paper);

  const seoAssessor = new SeoAssessor(researcher);
  seoAssessor.addAssessment(
    "keyphraseDistribution",
    new KeyphraseDistributionAssessment()
  );
  seoAssessor.addAssessment("TextTitleAssessment", new TextTitleAssessment());
  seoAssessor.assess(paper);

  const contentAssessor = new ContentAssessor(researcher);
  contentAssessor.addAssessment(
    "wordComplexity",
    new WordComplexityAssessment()
  );
  contentAssessor.addAssessment("textAlignment", new TextAlignmentAssessment());
  contentAssessor.assess(paper);

  return {
    contentResults: contentAssessor.getValidResults().map(resultToVM),
    seoResults: seoAssessor.getValidResults().map(resultToVM),
  };
}
