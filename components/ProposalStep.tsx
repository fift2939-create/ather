
import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { ArrowRight, ArrowLeft, FileText, Sparkles, Send, Loader2, Save } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface Props {
  proposal: string;
  onNext: () => void;
  onRefine: (request: string) => Promise<void>;
  language: string;
  isRefining: boolean;
  isSaving: boolean;
}

const ProposalStep: React.FC<Props> = ({ proposal, onNext, onRefine, language, isRefining, isSaving }) => {
  const [refinementRequest, setRefinementRequest] = useState('');
  const t = UI_TEXT[language] || UI_TEXT['en'];
  const isRTL = language === 'ar';

  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinementRequest.trim() || isRefining) return;
    await onRefine(refinementRequest);
    setRefinementRequest('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in-up pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sticky Header */}
      <div className="flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl sticky top-4 z-50 border border-slate-200 dark:border-white/10 shadow-lg transition-colors">
        <div className="flex items-center gap-4 px-4">
          <h2 className="text-2xl font-bold font-tajawal text-slate-800 dark:text-white flex items-center gap-2">
              <FileText className="text-purple-600" />
              {t.draftTitle}
          </h2>
          {isSaving && (
            <div className="flex items-center gap-2 text-xs font-tajawal text-slate-400 animate-pulse">
              <Save size={14} />
              <span>{isRTL ? 'جاري الحفظ...' : 'Saving...'}</span>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onNext}
            disabled={isRefining}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 px-6 py-3 rounded-xl text-base transition font-bold text-white shadow-lg shadow-indigo-900/20 font-tajawal"
          >
            {t.btnLogFrame} {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Document View */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1a1a2e] rounded-xl shadow-2xl border border-slate-200 dark:border-white/5 min-h-[80vh] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
            
            {isRefining ? (
              <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                <p className="text-xl font-tajawal font-bold text-slate-500 animate-pulse">{t.refining}</p>
              </div>
            ) : (
              <div className="prose-content whitespace-pre-wrap font-tajawal text-xl leading-[2.2] text-slate-800 dark:text-slate-200 text-justify">
                  {proposal}
              </div>
            )}
        </div>

        {/* AI Assistant Sidebar */}
        <div className="lg:col-span-4 sticky top-28">
          <GlassCard className="p-6 border-t-4 border-t-purple-500">
            <h3 className="text-xl font-bold font-tajawal text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="text-purple-500" size={20} />
              {t.btnAssistant}
            </h3>
            <form onSubmit={handleRefine} className="space-y-4">
              <textarea
                value={refinementRequest}
                onChange={(e) => setRefinementRequest(e.target.value)}
                placeholder={t.assistantPlaceholder}
                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-sm font-tajawal text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
              />
              <button
                type="submit"
                disabled={isRefining || !refinementRequest.trim()}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                {isRefining ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} className={isRTL ? 'rotate-180' : ''} />}
                {t.btnRefine}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ProposalStep;
