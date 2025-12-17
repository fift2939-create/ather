
import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import { UserInput } from '../types';
import { LANGUAGES, UI_TEXT, CATEGORIES } from '../constants';
import { Send, Globe, MapPin, Layers, Users, Heart, Target, List } from 'lucide-react';

interface Props {
  onNext: (input: UserInput) => void;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const InputStep: React.FC<Props> = ({ onNext, currentLanguage, onLanguageChange }) => {
  const [formData, setFormData] = useState<UserInput>({
    idea: '',
    country: '',
    language: currentLanguage,
    category: 'other',
    beneficiaries: ''
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, language: currentLanguage }));
  }, [currentLanguage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.idea && formData.country) {
      onNext(formData);
    }
  };

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setFormData(prev => ({ ...prev, language: newLang }));
    onLanguageChange(newLang);
  };

  const t = UI_TEXT[currentLanguage] || UI_TEXT['en'];
  const isRTL = currentLanguage === 'ar';

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up pt-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Hero Text & Platform Info */}
        <div className={`lg:col-span-5 space-y-10 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="space-y-6">
                {/* Slogan */}
                <p className="text-xl md:text-2xl font-tajawal font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-blue-300 dark:via-purple-200 dark:to-white animate-text-shimmer bg-[length:200%_auto] leading-normal max-w-lg">
                    {t.heroSubtitle}
                </p>

                {/* Main Title */}
                <h1 className="text-6xl lg:text-8xl font-tajawal font-black leading-tight text-slate-900 dark:text-white drop-shadow-sm tracking-tight">
                    {t.heroTitle}
                </h1>
                
                {/* Description */}
                <p className="text-lg md:text-xl font-tajawal text-slate-600 dark:text-blue-100/90 leading-loose font-medium border-l-4 border-purple-500 pl-6 dark:border-purple-400">
                    {t.platformGoal}
                </p>
            </div>

            {/* Target Audience Cards */}
            <div>
                <h3 className="text-xl font-bold font-tajawal text-slate-800 dark:text-white mb-5 flex items-center gap-3">
                    <Users className="text-purple-500" size={24} /> {t.targetAudienceTitle}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {t.targetAudience.map((item: string, idx: number) => (
                        <div key={idx} className="bg-white/60 dark:bg-white/5 rounded-xl p-4 text-base font-bold font-tajawal text-slate-700 dark:text-blue-100 border border-white/40 shadow-sm backdrop-blur-sm text-center hover:bg-white/80 transition-colors cursor-default">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* How it works */}
            <div>
                 <h3 className="text-xl font-bold font-tajawal text-slate-800 dark:text-white mb-5 flex items-center gap-3">
                    <List className="text-green-500" size={24} /> {t.stepsTitle}
                </h3>
                <div className="space-y-4">
                    {t.steps.map((step: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 bg-white/30 dark:bg-white/5 p-3 rounded-xl border border-white/10">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-indigo-500/30">
                                {idx + 1}
                            </div>
                            <span className="text-lg font-tajawal text-slate-800 dark:text-white font-semibold">{step}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column: Smart Form */}
        <div className="lg:col-span-7">
            <GlassCard className="p-8 lg:p-10 dark:bg-black/40 bg-white/80 border-t-8 border-t-purple-500 dark:border-t-purple-400 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
                
                {/* Idea Textarea */}
                <div className="space-y-3">
                    <label className="text-lg font-bold font-tajawal text-slate-800 dark:text-blue-100 flex items-center gap-2">
                        <Heart size={20} className="text-red-500 dark:text-red-400" /> {t.labelIdea}
                    </label>
                    <textarea
                        value={formData.idea}
                        onChange={(e) => setFormData({ ...formData,idea: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 text-lg font-tajawal text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-white/10 h-40 resize-none transition-all shadow-inner leading-relaxed"
                        placeholder={t.placeholderIdea}
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Category Select */}
                    <div className="space-y-3">
                        <label className="text-base font-bold font-tajawal text-slate-800 dark:text-blue-100 flex items-center gap-2">
                            <Layers size={20} className="text-orange-500 dark:text-orange-400" /> {t.labelCategory}
                        </label>
                        <div className="relative">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base font-tajawal text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [&>option]:text-slate-900 dark:[&>option]:text-white dark:[&>option]:bg-slate-900 transition-all shadow-sm"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {currentLanguage === 'ar' ? cat.ar : currentLanguage === 'fr' ? cat.fr : cat.en}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Country Input */}
                    <div className="space-y-3">
                        <label className="text-base font-bold font-tajawal text-slate-800 dark:text-blue-100 flex items-center gap-2">
                        <MapPin size={20} className="text-green-600 dark:text-green-400" /> {t.labelCountry}
                        </label>
                        <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base font-tajawal text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
                        placeholder={t.placeholderCountry}
                        required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Beneficiaries Input */}
                    <div className="space-y-3">
                        <label className="text-base font-bold font-tajawal text-slate-800 dark:text-blue-100 flex items-center gap-2">
                        <Target size={20} className="text-blue-500 dark:text-blue-400" /> {t.labelBeneficiaries}
                        </label>
                        <input
                        type="text"
                        value={formData.beneficiaries}
                        onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base font-tajawal text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-white/10 transition-all shadow-sm"
                        placeholder={t.placeholderBeneficiaries}
                        />
                    </div>

                    {/* Language Select */}
                    <div className="space-y-3">
                        <label className="text-base font-bold font-tajawal text-slate-800 dark:text-blue-100 flex items-center gap-2">
                        <Globe size={20} className="text-purple-600 dark:text-purple-400" /> {t.labelLanguage}
                        </label>
                        <select
                        value={formData.language}
                        onChange={handleLangChange}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base font-tajawal text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 [&>option]:text-slate-900 dark:[&>option]:text-white dark:[&>option]:bg-slate-900 transition-all shadow-sm"
                        >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.label}</option>
                        ))}
                        </select>
                    </div>
                </div>

                <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg font-tajawal py-5 rounded-2xl shadow-xl shadow-purple-500/20 transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/40 active:scale-[0.98] active:translate-y-0 active:shadow-none flex items-center justify-center gap-3 border border-white/20"
                >
                {currentLanguage === 'ar' ? (
                    <>{t.btnAnalyze} <Send size={22} className="rotate-180" /></>
                ) : (
                    <>{t.btnAnalyze} <Send size={22} /></>
                )}
                </button>
            </form>
            </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default InputStep;
