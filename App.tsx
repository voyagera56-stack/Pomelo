import React, { useState, useCallback, useMemo } from 'react';
import { generateFeedback } from './services/geminiService';
import { FeedbackParams } from './types';
import FeedbackForm from './components/FeedbackForm';
import FormattedFeedback from './components/FormattedFeedback';

const inspirationalQuotes = [
    "Un bon feedback éclaire sans éblouir.",
    "L'art d'enseigner, c'est l'art d'aider à la découverte.",
    "Le meilleur feedback est une boussole, pas une carte.",
    "Évaluer pour faire grandir, non pour juger.",
    "Chaque mot compte dans le parcours d'un apprenant."
];

const App: React.FC = () => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [lastParams, setLastParams] = useState<FeedbackParams | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const quote = useMemo(() => inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)], []);

  const handleGenerateFeedback = useCallback(async (params: FeedbackParams) => {
    setIsLoading(true);
    setError(null);
    setFeedback(null);
    setLastParams(params);
    try {
      const result = await generateFeedback(params);
      setFeedback(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleRefineFeedback = useCallback(() => {
    if (lastParams) {
        handleGenerateFeedback(lastParams);
    }
  }, [lastParams, handleGenerateFeedback]);

  const handleCopyToClipboard = useCallback((textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Impossible de copier le texte.');
    });
  }, []);

  const handleExportPdf = useCallback(() => {
    const feedbackContent = document.getElementById('feedback-content');
    if (feedbackContent) {
        const printWindow = window.open('', '', 'height=800,width=800');
        printWindow?.document.write('<html><head><title>Feedback Pomelo</title>');
        printWindow?.document.write('<script src="https://cdn.tailwindcss.com"></script>');
        printWindow?.document.write('</head><body class="p-8">');
        printWindow?.document.write(feedbackContent.innerHTML);
        printWindow?.document.write('</body></html>');
        printWindow?.document.close();
        printWindow?.print();
    }
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
            <div className="inline-block text-6xl mb-4" role="img" aria-label="pomelo emoji">🍊</div>
            <h1 className="text-5xl font-poppins font-bold tracking-tight text-brand-dark sm:text-6xl">Pomelo</h1>
            <p className="mt-4 text-lg text-brand-text max-w-2xl mx-auto italic">
              “{quote}”
            </p>
        </header>

        <main className="space-y-12">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
            <FeedbackForm onSubmit={handleGenerateFeedback} isLoading={isLoading} />
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 min-h-[20rem]">
            <h2 className="text-2xl font-poppins font-bold text-brand-dark mb-6">Votre Feedback Bien Dosé</h2>
            <div className="mt-4">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-brand-text py-16">
                  <svg className="animate-spin h-8 w-8 text-brand-mandarine" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-3 text-sm font-medium">Analyse en cours, veuillez patienter...</p>
                </div>
              )}
              {error && (
                <div className="flex items-center justify-center h-full text-red-600 py-16">
                  <p>Erreur: {error}</p>
                </div>
              )}
              {!isLoading && !error && !feedback && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center py-16">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 text-gray-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                  </svg>
                  <p className="font-medium">Le feedback apparaîtra ici.</p>
                  <p className="text-sm">Remplissez le formulaire ci-dessus pour commencer.</p>
                </div>
              )}
              {feedback && <FormattedFeedback text={feedback} onRefine={handleRefineFeedback} onCopy={handleCopyToClipboard} onExportPdf={handleExportPdf} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
