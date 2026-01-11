
export interface Question {
  id: number;
  text: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface SummaryItem {
  title: string;
  content: string;
}

export interface SituationProbleme {
  scenario: string;
  questions: string[];
  answers?: string[];
}

export interface ProjectExercise {
  title: string;
  description: string;
  expectedWork: string;
}

export interface CourseData {
  id: string;
  disciplineId: string;
  title: string;
  summary: SummaryItem[];
  qcm: Question[];
  courseQuestions: Question[];
  examQcm: Question[];
  examCourse: Question[];
  situationProbleme?: SituationProbleme;
  projectExercises?: ProjectExercise[];
  examType: 'Standard' | 'Projet';
}

export interface SourceDocument {
  id: string;
  name: string;
  mimeType: string;
  data: string; // base64
  size: number;
}

export interface Discipline {
  id: string;
  name: string;
  icon: string;
  documents: CourseData[];
  sources: SourceDocument[]; // Raw files uploaded (PDFs, etc.)
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  SUMMARY = 'SUMMARY',
  QCM = 'QCM',
  COURSE_QUESTIONS = 'COURSE_QUESTIONS',
  EXAM = 'EXAM',
  GENERATOR = 'GENERATOR'
}

export interface Progress {
  [courseId: string]: {
    summaryRead: number[];
    qcmCompleted: number[];
    courseQuestionsRevealed: number[];
    examCompleted: boolean;
  }
}

export interface ExamConfig {
  numQcm: number;
  numCourse: number;
  includeLargePart: boolean;
  difficulty: 'Facile' | 'Standard' | 'Expert';
}
