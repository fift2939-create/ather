import React, { useState, useEffect } from 'react';
import { AppState, AppStep, UserInput, ProjectIdea, SavedProject, BudgetData } from './types';
import * as Gemini from './services/geminiService';
import * as Storage from './services/storageService';
import { UI_TEXT } from './constants';
import { Sun, Moon, FolderClock } from 'lucide-react';

// Components
import InputStep from './components/InputStep';
import AnalysisStep from './components/AnalysisStep';
import IdeasStep from './components/IdeasStep';
import ProposalStep from './components/ProposalStep';
import BudgetStep from './components/BudgetStep';
import PreviousProjectsStep from './components/PreviousProjectsStep';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [state, setState] = useState<AppState>({
    step: AppStep.INPUT,
    input: { idea: '', country: '', language: 'ar' },
    analysis: null,
    generatedIdeas: [],
    selectedIdea: null,
    fullProposal: null,
    budget: null,
    isLoading: false,
    error: null,
  });

  const t = UI_TEXT[state.input.language] || UI_TEXT['en'];

  // --- Effects ---

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // --- Handlers ---

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLanguageChange = (lang: string) => {
    setState(s => ({ ...s, input: { ...s.input, language: lang } }));
  };

  const handleInputSubmit = async (input: UserInput) => {
    setState(s => ({ ...s, isLoading: true, input, error: null }));
    try {
      const analysis = await Gemini.analyzeIdea(input);
      setState(s => ({ ...s, isLoading: false, analysis, step: AppStep.ANALYSIS }));
    } catch (err) {
      setState(s => ({ ...s, isLoading: false, error: "Failed to analyze project. Please check API Key." }));
    }
  };

  const handleGenerateIdeas = async () => {
    if (!state.analysis) return;
    setState(s => ({ ...s, isLoading: true, error: null }));
    try {
      const generatedIdeas = await Gemini.generateIdeas(state.input, state.analysis);
      setState(s => ({ ...s, isLoading: false, generatedIdeas, step: AppStep.IDEAS }));
    } catch (err) {
      setState(s => ({ ...s, isLoading: false, error: "Failed to generate ideas." }));
    }
  };

  const handleSelectIdea = async (idea: ProjectIdea) => {
    setState(s => ({ ...s, isLoading: true, selectedIdea: idea, error: null }));
    try {
      const fullProposal = await Gemini.createProposal(state.input, idea);
      
      // Auto-save the project when proposal is created
      const projectToSave: SavedProject = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          input: state.input,
          selectedIdea: idea,
          fullProposal: fullProposal,
          budget: null
      };
      Storage.saveProject(projectToSave);

      setState(s => ({ ...s, isLoading: false, fullProposal, step: AppStep.PROPOSAL }));
    } catch (err) {
      setState(s => ({ ...s, isLoading: false, error: "Failed to create proposal." }));
    }
  };

  const handleGenerateBudget = async () => {
    if (!state.fullProposal || !state.selectedIdea) return;
    setState(s => ({ ...s, isLoading: true, error: null }));
    try {
        const budget = await Gemini.createBudget(state.input, state.selectedIdea.name, state.fullProposal);
        
        // Update the saved project with the budget
        const projects = Storage.getProjects();
        const latest = projects[0];
        if (latest && latest.selectedIdea.name === state.selectedIdea.name) {
            latest.budget = budget;
            latest.timestamp = Date.now(); // update timestamp
            Storage.saveProject(latest);
        }

        setState(s => ({ ...s, isLoading: false, budget, step: AppStep.BUDGET }));
    } catch(err) {
        setState(s => ({ ...s, isLoading: false, error: "Failed to generate budget." }));
    }
  };

  const handleReset = () => {
    setState({
        step: AppStep.INPUT,
        input: { idea: '', country: '', language: state.input.language },
        analysis: null,
        generatedIdeas: [],
        selectedIdea: null,
        fullProposal: null,
        budget: null,
        isLoading: false,
        error: null,
    });
  };

  const handleShowHistory = () => {
      setState(s => ({ ...s, step: AppStep.HISTORY, error: null }));
  };

  const handleLoadProject = (project: SavedProject) => {
      setState({
          step: project.budget ? AppStep.BUDGET : AppStep.PROPOSAL,
          input: project.input,
          analysis: "Loaded from history", // Placeholder as we don't save analysis text to save space/complexity
          generatedIdeas: [project.selectedIdea],
          selectedIdea: project.selectedIdea,
          fullProposal: project.fullProposal,
          budget: project.budget,
          isLoading: false,
          error: null
      });
  };

  // --- Render ---

  return (
    <div className={`min-h-screen relative overflow-hidden font-sans transition-colors duration-500 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-[#1e1b4b] dark:via-[#312e81] dark:to-[#4c1d95] flex flex-col`}>
        
        {/* Background Decorative Elements */}
        <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none transition-all duration-500"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none transition-all duration-500"></div>

        {/* Top Hero Background Image */}
        <div className="absolute top-0 left-0 w-full h-[600px] z-0 opacity-20 dark:opacity-20 pointer-events-none mix-blend-overlay dark:mix-blend-normal">
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBB8QmWxCxAMz2Y3smxMDtuG6BkRUKLhjcA&s" 
                alt="Background Pattern" 
                className="w-full h-full object-cover"
                style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}
            />
        </div>

        {/* Header */}
        <header className="relative z-10 px-8 py-6 flex justify-between items-center max-w-7xl mx-auto border-b border-slate-200/50 dark:border-white/5 transition-colors duration-300 w-full" dir="ltr">
            <h1 className="text-2xl font-bold font-tajawal tracking-wide flex items-center gap-3 cursor-pointer animate-fade-in-scale" onClick={handleReset}>
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-2xl border border-white/40 dark:border-white/20 group">
                    <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-transparent transition-colors duration-300"></div>
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGceCtvjO3Z0_LoKFraNUTxr1amixbtKWXFg&s" 
                        alt="Logo" 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <span className="font-tajawal font-black text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-white dark:to-purple-200 drop-shadow-sm hidden sm:inline">
                    {t.heroTitle}
                </span>
            </h1>
            
            <div className="flex items-center gap-3">
                <button
                    onClick={handleShowHistory}
                    className="p-2 rounded-full bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 text-slate-700 dark:text-blue-200 transition-all border border-white/20 shadow-sm"
                    title={t.historyTitle}
                >
                    <FolderClock size={20} />
                </button>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 text-slate-700 dark:text-yellow-300 transition-all border border-white/20 shadow-sm"
                    title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {state.step !== AppStep.INPUT && !state.isLoading && (
                    <button 
                    onClick={handleReset} 
                    className="px-4 py-2 rounded-lg bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 text-sm text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition border border-white/20 dark:border-white/10 backdrop-blur-md shadow-lg"
                    >
                    {t.startOver}
                    </button>
                )}
            </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 px-6 pb-12 pt-4 flex-grow w-full">
            
            {/* Error Message */}
            {state.error && (
                <div className="max-w-md mx-auto mb-6 p-4 bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/50 rounded-xl text-red-800 dark:text-red-100 text-center backdrop-blur-md shadow-xl animate-fade-in">
                    {state.error}
                    <button onClick={() => setState(s => ({...s, error: null}))} className="block w-full mt-2 text-sm font-bold underline hover:opacity-80">{t.dismiss}</button>
                </div>
            )}

            {/* Loading Indicator (Restored as requested) */}
            {state.isLoading && (
                <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in">
                    <div className="relative">
                         <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-2 h-2 bg-purple-600 dark:bg-white rounded-full animate-pulse"></div>
                         </div>
                    </div>
                    <p className="mt-6 text-xl text-slate-700 dark:text-blue-100 font-tajawal font-bold tracking-wide animate-pulse">{t.loading}</p>
                </div>
            )}

            {/* Step Renderers */}
            {!state.isLoading && (
                <>
                    {state.step === AppStep.INPUT && (
                        <InputStep 
                          onNext={handleInputSubmit} 
                          currentLanguage={state.input.language}
                          onLanguageChange={handleLanguageChange}
                        />
                    )}

                    {state.step === AppStep.ANALYSIS && state.analysis && (
                        <AnalysisStep 
                          analysis={state.analysis} 
                          onNext={handleGenerateIdeas} 
                          language={state.input.language}
                        />
                    )}

                    {state.step === AppStep.IDEAS && (
                        <IdeasStep 
                          ideas={state.generatedIdeas} 
                          onSelect={handleSelectIdea} 
                          language={state.input.language}
                        />
                    )}

                    {state.step === AppStep.PROPOSAL && state.fullProposal && (
                        <ProposalStep 
                            proposal={state.fullProposal} 
                            onNext={handleGenerateBudget}
                            language={state.input.language}
                        />
                    )}

                    {state.step === AppStep.BUDGET && state.budget && state.fullProposal && state.selectedIdea && (
                        <BudgetStep 
                            budget={state.budget} 
                            fullProposal={state.fullProposal} 
                            projectName={state.selectedIdea.name}
                            language={state.input.language}
                        />
                    )}

                    {state.step === AppStep.HISTORY && (
                        <PreviousProjectsStep 
                            onLoadProject={handleLoadProject}
                            language={state.input.language}
                        />
                    )}
                </>
            )}
        </main>

        <footer className="relative z-10 py-8 text-center border-t border-slate-200/50 dark:border-white/5 bg-white/20 dark:bg-black/10 backdrop-blur-md transition-colors duration-300">
             <p className="font-tajawal text-base md:text-lg font-medium text-slate-600 dark:text-blue-100/80 tracking-wide drop-shadow-sm">
                إعداد وبرمجة أ : <span className="font-bold text-purple-700 dark:text-purple-300">نبيل الحميد</span>
             </p>
        </footer>
    </div>
  );
};

export default App;