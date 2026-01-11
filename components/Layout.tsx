
import React from 'react';
import { View, Progress, CourseData, Discipline } from '../types';

interface LayoutProps {
  currentView: View;
  setView: (view: View) => void;
  children: React.ReactNode;
  progress: Progress;
  activeCourse: CourseData | null;
  disciplines: Discipline[];
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setView, children, progress, activeCourse, disciplines }) => {
  const getProgress = (course: CourseData) => {
    const p = progress[course.id] || { summaryRead: [], qcmCompleted: [], courseQuestionsRevealed: [], examCompleted: false };
    const total = course.summary.length + course.qcm.length + course.courseQuestions.length + 1;
    const current = p.summaryRead.length + p.qcmCompleted.length + p.courseQuestionsRevealed.length + (p.examCompleted ? 1 : 0);
    return (current / total) * 100;
  };

  const navItems = [
    { id: View.DASHBOARD, label: 'Tableau de Bord', icon: '🏠' },
    { id: View.SUMMARY, label: 'Résumé', icon: '📖', disabled: !activeCourse },
    { id: View.QCM, label: '30 QCM', icon: '🎯', disabled: !activeCourse },
    { id: View.COURSE_QUESTIONS, label: 'Questions Cours', icon: '✍️', disabled: !activeCourse },
    { id: View.EXAM, label: 'Mini Épreuve', icon: '🎓', disabled: !activeCourse },
    { id: View.GENERATOR, label: 'Nouveau Cours', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden font-['Inter']">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-72 bg-slate-900 text-white flex-col p-6 space-y-8 sticky top-0 h-screen">
        <div className="flex items-center space-y-2 flex-col cursor-pointer" onClick={() => setView(View.DASHBOARD)}>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-blue-500/20">
            🧠
          </div>
          <h1 className="text-xl font-bold tracking-tight text-center leading-tight">MasterClass</h1>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Multi-Disciplines AI</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => setView(item.id)}
              className={`w-full group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 font-semibold'
                  : item.disabled ? 'opacity-30 cursor-not-allowed' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm flex-1 text-left">{item.label}</span>
            </button>
          ))}
        </nav>

        {activeCourse && (
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter truncate">Cours Actif:</span>
            </div>
            <p className="text-xs font-bold text-white truncate mb-2">{activeCourse.title}</p>
            <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${getProgress(activeCourse)}%` }} />
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed text-center">
          Propulsé par : <br/> 
          <span className="text-blue-400 font-bold">Booz Azaph prompt ingeneering</span>
        </div>
      </aside>

      {/* Mobile Nav */}
      <nav className="md:hidden bg-white border-b sticky top-0 z-50 flex overflow-x-auto px-4 py-2 space-x-4 no-scrollbar shadow-sm">
        {navItems.map((item) => (
          <button
            key={item.id}
            disabled={item.disabled}
            onClick={() => setView(item.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-colors ${
              currentView === item.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600'
            } ${item.disabled ? 'opacity-30' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-50 relative">
        <div className="max-w-4xl mx-auto p-6 md:p-10 pb-24 md:pb-10">
          {children}
        </div>
      </main>
    </div>
  );
};
