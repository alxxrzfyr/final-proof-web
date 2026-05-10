import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ScamInfoSection } from './components/ScamInfoSection';
import { TryMeSection } from './components/TryMeSection';
import { Footer } from './components/Footer';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { TermsOfUseSection } from './components/TermsOfUseSection';
import type { Lang } from './components/data';

type Section = 'home' | 'about-scam' | 'about-us' | 'try-me' | 'terms';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [lang, setLang] = useState<Lang>('en');

  const isTryMe = activeSection === 'try-me';

  // Accepts string so child components don't need `as any` casts
  const navigate = (section: string) => {
    setActiveSection(section as Section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`flex flex-col bg-[#f4f1ea] text-[#1a1816] ${
        isTryMe ? 'min-h-screen' : 'min-h-screen'
      }`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Header lang={lang} onNavigate={navigate} />

      <main className="relative flex w-full flex-1 flex-col">
        {activeSection === 'home' && (
          <div className="animate-fadeIn">
            <HeroSection lang={lang} onNavigate={navigate} />
          </div>
        )}

        {activeSection === 'about-us' && (
          <div className="animate-fadeIn">
            <AboutSection lang={lang} />
          </div>
        )}

        {activeSection === 'about-scam' && (
          <div className="animate-fadeIn">
            <ScamInfoSection lang={lang} onNavigate={navigate} />
          </div>
        )}

        {activeSection === 'try-me' && (
          <div className="animate-fadeIn flex flex-1 flex-col">
            <TryMeSection lang={lang} onNavigate={navigate} />
          </div>
        )}

        {activeSection === 'terms' && (
          <div className="animate-fadeIn">
            <TermsOfUseSection lang={lang} onNavigate={navigate} />
          </div>
        )}
      </main>

      <Footer
        lang={lang}
        onNavigate={navigate}
        onOpenTerms={() => navigate('terms')}
      />

      <AccessibilityWidget lang={lang} setLang={setLang} />
    </div>
  );
}