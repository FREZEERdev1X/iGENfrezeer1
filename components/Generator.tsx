import React, { useState } from 'react';
import { Download, Sparkles, AlertCircle, Maximize2 } from 'lucide-react';
import { Language, ImageStyle, GeneratedImage } from '../types';
import { TRANSLATIONS, STYLES } from '../constants';
import { Button, Card } from './UIComponents';
import { generateImageWithGemini } from '../services/geminiService';

interface GeneratorProps {
  language: Language;
  addToHistory: (img: GeneratedImage) => void;
}

const Generator: React.FC<GeneratorProps> = ({ language, addToHistory }) => {
  const t = (key: string) => TRANSLATIONS[key][language];
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<ImageStyle>('realistic');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');
  const [isHighQuality, setIsHighQuality] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const imageUrl = await generateImageWithGemini({
        prompt,
        style,
        aspectRatio,
        isHighQuality
      });
      
      setResult(imageUrl);
      
      // Save to history
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt,
        style,
        imageUrl,
        createdAt: Date.now(),
        model: isHighQuality ? 'Gemini 3.0 Pro' : 'Gemini 2.5 Flash'
      };
      addToHistory(newImage);

    } catch (err: any) {
      setError(err.message || t('error_gen'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid lg:grid-cols-5 gap-8 h-full">
        {/* Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              {t('gen_title')}
            </h2>
            <p className="text-slate-400 text-sm">Configure your dream visualization.</p>
          </div>

          <Card className="space-y-6">
            {/* Prompt */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t('gen_prompt_label')}</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t('gen_prompt_placeholder')}
                className="w-full h-32 bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
              />
            </div>

            {/* Style Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">{t('gen_style_label')}</label>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-all ${
                      style === s.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-white'
                        : 'bg-slate-950/30 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label[language]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">{t('gen_aspect_label')}</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as any)}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-lg p-2.5 text-white focus:border-cyan-500 outline-none"
                >
                  <option value="1:1">Square (1:1)</option>
                  <option value="16:9">Landscape (16:9)</option>
                  <option value="9:16">Portrait (9:16)</option>
                </select>
              </div>
              
               <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-300 flex items-center gap-1">
                   {t('gen_hq_label')}
                 </label>
                 <div 
                  onClick={() => setIsHighQuality(!isHighQuality)}
                  className={`cursor-pointer w-full p-2.5 rounded-lg border flex items-center justify-between transition-all ${
                    isHighQuality 
                    ? 'bg-purple-500/20 border-purple-500 text-white' 
                    : 'bg-slate-950/50 border-slate-700 text-slate-400'
                  }`}
                 >
                   <span className="text-xs">{isHighQuality ? 'Enabled' : 'Disabled'}</span>
                   <div className={`w-3 h-3 rounded-full ${isHighQuality ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-slate-600'}`} />
                 </div>
               </div>
            </div>
            
            {isHighQuality && (
               <p className="text-xs text-purple-300 bg-purple-900/20 p-2 rounded border border-purple-500/30">
                 {t('gen_hq_desc')}
               </p>
            )}

            <Button 
              className="w-full text-lg py-4" 
              onClick={handleGenerate}
              isLoading={isGenerating}
              disabled={!prompt}
            >
              {isGenerating ? t('gen_loading') : t('gen_btn')}
            </Button>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </Card>
        </div>

        {/* Output Canvas */}
        <div className="lg:col-span-3 flex items-center justify-center">
          <div className={`relative w-full aspect-square md:aspect-[4/3] rounded-2xl border-2 border-dashed ${result ? 'border-transparent' : 'border-slate-700'} bg-slate-900/50 flex items-center justify-center overflow-hidden transition-all duration-500`}>
            {result ? (
              <>
                 <img 
                   src={result} 
                   alt="Generated result" 
                   className="w-full h-full object-contain animate-in fade-in zoom-in duration-700"
                 />
                 <div className="absolute bottom-4 right-4 flex gap-2">
                    <button 
                      onClick={() => window.open(result, '_blank')}
                      className="p-3 rounded-full bg-slate-900/80 backdrop-blur text-white hover:bg-slate-800 transition-colors"
                      title="Full Screen"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <a 
                      href={result} 
                      download={`frezeer-gen-${Date.now()}.png`}
                      className="p-3 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/30"
                      title={t('download')}
                    >
                      <Download className="w-5 h-5" />
                    </a>
                 </div>
              </>
            ) : (
              <div className="text-center space-y-4 text-slate-500">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 rounded-full border-4 border-cyan-500/30"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 animate-spin"></div>
                      <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-cyan-400 animate-pulse" />
                    </div>
                    <p className="animate-pulse">{t('gen_loading')}</p>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-16 h-16 mx-auto opacity-20" />
                    <p>Your masterpiece will appear here</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
