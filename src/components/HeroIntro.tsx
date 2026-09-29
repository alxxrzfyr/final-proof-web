import { useEffect, useState } from 'react';
import type { Lang } from './data';
import bg1 from '@/assets/backgrounds/bg-1.jpg';
import bg2 from '@/assets/backgrounds/bg-2.jpg';
import bg3 from '@/assets/backgrounds/bg-3.jpg';
import bg4 from '@/assets/backgrounds/bg-4.png';

const HERO_IMAGES = [bg1, bg2, bg3, bg4];
const HERO_MS = 5000;

const copy = {
  en: {
    example: 'Example scam text',
    sender: '+63 917 ••• 4821',
    now: 'now',
    msg: ['GCash: Your account will be ', 'SUSPENDED in 24 hrs', '. Verify your details now: '],
    link: 'gcash-verify-ph.co/login',
    flags: ['Unknown mobile number, not an official short code', 'Pressure to act fast', 'Look-alike link, not gcash.com'],
    flagsTitle: 'Spot the 3 red flags',
    hotline: 'Got a text like this? Report it to the CICC hotline',
  },
  fil: {
    example: 'Halimbawa ng scam na text',
    sender: '+63 917 ••• 4821',
    now: 'ngayon',
    msg: ['GCash: Ang inyong account ay ', 'MASUSUSPINDE sa loob ng 24 oras', '. I-verify ang detalye ngayon: '],
    link: 'gcash-verify-ph.co/login',
    flags: ['Hindi kilalang mobile number, hindi opisyal na short code', 'Minamadali ka', 'Kamukhang link, hindi gcash.com'],
    flagsTitle: 'Hanapin ang 3 babala',
    hotline: 'May natanggap na ganito? I-report sa CICC hotline',
  },
  ceb: {
    example: 'Pananglitan sa scam nga text',
    sender: '+63 917 ••• 4821',
    now: 'karon',
    msg: ['GCash: Ang imong account ', 'MA-SUSPENDE sulod sa 24 ka oras', '. I-verify ang detalye karon: '],
    link: 'gcash-verify-ph.co/login',
    flags: ['Wala mailhi nga mobile number, dili opisyal nga short code', 'Gidali-dali ka', 'Susama nga link, dili gcash.com'],
    flagsTitle: 'Pangitaa ang 3 ka pasidaan',
    hotline: 'Nakadawat ug ingon ani? I-report sa CICC hotline',
  },
} as const;

