import React from 'react';
import { ArrowRight, Wand2 } from 'lucide-react';
import { Button } from './UIComponents';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  language: Language;
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ language, onCtaClick }) => {
  const t = (key: string) => TRANSLATIONS[key][language];
  const isRtl = language === 'ar';

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="container relative mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className={`space-y-8 ${isRtl ? 'lg:order-2' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300">Gemini 2.5 & 3.0 Powered</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            <span className="block">{t('hero_title').split(' ')[0]}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {t('hero_title').split(' ').slice(1).join(' ')}
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            {t('hero_subtitle')}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button onClick={onCtaClick} className="text-lg px-8 py-4">
              <Wand2 className="w-5 h-5" />
              {t('hero_cta')}
            </Button>
            <Button variant="outline" className="text-lg px-8 py-4" onClick={() => {
                const gallery = document.getElementById('gallery-section');
                gallery?.scrollIntoView({ behavior: 'smooth' });
            }}>
              {t('nav_gallery')}
            </Button>
          </div>
        </div>

        {/* Visual Showcase */}
        <div className={`relative ${isRtl ? 'lg:order-1' : ''}`}>
           <div className="relative z-10 grid grid-cols-2 gap-4 animate-float">
             <div className="space-y-4 mt-8">
               <img src="https://picsum.photos/seed/cyber/400/500" alt="AI Art 1" className="rounded-2xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-500" />
               <img src="https://picsum.photos/seed/anime/400/300" alt="AI Art 2" className="rounded-2xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-500" />
             </div>
             <div className="space-y-4">
               <img src="https://picsum.photos/seed/abstract/400/300" alt="AI Art 3" className="rounded-2xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-500" />
               <img src="https://picsum.photos/seed/render/400/500" alt="AI Art 4" className="rounded-2xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-500" />
             </div>
           </div>
           
           {/* Decorative elements */}
           <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-[3rem] blur-3xl -z-10 transform scale-110" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
