import { teamMembers, translations, type Lang } from './data';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import img1 from '../assets/group/IMG_20260503_231051_440.jpg';
import img2 from '../assets/group/IMG_20260503_231119_050.jpg';
import img3 from '../assets/group/IMG_20260503_231149_579.jpg';
import img4 from '../assets/group/IMG_20260503_231232_071.jpg';
import img5 from '../assets/group/IMG_20260503_231242_999.jpg';
import img6 from '../assets/group/IMG_20260503_231301_657.jpg';

import useEmblaCarousel from 'embla-carousel-react';

// ── Glob-import every jpg/png inside assets/members ──────────────
const memberImages = import.meta.glob<{ default: string }>(
  '../assets/members/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true }
);
function getMemberImage(filename: string): string | undefined {
  return memberImages[`../assets/members/${filename}`]?.default;
}

const groupSlides = [img1, img5, img2, img4, img3, img6];
const SLIDE_MS = 6000;

// Leads first, then everyone else in the original (alphabetical) order.
const LEAD_ORDER = ['Research Lead', 'Assist. Research Lead', 'Web Developer Lead'];
function leadRank(role: string) {
  const first = role.split('\n')[0];
  const i = LEAD_ORDER.indexOf(first);
  return i === -1 ? LEAD_ORDER.length : i;
}
const orderedTeam = [...teamMembers].sort((a, b) => leadRank(a.role) - leadRank(b.role));

// Small UI strings for the new controls
const ui = {
  en: {
    onPage: 'On This Page', prevPhoto: 'Previous photo', nextPhoto: 'Next photo',
    pause: 'Pause slideshow', play: 'Play slideshow', photo: 'Photo',
    prevMembers: 'Previous team members', nextMembers: 'Next team members',
    goTo: 'Go to team members', of: 'of', members: 'members',
    gallery: 'P.R.O.O.F. team photos', team: 'P.R.O.O.F. team members',
  },
  fil: {
    onPage: 'Sa Pahinang Ito', prevPhoto: 'Nakaraang larawan', nextPhoto: 'Susunod na larawan',
    pause: 'Ihinto ang slideshow', play: 'Ituloy ang slideshow', photo: 'Larawan',
    prevMembers: 'Nakaraang mga miyembro', nextMembers: 'Susunod na mga miyembro',
    goTo: 'Pumunta sa mga miyembro', of: 'sa', members: 'miyembro',
    gallery: 'Mga larawan ng P.R.O.O.F. team', team: 'Mga miyembro ng P.R.O.O.F.',
  },
  ceb: {
    onPage: 'Niining Panid', prevPhoto: 'Miaging hulagway', nextPhoto: 'Sunod nga hulagway',
    pause: 'Ihunong ang slideshow', play: 'Ipadayon ang slideshow', photo: 'Hulagway',
    prevMembers: 'Miaging mga miyembro', nextMembers: 'Sunod nga mga miyembro',
    goTo: 'Adto sa mga miyembro', of: 'sa', members: 'miyembro',
    gallery: 'Mga hulagway sa P.R.O.O.F. team', team: 'Mga miyembro sa P.R.O.O.F.',
  },
} as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

const pad = (n: number) => String(n).padStart(2, '0');

function IconButton({
  label, icon, onClick, disabled, variant = 'light',
}: {
  label: string; icon: string; onClick: () => void; disabled?: boolean; variant?: 'light' | 'solid';
}) {
  const base =
    'inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full transition-[background-color,color,transform,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0a2fad]/35 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35 disabled:active:scale-100';
  const look =
    variant === 'solid'
      ? 'bg-[#0a2fad] text-white hover:bg-[#08268c] shadow-[0_6px_16px_-6px_rgba(10,47,173,0.55)]'
      : 'bg-white text-[#1a1816] ring-1 ring-[#1a1816]/12 hover:bg-[#1a1816] hover:text-white';
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled} className={`${base} ${look}`}>
      <span className="material-symbols-outlined text-[24px]" aria-hidden="true">{icon}</span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// Group photo slideshow: crossfade, pausable, keyboard + swipe
