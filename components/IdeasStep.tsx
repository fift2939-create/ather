
import React from 'react';
import GlassCard from './GlassCard';
import { ProjectIdea } from '../types';
import { CheckCircle, Target, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface Props {
  ideas: ProjectIdea[];
  onSelect: (idea: ProjectIdea) => void;
  language: string;
}

const IdeasStep: React.FC<Props> = ({ ideas, onSelect, language }) => {
  const t = UI_TEXT[language] || UI_TEXT['en'];
  const isRTL = language === 'ar';

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in-up py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black font-tajawal mb-4 text-slate-800 dark:text-white tracking-tight">{t.selectTitle}</h2>
        <p className="text-2xl font-tajawal font-medium text-slate-500 dark:text-blue-200/80">{t.selectSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ideas.map((idea) => (
          <GlassCard 
            key={idea.id} 
            hoverEffect={true} 
            onClick={() => onSelect(idea)}
            className="flex flex-col h-full relative overflow-hidden group border-white/60 dark:border-white/10 hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            <div className={`absolute top-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isRTL ? 'left-0' : 'right-0'}`}>
              <CheckCircle className="text-purple-600 dark:text-purple-400 drop-shadow-md" size={32} />
            </div>

            <h3 className="text-2xl font-bold font-tajawal text-slate-900 dark:text-white mb-4 leading-snug group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
              {idea.name}
            </h3>
            
            <p className="text-lg font-tajawal text-slate-600 dark:text-blue-100/70 mb-8 flex-grow leading-relaxed">
              {idea.description}
            </p>

            <div className="space-y-5 mt-4 pt-6 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 -mx-6 px-6 pb-4 rounded-b-lg">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-1.5 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                    <Target className="text-pink-600 dark:text-pink-400 shrink-0" size={18} />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold font-tajawal text-pink-700 dark:text-pink-300 uppercase tracking-wider mb-1">{t.goalLabel}</span>
                    <span className="text-base font-tajawal font-medium text-slate-800 dark:text-pink-50 leading-relaxed">{idea.goal}</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="mt-1 p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Star className="text-yellow-600 dark:text-yellow-400 shrink-0" size={18} />
                 </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold font-tajawal text-yellow-700 dark:text-yellow-300 uppercase tracking-wider mb-1">{t.appealLabel}</span>
                    <span className="text-base font-tajawal font-medium text-slate-800 dark:text-yellow-50 leading-relaxed">{idea.appeal}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
                <button className="w-full py-4 rounded-xl bg-slate-100 dark:bg-white/5 group-hover:bg-purple-600 text-slate-600 dark:text-purple-200 group-hover:text-white font-bold font-tajawal text-lg transition-all flex items-center justify-center gap-2 border border-transparent group-hover:shadow-lg">
                   {t.selectIdeaBtn} {isRTL ? <ArrowLeft size={20}/> : <ArrowRight size={20}/>}
                </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default IdeasStep;
