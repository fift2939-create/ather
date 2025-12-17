
import React from 'react';
import GlassCard from './GlassCard';
import { ArrowRight, ArrowLeft, BarChart2, Activity } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface Props {
  analysis: string;
  onNext: () => void;
  language: string;
}

const AnalysisStep: React.FC<Props> = ({ analysis, onNext, language }) => {
  const t = UI_TEXT[language] || UI_TEXT['en'];
  const isRTL = language === 'ar';

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in-up py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      
      <div className="flex flex-col items-start gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
        <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl shadow-sm">
                <BarChart2 className="text-purple-600 dark:text-purple-300" size={32} />
            </div>
            <div>
                <h2 className="text-4xl font-black font-tajawal text-slate-800 dark:text-white tracking-tight">{t.analysisTitle}</h2>
                <p className="text-slate-500 dark:text-blue-200 mt-1 font-tajawal font-medium">نظرة عميقة على سياق المشروع واحتياجاته</p>
            </div>
        </div>
      </div>

      <GlassCard className="shadow-xl border-t-4 border-t-indigo-400 dark:border-t-indigo-500 p-8 md:p-12">
        <div className="prose-content whitespace-pre-wrap font-tajawal text-xl leading-[2] text-slate-700 dark:text-blue-50/90 text-justify">
            {analysis}
        </div>
      </GlassCard>

      <div className={`flex ${isRTL ? 'justify-end' : 'justify-end'}`}>
        <button
          onClick={onNext}
          className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold font-tajawal text-lg py-4 px-10 rounded-2xl transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          {isRTL ? (
            <> {t.btnIdeas} <ArrowLeft size={22} /> </>
          ) : (
            <> {t.btnIdeas} <ArrowRight size={22} /> </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AnalysisStep;
