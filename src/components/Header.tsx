import { useState } from 'react';
import { translations, type Lang } from './data';

type Section = 'home' | 'about-scam' | 'about-us' | 'try-me';

interface Props {
  lang: Lang;
  onNavigate: (section: Section) => void;
}

/**
 * Main application header component with global navigation.
 * Enhanced with floating Apple-esque glassmorphism while preserving
 * 100% of the original brand logo, color palette, and design elements.
 *
 * @param lang - The current active language locale.
 * @param onNavigate - Callback triggered when a navigation link is selected.
 */
export function Header({ lang, onNavigate }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  const nav = (section: Section) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-3 z-50 mx-auto w-full max-w-7xl px-3 sm:px-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      {/* Floating glassmorphism pill with layered edge refraction */}
      <div
        className="relative mx-auto flex w-full items-center justify-between rounded-full p-2 sm:px-6 sm:py-2.5 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: 'rgba(244, 241, 234, 0.72)',
          border: '1px solid rgba(214, 207, 198, 0.6)',
          boxShadow: [
            'inset 0 1px 0 rgba(255,255,255,0.55)',
            'inset 0 -1px 0 rgba(0,0,0,0.03)',
            '0 1px 2px rgba(0,0,0,0.04)',
            '0 4px 12px -2px rgba(0,0,0,0.08)',
            '0 12px 36px -8px rgba(26,24,22,0.12)',
          ].join(', '),
        }}
      >
        
        {/* Left: Mobile toggle + Desktop nav */}
        <div className="relative z-20 flex flex-1 items-center justify-start">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="-ml-1 flex cursor-pointer items-center justify-start rounded-full p-2 text-[#0a2fad] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0a2fad]/8 active:scale-[0.94] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-3xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>

          <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            <button
              onClick={() => nav('home')}
              className="nav-link font-sleek cursor-pointer rounded-full px-4 py-2 text-[15px] text-[#1a1816]/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0a2fad]/6 hover:text-[#0a2fad] active:scale-[0.97] uppercase tracking-wide"
              style={{ fontWeight: 700 }}
            >
              {t('nav.home')}
            </button>

            <div className="mx-1 h-4 w-px bg-[#1a1816]/15" />

            <button
              onClick={() => nav('about-scam')}
              className="nav-link font-sleek cursor-pointer rounded-full px-4 py-2 text-[15px] text-[#1a1816]/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0a2fad]/6 hover:text-[#0a2fad] active:scale-[0.97] uppercase tracking-wide"
              style={{ fontWeight: 700 }}
            >
              {t('nav.scam_info')}
            </button>

            <div className="mx-1 h-4 w-px bg-[#1a1816]/15" />

            <button
              onClick={() => nav('about-us')}
              className="nav-link font-sleek cursor-pointer rounded-full px-4 py-2 text-[15px] text-[#1a1816]/80 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0a2fad]/6 hover:text-[#0a2fad] active:scale-[0.97] uppercase tracking-wide"
              style={{ fontWeight: 700 }}
            >
              {t('nav.about_us')}
            </button>
          </nav>
        </div>

        {/* Center: Brand Logo (preserved exactly) */}
        <div className="relative z-20 flex flex-shrink-0 items-center justify-center px-1 sm:px-2">
          <button onClick={() => nav('home')} className="group flex cursor-pointer items-center active:scale-[0.97] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <h2
              className="font-sleek rounded-sm border-2 border-[#0a2fad] bg-[#f4f1ea] px-2.5 py-0.5 text-lg sm:text-xl md:text-2xl leading-tight text-[#0a2fad] uppercase shadow-[3px_3px_0_0_#0725b0] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:shadow-[4px_4px_0_0_#0725b0]"
              style={{ fontWeight: 700 }}
            >
              P.R.O.O.F
            </h2>
          </button>
        </div>

        {/* Right: "TRY ME" button (preserved exactly) */}
        <div className="relative z-20 flex flex-1 items-center justify-end">
          <button
            onClick={() => nav('try-me')}
            className="group font-sleek inline-flex cursor-pointer items-center gap-1 rounded-full border-2 border-[#1a1816] bg-yellow-400 px-3 py-1.5 text-[12px] text-[#1a1816] shadow-[2px_2px_0_0_#1a1816] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#1a1816] active:translate-y-0 active:shadow-[1px_1px_0_0_#1a1816] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[15px] sm:shadow-[4px_4px_0_0_#1a1816] sm:hover:shadow-[6px_6px_0_0_#1a1816] sm:active:shadow-[2px_2px_0_0_#1a1816] xl:px-6"
            style={{ fontWeight: 700 }}
          >
            <span>{t('nav.try_me')}</span>
            <span className="material-symbols-outlined text-base transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 sm:text-lg">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      <div id="header-breadcrumbs-portal-target" />

      {/* Mobile glass dropdown with spring-timed entry */}
      <div
        className={`absolute left-3 right-3 top-[68px] z-10 overflow-hidden rounded-2xl backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${
          mobileOpen
            ? 'pointer-events-auto max-h-[500px] translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-3 opacity-0'
        }`}
        style={{
          background: 'rgba(244, 241, 234, 0.88)',
          border: '1px solid rgba(214, 207, 198, 0.7)',
          boxShadow: [
            'inset 0 1px 0 rgba(255,255,255,0.5)',
            '0 4px 16px -4px rgba(0,0,0,0.10)',
            '0 16px 48px -12px rgba(26,24,22,0.16)',
          ].join(', '),
        }}
      >
        <div className="flex w-full flex-col p-5">
          <button
            onClick={() => nav('home')}
            className="font-sleek flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 text-left text-lg text-[#1a1816] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0a2fad]/6 hover:text-[#0a2fad] active:scale-[0.98]"
            style={{ fontWeight: 700 }}
          >
            <span className="material-symbols-outlined text-xl">home</span>
            {t('nav.home')}
          </button>
          <div className="mx-4 my-0.5 h-px bg-[#1a1816]/8" />
          <button
            onClick={() => nav('about-scam')}
            className="font-sleek flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 text-left text-lg text-[#1a1816] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0a2fad]/6 hover:text-[#0a2fad] active:scale-[0.98]"
            style={{ fontWeight: 700 }}
          >
            <span className="material-symbols-outlined text-xl">info</span>
            {t('nav.scam_info')}
          </button>
          <div className="mx-4 my-0.5 h-px bg-[#1a1816]/8" />
          <button
            onClick={() => nav('about-us')}
            className="font-sleek flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3.5 text-left text-lg text-[#1a1816] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#0a2fad]/6 hover:text-[#0a2fad] active:scale-[0.98]"
            style={{ fontWeight: 700 }}
          >
            <span className="material-symbols-outlined text-xl">groups</span>
            {t('nav.about_us')}
          </button>
        </div>
      </div>
    </header>
  );
}