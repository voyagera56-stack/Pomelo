import React, { useState, useMemo } from 'react';
import { LearnerLevel, AnalysisType, AnalysisDepth, FeedbackParams } from '../types';
import { LEARNER_LEVEL_OPTIONS, ANALYSIS_TYPE_OPTIONS, ANALYSIS_DEPTH_OPTIONS } from '../constants';

interface FeedbackFormProps {
  onSubmit: (params: FeedbackParams) => void;
  isLoading: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, isLoading }) => {
  const [level, setLevel] = useState<LearnerLevel>(LearnerLevel.Intermediate);
  const [analysisType, setAnalysisType] = useState<AnalysisType>(AnalysisType.Argumentation);
  const [depth, setDepth] = useState<AnalysisDepth>(2);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
        alert("Veuillez entrer le texte à évaluer.");
        return;
    }
    onSubmit({ level, analysisType, depth, text });
  };
  
  const isFormInvalid = !text.trim() || isLoading;
  const wordCount = useMemo(() => text.trim() === '' ? 0 : text.trim().split(/\s+/).length, [text]);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="level" className="block text-sm font-medium text-brand-text mb-2">
          1. Niveau de l’apprenant
        </label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value as LearnerLevel)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-mandarine focus:ring-brand-mandarine sm:text-sm"
        >
          {LEARNER_LEVEL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-text mb-2">
          2. Type d’analyse
        </label>
        <div className="flex flex-wrap gap-2">
            {ANALYSIS_TYPE_OPTIONS.map(option => (
                <button
                    key={option.value}
                    type="button"
                    onClick={() => setAnalysisType(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
                        analysisType === option.value
                        ? 'bg-brand-mandarine text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
      </div>
      
       <div>
        <label className="block text-sm font-medium text-brand-text mb-2">
          3. Profondeur d’analyse
        </label>
        <div className="relative pt-2">
            <input
                id="depth-slider"
                type="range"
                min="1"
                max="3"
                step="1"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value) as AnalysisDepth)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-thumb:bg-brand-mandarine"
                style={{'--thumb-color': '#FF9F45'} as React.CSSProperties}
            />
            <div className="flex justify-between text-xs text-gray-500 w-full mt-1">
                {ANALYSIS_DEPTH_OPTIONS.map(opt => <span key={opt.value} className="w-1/3 text-center">{opt.label.split(' - ')[1]}</span>)}
            </div>
        </div>
      </div>

      <div>
        <label htmlFor="text" className="block text-sm font-medium text-brand-text">
          4. Texte à évaluer
        </label>
        <div className="relative">
            <textarea
              id="text"
              rows={12}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Coller ici le texte intégral de l’apprenant..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-mandarine focus:ring-brand-mandarine sm:text-sm"
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {wordCount} mot(s)
            </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={isFormInvalid}
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-transparent bg-brand-mandarine px-10 py-4 text-base font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-brand-mandarine focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 hover:shadow-lg"
        >
            {isLoading ? 'Génération en cours...' : 'Générer le Feedback 🍊'}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
