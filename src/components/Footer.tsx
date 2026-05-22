import { useState, useEffect, useRef } from 'react';
import { translations, type Lang } from './data';
import { QRCodeSVG } from 'qrcode.react';

type Section = 'home' | 'about-scam' | 'about-us' | 'try-me';

interface Props {
  lang: Lang;
  onNavigate: (section: Section) => void;
  onOpenTerms: () => void;
}

/**
 * Displays the page footer with quick links, contact info, and legal references.
 * Includes a floating back-to-top button that appears when the footer enters the viewport.
 */
export function Footer({ lang, onNavigate, onOpenTerms }: Props) {
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  const footerRef = useRef<HTMLElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBackToTop(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleBackToTop = () => {
    setIsScrolling(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsScrolling(false), 800);
  };

  return (
    <>
      {/* ── Floating Back-to-Top Button ── */}
      <div
        style={{
          position: 'fixed',
          bottom: '5.25rem',
          right: '1.75rem',
          zIndex: 9999,
          transform: showBackToTop ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? 'auto' : 'none',
          transition: 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.4,0.64,1)',
        }}
      >
        <button
          onClick={handleBackToTop}
          aria-label="Back to top"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.25rem',
            height: '3.25rem',
            borderRadius: '50%',
            background: '#ffffff',
            border: 'none',
            /* Layered shadow: tight contact shadow + soft ambient lift */
            boxShadow: '0 1px 2px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.14), 0 12px 28px rgba(0,0,0,0.10)',
            cursor: 'pointer',
            transition: 'box-shadow 0.18s ease, transform 0.18s ease',
            outline: 'none',
          }}
          onMouseEnter={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.20), 0 8px 20px rgba(0,0,0,0.18), 0 20px 40px rgba(0,0,0,0.12)';
            btn.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={e => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.14), 0 12px 28px rgba(0,0,0,0.10)';
            btn.style.transform = 'translateY(0)';
          }}
          onMouseDown={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
          }}
          onMouseUp={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)';
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: '1.6rem',
              color: '#1a1816',
              fontVariationSettings: "'wght' 600",
              animation: isScrolling ? 'arrowFloat 0.45s ease-in-out infinite alternate' : 'none',
              userSelect: 'none',
            }}
          >
            arrow_upward
          </span>
        </button>
      </div>

      <style>{`
        @keyframes arrowFloat {
          from { transform: translateY(0); }
          to   { transform: translateY(-3px); }
        }
      `}</style>

      <footer
        ref={footerRef}
        className="border-t border-[#3d3530] bg-[#1a1816] px-5 py-10 sm:px-8 sm:py-12 md:px-12 lg:px-16"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
            <div className="md:col-span-2">
              <div className="inline-block">
                <h2
                  className="font-sleek rounded-sm border-2 border-[#0a2fad] bg-[#f4f1ea] px-2.5 py-0.5 text-xl leading-tight text-[#0a2fad] uppercase shadow-[3px_3px_0_0_#0725b0]"
                  style={{ fontWeight: 700 }}
                >
                  P.R.O.O.F
                </h2>
              </div>
              <p
                className="mt-4 max-w-xs text-xs leading-relaxed text-[#c7c3bf]"
                style={{ fontWeight: 500, textAlign: 'justify' }}
              >
                Every click is a choice. Make it a safe one. Learn to spot scams before they spot you.
              </p>
            </div>

            <div>
              <h4
                className="mb-3 text-sm tracking-wider text-yellow-400 uppercase"
                style={{ fontWeight: 900 }}
              >
                {t('footer.quick_links')}
              </h4>
              <div className="flex flex-col items-start space-y-0">
                {[
                  {
                    label: lang === 'fil' ? 'Home ng Platform' : 'Home Page',
                    section: 'home' as Section,
                  },
                  {
                    label: lang === 'fil' ? 'Tungkol Sa Amin' : 'About Us',
                    section: 'about-us' as Section,
                  },
                  {
                    label: lang === 'fil' ? 'Sentro ng Scam' : 'Scam Information',
                    section: 'about-scam' as Section,
                  },
                  {
                    label: lang === 'fil' ? 'Pagtatasa' : 'Assessment',
                    section: 'try-me' as Section,
                  },
                ].map((link) => (
                  <button
                    key={link.section}
                    onClick={() => onNavigate(link.section)}
                    className="flex cursor-pointer items-center py-1 text-left text-xs text-white transition-all before:w-0 before:overflow-hidden before:opacity-0 before:transition-all before:ease-in-out before:content-['\203a'] hover:text-yellow-400 hover:before:w-3 hover:before:opacity-100"
                    style={{ fontWeight: 600 }}
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  onClick={onOpenTerms}
                  className="flex cursor-pointer items-center py-1 text-left text-xs text-white transition-all before:w-0 before:overflow-hidden before:opacity-0 before:transition-all before:ease-in-out before:content-['\203a'] hover:text-yellow-400 hover:before:w-3 hover:before:opacity-100"
                  style={{ fontWeight: 600 }}
                >
                  {lang === 'fil' ? 'Mga Tuntunin ng Paggamit' : 'Terms of Use'}
                </button>
              </div>
            </div>

            <div>
              <h4
                className="mb-3 text-sm tracking-wider text-yellow-400 uppercase"
                style={{ fontWeight: 900 }}
              >
                References
              </h4>
              <div className="flex h-24 w-24 items-center justify-center rounded-[8px] bg-white p-1.5">
                <QRCodeSVG
                  value="https://proof-app.ph"
                  size={84}
                  bgColor="#ffffff"
                  fgColor="#1a1816"
                  level="M"
                />
              </div>
              <p className="mt-2 text-[10px] text-[#8a8480]" style={{ fontWeight: 500 }}>
                Scan for references
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-[#3d3530] pt-6 text-center text-[10px] tracking-widest text-[#c7c3bf] uppercase sm:text-xs">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </>
  );
}