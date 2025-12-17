
import React from 'react';
import GlassCard from './GlassCard';
import { ArrowRight, ArrowLeft, FileText } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface Props {
  proposal: string;
  onNext: () => void;
  language: string;
}

const ProposalStep: React.FC<Props> = ({ proposal, onNext, language }) => {
  const t = UI_TEXT[language] || UI_TEXT['en'];
  const isRTL = language === 'ar';

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sticky Header */}
      <div className="flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl sticky top-4 z-50 border border-slate-200 dark:border-white/10 shadow-lg transition-colors">
        <h2 className="text-2xl font-bold font-tajawal text-slate-800 dark:text-white px-4 flex items-center gap-2">
            <FileText className="text-purple-600" />
            {t.draftTitle}
        </h2>
        <div className="flex gap-3">
          <button 
            onClick={onNext}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-6 py-3 rounded-xl text-base transition font-bold text-white shadow-lg shadow-green-900/20 font-tajawal"
          >
            {t.btnBudget} {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>

      {/* Document View */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-xl shadow-2xl border border-slate-200 dark:border-white/5 min-h-[80vh] p-8 md:p-16 relative overflow-hidden">
          {/* Decorative top bar like a document */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
          
          <div className="prose-content whitespace-pre-wrap font-tajawal text-xl leading-[2.2] text-slate-800 dark:text-slate-200 text-justify">
              {proposal}
          </div>
      </div>
    </div>
  );
};

export default ProposalStep;
