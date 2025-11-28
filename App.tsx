import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Generator from './components/Generator';
import Gallery from './components/Gallery';
import Dashboard from './components/Dashboard';
import { Language, GeneratedImage } from './types';
import { APP_NAME } from './constants';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState('home');
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`${APP_NAME}_history`);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Update document direction and title
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.title = APP_NAME;
  }, [language]);

  const addToHistory = (img: GeneratedImage) => {
    const newHistory = [img, ...history];
    setHistory(newHistory);
    localStorage.setItem(`${APP_NAME}_history`, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(`${APP_NAME}_history`);
  };

  const deleteImage = (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem(`${APP_NAME}_history`, JSON.stringify(newHistory));
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero language={language} onCtaClick={() => setCurrentView('create')} />
            <Gallery language={language} />
          </>
        );
      case 'create':
        return <Generator language={language} addToHistory={addToHistory} />;
      case 'gallery':
        return <Gallery language={language} />;
      case 'dashboard':
        return (
          <Dashboard 
            language={language} 
            history={history} 
            onClearHistory={clearHistory}
            onDeleteImage={deleteImage}
          />
        );
      default:
        return <Hero language={language} onCtaClick={() => setCurrentView('create')} />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 ${language === 'ar' ? 'font-cairo' : 'font-inter'}`}>
      <Header 
        language={language} 
        setLanguage={setLanguage}
        currentView={currentView}
        setView={setCurrentView}
      />
      <main className="animate-in fade-in duration-500">
        {renderView()}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 mt-auto py-8 bg-slate-950">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
