
import React from 'react';
import GlassCard from './GlassCard';
import { BudgetData } from '../types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FileText, Table, DownloadCloud } from 'lucide-react';
import { UI_TEXT } from '../constants';

interface Props {
  budget: BudgetData;
  fullProposal: string;
  projectName: string;
  language: string;
}

const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const BudgetStep: React.FC<Props> = ({ budget, fullProposal, projectName, language }) => {
  const t = UI_TEXT[language] || UI_TEXT['en'];
  const isRTL = language === 'ar';

  const categoryData = budget.items.reduce((acc, item) => {
    const existing = acc.find(x => x.name === item.category);
    if (existing) {
      existing.value += item.total;
    } else {
      acc.push({ name: item.category, value: item.total });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const exportWord = () => {
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>${projectName}</title></head><body style="font-family: 'Times New Roman', serif;">`;
    const footer = "</body></html>";
    const content = `
        <h1 style="text-align:center; color:#2E4053;">${projectName}</h1>
        <hr/>
        ${fullProposal.replace(/\n/g, '<br/>')}
        <br/><br/>
        <h2 style="color:#2E4053;">${t.budgetTitle}</h2>
        <table border="1" style="border-collapse: collapse; width: 100%;">
            <tr style="background-color: #f2f2f2;">
                <th>${t.colCategory}</th><th>${t.colItem}</th><th>${t.colDesc || 'Description'}</th><th>${t.colQty}</th><th>${t.colUnit}</th><th>${t.colTotal}</th>
            </tr>
            ${budget.items.map(item => `
                <tr>
                    <td>${item.category}</td>
                    <td>${item.item}</td>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unitCost}</td>
                    <td>${item.total}</td>
                </tr>
            `).join('')}
            <tr>
                <td colspan="5" style="text-align:right; font-weight:bold;">${t.totalCost}</td>
                <td style="font-weight:bold;">${budget.totalCost} ${budget.currency}</td>
            </tr>
        </table>
    `;
    const sourceHTML = header + content + footer;
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${projectName.replace(/\s+/g, '_')}_Full_Project.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const exportExcel = () => {
    const tableContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="UTF-8">
        <style>
          table { border-collapse: collapse; width: 100%; font-family: sans-serif; }
          th { background-color: #f2f2f2; border: 1px solid #000; padding: 5px; font-weight: bold; }
          td { border: 1px solid #000; padding: 5px; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>${t.colCategory}</th>
              <th>${t.colItem}</th>
              <th>${t.colDesc || 'Description'}</th>
              <th>${t.colQty}</th>
              <th>${t.colUnit}</th>
              <th>${t.colTotal}</th>
            </tr>
          </thead>
          <tbody>
            ${budget.items.map(item => `
              <tr>
                <td>${item.category}</td>
                <td>${item.item}</td>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.unitCost}</td>
                <td>${item.total}</td>
              </tr>
            `).join('')}
            <tr>
              <td colspan="5" style="text-align: right; font-weight: bold;">${t.totalCost}</td>
              <td style="font-weight: bold;">${budget.totalCost} ${budget.currency}</td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `;
    const blob = new Blob([tableContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${projectName.replace(/\s+/g, '_')}_Budget.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col lg:flex-row gap-8 mb-8 items-start lg:items-center justify-between border-b border-slate-200 dark:border-white/10 pb-6">
        <div>
            <h2 className="text-4xl font-black font-tajawal mb-2 text-slate-800 dark:text-white">{t.budgetTitle}</h2>
            <p className="text-slate-600 dark:text-blue-200 text-xl font-tajawal font-medium">
                {t.totalCost}: 
                <span className="font-mono text-4xl text-green-600 dark:text-green-400 font-bold ml-3 tracking-tighter">
                    {budget.totalCost.toLocaleString()} <span className="text-xl align-middle">{budget.currency}</span>
                </span>
            </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
             <button onClick={exportWord} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold font-tajawal px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition shadow-lg transform hover:-translate-y-1">
                <DownloadCloud size={24} /> {t.btnExportWord}
             </button>
             <button onClick={exportExcel} className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold font-tajawal px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition shadow-lg transform hover:-translate-y-1">
                <Table size={24} /> {t.btnExportExcel}
             </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <GlassCard className="lg:col-span-1 h-[500px] flex flex-col justify-center items-center bg-white/40 dark:bg-black/20">
            <h3 className="text-xl font-bold font-tajawal mb-6 text-center text-slate-800 dark:text-white">{t.costDist}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', fontFamily: 'Tajawal' }}
                    itemStyle={{ color: '#333', fontWeight: 'bold' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                </PieChart>
            </ResponsiveContainer>
        </GlassCard>

        {/* Table Section */}
        <GlassCard className="lg:col-span-2 overflow-x-auto bg-white/40 dark:bg-black/20 p-0">
            <div className="p-0">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-100/50 dark:bg-white/5 border-b border-slate-300 dark:border-white/20 text-slate-600 dark:text-blue-100 text-sm uppercase tracking-wider font-tajawal">
                            <th className="p-5 font-bold">{t.colCategory}</th>
                            <th className="p-5 font-bold">{t.colItem}</th>
                            <th className="p-5 font-bold">{t.colDesc || 'Description'}</th>
                            <th className="p-5 text-right font-bold">{t.colQty}</th>
                            <th className="p-5 text-right font-bold">{t.colUnit}</th>
                            <th className="p-5 text-right font-bold">{t.colTotal}</th>
                        </tr>
                    </thead>
                    <tbody className="text-base font-tajawal">
                        {budget.items.map((item, idx) => (
                            <tr key={idx} className="border-b border-slate-200 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors duration-150">
                                <td className="p-5 font-bold text-purple-700 dark:text-purple-300">{item.category}</td>
                                <td className="p-5 font-medium text-slate-800 dark:text-white">{item.item}</td>
                                <td className="p-5 text-slate-500 dark:text-gray-300 text-sm max-w-xs leading-relaxed">{item.description}</td>
                                <td className="p-5 text-right font-mono text-slate-700 dark:text-white/80">{item.quantity}</td>
                                <td className="p-5 text-right font-mono text-slate-700 dark:text-white/80">{item.unitCost}</td>
                                <td className="p-5 text-right font-mono font-bold text-green-600 dark:text-green-400">{item.total.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default BudgetStep;
