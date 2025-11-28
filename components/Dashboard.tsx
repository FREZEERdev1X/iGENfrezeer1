import React from 'react';
import { Trash2, Download, Calendar } from 'lucide-react';
import { Language, GeneratedImage } from '../types';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  language: Language;
  history: GeneratedImage[];
  onClearHistory: () => void;
  onDeleteImage: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ language, history, onClearHistory, onDeleteImage }) => {
  const t = (key: string) => TRANSLATIONS[key][language];

  if (history.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-slate-600" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{t('dashboard_title')}</h2>
        <p className="text-slate-400">{t('dashboard_empty')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-white">{t('dashboard_title')}</h2>
        <button 
          onClick={onClearHistory}
          className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {history.map((item) => (
          <div key={item.id} className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.prompt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onDeleteImage(item.id)}
                  className="p-2 bg-red-500/80 text-white rounded-lg backdrop-blur hover:bg-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <p className="text-sm text-slate-300 line-clamp-2" title={item.prompt}>{item.prompt}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">{item.style}</span>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
               <div className="pt-2 border-t border-slate-800">
                  <a 
                    href={item.imageUrl} 
                    download={`frezeer-${item.id}.png`}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    {t('download')}
                  </a>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
