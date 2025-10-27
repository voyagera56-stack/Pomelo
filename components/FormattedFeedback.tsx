import React, { useMemo, useCallback, useState } from 'react';
import CheckIcon from './icons/CheckIcon';
import GearIcon from './icons/GearIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import RepeatIcon from './icons/RepeatIcon';


interface FormattedFeedbackProps {
  text: string;
  onRefine: () => void;
  onCopy: (textToCopy: string) => void;
  onExportPdf: () => void;
}

interface FeedbackSections {
    strengths: string;
    improvements: string;
    suggestions: string;
    finalMessage: string;
    synthesis: string;
}

const parseFeedback = (text: string): FeedbackSections => {
    const getTextBetween = (start: string, end: string) => {
        const result = text.split(start)[1]?.split(end)[0]?.trim() || '';
        return result;
    };

    return {
        strengths: getTextBetween('POINTS FORTS :', 'POINTS À AMÉLIORER :'),
        improvements: getTextBetween('POINTS À AMÉLIORER :', 'PISTES D’AMÉLIORATION :'),
        suggestions: getTextBetween('PISTES D’AMÉLIORATION :', 'MESSAGE FINAL :'),
        finalMessage: getTextBetween('MESSAGE FINAL :', 'SYNTHÈSE STRUCTURÉE'),
        synthesis: text.split('SYNTHÈSE STRUCTURÉE')[1]?.split('AUTO-VÉRIFICATION :')[0]?.trim() || '',
    };
};

const ContentRenderer: React.FC<{ content: string }> = ({ content }) => {
    if (!content) return <p className="text-gray-500">Aucun contenu pour cette section.</p>;

    return (
        <div className="space-y-2">
            {content.split('\n').map((line, index) => {
                if (line.trim() === '') return null;
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                    <p key={index}>
                        {parts.map((part, i) =>
                            part.startsWith('**') && part.endsWith('**') ? (
                                <strong key={i} className="font-semibold text-brand-dark">{part.slice(2, -2)}</strong>
                            ) : (
                                part
                            )
                        )}
                    </p>
                );
            })}
        </div>
    );
};

const SynthesisItem: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
    <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md mb-3">
            {icon}
        </div>
        <p className="text-sm font-medium text-brand-text">{text}</p>
    </div>
);


const FormattedFeedback: React.FC<FormattedFeedbackProps> = ({ text, onRefine, onCopy, onExportPdf }) => {
    const sections = useMemo(() => parseFeedback(text), [text]);
    const [copyButtonText, setCopyButtonText] = useState('Copier le texte');

    const synthesisItems = useMemo(() => {
        return sections.synthesis.split('\n').filter(line => line.trim() !== '').map(line => {
            if (line.includes('✅')) return { icon: <CheckIcon className="w-8 h-8 text-green-500" />, text: line.replace('✅', '').trim() };
            if (line.includes('⚙️')) return { icon: <GearIcon className="w-8 h-8 text-blue-500" />, text: line.replace('⚙️', '').trim() };
            if (line.includes('💡')) return { icon: <LightbulbIcon className="w-8 h-8 text-yellow-500" />, text: line.replace('💡', '').trim() };
            if (line.includes('🔁')) return { icon: <RepeatIcon className="w-8 h-8 text-purple-500" />, text: line.replace('🔁', '').trim() };
            return null;
        }).filter(Boolean);
    }, [sections.synthesis]);
    
    const handleCopy = useCallback(() => {
        onCopy(text);
        setCopyButtonText('Copié !');
        setTimeout(() => setCopyButtonText('Copier le texte'), 2000);
    }, [onCopy, text]);

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                 <button onClick={onRefine} className="px-4 py-2 text-sm font-medium text-brand-mandarine bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors">Affiner le feedback</button>
                 <button onClick={handleCopy} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">{copyButtonText}</button>
                 <button onClick={onExportPdf} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">Exporter en PDF</button>
            </div>

            <div id="feedback-content" className="space-y-4">
                <div className="p-5 rounded-lg bg-lime-50 border border-lime-200">
                    <h3 className="text-lg font-poppins font-bold text-green-800 mb-2">🟢 Points forts</h3>
                    <ContentRenderer content={sections.strengths} />
                </div>
                <div className="p-5 rounded-lg bg-yellow-50 border border-yellow-200">
                    <h3 className="text-lg font-poppins font-bold text-yellow-800 mb-2">🟡 Points à améliorer</h3>
                    <ContentRenderer content={sections.improvements} />
                </div>
                <div className="p-5 rounded-lg bg-orange-50 border border-orange-200">
                    <h3 className="text-lg font-poppins font-bold text-orange-800 mb-2">🧡 Pistes d’amélioration</h3>
                    <ContentRenderer content={sections.suggestions} />
                </div>
                <div className="p-5 rounded-lg bg-gray-100 border border-gray-200">
                    <h3 className="text-lg font-poppins font-bold text-gray-800 mb-2">💬 Message final</h3>
                    <ContentRenderer content={sections.finalMessage} />
                </div>
            </div>

            {synthesisItems.length > 0 && (
                 <div>
                    <div className="my-8 border-t-2 border-dashed border-gray-300"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {synthesisItems.map((item, index) => item && <SynthesisItem key={index} icon={item.icon} text={item.text} />)}
                    </div>
                 </div>
            )}
        </div>
    );
};

export default FormattedFeedback;
