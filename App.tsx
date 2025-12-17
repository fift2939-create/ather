
import React, { useState, useEffect } from 'react';
import { AppStep, UserInput, ProjectIdea, BudgetData } from './types';
import * as Gemini from './services/geminiService';
import { UI_TEXT } from './constants';
import { Sun, Moon, Sparkles } from 'lucide-react';

import InputStep from './components/InputStep';
import AnalysisStep from './components/AnalysisStep';
import IdeasStep from './components/IdeasStep';
import ProposalStep from './components/ProposalStep';
import BudgetStep from './components/BudgetStep';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<UserInput>({ idea: '', country: '', language: 'ar', category: 'other', beneficiaries: '' });
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null);
  const [proposal, setProposal] = useState<string | null>(null);
  const [budget, setBudget] = useState<BudgetData | null>(null);

  const t = UI_TEXT[input.language] || UI_TEXT['ar'];

  useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleInput = async (data: UserInput) => {
    setLoading(true);
    setInput(data);
    try {
      const result = await Gemini.analyzeIdea(data);
      setAnalysis(result);
      setStep(AppStep.ANALYSIS);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleIdeas = async () => {
    setLoading(true);
    try {
      const result = await Gemini.generateIdeas(input, analysis!);
      setIdeas(result);
      setStep(AppStep.IDEAS);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleSelectIdea = async (idea: ProjectIdea) => {
    setLoading(true);
    setSelectedIdea(idea);
    try {
      const result = await Gemini.createProposal(input, idea);
      setProposal(result);
      setStep(AppStep.PROPOSAL);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleBudget = async () => {
    setLoading(true);
    try {
      const result = await Gemini.createBudget(input, selectedIdea!.name, proposal!);
      setBudget(result);
      setStep(AppStep.BUDGET);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a1a] text-slate-900 dark:text-white transition-colors duration-500">
      <header className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 cursor-pointer" onClick={() => window.location.reload()}>
          {t.heroTitle}
        </h1>
        <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="p-3 rounded-full bg-slate-200 dark:bg-white/10 hover:scale-110 transition">
          {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] animate-pulse">
            <Sparkles size={48} className="text-indigo-500 mb-6 animate-spin" />
            <p className="text-xl font-bold">{t.loading}</p>
          </div>
        ) : (
          <>
            {step === AppStep.INPUT && <InputStep onNext={handleInput} currentLanguage={input.language} onLanguageChange={(l) => setInput({...input, language: l})} />}
            {step === AppStep.ANALYSIS && <AnalysisStep analysis={analysis!} onNext={handleIdeas} language={input.language} />}
            {step === AppStep.IDEAS && <IdeasStep ideas={ideas} onSelect={handleSelectIdea} language={input.language} />}
            {step === AppStep.PROPOSAL && <ProposalStep proposal={proposal!} onNext={handleBudget} onRefine={async (req) => {}} language={input.language} isRefining={false} isSaving={false} />}
            {step === AppStep.BUDGET && <BudgetStep budget={budget!} fullProposal={proposal!} projectName={selectedIdea!.name} language={input.language} />}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
