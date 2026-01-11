
import React, { useState } from 'react';
import { CourseData, Progress } from '../types';

interface CourseQuestionsViewProps {
  data: CourseData;
  progress: Progress;
  updateProgress: (u: Partial<Progress>) => void;
}

export const CourseQuestionsView: React.FC<CourseQuestionsViewProps> = ({ data, progress, updateProgress }) => {
  const [revealedLocal, setRevealedLocal] = useState<Record<number, boolean>>({});

  const toggleReveal = (id: number) => {
    setRevealedLocal(prev => ({ ...prev, [id]: !prev[id] }));
    if (!progress.courseQuestionsRevealed.includes(id)) {
       updateProgress({ courseQuestionsRevealed: [...progress.courseQuestionsRevealed, id] });
    }
  };

  const revealAll = () => {
    const allIds = data.courseQuestions.map(q => q.id);
    const updates: Record<number, boolean> = {};
    allIds.forEach(id => updates[id] = true);
    setRevealedLocal(updates);
    updateProgress({ courseQuestionsRevealed: allIds });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">15 Questions de Cours</h2>
          <p className="text-slate-600">Réponses directes. Maîtrisées: {progress.courseQuestionsRevealed.length} / {data.courseQuestions.length}</p>
        </div>
        <button 
          onClick={revealAll}
          className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
        >
          Tout révéler
        </button>
      </header>

      <div className="grid gap-4">
        {data.courseQuestions.map((q, idx) => {
          const isRevealed = revealedLocal[q.id] || progress.courseQuestionsRevealed.includes(q.id);
          return (
            <div key={q.id} className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all ${isRevealed ? 'border-blue-200' : 'border-slate-200'}`}>
              <button
                onClick={() => toggleReveal(q.id)}
                className="w-full text-left p-6 flex items-start justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800 pr-8">
                  <span className={`mr-2 ${isRevealed ? 'text-blue-500' : 'text-slate-400'}`}>{idx + 1}.</span> {q.text}
                </span>
                <span className={`text-2xl text-slate-400 transition-transform duration-300 ${revealedLocal[q.id] ? 'rotate-180' : ''}`}>
                  ⌄
                </span>
              </button>
              {revealedLocal[q.id] && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-4 duration-300">
                  <div className="pt-5 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Réponse attendue</h4>
                    <div className="text-slate-600 leading-relaxed font-medium bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                      {q.correctAnswer}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
