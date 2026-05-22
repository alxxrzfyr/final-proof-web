import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { scamTypes, quickJumpPills, type Lang, translations } from './data';

import { ImageWithFallback } from './figma/ImageWithFallback';

import bspLogo from '../assets/backgrounds/bsp-logo.png';
import ciccLogo from '../assets/backgrounds/cicc.png';
import nbiLogo from '../assets/backgrounds/nbi.png';
import pnpAcgLogo from '../assets/backgrounds/pnp-acg-logo.png';

import {
  SMSMockup,
  EmailMockup,
  PhoneCallMockup,
  MessengerMockup,
  MarketplaceMockup,
  PopupMockup,
  ShoppingMockup,
  ShippingReceiptMockup,
  CharityPostMockup,
} from './MockupComponents';

import { BrandLogo } from './BrandLogo';

// Corrected: ui is a sub-folder in the current directory
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const additionalScamInfo: {
  id: string;
  icon: string;
  title: string;
  summary: string;
  tips: string;
  tabs: { label: string; content: any }[];
}[] = [
  {
    id: 'romance',
    icon: 'favorite',
    title: 'Romance Scams',
    summary:
      'Strangers online build emotional trust over weeks, then ask you for money , often pretending to be an OFW, a soldier, or a doctor abroad.',
    tips: 'Never send money or your bank details to someone you have only met online. Ask for a video call. If they always make excuses, it is a scam.',
    tabs: [
      {
        label: 'Via Dating App',
        content: {
          type: 'dating',
          sender: 'Daniel Cruz',
          body: 'Hello po, salamat sa pag-match. I am 58, widower, working as marine engineer in Singapore. I felt a connection reading your profile. Can we move our chat to WhatsApp? My number is +65 8XXX XXXX. ❤️',
          annotations: [
            'Profile is only 2 days old',
            'Asks you to leave the dating app immediately',
            'Claims to work overseas (cannot meet in person)',
          ],
          callout:
            'Real connections take time. If a stranger says "I love you" within days and wants to chat off the app, stop replying.',
        },
      },
      {
        label: 'Via Facebook Messenger',
        content: {
          type: 'messenger',
          sender: 'Capt. Robert Santos',
          senderBadge: 'NEW ACCOUNT',
          body: 'My dear, I need your help. My balikbayan box with my savings is stuck in NAIA customs. Please send ₱15,000 GCash to release it. I will pay you back ten times when I arrive next week. I trust only you. 🙏',
          annotations: [
            'Asks for money for "customs" or "shipping"',
            'Promises to pay back many times more (too good to be true)',
            'Pressure: "next week", "only you"',
          ],
          callout:
            'Customs (BOC) does not collect fees through GCash. No real OFW will ever ask a stranger online for emergency money.',
        },
      },
    ],
  },
  {
    id: 'identity-theft',
    icon: 'badge',
    title: 'Identity Theft',
    summary:
      'Scammers steal photos of your government ID (PhilSys, UMID, driver\u2019s license) and use them to open GCash, Maya, or online loan accounts in your name.',
    tips: 'Never send a clear photo of your ID to anyone on Facebook or Messenger. Cover the ID number with a watermark when needed. Check your records at the BSP Credit Information Corporation if you suspect misuse.',
    tabs: [
      {
        label: 'Fake "Loan Agent" on Facebook',
        content: {
          type: 'messenger',
          sender: 'Quick Cash Lending PH',
          senderBadge: 'NOT REGISTERED WITH SEC',
          body: 'Good day Ma\u2019am! Pre-approved po kayo sa ₱50,000 loan, 0% interest, walang collateral. Send lang po ng clear photo ng PhilID at selfie holding the ID, plus full name, address, at birthday , para mabilis ang release within 1 hour.',
          annotations: [
            'Asks for full ID photo + selfie before any contract',
            'Promises "0% interest" , too good to be true',
            'Not on the SEC list of registered lending companies',
          ],
          callout:
            'A real lender requires a contract first, not your ID photo. Verify lenders at sec.gov.ph before sending anything.',
        },
      },
      {
        label: 'Fake Job Application',
        content: {
          type: 'email',
          from: 'hr@workabroad-recruit-ph.online',
          subject: 'Final Step: Submit Your Documents for Hong Kong Caregiver Job',
          body: 'Congratulations! You passed the initial screening for the Hong Kong caregiver position (₱45,000/month). Please reply with attachments of your: (1) NBI Clearance, (2) PhilID, (3) TIN, (4) selfie holding your ID, and (5) bank account number for salary release.',
          cta: 'REPLY WITH DOCUMENTS NOW',
          annotations: [
            'Asks for full set of IDs before any interview',
            'Suspicious domain: workabroad-recruit-ph.online (real DMW domain is dmw.gov.ph)',
            'Wants your bank account number very early',
          ],
          callout:
            'Real overseas employers process documents through DMW-licensed agencies in person, never by email. Verify at dmw.gov.ph.',
        },
      },
    ],
  },
  {
    id: 'spoofing',
    icon: 'verified',
    title: 'Caller ID & Domain Spoofing',
    summary:
      'Scammers fake the name of trusted brands , BDO, BPI, GCash, LBC , so the call, text, or email looks real on your phone screen.',
    tips: 'Banks and e-wallets in the Philippines NEVER ask for your OTP, password, or PIN. Hang up and call the hotline on the back of your card or in the official app.',
    tabs: [
      {
        label: 'Fake "BPI" Phone Call',
        content: {
          type: 'phone',
          sender: 'BPI Express',
          senderBadge: 'SPOOFED CALLER ID',
          body: 'Good afternoon po. This is Agent Reyes from BPI Fraud Department. We detected a 25,000 online purchase from your account in Cebu. Para mai-block po natin, please give me the 6-digit code I just texted you.',
          annotations: [
            'Caller ID shows "BPI Express" but real BPI uses 89-100 hotline',
            'Asks for the OTP , banks NEVER do this',
            'Pressure: "block it now"',
          ],
          callout:
            'Hang up. Call BPI yourself at 89-100. Your OTP is your password , sharing it gives the scammer full access.',
        },
      },
      {
        label: 'Fake GCash Email',
        content: {
          type: 'email',
          from: 'no-reply@gcash-ph.support',
          subject: 'ALERT: Your GCash account will be suspended in 24 hours',
          body: 'Dear Customer, your GCash account has been flagged for unusual activity. To avoid permanent suspension, please log in within 24 hours to verify your identity.',
          cta: 'VERIFY MY GCASH NOW',
          annotations: [
            'Domain is gcash-ph.support (real domain is gcash.com)',
            'Threat: "permanent suspension in 24 hours"',
            'GCash never sends verification links by email',
          ],
          callout:
            'GCash communicates only inside the GCash app. If in doubt, open the app directly , never click email links.',
        },
      },
    ],
  },
  {
    id: 'sim-swap',
    icon: 'sim_card',
    title: 'SIM Swap Attacks',
    summary:
      'A scammer convinces your telco (Globe, Smart, DITO) to transfer your mobile number to a new SIM in their hands. All your OTPs then go to them , and your GCash and bank accounts get drained.',
    tips: 'If you suddenly lose signal in a place where you normally have signal, contact your telco within minutes. Use an authenticator app (Google Authenticator) instead of SMS for important accounts when possible.',
    tabs: [
      {
        label: 'How a SIM Swap Happens',
        content: {
          type: 'sim-swap',
          body: '',
          annotations: [],
          callout:
            'Set a SIM PIN on your phone. If your phone shows "No Service" for hours without reason, call your telco right away from another phone.',
          extra: {
            steps: [
              'Scammer collects your name, birthday, and number from social media or a leaked database.',
              'They go to a Globe or Smart or DITO kiosk with a fake ID and report your SIM as "lost".',
              'The telco transfers your number to a new SIM the scammer is holding.',
              'Your phone loses signal. All OTPs from GCash, BDO, BPI, and Shopee now go to the scammer.',
              'Within an hour, the scammer empties your e-wallets and bank accounts.',
            ],
            warnings: [
              'You suddenly have no signal in your usual area.',
              'You receive a notice that your SIM was registered to a new device.',
              'Your bank or GCash app forces you to log in again unexpectedly.',
            ],
          },
        },
      },
      {
        label: 'Fake Telco Verification Call',
        content: {
          type: 'phone',
          sender: 'Globe Telecom',
          senderBadge: 'SPOOFED',
          body: 'Good morning po. Ito po si Michael from Globe Customer Care. Nagse-send po kami ng verification dahil may nag-request ng SIM replacement para sa inyong number. Para makapigil po sa unauthorized change, basahin ninyo ang 6-digit code na natanggap ninyo ngayon.',
          annotations: [
            'Globe never calls to ask for your OTP to "block" a SIM replacement',
            'Sharing the code hands your number straight to the scammer',
            'Real telco verifications happen in-store with a valid ID',
          ],
          callout:
            'Hang up and walk into a Globe or Smart store yourself. Never read any code to an incoming caller, no matter who they claim to be.',
        },
      },
    ],
  },
  {
    id: 'otp-call',
    icon: 'call',
    title: 'OTP Extraction Calls',
    summary:
      'Fake "GCash Customer Service", "BDO Fraud Team", or "Maya Support" agents call you and trick you into reading the 6-digit OTP out loud.',
    tips: 'An OTP is the same as your password. NO real bank, telco, or e-wallet in the Philippines will EVER ask you to read it on the phone. If they ask , hang up immediately.',
    tabs: [
      {
        label: 'Fake GCash CSR',
        content: {
          type: 'phone',
          sender: 'GCash Risk Team',
          senderBadge: 'NOT 2882 , FAKE',
          body: 'Hello po. Ako po si Anna Dela Cruz from GCash Risk Team. We saw a 9,800 Lazada purchase from your wallet in Cebu City. To reverse this, basahin po ninyo ang 6-digit code na pinadala namin ngayon para mareverse po natin within 5 minutes.',
          annotations: [
            'Asks you to READ the OTP out loud',
            'Real GCash hotline is 2882, not a +63 mobile number',
            'Pressure: "within 5 minutes"',
            'Background sounds like a noisy call center to seem real',
          ],
          callout:
            'Hang up. Open the GCash app yourself. If a transaction is suspicious, dispute it inside the app , never by giving the OTP.',
        },
      },
      {
        label: 'Fake BDO Verification',
        content: {
          type: 'phone',
          sender: 'BDO Customer Service',
          senderBadge: 'SPOOFED CALLER ID',
          body: 'Good afternoon. This is BDO. We are currently upgrading our system. To keep your account active, please confirm the One-Time Password we just sent. If you do not confirm, your ATM card will be blocked tomorrow.',
          annotations: [
            'Threat: "ATM card will be blocked"',
            'Asks for the OTP directly',
            'Real BDO uses hotline 631-8000 (Metro Manila)',
          ],
          callout:
            'BDO will never call you to ask for an OTP, PIN, or full card number. Hang up and call 631-8000 to verify.',
        },
      },
    ],
  },
  {
    id: 'smishing',
    icon: 'sms',
    title: 'Smishing (Scam Text Messages)',
    summary:
      'Fake text messages pretending to be from LBC, J&T, Lazada, Shopee, BIR, or GCash , all with a suspicious link that steals your details.',
    tips: 'Do not click links in text messages. Forward suspicious SMS to 7726 (free for Globe, Smart, and DITO). Open the official app or website yourself.',
    tabs: [
      {
        label: 'Fake LBC Parcel SMS',
        content: {
          type: 'sms',
          sender: '+63 917 553 8821',
          senderBadge: 'NOT AN OFFICIAL SHORT CODE',
          body: 'LBC NOTICE: Your parcel #PH4827-LBC is on hold due to incomplete address. Update within 24 hours or it will be returned to sender. Click here to update: <span class="underline text-blue-600">lbc-ph.delivery/track</span>',
          annotations: [
            'Real LBC SMS comes from LBC, not from a 11-digit mobile number',
            'Suspicious URL: lbc-ph.delivery (real LBC site is lbcexpress.com)',
            'Urgency: "within 24 hours"',
          ],
          callout:
            'Track parcels only on lbcexpress.com or in the official LBC app. Never click links from SMS.',
        },
      },
      {
        label: 'Fake BIR Tax Refund SMS',
        content: {
          type: 'sms',
          sender: 'BIR-Refund',
          senderBadge: 'FAKE SENDER NAME',
          body: 'BIR Notice: You have a pending tax refund of ₱12,450. Verify your TIN and bank account here within 48 hours: <span class="underline text-blue-600">bir-gov.ph.com</span>',
          annotations: [
            'BIR does NOT process refunds via SMS',
            'Suspicious domain: bir-gov.ph.com (real BIR site is bir.gov.ph)',
            'Wants your TIN and bank account',
          ],
          callout:
            'BIR refunds are processed only at the Revenue District Office or via official channels at bir.gov.ph.',
        },
      },
      {
        label: 'Fake "GCash Reward" SMS',
        content: {
          type: 'sms',
          sender: 'GCASH-PROMO',
          senderBadge: 'NOT 2882 , FAKE',
          body: 'GCash: Congratulations! You received ₱5,000 cashback reward. Claim within 24 hours. <span class="underline text-blue-600">CLICK HERE!</span>',
          annotations: [
            'Real GCash short code is 2882',
            'When you click the word "CLICK HERE" it will redirect to the fake domain: gcash-claim.link',
            'Free money "reward" you did not enter for',
          ],
          callout:
            'GCash rewards always show up inside the GCash app. If it is not in the app, it is a scam.',
        },
      },
    ],
  },
  {
    id: 'fake-sellers',
    icon: 'storefront',
    title: 'Fake Online Sellers',
    summary:
      'Fake stores on Facebook Marketplace, TikTok Shop, and Carousell take your GCash payment, then disappear. Many target older buyers looking for cheap appliances or phones.',
    tips: 'Use Cash on Delivery (COD) or pay only inside Lazada / Shopee. Never send GCash directly to a seller you do not personally know. For Marketplace, meet at a busy MRT or LRT station, or a police-assisted "Safe Trade" area.',
    tabs: [
      {
        label: 'Facebook Marketplace',
        content: {
          type: 'social',
          sender: 'JM Phone Shop PH',
          senderBadge: 'PROFILE CREATED 3 DAYS AGO',
          body: 'Brand new iPhone 15 Pro 256GB for ₱18,000 only.\n\nSeller says COD is available, but only after a ₱5,000 GCash reservation deposit. They refuse meetup or inspection and keep saying many buyers are waiting.',
          annotations: [
            'Price is far below normal market value',
            'Deposit first means it is not real COD',
            'Refuses meetup or inspection',
            'Profile only 3 days old',
            'Pressure: "many buyers are waiting"',
          ],
          callout:
            'For expensive items, do not send a reservation deposit. Meet in a safe public place, inspect the item first, or use a platform with buyer protection.',
          extra: {
            title: 'iPhone 15 Pro 256GB',
            seller: 'JM Phone Shop PH',
            price: '₱18,000',
            accountAge: '3 days ago',
            reviews: 0,
            location: 'Caloocan, Metro Manila',
            listingAge: 'Listed 22 minutes ago',
            tags: ['Deposit first', 'No inspection', 'New account'],
            description:
              'BRAND NEW SEALED po ito, may receipt at complete accessories. COD available — ₱5,000 GCash reservation muna bago i-ship para ma-hold ang unit. Maraming interested buyers na po kaya kumilos na agad. 100% legit, may video unboxing pa po kami. No meetup muna habang maraming orders.',
          },
        },
      },
      {
        label: 'Bogus Delivery (Empty Box)',
        content: {
          type: 'shipping',
          sender: 'TikTok Shop Seller',
          senderBadge: 'COUNTERFEIT GOODS',
          body: 'Watched a TikTok Live for "Original Uniqlo Heattech" sold at ₱150 each (real price: ₱790). Paid via GCash. After 2 weeks, the box arrived with the correct weight — but inside was just plastic and a single piece of fake fabric.',
          annotations: [
            'Live shopping with deep discounts on branded goods',
            'Seller has no Shopee/Lazada-style buyer protection',
            'Empty / counterfeit deliveries are common',
          ],
          callout:
            'Buy branded items only from official stores or verified Mall accounts. Use platforms with buyer protection.',
          extra: {
            trackingNo: 'TT-PH-887621',
            recipient: 'You',
            deliveryOutcome: 'Box arrived with correct weight — inside was plastic wrap and a single piece of fake fabric. Not the Heattech advertised.',
          },
        },
      },
    ],
  },
  {
    id: 'investment',
    icon: 'trending_up',
    title: 'Investment & Crypto Scams',
    summary:
      'Schemes that promise huge profits , "double your money", crypto trading, online "paluwagan" , are usually Ponzi scams. Many were flagged by the SEC.',
    tips: 'Before investing one peso, search the company name on sec.gov.ph. If it is not on the list of registered investment companies, do NOT invest. No real investment is "guaranteed" or "no risk".',
    tabs: [
      {
        label: 'Fake "Double Your Money" Scheme',
        content: {
          type: 'messenger',
          sender: 'Sister Marites , Blessing Ministry',
          senderBadge: 'FLAGGED BY SEC',
          body: 'Tito/Tita, isang oras lang po. Mag-deposit po kayo ng ₱10,000 sa GCash account namin, after 30 days makakatanggap kayo ng ₱13,000 , guaranteed po, hindi ito sugal, ito po ay blessing! Many Lolas, Lolos here na nakatanggap na. Want ko po kayong matulungan din. 🙏',
          annotations: [
            'Promises 30% return in one month , impossible legally',
            'Uses religious / family language to gain trust',
            'Pays "old members" with money from new members (Ponzi)',
            'Not registered with the SEC',
          ],
          callout:
            'A real bank time deposit earns about 2,4% per YEAR. Anything offering 30% per month is a scam.',
        },
      },
      {
        label: 'Fake Crypto "Mentor"',
        content: {
          type: 'messenger',
          sender: 'Coach Kevin , Crypto PH',
          senderBadge: 'TELEGRAM-ONLY',
          body: 'Lola, I will teach you my system. Just deposit USDT (₱5,000 = 90 USDT) to this wallet: TRX...x8a9b2. Within 7 days I will trade it to ₱15,000 for you. After, you can withdraw anytime. Look at our students\u2019 winnings 📈',
          annotations: [
            'Asks you to send crypto to a wallet you do not control',
            'Only communicates on Telegram',
            'Shows fake screenshots of "students" earning',
            'Once you deposit, your money is gone , crypto transfers cannot be reversed',
          ],
          callout:
            'No real "mentor" handles your money. If they cannot trade it on YOUR account that you control, walk away.',
        },
      },
    ],
  },
  {
    id: 'job-scams',
    icon: 'work',
    title: 'Job & "Easy Task" Scams',
    summary:
      'Fake "work from home" or overseas jobs that ask YOU to pay first , for "registration", "visa", or "training". Real employers never charge you.',
    tips: 'A real job NEVER asks you to pay before you start. Verify overseas jobs at the Department of Migrant Workers (dmw.gov.ph). Verify local jobs through DOLE.',
    tabs: [
      {
        label: 'Fake "Like & Earn" Job',
        content: {
          type: 'messenger',
          sender: 'HR Manager , Easy Job PH',
          senderBadge: 'TELEGRAM RECRUITER',
          body: 'Hi po! Earn ₱500,₱2,000 per day liking TikTok videos at home. 30 minutes lang per day. Activation fee po is ₱300 lang via GCash, refundable after first task. Send proof of payment para ma-add po kayo sa VIP group.',
          annotations: [
            'Asks YOU to pay an "activation fee"',
            'Only talks on Telegram or WhatsApp, never a company email',
            'Vague tasks, no real employer name',
          ],
          callout:
            'No legitimate employer charges applicants. The moment they ask for GCash to "activate" , block them.',
        },
      },
      {
        label: 'Fake Overseas Hiring',
        content: {
          type: 'email',
          from: 'recruitment@dubai-luxuryhotel-hiring.com',
          subject: 'Job Offer: Hotel Staff Dubai , ₱90,000/month',
          body: 'Dear Applicant, we are pleased to offer you a position as Hotel Receptionist in Dubai with monthly salary ₱90,000 + free accommodation. To process your visa, please pay ₱25,000 visa processing fee to our agent\u2019s GCash within 3 days. Contract will follow.',
          cta: 'PAY VISA FEE NOW',
          annotations: [
            'Real DMW-licensed agencies do not collect fees through personal GCash',
            'Suspicious domain: dubai-luxuryhotel-hiring.com',
            'Pressure: "within 3 days"',
            'Job offered without face-to-face interview',
          ],
          callout:
            'Verify all overseas employers and agencies at dmw.gov.ph BEFORE paying anything. The DMW publishes a list of licensed agencies.',
        },
      },
    ],
  },
];

