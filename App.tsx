
import React, { useState, useEffect } from 'react';
import { AppStep, UserInput, ProjectIdea, BudgetData, LogFrameRow, TimelineActivity, SavedProject } from './types';
import * as Gemini from './services/geminiService';
import { saveProject } from './services/storageService';
import { UI_TEXT } from './constants';
import { Sun, Moon, Sparkles, History, Home } from 'lucide-react';

import InputStep from './components/InputStep';
import AnalysisStep from './components/AnalysisStep';
import IdeasStep from './components/IdeasStep';
import ProposalStep from './components/ProposalStep';
import LogFrameStep from './components/LogFrameStep';
import TimelineStep from './components/TimelineStep';
import BudgetStep from './components/BudgetStep';
import PreviousProjectsStep from './components/PreviousProjectsStep';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [step, setStep] = useState<AppStep>(AppStep.INPUT);
  const [loading, setLoading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [input, setInput] = useState<UserInput>({ idea: '', country: '', language: 'ar', category: 'other', beneficiaries: '' });
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null);
  const [proposal, setProposal] = useState<string | null>(null);
  const [logFrame, setLogFrame] = useState<LogFrameRow[] | null>(null);
  const [timeline, setTimeline] = useState<TimelineActivity[] | null>(null);
  const [budget, setBudget] = useState<BudgetData | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  const t = UI_TEXT[input.language] || UI_TEXT['ar'];

  useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // الحفظ التلقائي عند أي تغيير جوهري
  useEffect(() => {
    if (selectedIdea && proposal) {
      const project: SavedProject = {
        id: currentProjectId || `proj-${Date.now()}`,
        timestamp: Date.now(),
        input,
        selectedIdea,
        fullProposal: proposal,
        logFrame,
        timeline,
        budget
      };
      saveProject(project);
      if (!currentProjectId) setCurrentProjectId(project.id);
    }
  }, [proposal, logFrame, timeline, budget]);

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

  const handleRefineProposal = async (request: string) => {
    setIsRefining(true);
    try {
      const updated = await Gemini.refineProposal(proposal!, request, input.language);
      setProposal(updated);
    } catch (e) { console.error(e); }
    setIsRefining(false);
  };

  const handleGoToLogFrame = async () => {
    setLoading(true);
    try {
      const result = await Gemini.createLogFrame(selectedIdea!.name, input.language);
      setLogFrame(result);
      setStep(AppStep.LOGFRAME);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleGoToTimeline = async () => {
    setLoading(true);
    try {
      const result = await Gemini.createTimeline(selectedIdea!.name, input.language);
      setTimeline(result);
      setStep(AppStep.TIMELINE);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleGoToBudget = async () => {
    setLoading(true);
    try {
      const result = await Gemini.createBudget(input, selectedIdea!.name, proposal!);
      setBudget(result);
      setStep(AppStep.BUDGET);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const loadSavedProject = (project: SavedProject) => {
    setInput(project.input);
    setSelectedIdea(project.selectedIdea);
    setProposal(project.fullProposal);
    setLogFrame(project.logFrame);
    setTimeline(project.timeline);
    setBudget(project.budget);
    setCurrentProjectId(project.id);
    setStep(AppStep.PROPOSAL);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a1a] text-slate-900 dark:text-white transition-colors duration-500">
      <header className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-6">
            <h1 
            className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 cursor-pointer" 
            onClick={() => window.location.reload()}
            >
            {t.heroTitle}
            </h1>
            <nav className="hidden md:flex items-center gap-2">
                <button 
                    onClick={() => setStep(AppStep.INPUT)}
                    className={`p-2 rounded-lg transition ${step === AppStep.INPUT ? 'bg-indigo-500/10 text-indigo-500' : 'text-slate-400 hover:text-white'}`}
                >
                    <Home size={20} />
                </button>
                <button 
                    onClick={() => setStep(AppStep.HISTORY)}
                    className={`p-2 rounded-lg transition ${step === AppStep.HISTORY ? 'bg-purple-500/10 text-purple-500' : 'text-slate-400 hover:text-white'}`}
                >
                    <History size={20} />
                </button>
            </nav>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setStep(AppStep.HISTORY)}
                className="md:hidden p-3 rounded-full bg-slate-200 dark:bg-white/10"
            >
                <History size={20} />
            </button>
            <button 
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} 
            className="p-3 rounded-full bg-slate-200 dark:bg-white/10 hover:scale-110 transition"
            >
            {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
            </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] animate-pulse">
            <Sparkles size={48} className="text-indigo-500 mb-6 animate-spin" />
            <p className="text-xl font-bold font-tajawal">{t.loading}</p>
          </div>
        ) : (
          <React.Fragment>
            {step === AppStep.INPUT && (
              <InputStep 
                onNext={handleInput} 
                currentLanguage={input.language} 
                onLanguageChange={(l) => setInput(prev => ({...prev, language: l}))} 
              />
            )}
            {step === AppStep.ANALYSIS && analysis && (
              <AnalysisStep analysis={analysis} onNext={handleIdeas} language={input.language} />
            )}
            {step === AppStep.IDEAS && (
              <IdeasStep ideas={ideas} onSelect={handleSelectIdea} language={input.language} />
            )}
            {step === AppStep.PROPOSAL && proposal && (
              <ProposalStep 
                proposal={proposal} 
                onNext={handleGoToLogFrame} 
                onRefine={handleRefineProposal} 
                language={input.language} 
                isRefining={isRefining} 
                isSaving={isSaving} 
              />
            )}
            {step === AppStep.LOGFRAME && logFrame && (
              <LogFrameStep data={logFrame} onNext={handleGoToTimeline} language={input.language} />
            )}
            {step === AppStep.TIMELINE && timeline && (
              <TimelineStep data={timeline} onNext={handleGoToBudget} language={input.language} />
            )}
            {step === AppStep.BUDGET && budget && selectedIdea && proposal && (
              <BudgetStep 
                budget={budget} 
                fullProposal={proposal} 
                projectName={selectedIdea.name} 
                language={input.language} 
              />
            )}
            {step === AppStep.HISTORY && (
                <PreviousProjectsStep onLoadProject={loadSavedProject} language={input.language} />
            )}
          </React.Fragment>
        )}
      </main>
    </div>
  );
};

export default App;
