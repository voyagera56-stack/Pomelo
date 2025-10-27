
import { GoogleGenAI } from "@google/genai";
import { FeedbackParams } from "../types";

const PROMPT_TEMPLATE = `
ENTRÉE
Niveau de l’apprenant : {level}
Type d’analyse privilégié : {analysisType}
Profondeur d’analyse conceptuelle : {depth}
Texte à évaluer : {text}

ÉTAPE 1 – Auto-vérification rapide des biais
Avant de générer le feedback, vérifie mentalement :
Mon ton est adapté au niveau et au ton choisi.
Je n’introduis aucun biais culturel, de genre ou de niveau.
Je distingue bien feedback (progrès) et correction (solution).
Je garde à l’esprit que le but est d’accompagner, pas d’évaluer.

ÉTAPE 2 – Réflexion en entonnoir
Procède à ton analyse du général vers le spécifique :
Vue d’ensemble : quelle est la finalité du texte ? (convaincre, décrire, réfléchir, proposer…)
Idées principales : quelles notions, valeurs ou hypothèses structurent le propos ?
Exemples et formulations : relève 2 ou 3 extraits précis du texte qui illustrent une force ou une zone d’ambiguïté.
Exemple attendu :
“Quand vous écrivez ‘la motivation dépend du cadre scolaire’, je me demande si vous distinguez bien les facteurs externes et internes.”
“L’expression ‘on apprend mieux quand on aime le sujet’ montre une intuition juste, que vous pourriez relier à la théorie de l’autodétermination.”
“La phrase ‘le cerveau est une machine à apprendre’ est intéressante mais mériterait d’être nuancée.”
Analyse ciblée : confronte ces extraits à ton type d’analyse privilégié (argumentation, cohérence, clarté, etc.).

ÉTAPE 3 – Génération du feedback complet (≈ 250 mots)
POINTS FORTS :
[éléments précis et valorisants, avec 1 ou 2 citations du texte pour appuyer le propos]
POINTS À AMÉLIORER :
Erreurs conceptuelles :
Repère les confusions ou les malentendus dans les formulations citées.
Si le texte mélange des notions proches, explicite-le avec tact.
Si le propos reste descriptif, suggère un questionnement conceptuel.
Erreurs méthodologiques : [structure, logique, justification, cohérence]
Erreurs rédactionnelles : [syntaxe, style, clarté du propos]
PISTES D’AMÉLIORATION :
[propositions concrètes et actionnables, adaptées au niveau]
Formule au moins une question ouverte invitant à la réflexion métacognitive.
(Ex. : “Comment pourrais-tu relier cette idée à une expérience concrète ou à un cadre théorique ?”)
MESSAGE FINAL :
[encouragement positif cohérent avec le ton et le niveau de l’apprenant]

ÉTAPE 4 – Synthèse structurée
Termine ton feedback par une synthèse en 3 à 5 bullet points :
✅ Ce qui fonctionne bien
⚙️ Ce qui gagnerait à être approfondi
💡 Une idée clé à retenir
🔁 Une piste de réflexion pour la suite
(Phrases courtes, dynamiques, 10 à 15 mots max par point.)

ÉTAPE 5 – Auto-contrôle du feedback
Ajoute à la fin :
AUTO-VÉRIFICATION :
Format respecté : oui
Diagnostic clair et utile : oui
Analyse conceptuelle précise : oui
Ton et bienveillance conformes : oui
Adaptation au niveau de l’apprenant : oui
Feedback équilibré (forces/faiblesses) : oui
Citations du texte intégrées : oui
Répétitions détectées et éliminées : oui
Clarté de la synthèse finale : oui
Niveau de personnalisation : élevé

CONTRAINTES
Ne pas attribuer de note chiffrée.
Employer un ton professionnel, clair, formateur et bienveillant.
Ne pas dépasser environ 250 mots pour le corps du feedback.
Formuler des phrases courtes, précises, naturelles et incarnées.
Le feedback doit inclure au moins une citation directe du texte de l’apprenant.
`;

export const generateFeedback = async (params: FeedbackParams): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = PROMPT_TEMPLATE
    .replace('{level}', params.level)
    .replace('{analysisType}', params.analysisType)
    .replace('{depth}', params.depth.toString())
    .replace('{text}', params.text);

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating feedback from Gemini API:", error);
    throw new Error("Failed to generate feedback. Please check your API key and network connection.");
  }
};
