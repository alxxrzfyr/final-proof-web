import { useRef, useState } from 'react';
import { translations, type Lang } from './data';

interface Props {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export function AccessibilityWidget({ lang, setLang }: Props) {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: false,
    largeText: false,
    readableFont: false,
    highContrast: false,
    grayscale: false,
    highlightLinks: false,
    stopAnimations: false,
    dyslexicFont: false,
    bigCursor: false,
    protanopia: false,
    deuteranopia: false,
    tritanopia: false,
  });

  // Tracks the in-flight overlay so we can abort it if the user
  // toggles dark mode again before the previous animation finishes.
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  /**
   * Smooth dark-mode crossfade using a single GPU-composited overlay.
   *
   * Strategy:
   *   1. Stamp a full-screen div whose background matches the *current* theme.
   *   2. Flip the dark-mode class on <html> instantly (zero per-element recalc).
   *   3. Fade the overlay from opacity:1 → 0 so the new theme is revealed.
   *   4. Remove the overlay once the transition ends.
   *
   * Only ONE element animates (opacity on a composited layer) → silky even on
   * budget Android devices with a single GPU core.
   */
  const applyDarkModeOverlay = (next: boolean) => {
    // Abort any in-flight overlay immediately so rapid toggles stay crisp.
    if (overlayRef.current) {
      overlayRef.current.remove();
      overlayRef.current = null;
    }

    const overlay = document.createElement('div');
    // Warm parchment in light mode; near-black in dark mode.
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:99998',
      'pointer-events:none',
      `background:${next ? '#f4f1ea' : '#1a1a1a'}`,
      'opacity:1',
      'will-change:opacity',
    ].join(';');

    document.body.appendChild(overlay);
    overlayRef.current = overlay;

    // Flush styles so the browser paints the overlay before we start the fade.
    overlay.getBoundingClientRect();

    // Flip the theme class — happens instantly, hidden under the overlay.
    document.documentElement.classList.toggle('a11y-dark-mode', next);

    // Start the compositor-only opacity fade.
    overlay.style.transition = 'opacity 380ms cubic-bezier(0.4, 0, 0.2, 1)';
    overlay.style.opacity = '0';

    const cleanup = () => {
      overlay.remove();
      if (overlayRef.current === overlay) overlayRef.current = null;
    };
    overlay.addEventListener('transitionend', cleanup, { once: true });
    // Belt-and-suspenders: clean up even if transitionend never fires.
    setTimeout(cleanup, 480);
  };

  const toggle = (key: keyof typeof settings) => {
    const next = !settings[key];
    setSettings((s) => ({ ...s, [key]: next }));

    const classMap: Record<keyof typeof settings, string[]> = {
      darkMode: ['a11y-dark-mode'],
      largeText: ['a11y-large-text'],
      readableFont: ['a11y-readable-font'],
      highContrast: ['a11y-high-contrast'],
      grayscale: ['a11y-grayscale'],
      highlightLinks: ['a11y-highlight-links'],
      stopAnimations: ['a11y-reduce-motion'],
      dyslexicFont: ['a11y-dyslexic-font'],
      bigCursor: ['a11y-big-cursor'],
      protanopia: ['a11y-protanopia'],
      deuteranopia: ['a11y-deuteranopia'],
      tritanopia: ['a11y-tritanopia'],
    };

    if (key === 'darkMode') {
      // Dark mode uses the overlay — don't let the classMap block below touch the class.
      applyDarkModeOverlay(next);
      return;
    }

    if (['protanopia', 'deuteranopia', 'tritanopia'].includes(key) && next) {
      (['protanopia', 'deuteranopia', 'tritanopia'] as const).forEach((k) => {
        if (k !== key && settings[k]) {
          setSettings((s) => ({ ...s, [k]: false }));
          classMap[k].forEach((className) => {
            document.documentElement.classList.remove(className);
          });
        }
      });
    }
    classMap[key].forEach((className) => {
      document.documentElement.classList.toggle(className, next);
    });
  };

  const resetAll = () => {
    Object.keys(settings).forEach((k) => {
      const key = k as keyof typeof settings;
      if (settings[key]) toggle(key);
    });
  };

  const toggleItems = [
    // Dark mode is the first item in the list.
    {
      key: 'darkMode' as const,
      label: t('a11y.dark_mode'),
      icon: settings.darkMode ? 'light_mode' : 'dark_mode', // icon swaps on toggle
    },
    { key: 'largeText' as const,       label: t('a11y.large_text'),       icon: 'text_increase'      },
    { key: 'readableFont' as const,    label: t('a11y.readable_font'),    icon: 'font_download'      },
    { key: 'highContrast' as const,    label: t('a11y.high_contrast'),    icon: 'contrast'           },
    { key: 'grayscale' as const,       label: t('a11y.grayscale'),        icon: 'filter_b_and_w'     },
    { key: 'highlightLinks' as const,  label: t('a11y.highlight_links'),  icon: 'link'               },
    { key: 'stopAnimations' as const,  label: t('a11y.stop_animations'),  icon: 'motion_photos_off'  },
    { key: 'dyslexicFont' as const,    label: t('a11y.dyslexic_font'),    icon: 'spellcheck'         },
    { key: 'bigCursor' as const,       label: t('a11y.big_cursor'),       icon: 'mouse'              },
  ];

  const colorBlindItems = [
    {
      key: 'protanopia' as const,
      label: lang === 'fil' ? 'Protanopia (Pula-Berde)' : 'Protanopia (Red-Green)',
      color: 'bg-red-500',
    },
    {
      key: 'deuteranopia' as const,
      label: lang === 'fil' ? 'Deuteranopia (Berde-Pula)' : 'Deuteranopia (Green-Red)',
      color: 'bg-green-500',
    },
    {
      key: 'tritanopia' as const,
      label: lang === 'fil' ? 'Tritanopia (Asul-Dilaw)' : 'Tritanopia (Blue-Yellow)',
      color: 'bg-blue-500',
    },
  ];

  return (
    <>
      {/* SVG Filters for color blindness */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="protanopia">
            <feColorMatrix
              type="matrix"
              values="1     0      0      0 0
                      0     1.05  -0.05   0 0
                      0     0.5    0.5    0 0
                      0     0      0      1 0"
            />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix
              type="matrix"
              values="1.05 -0.05   0      0 0
                      0     1      0      0 0
                      0.5   0      0.5    0 0
                      0     0      0      1 0"
            />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix
              type="matrix"
              values="1      0     0      0 0
                      0      1     0      0 0
                      0      0.5   0.5    0 0
                      0      0     0      1 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Slide-in Container */}
      <div
        className={`fixed top-1/2 right-0 z-[61] flex -translate-y-1/2 items-center transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-[calc(100%-45px)] sm:translate-x-[calc(100%-44px)]'
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-l-2xl border-y-2 border-l-2 border-black bg-[#1a1816]/95 backdrop-blur-md text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-[#0a2fad] hover:border-black sm:h-16 sm:w-16 hover:scale-105"
          aria-label="Open accessibility settings"
        >
          <span className="material-symbols-outlined text-2xl sm:text-3xl">accessibility_new</span>
        </button>

        <div className="a11y-panel max-h-[85vh] w-[280px] shrink-0 overflow-y-auto rounded-l-3xl border-2 border-black bg-white/95 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] sm:w-[340px]">

          <div className="a11y-panel-header sticky top-0 z-10 flex items-center justify-between border-b-2 border-black bg-white/60 backdrop-blur-xl px-5 py-4 shadow-sm sm:px-6">
            <h3
              className="text-[#1a1816]"
              style={{
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: '1.2rem',
                letterSpacing: '0.02em',
              }}
            >
              {t('a11y.title')}
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f4f1ea] transition-all duration-200 hover:bg-[#e5ded4]"
              aria-label="Close panel"
            >
              <span className="material-symbols-outlined text-[22px] text-[#1a1816] transition-transform group-hover:rotate-90">
                close
              </span>
            </button>
          </div>

          <div className="p-4 sm:p-5">
            {/* Toggle Rows */}
            <div className="space-y-1">
              {toggleItems.map((item) => (
                <div
                  key={item.key}
                  className="a11y-row flex min-h-[52px] cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-[#f4f1ea] active:bg-[#e5ded4] sm:min-h-[56px] sm:p-4"
                  onClick={() => toggle(item.key)}
                  role="switch"
                  aria-checked={settings[item.key]}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggle(item.key);
                    }
                  }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-xl text-[#3d3530] sm:text-2xl">
                      {item.icon}
                    </span>
                    <span
                      className="text-sm text-[#1a1816] sm:text-base"
                      style={{ fontWeight: 600 }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div
                    className={`h-6 w-11 rounded-full transition-colors sm:h-7 sm:w-12 ${settings[item.key] ? 'bg-[#0a2fad]' : 'bg-gray-300'} relative shrink-0`}
                  >
                    <div
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform sm:h-5 sm:w-5 ${settings[item.key] ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Color Blind Mode */}
            <div className="mt-5 border-t-2 border-[#e5ded4] pt-5">
              <p
                className="mb-3 text-sm tracking-widest text-[#5c544d] uppercase"
                style={{ fontWeight: 700 }}
              >
                {lang === 'fil' ? 'Mode para sa Color Blind' : 'Color Blind Mode'}
              </p>
              <div className="space-y-1">
                {colorBlindItems.map((item) => (
                  <div
                    key={item.key}
                    className="a11y-row flex min-h-[48px] cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-[#f4f1ea] active:bg-[#e5ded4] sm:min-h-[52px] sm:p-4"
                    onClick={() => toggle(item.key)}
                    role="switch"
                    aria-checked={settings[item.key]}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle(item.key);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-full ${item.color} shrink-0`} />
                      <span className="text-sm text-[#1a1816]" style={{ fontWeight: 600 }}>
                        {item.label}
                      </span>
                    </div>
                    <div
                      className={`h-6 w-11 rounded-full transition-colors sm:h-7 sm:w-12 ${settings[item.key] ? 'bg-[#0a2fad]' : 'bg-gray-300'} relative shrink-0`}
                    >
                      <div
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform sm:h-5 sm:w-5 ${settings[item.key] ? 'translate-x-5 sm:translate-x-6' : 'translate-x-1'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RESET */}
            <button
              onClick={resetAll}
              className="mt-5 min-h-[48px] w-full cursor-pointer rounded-lg bg-gray-100 p-3 text-base text-[#1a1816] transition-colors hover:bg-gray-200 active:bg-gray-300 sm:min-h-[50px] sm:p-3.5"
              style={{ fontWeight: 700 }}
            >
              {t('a11y.reset')}
            </button>

            {/* LANGUAGE */}
            <div className="mt-6 border-t-2 border-[#e5ded4] pt-6">
              <p
                className="mb-4 text-sm tracking-widest text-[#5c544d] uppercase"
                style={{ fontWeight: 700 }}
              >
                {t('a11y.language_title')}
              </p>
              <div className="flex gap-2">
                {[
                  { code: 'en' as Lang, label: 'English (US)' },
                  { code: 'fil' as Lang, label: 'Filipino' },
                  { code: 'ceb' as Lang, label: 'Cebuano' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`min-h-[48px] flex-1 cursor-pointer rounded-lg px-2 py-3 text-sm transition-colors ${
                      lang === l.code
                        ? 'bg-[#0a2fad] text-white shadow-md'
                        : 'bg-[#f4f1ea] text-[#1a1816] hover:bg-[#e5ded4]'
                    }`}
                    style={{ fontWeight: 700 }}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}