// ─────────────────────────────────────────────────────────────────
function GroupGallery({ lang }: { lang: Lang }) {
  const s = ui[lang] ?? ui.en;
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reducedMotion);
  const [hovering, setHovering] = useState(false);
  const total = groupSlides.length;

  useEffect(() => { if (reducedMotion) setPlaying(false); }, [reducedMotion]);

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

  // Auto-advance; restarts whenever the index changes (so manual nav resets the clock)
  useEffect(() => {
    if (!playing || hovering) return;
    const id = window.setTimeout(() => go(index + 1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [playing, hovering, index, go]);

  const touchX = useRef(0);

  return (
    <div
      className="group/gallery rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0a2fad]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f8f7f5]"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={s.gallery}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
      }}
    >
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#2a2421] shadow-[0_30px_60px_-30px_rgba(26,24,22,0.45)] sm:aspect-[16/9] lg:aspect-[21/10]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(dx) > 45) go(index + (dx > 0 ? 1 : -1));
        }}
      >
        {groupSlides.map((src, i) => {
          const active = i === index;
          return (
            <img
              key={src}
              src={src}
              alt={`${s.photo} ${i + 1} ${s.of} ${total}: ${s.gallery}`}
              aria-hidden={!active}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] ease-out motion-reduce:transition-none ${
                active ? 'opacity-100 scale-100 duration-[1200ms]' : 'opacity-0 scale-[1.04] duration-[900ms]'
              }`}
            />
          );
        })}
        <div className="sr-only" aria-live="polite">
          {s.photo} {index + 1} {s.of} {total}
        </div>
      </div>

      {/* Control bar */}
      <div className="mt-5 flex items-center gap-4 sm:gap-6">
        <p className="shrink-0 text-[15px] font-bold tabular-nums text-[#1a1816]" aria-hidden="true">
          {pad(index + 1)} <span className="font-medium text-[#6b635b]">/ {pad(total)}</span>
        </p>

        <div className="flex flex-1 items-center gap-1.5" role="group" aria-label={s.gallery}>
          {groupSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`${s.photo} ${i + 1}`}
              aria-current={i === index}
              className="group/seg relative flex h-8 flex-1 cursor-pointer items-center focus-visible:outline-none"
            >
              <span className="relative block h-1 w-full overflow-hidden rounded-full bg-[#1a1816]/12 group-focus-visible/seg:ring-2 group-focus-visible/seg:ring-[#0a2fad]">
                <span
                  key={`${index}-${playing}-${hovering}`}
                  className={`absolute inset-y-0 left-0 rounded-full ${i < index ? 'w-full bg-[#1a1816]/45' : i === index ? 'bg-[#0a2fad]' : 'w-0'}`}
                  style={
                    i === index
                      ? playing && !hovering
                        ? { animation: `proof-fill ${SLIDE_MS}ms linear forwards` }
                        : { width: '100%' }
                      : undefined
                  }
                />
              </span>
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <IconButton
            label={playing ? s.pause : s.play}
            icon={playing ? 'pause' : 'play_arrow'}
            onClick={() => setPlaying((p) => !p)}
          />
          <IconButton label={s.prevPhoto} icon="arrow_back" onClick={() => go(index - 1)} />
          <IconButton label={s.nextPhoto} icon="arrow_forward" onClick={() => go(index + 1)} variant="solid" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Meet the Team carousel (Embla)
// ─────────────────────────────────────────────────────────────────
function TeamCarousel({ lang }: { lang: Lang }) {
  const s = ui[lang] ?? ui.en;
  const [emblaRef, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', inViewThreshold: 0.7 });
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [inView, setInView] = useState<number[]>([0]);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
      setInView(api.slidesInView());
    };
    sync();
    api.on('select', sync);
    api.on('reInit', sync);
    api.on('slidesInView', sync);
    return () => {
      api.off('select', sync);
      api.off('reInit', sync);
      api.off('slidesInView', sync);
    };
  }, [api]);

  const first = inView.length ? Math.min(...inView) + 1 : 1;
  const last = inView.length ? Math.max(...inView) + 1 : 1;

  return (
    <div
      tabIndex={0}
      className="rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0a2fad]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f1ea]"
      role="region"
      aria-roledescription="carousel"
      aria-label={s.team}
      onKeyDownCapture={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); api?.scrollPrev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); api?.scrollNext(); }
      }}
    >
      <div ref={emblaRef} className="overflow-hidden">
      <div className="-ml-5 flex touch-pan-y sm:-ml-6">
        {orderedTeam.map((member, idx) => {
          const imgSrc = getMemberImage(member.image);
          const roles = member.role.split('\n');
          return (
            <div
              key={member.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} ${s.of} ${orderedTeam.length}`}
              className="min-w-0 shrink-0 grow-0 basis-[82%] pl-5 sm:basis-1/2 sm:pl-6 lg:basis-1/3 xl:basis-1/4"
            >
              <figure className="group/card">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#e5ded4]">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="absolute inset-0 h-full w-full select-none object-cover [transform:scale(var(--s))] transition-transform duration-700 ease-out group-hover/card:[transform:scale(calc(var(--s)*1.05))] motion-reduce:transition-none"
                      style={{
                        objectPosition: member.position,
                        transformOrigin: 'center top',
                        ['--s' as string]: member.scale,
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-7xl text-[#1a1816]/20" aria-hidden="true">person</span>
                    </div>
                  )}
                </div>
                <figcaption className="mt-4 px-1">
                  <p className="text-lg font-extrabold leading-tight tracking-[-0.01em] text-[#1a1816] sm:text-xl">
                    {member.name}
                  </p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-semibold text-[#534d47]">
                    {roles.map((r, i) => (
                      <span key={r} className="inline-flex items-center gap-2">
                        {i > 0 && <span className="h-1 w-1 rounded-full bg-[#534d47]/50" aria-hidden="true" />}
                        <span className={/lead/i.test(r) ? 'text-[#0a2fad]' : undefined}>{r}</span>
                      </span>
                    ))}
                  </p>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
      </div>

      <div className="mt-8 flex items-center gap-4 sm:gap-6">
        <p className="shrink-0 text-[15px] font-bold tabular-nums text-[#1a1816]" aria-live="polite">
          {first === last ? pad(first) : `${pad(first)}–${pad(last)}`}{' '}
          <span className="font-medium text-[#6b635b]">{s.of} {orderedTeam.length} {s.members}</span>
        </p>

        <div className="hidden flex-1 items-center gap-1.5 sm:flex">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`${s.goTo} ${i + 1}`}
              aria-current={i === selected}
              className="group/seg flex h-8 flex-1 cursor-pointer items-center focus-visible:outline-none"
            >
              <span
                className={`block h-1 w-full rounded-full transition-colors duration-300 group-focus-visible/seg:ring-2 group-focus-visible/seg:ring-[#0a2fad] ${
                  i === selected ? 'bg-[#0a2fad]' : 'bg-[#1a1816]/12 group-hover/seg:bg-[#1a1816]/30'
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex-1 sm:hidden" />

        <div className="flex shrink-0 items-center gap-2">
          <IconButton label={s.prevMembers} icon="arrow_back" onClick={() => api?.scrollPrev()} disabled={!canPrev} />
          <IconButton label={s.nextMembers} icon="arrow_forward" onClick={() => api?.scrollNext()} disabled={!canNext} variant="solid" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────

interface Props { lang: Lang }

export function AboutSection({ lang }: Props) {
  const t = useCallback(
    (key: string) => translations[lang]?.[key] || translations.en[key] || key,
    [lang]
  );
  const s = ui[lang] ?? ui.en;

  const [activeSub, setActiveSub] = useState<string>('about-intro');
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 120);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = useCallback(() => {
    const url = 'https://proofph.vercel.app';
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
    if (navigator.share) {
      navigator.share({ title: 'P.R.O.O.F.', url }).catch(() => {});
      return;
    }
    navigator.clipboard?.writeText(url).then(done).catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSub(e.target.id); }),
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );
    document
      .querySelectorAll('section#about-intro, section#research, section#our-team')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const subLinks = useMemo(() => [
    { id: 'about-intro', label: 'Intro' },
    { id: 'research', label: lang === 'fil' ? 'Pananaliksik' : lang === 'ceb' ? 'Panukiduki' : 'Our Research' },
    { id: 'our-team', label: lang === 'fil' ? 'Ang Team' : lang === 'ceb' ? 'Ang Pundok' : 'The Team' },
  ], [lang]);

  const body = 'text-[17px] leading-[1.75] text-[#2d2926] sm:text-lg';

  return (
    <section className="bg-[#f8f7f5]">
      <style>{`@keyframes proof-fill { from { width: 0% } to { width: 100% } }`}</style>

      {/* ── Floating Island Sub-navigation ── */}
      <div className={`sticky top-[72px] sm:top-[88px] z-50 flex justify-center w-full px-4 pointer-events-none -mb-16 mt-4 transition-all duration-500 ease-out ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <nav aria-label={s.onPage} className={`hidden sm:flex items-center gap-1 p-1 bg-white/95 border border-black/10 rounded-full shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 ${isScrolled ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div className="flex items-center gap-1.5 pl-4 pr-2 text-[#555] font-bold uppercase tracking-widest text-[10px]">
            <span className="material-symbols-outlined text-[15px]" aria-hidden="true">explore</span>
            <span className="hidden md:inline">{s.onPage}</span>
          </div>
          <div className="w-[1px] h-4 bg-black/10 mx-1" />
          {subLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={activeSub === link.id ? 'location' : undefined}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeSub === link.id
                  ? 'bg-[#0a2fad] text-white shadow-md'
                  : 'text-[#555] hover:bg-black/5 hover:text-[#1a1816]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Intro ── */}
      <section id="about-intro" className="scroll-mt-28">
        <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-16 sm:px-8 sm:pt-20 md:px-12 lg:px-16 lg:pb-16 lg:pt-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <h1
              className="text-balance uppercase leading-[0.95] tracking-[-0.03em] text-[#1a1816] lg:col-span-5"
              style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {t('about.title1')} <span className="text-[#0a2fad]">{t('about.title2')}</span>
            </h1>
            <p className={`${body} max-w-[68ch] lg:col-span-7 lg:pt-3`} style={{ fontWeight: 500 }}>
              {lang === 'fil' ? (
                <>
                  Mga pagbati, tao. Kayo na ngayon ay bahagi ng <strong>P.R.O.O.F.</strong>,{' '}
                  <strong>ang Programa para sa Responsableng Online na Operasyon at Kamalayan sa Pandaraya.</strong>{' '}
                  Ang P.R.O.O.F. ay isang kampanya laban sa mga cyberfraud at para mapataas ang kamalayan tungkol sa iba't ibang uri ng
                  scam at kung paano sila gumagana. Ang internet ay puno ng pandaraya at manipulasyon, madalas na hinihimok ng hindi kilalang
                  motibo. <strong>Simple ang aming misyon:</strong> para mag-edukasyon, mag-impormasyon,
                  at lumaban laban sa mga cyberfraud. Sa pamamagitan ng kampanyang ito, layunin naming ilantad ang
                  mga karaniwang scam, itaguyod ang kritikal na pag-iisip, at hikayatin ang mga tao na maging mabuting gumagamit ng internet.
                  Sa P.R.O.O.F., hindi ka lamang isang tao. Ikaw ay isang responsableng isa.{' '}
                  <strong>Maging ang PROOF.</strong>
                </>
              ) : lang === 'ceb' ? (
                <>
                  Kumusta, tawo. Karon kamo bahin na sa <strong>P.R.O.O.F.</strong>,{' '}
                  <strong>ang Programa alang sa Responsableng Online nga Operasyon ug Kahalam sa Pagpanglimbong.</strong>{' '}
                  Ang P.R.O.O.F. usa ka kampanya batok sa mga cyberfraud ug aron mapataas ang kahibalo bahin sa lain-laing klase sa
                  mga scam ug kon unsaon nila pagbuhat. Ang internet puno sa limbong ug manipulasyon, sagad gipalihok sa wala mailhi nga
                  katuyoan. <strong>Simple ang among misyon:</strong> aron mag-edukasyon, mag-impormasyon,
                  ug makig-away batok sa mga cyberfraud. Pinaagi niini nga kampanya, nagtumong kami sa paglantaw sa mga komon nga scam,
                  pagpasiugda sa kritikal nga paghunahuna, ug paghikay sa mga tawo nga mahimong maayong tiggamit sa internet.
                  Uban sa P.R.O.O.F., dili ka lang usa ka tawo. Usa ka responsable.{' '}
                  <strong>Mahimong PROOF.</strong>
                </>
              ) : (
                <>
                  Greetings, human. You are now part of the <strong>P.R.O.O.F.</strong>,{' '}
                  <strong>The Program to Responsible Online Operation and Fraud-Awareness.</strong>{' '}
                  P.R.O.O.F. is a campaign against cyberfrauds and to raise awareness about different kinds
                  of scams and how they work. The internet is full of deception and manipulation, often
                  driven by an unknown agenda. <strong>Our mission is simple:</strong> to educate, to
                  inform, and to fight back against cyberfrauds. With this campaign, we aim to expose
                  common scams, promote critical thinking, and motivate people to be good internet users.
                  With P.R.O.O.F., you are not just a human. You are a responsible one.{' '}
                  <strong>Be the PROOF.</strong>
                </>
              )}
            </p>
          </div>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#1a1816]/10 sm:grid-cols-3 lg:mt-16">
            {[
              { k: lang === 'fil' ? 'Miyembro ng team' : lang === 'ceb' ? 'Miyembro sa pundok' : 'Team members', v: String(teamMembers.length) },
              { k: lang === 'fil' ? 'Para sa edad' : lang === 'ceb' ? 'Alang sa edad' : 'Built for ages', v: '40–65' },
              { k: lang === 'fil' ? 'Mga wika' : lang === 'ceb' ? 'Mga pinulongan' : 'Languages', v: 'EN · FIL · CEB' },
            ].map((f) => (
              <div key={f.k} className="flex flex-col-reverse gap-1 bg-[#f8f7f5] px-6 py-5">
                <dt className="text-[15px] font-semibold text-[#534d47]">{f.k}</dt>
                <dd className="text-[1.75rem] font-extrabold leading-none tracking-[-0.02em] text-[#0a2fad] tabular-nums">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Group photo slideshow ── */}
        <div className="mx-auto max-w-[1320px] px-5 pb-16 sm:px-8 md:px-12 lg:px-16 lg:pb-24">
          <GroupGallery lang={lang} />
        </div>
      </section>

      {/* ── Research ── */}
      <section id="research" className="scroll-mt-28 border-t border-[#e5ded4] bg-white">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-5 py-16 sm:px-8 md:px-12 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-24">
          <h2
            className="text-balance leading-[1.05] tracking-[-0.02em] text-[#0a2fad] lg:col-span-5"
            style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            {lang === 'fil' ? 'Ano ang Aming Pananaliksik?' : lang === 'ceb' ? 'Unsa ang Among Panukiduki?' : 'What is Our Research All About?'}
          </h2>
          <div className="max-w-[68ch] space-y-6 lg:col-span-7" style={{ fontWeight: 500 }}>
            <p className={body}>
              {lang === 'fil' ? (
                <>
                  Ang pananaliksik na ito ay naglalayong mapataas ang kamalayan tungkol sa mga online na scam, lalo na para sa mga matatanda na may edad{' '}
                  <strong>40 hanggang 65</strong>. Maraming tao sa grupong ito ang aktibo online ngunit maaaring hindi sapat ang kaalaman nila tungkol sa mga banta tulad ng{' '}
                  <strong>phishing, pekeng premyo, at mapanlinlang na mga link</strong>, na ginagawa silang madaling target ng mga manloloko. Layunin ng pag-aaral na ito na tulayin ang agwat sa pagitan ng paggamit ng teknolohiya at kaligtasan online.
                </>
              ) : lang === 'ceb' ? (
                <>
                  Kining panukiduki nagtumong sa pagpataas sa kahibalo bahin sa mga online nga scam, ilabi na alang sa mga hamtong nga may edad{' '}
                  <strong>40 hangtod 65</strong>. Daghan sa maong grupo ang aktibo online apan mahimo nga wala'y igong kahibalo bahin sa mga hulga sama sa{' '}
                  <strong>phishing, peke nga mga premyo, ug limbong nga mga link</strong>, nga naghimo kanila nga sayon nga target sa mga mangilad. Kini nga pagtuon nagtumong sa pagtabok sa gawang tali sa paggamit sa teknolohiya ug kaligtasan online.
                </>
              ) : (
                <>
                  This research aims to raise awareness about online scams, especially for adults aged{' '}
                  <strong>40 to 65</strong>. Many people in this age group are active online but may not
                  know enough about threats like <strong>phishing, fake prize offers, and fraudulent
                  links</strong>, making them easy targets for scammers. This study aims to bridge the gap
                  between technology use and online safety.
                </>
              )}
            </p>
            <p className={body}>
              {lang === 'fil' ? (
                <>
                  Sa pamamagitan ng pananaliksik na ito, nagbibigay kami ng praktikal na kaalaman para matulungan ang mga tao na maiwasan ang mga online na scam at
                  manatiling ligtas sa internet. Ang aming layunin ay mag-impormasyon at hikayatin ang responsableng digital na gawi para sa mas ligtas na karanasan online. Para magawa ito, lumikha kami ng website na nagbabahagi ng impormasyon
                  tungkol sa mga karaniwang online na scam, kung paano protektahan ang personal na impormasyon, at kung paano matukoy ang mga online na banta. Ang pananaliksik na ito ay ginawa para sa <strong>mga layuning akademiko</strong> habang tinutugunan din ang isang tunay at may kaugnayan na isyu sa digital na mundo ngayon.
                </>
              ) : lang === 'ceb' ? (
                <>
                  Pinaagi niini nga panukiduki, naghatag kami ug praktikal nga kahibalo aron motabang sa mga tawo sa paglikay sa mga online nga scam ug
                  pagpabilin nga luwas sa internet. Ang among katuyoan mao ang pagpahibalo ug paghikay sa responsableng mga batasan sa digital alang sa luwas nga kasinatian online. Aron mahimo kini, naghimo kami ug website nga nagpaambit sa impormasyon
                  bahin sa komon nga mga online nga scam, kon unsaon pagpanalipod sa personal nga impormasyon, ug kon unsaon pagkita sa mga online nga hulga. Kini nga panukiduki gihimo alang sa <strong>mga katuyoan sa akademiko</strong> samtang ginaatubang usab ang usa ka tinuod ug may relevance nga isyu sa digital nga kalibutan karon.
                </>
              ) : (
                <>
                  Through this research, we provide practical knowledge to help people avoid online scams and
                  stay safe on the internet. Our goal is to inform and encourage responsible digital habits
                  for a safer online experience. To do this, we created a website that shares information
                  about common online scams, how to protect personal information, and how to spot online
                  threats. This research was made for <strong>academic purposes</strong> while also addressing
                  a real and relevant issue in today's digital world.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section id="our-team" className="scroll-mt-28 border-t border-[#e5ded4] bg-[#f4f1ea]">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 md:px-12 lg:px-16 lg:py-24">
          <div className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-12 lg:gap-12">
            <h2
              className="text-balance uppercase leading-[0.95] tracking-[-0.03em] text-[#1a1816] lg:col-span-5"
              style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.75rem)' }}
            >
              {t('about.team_title1')} <span className="text-[#0a2fad]">{t('about.team_title2')}</span>
            </h2>
            <p className={`${body} max-w-[60ch] lg:col-span-7 lg:self-end`} style={{ fontWeight: 500 }}>
              {lang === 'fil'
                ? 'Kilalanin ang mga dedikadong indibidwal sa likod ng P.R.O.O.F., nagkakaisa sa isang pagbabahagi na pangako sa kaligtasan online, digital na kamalayan, at pagbibigay-kapangyarihan sa iba na mag-navigate sa internet nang may responsibilidad.'
                : lang === 'ceb'
                ? 'Hiilha ang mga dedikadong indibidwal sa luyo sa P.R.O.O.F., nagkahiusa sa usa ka hinigtang pangako sa kaligtasan online, digital nga kahibalo, ug paghatag ug gahom sa uban aron mag-navigate sa internet nga may responsibilidad.'
                : 'Meet the dedicated individuals behind P.R.O.O.F., united by a shared commitment to online safety, digital awareness, and empowering others to navigate the internet responsibly.'}
            </p>
          </div>

          <TeamCarousel lang={lang} />
        </div>
      </section>

      {/* ── Share CTA ── */}
      <section className="bg-[#0a2fad]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 py-16 sm:px-8 md:px-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-16 lg:py-20">
          <div className="max-w-[62ch]">
            <h3
              className="text-balance uppercase leading-[1] tracking-[-0.02em] text-white"
              style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              {t('home.join_title')}
            </h3>
            <p className="mt-4 text-[17px] leading-[1.7] text-[#dbe3ff] sm:text-lg" style={{ fontWeight: 500 }}>
              {lang === 'fil'
                ? 'Sumali sa aming Kampanya ng Kamalayan sa Scam at maging bahagi ng isang kilusan na nagbibigay-kapangyarihan sa mga indibidwal na makilala, maiwasan, at maiulat ang online na panloloko. Magkasama, maaari tayong protektahan hindi lamang ang ating sarili kundi pati na rin ang ating pamilya at komunidad mula sa pandaraya at pagkalugi ng pera.'
                : lang === 'ceb'
                ? 'Apil sa among Kampanya sa Kahibalo sa Scam ug mahimong bahin sa usa ka kalihukan nga naghatag ug gahom sa mga indibidwal sa pag-ila, paglikay, ug pag-report sa online nga panlimbong. Magkahiusa, mahimo natong panalipdan dili lamang ang atong kaugalingon kondili pati na ang atong pamilya ug komunidad gikan sa limbong ug pagkawala sa kwarta.'
                : 'Join our Scam Awareness Campaign and become part of a movement that empowers individuals to recognize, prevent, and report online fraud. Together, we can protect not only ourselves but also our families and communities from deception and financial loss.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex h-14 shrink-0 cursor-pointer items-center justify-center gap-2.5 self-start rounded-full bg-yellow-400 px-8 text-base font-bold text-[#1a1816] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)] transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-yellow-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-200 active:translate-y-0 lg:self-auto"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">{copied ? 'check' : 'share'}</span>
            <span aria-live="polite">
              {copied
                ? (lang === 'fil' ? 'Nakopya!' : lang === 'ceb' ? 'Nakopya!' : 'Copied!')
                : (lang === 'fil' ? 'Ibahagi' : lang === 'ceb' ? 'Ipaambit' : 'Share')}
            </span>
          </button>
        </div>
      </section>
    </section>
  );
}