interface Props {
  lang: Lang;
}

// Official logo URLs (using clearbit for logos)
const resourceLogos: Record<string, string> = {
  CICC: ciccLogo,
  'NBI-CCD': nbiLogo,
  BSP: bspLogo,
  'PNP-ACG': pnpAcgLogo,
};

// ─── Inline SVG icons ────────────────────────────────────────────────────────
function RedXIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="#DC2626" />
      <path d="M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function GreenCheckIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill="#16A34A" />
      <path d="M5.5 10.5L8.5 13.5L14.5 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScamExampleCard({ tab, index }: { tab: any; index: number }) {
  const content = tab.content;

  const getBrand = (): string => {
    const text = (content.sender || content.from || '').toLowerCase();
    if (text.includes('gcash')) return 'gcash';
    if (text.includes('bdo')) return 'bdo';
    if (text.includes('bpi')) return 'bpi';
    if (text.includes('globe')) return 'globe';
    if (text.includes('smart')) return 'smart';
    if (text.includes('maya')) return 'maya';
    if (text.includes('lbc')) return 'lbc';
    if (text.includes('shopee')) return 'shopee';
    if (text.includes('lazada')) return 'lazada';
    if (text.includes('metrobank') || text.includes('metro')) return 'metrobank';
    if (text.includes('facebook') || text.includes('meta')) return 'facebook';
    if (text.includes('netflix')) return 'netflix';
    if (text.includes('citi')) return 'citibank';
    if (text.includes('landbank')) return 'landbank';
    if (text.includes('dito')) return 'dito';
    if (text.includes('j&t') || text.includes('jnt')) return 'jt';
    if (text.includes('meralco')) return 'meralco';
    if (text.includes('sss')) return 'sss';
    if (text.includes('philhealth')) return 'philhealth';
    if (text.includes('bir')) return 'bir';
    return '';
  };

  const brand = getBrand();

  const renderMockup = () => {
    switch (content.type) {
      case 'sms':
        return (
          <SMSMockup
            sender={content.sender || 'Unknown'}
            brand={brand}
            body={content.body}
            isSpoofed={!!content.senderBadge}
          />
        );
      case 'email':
        return (
          <EmailMockup
            from={content.from || ''}
            brand={brand}
            subject={content.subject || ''}
            body={content.body}
            cta={content.cta}
            isSuspicious={!!content.from}
          />
        );
      case 'phone':
        return (
          <PhoneCallMockup
            caller={content.sender || 'Unknown Caller'}
            brand={brand}
            body={content.body}
            isSpoofed={!!content.senderBadge}
          />
        );
      case 'messenger':
      case 'dating':
      case 'messaging':
      case 'social-media':
      case 'chat':
        return (
          <MessengerMockup
            sender={content.sender || 'Unknown'}
            brand={brand}
            body={content.body}
            isVerified={!content.senderBadge}
          />
        );
      case 'marketplace':
      case 'social': {
        const priceMatch = content.body.match(/₱[\d,]+/);
        const price = content.extra?.price || (priceMatch ? priceMatch[0] : '₱0');
        const listingTitle =
          content.extra?.title ||
          (content.body.split('\n')[0] || content.sender || 'Product Listing').replace(/\s+[—-]\s+.*/, '');
        return (
          <MarketplaceMockup
            title={listingTitle}
            price={price}
            seller={content.extra?.seller || content.sender || 'Seller'}
            brand={brand}
            description={content.extra?.description || content.body}
            accountAge={content.extra?.accountAge || (content.senderBadge?.toLowerCase().includes('ago') ? content.senderBadge : '2 months ago')}
            reviews={content.extra?.reviews ?? 0}
            location={content.extra?.location}
            listingAge={content.extra?.listingAge}
            tags={content.extra?.tags}
          />
        );
      }
      case 'popup':
      case 'pop-up': {
        return (
          <PopupMockup
            body={content.body}
            cta={content.cta}
            domain={content.extra?.domain}
            countdown={content.extra?.countdown}
          />
        );
      }
      case 'receipt': {
        return (
          <ShippingReceiptMockup
            sender={content.sender || 'Seller'}
            body={content.body}
            trackingNo={content.extra?.trackingNo}
            recipient={content.extra?.recipient}
            status={content.extra?.status}
            amount={content.extra?.amount}
            date={content.extra?.date}
          />
        );
      }
      case 'social-post': {
        return (
          <CharityPostMockup
            sender={content.sender || 'Community Page'}
            body={content.body}
            domain={content.extra?.domain}
            reactions={content.extra?.reactions}
            shares={content.extra?.shares}
            campaignTitle={content.extra?.campaignTitle}
            raised={content.extra?.raised}
            goal={content.extra?.goal}
            posted={content.extra?.posted}
          />
        );
      }
      case 'shipping':
      case 'shopping':
      case 'tiktok': {
        const productMatch = content.body.match(/"([^"]+)"/);
        const fakePriceMatch = content.body.match(/₱(\d+)\s+each/);
        const realPriceMatch = content.body.match(/real price[:\s]+₱([\d,]+)/i);
        return (
          <ShoppingMockup
            seller={content.sender || 'TikTok Seller'}
            productName={productMatch?.[1] || content.extra?.productName || 'Branded Item'}
            fakePrice={fakePriceMatch ? `₱${fakePriceMatch[1]}` : content.extra?.fakePrice || '₱150'}
            realPrice={realPriceMatch ? `₱${realPriceMatch[1]}` : content.extra?.realPrice || '₱790'}
            deliveryOutcome={content.extra?.deliveryOutcome}
          />
        );
      }
      default:
        return null;
    }
  };

  const mockup = renderMockup();

  // Tips: split callout into sentences, filtering empties
  const tipLines = (content.callout || '')
    .split(/(?<=\.)\s+/)
    .map((s: string) => s.replace(/\.$/, '').trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#cfc7bd] bg-white shadow-[0_10px_24px_rgba(26,24,22,0.08)]">
      {/* Card Header */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[#1a1816] px-3 py-2.5 sm:gap-3 sm:px-5 sm:py-4">
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-[10px] text-white sm:h-7 sm:w-7 sm:text-xs"
          style={{ fontWeight: 800 }}
        >
          {index + 1}
        </span>
        <span
          className="min-w-0 flex-1 break-words text-xs leading-snug text-white sm:text-sm"
          style={{ fontWeight: 700 }}
        >
          {tab.label}
        </span>
        <span
          className="shrink-0 rounded-full bg-white/15 px-1.5 py-0.5 text-[8px] tracking-widest text-white uppercase sm:px-3 sm:py-1 sm:text-[10px]"
          style={{ fontWeight: 700 }}
        >
          EXAMPLE
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">

        {/* Mockup zone — flex-1 fills all remaining card height */}
        <div className="mb-3 flex flex-1 flex-col overflow-hidden rounded-xl border border-[#d6cfc6] bg-[#f5f2eb] p-3 sm:mb-4 sm:p-4">
          {mockup && <div className="flex flex-1 min-h-0 w-full flex-col">{mockup}</div>}

          {/* Fallback: no dedicated mockup component */}
          {!mockup && content.type !== 'qr' && content.type !== 'url-compare' && content.type !== 'sim-swap' && (
            <div className="flex w-full max-w-[620px] flex-col justify-center">
              {content.sender && (
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-[#1a1816]" style={{ fontWeight: 700 }}>
                    {content.sender}
                  </span>
                  {content.senderBadge && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] text-red-700 uppercase" style={{ fontWeight: 700 }}>
                      {content.senderBadge}
                    </span>
                  )}
                </div>
              )}
              {content.from && (
                <div className="mb-1 text-sm">
                  <span className="text-[#3d3530]" style={{ fontWeight: 600 }}>From: </span>
                  <span className="break-all font-mono text-xs text-red-600 underline decoration-wavy" style={{ fontWeight: 600 }}>
                    {content.from}
                  </span>
                </div>
              )}
              {content.subject && (
                <div className="mb-3 text-sm text-[#1a1816]" style={{ fontWeight: 700 }}>
                  <span className="text-[#3d3530]" style={{ fontWeight: 600 }}>Subject: </span>
                  {content.subject}
                </div>
              )}
              {content.body && (
                <div 
                  className="rounded-lg border border-[#d6cfc6] bg-white p-4 text-sm leading-relaxed whitespace-pre-line text-[#1a1816]" 
                  style={{ fontWeight: 600 }}
                  dangerouslySetInnerHTML={{ __html: content.body }}
                />
              )}
              {content.cta && (
                <div className="mt-3">
                  <span className="inline-block rounded-md bg-red-600 px-5 py-2.5 text-sm text-white shadow-sm" style={{ fontWeight: 700 }}>
                    {content.cta}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* QR type */}
          {content.type === 'qr' && (
            <div className="flex w-full max-w-[620px] flex-1 flex-col overflow-hidden rounded-xl border border-[#d6cfc6] bg-white">
              <div className="flex items-center gap-3 border-b border-[#e5ded4] bg-white px-4 py-3">
                <p className="text-sm text-[#1a1816] uppercase tracking-wider" style={{ fontWeight: 800 }}>
                  Suspicious Payment QR
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center p-3 sm:p-6">
                <div className="mx-auto grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-5">
                  <div className="mx-auto flex h-48 w-48 shrink-0 items-center justify-center rounded-lg border-2 border-[#e5ded4] bg-white p-3 sm:mx-0">
                    <div className="relative">
                      <QRCodeSVG
                        value={content.extra?.domain ? `https://${content.extra.domain}` : 'https://example.com'}
                        size={168}
                        level="H"
                        bgColor="#ffffff"
                        fgColor="#1a1816"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-white bg-white shadow">
                          <BrandLogo brand="meralco" size="sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-base leading-relaxed whitespace-pre-line text-[#1a1816]" style={{ fontWeight: 600 }}>
                      {(content.body || '').replace(/\n{2,}/g, '\n')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* URL compare type */}
          {content.type === 'url-compare' && content.extra?.urls && (
            <div className="w-full overflow-hidden rounded-2xl border border-[#d4d4d4] shadow-sm">
              {content.extra.urls.map((u: any, i: number, arr: any[]) => {
                const isSafe = u.verdict === 'safe';
                return (
                  <div
                    key={i}
                    className={`px-3 py-3 sm:px-4 sm:py-4 ${i !== arr.length - 1 ? 'border-b border-[#d4d4d4]' : ''} ${isSafe ? 'bg-[#f4fbf5]' : 'bg-[#fff8f8]'}`}
                  >
                    {/* Label row — verdict badge sits here on mobile */}
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[#1a1816]">
                        {u.label}
                      </p>
                      {/* Badge — visible at label row on mobile, hidden inside address bar */}
                      <span className={`flex sm:hidden shrink-0 items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${isSafe ? 'border-green-400 bg-green-500 text-white' : 'border-red-400 bg-red-600 text-white'}`}>
                        <span className="material-symbols-outlined text-[11px]">
                          {isSafe ? 'check_circle' : 'cancel'}
                        </span>
                        {isSafe ? 'Official' : 'Fake'}
                      </span>
                    </div>

                    {/* Address bar */}
                    <div className="flex items-center gap-2 rounded-xl border border-[#cccccc] bg-white px-3 py-2.5 shadow-sm sm:gap-3 sm:px-4 sm:py-3">
                      <span className={`material-symbols-outlined shrink-0 text-[18px] sm:text-[20px] ${isSafe ? 'text-green-600' : 'text-[#888]'}`}>
                        {isSafe ? 'lock' : 'lock_open'}
                      </span>
                      <p className="min-w-0 flex-1 break-all text-xs text-[#111] sm:text-sm" style={{ fontFamily: 'system-ui, sans-serif', letterSpacing: '0.01em', fontWeight: 550 }}>
                        {u.url}
                      </p>
                      {/* Badge — hidden on mobile (shown above), visible on sm+ */}
                      <span className={`hidden sm:flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${isSafe ? 'border-green-400 bg-green-500 text-white' : 'border-red-400 bg-red-600 text-white'}`}>
                        <span className="material-symbols-outlined text-[12px]">
                          {isSafe ? 'check_circle' : 'cancel'}
                        </span>
                        {isSafe ? 'Official' : 'Fake'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SIM swap type */}
          {content.type === 'sim-swap' && content.extra && (
            <div className="w-full max-w-[680px] space-y-5 rounded-xl border border-[#d6cfc6] bg-white p-4">
              <div>
                <p className="mb-3 text-[10px] font-extrabold uppercase tracking-widest text-[#1a1816]">
                  How the Attack Unfolds
                </p>
                <div className="relative pl-9">
                  <div className="absolute top-4 left-[17px] h-[calc(100%-2rem)] w-0.5 rounded-full bg-gradient-to-b from-red-400 via-red-300 to-red-100" />
                  <div className="space-y-0">
                    {content.extra.steps.map((step: string, i: number) => (
                      <div key={i} className="relative flex items-start gap-3 pb-4 last:pb-0">
                        <span className="absolute -left-9 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-white bg-red-600 text-[11px] text-white shadow-md" style={{ fontWeight: 800, top: '2px' }}>
                          {i + 1}
                        </span>
                        <div className="w-full rounded-lg border border-[#e5ded4] bg-white px-3 py-2.5 shadow-sm">
                          <p className="text-sm leading-snug text-[#1a1816]" style={{ fontWeight: 600 }}>{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Extra blocks (moneyRequest, tracking) — outside height-constrained zone */}
        {content.extra?.moneyRequest && (
          <div className="mb-4 rounded-lg border border-[#d6cfc6] bg-[#f8f7f5] p-4">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#1a1816]">3 weeks later...</p>
            <p className="text-sm text-[#1a1816]" style={{ fontWeight: 500 }}>{content.extra.moneyRequest}</p>
          </div>
        )}
        {content.extra?.trackingNo && content.type !== 'receipt' && content.type !== 'shipping' && content.type !== 'tiktok' && content.type !== 'shopping' && (
          <div className="mb-4 rounded-lg border border-[#d6cfc6] bg-[#f8f7f5] p-4">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#1a1816]">Delivery Receipt</p>
            <p className="mt-1.5 font-mono text-sm text-[#1a1816]" style={{ fontWeight: 600 }}>Tracking: {content.extra.trackingNo}</p>
            <p className="mt-0.5 text-sm text-[#1a1816]" style={{ fontWeight: 500 }}>Recipient: {content.extra.recipient}</p>
          </div>
        )}
        {/* Red Flags + What to Do */}
        <div className="overflow-hidden rounded-xl border border-[#d6cfc6] bg-white">
          {/* Red Flags section */}
          {(content.annotations?.length > 0 || (content.type === 'sim-swap' && content.extra?.warnings?.length > 0)) && (
            <div className="border-b border-[#d6cfc6] bg-[#fff6f3] p-4">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-[#1a1816]">
                Red Flags to Watch
              </p>
              <div className="space-y-2.5">
                {(content.annotations?.length > 0 ? content.annotations : content.extra?.warnings || []).map((a: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <RedXIcon />
                    <p className="text-sm leading-snug text-[#241f1b] sm:text-[15px]" style={{ fontWeight: 600 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips section */}
          {tipLines.length > 0 && (
            <div className="bg-[#f2fbf4] p-4">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-[#1a1816]">
                What to Do
              </p>
              <div className="space-y-2.5">
                {tipLines.map((tip: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <GreenCheckIcon />
                    <p className="text-sm leading-snug text-[#241f1b] sm:text-[15px]" style={{ fontWeight: 600 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function LogoImage({ name }: { name: string }) {
  const url = resourceLogos[name];
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e5ded4] bg-white p-1.5 sm:h-14 sm:w-14">
      <ImageWithFallback
        src={url || ''}
        alt={`${name} logo`}
        className="h-full w-full object-contain"
        onError={(e: any) => {
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = `<span style="font-weight:900.font-size:11px.color:#0a2fad.text-align:center.line-height:1.1">${name}</span>`;
        }}
      />
    </div>
  );
}

export function ScamInfoSection({ lang, onNavigate }: Props & { onNavigate?: (s: string) => void }) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [alertScope, setAlertScope] = useState<'local' | 'international'>('local');
  const [activeSub, setActiveSub] = useState<string>('what-is-scam');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetch('alerts.json')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setAlerts(data.alerts || data);
      })
      .catch((err) => console.error('Failed to load alerts:', err));
  }, []);

  useEffect(() => {
  const target = sessionStorage.getItem('scrollTarget');
  if (!target) return;
  sessionStorage.removeItem('scrollTarget');
  setTimeout(() => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }, []);

  // Scroll-based detection , reliable for both short and very tall sections
  useEffect(() => {
    const sectionIds = [
      'what-is-scam',
      'how-to-detect',
      'common-types',
      'additional-info',
      'alerts-resources',
    ];

// Replace the entire handleScroll function body inside the useEffect
const handleScroll = () => {
  setIsScrolled(window.scrollY > 120);
  const sectionIds = ['what-is-scam', 'how-to-detect', 'common-types', 'additional-info'];

      const alertsEl = document.getElementById('alerts-resources');
      if (alertsEl) {
        const rect = alertsEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5) {
          setActiveSub('alerts-resources');
          return;
        }
      }

      const triggerY = window.scrollY + window.innerHeight * 0.3;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= triggerY) current = id;
      }
      setActiveSub(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set correct highlight on initial render

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-white">

      {/* ── Floating Island Sub-navigation ── */}
      <div className={`sticky top-[72px] sm:top-[88px] z-50 flex justify-center w-full px-4 pointer-events-none -mb-16 mt-4 transition-all duration-500 ease-out ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <div className={`hidden sm:flex items-center gap-1 p-1 bg-white/85 backdrop-blur-xl border border-black/10 rounded-full shadow-2xl shadow-black/10 transition-all duration-300 ${isScrolled ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <div className="flex items-center gap-1.5 pl-4 pr-2 text-[#555] font-bold uppercase tracking-widest text-[10px]">
            <span className="material-symbols-outlined text-[15px]">explore</span>
            <span className="hidden md:inline">{lang === 'fil' ? 'Sa Pahinang Ito' : lang === 'ceb' ? 'Niining Panid' : 'On This Page'}</span>
          </div>
          <div className="w-[1px] h-4 bg-black/10 mx-1" />

          <a
            href="#what-is-scam"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeSub === 'what-is-scam'
                ? 'bg-[#0a2fad] text-white shadow-md'
                : 'text-[#555] hover:bg-black/5 hover:text-[#1a1816]'
            }`}
          >
            What is Scam?
          </a>

          <a
            href="#how-to-detect"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeSub === 'how-to-detect'
                ? 'bg-[#0a2fad] text-white shadow-md'
                : 'text-[#555] hover:bg-black/5 hover:text-[#1a1816]'
            }`}
          >
            How to Detect
          </a>

          <a
            href="#common-types"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeSub === 'common-types'
                ? 'bg-[#0a2fad] text-white shadow-md'
                : 'text-[#555] hover:bg-black/5 hover:text-[#1a1816]'
            }`}
          >
            Common Types
          </a>

          <a
            href="#additional-info"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all hidden lg:flex ${
              activeSub === 'additional-info'
                ? 'bg-[#0a2fad] text-white shadow-md'
                : 'text-[#555] hover:bg-black/5 hover:text-[#1a1816]'
            }`}
          >
            Additional Info
          </a>

          <a
            href="#alerts-resources"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all hidden xl:flex ${
              activeSub === 'alerts-resources'
                ? 'bg-[#0a2fad] text-white shadow-md'
                : 'text-[#555] hover:bg-black/5 hover:text-[#1a1816]'
            }`}
          >
            Live Alerts & Resources
          </a>
        </div>
      </div>

      {/* Page Header */}
      <div id="intro" className="border-b border-[#e5ded4] bg-[#f8f7f5] scroll-mt-28">

        <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-16 sm:px-8 sm:pb-14 md:px-12 md:pb-18 lg:px-16">
          <div className="mb-4 flex flex-wrap items-center gap-3">
          </div>
          <h1
            className="tracking-tight text-[#1a1816] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 4vw, 3.25rem)' }}
          >
            {lang === 'fil'
              ? 'Sentro ng Impormasyon sa Scam'
              : lang === 'ceb'
                ? 'Sentro sa Kasayuran sa Scam'
                : 'Scam Information Center'}
          </h1>
          <p
            className="w-full text-base leading-relaxed text-[#2d2926] sm:text-lg lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
          >
A legitimate agency helps people report, identify, and prevent scams and fraud. It spreads awareness about online and offline scams, provides reliable information, and assists victims in taking proper action. It also educates the public about common scam tactics like phishing, fake online selling, identity theft, and investment scams to help create a safer online community.          </p>

          <div className="mt-6 flex flex-row flex-wrap gap-2 sm:mt-8">
            {quickJumpPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-[#1a1816]/15 bg-[#1a1816]/5 px-3 py-2 text-xs text-[#3d3530] sm:px-4 sm:text-sm"
                style={{ fontWeight: 600 }}
              >
                # {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* What is scam? */}
      <section id="what-is-scam" className="border-t border-[#e5ded4] bg-[#f8f7f5] scroll-mt-28">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-16">
          <h2
            className="tracking-tight text-[#0a2fad] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {lang === 'fil' ? 'Ano ang Scam?' : lang === 'ceb' ? 'Unsa ang Scam?' : 'What is Scam?'}
          </h2>
          <div className="mt-4 mb-5 h-1.5 w-16 rounded-full bg-[#0a2fad]" />
          <p
            className="w-full text-base leading-relaxed text-[#2d2926] sm:text-lg lg:max-w-none"
            style={{ fontWeight: 500, textIndent: '2em', textAlign: 'justify' }}
          >
          A scam is a dishonest scheme designed to deceive people into giving away their money, personal information, or access to their accounts. Scammers use trust, urgency, and temptation to manipulate their victims. Below are three of the most common types you should know about.        
          </p>
            {/* 3 scam sub-types */}
{/* 3 scam sub-types */}
<div className="mt-10 overflow-hidden rounded-3xl border border-[#e5ded4] shadow-md">

  {/* Container Header */}
  <div className="bg-[#0a2fad] px-6 py-5 sm:px-8 flex items-center justify-between">
  </div>

  {/* Items */}
  <div className="divide-y divide-[#f0ece6] bg-white">
    {[
      {
        id: 'scam-phishing',
        title: 'Phishing Scams',
        body: (
          <>
            This method <strong>impersonates trusted organizations</strong> such as banks, streaming
            services, or government agencies to steal your personal information. You may receive an
            email or message that looks completely legitimate, asking you to verify your account or
            claim a reward. Once you enter your details, scammers{' '}
            <strong>capture them and take over your account</strong> without you knowing.
          </>
        ),
      },
      {
        id: 'scam-fake-prize',
        title: 'Fake Prize Scams',
        body: (
          <>
            You receive an unexpected message claiming you have won a{' '}
            <strong>large sum of money, a luxury vacation, or a brand-new device</strong>. The catch
            comes shortly after, when they demand a <strong>processing fee</strong> or ask for your
            credit card information to "release" your prize. Once you pay, they disappear entirely
            and deactivate their accounts, leaving you with nothing.
          </>
        ),
      },
      {
        id: 'scam-fraudulent-links',
        title: 'Fraudulent Links',
        body: (
          <>
            These are <strong>malicious URLs</strong> disguised as ads, urgent alerts, or shortened
            addresses embedded in websites and messages.{' '}
            <strong>A single click is enough.</strong> Without any visible sign of compromise, that
            one action grants attackers access to your device, allowing them to harvest your data and{' '}
            <strong>install malware that runs completely hidden</strong> in the background.
          </>
        ),
      },
    ].map((item) => (
      <div key={item.title} id={item.id} className="group flex gap-4 px-6 py-7 transition-colors duration-200 hover:bg-[#f8f7f5] sm:gap-6 sm:px-8 sm:py-8 scroll-mt-32">
        <div className="flex flex-col items-center pt-2.5">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#0a2fad] transition-transform duration-200 group-hover:scale-125" />
          <div className="mt-2 flex-1 w-px bg-[#0a2fad]/10" />
        </div>
        <div className="flex-1 pb-1">
          <h3
            className="uppercase tracking-tight text-[#1a1816] transition-colors duration-200 group-hover:text-[#0a2fad]"
            style={{ fontWeight: 900, fontSize: 'clamp(1rem, 1.8vw, 1.15rem)' }}
          >
            {item.title}
          </h3>
          <div className="mt-2 mb-3 h-[3px] w-0 rounded-full bg-[#0a2fad] transition-all duration-300 group-hover:w-10" />
          <p
            className="w-full text-base leading-relaxed text-[#2d2926] sm:text-lg"
            style={{ fontWeight: 500, textAlign: 'justify', textIndent: '2em' }}
          >
            {item.body}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>          
      </div>
      </section>

{/* How to detect? */}
<section id="how-to-detect" className="border-t border-[#e5ded4] bg-white scroll-mt-28">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-16">

          <h2
            className="tracking-tight text-[#0a2fad] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}
          >
            {lang === 'fil'
              ? 'Paano Matukoy ang Scam?'
              : lang === 'ceb'
                ? 'Unsaon Pagkita sa Scam?'
                : 'How to Detect a Scam?'}
          </h2>

          {/* Timeline */}
          <div className="relative mx-auto mt-10 max-w-4xl">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-[#e5ded4] hidden md:block" />

            <div className="flex flex-col gap-6 md:gap-8">
              {[
                {
                  number: '01',
                  title: 'Avoid Suspicious Links or Attachments',
                  subs: ['They may contain viruses or phishing tools designed to steal your data silently.'],
                },
                {
                  number: '02',
                  title: 'Never Share Sensitive Information',
                  subs: ['Avoid giving passwords, OTPs, bank details, or IDs. No legitimate service will ask for these unprompted.'],
                },
                {
                  number: '03',
                  title: 'Watch Out for "Too Good to Be True" Offers',
                  subs: ['Easy money, instant prizes, or unrealistic rewards are classic bait. If it sounds too perfect, it probably is.'],
                },
                {
                  number: '04',
                  title: 'Check the URL Carefully',
                  subs: [
                    'Look for slight misspellings (e.g., "facebo0k" instead of "facebook")',
                    'Make sure it starts with https://, though even that alone is not 100% safe',
                  ],
                },
                {
                  number: '05',
                  title: 'Check for Impersonation',
                  subs: [
                    'Scammers pretend to be banks, delivery services, or even friends',
                    'Always confirm through another platform (call or official page)',
                  ],
                },
                {
                  number: '06',
                  title: 'Watch for Fake Giveaways',
                  subs: [
                    '"Share this to win" or "click link to claim prize" are instant red flags',
                    'Often used to collect data or spread scams further',
                  ],
                },
                {
                  number: '07',
                  title: 'They Send "Proof" That Looks Staged',
                  subs: ['Fake screenshots of payments, IDs, or transactions are easy to fabricate. Never trust them as proof.'],
                },
                {
                  number: '08',
                  title: 'They Avoid Direct Answers',
                  subs: [
                    'When asked simple questions, they change the topic or give vague replies',
                    'Legitimate people and businesses always answer clearly and directly',
                  ],
                },
              ].map((tip, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className="relative flex items-center">

                    {/* ── Mobile layout ── */}
                    <div className="flex items-start gap-4 md:hidden w-full">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0a2fad] text-white shadow-md"
                        style={{ fontWeight: 900, fontSize: '0.85rem' }}
                      >
                        {tip.number}
                      </div>
                      <div className="flex-1 min-w-0 rounded-2xl border border-[#e5ded4] bg-[#f8f7f5] p-5 shadow-sm">
                        <p
                          className="w-full text-center text-base leading-snug text-[#1a1816] sm:text-lg"
                          style={{ fontWeight: 800 }}
                        >
                          {tip.title}
                        </p>
                        <ul className="mt-3 flex flex-col gap-2">
                          {tip.subs.map((sub, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2"
                              style={{ fontWeight: 500 }}
                            >
                              <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#0a2fad]" />
                              <span className="min-w-0 break-words text-sm leading-relaxed text-[#3d3530] sm:text-base" style={{ textAlign: 'justify' }}>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* ── Desktop layout ── */}
                    <div className="hidden md:flex w-full items-center">

                      {/* Left side */}
                      <div className="w-[44%] flex justify-end pr-6">
                        {isLeft ? (
                          <div className="group w-full min-w-0 rounded-2xl border border-[#e5ded4] bg-[#f8f7f5] p-6 shadow-sm transition-all duration-300 hover:border-[#0a2fad]/30 hover:shadow-xl hover:-translate-y-1">
                            <p
                              className="w-full text-center text-base leading-snug text-[#1a1816] lg:text-lg"
                              style={{ fontWeight: 800 }}
                            >
                              {tip.title}
                            </p>
                            <ul className="mt-3 flex flex-col gap-2">
                              {tip.subs.map((sub, j) => (
                                <li
                                  key={j}
                                  className="flex min-w-0 items-start justify-end gap-2 text-sm leading-relaxed text-[#3d3530] lg:text-base"
                                  style={{ fontWeight: 500 }}
                                >
                                  <span className="min-w-0 break-words" style={{ textAlign: 'justify' }}>{sub}</span>
                                  <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#0a2fad]" />
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="w-full" />
                        )}
                      </div>

                      {/* Center circle */}
                      <div className="w-[12%] flex justify-center">
                        <div
                          className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0a2fad] text-white shadow-lg ring-4 ring-white"
                          style={{ fontWeight: 900, fontSize: '0.9rem' }}
                        >
                          {tip.number}
                        </div>
                      </div>

                      {/* Right side */}
                      <div className="w-[44%] flex justify-start pl-6">
                        {!isLeft ? (
                          <div className="group w-full min-w-0 rounded-2xl border border-[#e5ded4] bg-[#f8f7f5] p-6 shadow-sm transition-all duration-300 hover:border-[#0a2fad]/30 hover:shadow-xl hover:-translate-y-1">
                            <p
                              className="w-full text-center text-base leading-snug text-[#1a1816] lg:text-lg"
                              style={{ fontWeight: 800 }}
                            >
                              {tip.title}
                            </p>
                            <ul className="mt-3 flex flex-col gap-2">
                              {tip.subs.map((sub, j) => (
                                <li
                                  key={j}
                                  className="flex min-w-0 items-start gap-2 text-sm leading-relaxed text-[#3d3530] lg:text-base"
                                  style={{ fontWeight: 500 }}
                                >
                                  <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#0a2fad]" />
                                  <span className="min-w-0 break-words" style={{ textAlign: 'justify' }}>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="w-full" />
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      {/* Scam Categories */}
      <section id="common-types" className="border-t border-[#e5ded4] bg-[#f8f7f5] scroll-mt-28">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-16">
          <h2
            className="mb-2 tracking-tight text-[#1a1816] uppercase"
            style={{ fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}
          >
            {lang === 'fil' ? 'Karaniwang Uri ng Panloloko' : 'Common Types of Scams'}
          </h2>
          <p className="mb-10 text-base text-[#3d3530] sm:mb-12" style={{ fontWeight: 500 }}>
            {lang === 'fil'
              ? 'Alamin ang mga karaniwang paraan ng panloloko upang maprotektahan ang inyong sarili at pamilya.'
              : 'Learn the patterns scammers use , so you can spot them before it is too late.'}
          </p>

          {scamTypes.map((scam) => (
            <div key={scam.number} id={scam.id} className="mb-12 last:mb-0 sm:mb-16 scroll-mt-28">
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#e5ded4] bg-white px-4 py-4 sm:mb-8 sm:items-center sm:gap-4 sm:px-5">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0a2fad] text-lg text-white sm:h-12 sm:w-12 sm:text-xl"
                  style={{ fontWeight: 900 }}
                >
                  {scam.number}
                </div>
                <div className="min-w-0">
                  <h3
                    className="tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 900, fontSize: 'clamp(1.1rem, 2vw, 1.75rem)' }}
                  >
                    {scam.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#5c544d]" style={{ fontWeight: 500 }}>
                    {scam.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                {scam.tabs.map((tab, i) => (
                  <ScamExampleCard key={i} tab={tab} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Information */}
      <section id="additional-info" className="border-t border-[#e5ded4] bg-white scroll-mt-28">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-16">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0a2fad] sm:h-12 sm:w-12">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '1.5rem' }}>
                info
              </span>
            </div>
            <div className="min-w-0">
              <h2
                className="tracking-tight text-[#1a1816] uppercase break-words"
                style={{ fontWeight: 900, fontSize: 'clamp(1.35rem, 3vw, 2.25rem)' }}
              >
                {lang === 'fil' ? 'Karagdagang Impormasyon' : 'Additional Information'}
              </h2>
              <p className="mt-1 text-base text-[#3d3530] sm:text-lg" style={{ fontWeight: 500 }}>
                {lang === 'fil'
                  ? 'Iba pang uri ng panloloko na laganap sa Pilipinas , kasama ang mga halimbawa, palatandaan, at tip.'
                  : 'Other scam patterns common in the Philippines , with examples, red flags, and tips.'}
              </p>
            </div>
          </div>

          <div className="senior-readable w-full space-y-6" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
            {additionalScamInfo.map((item, idx) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[#e5ded4] bg-white shadow-sm"
              >
                {/* Header */}
                <div className="flex min-w-0 items-start gap-3 border-b border-[#f0ece6] bg-[#f8f7f5] px-4 py-4 sm:items-center sm:gap-5 sm:px-6 sm:py-6">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a1816] text-white sm:mt-0 sm:h-12 sm:w-12">
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                      {item.icon}
                    </span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-lg leading-tight text-[#1a1816] uppercase tracking-tight break-words sm:text-xl"
                      style={{ fontWeight: 900 }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1 text-[15px] leading-relaxed text-[#342f2a] sm:text-base"
                      style={{ fontWeight: 600 }}
                    >
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Examples */}
                <div className="px-4 py-5 sm:px-6 sm:py-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {item.tabs.map((tab, i) => (
                      <ScamExampleCard key={i} tab={tab} index={(idx + i) % 3} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Alerts & Quick Resources */}
      <section id="alerts-resources" className="border-t border-[#e5ded4] scroll-mt-28">
        <div className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 md:px-12 lg:px-16">

        <div className="mb-10 overflow-hidden rounded-2xl border border-[#e5ded4] bg-[#f8f7f5] shadow-sm sm:mb-14">

          {/* Container Header */}
          <div className="flex flex-col gap-3 border-b border-[#e5ded4] bg-white px-4 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                <span className="material-symbols-outlined text-xl text-white">notifications_active</span>
              </div>
              <div>
                <h3 className="tracking-tight text-[#1a1816] uppercase" style={{ fontWeight: 900, fontSize: '1.25rem' }}>
                  Live Alerts
                </h3>
                <p className="text-xs text-[#5c544d]" style={{ fontWeight: 600 }}>
                  Latest scam reports & advisories
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:ml-auto">
              <div className="flex flex-1 items-center rounded-full border border-[#e5ded4] bg-[#f8f7f5] p-1 sm:flex-none">
                <button
                  onClick={() => setAlertScope('local')}
                  className={`rounded-full px-4 py-1.5 text-xs tracking-wider uppercase transition-all ${alertScope === 'local' ? 'bg-[#0a2fad] text-white shadow-sm' : 'text-[#5c544d] hover:text-[#1a1816]'}`}
                  style={{ fontWeight: alertScope === 'local' ? 800 : 700 }}
                >
                  Local (PH)
                </button>
                <button
                  onClick={() => setAlertScope('international')}
                  className={`rounded-full px-4 py-1.5 text-xs tracking-wider uppercase transition-all ${alertScope === 'international' ? 'bg-[#0a2fad] text-white shadow-sm' : 'text-[#5c544d] hover:text-[#1a1816]'}`}
                  style={{ fontWeight: alertScope === 'international' ? 800 : 700 }}
                >
                  International
                </button>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                </span>
                <span className="text-xs tracking-wider text-red-600 uppercase" style={{ fontWeight: 700 }}>
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Alert Cards */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {alerts
                .filter((a) => a.scope === alertScope || (!a.scope && alertScope === 'local'))
                .slice(0, 12)
                .map((alert) => (
                  <a
                    key={alert.id}
                    href={alert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-xl border border-[#0a2fad] bg-white p-5 transition-all hover:border-[#0a2fad]/40 hover:shadow-lg lg:border-[#a09890]"
                  >
                    <div className="mb-3 flex w-full flex-wrap items-center justify-between gap-1">
                      <div className="flex min-w-0 items-center gap-2">
                        {alert.logo ? (
                          <img
                            src={alert.logo}
                            alt={alert.source}
                            className="h-4 w-4 shrink-0 rounded object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${alert.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                        )}
                        <span
                          className="truncate text-[11px] tracking-wider text-[#5c544d] uppercase"
                          style={{ fontWeight: 700 }}
                          title={alert.source}
                        >
                          {alert.source}
                        </span>
                      </div>
                      <span className="shrink-0 text-right text-[11px] text-[#5c544d]/50" style={{ fontWeight: 600 }}>
                        {alert.date}
                      </span>
                    </div>
                    <p
                      className="flex-1 text-sm leading-snug text-[#1a1816] transition-colors group-hover:text-[#0a2fad] sm:text-base"
                      style={{ fontWeight: 700 }}
                    >
                      {alert.title}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[#0a2fad] opacity-100 transition-opacity group-hover:opacity-100 xl:opacity-0">
                      <span className="text-xs" style={{ fontWeight: 700 }}>Read more</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>

          {/* Quick Resources + Report */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-5">
            {/* Quick Resources , spans 3 cols */}
            <div className="rounded-2xl border border-[#e5ded4] bg-[#f8f7f5] p-5 sm:p-8 lg:col-span-3">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a2fad]">
                  <span className="material-symbols-outlined text-xl text-white">verified</span>
                </div>
                <div>
                  <h4
                    className="tracking-tight text-[#1a1816] uppercase"
                    style={{ fontWeight: 900, fontSize: '1.1rem' }}
                  >
                    Quick Resources
                  </h4>
                  <p className="text-xs text-[#5c544d]" style={{ fontWeight: 600 }}>
                    Official government agencies you can contact
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4">
                {[
                  {
                    name: 'CICC',
                    desc: 'Cybercrime Investigation and Coordinating Center',
                    url: 'https://cicc.gov.ph',
                    hotline: '1326',
                  },
                  {
                    name: 'NBI-CCD',
                    desc: 'National Bureau of Investigation , Cybercrime Division',
                    url: 'https://nbi.gov.ph',
                    hotline: '(02) 8523-8231',
                  },
                  {
                    name: 'BSP',
                    desc: 'Bangko Sentral ng Pilipinas , Consumer Complaints',
                    url: 'https://bsp.gov.ph',
                    hotline: '(02) 8708-7087',
                  },
                  {
                    name: 'PNP-ACG',
                    desc: 'Philippine National Police , Anti-Cybercrime Group',
                    url: 'https://acg.pnp.gov.ph',
                    hotline: '(02) 8414-1560',
                  },
                ].map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-[#0a2fad] bg-white p-4 transition-all hover:border-[#0a2fad]/40 hover:shadow-md sm:p-5 lg:border-[#a09890]"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <LogoImage name={resource.name} />
                      <div className="min-w-0 flex-1">
                        <p className="text-base text-[#0a2fad]" style={{ fontWeight: 800 }}>
                          {resource.name}
                        </p>
                      </div>
                      <span className="material-symbols-outlined shrink-0 text-lg text-[#1a1816]/20 transition-colors group-hover:text-[#0a2fad]">
                        open_in_new
                      </span>
                    </div>
                    <p
                      className="text-xs leading-snug text-[#3d3530]"
                      style={{ fontWeight: 500 }}
                    >
                      {resource.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-[#5c544d]">
                      <span className="material-symbols-outlined text-sm">phone</span>
                      <span className="text-[13px] tracking-wide text-[#1a1816]" style={{ fontWeight: 800 }}>
                        {resource.hotline}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Report a Threat , spans 2 cols */}
            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-[#1a1816] p-5 text-white sm:p-8 lg:col-span-2">
              <div className="absolute top-0 right-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10" />
              <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-red-600/10" />

              <div className="relative z-10 flex flex-1 flex-col">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600">
                    <span className="material-symbols-outlined text-2xl text-white">shield</span>
                  </div>
                  <h4 className="text-xl uppercase sm:text-2xl" style={{ fontWeight: 900 }}>
                    Report a<br />
                    Threat
                  </h4>
                </div>

                <p
                  className="flex-1 text-sm leading-relaxed text-[#c7c3bf] sm:text-base"
                  style={{ fontWeight: 500 }}
                >
                  If you or someone you know has encountered a suspicious online activity, a scam,
                  or any form of cyber fraud , report it immediately. Your report can help protect
                  others.
                </p>

                <div className="mt-6 space-y-3 rounded-xl bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-red-400">phone</span>
                    <span className="text-sm" style={{ fontWeight: 700 }}>
                      CICC Hotline: 1326
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-red-400">email</span>
                    <span className="text-sm" style={{ fontWeight: 700 }}>
                      report@cicc.gov.ph
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg text-red-400">language</span>
                    <span className="text-sm" style={{ fontWeight: 700 }}>
                      cicc.gov.ph/report
                    </span>
                  </div>
                </div>

                <a
                  href="https://cicc.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block"
                >
                  <button
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 py-4 text-base text-white transition-colors hover:bg-red-700 sm:text-lg"
                    style={{ fontWeight: 700 }}
                  >
                    <span className="material-symbols-outlined text-xl">report</span>
                    Log an Incident Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}