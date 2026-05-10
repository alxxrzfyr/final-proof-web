import { useRef, useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { quizScenarios, translations, type Lang, type QuizScenario } from './data';
import {
  EmailMockup,
  SMSMockup,
  PhoneCallMockup,
  MessengerMockup,
  PopupMockup,
  MarketplaceMockup,
} from './MockupComponents';

const BRAND_KEYS = [
  'gcash','bdo','bpi','globe','smart','maya','lbc','shopee','lazada',
  'metrobank','facebook','netflix','citibank','landbank','dito','tnt',
  'jt','bir','meralco','sss','philhealth','nbi','pnp','pldt',
];

function normalizeBrand(sender: string): string {
  const s = sender.toLowerCase();
  return BRAND_KEYS.find(b => s.includes(b)) ?? sender;
}

function renderScenarioMockup(scenario: QuizScenario) {
  const { medium, sender, senderDetail, subject, body, cta } = scenario;
  const brand = normalizeBrand(sender);

  switch (medium) {
    case 'Email':
      return (
        <EmailMockup
          from={senderDetail}
          brand={brand}
          subject={subject ?? ''}
          body={body}
          cta={cta}
        />
      );
    case 'SMS':
      return (
        <SMSMockup
          sender={sender}
          senderDetail={senderDetail}
          body={body}
        />
      );
    case 'Phone Call':
      return (
        <PhoneCallMockup
          caller={sender}
          brand={brand}
          body={body}
        />
      );
    case 'Social Media':
    case 'Dating App':
      return (
        <MessengerMockup
          sender={sender}
          brand={brand}
          body={body}
          isVerified={false}
        />
      );
    case 'Pop-up':
      return (
        <PopupMockup
          body={body}
          cta={cta}
          domain={senderDetail || undefined}
        />
      );
    case 'Marketplace':
      return (
        <MarketplaceMockup
          seller={sender}
          title={subject ?? 'Item for Sale'}
          price={scenario.mockupExtra?.price ?? '₱0'}
          description={body}
          accountAge={scenario.mockupExtra?.accountAge}
          reviews={scenario.mockupExtra?.reviews}
          tags={scenario.mockupExtra?.tags}
        />
      );
    default:
      return null;
  }
}

interface Props {
  lang: Lang;
  onNavigate: (section: string) => void;
}

function getMediumIcon(medium: string) {
  switch (medium) {
    case 'Email':       return 'mail';
    case 'SMS':         return 'sms';
    case 'Phone Call':  return 'call';
    case 'Social Media':return 'chat_bubble';
    case 'Marketplace': return 'storefront';
    case 'Dating App':  return 'favorite';
    case 'Pop-up':      return 'open_in_browser';
    default:            return 'mail';
  }
}

function getScoreData(score: number, lang: Lang) {
  if (score >= 23)
    return {
      label:
        lang === 'fil' ? 'Napakahusay na Kamalayan'
        : lang === 'ceb' ? 'Talagsaon nga Kahibalo'
        : 'Exceptional Awareness',
      icon: 'emoji_events',
      color: 'text-yellow-500',
      message:
        lang === 'fil'
          ? 'Ang inyong mga resulta ay nagpapakita ng napakahusay na pag-unawa sa mga digital na banta. Hinihikayat ka naming ibahagi ang iyong kaalaman para mapalakas ang kamalayan ng komunidad.'
          : lang === 'ceb'
          ? 'Ang imong mga resulta nagpakita sa talagsaon nga pagsabut sa mga digital nga hulga. Gipalig-on ka namon sa pagpaambit sa imong kahibalo aron mapalakas ang kahibalo sa komunidad.'
          : 'Your results show an exceptional understanding of digital threats. We encourage you to share your knowledge and help protect others in your community.',
    };
  if (score >= 18)
    return {
      label:
        lang === 'fil' ? 'Mahusay na Kamalayan'
        : lang === 'ceb' ? 'Maayo nga Kahibalo'
        : 'Proficient Awareness',
      icon: 'thumb_up',
      color: 'text-green-500',
      message:
        lang === 'fil'
          ? 'Ang inyong mga resulta ay nagpapakita ng matibay na pag-unawa sa mga karaniwang scam. Gayunpaman, ang karagdagang pagsusuri ng Scam Information Center ay makatutulong pa lalo.'
          : lang === 'ceb'
          ? 'Ang imong mga resulta nagpakita sa lig-on nga pagsabut sa komon nga mga scam. Apan, ang dugang nga pagsusi sa Scam Information Center makatabang pa lalo.'
          : 'You have a solid understanding of common scams. Reviewing the Scam Information Center will help close any remaining gaps.',
    };
  if (score >= 12)
    return {
      label:
        lang === 'fil' ? 'Nalilinang na Kamalayan'
        : lang === 'ceb' ? 'Nagtubo nga Kahibalo'
        : 'Developing Awareness',
      icon: 'insights',
      color: 'text-blue-500',
      message:
        lang === 'fil'
          ? 'Ang inyong pagtatasa ay nagmumungkahi ng nalilinang na kamalayan sa mga cyber threat. Lubos naming inirerekomenda ang paggamit ng mga mapagkukunan sa Scam Information Center.'
          : lang === 'ceb'
          ? 'Ang imong pagtuki nagsugyot sa nagtubo nga kahibalo sa mga cyber threats. Gitambagan ka namo nga gamiton ang mga kahinguhaan sa Scam Information Center.'
          : 'Your awareness is developing. We highly recommend visiting the Scam Information Center to better protect yourself.',
    };
  return {
    label:
      lang === 'fil' ? 'Nangangailangan ng Agarang Pagbabantay'
      : lang === 'ceb' ? 'Nagkinahanglan ug Dayon nga Pagbantay'
      : 'Requires Immediate Vigilance',
    icon: 'report_problem',
    color: 'text-red-500',
    message:
      lang === 'fil'
        ? 'Ang inyong mga resulta ay nagpapakita ng kritikal na pangangailangan para sa mas mahusay na digital na kamalayan. Lubos na inirerekomenda ang pagsusuri ng lahat ng materyales sa Scam Information Center.'
        : lang === 'ceb'
        ? 'Ang imong mga resulta nagpakita sa kritikal nga panginahanglan alang sa mas maayo nga digital nga kahibalo. Kusganong gitambagan kang susihon ang tanan nga materyales sa Scam Information Center.'
        : 'Your results highlight a critical need for improved digital awareness. Please review all materials in the Scam Information Center to protect yourself from online threats.',
  };
}

export function TryMeSection({ lang, onNavigate }: Props) {
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [answered, setAnswered]         = useState(false);
  const [selectedScam, setSelectedScam] = useState<boolean | null>(null);
  const [showNext, setShowNext]         = useState(false);
  const [completed, setCompleted]       = useState(false);
  const [streak, setStreak]             = useState(0);
  const [showClues, setShowClues]       = useState(false);
  const [mobileTab, setMobileTab]       = useState<'scenario' | 'action'>('scenario');
  const [transitioning, setTransitioning] = useState(false);

  const scenario  = quizScenarios[currentIndex];
  const isCorrect = selectedScam === scenario.isScam;
  const scoreData = getScoreData(score, lang);

  const scrollSectionToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswer = (pickedScam: boolean) => {
    if (answered) return;
    setSelectedScam(pickedScam);
    setAnswered(true);
    const correct = pickedScam === scenario.isScam;
    if (correct) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setShowNext(true);
      setMobileTab('action');
    }, 500);
  };

