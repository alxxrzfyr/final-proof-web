import { useState } from 'react';

interface BrandLogoProps {
  brand: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const brandLogoSrc: Record<string, string> = {
  gcash: new URL('../assets/brand-logos/gcash-logo.jpg', import.meta.url).href,
  bdo: new URL('../assets/brand-logos/bdo-logo.jpg', import.meta.url).href,
  bpi: new URL('../assets/brand-logos/bpi-logo.jpg', import.meta.url).href,
  globe: new URL('../assets/brand-logos/globe-logo.png', import.meta.url).href,
  maya: new URL('../assets/brand-logos/maya-logo.png', import.meta.url).href,
  lbc: new URL('../assets/brand-logos/lbc-logo.png', import.meta.url).href,
  shopee: new URL('../assets/brand-logos/shopee-logo.png', import.meta.url).href,
  meralco: new URL('../assets/brand-logos/meralco-logo.png', import.meta.url).href,
  sss: new URL('../assets/brand-logos/sss-logo.png', import.meta.url).href,
  philhealth: new URL('../assets/brand-logos/philhealth-logo.png', import.meta.url).href,
  facebook: new URL('../assets/brand-logos/facebook-logo.jpg', import.meta.url).href,
  netflix: new URL('../assets/brand-logos/netflix-logo.png', import.meta.url).href,
  citibank: new URL('../assets/brand-logos/citi-logo.png', import.meta.url).href,
  citi: new URL('../assets/brand-logos/citi-logo.png', import.meta.url).href,
  meta: new URL('../assets/brand-logos/meta-logo.png', import.meta.url).href,
  tiktok: new URL('../assets/brand-logos/tiktok-logo.png', import.meta.url).href,
};

const brandFallbacks: Record<string, { bg: string; text: string; label: string }> = {
  gcash:      { bg: 'bg-[#007DFF]', text: 'text-white', label: 'G' },
  bdo:        { bg: 'bg-[#0033A0]', text: 'text-white', label: 'BDO' },
  bpi:        { bg: 'bg-[#E30613]', text: 'text-white', label: 'BPI' },
  globe:      { bg: 'bg-[#0061A8]', text: 'text-white', label: 'GLB' },
  smart:      { bg: 'bg-[#00A651]', text: 'text-white', label: 'SRT' },
  maya:       { bg: 'bg-[#00D632]', text: 'text-black', label: 'Maya' },
  lbc:        { bg: 'bg-[#E30613]', text: 'text-white', label: 'LBC' },
  shopee:     { bg: 'bg-[#EE4D2D]', text: 'text-white', label: 'SPE' },
  lazada:     { bg: 'bg-[#0F146D]', text: 'text-white', label: 'LZD' },
  metrobank:  { bg: 'bg-[#8B0000]', text: 'text-white', label: 'MTB' },
  facebook:   { bg: 'bg-[#1877F2]', text: 'text-white', label: 'fb' },
  netflix:    { bg: 'bg-[#E50914]', text: 'text-white', label: 'N' },
  citibank:   { bg: 'bg-[#004C97]', text: 'text-white', label: 'CITI' },
  landbank:   { bg: 'bg-[#006B3F]', text: 'text-white', label: 'LBP' },
  dito:       { bg: 'bg-[#FF6B00]', text: 'text-white', label: 'DITO' },
  tnt:        { bg: 'bg-[#FFD800]', text: 'text-black', label: 'TNT' },
  jt:         { bg: 'bg-[#E30613]', text: 'text-white', label: 'J&T' },
  bir:        { bg: 'bg-[#003DA5]', text: 'text-white', label: 'BIR' },
  meralco:    { bg: 'bg-[#FF6B00]', text: 'text-white', label: 'MRL' },
  sss:        { bg: 'bg-[#1B5E20]', text: 'text-white', label: 'SSS' },
  philhealth: { bg: 'bg-[#0066CC]', text: 'text-white', label: 'PhH' },
  nbi:        { bg: 'bg-[#1A1816]', text: 'text-white', label: 'NBI' },
  pnp:        { bg: 'bg-[#003399]', text: 'text-white', label: 'PNP' },
};

export function BrandLogo({ brand, size = 'md', className = '' }: BrandLogoProps) {
  const rawKey = brand.toLowerCase();
  const brandKey = Object.keys(brandLogoSrc)
    .sort((a, b) => b.length - a.length)
    .find((k) => rawKey.includes(k)) ?? rawKey;
  const [imgFailed, setImgFailed] = useState(false);

  const sizeMap = {
    sm: { box: 'h-8 w-8',   img: 32,  text: 'text-[9px]' },
    md: { box: 'h-12 w-12', img: 48,  text: 'text-xs'    },
    lg: { box: 'h-16 w-16', img: 64,  text: 'text-sm'    },
  };

  const fallback = brandFallbacks[brandKey] || brandFallbacks[rawKey] || {
    bg: 'bg-gray-600',
    text: 'text-white',
    label: brand.substring(0, 4).toUpperCase(),
  };
  const { box, text: textSize } = sizeMap[size];
  const currentSrc = brandLogoSrc[brandKey] ?? null;

  if (currentSrc && !imgFailed) {
    return (
      <div
        className={`${box} flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200 ${className}`}
      >
        <img
          key={brandKey}
          src={currentSrc}
          alt={brand}
          className="h-full w-full object-contain p-[15%]"
          onError={() => setImgFailed(true)}
        />
      </div>
    );
  }

  // Last resort — always-visible branded colored box
  return (
    <div
      className={`${box} ${fallback.bg} ${fallback.text} flex shrink-0 items-center justify-center rounded-lg shadow-sm ${className}`}
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <span className={`${textSize} font-black uppercase leading-none tracking-tight`}>{fallback.label}</span>
    </div>
  );
}