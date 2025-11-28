export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface Translation {
  [key: string]: {
    en: string;
    ar: string;
  };
}

export type ImageStyle = 
  | 'realistic' 
  | 'anime' 
  | 'cyberpunk' 
  | 'oil_painting' 
  | '3d_render' 
  | 'pixel_art' 
  | 'watercolor' 
  | 'sketch';

export interface GeneratedImage {
  id: string;
  prompt: string;
  style: ImageStyle;
  imageUrl: string;
  createdAt: number;
  model: string;
}

export interface GenerationConfig {
  prompt: string;
  style: ImageStyle;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  isHighQuality: boolean; // Triggers Pro model
}
