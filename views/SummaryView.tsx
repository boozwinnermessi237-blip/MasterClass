
import React, { useState } from 'react';
import { CourseData, Progress } from '../types';

interface SummaryViewProps {
  data: CourseData;
  progress: Progress;
  updateProgress: (u: Partial<Progress>) => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ data, progress, updateProgress }) => {
  const [search, setSearch] = useState('');

  const toggleRead = (idx: number) => {
    const isRead = progress.summaryRead.includes(idx);
    const newList = isRead 
      ? progress.summaryRead.filter(i => i !== idx) 
      : [...progress.summaryRead, idx];
    updateProgress({ summaryRead: newList });
  };

  const filteredSummary = data.summary.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) || 
    item.content.toLowerCase().includes(search.toLowerCase())
  );

  const totalProgress = (progress.summaryRead.length / data.summary.length) * 100;

  return (
    <div className="space-y-8">
      <header className="mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Résumé du Cours</h2>
        <p className="mt-4 text-lg text-slate-600">L'essentiel condensé pour une révision efficace.</p>
        
        {/* Progress Bar Header */}
        <div className="mt-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
           <div className="flex-1">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-1">
                 <span>Progression de lecture</span>
                 <span>{progress.summaryRead.length} / {data.summary.length} sections</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 transition-all duration-700" style={{ width: `${totalProgress}%` }} />
              </div>
           </div>
           <div className="text-2xl">{totalProgress === 100 ? '✅' : '📖'}</div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-slate-400">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Rechercher un sujet, un mot-clé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </header>

      <div className="grid gap-6">
        {filteredSummary.length > 0 ? (
          filteredSummary.map((item, idx) => {
            const isRead = progress.summaryRead.includes(idx);
            return (
              <article 
                key={idx} 
                className={`group bg-white p-6 rounded-2xl border transition-all animate-in fade-in slide-in-from-bottom-2 ${
                  isRead ? 'border-green-200 bg-green-50/10' : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-xl font-bold transition-colors ${isRead ? 'text-green-700' : 'text-blue-700'}`}>
                    {item.title}
                  </h3>
                  <button 
                    onClick={() => toggleRead(idx)}
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                      isRead ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600'
                    }`}
                  >
                    {isRead ? 'Lu ✅' : 'Marquer comme lu'}
                  </button>
                </div>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  {item.content}
                </div>
              </article>
            );
          })
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg italic">Aucun résultat trouvé pour "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
};
