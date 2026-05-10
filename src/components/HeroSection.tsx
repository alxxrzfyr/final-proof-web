import { useState, useEffect } from 'react';
import { translations, threatStats, pieData, lineData, type Lang } from './data';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import bg1 from '@/assets/backgrounds/bg-1.jpg';
import bg2 from '@/assets/backgrounds/bg-2.jpg';
import bg3 from '@/assets/backgrounds/bg-3.jpg';
import bg4 from '@/assets/backgrounds/bg-4.png';

interface Props {
  lang: Lang;
  onNavigate: (section: string) => void;
}

const HERO_IMAGES = [bg1, bg2, bg3, bg4];

export function HeroSection({ lang, onNavigate }: Props) {
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;
  const [currentBg, setCurrentBg] = useState(0);
  const [activeSub, setActiveSub] = useState<string>('hero');

// Replace the first useEffect block
useEffect(() => {
  const sectionIds = ['what-is-proof', 'online-scams', 'vulnerable-sector', 'why-this-matters'];

  const handleScroll = () => {
    if (window.scrollY < 80) {
      setActiveSub('hero');
      return;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
      setActiveSub('why-this-matters');
      return;
    }
    const triggerY = window.scrollY + window.innerHeight * 0.3;
    let current = 'hero';
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= triggerY) current = id;
    }
    setActiveSub(current);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const marqueeItemsList = [
    {
      icon: 'visibility',
      text: lang === 'fil' ? 'KAMALAYAN' : lang === 'ceb' ? 'KAHIBALO' : 'AWARENESS',
    },
    { icon: 'verified_user', text: lang === 'fil' ? 'LIGTAS' : lang === 'ceb' ? 'LUWAS' : 'SAFE' },
    {
      icon: 'menu_book',
      text:
        lang === 'fil'
          ? 'DIGITAL NA KARUNUNGAN'
          : lang === 'ceb'
            ? 'DIGITAL NGA KAALAM'
            : 'DIGITAL LITERACY',
    },
    {
      icon: 'psychology',
      text: lang === 'fil' ? 'HANDA' : lang === 'ceb' ? 'ANDAM' : 'READY',
    },
    {
      icon: 'security',
      text: lang === 'fil' ? 'PROTEKTADO' : lang === 'ceb' ? 'GIPANALIPDAN' : 'PROTECTED',
    },
  ];

  const renderMarqueeGroup = (ariaHidden = false) => (
    <div
      className="flex shrink-0 items-center gap-16 pr-16 md:gap-24 md:pr-24"
      aria-hidden={ariaHidden}
    >
      {marqueeItemsList.map((item, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-yellow-400 drop-shadow-md md:text-4xl">
            {item.icon}
          </span>
          <span
            className="text-2xl tracking-widest text-white drop-shadow-md md:text-3xl"
            style={{ fontWeight: 900 }}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative">
      {/* Sticky Sub-navigation Breadcrumbs */}
      <div className="hidden sm:block sticky top-[50px] z-40 bg-[#f4f1ea] border-b border-[#e5ded4] shadow-sm px-3 py-2 sm:px-6 md:px-10 lg:px-16 xl:px-24 sm:top-[70px] xl:top-[74px]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage style={{ fontWeight: activeSub === 'hero' ? 700 : 500 }}>
              {lang === 'fil' ? 'Tahanan' : lang === 'ceb' ? 'Panimalay' : 'Home'}
            </BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#what-is-proof"
              className={activeSub === 'what-is-proof' ? 'text-[#0a2fad] font-bold' : ''}
            >
              {lang === 'fil' ? 'Ano ang P.R.O.O.F?' : lang === 'ceb' ? 'Unsa ang P.R.O.O.F?' : 'What is P.R.O.O.F?'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#online-scams"
              className={activeSub === 'online-scams' ? 'text-[#0a2fad] font-bold hidden sm:block' : 'hidden sm:block'}
            >
              {lang === 'fil' ? 'Mga Online na Scam' : lang === 'ceb' ? 'Mga Online nga Scam' : 'Online Scams'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block" />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#vulnerable-sector"
              className={activeSub === 'vulnerable-sector' ? 'text-[#0a2fad] font-bold hidden md:block' : 'hidden md:block'}
            >
              {lang === 'fil' ? 'Kayo ba ay Mahina?' : lang === 'ceb' ? 'Mahina Ka Ba?' : 'Are You Vulnerable?'}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#why-this-matters"
              className={activeSub === 'why-this-matters' ? 'text-[#0a2fad] font-bold hidden lg:block' : 'hidden lg:block'}
            >
              {lang === 'fil' ? 'Bakit Mahalaga Ito?' : lang === 'ceb' ? 'Nganong Importante Kini?' : 'Why This Matters?'}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      </div>

      {/* Hero with changing background images */}
      <div className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden scroll-mt-32">
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 blur-[3px] transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url("${img}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentBg === i ? 1 : 0,
            }}
          />
        ))}
        {/* Simple dark overlay to unify colors and make text pop */}
        <div className="absolute inset-0 bg-[#1a1816]/80" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pt-24 pb-14 sm:px-8 sm:pt-28 sm:pb-16 md:px-12 lg:px-16 xl:px-24">
          <div className="flex max-w-5xl flex-col gap-5 sm:gap-8">
            <h1
              className="text-4xl leading-[1.2] tracking-tight break-words uppercase sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem]"
              style={{ fontWeight: 900 }}
            >
              <span className="block text-white">{t('hero.title1')}</span>
              <span className="mt-2 block text-yellow-400 sm:mt-3 md:mt-4">{t('hero.title2')}</span>
            </h1>

            <p
              className="max-w-3xl text-lg leading-relaxed text-[#e5ded4] sm:text-xl md:text-2xl"
              style={{ fontWeight: 500 }}
            >
              {t('hero.subtitle')}
            </p>

            <div className="mt-2 flex w-full flex-col gap-3 sm:mt-4 sm:flex-row sm:gap-4">
              <button
                onClick={() => onNavigate('about-scam')}
                className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-yellow-400 px-8 text-base text-[#1a1816] shadow-md transition-colors hover:bg-yellow-500 sm:h-16 sm:w-auto sm:px-12 sm:text-lg"
                style={{ fontWeight: 700 }}
              >
                <span>{t('hero.btn_learn')}</span>
                <span className="material-symbols-outlined text-2xl">menu_book</span>
              </button>
              <a
                href="https://cicc.gov.ph/report/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button
                  className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-yellow-400 px-8 text-base text-[#1a1816] shadow-md transition-colors hover:bg-yellow-500 sm:h-16 sm:w-auto sm:px-12 sm:text-lg"
                  style={{ fontWeight: 700 }}
                >
                  <span>{t('hero.btn_report')}</span>
                  <span className="material-symbols-outlined text-xl">arrow_outward</span>
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Slideshow indicator dots */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBg(i)}
              className={`h-3 w-3 cursor-pointer rounded-full transition-all ${currentBg === i ? 'w-8 bg-yellow-400' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <section className="group relative z-10 flex items-center overflow-hidden border-y-4 border-yellow-400 bg-gradient-to-r from-[#0a2fad] via-blue-800 to-[#0a2fad] py-4 shadow-2xl md:py-6">
        <div className="animate-marquee flex w-max items-center whitespace-nowrap hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {renderMarqueeGroup()}
          {renderMarqueeGroup(true)}
        </div>
      </section>

      {/* What is P.R.O.O.F? */}
      <section id="what-is-proof" className="bg-[#f8f7f5] scroll-mt-32">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <div className="group inline-block">
            <h2 className="tracking-tight text-[#0a2fad] uppercase" style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
              {lang === 'fil' ? 'Ano ang "P.R.O.O.F"?' : lang === 'ceb' ? 'Unsa ang "P.R.O.O.F"?' : 'What is "P.R.O.O.F"?'}
            </h2>
            <div className="mt-4 mb-10 h-1.5 w-16 rounded-full bg-[#0a2fad] transition-all duration-500 group-hover:w-36" />
          </div>
          <p className="w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}>
            {lang === 'fil' ? (
              <>
                Ang <strong>P.R.O.O.F.</strong> (<strong>Program for Responsible Online Operations and Fraud-Awareness</strong>) ay isang <strong>kampanya ng kamalayan sa digital na scam</strong> na dinisenyo upang mapalakas ang <strong>pagtuklas at pag-iwas sa online na scam</strong> sa mga nasa edad na <strong>40 hanggang 65</strong>. Tinutugunan ng kampanya ang lumalaking banta ng <strong>digital na panloloko</strong> sa pamamagitan ng pagtuturo tungkol sa karaniwang taktika tulad ng <strong>phishing</strong>, <strong>mga pekeng alok ng premyo</strong>, <strong>mga mapanlinlang na link</strong>, at <strong>mga pamamaraan ng pagnanakaw ng pagkakakilanlan</strong>. Sa pamamagitan ng praktikal na gabay, ang P.R.O.O.F. ay nagtataguyod ng <strong>responsableng gawi online</strong>, nagpapalakas ng <strong>digital na karunungan</strong>, at nagbibigay sa mga matatanda ng kaalaman at kumpiyansa upang makilala, maiwasan, at tumugon sa mga scam nang epektibo.
              </>
            ) : lang === 'ceb' ? (
              <>
                Ang <strong>P.R.O.O.F.</strong> (<strong>Program for Responsible Online Operations and Fraud-Awareness</strong>) usa ka <strong>kampanya sa kahibalo sa digital nga scam</strong> nga gilaraw aron mapataas ang <strong>pagtuklas ug paglikay sa online nga scam</strong> taliwala sa mga hamtong nga may edad <strong>40 hangtod 65</strong>. Ginaatubang sa kampanya ang nagtubo nga banta sa <strong>digital nga panlimbong</strong> pinaagi sa pagpanudlo bahin sa komon nga mga taktik sama sa <strong>phishing</strong>, <strong>mga peke nga alok sa premyo</strong>, <strong>mga limbong nga link</strong>, ug <strong>mga paagi sa pagkawat sa pagkatawo</strong>. Pinaagi sa praktikal nga giya, ang P.R.O.O.F. nagpasiugda sa <strong>responsableng paggawi online</strong>, nagpalig-on sa <strong>digital nga kahalam</strong>, ug naghatag sa mga hamtong ug kahibalo ug pagsalig aron mailhan, malikayan, ug matubag ang mga scam sa epektibo nga paagi.
              </>
            ) : (
              <>
                <strong>P.R.O.O.F.</strong> (<strong>Program for Responsible Online Operations and
                Fraud-Awareness</strong>) is a <strong>digital scam awareness campaign</strong> designed
                to increase <strong>online scam detection and prevention</strong> among adults aged{' '}
                <strong>40 to 65</strong>. The campaign addresses the growing threat of{' '}
                <strong>digital fraud</strong> by educating individuals on common online scam tactics
                such as <strong>phishing</strong>, <strong>fake prize offers</strong>,{' '}
                <strong>fraudulent links</strong>, and <strong>identity theft schemes</strong>. Through
                practical guidance, P.R.O.O.F. promotes <strong>responsible online behavior</strong>,
                strengthens <strong>digital literacy</strong>, and equips adults with the knowledge and
                confidence needed to recognize, avoid, and respond to online scams effectively.
              </>
            )}
          </p>

          <p className="mt-4 w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}>
            {lang === 'fil' ? (
              <>
                Ang <strong>P.R.O.O.F.</strong> ay isang <strong>kampanya ng kamalayan sa online na scam at pag-iwas sa panloloko</strong> na nagbibigay-kapangyarihan sa mga nasa edad na <strong>40 hanggang 65</strong> na ligtas na mag-navigate sa digital na mundo sa pamamagitan ng pagtuturo kung paano <strong>matukoy ang mga scam</strong>, magsagawa ng <strong>responsableng gawi online</strong>, at <strong>maprotektahan ang kanilang sarili mula sa digital na panloloko</strong>.
              </>
            ) : lang === 'ceb' ? (
              <>
                Ang <strong>P.R.O.O.F.</strong> usa ka <strong>kampanya sa kahibalo sa online nga scam ug pagpugong sa panlimbong</strong> nga naghatag ug gahom sa mga hamtong nga may edad <strong>40 hangtod 65</strong> aron luwas nga molihok sa digital nga kalibutan pinaagi sa pagtudlo kung unsaon <strong>pag-ila sa mga scam</strong>, pagsagop sa <strong>responsableng paggawi online</strong>, ug <strong>pagpanalipod sa ilang kaugalingon gikan sa digital nga panlimbong</strong>.
              </>
            ) : (
              <>
                <strong>P.R.O.O.F.</strong> is an{' '}
                <strong>online scam awareness and fraud-prevention campaign</strong> that empowers adults
                aged <strong>40 to 65</strong> to navigate the digital world safely by teaching them how to{' '}
                <strong>identify scams</strong>, practice{' '}
                <strong>responsible online behavior</strong>, and{' '}
                <strong>protect themselves from digital fraud</strong>.
              </>
            )}
          </p>
          </div>
      </section>

      {/* What are the online scams? */}
      <section id="online-scams" className="border-t border-[#e5ded4] bg-white scroll-mt-32">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
          <h2
            className="mt-5 tracking-tight text-[#0a2fad] uppercase"
              style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            {lang === 'fil'
              ? 'Ano ang mga online na scam?'
              : lang === 'ceb'
                ? 'Unsa ang mga online scam?'
                : 'What are the online scams?'}
          </h2>
          <div className="mt-4 mb-10 h-1.5 w-16 rounded-full bg-[#4a3224]" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {[
              {
                icon: 'mail',
                title: lang === 'fil' ? 'Mga Mensaheng Phishing' : lang === 'ceb' ? 'Mga Mensahe nga Phishing' : 'Phishing Messages',
                desc: lang === 'fil' ? 'Mga mapanlinlang na email at mensahe na nagnanakaw ng inyong impormasyon.' : lang === 'ceb' ? 'Mga limbong nga email ug mensahe nga nagkawat sa imong personal nga impormasyon.' : 'Deceptive emails designed to steal your credentials and personal data.',
                scrollTo: 'phishing-messages',
              },
              {
                icon: 'redeem',
                title: lang === 'fil' ? 'Mga Huwad na Premyo' : lang === 'ceb' ? 'Mga Peke nga Premyo' : 'Fake Prizes',
                desc: lang === 'fil' ? 'Mga alok na masyadong maganda para maging totoo at nagnanakaw ng inyong pera.' : lang === 'ceb' ? 'Mga alok nga daw kaayo maayo aron mahimong tinuod, gilaraw aron makawat sa imong kwarta.' : 'Too-good-to-be-true offers designed to steal your money or information.',
                scrollTo: 'fake-prizes',
              },
              {
                icon: 'link_off',
                title: lang === 'fil' ? 'Mga Mapanlinlang na Link' : lang === 'ceb' ? 'Mga Limbong nga Link' : 'Fraudulent Links',
                desc: lang === 'fil' ? 'Mga mapanganib na URL at website na nagpapanggap na lehitimo.' : lang === 'ceb' ? 'Mga makadaot nga URL nga nagpakaaron-ingnon nga tinuod ug lehitimong mga website.' : 'Malicious URLs that masquerade as trusted and legitimate websites.',
                scrollTo: 'fraudulent-links',
              },
            ].map((card, i) => (
              <button
                key={i}
                onClick={() => { sessionStorage.setItem('scrollTarget', card.scrollTo); onNavigate('about-scam'); }}
                className="group flex cursor-pointer flex-col items-center rounded-xl border border-[#e5ded4] bg-[#f8f7f5] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg sm:p-8"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-white text-[#0a2fad] shadow-sm transition-colors group-hover:bg-[#0a2fad] group-hover:text-white sm:mb-5 sm:h-20 sm:w-20">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl">
                    {card.icon}
                  </span>
                </div>
                <h3
                  className="mb-2 text-lg tracking-tight break-words text-[#1a1816] uppercase sm:mb-3 sm:text-xl"
                  style={{ fontWeight: 800 }}
                >
                  {card.title}
                </h3>
                <p className="text-sm text-[#3d3530] sm:text-base" style={{ fontWeight: 500 }}>
                  {card.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Are you part of the vulnerable sector? */}
      <section id="vulnerable-sector" className="border-t border-[#e5ded4] bg-[#f8f7f5] scroll-mt-32">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16">
        <div className="mb-6 text-center sm:mb-8">
          <h2
            className="mt-5 tracking-tight text-[#0a2fad] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3.5vw, 2.75rem)' }}
          >
            {lang === 'fil'
              ? 'Ikaw ba ay bahagi ng vulnerable sector?'
              : lang === 'ceb'
                ? 'Ikaw ba usa sa vulnerable sector?'
                : 'Are you part of the vulnerable sector?'}
          </h2>
        </div>
        <div className="mb-10 sm:mb-14">
          <div className="mb-6 h-1.5 w-16 rounded-full bg-[#0a2fad]" />
          <p className="w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}>
            {lang === 'fil' ? (
              <>
                Ang mga taong nasa edad na <strong>40 hanggang 65</strong> ay kadalasang tinitingnan bilang mga <strong>may karanasan, malaya, at may kakayahang</strong> indibidwal. Gayunpaman, kahit may mga katangiang ito, maaari pa rin silang maging <strong>mahina sa mga online na scam at digital na panloloko</strong> sa kasalukuyang digital na mundo.
              </>
            ) : lang === 'ceb' ? (
              <>
                Ang mga tawo nga may edad <strong>40 hangtod 65</strong> kasagarang gitan-aw nga mga <strong>may kasinatian, independyente, ug may kakayahan</strong> nga mga indibidwal. Apan, bisan adunay kining mga katangian, mahimo pa silang <strong>mahimong biktima sa mga online nga scam ug digital nga panlimbong</strong> sa karon nga digital nga panahon.
              </>
            ) : (
              <>
                People aged <strong>40 to 65</strong> are often seen as <strong>experienced,
                independent, and capable</strong> individuals. However, even with these qualities,
                they can still be <strong>vulnerable to online scams and digital fraud</strong> in
                today's digital world.
              </>
            )}
          </p>

          <p className="mt-4 w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}>
            {lang === 'fil' ? (
              <>
                Ayon kay Shao et al. (2019), ang mga salik tulad ng <strong>tiwala sa iba</strong>, <strong>panlipunang pagkabukod-bukod</strong>, at <strong>posibleng pagbabago sa kognitibo</strong> ay maaaring makaapekto sa pagpapasya ng isang tao at gawing mas madaling mapalapit sa mga scam. Sinabi rin nina Bairan at Oren (2025) na bagaman maraming mga matatanda sa grupong ito ang madalas gumamit ng <strong>online banking at digital na transaksyon</strong>, ang ilan ay maaaring may <strong>limitadong kamalayan sa cybersecurity</strong> kumpara sa mga nakababata. Dahil dito, maaari silang maging madaling target ng <strong>mga phishing link</strong> at <strong>mga pekeng online na plataporma</strong>. Ipinaliwanag pa ni Tan et al. (2025) na ang mga manloloko ay madalas na sinasamantala ang <strong>tiwala</strong> at <strong>limitadong digital na karunungan</strong> ng mga tao, na maaaring magresulta sa <strong>pagkalugi ng pera</strong> at <strong>emosyonal na stress</strong>. Idinagdag ni Quismundo (2024) na ang labis na pag-asa sa <strong>mga digital na plataporma</strong> nang walang sapat na kaalaman tungkol sa mga online na panganib ay maaaring mapataas ang <strong>kahinaan ng isang tao sa online na panloloko</strong>.
              </>
            ) : lang === 'ceb' ? (
              <>
                Sumala kang Shao et al. (2019), ang mga salik sama sa <strong>pagtuo sa uban</strong>, <strong>katilingbanong pagbulag</strong>, ug <strong>posibleng mga pagbag-o sa kognitibo</strong> mahimong makaapekto sa paghukom sa usa ka tawo ug makapahimo kanilang mas daling matumbayaan sa mga scam. Gipasiugda usab nila Bairan ug Oren (2025) nga bisan daghan ang mga hamtong niini nga grupo nga kanunay naggamit ug <strong>online banking ug digital nga transaksyon</strong>, ang uban mahimong adunay <strong>limitadong kahibalo sa cybersecurity</strong> kumpara sa mga batan-on. Tungod niini, mahimo silang mahimong sayon nga target sa <strong>mga phishing link</strong> ug <strong>mga peke nga online nga plataporma</strong>. Gipojhasan ni Tan et al. (2025) nga ang mga mangilad kasagarang nagpahimuslan sa <strong>pagtuo</strong> ug <strong>limitadong digital nga kahalam</strong> sa mga tawo, nga mahimong makaresulta sa <strong>pagkawala sa kwarta</strong> ug <strong>emosyonal nga kagul-anan</strong>. Gidugang ni Quismundo (2024) nga ang labis nga pag-asa sa <strong>mga digital nga plataporma</strong> nga walay sapat nga kahibalo bahin sa mga online nga peligro makaaumento sa <strong>kahuyang sa online nga panlimbong</strong> sa usa ka tawo.
              </>
            ) : (
              <>
                According to Shao et al. (2019), factors such as <strong>trust in others</strong>,{' '}
                <strong>social isolation</strong>, and <strong>possible cognitive changes</strong> may
                affect a person's judgment and make them more likely to fall for scams. Bairan and Oren
                (2025) also mention that although many adults in this age group frequently use{' '}
                <strong>online banking and digital transactions</strong>, some may still have{' '}
                <strong>limited cybersecurity awareness</strong> compared to younger users. Because of
                this, they may become easy targets for <strong>phishing links</strong> and{' '}
                <strong>fake online platforms</strong>. In addition, Tan et al. (2025) explain that
                scammers often take advantage of people's <strong>trust</strong> and{' '}
                <strong>limited digital literacy</strong>, which may result in{' '}
                <strong>financial loss</strong> and <strong>emotional stress</strong>. Quismundo (2024)
                further states that relying too much on <strong>digital platforms</strong> without enough
                knowledge about online risks can increase a person's{' '}
                <strong>vulnerability to online fraud</strong>.
              </>
            )}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:mb-14 sm:gap-4 md:gap-6 lg:grid-cols-4">
          {threatStats.map((stat, i) => {
            const icons = ['attach_money', 'gavel', 'phishing', 'groups'];
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-[#d6cfc6] bg-white p-6 text-center shadow-sm sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0ede8]">
                  <span className="material-symbols-outlined text-2xl text-[#1a1816]">
                    {icons[i]}
                  </span>
                </div>

                <p
                  className="text-4xl text-[#1a1816] sm:text-5xl lg:text-6xl"
                  style={{ fontWeight: 900, lineHeight: 1 }}
                >
                  {stat.value}
                </p>

                <div>
                  <p
                    className="text-sm uppercase tracking-widest text-[#1a1816] sm:text-base"
                    style={{ fontWeight: 800 }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="mt-1.5 text-xs leading-snug text-[#3d3530] sm:text-sm"
                    style={{ fontWeight: 600 }}
                  >
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row: Pie + Line */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:mb-14 sm:gap-6 lg:grid-cols-2">
          {/* Pie Chart */}
          <div className="overflow-hidden rounded-2xl border border-[#e5ded4] bg-white shadow-sm">
            <div className="border-b border-[#e5ded4] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a2fad]">
                  <span className="material-symbols-outlined text-lg text-white">pie_chart</span>
                </div>
                <div>
                  <h3
                    className="tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 900, fontSize: '1rem' }}
                  >
                    {lang === 'fil' ? 'Mga Uri ng Scam sa Pilipinas' : lang === 'ceb' ? 'Mga Klase sa Scam sa Pilipinas' : 'Scam Types in the Philippines'}
                  </h3>
                  <p className="text-[11px] text-[#5c544d]" style={{ fontWeight: 500 }}>
                    Source: CICC cybercrime complaints (2024)
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="w-full" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={55}
                      paddingAngle={3}
                      label={false}
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={`pie-cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: '1px solid #e5ded4',
                      fontWeight: 700,
                      fontSize: 11,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                  <Legend
                    formatter={(value) => (
                      <span
                        style={{
                          color: '#000',
                          fontWeight: 700,
                          fontSize: '15px',
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="overflow-hidden rounded-2xl border border-[#e5ded4] bg-white shadow-sm">
            <div className="border-b border-[#e5ded4] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
                  <span className="material-symbols-outlined text-lg text-white">show_chart</span>
                </div>
                <div>
                  <h3
                    className="tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 900, fontSize: '1rem' }}
                  >
                    {lang === 'fil' ? 'Trend ng mga Kaso sa Pilipinas' : lang === 'ceb' ? 'Mga Kaso sa Cybercrime (PH)' : 'Reported Cybercrime Cases (PH)'}
                  </h3>
                  <p className="text-[11px] text-[#5c544d]" style={{ fontWeight: 500 }}>
                    Source: PNP-ACG (2023, 2025) and CICC (2024)
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="w-full" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 15, left: -5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5ded4" />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: '#3d3530', fontWeight: 700, fontSize: 13 }}
                    />
                    <YAxis
                      tick={{ fill: '#3d3530', fontWeight: 600, fontSize: 11 }}
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 10,
                        border: '1px solid #e5ded4',
                        fontWeight: 700,
                        fontSize: 13,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()} cases`, '']}
                    />
                    <Line
                      type="monotone"
                      dataKey="cases"
                      stroke="#dc2626"
                      strokeWidth={3}
                      dot={{ fill: '#dc2626', r: 5, strokeWidth: 0 }}
                      activeDot={{ r: 7, strokeWidth: 0 }}
                      name="Cybercrime Cases"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
          {/* Why This Matters ΓÇö open layout, title left, text underneath */}
          <div id="why-this-matters" className="w-full lg:max-w-none scroll-mt-32">
            <div className="group inline-block">
              <h3 className="tracking-tight text-[#0a2fad] uppercase" style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                {lang === 'fil' ? 'Bakit Mahalaga Ito?' : lang === 'ceb' ? 'Nganong Importante Kini?' : 'Why This Matters?'}
              </h3>
              <div className="mt-4 mb-6 h-1.5 w-16 rounded-full bg-[#0a2fad] transition-all duration-500 group-hover:w-36" />
            </div>
            <p
              className="w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
              style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
            >
              {lang === 'fil' ? (
                <>
                  Ang pagkakaroon ng kaalaman at karunungan tungkol sa teknolohiya, lalo na kung paano{' '}
                  <strong>matukoy ang mga scam</strong>, ay mahalaga dahil maraming tao na ngayon ang gumagamit ng internet para sa{' '}
                  <strong>komunikasyon, pamimili, pag-aaral, at pagbabangko</strong>. Sinasamantala ng mga manloloko ang
                  teknolohiya upang linlangin ang mga tao na ibigay ang <strong>pera, mga password, o personal na impormasyon</strong>.
                  Kapag naiintindihan ng mga tao kung paano gumagana ang mga scam, maaari nilang makilala ang mga babala tulad ng{' '}
                  <strong>mga kahina-hinalang link</strong>, <strong>pekeng mensahe</strong>, at mga alok na mukhang{' '}
                  <strong>napakaganda para maging totoo</strong>. Ayon sa <strong>Federal Trade Commission</strong>, patuloy na tumataas
                  ang mga online scam at phishing attack, na ginagawang mahalaga ang{' '}
                  <strong>digital na kamalayan at kaalaman sa cybersecurity</strong> para sa mga gumagamit ng internet.
                </>
              ) : lang === 'ceb' ? (
                <>
                  Ang pagkaon ug kahibalo ug kahalam bahin sa teknolohiya, ilabi na kon unsaon{' '}
                  <strong>pagmatikod ang mga scam</strong>, importante tungod kay daghan na karon ang mga tawo ang naggamit sa internet alang sa{' '}
                  <strong>komunikasyon, pagpalit, pagtuon, ug pagbangko</strong>. Gipahimuslan sa mga mangilad ang teknolohiya
                  aron limbongan ang mga tawo nga ihatag ang <strong>kwarta, mga password, o personal nga impormasyon</strong>.
                  Kon masabtan sa mga tawo kon unsaon pagbuhat sa mga scam, makilala nila ang mga timailhan sama sa{' '}
                  <strong>mga kahina-hinalang link</strong>, <strong>peke nga mensahe</strong>, ug mga alok nga daw{' '}
                  <strong>kaayo maayo aron mahimong tinuod</strong>. Sumala sa <strong>Federal Trade Commission</strong>, nagpadayon ang
                  pagtaas sa mga online scam ug phishing attacks, nga nagpahimo sa{' '}
                  <strong>digital nga kahibalo ug kahalam sa cybersecurity</strong> nga kinahanglan alang sa mga tiggamit sa internet.
                </>
              ) : (
                <>
                  Having knowledge and literacy about technology, especially how to{' '}
                  <strong>detect scams</strong>, is important because many people now use the internet for{' '}
                  <strong>communication, shopping, studying, and banking</strong>. Scammers take advantage of
                  technology to trick people into giving <strong>money, passwords, or personal information</strong>.
                  When people understand how scams work, they can recognize warning signs such as{' '}
                  <strong>suspicious links</strong>, <strong>fake messages</strong>, and offers that seem{' '}
                  <strong>too good to be true</strong>. According to the <strong>Federal Trade Commission</strong>, online scams
                  and phishing attacks continue to increase, making{' '}
                  <strong>digital awareness and cybersecurity knowledge</strong> essential for internet users.
                </>
              )}
            </p>
            <p
              className="mt-4 w-full text-lg leading-relaxed text-[#2d2926] md:text-xl lg:max-w-none"
              style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
            >
              {lang === 'fil' ? (
                <>
                  Ang kaalaman sa teknolohiya ay tumutulong din sa mga tao na <strong>manatiling ligtas</strong> at gumawa ng{' '}
                  <strong>mas matalinong desisyon online</strong>. Pinoprotektahan nito ang mga indibidwal mula sa{' '}
                  <strong>pagkalugi ng pera</strong>, <strong>pagnanakaw ng pagkakakilanlan</strong>, at{' '}
                  <strong>emosyonal na stress</strong>. Bukod dito, ang mga taong may kaalaman tungkol sa kaligtasan online ay maaaring
                  tulungan na <strong>mapag-aralan ang kanilang pamilya at komunidad</strong>, na lumilikha ng mas ligtas na
                  digital na kapaligiran para sa lahat.
                </>
              ) : lang === 'ceb' ? (
                <>
                  Ang kahalam sa teknolohiya nagtabang usab sa mga tawo nga <strong>magpabilin nga luwas</strong> ug maghimog{' '}
                  <strong>mas maalamon nga mga desisyon online</strong>. Nagpanalipod kini sa mga indibidwal gikan sa{' '}
                  <strong>pagkawala sa kwarta</strong>, <strong>pagkawat sa pagkatawo</strong>, ug{' '}
                  <strong>emosyonal nga kagul-anan</strong>. Dugang pa, ang mga tawo nga may kahibalo bahin sa kaligtasan online
                  makatabang sa <strong>pag-edukasyon sa ilang pamilya ug komunidad</strong>, nga nagmugna ug mas luwas nga
                  digital nga kalikopan alang sa tanan.
                </>
              ) : (
                <>
                  Technology literacy also helps people <strong>stay safe</strong> and make{' '}
                  <strong>smarter decisions online</strong>. It protects individuals from{' '}
                  <strong>financial loss</strong>, <strong>identity theft</strong>, and{' '}
                  <strong>emotional stress</strong>. In addition, people who are knowledgeable about online
                  safety can help <strong>educate their families and communities</strong>, creating a safer
                  digital environment for everyone.
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}