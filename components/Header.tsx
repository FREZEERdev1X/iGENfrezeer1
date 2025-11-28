import React from 'react';
import { Menu, Globe, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentView: string;
  setView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, currentView, setView }) => {
  const t = (key: string) => TRANSLATIONS[key][language];
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'create', label: t('nav_create') },
    { id: 'gallery', label: t('nav_gallery') },
    { id: 'dashboard', label: t('nav_dashboard') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            FREZEER i GEN
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                currentView === item.id ? 'text-cyan-400' : 'text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{language}</span>
          </button>
          
          <button 
            className="md:hidden p-2 text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950 px-4 py-4 space-y-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg ${
                currentView === item.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
