import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Card } from './UIComponents';

interface GalleryProps {
  language: Language;
}

const Gallery: React.FC<GalleryProps> = ({ language }) => {
  const t = (key: string) => TRANSLATIONS[key][language];

  // Mock data for display
  const images = [
    { id: 1, url: 'https://picsum.photos/seed/future/600/600', prompt: 'Neon futuristic city', user: 'CyberArtist' },
    { id: 2, url: 'https://picsum.photos/seed/nature/600/800', prompt: 'Ethereal forest with glowing mushrooms', user: 'NatureLover' },
    { id: 3, url: 'https://picsum.photos/seed/robot/600/600', prompt: 'Portrait of a sentient android', user: 'TechGen' },
    { id: 4, url: 'https://picsum.photos/seed/space/800/600', prompt: 'Nebula explosion in deep space', user: 'StarGazer' },
    { id: 5, url: 'https://picsum.photos/seed/fantasy/600/600', prompt: 'Dragon flying over a castle', user: 'DragonBorn' },
    { id: 6, url: 'https://picsum.photos/seed/arch/600/800', prompt: 'Parametric architecture skyscraper', user: 'ArchiBot' },
  ];

  return (
    <div className="container mx-auto px-4 py-12" id="gallery-section">
      <div className="text-center mb-12 space-y-2">
        <h2 className="text-3xl font-bold text-white">{t('gallery_title')}</h2>
        <p className="text-slate-400">Explore what others are creating with FREZEER i GEN</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img) => (
          <div key={img.id} className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-slate-800">
            <img 
              src={img.url} 
              alt={img.prompt} 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <p className="text-white font-medium line-clamp-2 mb-1">"{img.prompt}"</p>
              <p className="text-xs text-cyan-400">@{img.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
