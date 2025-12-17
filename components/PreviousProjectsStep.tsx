
import React, { useEffect, useState } from 'react';
import GlassCard from './GlassCard';
import { SavedProject } from '../types';
import { getProjects, deleteProject } from '../services/storageService';
import { UI_TEXT } from '../constants';
import { Calendar, Trash2, ArrowRight, ArrowLeft, Globe, DollarSign } from 'lucide-react';

interface Props {
  onLoadProject: (project: SavedProject) => void;
  language: string;
}

const PreviousProjectsStep: React.FC<Props> = ({ onLoadProject, language }) => {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const t = UI_TEXT[language] || UI_TEXT['en'];
  const isRTL = language === 'ar';

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
        const updated = deleteProject(id);
        setProjects(updated);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-3 text-slate-800 dark:text-white">{t.historyTitle}</h2>
        <p className="text-xl text-slate-600 dark:text-blue-200/80">{t.historySubtitle}</p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-white/40 dark:bg-white/5 rounded-2xl border border-dashed border-slate-300 dark:border-white/20">
            <p className="text-lg text-slate-500 dark:text-blue-200/60">{t.noProjects}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <GlassCard 
                key={project.id} 
                hoverEffect={true}
                className="flex flex-col h-full group hover:border-purple-400 relative"
            >
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-md flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(project.timestamp).toLocaleDateString()}
                    </span>
                    <button 
                        onClick={(e) => handleDelete(e, project.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-200 hover:scale-110 active:scale-90"
                        title={t.btnDelete}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                    {project.selectedIdea.name}
                </h3>
                
                <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-blue-200/70">
                        <Globe size={14} />
                        {project.input.country}
                    </div>
                    {project.budget && (
                        <div className="flex items-center gap-2 text-sm font-bold text-green-600 dark:text-green-400">
                            <DollarSign size={14} />
                            {project.budget.totalCost.toLocaleString()} {project.budget.currency}
                        </div>
                    )}
                </div>

                <button 
                    onClick={() => onLoadProject(project)}
                    className="w-full mt-auto bg-slate-100 dark:bg-white/10 hover:bg-purple-600 dark:hover:bg-purple-600 hover:text-white text-slate-700 dark:text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] active:translate-y-0 active:shadow-sm flex items-center justify-center gap-2"
                >
                    {t.btnLoad} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </button>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousProjectsStep;
