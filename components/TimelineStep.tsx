
import React from 'react';
import GlassCard from './GlassCard';
import { TimelineActivity } from '../types';
import { Calendar, ArrowRight, ArrowLeft, Download } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface Props {
  data: TimelineActivity[];
  onNext: () => void;
  language: string;
}

const TimelineStep: React.FC<Props> = ({ data, onNext, language }) => {
  const t = UI_TEXT[language] || UI_TEXT['en'];
  const isRTL = language === 'ar';

  const exportCSV = () => {
    const headers = isRTL 
      ? ['النشاط', 'الشهر', 'المسؤول']
      : ['Activity', 'Month', 'Responsible'];
    
    const rows = data.map(item => [
      item.activity,
      item.month.toString(),
      item.responsible
    ].map(val => `"${val.replace(/"/g, '""')}"`).join(','));

    const csvContent = "\uFEFF" + headers.join(',') + '\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Timeline_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl sticky top-4 z-50 border border-slate-200 dark:border-white/10 shadow-lg">
        <h2 className="text-2xl font-bold font-tajawal text-slate-800 dark:text-white flex items-center gap-2">
            <Calendar className="text-orange-500" />
            {t.timelineTitle}
        </h2>
        <div className="flex gap-3">
          <button 
            onClick={exportCSV}
            className="bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition text-sm"
          >
            <Download size={16} /> {t.btnExportCSV}
          </button>
          <button 
            onClick={onNext}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition"
          >
            {t.btnBudget} {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {data.map((item, idx) => (
          <GlassCard key={idx} className="flex flex-col md:flex-row items-center gap-6 p-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-xl shrink-0">
               M{item.month}
            </div>
            <div className="flex-grow">
               <h4 className="text-lg font-bold font-tajawal text-slate-800 dark:text-white mb-1">{item.activity}</h4>
               <p className="text-sm text-slate-500 dark:text-slate-400">{isRTL ? 'المسؤول:' : 'Responsible:'} <span className="font-bold">{item.responsible}</span></p>
            </div>
            <div className="w-full md:w-64 bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-500" 
                    style={{ width: `${(item.month / 12) * 100}%` }}
                ></div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default TimelineStep;
