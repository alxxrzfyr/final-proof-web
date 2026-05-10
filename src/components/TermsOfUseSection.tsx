import type { Lang } from './data';

interface Props {
  lang: Lang;
  onNavigate: (section: 'home' | 'about-scam' | 'about-us' | 'try-me') => void;
}

const content = {
  en: {
    breadcrumb: 'Home',
    title: 'Terms of Use',
    effectiveDate: 'Effective Date: April 2026',
    lastUpdated: 'Last Updated: April 2026',
    intro:
      'These Terms of Use ("Terms") govern your access to and use of the P.R.O.O.F. (Protect, Recognize, Outsmart, and Fight Online Fraud) Scam Awareness Campaign website ("Website"). By accessing or using this Website, you confirm that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not agree to these Terms, you must immediately cease your use of this Website.',
    sections: [
      {
        number: '01',
        title: 'Acceptance of Terms',
        body: 'Your access to and use of the Website constitutes your unconditional acceptance of these Terms and all applicable laws and regulations. These Terms apply to all visitors, users, and others who access or use the Website. Anthropic reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the Website following the posting of any changes constitutes your acceptance of such changes.',
      },
      {
        number: '02',
        title: 'Purpose and Scope of the Website',
        body: 'This Website is an educational platform developed and maintained by the P.R.O.O.F. campaign team for the sole purpose of raising public awareness regarding online scams, cybercrime, and digital fraud, with a particular focus on the Philippines. All content published on this Website — including but not limited to scam case studies, quiz scenarios, statistical data, informational articles, and multimedia materials — is intended strictly for informational and educational purposes. Nothing contained herein shall be construed as a substitute for professional legal, financial, or cybersecurity advice.',
      },
      {
        number: '03',
        title: 'No Professional or Legal Advice',
        body: 'The information and materials provided on this Website do not constitute, and should not be interpreted as, legal, financial, or professional cybersecurity advice. The P.R.O.O.F. campaign team makes no representations or warranties that the information on this Website is appropriate for use in your particular jurisdiction or circumstances. If you believe you have been a victim of online fraud or cybercrime, you are strongly encouraged to seek immediate assistance from the appropriate governmental authorities, including but not limited to: the Cybercrime Investigation and Coordinating Center (CICC) at cicc.gov.ph, the Philippine National Police Anti-Cybercrime Group (PNP-ACG), and the National Bureau of Investigation Cybercrime Division (NBI-CCD).',
      },
      {
        number: '04',
        title: 'Accuracy and Reliability of Information',
        body: 'While the P.R.O.O.F. campaign team strives to ensure that all information published on this Website is accurate, current, and reliable, we make no express or implied warranties regarding the completeness, accuracy, reliability, suitability, or availability of the content. All statistical data, figures, and empirical claims presented on this Website are sourced from publicly available reports issued by recognized government agencies, law enforcement bodies, and reputable cybersecurity organizations. The P.R.O.O.F. campaign team shall not be held liable for any errors, omissions, or inaccuracies in the content, nor for any decisions made in reliance thereof.',
      },
      {
        number: '05',
        title: 'Privacy and Data Collection',
        body: 'This Website is designed with user privacy as a foundational principle. We do not collect, store, process, transmit, or share any personally identifiable information from users. All interactive features, including the scam awareness quiz and assessment tools, are executed entirely within your local device environment. No responses, results, or usage data are transmitted to any external server, third-party service, or data repository. By using this Website, you acknowledge and agree that no personal data will be collected from you.',
      },
      {
        number: '06',
        title: 'External Links and Third-Party Content',
        body: 'This Website may contain hyperlinks to external websites operated by governmental agencies, non-governmental organizations, and other third-party entities. These links are provided solely for your convenience and informational reference. The P.R.O.O.F. campaign team does not endorse, control, or assume any responsibility for the content, privacy policies, practices, accuracy, or availability of any third-party websites. Access to and use of any linked external websites is entirely at your own risk and subject to the terms and conditions of those respective websites.',
      },
      {
        number: '07',
        title: 'Intellectual Property Rights',
        body: 'All original content, design elements, text, graphics, illustrations, code, and materials published on this Website are the exclusive intellectual property of the P.R.O.O.F. campaign team and are protected by applicable copyright, trademark, and intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to access and use the content of this Website for personal, non-commercial, educational purposes only. Any reproduction, distribution, modification, transmission, or commercial exploitation of the Website\'s content, in whole or in part, without prior written consent from the P.R.O.O.F. campaign team is strictly prohibited. Attribution is required for any permitted sharing of content for educational purposes.',
      },
      {
        number: '08',
        title: 'Limitation of Liability',
        body: 'To the fullest extent permitted by applicable law, the P.R.O.O.F. campaign team, its members, contributors, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your access to, use of, or inability to use this Website or its content. This limitation applies regardless of the legal theory upon which any claim is based, even if the P.R.O.O.F. campaign team has been advised of the possibility of such damages.',
      },
      {
        number: '09',
        title: 'Prohibited Conduct',
        body: 'By using this Website, you agree not to engage in any conduct that: (a) violates any applicable local, national, or international law or regulation; (b) is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable; (c) attempts to gain unauthorized access to any portion of the Website or its related systems; (d) interferes with or disrupts the integrity or performance of the Website; (e) introduces any viruses, malware, or other harmful code; or (f) uses the Website for any commercial purpose or for any public display without our prior written consent.',
      },
      {
        number: '10',
        title: 'Modifications to the Website and Terms',
        body: 'The P.R.O.O.F. campaign team reserves the right, at its sole discretion, to modify, suspend, or discontinue the Website or any portion thereof at any time, with or without notice. We further reserve the right to amend these Terms at any time. All amendments shall be effective immediately upon posting to the Website. It is your responsibility to review these Terms periodically to remain informed of any updates. Your continued use of the Website following the posting of revised Terms constitutes your binding acceptance of such changes.',
      },
      {
        number: '11',
        title: 'Governing Law',
        body: 'These Terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of the Philippines.',
      },
    ],
    contact:
      'For inquiries or concerns regarding these Terms of Use, please contact the P.R.O.O.F. campaign team through the official communication channels provided on this Website.',
    backBtn: 'Back to Home',
  },
  fil: {
    breadcrumb: 'Tahanan',
    title: 'Mga Tuntunin ng Paggamit',
    effectiveDate: 'Petsa ng Pagkabisa: Abril 2026',
    lastUpdated: 'Huling Na-update: Abril 2026',
    intro:
      'Ang mga Tuntuning ito ng Paggamit ("Mga Tuntunin") ay namamahala sa iyong pag-access at paggamit ng website ng P.R.O.O.F. (Protect, Recognize, Outsmart, and Fight Online Fraud) Scam Awareness Campaign ("Website"). Sa pamamagitan ng pag-access o paggamit sa Website na ito, kinukumpirma mo na nabasa, naintindihan, at sumasang-ayon kang sundin ang mga Tuntuning ito sa kanilang kabuuan.',
    sections: [
      {
        number: '01',
        title: 'Pagtanggap ng mga Tuntunin',
        body: 'Ang iyong pag-access at paggamit sa Website ay bumubuo ng iyong walang kondisyong pagtanggap sa mga Tuntuning ito at sa lahat ng naaangkop na batas at regulasyon. Ang mga Tuntunin ay naaangkop sa lahat ng mga bisita, gumagamit, at iba pang nag-a-access o gumagamit ng Website. Inireserba ng P.R.O.O.F. ang karapatang i-update o baguhin ang mga Tuntuning ito anumang oras nang walang abiso.',
      },
      {
        number: '02',
        title: 'Layunin at Saklaw ng Website',
        body: 'Ang Website na ito ay isang plataporma ng edukasyon na binuo ng koponan ng kampanya ng P.R.O.O.F. para sa layuning mapataas ang kamalayan ng publiko tungkol sa mga online na scam, cybercrime, at digital na panloloko, na may partikular na pokus sa Pilipinas. Ang lahat ng nilalaman na inilathala sa Website na ito ay nilalayon nang mahigpit para sa mga layuning pang-impormasyon at pang-edukasyon lamang.',
      },
      {
        number: '03',
        title: 'Walang Propesyonal o Legal na Payo',
        body: 'Ang impormasyon at materyales na ibinibigay sa Website na ito ay hindi bumubuo ng legal, pinansyal, o propesyonal na payo sa cybersecurity. Kung naniniwala kang naging biktima ka ng online na panloloko o cybercrime, mahigpit kang hinihikayat na humingi ng tulong mula sa mga naaangkop na awtoridad ng gobyerno, kabilang ang CICC (cicc.gov.ph), PNP-ACG, at NBI Cybercrime Division.',
      },
      {
        number: '04',
        title: 'Katumpakan ng Impormasyon',
        body: 'Habang nagsisikap ang koponan ng P.R.O.O.F. na tiyaking ang lahat ng impormasyon ay tumpak at maaasahan, walang ginagawang garantiya tungkol sa pagkakumpleto, katumpakan, o pagiging maaasahan ng nilalaman. Ang lahat ng istatistikal na datos ay nagmumula sa mga pampublikong ulat mula sa mga kinikilalang ahensya ng gobyerno at organisasyon ng cybersecurity.',
      },
      {
        number: '05',
        title: 'Privacy at Koleksyon ng Data',
        body: 'Ang Website na ito ay idinisenyo nang may privacy ng gumagamit bilang isang pangunahing prinsipyo. Hindi kami nangongolekta, nag-iimbak, nagpoproseso, nagpapadala, o nagbabahagi ng anumang personal na impormasyon mula sa mga gumagamit. Ang lahat ng mga interactive na feature, kabilang ang scam awareness quiz, ay isinasagawa nang ganap sa loob ng iyong lokal na device.',
      },
      {
        number: '06',
        title: 'Mga Panlabas na Link',
        body: 'Ang Website na ito ay maaaring maglaman ng mga hyperlink sa mga panlabas na website. Ang mga link na ito ay ibinibigay lamang para sa iyong kaginhawahan. Hindi tinatanggap ng koponan ng P.R.O.O.F. ang anumang responsibilidad para sa nilalaman o mga patakaran sa privacy ng anumang third-party na website.',
      },
      {
        number: '07',
        title: 'Mga Karapatan sa Intellectual Property',
        body: 'Ang lahat ng orihinal na nilalaman, mga elemento ng disenyo, teksto, mga grapiko, code, at materyales na inilathala sa Website na ito ay eksklusibong pag-aari ng intelektwal ng koponan ng kampanya ng P.R.O.O.F. Ang anumang pagpaparami, pamamahagi, o komersyal na paggamit nang walang nakaraang nakasulat na pahintulot ay mahigpit na ipinagbabawal.',
      },
      {
        number: '08',
        title: 'Limitasyon ng Pananagutan',
        body: 'Sa pinakamataas na antas na pinahihintulutan ng naaangkop na batas, ang koponan ng P.R.O.O.F. ay hindi mananagot para sa anumang direkta, hindi direkta, o kahihinatnan na pinsala na nagmumula sa iyong pag-access o paggamit sa Website na ito.',
      },
      {
        number: '09',
        title: 'Ipinagbabawal na Pag-uugali',
        body: 'Sa pamamagitan ng paggamit sa Website na ito, sumasang-ayon kang huwag makisali sa anumang pag-uugali na lumalabag sa naaangkop na batas, nakakasama, nagbabanta, nang-aabuso, o kaya ay nakakagambala sa integridad o pagganap ng Website.',
      },
      {
        number: '10',
        title: 'Mga Pagbabago sa Website at Mga Tuntunin',
        body: 'Inireserba ng koponan ng P.R.O.O.F. ang karapatang baguhin, suspindihin, o itigil ang Website anumang oras. Ang lahat ng mga susog sa Mga Tuntunin ay magiging epektibo agad sa pag-post sa Website. Responsibilidad mo ang pana-panahong suriin ang Mga Tuntuning ito.',
      },
      {
        number: '11',
        title: 'Namamahalang Batas',
        body: 'Ang mga Tuntuning ito ay pamamahalaan at bibigyang-kahulugan alinsunod sa mga batas ng Republika ng Pilipinas. Ang anumang mga hindi pagkakaunawaan na nagmumula sa ilalim ng o may kaugnayan sa mga Tuntuning ito ay sasailalim sa eksklusibong hurisdiksyon ng mga may kakayahang hukuman ng Pilipinas.',
      },
    ],
    contact:
      'Para sa mga katanungan o alalahanin tungkol sa Mga Tuntuning ito ng Paggamit, mangyaring makipag-ugnayan sa koponan ng kampanya ng P.R.O.O.F. sa pamamagitan ng mga opisyal na channel ng komunikasyon na ibinigay sa Website na ito.',
    backBtn: 'Bumalik sa Tahanan',
  },
  ceb: {
    breadcrumb: 'Panimalay',
    title: 'Mga Tuntunin sa Paggamit',
    effectiveDate: 'Petsa sa Pagka-epektibo: Abril 2026',
    lastUpdated: 'Katapusang Na-update: Abril 2026',
    intro:
      'Kini nga mga Tuntunin sa Paggamit ("Mga Tuntunin") nagdumala sa imong pag-access ug paggamit sa website sa P.R.O.O.F. (Protect, Recognize, Outsmart, and Fight Online Fraud) Scam Awareness Campaign ("Website"). Pinaagi sa pag-access o paggamit sa Website, gikunsad mo nga nabasa, nasabtan, ug nagkauyon ka nga sundon ang mga Tuntunin sa ilang tibuok. Kon dili ka mouyon sa mga Tuntunin, kinahanglan kang mohunong dayon sa paggamit sa Website.',
    sections: [
      {
        number: '01',
        title: 'Pagdawat sa mga Tuntunin',
        body: 'Ang imong pag-access ug paggamit sa Website nagkonsistente sa imong walay kondisyon nga pagdawat niini nga mga Tuntunin ug sa tanan nga angay nga balaod ug regulasyon. Ang mga Tuntunin magamit sa tanan nga mga bisita, tiggamit, ug uban pa nga nag-access o naggamit sa Website. Gitagana sa P.R.O.O.F. ang katungod sa pag-update o pagbag-o niini nga mga Tuntunin sa bisan unsang oras nga walay abiso. Ang imong padayon nga paggamit sa Website pagkahuman sa pag-post sa bisan unsang mga pagbabag-o nagkonsistente sa imong pagtanggap sa maong mga pagbabag-o.',
      },
      {
        number: '02',
        title: 'Katuyoan ug Sakop sa Website',
        body: "Kini nga Website usa ka edukasyonal nga plataporma nga gihimo ug gipadayon sa koponan sa kampanya sa P.R.O.O.F. alang sa bugtong katuyoan sa pagpataas sa kahibalo sa publiko bahin sa mga online nga scam, cybercrime, ug digital nga panlimbong, nga adunay espesyal nga pokus sa Pilipinas. Ang tanan nga sulod nga gipatik sa Website — lakip apan dili limitado sa mga case study sa scam, mga senaryo sa quiz, estadistikal nga datos, mga impormasyon nga artikulo, ug multimedia nga materyales — gilaraw alang lamang sa impormasyon ug edukasyonal nga mga katuyoan. Wala'y sulod niini ang mahimong hubaron isip sustituto alang sa propesyonal nga legal, pinansyal, o cybersecurity nga payo.",
      },
      {
        number: '03',
        title: 'Walay Propesyonal o Legal nga Tambag',
        body: 'Ang impormasyon ug mga materyales nga gihatag sa Website dili nagkonsistente, ug dili kinahanglan ihulagway, nga legal, pinansyal, o propesyonal nga payo sa cybersecurity. Ang koponan sa kampanya sa P.R.O.O.F. wala naghatag ug bisan unsang pagbantay o garantiya nga ang impormasyon sa Website angay alang sa paggamit sa imong partikular nga hurisdiksyon o sirkumstansya. Kon nagtuo ka nga naging biktima ka sa online nga panlimbong o cybercrime, gipalig-on kang mangita dayon ug tabang gikan sa angay nga mga awtoridad sa gobyerno, lakip ang: ang Cybercrime Investigation and Coordinating Center (CICC) sa cicc.gov.ph, ang Philippine National Police Anti-Cybercrime Group (PNP-ACG), ug ang National Bureau of Investigation Cybercrime Division (NBI-CCD).',
      },
      {
        number: '04',
        title: 'Katumpakan ug Pagkamaaasahan sa Impormasyon',
        body: 'Bisan naningkamot ang koponan sa P.R.O.O.F. nga masigurado nga ang tanan nga impormasyon nga gipatik sa Website husto, karon, ug maaasahan, wala kami naghatag ug bisan unsang klaro o gipasabot nga garantiya bahin sa pagkakompleto, katumpakan, pagkamaaasahan, pagka-angay, o pagkamaabot sa sulod. Ang tanan nga estadistikal nga datos, numero, ug empirikal nga mga pag-angkon nagagikan sa publiko nga mga ulat gikan sa mga kinikilalang ahensya sa gobyerno, mga puwersa sa pagpatuman sa balaod, ug reputadong mga organisasyon sa cybersecurity. Ang koponan sa P.R.O.O.F. dili manubag sa bisan unsang mga sayop, pagkalaktaw, o dili katumpakan sa sulod, ni alang sa bisan unsang mga desisyon nga gihimo base sa maong sulod.',
      },
      {
        number: '05',
        title: 'Pribasidad ug Koleksyon sa Datos',
        body: 'Kini nga Website gilaraw nga adunay pribasidad sa tiggamit isip pundasyon nga prinsipyo. Wala kami magkolekta, mag-imbak, magproseso, magpadala, o magpaambit ug bisan unsang personal nga impormasyon gikan sa mga tiggamit. Ang tanan nga interactive nga mga feature, lakip ang scam awareness quiz ug mga kasangkapan sa pagtuki, gipatuman sulod sa imong lokal nga device. Walay mga tubag, resulta, o datos sa paggamit ang gipadala sa bisan unsang panlabas nga server o serbisyo. Pinaagi sa paggamit sa Website, gikunsad mo nga walay personal nga datos ang makolekta gikan kanimo.',
      },
      {
        number: '06',
        title: 'Mga Panlabas nga Link ug Sulod sa Ikatulo nga Partido',
        body: 'Kini nga Website mahimong adunay mga hyperlink sa mga panlabas nga website nga gipadagan sa mga ahensya sa gobyerno, mga non-governmental organization, ug uban pang mga ikatulo nga partido. Kini nga mga link gihatag lamang alang sa imong kaginhawaan ug reperensya sa impormasyon. Ang koponan sa P.R.O.O.F. wala nagendorso, nagkontrol, o nagdawat ug bisan unsang responsibilidad alang sa sulod, mga patakaran sa pribasidad, mga gawi, katumpakan, o pagkamaabot sa bisan unsang website sa ikatulo nga partido. Ang pag-access ug paggamit sa bisan unsang linked nga panlabas nga website anaa sa imong kaugalingong peligro ug napailalom sa mga tuntunin ug kondisyon sa maong mga website.',
      },
      {
        number: '07',
        title: 'Mga Katungod sa Intellectual Property',
        body: 'Ang tanan nga orihinal nga sulod, mga elemento sa disenyo, teksto, mga grapiko, mga ilustrasyon, code, ug mga materyales nga gipatik sa Website eksklusibong intelektwal nga propriedad sa koponan sa kampanya sa P.R.O.O.F. ug gipanalipdan sa angay nga mga balaod sa copyright, trademark, ug intellectual property. Gihatagan ka ug limitado, dili eksklusibo, dili maisalin nga lisensya aron ma-access ug magamit ang sulod sa Website alang sa personal, dili komersyal, edukasyonal nga mga katuyoan lamang. Ang bisan unsang pagpanamkon, pamamahagi, pagbag-o, pagsalin, o komersyal nga paggamit sa sulod sa Website, tibuok o bahin, nga walay nauna nga nakasulat nga pahintulot gikan sa koponan sa P.R.O.O.F. mahigpit nga gidili.',
      },
      {
        number: '08',
        title: 'Limitasyon sa Pananagutan',
        body: 'Sa pinakataas nga antas nga gitugot sa angay nga balaod, ang koponan sa P.R.O.O.F., ang iyang mga miyembro, kontribyutor, ug mga kauban dili mananagot sa bisan unsang direkta, dili direkta, aksidental, espesyal, sunod-sunod, o punitivong mga kadaot nga nagagikan sa imong pag-access, paggamit, o kawad-on sa kakayahan sa paggamit sa Website o sa iyang sulod. Kini nga limitasyon magamit bisan unsa pa ang legal nga teorya nga gigamit alang sa bisan unsang pag-angkon, bisan kon ang koponan sa P.R.O.O.F. gisultian na sa posibilidad sa maong mga kadaot.',
      },
      {
        number: '09',
        title: 'Gidid-an nga Paggawi',
        body: 'Pinaagi sa paggamit sa Website, nagkauyon ka nga dili makigbahin sa bisan unsang paggawi nga: (a) nakalapas sa bisan unsang angay nga lokal, nasyonal, o internasyonal nga balaod o regulasyon; (b) dili legal, makadaot, mapanganib, mapangabuso, nagsupak, manumbalik, o kung dili man masakit; (c) nagtingkagaw sa dili awtorisadong pag-access sa bisan unsang bahin sa Website o sa iyang mga may kaugnayan nga sistema; (d) nakaapekto o nakabalda sa integridad o pagganap sa Website; (e) nagpaila sa bisan unsang mga virus, malware, o uban pang makadaot nga code; o (f) naggamit sa Website alang sa bisan unsang komersyal nga katuyoan o alang sa bisan unsang publikong display nga walay nauna nga nakasulat nga pahintulot.',
      },
      {
        number: '10',
        title: 'Mga Pagbag-o sa Website ug Mga Tuntunin',
        body: 'Gitagana sa koponan sa P.R.O.O.F. ang katungod, sa iyang bugtong diskresyon, sa pagbag-o, pagsuspend, o paghunong sa Website o bisan unsang bahin niini sa bisan unsang oras, uban o walay abiso. Gitagana usab namon ang katungod sa pag-amyenda niini nga mga Tuntunin sa bisan unsang oras. Ang tanan nga mga susog magka-epekto dayon sa pag-post sa Website. Responsibilidad mo ang pana-panahong pagsusi niini nga mga Tuntunin aron mahibalan ang bisan unsang mga update. Ang imong padayon nga paggamit sa Website pagkahuman sa pag-post sa mga gibag-o nga Tuntunin nagkonsistente sa imong nagtakda nga pagtanggap sa maong mga pagbabag-o.',
      },
      {
        number: '11',
        title: 'Namamahala nga Balaod',
        body: 'Kini nga mga Tuntunin pagadumalaon ug hubaron sumala sa mga balaod sa Republika sa Pilipinas, nga walay pagtagad sa iyang mga probisyon sa panagbangi sa balaod. Ang bisan unsang mga hindi pagkakauyon nga nagagikan sa ilalim sa o may koneksyon sa niini nga mga Tuntunin mapailalom sa eksklusibong hurisdiksyon sa mga kompetenteng korte sa Pilipinas.',
      },
    ],
    contact:
      'Para sa mga pangutana o alalahanon bahin sa mga Tuntunin sa Paggamit, palihug makig-ugnay sa koponan sa kampanya sa P.R.O.O.F. pinaagi sa mga opisyal nga channel sa komunikasyon nga gihatag sa Website.',
    backBtn: 'Balik sa Panimalay',
  },
};