function Pin({ n, className = '' }: { n: number; className?: string }) {
  return (
    <span
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#b42318] text-[13px] font-extrabold text-white shadow-[0_4px_10px_-3px_rgba(180,35,24,0.6)] ring-[3px] ring-white ${className}`}
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

export function HeroIntro({
  lang, t, onNavigate,
}: {
  lang: Lang; t: (k: string) => string; onNavigate: (s: string) => void;
}) {
  const s = copy[lang] ?? copy.en;
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setCurrent((c) => (c + 1) % HERO_IMAGES.length), HERO_MS);
    return () => window.clearTimeout(id);
  }, [current, playing]);

  const pauseLabel = lang === 'fil' ? 'Ihinto ang mga larawan' : lang === 'ceb' ? 'Ihunong ang mga hulagway' : 'Pause background photos';
  const playLabel = lang === 'fil' ? 'Ituloy ang mga larawan' : lang === 'ceb' ? 'Ipadayon ang mga hulagway' : 'Play background photos';

  return (
    <div className="relative overflow-hidden bg-[#1a1816]">
      {/* Sliding background photos */}
      {HERO_IMAGES.map((img, i) => (
        <div
          key={img}
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-[opacity,transform] ease-out motion-reduce:transition-none ${
            current === i ? 'scale-100 opacity-100 duration-[1600ms]' : 'scale-[1.06] opacity-0 duration-[1200ms]'
          }`}
          style={{ backgroundImage: `url("${img}")` }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,24,22,0.92)_0%,rgba(26,24,22,0.78)_45%,rgba(26,24,22,0.55)_100%)]" aria-hidden="true" />

      <style>{`
        @keyframes proof-flag-in { from { opacity: 0; transform: translateY(8px) scale(.96) } to { opacity: 1; transform: none } }
        @keyframes proof-pin-in { 0% { transform: scale(0) } 70% { transform: scale(1.15) } 100% { transform: scale(1) } }
        .proof-flag { animation: proof-flag-in .6s cubic-bezier(.16,1,.3,1) both }
        .proof-pin { animation: proof-pin-in .45s cubic-bezier(.16,1,.3,1) both }
        @media (prefers-reduced-motion: reduce) { .proof-flag, .proof-pin { animation: none } }
      `}</style>

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 md:px-12 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:pb-14 lg:pt-24">
        {/* Copy */}
        <div className="lg:col-span-7">
          <h1
            className="uppercase leading-[0.92] tracking-[-0.035em] text-white"
            style={{ fontWeight: 900, fontSize: 'clamp(3rem, 8.2vw, 6rem)' }}
          >
            <span className="block">{t('hero.title1')}</span>
            <span className="relative mt-1 inline-block text-yellow-400">
              {t('hero.title2')}
            </span>
          </h1>

          <p className="mt-8 max-w-[34ch] text-xl leading-[1.55] text-[#e5ded4] sm:text-2xl" style={{ fontWeight: 500 }}>
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => onNavigate('about-scam')}
              className="group inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full bg-yellow-400 px-8 text-lg font-bold text-[#1a1816] shadow-[0_14px_28px_-12px_rgba(250,204,21,0.55)] transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-200/60 active:translate-y-0 sm:h-16 sm:px-10"
            >
              {t('hero.btn_learn')}
              <span className="material-symbols-outlined text-2xl transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
            </button>
            <a
              href="https://cicc.gov.ph/report/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full px-6 text-lg font-bold text-white ring-2 ring-inset ring-white/40 transition-[background-color,box-shadow] duration-200 hover:bg-white/10 hover:ring-white/70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60 sm:h-16 sm:px-8"
            >
              {t('hero.btn_report')}
              <span className="material-symbols-outlined text-xl" aria-hidden="true">arrow_outward</span>
            </a>
          </div>

          <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold text-[#d4d0cc]">
            <span className="material-symbols-outlined text-[20px] text-yellow-400" aria-hidden="true">call</span>
            <span>{s.hotline}{' '}
            <a href="tel:1326" className="font-extrabold tabular-nums text-white underline decoration-yellow-400 decoration-[3px] underline-offset-4 hover:text-yellow-300">
              1326
            </a></span>
          </p>
        </div>

        {/* Example scam text with annotated red flags */}
        <figure className="relative mx-auto w-full max-w-[460px] lg:col-span-5 lg:mr-0">
          <figcaption className="mb-4 flex items-center justify-between text-[13px] font-bold uppercase tracking-[0.08em] text-[#d4d0cc]">
            <span>{s.example}</span>
            <span className="text-[#ff9b8f]">{s.flagsTitle}</span>
          </figcaption>

          <div className="rounded-[28px] bg-white p-5 shadow-[0_40px_80px_-40px_rgba(26,24,22,0.45)] ring-1 ring-[#1a1816]/8 sm:p-6">
            {/* Sender row */}
            <div className="flex items-center gap-3 border-b border-[#1a1816]/8 pb-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e5ded4] text-[#534d47]">
                <span className="material-symbols-outlined" aria-hidden="true">person</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-[17px] font-bold tabular-nums text-[#1a1816]">
                  {s.sender}
                  <Pin n={1} className="proof-pin [animation-delay:500ms]" />
                </p>
                <p className="text-[13px] font-semibold text-[#6b635b]">SMS · {s.now}</p>
              </div>
            </div>

            {/* Bubble */}
            <div className="relative mt-5 rounded-2xl rounded-tl-md bg-[#f4f1ea] p-4 text-[17px] leading-[1.55] text-[#1a1816]">
              {s.msg[0]}
              <mark className="rounded bg-[#b42318]/12 px-1 font-bold text-[#b42318]">
                {s.msg[1]}
                
              </mark>
              {s.msg[2]}
              <span className="break-all rounded bg-[#b42318]/12 px-1 font-semibold text-[#0a2fad] underline decoration-[#0a2fad]/40 underline-offset-2">
                {s.link}
                
              </span>
            </div>

            {/* Flags legend */}
            <ol className="mt-5 space-y-3">
              {s.flags.map((f, i) => (
                <li
                  key={f}
                  className="proof-flag flex items-start gap-3 text-[15px] font-semibold leading-snug text-[#2d2926]"
                  style={{ animationDelay: `${600 + i * 400}ms` }}
                >
                  <Pin n={i + 1} />
                  <span className="pt-1">{f}</span>
                </li>
              ))}
            </ol>
          </div>
        </figure>
      </div>

      {/* Photo controls */}
      <div className="relative z-10 mx-auto flex max-w-[1320px] items-center gap-3 px-5 pb-8 sm:px-8 md:px-12 lg:px-16">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? pauseLabel : playLabel}
          title={playing ? pauseLabel : playLabel}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{playing ? 'pause' : 'play_arrow'}</span>
        </button>
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`${lang === 'en' ? 'Photo' : lang === 'fil' ? 'Larawan' : 'Hulagway'} ${i + 1}`}
            aria-current={current === i}
            className="group flex h-10 cursor-pointer items-center focus-visible:outline-none"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-white ${
                current === i ? 'w-10 bg-yellow-400' : 'w-4 bg-white/40 group-hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
