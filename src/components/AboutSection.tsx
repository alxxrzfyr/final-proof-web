import { teamMembers, translations, type Lang } from './data';
import { useState, useEffect, useCallback, useRef, memo } from 'react';
import teamBg from '../assets/backgrounds/bg-5.jpg';
import img1 from '../assets/group/IMG_20260503_231051_440.jpg';
import img2 from '../assets/group/IMG_20260503_231119_050.jpg';
import img3 from '../assets/group/IMG_20260503_231149_579.jpg';
import img4 from '../assets/group/IMG_20260503_231232_071.jpg';
import img5 from '../assets/group/IMG_20260503_231242_999.jpg';
import img6 from '../assets/group/IMG_20260503_231301_657.jpg';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// ── Glob-import every jpg/png inside assets/members ──────────────
const memberImages = import.meta.glob<{ default: string }>(
  '../assets/members/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true }
);
function getMemberImage(filename: string): string | undefined {
  return memberImages[`../assets/members/${filename}`]?.default;
}
// ─────────────────────────────────────────────────────────────────

const groupSlides = [img1, img5, img2, img4, img3, img6];
const TOTAL       = groupSlides.length;
const TEAM_BG     = teamBg;

// ─────────────────────────────────────────────────────────────────
// PRECOMPUTED STATIC STYLE OBJECTS
// Created once at module load. getSlideStyle() returns a reference —
// zero object allocation during animation, no GC pressure.
// ─────────────────────────────────────────────────────────────────
const TRANSITION =
  'transform 1.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1)';

const BASE_STYLE: React.CSSProperties = {
  position:   'absolute',
  inset:       0,
  width:      '100%',
  height:     '100%',
  overflow:   'hidden',
  willChange: 'transform, opacity',
  transition:  TRANSITION,
};

const SLIDE_ACTIVE: React.CSSProperties = Object.freeze({
  ...BASE_STYLE,
  transform:     'perspective(1200px) translate3d(0,0,0) rotateY(0deg) scale(1)',
  opacity:        1,
  zIndex:         10,
  pointerEvents: 'auto',
});
const SLIDE_LEFT: React.CSSProperties = Object.freeze({
  ...BASE_STYLE,
  transform:     'perspective(1200px) translate3d(-88%,0,0) rotateY(52deg) scale(0.88)',
  opacity:        0.72,
  zIndex:         5,
  pointerEvents: 'none',
});
const SLIDE_RIGHT: React.CSSProperties = Object.freeze({
  ...BASE_STYLE,
  transform:     'perspective(1200px) translate3d(88%,0,0) rotateY(-52deg) scale(0.88)',
  opacity:        0.72,
  zIndex:         5,
  pointerEvents: 'none',
});

const SLIDE_HIDDEN_LEFT: React.CSSProperties = Object.freeze({
  ...BASE_STYLE,
  transform:     'perspective(1200px) translate3d(-88%,0,0) rotateY(52deg) scale(0.88)',
  opacity:        0,
  zIndex:         0,
  pointerEvents: 'none',
});
const SLIDE_HIDDEN_RIGHT: React.CSSProperties = Object.freeze({
  ...BASE_STYLE,
  transform:     'perspective(1200px) translate3d(88%,0,0) rotateY(-52deg) scale(0.88)',
  opacity:        0,
  zIndex:         0,
  pointerEvents: 'none',
});

function getSlideStyle(offset: number): React.CSSProperties {
  if (offset ===  0) return SLIDE_ACTIVE;
  if (offset === -1) return SLIDE_LEFT;
  if (offset ===  1) return SLIDE_RIGHT;
  if (offset  <   0) return SLIDE_HIDDEN_LEFT;
  return SLIDE_HIDDEN_RIGHT;
}

/** Wraps offset to the shortest arc around the ring */
function normalizeOffset(raw: number): number {
  const half = Math.floor(TOTAL / 2);
  if (raw >  half) return raw - TOTAL;
  if (raw < -half) return raw + TOTAL;
  return raw;
}

