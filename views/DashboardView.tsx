
import React, { useState, useRef } from 'react';
import { Discipline, SourceDocument } from '../types';

interface DashboardViewProps {
  disciplines: Discipline[];
  addDiscipline: (name: string, icon: string) => void;
  addSourceToDiscipline: (discId: string, source: SourceDocument) => void;
  onSelectCourse: (id: string) => void;
  onAddDocument: (discId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ disciplines, addDiscipline, addSourceToDiscipline, onSelectCourse, onAddDocument }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newDiscName, setNewDiscName] = useState('');
  const [newDiscIcon, setNewDiscIcon] = useState('📚');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);

  const icons = ['📚', '⚖️', '🎮', '🧪', '🎨', '💻', '📈', '🌍', '📐', '🎸'];

  const handleAdd = () => {
    if (!newDiscName.trim()) return;
    addDiscipline(newDiscName, newDiscIcon);
    setNewDiscName('');
    setIsAdding(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingFor) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const base64Content = base64.split(',')[1];
      
      const source: SourceDocument = {
        id: `source-${Date.now()}`,
        name: file.name,
        mimeType: file.type || 'application/pdf',
        data: base64Content,
        size: file.size
      };
      
      addSourceToDiscipline(uploadingFor, source);
      setUploadingFor(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = (discId: string) => {
    setUploadingFor(discId);
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-10">
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept=".pdf,.txt,.docx" 
      />
      
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Vos Disciplines</h2>
          <p className="text-slate-600 mt-2">Gérez vos domaines d'études et vos supports de cours.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          + Nouvelle Discipline
        </button>
      </header>

      {isAdding && (
        <div className="bg-white p-8 rounded-3xl border-2 border-blue-100 shadow-xl animate-in zoom-in-95">
          <h3 className="text-xl font-bold mb-6">Ajouter une discipline</h3>
          <div className="space-y-6">
            <input 
              type="text" 
              placeholder="Nom de la discipline (ex: Mathématiques)"
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
              value={newDiscName}
              onChange={(e) => setNewDiscName(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {icons.map(icon => (
                <button 
                  key={icon}
                  onClick={() => setNewDiscIcon(icon)}
                  className={`text-2xl p-3 rounded-xl transition-all ${newDiscIcon === icon ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 hover:bg-slate-100'}`}
                >
                  {icon}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <button onClick={handleAdd} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold">Créer</button>
              <button onClick={() => setIsAdding(false)} className="px-6 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold">Annuler</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {disciplines.map(disc => (
          <div key={disc.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full group hover:shadow-md transition-shadow">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{disc.icon}</span>
                <h3 className="text-xl font-bold text-slate-900">{disc.name}</h3>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => triggerUpload(disc.id)}
                  title="Importer un document depuis l'appareil"
                  className="bg-white p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  📥
                </button>
                <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-200 flex items-center">
                  {disc.documents.length} Cours
                </span>
              </div>
            </div>
            
            <div className="p-6 flex-1 space-y-4">
              {disc.sources.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fichiers Importés</h4>
                  <div className="flex flex-wrap gap-2">
                    {disc.sources.map(src => (
                      <div key={src.id} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 flex items-center space-x-2">
                        <span>📄</span>
                        <span className="max-w-[120px] truncate">{src.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contenus d'Études</h4>
                {disc.documents.length === 0 ? (
                  <div className="py-6 text-center">
                    <p className="text-slate-400 italic text-sm">Aucun contenu généré.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {disc.documents.map(doc => (
                      <button
                        key={doc.id}
                        onClick={() => onSelectCourse(doc.id)}
                        className="w-full text-left p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-center justify-between group/item"
                      >
                        <span className="font-bold text-slate-700 truncate">{doc.title}</span>
                        <span className="opacity-0 group-hover/item:opacity-100 text-blue-500 font-bold text-xs uppercase tracking-widest ml-4 transition-opacity">Étudier →</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 pt-0 mt-auto">
              <button 
                onClick={() => onAddDocument(disc.id)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-slate-900/10"
              >
                <span>⚡</span>
                <span>Générer un nouveau contenu</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
