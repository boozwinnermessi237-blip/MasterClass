
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { CourseData, SourceDocument } from '../types';

interface GeneratorViewProps {
  onDataGenerated: (data: CourseData) => void;
  disciplineId: string;
  availableSources: SourceDocument[];
}

export const GeneratorView: React.FC<GeneratorViewProps> = ({ onDataGenerated, disciplineId, availableSources }) => {
  const [inputText, setInputText] = useState('');
  const [selectedSourceId, setSelectedSourceId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [examType, setExamType] = useState<'Standard' | 'Projet'>('Standard');
  const [generationMode, setGenerationMode] = useState<'text' | 'file'>('text');

  const generateContent = async () => {
    if (generationMode === 'text' && !inputText.trim()) return;
    if (generationMode === 'file' && !selectedSourceId) return;

    setLoading(true);
    setError('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const selectedSource = availableSources.find(s => s.id === selectedSourceId);

      let parts: any[] = [];
      
      if (generationMode === 'text') {
        parts.push({ text: inputText });
      } else if (selectedSource) {
        parts.push({
          inlineData: {
            data: selectedSource.data,
            mimeType: selectedSource.mimeType
          }
        });
        parts.push({ text: "Utilise le document ci-joint pour la génération." });
      }

      const promptText = `Génère une application d'apprentissage complète basée sur le contenu fourni.
      
      Structure de l'examen souhaitée: ${examType === 'Projet' ? '2 EXERCICES PROJETS (techniques/développement)' : 'SITUATION PROBLÈME (analytique)'}.
      
      Retourne UNIQUEMENT un JSON respectant exactement cette interface:
      {
        "id": "string",
        "disciplineId": "${disciplineId}",
        "title": "string (titre court du cours)",
        "summary": [{"title": "string", "content": "string"}], // 5-8 sections
        "qcm": [{"id": number, "text": "string", "options": ["string", "string", "string"], "correctAnswer": number, "explanation": "string"}], // 30 questions
        "courseQuestions": [{"id": number, "text": "string", "correctAnswer": "string"}], // 15 questions
        "examType": "${examType}",
        "situationProbleme": ${examType === 'Standard' ? '{ "scenario": "string", "questions": ["string"], "answers": ["string"] } // 14 questions' : 'null'},
        "projectExercises": ${examType === 'Projet' ? '[{ "title": "string", "description": "string", "expectedWork": "string" }, { "title": "string", "description": "string", "expectedWork": "string" }]' : 'null'}
      }
      
      Si c'est un cours technique, les exercices projets doivent être concrets.`;

      parts.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
        config: {
          responseMimeType: "application/json",
          temperature: 0.7
        },
      });

      const json = JSON.parse(response.text);
      json.id = `course-${Date.now()}`;
      onDataGenerated(json);
    } catch (err: any) {
      console.error(err);
      setError("Erreur de génération. Assurez-vous que le contenu est lisible et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-700">
      <header className="text-center space-y-4">
        <h2 className="text-5xl font-black text-slate-900 tracking-tight">Générer un Cours</h2>
        <p className="text-slate-500 font-medium">Choisissez une source pour créer votre environnement d'étude.</p>
      </header>

      <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-100 shadow-2xl space-y-8">
        {/* Toggle Mode */}
        <div className="flex p-1 bg-slate-100 rounded-3xl mb-4">
           <button 
             onClick={() => setGenerationMode('text')}
             className={`flex-1 py-3 rounded-2xl font-black text-xs transition-all ${generationMode === 'text' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}
           >
             Saisir du Texte
           </button>
           <button 
             disabled={availableSources.length === 0}
             onClick={() => setGenerationMode('file')}
             className={`flex-1 py-3 rounded-2xl font-black text-xs transition-all ${generationMode === 'file' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'} ${availableSources.length === 0 ? 'opacity-30' : ''}`}
           >
             Utiliser un Fichier ({availableSources.length})
           </button>
        </div>

        {/* Toggle Exam Type */}
        <div className="flex p-1 bg-slate-50 rounded-2xl">
           <button 
             onClick={() => setExamType('Standard')}
             className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${examType === 'Standard' ? 'bg-white text-indigo-600 shadow-sm border border-indigo-50' : 'text-slate-400'}`}
           >
             Exam Standard
           </button>
           <button 
             onClick={() => setExamType('Projet')}
             className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${examType === 'Projet' ? 'bg-white text-indigo-600 shadow-sm border border-indigo-50' : 'text-slate-400'}`}
           >
             Exam Projet
           </button>
        </div>

        {generationMode === 'text' ? (
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Coller le cours</label>
            <textarea
              className="w-full h-80 p-8 bg-slate-50 border-2 border-transparent rounded-[2rem] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-300 resize-none font-medium leading-relaxed"
              placeholder="Collez ici le contenu de votre cours..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Sélectionner un fichier importé</label>
            <div className="grid grid-cols-1 gap-3">
              {availableSources.map(source => (
                <button
                  key={source.id}
                  onClick={() => setSelectedSourceId(source.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    selectedSourceId === source.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-100 bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📄</span>
                    <div className="text-left">
                      <p className="font-bold text-slate-800 text-sm truncate max-w-[200px]">{source.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black">{(source.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  {selectedSourceId === source.id && <span className="text-blue-500 font-bold">✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <div className="p-4 bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-red-100 animate-pulse">⚠️ {error}</div>}

        <button
          onClick={generateContent}
          disabled={loading || (generationMode === 'text' && !inputText.trim()) || (generationMode === 'file' && !selectedSourceId)}
          className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all shadow-2xl flex items-center justify-center space-x-3 ${
            loading || (generationMode === 'text' && !inputText.trim()) || (generationMode === 'file' && !selectedSourceId) 
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:scale-[1.02] active:scale-95 shadow-blue-500/30'
          }`}
        >
          {loading ? (
            <div className="flex items-center space-x-3">
               <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
               <span>Brainstorming IA...</span>
            </div>
          ) : (
            <>
              <span>⚡</span>
              <span>Générer le contenu</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