// Replace the entire handleNext function (lines 213–225)
const handleNext = () => {
  if (currentIndex >= 24) {
    setCompleted(true);
    return;
  }
  setTransitioning(true);
  setTimeout(() => {
    setCurrentIndex(i => i + 1);
    setAnswered(false);
    setSelectedScam(null);
    setShowNext(false);
    setShowClues(false);
    setMobileTab('scenario');
    requestAnimationFrame(() => {
      setTransitioning(false);
      setTimeout(scrollSectionToTop, 60);
    });
  }, 280);
};

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedScam(null);
    setShowNext(false);
    setCompleted(false);
    setStreak(0);
    setShowClues(false);
    setMobileTab('scenario');
    requestAnimationFrame(() => setTimeout(scrollSectionToTop, 60));
  };

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen w-full flex-1 flex-col bg-[#f8f7f5]"
    >

      {/* ── Completion Dialog ── */}
      <Dialog open={completed} onOpenChange={setCompleted}>
        <DialogContent className="overflow-hidden border-0 bg-white p-0 shadow-2xl sm:max-w-[520px]">

          {/* Score hero */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0a2fad] to-[#061d8a] px-8 pb-8 pt-10 text-center text-white">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
            />
            <div className="relative mx-auto mb-5 flex h-32 w-32 items-center justify-center rounded-full border-[3px] border-white/25 bg-white/10 shadow-2xl ring-8 ring-white/10">
              <div className="text-center">
                <p className="text-5xl leading-none text-white" style={{ fontWeight: 900 }}>{score}</p>
                <p className="mt-0.5 text-sm text-white/50" style={{ fontWeight: 700 }}>/ 25</p>
              </div>
            </div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50" style={{ fontWeight: 700 }}>
              {lang === 'fil' ? 'Kumpleto ang Pagtatasa' : lang === 'ceb' ? 'Kompleto ang Pagtuki' : 'Assessment Complete'}
            </p>
            <h2 className="mt-1 text-2xl text-white" style={{ fontWeight: 900 }}>
              {t('quiz.complete_title')}
            </h2>
          </div>

          {/* Performance tier */}
          <div className="flex items-start gap-4 border-b border-[#e5ded4] px-6 py-5">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
              score >= 23 ? 'bg-yellow-50' : score >= 18 ? 'bg-green-50' : score >= 12 ? 'bg-blue-50' : 'bg-red-50'
            }`}>
              <span className={`material-symbols-outlined text-3xl ${scoreData.color}`}>{scoreData.icon}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-base ${scoreData.color}`} style={{ fontWeight: 800 }}>{scoreData.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#5c544d]" style={{ fontWeight: 500 }}>{scoreData.message}</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 divide-x divide-[#e5ded4] border-b border-[#e5ded4]">
            {[
              { val: score,                                label: lang === 'fil' ? 'Tama'       : 'Correct',   color: 'text-green-700', bg: 'bg-green-50/60'  },
              { val: 25 - score,                           label: lang === 'fil' ? 'Mali'       : 'Incorrect', color: 'text-red-700',   bg: 'bg-red-50/60'    },
              { val: `${Math.round((score / 25) * 100)}%`, label: lang === 'fil' ? 'Katumpakan' : 'Accuracy',  color: 'text-[#0a2fad]', bg: 'bg-blue-50/60'   },
            ].map(({ val, label, color, bg }) => (
              <div key={label} className={`py-6 text-center ${bg}`}>
                <p className={`text-3xl ${color}`} style={{ fontWeight: 900 }}>{val}</p>
                <p className={`mt-1.5 text-[11px] uppercase tracking-wider ${color} opacity-70`} style={{ fontWeight: 700 }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 px-6 py-5">
            <button
              onClick={restart}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#0a2fad] px-4 py-4 text-base text-white shadow-md transition-colors hover:bg-blue-800 active:scale-[0.98]"
              style={{ fontWeight: 700 }}
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              {t('quiz.btn_restart')}
            </button>
            <button
              onClick={() => { setCompleted(false); onNavigate('about-scam'); }}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-[#e5ded4] bg-white px-4 py-4 text-base text-[#1a1816] transition-colors hover:bg-[#f8f7f5] active:scale-[0.98]"
              style={{ fontWeight: 700 }}
            >
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Scam Info
            </button>
          </div>

        </DialogContent>
      </Dialog>

      {/* ── Header ── */}
        <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-[#e5ded4] bg-white px-4 py-3 shadow-sm sm:px-6">        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center rounded-xl p-2 text-[#5c544d] transition-colors hover:bg-[#f8f7f5] hover:text-[#1a1816]"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-sm tracking-tight text-[#1a1816] uppercase sm:text-base" style={{ fontWeight: 900 }}>
              {t('quiz.page_title')}
            </h1>
            <p className="text-[11px] text-[#8a8480]" style={{ fontWeight: 600 }}>
              {lang === 'fil' ? 'Interaktibong Pagtatasa' : lang === 'ceb' ? 'Interaktibong Pagtuki' : 'Interactive Assessment'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="flex items-center gap-1.5 rounded-xl border border-orange-100 bg-orange-50 px-3 py-1.5 text-orange-600">
              <span className="material-symbols-outlined text-[15px]">bolt</span>
              <span className="text-sm" style={{ fontWeight: 700 }}>{streak}x</span>
            </div>
          )}
          <div className="border-l border-[#e5ded4] pl-3">
            <span className="block text-[10px] uppercase tracking-widest text-[#8a8480]" style={{ fontWeight: 700 }}>
              {lang === 'fil' ? 'Marka' : 'Score'}
            </span>
            <span className="block text-xl leading-tight text-[#0a2fad]" style={{ fontWeight: 900 }}>
              {score}<span className="text-sm text-[#8a8480]">/25</span>
            </span>
          </div>
        </div>
      </header>

      {/* ── Segmented progress bar ── */}
      <div className="sticky top-[57px] z-10 flex h-2 w-full shrink-0 gap-px bg-[#e5ded4]">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 transition-all duration-300"
            style={{
              background:
                i < currentIndex + (answered ? 1 : 0) || (i === currentIndex && answered)
                  ? '#0a2fad'
                  : 'transparent',
            }}
          />
        ))}
      </div>

      {/* ── Main ── */}
      <main className="flex flex-1 flex-col bg-[#f8f7f5] p-3 sm:p-5">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4">

          {/* Question meta bar */}
          <div className="flex shrink-0 items-center justify-between rounded-2xl border border-[#e5ded4] bg-white px-5 py-3.5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0a2fad]/10">
                <span className="material-symbols-outlined text-[18px] text-[#0a2fad]">{getMediumIcon(scenario.medium)}</span>
              </div>
              <div>
                <h2 className="text-base text-[#1a1816]" style={{ fontWeight: 900 }}>
                  {lang === 'fil' ? `Tanong ${currentIndex + 1}` : lang === 'ceb' ? `Pangutana ${currentIndex + 1}` : `Question ${currentIndex + 1}`}
                  <span className="ml-1.5 text-sm text-[#8a8480]" style={{ fontWeight: 400 }}>
                    {lang === 'fil' ? 'sa 25' : lang === 'ceb' ? 'sa 25' : 'of 25'}
                  </span>
                </h2>
                <p className="text-xs text-[#8a8480]" style={{ fontWeight: 500 }}>{scenario.medium}</p>
              </div>
            </div>
            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-[#0a2fad]" style={{ fontWeight: 700 }}>
              {scenario.category}
            </span>
          </div>

          {/* Mobile tab switcher */}
          <div className="flex rounded-2xl border border-[#e5ded4] bg-white p-1 shadow-sm md:hidden">
            <button
              onClick={() => setMobileTab('scenario')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm transition-all ${mobileTab === 'scenario' ? 'bg-[#0a2fad] text-white shadow-sm' : 'text-[#5c544d] hover:bg-[#f8f7f5]'}`}
              style={{ fontWeight: 700 }}
            >
              <span className="material-symbols-outlined text-[16px]">{getMediumIcon(scenario.medium)}</span>
              {lang === 'fil' ? 'Mensahe' : lang === 'ceb' ? 'Mensahe' : 'Scenario'}
            </button>
            <button
              onClick={() => setMobileTab('action')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm transition-all ${mobileTab === 'action' ? 'bg-[#0a2fad] text-white shadow-sm' : 'text-[#5c544d] hover:bg-[#f8f7f5]'}`}
              style={{ fontWeight: 700 }}
            >
              <span className="material-symbols-outlined text-[16px]">{answered ? 'task_alt' : 'help_outline'}</span>
              {lang === 'fil' ? 'Suriin' : lang === 'ceb' ? 'Susihon' : 'Assess'}
              {answered && <span className={`h-2 w-2 rounded-full ${isCorrect ? 'bg-green-400' : 'bg-red-400'}`} />}
            </button>
          </div>

            {/* Two-panel grid */}
            <div
              key={currentIndex}
              className={`grid grid-cols-1 gap-4 md:grid-cols-[3fr_2fr] md:items-start lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] transition-all duration-[280ms] ease-in-out ${
                transitioning
                  ? 'opacity-0 translate-y-5 pointer-events-none'
                  : 'opacity-100 translate-y-0 animate-in fade-in-0 slide-in-from-bottom-4'
              }`}
            >

            {/* ── LEFT: Scenario / Mockup panel ── */}
            <div
              key={currentIndex}
              className={`w-full overflow-hidden rounded-2xl border border-[#e5ded4] bg-[#f8f7f5] shadow-sm animate-in fade-in-0 slide-in-from-bottom-3 duration-300 ${mobileTab === 'action' ? 'hidden md:block' : 'block'}`}
            >
              <div className="p-3 sm:p-4">
                <div className="mx-auto w-full max-w-[620px]">
                  {renderScenarioMockup(scenario)}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Action panel ── */}
            <div
                key={`action-${currentIndex}`}
                className={`flex w-full flex-col gap-3 animate-in fade-in-0 slide-in-from-bottom-3 duration-300 delay-75 ${mobileTab === 'scenario' ? 'hidden md:flex' : 'flex'}`}
              >
              {!answered ? (
                <>
                  {showClues && (
                    <div className="animate-in slide-in-from-top-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                      <h4 className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800" style={{ fontWeight: 800 }}>
                        <span className="material-symbols-outlined text-base">lightbulb</span>
                        {lang === 'fil' ? 'Pahiwatig' : lang === 'ceb' ? 'Timaan' : 'Helpful Hint'}
                      </h4>
                      <p className="text-base leading-relaxed text-[#181A18]" style={{ fontWeight: 500 }}>
                        {scenario.clue}
                      </p>
                    </div>
                  )}

                  <div className="rounded-2xl border border-[#e5ded4] bg-white p-5 shadow-sm">
                    <p className="mb-1 text-[11px] uppercase tracking-widest text-[#3a3530]" style={{ fontWeight: 800 }}>
                      {lang === 'fil' ? 'Suriin ang Mensahe' : lang === 'ceb' ? 'Susihon ang Mensahe' : 'Is this real or a scam?'}
                    </p>
                    <p className="mb-5 text-base leading-snug text-[#1a1816]" style={{ fontWeight: 700 }}>
                      {lang === 'fil' ? 'Ano ang inyong sagot?' : lang === 'ceb' ? 'Unsa ang imong tubag?' : 'Look carefully, then make your call.'}
                    </p>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleAnswer(false)}
                        className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-2 border-green-500 bg-green-50 px-4 py-4 text-base text-green-700 transition-all hover:bg-green-500 hover:text-white active:scale-[0.98]"
                        style={{ fontWeight: 800 }}
                      >
                        <span className="material-symbols-outlined text-xl">verified_user</span>
                        {t('quiz.btn_legit')}
                      </button>
                      <button
                        onClick={() => handleAnswer(true)}
                        className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-2 border-red-500 bg-red-50 px-4 py-4 text-base text-red-700 transition-all hover:bg-red-500 hover:text-white active:scale-[0.98]"
                        style={{ fontWeight: 800 }}
                      >
                        <span className="material-symbols-outlined text-xl">warning</span>
                        {t('quiz.btn_scam')}
                      </button>

                      {!showClues && (
                        <button
                          onClick={() => setShowClues(true)}
                          className="flex items-center justify-center gap-1.5 rounded-xl py-2 text-sm text-[#0a2fad] transition-colors hover:bg-blue-50"
                          style={{ fontWeight: 600 }}
                        >
                          <span className="material-symbols-outlined text-base">help_outline</span>
                          {lang === 'fil' ? 'Humingi ng pahiwatig' : lang === 'ceb' ? 'Pangayog tabang' : 'Need a hint?'}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Result card */}
                  <div className={`animate-in fade-in-0 rounded-2xl border p-5 shadow-sm ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                        <span className={`material-symbols-outlined text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? 'task_alt' : 'error'}
                        </span>
                      </div>
                      <div>
                        <h3 className={`text-base leading-tight ${isCorrect ? 'text-green-800' : 'text-red-800'}`} style={{ fontWeight: 900 }}>
                          {isCorrect
                            ? (lang === 'fil' ? 'Tamang Pagtatasa!' : lang === 'ceb' ? 'Hustong Pagtuki!' : 'Correct!')
                            : (lang === 'fil' ? 'Maling Pagtatasa' : lang === 'ceb' ? 'Sayop nga Pagtuki' : 'Incorrect')}
                        </h3>
                        <p className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-700'}`} style={{ fontWeight: 600 }}>
                          {isCorrect
                            ? (lang === 'fil' ? '+1 Puntos' : '+1 Point Earned')
                            : (lang === 'fil' ? 'Basahin ang paliwanag sa ibaba' : 'Review the explanation below')}
                        </p>
                      </div>
                    </div>

                    <p className="mb-4 rounded-xl bg-white/80 p-4 text-base leading-relaxed text-[#1a1816]" style={{ fontWeight: 500 }}>
                      {scenario.explanation}
                    </p>

                      {showNext && (
                        <button
                          onClick={handleNext}
                          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-4 text-base shadow-md transition-all active:scale-[0.98] ${
                            currentIndex >= 24
                              ? 'border-2 border-[#1a1816] bg-white text-[#1a1816] hover:bg-[#f0efed]'
                              : 'bg-[#0a2fad] text-white hover:bg-blue-800'
                          }`}
                          style={{ fontWeight: 700 }}
                        >
                          {currentIndex >= 24
                            ? (lang === 'fil' ? 'Tingnan ang Ulat' : lang === 'ceb' ? 'Tan-awa ang Ulat' : 'View Final Report')
                            : (lang === 'fil' ? 'Susunod na Tanong' : lang === 'ceb' ? 'Sunod nga Pangutana' : 'Next Scenario')}
                          <span className="material-symbols-outlined text-xl">
                            {currentIndex >= 24 ? 'description' : 'arrow_forward'}
                          </span>
                        </button>
                      )}
                  </div>

                  {/* Red flags */}
                  {scenario.redFlags.length > 0 && (
                    <div className="animate-in slide-in-from-bottom-2 rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">
                      <h4 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-red-900" style={{ fontWeight: 800 }}>
                        <span className="material-symbols-outlined text-base">flag</span>
                        {lang === 'fil' ? 'Mga Palatandaan ng Scam' : lang === 'ceb' ? 'Mga Timailhan sa Scam' : 'Red Flags in This Message'}
                      </h4>
                      <ul className="space-y-2.5">
                        {scenario.redFlags.map((flag, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-base text-[#1a1816]" style={{ fontWeight: 500 }}>
                            <span className="material-symbols-outlined mt-0.5 shrink-0 text-base text-red-700">cancel</span>
                            <span className="leading-snug">{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key takeaway */}
                  {(!isCorrect || scenario.redFlags.length === 0) && (
                    <div className="animate-in slide-in-from-bottom-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                      <h4 className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-[#181A18] " style={{ fontWeight: 800 }}>
                        <span className="material-symbols-outlined text-base">lightbulb</span>
                        {lang === 'fil' ? 'Mahalagang Aral' : lang === 'ceb' ? 'Importante nga Leksyon' : 'Key Takeaway'}
                      </h4>
                      <p className="text-base leading-relaxed text-[#181A18]" style={{ fontWeight: 600 }}>
                        {scenario.clue}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </main>
    </section>
  );
}