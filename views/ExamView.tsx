
import React, { useState } from 'react';
import { CourseData, Progress, ExamConfig } from '../types';

interface ExamViewProps {
  data: CourseData;
  progress: Progress;
  updateProgress: (u: Partial<Progress>) => void;
}

export const ExamView: React.FC<ExamViewProps> = ({ data, progress, updateProgress }) => {
  const [step, setStep] = useState<'config' | 'intro' | 'active' | 'results'>('config');
  const [examConfig, setExamConfig] = useState<ExamConfig>({
    numQcm: 4,
    numCourse: 2,
    includeLargePart: true,
    difficulty: 'Standard'
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const calculateScore = () => {
    let qcmScore = 0;
    const examQcms = data.qcm.slice(0, examConfig.numQcm);
    examQcms.forEach((q, idx) => {
      if (answers[`qcm_${idx}`] === q.correctAnswer.toString()) {
        qcmScore += 1; 
      }
    });
    
    const maxQcm = examConfig.numQcm;
    const maxCourse = examConfig.numCourse;
    const maxLarge = examConfig.includeLargePart ? 14 : 0;
    const totalPossible = maxQcm + maxCourse + maxLarge;
    
    return { qcm: qcmScore, totalRaw: qcmScore, possibleRaw: totalPossible }; 
  };

  const handleSubmit = () => {
    setStep('results');
    updateProgress({ examCompleted: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const results = calculateScore();
  const scaledScore = Math.round((results.totalRaw / results.possibleRaw) * 20);

  if (step === 'config') {
    return (
      <div className="max-w-2xl mx-auto space-y-8 py-10">
        <div className="text-center space-y-4">
           <h2 className="text-4xl font-black text-slate-900 tracking-tight">Configuration de l'Épreuve</h2>
           <p className="text-slate-600">Structure adaptée pour {data.title}.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
           <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">Questions QCM</label>
              <input 
                type="range" min="1" max="10" 
                value={examConfig.numQcm}
                onChange={(e) => setExamConfig({...examConfig, numQcm: parseInt(e.target.value)})}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 font-bold">
                 <span>{examConfig.numQcm} pts</span>
              </div>
           </div>

           <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-widest">Théorie (Cours)</label>
              <div className="flex space-x-2">
                 {[1, 2, 3, 4, 5].map(n => (
                   <button 
                     key={n}
                     onClick={() => setExamConfig({...examConfig, numCourse: n})}
                     className={`flex-1 py-3 rounded-2xl border font-black transition-all ${examConfig.numCourse === n ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                   >
                     {n}
                   </button>
                 ))}
              </div>
           </div>

           <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
              <div>
                 <p className="font-bold text-slate-800">Partie Pratique (14 pts)</p>
                 <p className="text-xs text-slate-500 font-medium">
                   {data.examType === 'Projet' ? '2 Exercices Projets' : 'Situation Problème'}
                 </p>
              </div>
              <button 
                onClick={() => setExamConfig({...examConfig, includeLargePart: !examConfig.includeLargePart})}
                className={`w-14 h-8 rounded-full transition-all relative ${examConfig.includeLargePart ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${examConfig.includeLargePart ? 'right-1' : 'left-1'}`} />
              </button>
           </div>

           <div className="pt-6">
              <button 
                onClick={() => setStep('intro')}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-black text-lg shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Générer mon Épreuve
              </button>
           </div>
        </div>
      </div>
    );
  }

  if (step === 'intro') {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 py-10">
        <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center text-5xl mx-auto rotate-12 shadow-xl shadow-blue-500/10">
          ⏱️
        </div>
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">C'est le moment !</h2>
          <p className="mt-4 text-slate-600 text-lg">Votre épreuve pour <b>{data.title}</b> est prête.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <span className="block text-3xl font-black text-blue-600">{examConfig.numQcm} pts</span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Section QCM</span>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <span className="block text-3xl font-black text-blue-600">{examConfig.numCourse} pts</span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Section Théorie</span>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <span className="block text-3xl font-black text-blue-600">{examConfig.includeLargePart ? 14 : 0} pts</span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pratique</span>
          </div>
        </div>
        <button onClick={() => setStep('active')} className="bg-blue-600 text-white px-16 py-5 rounded-full font-black text-xl shadow-2xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-blue-500/30">
          Débuter l'Épreuve
        </button>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="space-y-12 animate-in zoom-in-95 duration-500 pb-20">
        <div className="text-center space-y-6">
          <div className="inline-block p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full shadow-2xl shadow-blue-500/40">
             <div className="bg-white px-14 py-14 rounded-full border-8 border-transparent flex flex-col items-center">
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">Note Finale</span>
                <span className="block text-7xl font-black text-slate-900 leading-none">{scaledScore} / 20</span>
             </div>
          </div>
          <h3 className="text-3xl font-bold">Corrigé MasterClass</h3>
        </div>

        <div className="space-y-10">
          <h4 className="text-2xl font-black text-slate-900 border-b-2 border-slate-100 pb-2">I. QCM (Auto-évalué)</h4>
          {data.qcm.slice(0, examConfig.numQcm).map((q, idx) => (
            <div key={idx} className={`p-6 rounded-3xl border-2 ${answers[`qcm_${idx}`] === q.correctAnswer.toString() ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
               <p className="font-bold text-slate-800 mb-2">{idx+1}. {q.text}</p>
               <p className="text-sm">Correction: <span className="font-bold text-slate-900">{q.options?.[q.correctAnswer as number]}</span></p>
            </div>
          ))}

          {examConfig.includeLargePart && data.examType === 'Projet' && data.projectExercises && (
             <>
               <h4 className="text-2xl font-black text-slate-900 border-b-2 border-slate-100 pb-2">III. Exercices Projets (14 points)</h4>
               <div className="grid gap-6">
                 {data.projectExercises.map((p, idx) => (
                   <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                      <h5 className="font-black text-blue-600 uppercase text-xs mb-2">Projet {idx+1}: {p.title}</h5>
                      <div className="bg-slate-50 p-4 rounded-xl text-sm italic mb-4">Votre réponse: {answers[`proj_${idx}`] || "(Non répondu)"}</div>
                      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <span className="font-black text-indigo-900 text-xs block mb-1">Travail Attendu:</span>
                        <p className="text-sm text-indigo-800">{p.expectedWork}</p>
                      </div>
                   </div>
                 ))}
               </div>
             </>
          )}

          {examConfig.includeLargePart && data.examType === 'Standard' && data.situationProbleme && (
             <>
               <h4 className="text-2xl font-black text-slate-900 border-b-2 border-slate-100 pb-2">III. Cas Pratique (14 points)</h4>
               {data.situationProbleme.questions.map((q, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200">
                   <p className="font-bold text-slate-800 mb-2">Q{idx+1}. {q}</p>
                   <div className="bg-blue-50 p-4 rounded-xl text-sm border border-blue-100 text-blue-800">
                     <span className="font-black text-[10px] uppercase block mb-1">Correction:</span> {data.situationProbleme?.answers?.[idx]}
                   </div>
                </div>
              ))}
             </>
          )}
        </div>

        <button onClick={() => setStep('config')} className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl">Nouvelle Session</button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <header className="border-b pb-6 flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Examen Blanc</h2>
        <button onClick={() => setStep('config')} className="text-xs font-black text-blue-600 uppercase tracking-widest underline underline-offset-4">Modifier structure</button>
      </header>

      {/* Part 1: QCM */}
      <section className="space-y-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center">
          <span className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xs mr-4 shadow-lg shadow-blue-500/20">I</span>
          Questions à Choix Multiples
        </h3>
        <div className="grid gap-6">
          {data.qcm.slice(0, examConfig.numQcm).map((q, idx) => (
            <div key={q.id} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
              <p className="font-bold text-slate-800 mb-6 text-lg leading-snug">{idx + 1}. {q.text}</p>
              <div className="grid grid-cols-1 gap-3">
                {q.options?.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => setAnswers(prev => ({ ...prev, [`qcm_${idx}`]: oIdx.toString() }))}
                    className={`px-6 py-4 rounded-2xl border-2 text-sm font-bold text-left transition-all ${
                      answers[`qcm_${idx}`] === oIdx.toString()
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                        : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-blue-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Part 3: Situation vs projects */}
      {examConfig.includeLargePart && data.examType === 'Projet' && data.projectExercises && (
        <section className="space-y-6">
          <h3 className="text-xl font-black text-slate-900 flex items-center">
            <span className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xs mr-4 shadow-lg shadow-blue-500/20">III</span>
            Exercices Projets (Développement)
          </h3>
          <div className="grid gap-8">
            {data.projectExercises.map((p, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-xl space-y-4">
                <div className="flex justify-between items-start">
                   <h4 className="text-xl font-black text-slate-900">{p.title}</h4>
                   <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">7 points</span>
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">{p.description}</p>
                <textarea
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 min-h-[150px]"
                  placeholder="Expliquez votre démarche, code ou architecture..."
                  onChange={(e) => setAnswers(prev => ({ ...prev, [`proj_${idx}`]: e.target.value }))}
                  value={answers[`proj_${idx}`] || ''}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Part 3: Situation Problème */}
      {examConfig.includeLargePart && data.examType === 'Standard' && data.situationProbleme && (
        <section className="space-y-6">
          <h3 className="text-xl font-black text-slate-900 flex items-center">
            <span className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xs mr-4 shadow-lg shadow-blue-500/20">III</span>
            Cas Pratique
          </h3>
          <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-125"></div>
            <h4 className="font-black text-blue-400 mb-4 uppercase tracking-[0.3em] text-[10px]">Scénario d'examen</h4>
            <p className="text-slate-200 leading-relaxed italic text-xl font-medium">"{data.situationProbleme.scenario}"</p>
          </div>
          
          <div className="grid gap-6">
            {data.situationProbleme.questions.map((q, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                <label className="block font-bold text-slate-800 mb-4">
                  <span className="text-blue-600 font-black mr-2 text-sm uppercase">Q{idx + 1}</span> {q}
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                  placeholder="Réponse courte..."
                  onChange={(e) => setAnswers(prev => ({ ...prev, [`sit_${idx}`]: e.target.value }))}
                  value={answers[`sit_${idx}`] || ''}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex justify-center pt-10">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-20 py-6 rounded-full font-black text-xl shadow-2xl hover:bg-green-700 transition-all hover:scale-105 active:scale-95 shadow-green-500/30"
        >
          Valider ma Copie
        </button>
      </div>
    </div>
  );
};
