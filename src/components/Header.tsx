import { useState } from 'react';
import { translations, type Lang } from './data';

type Section = 'home' | 'about-scam' | 'about-us' | 'try-me';

interface Props {
  lang: Lang;
  onNavigate: (section: Section) => void;
}

/**
 * Main application header component with global navigation.
 * Handles responsive routing, navigation paths, and promotional actions.
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
    <header className="sticky top-0 z-50 w-full flex-col border-b border-[#e5ded4] bg-[#f4f1ea]/95 backdrop-blur-sm shadow-sm transition-all">
      <div className="mx-auto flex w-full lg:border-b-0 border-transparent px-3 py-2 sm:px-6 sm:py-3 xl:px-24">
        <div className="mx-auto flex w-full min-h-[32px] max-w-7xl items-center justify-between sm:min-h-[44px] xl:min-h-[48px]">
          <div className="relative z-20 flex flex-1 items-center justify-start">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="-ml-2 flex cursor-pointer items-center justify-start rounded-sm p-2 text-[#0a2fad] transition-colors hover:bg-black/5 lg:hidden"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
            <button
              onClick={() => nav('home')}
              className="nav-link font-sleek cursor-pointer rounded-md px-4 py-2 text-[15px] text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
              style={{ fontWeight: 700 }}
            >
              {t('nav.home')}
            </button>

            {/* Simplified Scam Info Button */}
            <button
              onClick={() => nav('about-scam')}
              className="nav-link font-sleek cursor-pointer rounded-md px-4 py-2 text-[15px] text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
              style={{ fontWeight: 700 }}
            >
              {t('nav.scam_info')}
            </button>

            <button
              onClick={() => nav('about-us')}
              className="nav-link font-sleek cursor-pointer rounded-md px-4 py-2 text-[15px] text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
              style={{ fontWeight: 700 }}
            >
              {t('nav.about_us')}
            </button>
          </nav>
        </div>

        <div className="relative z-20 flex flex-shrink-0 items-center justify-center px-1 sm:px-2">
          <button onClick={() => nav('home')} className="group flex cursor-pointer items-center">
            <h2
              className="font-sleek rounded-[2px] border-2 border-[#0a2fad] bg-[#f4f1ea] px-1.5 py-0.5 text-base sm:text-lg md:text-2xl leading-tight text-[#0a2fad] uppercase shadow-[2px_2px_0_0_#0725b0] transition-all duration-300 group-hover:border-[#4a3224] group-hover:text-[#4a3224] group-hover:shadow-[4px_4px_0_0_#6b4a3a] hover:-translate-y-0.5 sm:shadow-[4px_4px_0_0_#0725b0]"
              style={{ fontWeight: 700 }}
            >
              P.R.O.O.F
            </h2>
          </button>
        </div>

        <div className="relative z-20 flex flex-1 items-center justify-end">
          <button
            onClick={() => nav('try-me')}
            className="group font-sleek inline-flex cursor-pointer items-center gap-1 rounded-full border-2 border-[#1a1816] bg-yellow-400 px-3 py-1.5 text-[12px] text-[#1a1816] shadow-[2px_2px_0_0_#1a1816] transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#1a1816] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[15px] sm:shadow-[4px_4px_0_0_#1a1816] sm:hover:shadow-[6px_6px_0_0_#1a1816] xl:px-6"
            style={{ fontWeight: 700 }}
          >
            <span>{t('nav.try_me')}</span>
            <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1 sm:text-lg">
              smart_toy
            </span>
          </button>
        </div>
      </div>
      </div>

      <div id="header-breadcrumbs-portal-target" />

      <div
        className={`absolute left-0 z-10 w-full flex-col overflow-hidden border-b-2 border-[#e5ded4] bg-[#f4f1ea] shadow-xl transition-all duration-300 ease-out lg:hidden ${
          mobileOpen
            ? 'pointer-events-auto max-h-[500px] translate-y-0 opacity-100'
            : 'pointer-events-none max-h-0 -translate-y-2 opacity-0'
        }`}
      >
        <div className="flex w-full flex-col p-6">
          <button
            onClick={() => nav('home')}
            className="font-sleek cursor-pointer rounded-md px-4 py-4 text-left text-2xl text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
            style={{ fontWeight: 700 }}
          >
            {t('nav.home')}
          </button>
          <div className="mx-4 my-1 h-[2px] bg-black/10" />
          <button
            onClick={() => nav('about-scam')}
            className="font-sleek cursor-pointer rounded-md px-4 py-4 text-left text-2xl text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
            style={{ fontWeight: 700 }}
          >
            {t('nav.scam_info')}
          </button>
          <div className="mx-4 my-1 h-[2px] bg-[#1a1816]/10" />
          <button
            onClick={() => nav('about-us')}
            className="font-sleek cursor-pointer rounded-md px-4 py-4 text-left text-2xl text-[#1a1816] transition-all hover:bg-black/5 hover:text-[#0a2fad]"
            style={{ fontWeight: 700 }}
          >
            {t('nav.about_us')}
          </button>
        </div>
      </div>
    </header>
  );
}