export function TermsOfUseSection({ lang, onNavigate }: Props) {
  const t = content[lang] ?? content.en;

  return (
    <section className="min-h-screen w-full bg-[#f4f1ea]">
      {/* Top bar */}
      <div className="border-b border-[#e0d9cf] bg-[#f4f1ea]">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#5c544d] transition-colors hover:text-[#0a2fad]"
            style={{ fontWeight: 600 }}
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {t.backBtn}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-10 border-b border-[#d4cdc4] pb-8 sm:mb-12 sm:pb-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full border border-[#0a2fad]/20 bg-[#0a2fad]/8 px-3 py-1 text-xs uppercase tracking-widest text-[#0a2fad]"
              style={{ fontWeight: 700 }}
            >
              {lang === 'fil' ? 'Legal na Dokumento' : lang === 'ceb' ? 'Legal nga Dokumento' : 'Legal Document'}
            </span>
          </div>
          <h1
            className="mb-4 text-3xl leading-tight tracking-tight text-[#1a1816] sm:text-4xl lg:text-5xl"
            style={{ fontWeight: 900 }}
          >
            {t.title}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#5c544d]" style={{ fontWeight: 500 }}>
            <span>{t.effectiveDate}</span>
            <span className="hidden sm:inline text-[#d4cdc4]">|</span>
            <span>{t.lastUpdated}</span>
          </div>
        </div>

        {/* Intro */}
        <div className="mb-10 rounded-xl border border-[#d4cdc4] bg-white px-6 py-6 sm:px-8 sm:py-7">
        <p
          className="text-justify text-sm leading-8 text-[#2d2926] sm:text-base"
          style={{ fontWeight: 500 }}
        >
          {t.intro}
        </p>
        </div>

        {/* Sections */}
        <div className="space-y-0 overflow-hidden rounded-xl border border-[#d4cdc4] bg-white divide-y divide-[#e0d9cf]">
          {t.sections.map((sec) => (
            <div
              key={sec.number}
              className="group px-6 py-7 transition-colors hover:bg-[#f8f7f5] sm:px-8 sm:py-8"
            >
              <div className="flex items-start gap-5 sm:gap-6">
                {/* Number */}
                <div className="mt-0.5 shrink-0">
                  <span
                    className="block text-xs tabular-nums text-[#0a2fad] sm:text-sm"
                    style={{
                      fontWeight: 800,
                      fontVariantNumeric: 'tabular-nums',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {sec.number}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h2
                    className="mb-4 text-sm uppercase tracking-wide text-[#1a1816] sm:text-base"
                    style={{ fontWeight: 800 }}
                  >
                    {sec.title}
                  </h2>

                  <div
                    className="space-y-4 text-sm leading-7 text-[#3d3530] sm:text-base"
                    style={{ fontWeight: 500 }}
                  >
                    {/* Normal paragraph */}
                    <p className="text-justify">
                      {sec.body
                        .replace(/—/g, ',')
                        .split('(a)')[0]
                        .trim()}
                    </p>

                    {/* Bulleted legal clauses */}
                    {sec.body.includes('(a)') && (
                      <div className="space-y-3 pl-2">
                        {sec.body
                          .match(/\([a-f]\).*?(?=\([a-f]\)|$)/g)
                          ?.map((clause, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a2fad]" />

                              <p className="flex-1 text-justify">
                                {clause.trim()}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact note */}
        <div className="mt-8 rounded-xl border border-[#d4cdc4] bg-[#1a1816] px-6 py-6 sm:px-8 sm:py-7">
          <div className="flex gap-4">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-xl text-[#f4f1ea]/60">
              info
            </span>
            <p className="text-sm leading-relaxed text-[#f4f1ea]/80 sm:text-base" style={{ fontWeight: 500 }}>
              {t.contact}
            </p>
          </div>
        </div>

        {/* Back button bottom */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#0a2fad] px-6 py-3.5 text-sm text-white transition-colors hover:bg-[#1a1816] sm:text-base"
            style={{ fontWeight: 700 }}
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {t.backBtn}
          </button>
        </div>
      </div>
    </section>
  );
}