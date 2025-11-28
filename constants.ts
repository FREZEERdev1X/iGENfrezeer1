import { ImageStyle, Translation } from './types';

export const APP_NAME = "FREZEER i GEN";

export const STYLES: { id: ImageStyle; label: Translation[string]; icon: string }[] = [
  { id: 'realistic', label: { en: 'Realistic', ar: 'واقعي' }, icon: '📷' },
  { id: 'anime', label: { en: 'Anime', ar: 'أنمي' }, icon: '🎌' },
  { id: 'cyberpunk', label: { en: 'Cyberpunk', ar: 'سايبر بانك' }, icon: '🏙️' },
  { id: '3d_render', label: { en: '3D Render', ar: 'تصيير ثلاثي الأبعاد' }, icon: '🧊' },
  { id: 'oil_painting', label: { en: 'Oil Painting', ar: 'لوحة زيتية' }, icon: '🎨' },
  { id: 'pixel_art', label: { en: 'Pixel Art', ar: 'بكسل آرت' }, icon: '👾' },
  { id: 'watercolor', label: { en: 'Watercolor', ar: 'ألوان مائية' }, icon: '💧' },
  { id: 'sketch', label: { en: 'Sketch', ar: 'رسم تخطيطي' }, icon: '✏️' },
];

export const TRANSLATIONS: Translation = {
  nav_home: { en: 'Home', ar: 'الرئيسية' },
  nav_create: { en: 'Create', ar: 'إنشاء' },
  nav_gallery: { en: 'Gallery', ar: 'المعرض' },
  nav_dashboard: { en: 'Dashboard', ar: 'لوحة التحكم' },
  
  hero_title: { en: 'Unleash Your Imagination', ar: 'أطلق العنان لخيالك' },
  hero_subtitle: { en: 'Create stunning visuals with next-gen AI. Fast, artistic, and limitless.', ar: 'أنشئ صورًا مذهلة باستخدام الجيل القادم من الذكاء الاصطناعي. سريع، فني، وبلا حدود.' },
  hero_cta: { en: 'Start Creating', ar: 'ابدأ الإنشاء' },

  gen_title: { en: 'AI Image Generator', ar: 'مولد الصور بالذكاء الاصطناعي' },
  gen_prompt_label: { en: 'Describe your image', ar: 'وصف الصورة' },
  gen_prompt_placeholder: { en: 'A futuristic city with flying cars, neon lights...', ar: 'مدينة مستقبلية مع سيارات طائرة وأضواء نيون...' },
  gen_style_label: { en: 'Artistic Style', ar: 'النمط الفني' },
  gen_aspect_label: { en: 'Aspect Ratio', ar: 'نسبة الأبعاد' },
  gen_hq_label: { en: 'High Quality (Pro)', ar: 'جودة عالية (برو)' },
  gen_hq_desc: { en: 'Requires personal API key', ar: 'يتطلب مفتاح API شخصي' },
  gen_btn: { en: 'Generate', ar: 'توليد' },
  gen_loading: { en: 'Dreaming...', ar: 'جاري التخيل...' },
  
  gallery_title: { en: 'Community Showcase', ar: 'معرض المجتمع' },
  dashboard_title: { en: 'Your Creations', ar: 'إبداعاتك' },
  dashboard_empty: { en: 'No images generated yet.', ar: 'لم يتم إنشاء أي صور بعد.' },
  
  download: { en: 'Download', ar: 'تنزيل' },
  delete: { en: 'Delete', ar: 'حذف' },
  
  error_apikey: { en: 'Please select an API Key first.', ar: 'يرجى اختيار مفتاح API أولاً.' },
  error_gen: { en: 'Generation failed. Please try again.', ar: 'فشل التوليد. حاول مرة أخرى.' },
};