interface SlideProps {
  src:         string;
  alt:         string;
  offset:      number;
  onClickSlide?: () => void;
}
const CarouselSlide = memo(({ src, alt, offset, onClickSlide }: SlideProps) => {
  const abs   = Math.abs(offset);
  const style = getSlideStyle(offset);
  return (
    <div style={style} onClick={abs === 1 ? onClickSlide : undefined}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center"
        loading={abs > 0 ? 'lazy'  : 'eager'}
        decoding={abs > 0 ? 'async' : 'sync'}
        fetchPriority={abs === 0 ? 'high' : 'low'}
      />
      {abs > 0 && <div className="absolute inset-0 bg-black/30" />}
    </div>
  );
});
CarouselSlide.displayName = 'CarouselSlide';

// ─────────────────────────────────────────────────────────────────

interface Props { lang: Lang }

export function AboutSection({ lang }: Props) {
  // Stable translation lookup — recreated only when lang changes
  const t = useCallback(
    (key: string) => translations[lang]?.[key] || translations.en[key] || key,
    [lang]
  );

  const [activeSub,  setActiveSub]  = useState<string>('about-intro');
  const [slideIndex, setSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText('https://proofph.vercel.app').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  // ── Intersection observer (breadcrumb highlight) ──────────────
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

  // ── Auto-advance: ref timer + pauseable on hover ──────────────
  const timerRef  = useRef<ReturnType<typeof setInterval>>();
  const pausedRef = useRef(false);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) setSlideIndex(p => (p + 1) % TOTAL);
    }, 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleMouseEnter = useCallback(() => { pausedRef.current = true;  }, []);
  const handleMouseLeave = useCallback(() => { pausedRef.current = false; }, []);

  // ── Navigation ────────────────────────────────────────────────
  const goTo = useCallback((i: number) => {
    setSlideIndex(((i % TOTAL) + TOTAL) % TOTAL);
    startTimer();
  }, [startTimer]);

  // ── Touch / swipe (stable refs, no re-creation) ───────────────
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) goTo(slideIndex + (diff > 0 ? 1 : -1));
  }, [slideIndex, goTo]);

  return (
    <section className="bg-white">

      {/* ── Sticky Breadcrumb ── */}
      <div className="hidden sm:block sticky top-[50px] z-40 bg-[#f4f1ea] border-b border-[#e5ded4] shadow-sm px-3 py-2 sm:px-6 md:px-10 lg:px-16 xl:px-24 sm:top-[70px] xl:top-[74px]">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage style={{ fontWeight: 700 }}>About Us</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#about-intro" className={activeSub === 'about-intro' ? 'text-[#0a2fad] font-bold' : ''}>
                Intro
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#research" className={activeSub === 'research' ? 'text-[#0a2fad] font-bold hidden sm:block' : 'hidden sm:block'}>
                Our Research
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:block" />
            <BreadcrumbItem>
              <BreadcrumbLink href="#our-team" className={activeSub === 'our-team' ? 'text-[#0a2fad] font-bold hidden md:block' : 'hidden md:block'}>
                The Team
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* ── Intro Header ── */}
      <section id="about-intro" className="border-b border-[#e5ded4] bg-[#f8f7f5] scroll-mt-28">
        <div className="mx-auto max-w-[1400px] px-5 py-14 text-center sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <span className="mb-5 inline-block rounded-full bg-[#0a2fad] px-5 py-2 text-xs tracking-wider text-white uppercase sm:mb-6" style={{ fontWeight: 800 }}>
            {t('about.badge')}
          </span>
          <h1 className="tracking-tight text-[#1a1816] uppercase" style={{ fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}>
            {t('about.title1')} <span className="text-[#0a2fad]">{t('about.title2')}</span>
          </h1>
          <p className="mx-auto mt-5 w-full text-base leading-[1.75] text-[#2d2926] sm:mt-6 sm:text-lg" style={{ fontWeight: 500, textAlign: 'justify', textIndent: '2em' }}>
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
      </section>

      {/* ── 3D Coverflow Carousel ── */}
      <div className="mx-auto max-w-[1400px] px-5 pt-14 sm:px-8 sm:pt-16 md:px-12 md:pt-20 lg:px-16">
        <div
          className="relative h-[280px] w-full overflow-hidden rounded-2xl border border-[#e5ded4] shadow-2xl sm:h-[370px] md:h-[470px] lg:h-[560px] xl:h-[650px]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {groupSlides.map((src, i) => (
            <CarouselSlide
              key={i}
              src={src}
              alt={`Team photo ${i + 1}`}
              offset={normalizeOffset(i - slideIndex)}
              onClickSlide={() => goTo(i)}
            />
          ))}

          {/* Vignettes — pointer-events:none, sit above slides */}
          <div className="pointer-events-none absolute inset-y-0 left-0   z-20 w-24 bg-gradient-to-r from-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0  z-20 w-24 bg-gradient-to-l from-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0    z-20 h-24 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
            {groupSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === slideIndex
                    ? 'h-2.5 w-8 bg-yellow-400'
                    : 'h-2 w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Research Section ── */}
      <section id="research" className="mx-auto max-w-[1400px] border-b border-[#e5ded4] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 scroll-mt-28">
        <div className="group inline-block">
          <h2 className="tracking-tight text-[#0a2fad] uppercase" style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}>
            {lang === 'fil' ? 'Ano ang Aming Pananaliksik?' : lang === 'ceb' ? 'Unsa ang Among Panukiduki?' : 'What is Our Research All About?'}
          </h2>
          <div className="mt-4 mb-6 h-1.5 w-16 rounded-full bg-[#0a2fad] transition-all duration-500 group-hover:w-36" />
        </div>
        <p className="w-full text-base leading-[1.75] text-[#2d2926] sm:text-lg" style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}>
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
        <p className="mt-8 w-full text-base leading-[1.75] text-[#2d2926] sm:text-lg" style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}>
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
      </section>

      {/* ── Team Section ── */}
      <section
        id="our-team"
        className="relative mt-10 sm:mt-14 scroll-mt-28"
        style={{
          backgroundImage: `linear-gradient(rgba(26,24,22,0.85), rgba(26,24,22,0.9)), url("${TEAM_BG}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mb-10 text-center sm:mb-14">
          <div className="group inline-block">
            <h2 className="tracking-tight text-white uppercase" style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}>
              {t('about.team_title1')}{' '}
              <span className="text-yellow-400">{t('about.team_title2')}</span>
            </h2>
            <div className="mx-auto mt-5 h-1.5 w-12 rounded-full bg-yellow-400 transition-all duration-500 group-hover:w-32" />
          </div>
            <p className="mx-auto mt-4 max-w-3xl text-base text-[#d4d0cc] sm:text-lg" style={{ fontWeight: 500, textAlign: 'justify' }}>
              {lang === 'fil'
                ? 'Kilalanin ang mga dedikadong indibidwal sa likod ng P.R.O.O.F., nagkakaisa sa isang pagbabahagi na pangako sa kaligtasan online, digital na kamalayan, at pagbibigay-kapangyarihan sa iba na mag-navigate sa internet nang may responsibilidad.'
                : lang === 'ceb'
                ? 'Hiilha ang mga dedikadong indibidwal sa luyo sa P.R.O.O.F., nagkahiusa sa usa ka hinigtang pangako sa kaligtasan online, digital nga kahibalo, ug paghatag ug gahom sa uban aron mag-navigate sa internet nga may responsibilidad.'
                : 'Meet the dedicated individuals behind P.R.O.O.F., united by a shared commitment to online safety, digital awareness, and empowering others to navigate the internet responsibly.'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-7">
            {teamMembers.map((member, i) => {
              const imgSrc = getMemberImage(member.image);
              return (
                <div
                  key={i}
                  className="group w-[160px] overflow-hidden rounded-xl border border-white/10 bg-[#1c1a18] transition-all duration-200 hover:-translate-y-1.5 hover:border-yellow-400/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:w-[185px] md:w-[200px] lg:w-[210px]"
                >
                  <div className="relative w-full overflow-hidden bg-[#2a2421]" style={{ aspectRatio: '1 / 1' }}>
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={member.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300"
                        style={{ transform: `scale(${member.scale})`, objectPosition: member.position, transformOrigin: 'center top' }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-end justify-center pb-3">
                        <span className="material-symbols-outlined text-5xl text-white/15 sm:text-6xl">person</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-[#1c1a18] px-3 py-3">
                    <p
                      className={`leading-snug text-white ${member.name.length > 30 ? 'text-[10px] sm:text-[11px]' : member.name.length > 25 ? 'text-[11px] sm:text-xs' : 'text-sm sm:text-[15px]'}`}
                      style={{ fontWeight: 800, letterSpacing: '0.01em' }}
                    >
                      {member.name}
                    </p>
                    <p className="mt-0.5 line-clamp-2 whitespace-pre-line text-[11px] leading-snug text-[#c9c4be] sm:text-xs" style={{ fontWeight: 700, letterSpacing: '0.02em' }}>
                      {member.role}
                    </p>
                  <div className="mt-2 h-0.5 w-5 rounded-full bg-yellow-400 transition-all duration-300 group-hover:w-full" />                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <div className="bg-[#1a1816] px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-8 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute top-0 right-0 h-full w-64 bg-yellow-400/5 blur-3xl" />
          <div className="relative z-10 flex flex-col items-center justify-between gap-8 sm:gap-10 lg:flex-row">
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-3 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <span className="material-symbols-outlined hidden text-3xl text-yellow-400 sm:block">campaign</span>
                <h3 className="tracking-tight text-white uppercase" style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)' }}>
                  {t('home.join_title')}
                </h3>
              </div>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#a8a29e] sm:text-base lg:mx-0" style={{ fontWeight: 500, textAlign: 'justify' }}>
              {lang === 'fil'
                ? 'Sumali sa aming Kampanya ng Kamalayan sa Scam at maging bahagi ng isang kilusan na nagbibigay-kapangyarihan sa mga indibidwal na makilala, maiwasan, at maiulat ang online na panloloko. Magkasama, maaari tayong protektahan hindi lamang ang ating sarili kundi pati na rin ang ating pamilya at komunidad mula sa pandaraya at pagkalugi ng pera.'
                : lang === 'ceb'
                ? 'Apil sa among Kampanya sa Kahibalo sa Scam ug mahimong bahin sa usa ka kalihukan nga naghatag ug gahom sa mga indibidwal sa pag-ila, paglikay, ug pag-report sa online nga panlimbong. Magkahiusa, mahimo natong panalipdan dili lamang ang atong kaugalingon kondili pati na ang atong pamilya ug komunidad gikan sa limbong ug pagkawala sa kwarta.'
                : 'Join our Scam Awareness Campaign and become part of a movement that empowers individuals to recognize, prevent, and report online fraud. Together, we can protect not only ourselves but also our families and communities from deception and financial loss.'}
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-4 sm:w-auto sm:flex-row">
              <button
                onClick={handleShare}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-yellow-400 px-8 py-4 text-sm font-bold whitespace-nowrap text-[#1a1816] transition-all hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] sm:text-base"
              >
                <span className="material-symbols-outlined text-lg">
                  {copied ? 'check' : 'share'}
                </span>
                {copied
                  ? (lang === 'fil' ? 'Nakopya!' : lang === 'ceb' ? 'Nakopya!' : 'Copied!')
                  : (lang === 'fil' ? 'Ibahagi' : lang === 'ceb' ? 'Ipaambit' : 'Share')}
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}