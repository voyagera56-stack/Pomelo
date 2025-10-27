
export enum LearnerLevel {
  Beginner = "Débutant",
  Intermediate = "Intermédiaire",
  Advanced = "Avancé",
}

export enum AnalysisType {
  Argumentation = "argumentation",
  Clarity = "clarté",
  CriticalThinking = "esprit critique",
  Creativity = "créativité",
  Coherence = "cohérence",
  TheoreticalAnchoring = "ancrage théorique",
}

export type AnalysisDepth = 1 | 2 | 3;

export interface FeedbackParams {
  level: LearnerLevel;
  analysisType: AnalysisType;
  depth: AnalysisDepth;
  text: string;
}
