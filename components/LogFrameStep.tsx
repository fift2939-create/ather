
import React from 'react';
import GlassCard from './GlassCard';
import { LogFrameRow } from '../types';
import { Table, ArrowRight, ArrowLeft, Download } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface Props {
  data: LogFrameRow[];
  onNext: () => void;
  language: string;
}

const LogFrameStep: React.FC<Props> = ({ data, onNext, language }) => {
  const t = UI_TEXT[language] || UI_TEXT['en'];
  const isRTL = language === 'ar';

  const exportCSV = () => {
    const headers = isRTL 
      ? ['المستوى', 'الوصف', 'المؤشرات', 'وسائل التحقق', 'الافتراضات']
      : ['Level', 'Description', 'Indicators', 'Verification', 'Assumptions'];
    
    const rows = data.map(row => [
      row.level,
      row.description,
      row.indicators,
      row.verification,
      row.assumptions
    ].map(val => `"${val.replace(/"/g, '""')}"`).join(','));

    const csvContent = "\uFEFF" + headers.join(',') + '\n' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `LogFrame_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-2xl sticky top-4 z-50 border border-slate-200 dark:border-white/10 shadow-lg">
        <h2 className="text-2xl font-bold font-tajawal text-slate-800 dark:text-white flex items-center gap-2">
            <Table className="text-blue-500" />
            {t.logFrameTitle}
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition"
          >
            {t.btnTimeline} {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>

      <GlassCard className="overflow-x-auto p-0 border-none shadow-2xl">
        <table className="w-full text-sm font-tajawal">
          <thead>
            <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10">
              <th className="p-4 text-center font-bold">{isRTL ? 'المستوى' : 'Level'}</th>
              <th className="p-4 text-center font-bold">{isRTL ? 'الوصف' : 'Description'}</th>
              <th className="p-4 text-center font-bold">{isRTL ? 'المؤشرات' : 'Indicators'}</th>
              <th className="p-4 text-center font-bold">{isRTL ? 'وسائل التحقق' : 'Verification'}</th>
              <th className="p-4 text-center font-bold">{isRTL ? 'الافتراضات' : 'Assumptions'}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">{row.level}</td>
                <td className="p-4 leading-relaxed">{row.description}</td>
                <td className="p-4 italic text-slate-600 dark:text-slate-400">{row.indicators}</td>
                <td className="p-4">{row.verification}</td>
                <td className="p-4 text-xs opacity-70">{row.assumptions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

export default LogFrameStep;
