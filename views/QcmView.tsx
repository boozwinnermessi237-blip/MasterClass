
import React, { useState } from 'react';
import { CourseData, Progress } from '../types';

interface QcmViewProps {
  data: CourseData;
  progress: Progress;
  updateProgress: (u: Partial<Progress>) => void;
}

export const QcmView: React.FC<QcmViewProps> = ({ data, progress, updateProgress }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    
    if (!progress.qcmCompleted.includes(qId)) {
       updateProgress({ qcmCompleted: [...progress.qcmCompleted, qId] });
    }
  };

  const score = data.qcm.reduce((acc, q) => {
    return acc + (selectedAnswers[q.id] === q.correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">30 QCM d'Entraînement</h2>
          <p className="text-slate-600">Testez vos connaissances. Progression: {progress.qcmCompleted.length} / {data.qcm.length}</p>
        </div>
        {showResults && (
          <div className="bg-blue-600 text-white px-8 py-4 rounded-3xl shadow-xl animate-bounce shadow-blue-500/20 text-center">
            <span className="text-xs font-black uppercase tracking-widest block mb-1 opacity-80">Votre Score</span>
            <span className="text-4xl font-black">{score} / {data.qcm.length}</span>
          </div>
        )}
      </header>

      <div className="space-y-6">
        {data.qcm.map((q, idx) => (
          <div key={q.id} className={`bg-white p-6 rounded-3xl border transition-all shadow-sm ${progress.qcmCompleted.includes(q.id) ? 'border-blue-100' : 'border-slate-200'}`}>
            <p className="font-bold text-slate-800 mb-4 flex">
              <span className={`mr-2 ${progress.qcmCompleted.includes(q.id) ? 'text-green-500' : 'text-blue-600'}`}>{idx + 1}.</span> {q.text}
            </p>
            <div className="grid gap-3">
              {q.options?.map((opt, oIdx) => {
                const isSelected = selectedAnswers[q.id] === oIdx;
                const isCorrect = q.correctAnswer === oIdx;
                let bgClass = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                
                if (showResults) {
                  if (isCorrect) bgClass = "bg-green-100 border-green-500 text-green-800";
                  else if (isSelected) bgClass = "bg-red-100 border-red-500 text-red-800";
                } else if (isSelected) {
                  bgClass = "bg-blue-600 border-blue-600 text-white shadow-md";
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(q.id, oIdx)}
                    className={`text-left px-5 py-3 rounded-2xl border transition-all ${bgClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {showResults && q.explanation && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800 text-sm italic rounded-r-xl">
                <span className="font-bold">Explication:</span> {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sticky bottom-6 flex justify-center">
        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={Object.keys(selectedAnswers).length < data.qcm.length}
            className={`px-12 py-5 rounded-full font-black shadow-2xl transition-all ${
              Object.keys(selectedAnswers).length < data.qcm.length 
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-blue-500/30'
            }`}
          >
            {Object.keys(selectedAnswers).length < data.qcm.length 
              ? `Progression (${Object.keys(selectedAnswers).length}/${data.qcm.length})` 
              : "Valider les Réponses"}
          </button>
        ) : (
          <button
            onClick={() => {
              setShowResults(false);
              setSelectedAnswers({});
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-12 py-5 bg-slate-900 text-white rounded-full font-black shadow-2xl hover:bg-slate-800 hover:scale-105 transition-transform"
          >
            Recommencer l'Entraînement
          </button>
        )}
      </div>
    </div>
  );
};
