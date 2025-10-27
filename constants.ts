
import { LearnerLevel, AnalysisType, AnalysisDepth } from './types';

export const LEARNER_LEVEL_OPTIONS: { value: LearnerLevel; label: string }[] = [
  { value: LearnerLevel.Beginner, label: "Débutant" },
  { value: LearnerLevel.Intermediate, label: "Intermédiaire" },
  { value: LearnerLevel.Advanced, label: "Avancé" },
];

export const ANALYSIS_TYPE_OPTIONS: { value: AnalysisType; label: string }[] = [
  { value: AnalysisType.Argumentation, label: "Argumentation" },
  { value: AnalysisType.Clarity, label: "Clarté" },
  { value: AnalysisType.CriticalThinking, label: "Esprit Critique" },
  { value: AnalysisType.Creativity, label: "Créativité" },
  { value: AnalysisType.Coherence, label: "Cohérence" },
  { value: AnalysisType.TheoreticalAnchoring, label: "Ancrage Théorique" },
];

export const ANALYSIS_DEPTH_OPTIONS: { value: AnalysisDepth; label: string, description: string }[] = [
    { value: 1, label: "1 - Surface", description: "Repérage d’idées principales" },
    { value: 2, label: "2 - Intermédiaire", description: "Cohérence logique, compréhension des notions" },
    { value: 3, label: "3 - Approfondie", description: "Analyse du raisonnement, des implicites et des cadres théoriques" },
];
