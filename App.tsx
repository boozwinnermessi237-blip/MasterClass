
import React, { useState, useEffect } from 'react';
import { View, CourseData, Progress, Discipline, SourceDocument } from './types';
import { Layout } from './components/Layout';
import { SummaryView } from './views/SummaryView';
import { QcmView } from './views/QcmView';
import { CourseQuestionsView } from './views/CourseQuestionsView';
import { ExamView } from './views/ExamView';
import { GeneratorView } from './views/GeneratorView';
import { DashboardView } from './views/DashboardView';
import { INITIAL_DATA } from './data';

const App: React.FC = () => {
  const [currentView, setView] = useState<View>(View.DASHBOARD);
  const [activeDisciplineId, setActiveDisciplineId] = useState<string | null>(null);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  
  const [disciplines, setDisciplines] = useState<Discipline[]>(() => {
    const saved = localStorage.getItem('masterclass_disciplines');
    if (saved) return JSON.parse(saved);
    
    const defaultCourse: CourseData = { 
      ...INITIAL_DATA, 
      id: 'initial-course', 
      disciplineId: 'disc-law', 
      title: 'Droit Numérique Fondamental', 
      examType: 'Standard' 
    };
    return [{
      id: 'disc-law',
      name: 'Droit',
      icon: '⚖️',
      documents: [defaultCourse],
      sources: []
    }];
  });

  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('masterclass_full_progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('masterclass_disciplines', JSON.stringify(disciplines));
  }, [disciplines]);

  useEffect(() => {
    localStorage.setItem('masterclass_full_progress', JSON.stringify(progress));
  }, [progress]);

  const activeCourse = disciplines
    .flatMap(d => d.documents)
    .find(c => c.id === activeCourseId) || null;

  const handleNewData = (data: CourseData) => {
    setDisciplines(prev => prev.map(d => {
      if (d.id === data.disciplineId) {
        return { ...d, documents: [...d.documents, data] };
      }
      return d;
    }));
    setActiveCourseId(data.id);
    setView(View.SUMMARY);
  };

  const addSourceToDiscipline = (discId: string, source: SourceDocument) => {
    setDisciplines(prev => prev.map(d => {
      if (d.id === discId) {
        return { ...d, sources: [...d.sources, source] };
      }
      return d;
    }));
  };

  const updateCourseProgress = (courseId: string, update: any) => {
    setProgress(prev => ({
      ...prev,
      [courseId]: { 
        ...(prev[courseId] || { summaryRead: [], qcmCompleted: [], courseQuestionsRevealed: [], examCompleted: false }), 
        ...update 
      }
    }));
  };

  const addDiscipline = (name: string, icon: string) => {
    const newDisc: Discipline = { id: `disc-${Date.now()}`, name, icon, documents: [], sources: [] };
    setDisciplines(prev => [...prev, newDisc]);
  };

  const renderView = () => {
    if (currentView === View.DASHBOARD) {
      return (
        <DashboardView 
          disciplines={disciplines} 
          addDiscipline={addDiscipline} 
          addSourceToDiscipline={addSourceToDiscipline}
          onSelectCourse={(courseId) => {
            setActiveCourseId(courseId);
            setView(View.SUMMARY);
          }}
          onAddDocument={(discId) => {
            setActiveDisciplineId(discId);
            setView(View.GENERATOR);
          }}
        />
      );
    }

    if (currentView === View.GENERATOR) {
      const activeDisc = disciplines.find(d => d.id === activeDisciplineId);
      return (
        <GeneratorView 
          onDataGenerated={handleNewData} 
          disciplineId={activeDisciplineId || ''} 
          availableSources={activeDisc?.sources || []}
        />
      );
    }

    if (!activeCourse) return <DashboardView disciplines={disciplines} addDiscipline={addDiscipline} addSourceToDiscipline={addSourceToDiscipline} onSelectCourse={setActiveCourseId} onAddDocument={setActiveDisciplineId} />;

    const courseProgress = progress[activeCourse.id] || { summaryRead: [], qcmCompleted: [], courseQuestionsRevealed: [], examCompleted: false };
    const setLocalProgress = (u: any) => updateCourseProgress(activeCourse.id, u);

    switch (currentView) {
      case View.SUMMARY: return <SummaryView data={activeCourse} progress={courseProgress} updateProgress={setLocalProgress} />;
      case View.QCM: return <QcmView data={activeCourse} progress={courseProgress} updateProgress={setLocalProgress} />;
      case View.COURSE_QUESTIONS: return <CourseQuestionsView data={activeCourse} progress={courseProgress} updateProgress={setLocalProgress} />;
      case View.EXAM: return <ExamView data={activeCourse} progress={courseProgress} updateProgress={setLocalProgress} />;
      default: return <DashboardView disciplines={disciplines} addDiscipline={addDiscipline} addSourceToDiscipline={addSourceToDiscipline} onSelectCourse={setActiveCourseId} onAddDocument={setActiveDisciplineId} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setView={setView} 
      progress={progress} 
      activeCourse={activeCourse}
      disciplines={disciplines}
    >
      <div className="animate-in fade-in duration-500">
        {renderView()}
      </div>
    </Layout>
  );
};

export default App;
