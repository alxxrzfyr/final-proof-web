// ═══════════════════════════════════════════════════════════════
// ALL HARDCODED DATA FOR P.R.O.O.F. WEBSITE
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// HERO SECTION DATA (HOME PAGE)
// ═══════════════════════════════════════════════════════════════
export const threatStats = [
  {
    label: 'Losses from cybercrime (2025)',
    value: '₱418M',
    color: 'text-red-400',
    sublabel: 'CICC 2025 reported losses',
  },
  {
    label: 'Consumer fraud cases (2025)',
    value: '6,453',
    color: 'text-yellow-400',
    sublabel: 'Largest CICC complaint category',
  },
  {
    label: 'Cybercrime complaints (2025)',
    value: '18,633',
    color: 'text-red-400',
    sublabel: 'CICC annual report',
  },
  {
    label: 'Filipinos scammed at least once',
    value: '52%',
    color: 'text-yellow-400',
    sublabel: 'GSMA 2025 survey',
  },
];

export const pieData = [
  {
    name: 'Consumer Fraud',
    value: 35,
    color: '#dc2626',
  },
  {
    name: 'Online Fraud',
    value: 23,
    color: '#0a2fad',
  },
  {
    name: 'Online Harassment',
    value: 11,
    color: '#f59e0b',
  },
  {
    name: 'Identity Theft',
    value: 9,
    color: '#6b7280',
  },
  {
    name: 'Other Cybercrimes',
    value: 22,
    color: '#9ca3af',
  },
];

export const lineData = [
  { year: '2023', cases: 3317 },
  { year: '2024', cases: 10004 },
  { year: '2025', cases: 18633 },
];

export const quickJumpPills = [
  'PHISHING',
  'FAKE PRIZES',
  'FRAUDULENT LINKS',
  'LOVE SCAM',
  'OTP FRAUD',
  'FAKE SELLER',
  'SIM SWAP',
];

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  scale: number;
  position: string;
}

export const teamMembers: TeamMember[] = [
  { name: 'Samantha Angeles',    role: 'Assist. Research Lead',          image: 'Angeles.jpg',   scale: 1.2, position: 'center 15%' },
  { name: 'Wiljean Ariola',      role: 'Research Lead',                  image: 'Ariola.jpg',    scale: 1.2, position: 'center 10%' },
  { name: 'Shevel Balansag',     role: 'Researcher',                     image: 'Balansag.jpg',  scale: 1.2, position: 'center 60%' },
  { name: 'Alex Berin Jr.',      role: 'Web Developer Lead\nResearcher', image: 'Berin.png',     scale: 1.2, position: 'center 50%' },
  { name: 'Johnmiel Bernardo',   role: 'Researcher',                     image: 'Bernardo.jpg',  scale: 1.2, position: 'center 10%' },
  { name: 'Andrey Farinas',      role: 'Researcher',                     image: 'Farinas.jpg',   scale: 1.2, position: 'center 20%' },
  { name: 'Gabriel Frany',       role: 'Researcher',                     image: 'Frany.jpg',     scale: 1.2, position: 'center 15%' },
  { name: 'Marc Laurence Jayan', role: 'Web Developer\nResearcher',      image: 'Jayan.jpg',     scale: 1.3, position: 'center 10%' },
  { name: 'Precious Jocson',     role: 'Researcher',                     image: 'Jocson.jpg',    scale: 1.1, position: 'center 20%' },
  { name: 'James Mancera',       role: 'Researcher',                     image: 'Mancera.jpg',   scale: 1.3, position: 'center 15%' },
  { name: 'Xander Rodriguez',    role: 'Researcher',                     image: 'Rodriguez.jpg', scale: 1.3, position: 'center 20%' },
  { name: 'Yoshua Rosalda',      role: 'Researcher',                     image: 'Rosalda.jpg',   scale: 1.3, position: 'center 10%' },
  { name: 'Jillian Soriano',     role: 'Researcher',                     image: 'Soriano.jpg',   scale: 1.3, position: 'center 15%' },
  { name: 'Kessie Vidad',        role: 'Researcher',                     image: 'Vidad.jpg',     scale: 1.2, position: 'center 15%' },
];

// ═══════════════════════════════════════════════════════════════
// SCAM PAGE SECTION DATA
// ═══════════════════════════════════════════════════════════════

export interface ScamType {
  id: string;       
  number: string;
  title: string;
  description: string;
  tabs: ScamTab[];
}

export interface ScamTab {
  label: string;
  content: ScamExample;
}

export interface ScamExample {
  type: string;
  from?: string;
  subject?: string;
  sender?: string;
  senderBadge?: string;
  body: string;
  cta?: string;
  annotations: string[];
  callout: string;
  extra?: any;
}

export const scamTypes: ScamType[] = [
{
    id: 'phishing-messages',
    number: '01',
    title: 'PHISHING MESSAGES',
    description:
      'Scammers impersonate trusted institutions, government agencies, or people you know via email, SMS, calls, or messages. Their goal is to steal your credentials, OTP, or personal information.',
    tabs: [
      {
        label: 'Via Email',
        content: {
          type: 'email',
          from: 'security@citibank-alert-ph.net',
          subject: '[URGENT] Your account has been compromised',
          body: 'Dear Valued Customer,\n\nWe have detected unauthorized activity on your account. For your protection, we have temporarily limited access.\n\nPlease verify your identity within 24 hours to restore full functionality.',
          cta: 'VERIFY MY ACCOUNT NOW',
          annotations: [
            'Spoofed domain: citibank-alert-ph.net',
            'Urgency language: 24-hour deadline',
          ],
          callout:
            'Legitimate banks never ask you to verify credentials via email links. Type the bank URL manually. Never click email links.',
        },
      },
      {
        label: 'Via SMS',
        content: {
          type: 'sms',
          sender: 'GCash PH',
          senderBadge: 'SPOOFED SENDER',
          body: 'GCash: Your account has been temporarily suspended due to unusual activity. Verify your identity immediately to avoid permanent deactivation: <span class="underline text-blue-600">gcash-verify-ph.net/login</span>',
          annotations: ['This URL is not gcash.com it is a fake domain'],
          callout:
            "GCash's official domain is gcash.com. Any other domain in an SMS is fraudulent. Do not click.",
        },
      },
      {
        label: 'Via Social Media DM',
        content: {
          type: 'messenger',
          sender: 'Meta Business Support',
          senderBadge: 'NOT VERIFIED',
          body: 'Hello! Your Facebook Page has been reported for violating Community Standards. Appeal within 24 hours or your Page will be permanently removed: fb-appeal-support.com/verify',
          annotations: [
            'Urgency pressure',
            'Unofficial domain',
            'Threatens account loss',
            'Meta never uses Messenger DMs for violations',
          ],
          callout:
            'Red Flags: Urgency pressure · Unofficial domain · Threatens account loss · Meta never uses Messenger DMs for violations',
        },
      },
      {
        label: 'Via Phone Call',
        content: {
          type: 'phone',
          sender: 'Globe Telecom Customer Service',
          senderBadge: 'SPOOFED CALLER ID',
          body: '"Good afternoon po. I\'m Agent Torres from Globe Fraud Prevention. We detected suspicious activity on your account. I\'ll send a 6-digit OTP to your number please share it with me to cancel the unauthorized transaction."',
          annotations: ['This OTP grants account access. Sharing it = instant takeover.'],
          callout:
            "Your OTP is YOUR password. No legitimate company will EVER ask for it over the phone. Hang up and call your provider's official number.",
        },
      },
      {
        label: 'Via Fake Support SMS',
        content: {
          type: 'sms',
          sender: '+63 917 XXX XXXX',
          senderBadge: 'NOT AN OFFICIAL SHORT CODE',
          body: 'Magandang araw po! Ako po si Ma. Reyes mula sa GCash Customer Service. Na-flag ang inyong account. Ipadala namin ang OTP sa inyong number ibigay lang po para ma-process ang inyong case.',
          annotations: [
            'Real GCash support uses short code 2882, never a +63 mobile number',
            'Sharing your OTP = instant wallet takeover',
          ],
          callout:
            'No company not even GCash itself should ever ask for your OTP. It is a one-time code only YOU should see.',
        },
      },
      {
        label: 'Via Dating App',
        content: {
          type: 'dating',
          sender: 'Michael Anderson',
          body: "Hey, I almost never match with someone as genuine as you. I'm a civil engineer currently on a project in Dubai single dad, widower. I'd love to move to WhatsApp if that's okay? \u2764\ufe0f",
          annotations: [
            'New account',
            'Moving off-platform removes protections',
            'Love-bombing within first message',
          ],
          callout:
            "Romance scammers build trust for weeks before the money request. Once you send, the requests escalate and the 'person' will eventually vanish.",
          extra: {
            moneyRequest:
              "Baby, my tools were held at customs. I need \u20b135,000 to release them. I will pay you back double. You are the only person I trust.",
          },
        },
      },
    ],
  },
  {
    id: 'fake-prizes',
    number: '02',
    title: 'FAKE PRIZES',
    description:
      'Scammers lure victims with impossible promises such as lottery winnings, exclusive deals, and investment returns. Their goal is to extract upfront fees, personal info, or payment.',
    tabs: [
      {
        label: 'Via Email',
        content: {
          type: 'email',
          from: 'noreply@netflix-rewards-ph.com',
          subject: "You've been selected! Claim your \u20b15,000 Netflix Gift Card",
          body: 'Congratulations! You have been selected in our quarterly rewards program.\n\nClick below to claim your \u20b15,000 Netflix Gift Card before it expires.',
          cta: 'CLAIM MY GIFT CARD',
          annotations: ['Fake domain: netflix-rewards-ph.com'],
          callout:
            'Netflix does not give out unsolicited gift cards. Verify all prize offers directly at the official company website never via email links.',
        },
      },
      {
        label: 'Via SMS',
        content: {
          type: 'sms',
          sender: 'GCash Rewards',
          senderBadge: 'NOT A REAL SHORT CODE',
          body: 'Congratulations! You have been selected as our LUCKY WINNER! Claim your \u20b15,000 GCash reward. Reply YES and send your GCash PIN to confirm. Limited time only!',
          annotations: ['GCash will NEVER ask for your PIN. This is immediate account theft.'],
          callout:
            'GCash will NEVER ask for your PIN via SMS. Any message asking for your PIN is always a scam, no exceptions.',
        },
      },
      {
        label: 'Via Pop-up',
        content: {
          type: 'popup',
          body: "You're Today's Lucky Visitor!\n\nSpin to win a brand new iPhone 16 Pro! Only 2 prizes left today.",
          cta: 'SPIN NOW',
          annotations: ['Fake Facebook branding', 'Countdown timer creates urgency'],
          callout:
            "Legitimate companies never give prizes through browser pop-ups. The '1,000,000th visitor' prize is always fake.",
          extra: { domain: 'survey-prizewinners.info/ph', countdown: '00:03:47' },
        },
      },
      {
        label: 'Via Marketplace',
        content: {
          type: 'messenger',
          sender: "Lola Nena's Ukay Finds",
          senderBadge: 'UNVERIFIED PAGE',
          body: "Congrats po! Kayo ang napiling winner ng aming 10K Followers Raffle! 🎉 Ang premyo ay ₱5,000 GCash. Para ma-release po, mag-send lang ng ₱299 claiming fee para sa admin at taxes. Valid po hanggang bukas lang.",
          annotations: [
            'Legitimate prizes never require a "claiming fee" upfront',
            'Urgency: "valid until tomorrow"',
            'Unverified page with no track record asking for GCash',
          ],
          callout:
            'No real raffle asks you to PAY to claim a prize. The "claiming fee" IS the scam. Once you send, the prize will never arrive and the page will vanish.',
        },
      },
      {
        label: 'Via Shopping App',
        content: {
          type: 'popup',
          body: "Shopee 12.12 Mega Sale Lucky Draw\n\nYou're our 1,000th shopper today!\n\nPrize: Samsung Galaxy S25 Ultra\nValue: ₱79,990\n\nClaim your prize before the timer runs out!",
          cta: 'CLAIM MY PRIZE',
          annotations: [
            'Fake Shopee branding on an external site',
            'Leads to a phishing page outside the official app',
            'Countdown timer manufactures panic',
          ],
          callout:
            'Shopee never awards prizes through browser pop-ups or external websites. All legitimate Shopee promotions appear exclusively inside the official app.',
          extra: { domain: 'shopee-winner-ph.com/claim', countdown: '00:04:59' },
        },
      },
      {
        label: 'Via Messaging App',
        content: {
          type: 'chat',
          sender: 'GCash Promo Viber',
          senderBadge: 'NOT AN OFFICIAL GCASH CHANNEL',
          body: 'CONGRATULATIONS PO! Ikaw ang aming napili bilang isa sa 100 LUCKY WINNERS ng GCash Anniversary Promo! 🎊\n\nPremyo: ₱8,000 GCash Credits\n\nI-claim sa link na ito: <span class="underline text-blue-600">gcash-anniversary-ph/claim</span>\n\nValid hanggang 11:59 PM ngayong gabi lamang!',
          annotations: [
            'GCash does not announce winners through Viber or WhatsApp groups',
            'Fake domain: gcash-anniversary-ph/claim (real domain is gcash.com)',
            'Extreme deadline: "tonight only"',
          ],
          callout:
            'Real GCash promotions are announced only inside the official GCash app. Any prize claim delivered via Viber, WhatsApp, or Telegram is always a scam.',
        },
      },
    ],
  },
  {
    id: 'fraudulent-links',
    number: '03',
    title: 'FRAUDULENT LINKS',
    description:
      'Scammers use fake URLs, manipulated domain names, forged QR codes, and counterfeit documents to redirect victims to phishing pages or steal their identity.',
    tabs: [
      {
        label: 'URL Comparison',
        content: {
          type: 'url-compare',
          body: '',
          annotations: [
            'Uses "0" (zero) instead of the letter "o" - Typosquatting (bd0.com)',
            'Actual domain is login-secure.xyz, not bdo.com.ph - Subdomain Trick',
            'Real domain is bdo.com.ph, not bdo.online - Fake Domain',
          ],
          callout:
            'Always look at the FULL domain carefully. Copy-paste the URL to verify. One invisible character difference makes it a fake site.',
          extra: {
            urls: [
              { label: 'Legitimate', url: 'https://www.bdo.com.ph', verdict: 'safe' },
              {
                label: 'Typosquatted',
                url: 'https://www.bd0.com',
                verdict: 'danger',
                highlight: 'Uses "0" (zero) instead of "o"',
              },
              {
                label: 'Subdomain Trick',
                url: 'https://bdo.com.ph.login-secure.xyz',
                verdict: 'danger',
                highlight: 'Actual domain is login-secure.xyz, not bdo.com.ph',
              },
              {
                label: 'Fake Domain',
                url: 'https://www.bdo.online/ph',
                verdict: 'danger',
                highlight: 'Real domain is bdo.com.ph, not bdo.online',
              },
            ],
          },
        },
      },
      {
        label: 'QR Code Phishing',
        content: {
          type: 'email',
          from: 'no-reply@bpi-secure-verify.com',
          subject: 'Action Required: Scan QR Code to Re-verify Your BPI Account',
          body: 'Dear BPI Customer,\n\nDue to recent security updates, all customers must re-verify their account by scanning the QR code attached to this email using your BPI Mobile App.\n\nFailure to verify within 24 hours will result in account suspension.',
          cta: '[ SCAN QR CODE TO VERIFY ]',
          annotations: [
            'Fake domain: bpi-secure-verify.com (real BPI domain is bpi.com.ph)',
            'QR leads to a cloned BPI login page, not the real app',
            '24-hour suspension threat creates panic',
          ],
          callout:
            'BPI will never ask you to scan a QR code via email. Open your bank app directly, never through an email prompt.',
        },
      },
      {
        label: 'Fake Gov Portal',
        content: {
          type: 'email',
          from: 'sss-onlineservices@sss-member-portal.com',
          subject: 'URGENT: Update your MDR or lose your benefits',
          body: 'Your Member Data Record has not been updated since 2022. Failure to update by April 10 will result in suspension of benefits.',
          cta: 'UPDATE MY MDR NOW',
          annotations: ['Philippine government agencies ONLY use .gov.ph domains'],
          callout:
            "SSS's real domain is sss.gov.ph. This is a government impersonation phishing attack.",
        },
      },
      {
        label: 'Forged Shipping Receipt',
        content: {
          type: 'sms',
          sender: '+63 915 XXX XXXX',
          senderBadge: 'NOT AN OFFICIAL COURIER SHORT CODE',
          body: 'J&T Express: Ang inyong package (JT2026041900371PH) ay natigil sa warehouse dahil sa maling address. I-update ang delivery info bago mag-5PM ngayon: <span class="underline text-blue-600">jt-express-ph[.]delivery/update</span>',
          annotations: [
            'Real J&T SMS uses the sender name "J&T", never a +63 mobile number',
            'Fake domain: jt-express-ph.delivery (real site is jtexpress.ph)',
            'Hard deadline: "before 5PM today"',
          ],
          callout:
            'Couriers never ask you to update your address through an SMS link. Track and manage packages only at jtexpress.ph by typing it manually.',
        },
      },
      {
        label: 'Fake Charity Link',
        content: {
          type: 'messenger',
          sender: 'Tulong PH Foundation',
          senderBadge: 'PAGE CREATED 3 DAYS AGO',
          body: 'EMERGENCY APPEAL: Tulong para sa mga nasunogan sa Divisoria! 🙏 Mag-donate na po kayo. Lahat ng donations napupunta direkta sa mga pamilyang apektado:\n\n<span class="underline text-blue-600">tulong-ph-relief/org</span>. Salamat po.',
          annotations: [
            'Messenger Page created only 3 days ago',
            'Organization not found in DSWD or SEC registry',
            'Fraudulent domain mimicking a real charity URL',
          ],
          callout:
            'Fake charity pages go up within hours of a disaster. Donate only through DSWD, the Philippine Red Cross, or SEC-registered foundations. Verify at sec.gov.ph.',
        },
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// QUIZ SCENARIOS 25 TOTAL
// ═══════════════════════════════════════════════════════════════

export interface QuizScenario {
  id: number;
  category: string;
  medium: string;
  isScam: boolean;
  sender: string;
  senderDetail: string;
  subject?: string;
  body: string;
  cta?: string;
  footer?: string;
  redFlags: string[];
  clue: string;
  explanation: string;
    mockupExtra?: {
    price?: string;
    accountAge?: string;
    reviews?: number;
    tags?: string[];
    deliveryOutcome?: string;  // for ShoppingMockup if you use it later
  };
}

export const quizScenarios: QuizScenario[] = [
  {
    id: 1,
    category: 'Account Security Alert (Email)',
    medium: 'Email',
    isScam: true,
    sender: 'BDO Unibank Security',
    senderDetail: 'security@bdo-alert-ph.net',
    subject: '[ACTION REQUIRED] Your BDO account has been locked',
    body: 'Dear Valued Customer,\n\nWe have detected multiple failed login attempts on your BDO account. To prevent unauthorized access, your account has been temporarily locked.\n\nClick the button below within 24 hours to restore full access. Failure to verify will result in permanent account suspension.',
    cta: 'RESTORE MY ACCOUNT',
    footer: 'BDO Unibank. For your security, do not share this link.',
    redFlags: [
      "Sender domain is 'bdo-alert-ph.net', not bdo.com.ph",
      'Urgency: 24-hour deadline pressure',
      'Threatens permanent suspension',
      'CTA button leads to unknown domain',
    ],
    clue: 'Real BDO emails come from @bdo.com.ph only. Check the sender address carefully.',
    explanation:
      "The sender domain 'bdo-alert-ph.net' is a fake lookalike of BDO's real domain 'bdo.com.ph'. Legitimate banks never ask you to click email links to unlock accounts.",
  },
  {
    id: 2,
    category: 'Transaction Confirmation (Email)',
    medium: 'Email',
    isScam: false,
    sender: 'GCash',
    senderDetail: 'noreply@gcash.com',
    subject: 'Your GCash transfer of \u20b1500 was successful',
    body: 'Hi Maria,\n\nYour GCash transfer is complete.\n\nAmount: \u20b1500.00\nRecipient: Juan dela Cruz\nDate: April 3, 2026 2:14 PM\nReference No: GC20260403-7749281\n\nIf you did not make this transaction, please call GCash Support at 2882 immediately.',
    redFlags: [],
    clue: 'Check the sender address. Does it match the official GCash domain?',
    explanation:
      "The sender is noreply@gcash.com GCash's official domain. The email contains a real reference number and no suspicious links.",
  },
  {
    id: 3,
    category: 'Account Activity Alert (SMS)',
    medium: 'SMS',
    isScam: true,
    sender: 'Landbank PH',
    senderDetail: '',
    body: 'LANDBANK: Your account has been flagged for suspicious activity. Immediate verification required. Click here to confirm your identity: <span class="underline text-blue-600">landbank-secure-verify.com/ph</span> or your account will be frozen within 2 hours.',
    redFlags: [
      'Sender is a mobile number, not a short code',
      'Unofficial domain: landbank-secure-verify.com',
      '2-hour freeze threat creates panic',
      'Asks you to click a link via SMS',
    ],
    clue: 'Official Landbank SMS alerts come from a short code, never a +63 mobile number.',
    explanation:
      "Landbank's official SMS alerts come from registered short codes, not mobile numbers. The link is not affiliated with Landbank.",
  },
  {
    id: 4,
    category: 'Rewards Notification (Email)',
    medium: 'Email',
    isScam: true,
    sender: 'GCash Rewards Program',
    senderDetail: 'gcashrewards@gcash-winners.com',
    subject: "\ud83c\udf89 Congratulations! You've been selected as a GCash Lucky Winner!",
    body: 'Dear GCash User,\n\nYou have been randomly selected as one of 10 LUCKY WINNERS in our monthly rewards draw!\n\nYour prize: \u20b110,000 GCash Credit\n\nTo claim your prize, reply to this email with your:\n\u2022 Full Name\n\u2022 GCash Mobile Number\n\u2022 GCash MPIN\n\u2022 Birthday\n\nOffer expires in 48 hours.',
    redFlags: [
      "Sender domain is 'gcash-winners.com' not gcash.com",
      'Asks for MPIN GCash will NEVER ask for this',
      'Collects personal info via email',
      '48-hour expiry creates false urgency',
    ],
    clue: 'Any message asking for your MPIN is always a scam, no exceptions.',
    explanation:
      'GCash will NEVER ask for your MPIN or personal details via email. The sender domain is fake.',
  },
  {
    id: 5,
    category: 'Billing Notification (SMS)',
    medium: 'SMS',
    isScam: false,
    sender: 'PLDT',
    senderDetail: '',
    body: 'PLDT: Your bill for account 02-XXXX-1234 is now available. Amount due: \u20b11,299.00. Due date: April 15, 2026. Pay via myPldt app or authorized payment centers. For billing inquiries call 171.',
    redFlags: [],
    clue: 'Does this message ask you to click a link or share any personal information?',
    explanation:
      'This is a standard billing notification. It provides an amount and due date, and directs you to official PLDT channels.',
  },
  {
    id: 6,
    category: 'Fraud Prevention Call',
    medium: 'Phone Call',
    isScam: true,
    sender: 'BPI Customer Service',
    senderDetail: '',
    body: 'CALLER: Good afternoon po. Ako po si Agent Torres mula sa BPI Fraud Prevention Team. Na-detect po namin ang suspicious na transaction sa inyong account \u20b125,000 transfer papunta sa unknown account.\n\nPara ma-stop po namin ito, kailangan ko pong i-verify ang inyong identity. Magpapadala po kami ng 6-digit OTP sa inyong registered number. Ibigay lang po sa akin ang code para ma-cancel namin ang transaction.',
    redFlags: [
      'No real bank will ask for your OTP over the phone ever',
      'Spoofed caller ID can mimic official numbers',
      'Creates panic with a fake \u20b125,000 transaction',
      "Asks you to 'cancel' a transaction by sharing OTP",
    ],
    clue: 'If someone asks for your OTP, hang up. Call your bank directly using the number on the back of your card.',
    explanation:
      'This is a classic OTP social engineering call. Banks will NEVER ask for your OTP by phone.',
  },
  {
    id: 7,
    category: 'Page Violation Notice (Social Media)',
    medium: 'Social Media',
    isScam: true,
    sender: 'Meta Business Support',
    senderDetail: 'Facebook Messenger Unverified Page',
    body: 'Hello! We have received multiple reports against your Facebook Page for violating our Terms of Service.\n\nYour Page is scheduled for PERMANENT REMOVAL in 24 hours unless you submit an appeal.\n\nClick below to file your appeal:\nfb-page-appeal-center.com/verify-identity',
    cta: 'APPEAL NOW',
    redFlags: [
      'Meta never contacts page owners via Messenger DM',
      "Domain 'fb-page-appeal-center.com' is not facebook.com",
      '24-hour removal threat is a pressure tactic',
      'Unverified sender page',
    ],
    clue: 'Facebook handles all Page violations through the official Support Inbox inside Business Suite not via Messenger.',
    explanation: 'Facebook/Meta does not send violation notices through Messenger DMs.',
  },
  {
    id: 8,
    category: 'Order Shipment Update (Email)',
    medium: 'Email',
    isScam: false,
    sender: 'Shopee Philippines',
    senderDetail: 'no-reply@shopee.ph',
    subject: 'Your order #2204571839 has been shipped!',
    body: "Hi there!\n\nGreat news your order is on its way.\n\nOrder #2204571839\nItem: Xiaomi Redmi Note 13 Space Black\nShipping via: J&T Express\nTracking No: JT0094827461PH\n\nEstimated delivery: April 5\u20137, 2026\n\nTrack your order in the Shopee app under 'My Purchases'.",
    redFlags: [],
    clue: 'Is the sender domain official? Does it ask for any credentials?',
    explanation: 'This is a standard Shopee order shipment notification from no-reply@shopee.ph.',
  },
  {
    id: 9,
    category: 'Dating App Message',
    medium: 'Dating App',
    isScam: true,
    sender: 'Peter Anderson',
    senderDetail: 'Bumble Match Profile created 6 weeks ago',
    body: "Hey, I almost never match with someone as genuine as you. I'm a civil engineer currently on a project in Dubai single dad, widower. I don't usually do this but I feel like we have something real.\n\nI'd love to move to WhatsApp if that's okay? \u2764\ufe0f",
    redFlags: [
      'Pushes to move off the dating app immediately',
      'Profile only 6 weeks old',
      "'Widower + engineer abroad' is a common template",
      'Love-bombing after one match',
    ],
    clue: 'Why would someone ask to move to WhatsApp so quickly?',
    explanation:
      'This matches the classic romance scammer profile: foreign engineer, widower, new account, immediate push to move off-platform.',
  },
  {
    id: 10,
    category: 'Marketplace Listing (Social Media)',
    medium: 'Marketplace',
    isScam: true,
    sender: 'TechDeals_PH',
    senderDetail: 'Facebook Marketplace Account: 2 months old, 0 reviews',
    body: 'iPhone 15 Pro Max 256GB Natural Titanium BRAND NEW SEALED with Apple PH receipt\nPrice: \u20b19,500 (SRP \u20b182,000)\n\n[Seller chat]: COD is not available po kasi mataas ang value ng item. GCash full payment muna bago i-ship. May proof of stocks kami. Marami na kaming nai-ship!\n\nBuy now only 1 unit left! \ud83d\udd25',
    redFlags: [
      'Price is 88% below SRP',
      '2-month-old account with zero reviews',
      'Refuses Cash on Delivery',
      "Urgency: 'only 1 unit left'",
    ],
    clue: 'A brand-new iPhone 15 Pro Max cannot legitimately sell for \u20b19,500.',
    explanation: 'The price is nearly 90% below retail a hallmark of a fake listing.',
  },
  {
    id: 11,
    category: 'SIM Card Notice',
    medium: 'SMS',
    isScam: true,
    sender: 'Globe Telecom',
    senderDetail: '',
    body: 'Globe: Your SIM card replacement request has been received. To confirm the transfer and protect your number, reply with your 6-digit account PIN within 10 minutes.\n\nYour confirmation code: 482910',
    redFlags: [
      'Real Globe messages come from official short codes, never mobile numbers',
      'Asks you to reply with your account PIN',
      "Includes a fake 'confirmation code'",
    ],
    clue: "Globe's official SMS short code is 8080 or *143# for calls.",
    explanation:
      'This is a SIM swap social engineering attack. By replying with your PIN, you confirm the fraudulent SIM transfer.',
  },
  {
    id: 12,
    category: 'Login Activity Notice (App)',
    medium: 'Social Media',
    isScam: false,
    sender: 'Facebook',
    senderDetail: 'security@facebookmail.com',
    subject: 'We noticed a new login to your Facebook account',
    body: "Hi Maria Santos,\n\nWe noticed a new login to your Facebook account from a new device.\n\nDevice: iPhone 14\nLocation: Quezon City, Philippines\nTime: April 3, 2026 3:41 PM\n\nIf this was you, no action is needed.\n\nIf this wasn't you, secure your account at facebook.com/hacked",
    redFlags: [],
    clue: 'Check: Does it ask for credentials? Does the link go to facebook.com?',
    explanation: 'This is an authentic Facebook security notification from @facebookmail.com.',
  },
  {
    id: 13,
    category: 'Member Benefits Notice (Email)',
    medium: 'Email',
    isScam: true,
    sender: 'PhilHealth Online Services',
    senderDetail: 'philhealth-portal@ph-gov-services.com',
    subject: 'URGENT: Update your PhilHealth MDR or lose your benefits',
    body: 'Dear PhilHealth Member,\n\nOur records show your Member Data Record (MDR) has not been updated since 2022. Failure to update by April 10, 2026 will result in suspension of your PhilHealth benefits.\n\nUpdate your MDR now through our secure online portal.',
    cta: 'UPDATE MY MDR NOW',
    footer: 'Philippine Health Insurance Corporation Online Member Services',
    redFlags: [
      "Domain is 'ph-gov-services.com' not philhealth.gov.ph",
      'Government agencies use .gov.ph domains only',
      'Threatens loss of benefits',
    ],
    clue: 'All Philippine government services use .gov.ph domains.',
    explanation:
      "PhilHealth's official domain is philhealth.gov.ph. The sender uses a fake domain.",
  },
  {
    id: 14,
    category: 'Browser Notification (Ads)',
    medium: 'Pop-up',
    isScam: true,
    sender: 'Survey Rewards PH',
    senderDetail: 'survey-rewardsPH.info',
    body: '\ud83c\udf8a CONGRATULATIONS, VISITOR! \ud83c\udf8a\n\nYou are our 1,000,000th visitor today!\n\nYou have been selected to receive one of the following prizes:\n\u2022 Samsung Galaxy S25 Ultra\n\u2022 \u20b150,000 GCash\n\u2022 Apple AirPods Pro\n\nSpin the wheel NOW to claim your prize offer expires in 4:59',
    cta: 'SPIN THE WHEEL',
    footer: 'survey-rewardsPH.info/claim',
    redFlags: [
      'No legitimate brand awards prizes via browser pop-ups',
      'Countdown timer manufactured urgency',
      'Domain is survey-rewardsPH.info',
    ],
    clue: "No website can accurately count 'the millionth visitor' this is always fake.",
    explanation: "The '1,000,000th visitor' prize is one of the oldest internet scams.",
  },
  {
    id: 15,
    category: 'Password Change Alert (Email)',
    medium: 'Email',
    isScam: false,
    sender: 'BDO Unibank',
    senderDetail: 'customercare@bdo.com.ph',
    subject: 'Your BDO Online Banking password was changed',
    body: 'Dear Account Holder,\n\nThis is to confirm that your BDO Online Banking password was successfully changed on April 3, 2026 at 10:22 AM.\n\nIf you made this change, no further action is required.\n\nIf you did NOT make this change, please call BDO Customer Service immediately at (02) 8631-8000.',
    redFlags: [],
    clue: 'Does the sender use bdo.com.ph? Does it ask you to click any links?',
    explanation:
      'This is a standard BDO security confirmation email from bdo.com.ph. It contains no links or requests.',
  },
  {
    id: 16,
    category: 'Personal Message (Social Media)',
    medium: 'Social Media',
    isScam: true,
    sender: 'Col. James Morrison',
    senderDetail: 'Facebook Messenger Profile: US Army, deployed Syria, widower',
    body: 'My love, I am so sorry to bother you with this. I would never ask if I had any other option.\n\nI am stranded at the Damascus airport my military transport was cancelled and I need to buy a civilian ticket back to the US. The cost is $800.\n\nPlease send via Western Union or GCash. You are the only person I trust in this world. \ud83d\ude22',
    redFlags: [
      'Emergency money request after emotional relationship',
      'Asks for Western Union or GCash untraceable',
      "'Pay you back double' is manipulation",
      'US military have official travel support',
    ],
    clue: 'Has this person ever video-called you with their face clearly visible?',
    explanation:
      "This is the 'stranded abroad' money trap. US military personnel never need civilian funds.",
  },
  {
    id: 17,
    category: 'Utility Payment Notice (SMS)',
    medium: 'SMS',
    isScam: true,
    sender: 'Meralco',
    senderDetail: '',
    body: 'MERALCO NOTICE: Your electricity service for account 104-582-0011 is scheduled for DISCONNECTION tomorrow due to an unpaid balance of \u20b13,841.50.\n\nAvoid disconnection pay at: <span class="text-blue-600 underline">meralco-payment.online/settle</span>',
    redFlags: [
      "Sender is a mobile number, not Meralco's official 1622",
      "Domain 'meralco-payment.online' is not meralco.com.ph",
      'Disconnection threat creates urgency',
    ],
    clue: "Meralco's official payment portal is meralco.com.ph.",
    explanation:
      'Meralco does not send disconnection notices WITH CLICKABLE LINKS via mobile numbers. All payments go through meralco.com.ph only.',
  },
  {
    id: 18,
    category: 'Marketplace Chat (App)',
    medium: 'Marketplace',
    isScam: true,
    sender: 'Shopee Seller: gadgets_cheapph',
    senderDetail: 'Shopee In-App Chat',
    body: 'Hi po! Salamat sa inyong order. Pasensya na po pero na-sold out na po yung stocks namin sa Shopee.\n\nPero meron pa po kaming available sa aming personal stock mas mura pa po pag direct.\n\nPwede po nating i-transact sa labas? Ibigay lang po ang GCash number at bayad na po.',
    redFlags: [
      'Pushes transaction outside Shopee',
      "Claims stock is 'sold out' but has personal stock",
      'GCash payment outside platform is untraceable',
    ],
    clue: "Shopee's Buyer Protection only works if you pay INSIDE the app.",
    explanation:
      'This is off-platform scamming. Once you pay via GCash directly, there is no recourse.',
  },
  {
    id: 19,
    category: 'Customer Support Message (SMS)',
    medium: 'SMS',
    isScam: true,
    sender: 'GCash Support',
    senderDetail: '',
    body: 'Magandang araw po! Ito po si Ma. Reyes mula sa GCash Customer Service. Na-flag po ang inyong account para sa unusual activity.\n\nPara ma-secure po ang inyong account, kailangan naming i-verify ang inyong identity. Ipapadala namin ang OTP sa inyong number ibigay lang po sa amin.',
    redFlags: [
      'GCash support uses 2882, never a +63 mobile number',
      'GCash will NEVER ask for your OTP',
      "Framing OTP sharing as 'for your protection'",
    ],
    clue: 'Your OTP is the key to your account. No company should ever ask you to share it.',
    explanation: 'This is a fake GCash support OTP scam. Real GCash support never asks for OTPs.',
  },
  {
    id: 20,
    category: 'Transaction Notification (Email)',
    medium: 'Email',
    isScam: false,
    sender: 'Maya (formerly PayMaya)',
    senderDetail: 'no-reply@maya.ph',
    subject: "You've received \u20b11,500 from Jose Reyes",
    body: 'Hi Maria,\n\nGood news! You have received a money transfer.\n\nAmount: \u20b11,500.00\nFrom: Jose Reyes (+63 917 *** 4421)\nDate: April 3, 2026 4:55 PM\nTransaction ID: MAYA-20260403-99123\n\nYour new Maya balance: \u20b12,341.00\n\nCheck your wallet in the Maya app.',
    redFlags: [],
    clue: 'Check the sender domain and whether anything is being asked of you.',
    explanation: 'This is an authentic Maya transaction notification from no-reply@maya.ph.',
  },
  {
    id: 21,
    category: 'Government Services Notice (Email)',
    medium: 'Email',
    isScam: true,
    sender: 'SSS Social Security System',
    senderDetail: 'sss-onlineservices@sss-member-portal.com',
    subject: 'Your SSS Pension Application Additional Documents Required',
    body: 'Dear SSS Member,\n\nYour online pension application (Ref# SSS-2026-0403-7741) is under review. Our records show a discrepancy in your submitted documents.\n\nTo avoid delays, please log in and re-upload:\n\u2022 Government-issued ID (front & back)\n\u2022 Latest payslip\n\u2022 Bank account details for pension disbursement\n\nDeadline: April 10, 2026.',
    cta: 'LOG IN TO SSS PORTAL',
    redFlags: [
      "Domain is 'sss-member-portal.com' SSS's real domain is sss.gov.ph",
      'Government agency not using .gov.ph',
      'Asks for bank account details',
      'Requests sensitive documents through non-official portal',
    ],
    clue: "SSS's official website is sss.gov.ph. All member portal access goes through that domain only.",
    explanation:
      'This is a spear phishing attack targeting SSS members. The fake domain is designed to steal your credentials.',
  },
  {
    id: 22,
    category: 'Investment Opportunity (Social Media)',
    medium: 'Social Media',
    isScam: true,
    sender: 'Mei Lin',
    senderDetail: 'WhatsApp referred via Facebook group',
    body: "Hi! Sorry to message you out of nowhere I got your number from the investment group. I'm Mei Lin, based in Singapore. I've been doing crypto trading for 3 years.\n\nMy uncle manages a private trading platform. Last month I made \u20b1180,000 from a \u20b130,000 deposit.\n\nInterested? I can guide you step by step. \ud83d\ude0a",
    redFlags: [
      'Unsolicited contact from stranger',
      '500% returns in one month is unrealistic',
      "'Private platform' = pig butchering",
      'Will coach you to deposit, show fake profits, then freeze your account',
    ],
    clue: "Any stranger offering 500% returns on a 'private platform' is running a scam. No exceptions.",
    explanation:
      "This is the 'pig butchering' romance-investment scam. The platform is fake and controlled by scammers.",
  },
  {
    id: 23,
    category: 'One-Time Password (SMS)',
    medium: 'SMS',
    isScam: false,
    sender: 'BPI',
    senderDetail: '',
    body: 'BPI: Your BPI OTP is 738291. Use this to complete your transaction. Valid for 5 minutes. Never share this code with anyone, including BPI staff. If you did not request this, call 889-100 immediately.',
    redFlags: [],
    clue: 'Did you initiate a transaction just now? Is the sender a registered short code?',
    explanation:
      "This OTP was sent from BPI's official short code in response to a transaction you initiated.",
  },
  {
    id: 24,
    category: 'Shipping Update (App)',
    medium: 'Marketplace',
    isScam: true,
    sender: 'Seller: budgetgadgets_mnl',
    senderDetail: 'Carousell Chat + Screenshot sent via Messenger',
    body: 'Shipped na po! Napadala ko na kanina. Heto po ang tracking number at receipt.\n\n[Attached: LBC receipt showing Tracking No. LBC9988120044PH, Sender: Budget Gadgets, Recipient: Maria Santos, Pasig City, Status: ACCEPTED April 3, 2026]\n\nMacheck na lang po sa LBC website. 3\u20135 days po ang delivery.',
    redFlags: [
      'Always verify tracking numbers directly on lbcexpress.com',
      'Tracking numbers can be fabricated or reused',
      'Seller pushed for GCash payment before showing proof',
    ],
    clue: 'A screenshot of a receipt proves nothing. Go to lbcexpress.com yourself.',
    explanation:
      'Forged shipping receipts are one of the most common online seller scams in the Philippines.',
  },
  {
    id: 25,
    category: 'Security Notification (Email)',
    medium: 'Email',
    isScam: true,
    sender: 'BDO Unibank',
    senderDetail: 'security@bd0.com',           
    subject: 'Security Notice: Unusual login detected on your BDO account',
    body: '...',
    cta: 'SECURE MY ACCOUNT',
    footer: 'BDO Unibank 24/7 Customer Security Team',
    redFlags: [
      "The sender domain uses a zero ('0') instead of the letter 'O' (bd0.com)",
      'CTA goes to a cloned BDO login page',
      'Creates urgency by claiming an unrecognized login',
    ],
    clue: "Look extremely closely at the sender's email address. Does it spell 'bdo' correctly?",
    explanation:
      "This uses a typosquatting attack. The sender replaced the letter 'O' with the number '0' (bd0.com). Real BDO emails always use the exact domain bdo.com.ph — and scammers cannot register .com.ph domains due to dotPH's strict local verification requirements.", // ← updated
  },
];

// ═══════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════

export type Lang = 'en' | 'fil' | 'ceb';

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    'nav.home': 'HOME',
    'nav.scam_info': 'SCAM INFO',
    'nav.about_us': 'ABOUT US',
    'nav.try_me': 'TRY ME',
    'nav.learn_scam': 'Learn About Scam',
    'nav.learn_scam_desc': 'Understand the fundamentals',
    'nav.how_detect': 'How to Detect',
    'nav.how_detect_desc': 'Spot the warning signs early',
    'hero.title1': 'Think Before',
    'hero.title2': 'You Click.',
    'hero.subtitle':
      'Every click is a choice. Make it a safe one. Learn to spot scams before they spot you.',
    'hero.btn_learn': 'Start Learning',
    'hero.btn_report': 'Report Incident',
    'about.badge': 'Our Core Mission',
    'about.title1': 'LEARN ABOUT',
    'about.title2': 'THE CAMPAIGN',
    'about.body':
      'P.R.O.O.F is a proactive awareness campaign designed to educate and protect the community from malicious digital threats. Our mission is to ensure everyoneespecially vulnerable populationscan navigate the digital landscape securely.',
    'about.team_title1': 'The Team',
    'about.team_title2': 'Behind it',
    'home.join_title': 'Join Our Mission',
    'home.join_body':
      "We're always looking for passionate individuals to join our cause. Together, we can make the internet safer.",
    'home.volunteer_btn': 'Volunteer Now',
    'quiz.page_title': 'TEST YOUR SKILLS',
    'quiz.page_subtitle':
      "25 real-world scenarios. One goal: can you spot the scam before it's too late?",
    'quiz.module_label': 'Scam Identification Module',
    'quiz.btn_scam': "IT'S A SCAM",
    'quiz.btn_legit': 'SEEMS LEGIT',
    'quiz.btn_next': 'Next Scenario',
    'quiz.btn_restart': 'Restart Assessment',
    'quiz.complete_title': 'Assessment Complete',
    'footer.mission':
      'Our mission is to empower the community through education and timely alerts.',
    'footer.quick_links': 'Quick Links',
    'footer.copyright': '\u00a9 2026 P.R.O.O.F Scam Awareness Campaign. All rights reserved.',
    'a11y.title': 'Accessibility',
    'a11y.dark_mode': 'Dark Mode',
    'a11y.large_text': 'Large Text',
    'a11y.readable_font': 'Readable Font',
    'a11y.high_contrast': 'High Contrast',
    'a11y.grayscale': 'Grayscale',
    'a11y.highlight_links': 'Highlight Links',
    'a11y.stop_animations': 'Stop Animations',
    'a11y.dyslexic_font': 'Dyslexia Font',
    'a11y.big_cursor': 'Big Cursor',
    'a11y.reset': 'Reset All',
    'a11y.language_title': 'Language',
  },
  fil: {
    'nav.home': 'TAHANAN',
    'nav.scam_info': 'IMPORMASYON SA SCAM',
    'nav.about_us': 'TUNGKOL SA AMIN',
    'nav.try_me': 'SUBUKAN',
    'nav.learn_scam': 'Matuto Tungkol sa Scam',
    'nav.learn_scam_desc': 'Unawain ang mga pangunahing konsepto',
    'nav.how_detect': 'Paano Matukoy',
    'nav.how_detect_desc': 'Kilalanin ang mga babala nang maaga',
    'hero.title1': 'Mag-isip Muna',
    'hero.title2': 'Bago I-click.',
    'hero.subtitle':
      'Mabilis na umuunlad ang mga cyber threat. Pangalagaan ang inyong digital na pagkakakilanlan sa pamamagitan ng kamalayan sa cybersecurity.',
    'hero.btn_learn': 'Magsimulang Matuto',
    'hero.btn_report': 'Mag-ulat ng Insidente',
    'about.badge': 'Ang Aming Pangunahing Misyon',
    'about.title1': 'ALAMIN ANG',
    'about.title2': 'KAMPANYA',
    'about.body':
      'Ang P.R.O.O.F. ay isang proaktibong kampanya ng kamalayan na dinisenyo upang turuan at protektahan ang komunidad mula sa mga mapanganib na digital na banta. Ang aming misyon ay tiyaking ang lahat, lalo na ang mga mahihinang populasyon, ay makakapag-navigate sa digital na mundo nang ligtas.',
    'about.team_title2': 'sa Likod Nito',
    'home.join_title': 'Sumali sa Aming Misyon',
    'home.join_body':
      'Palagi kaming naghahanap ng mga taong may pagmamahal upang sumali sa aming layunin.',
    'home.volunteer_btn': 'Mag-boluntaryo Ngayon',
    'quiz.page_title': 'SUBUKAN ANG INYONG MGA KAKAYAHAN',
    'quiz.page_subtitle': '25 totoong senaryo. Isang layunin: makikita mo ba ang scam bago mahuli?',
    'quiz.module_label': 'Modyul ng Pagkilala sa Scam',
    'quiz.btn_scam': 'ITO AY SCAM',
    'quiz.btn_legit': 'MUKHANG LEHITIMO',
    'quiz.btn_next': 'Susunod na Senaryo',
    'quiz.btn_restart': 'Ulitin ang Pagtatasa',
    'quiz.complete_title': 'Kumpleto ang Pagtatasa',
    'footer.mission':
      'Ang aming misyon ay bigyang-kapangyarihan ang komunidad sa pamamagitan ng edukasyon.',
    'footer.quick_links': 'Mabilis na Link',
    'footer.copyright':
      '\u00a9 2026 P.R.O.O.F Kampanya ng Kamalayan sa Scam. Lahat ng karapatan ay nakalaan.',
    'a11y.title': 'Accessibility',
    'a11y.dark_mode': 'Madilim na Mode',
    'a11y.large_text': 'Malaking Teksto',
    'a11y.readable_font': 'Madaling Basahing Font',
    'a11y.high_contrast': 'Mataas na Kontraste',
    'a11y.grayscale': 'Grayscale',
    'a11y.highlight_links': 'I-highlight ang mga Link',
    'a11y.stop_animations': 'Ihinto ang Animasyon',
    'a11y.dyslexic_font': 'Font para sa Dyslexia',
    'a11y.big_cursor': 'Malaking Cursor',
    'a11y.reset': 'I-reset Lahat',
    'a11y.language_title': 'Wika',
  },
  ceb: {
    'nav.home': 'PANIMALAY',
    'nav.scam_info': 'KASAYURAN SA SCAM',
    'nav.about_us': 'MAHITUNGOD KANAMO',
    'nav.try_me': 'SULAYAN',
    'nav.learn_scam': 'Pagkat-on Bahin sa Scam',
    'nav.learn_scam_desc': 'Sabta ang mga pundasyon',
    'nav.how_detect': 'Unsaon Pagkita',
    'nav.how_detect_desc': 'Mailhan ang mga timailhan sa sayo',
    'hero.title1': 'Mag-isip Una',
    'hero.title2': 'Sa Dili Ka Mag-klik.',
    'hero.subtitle':
      'Dali ra mag-ilis ang mga cyber threat. Panalipdi ang imong digital nga pagkatawo pinaagi sa kahibalo sa cybersecurity.',
    'hero.btn_learn': 'Sugdi ang Pagkat-on',
    'hero.btn_report': 'I-report ang Insidente',
    'about.badge': 'Ang Among Panguna nga Misyon',
    'about.title1': 'PAGKAT-ON BAHIN SA',
    'about.title2': 'KAMPANYA',
    'about.body':
      'Ang P.R.O.O.F. usa ka proaktibong kampanya sa kahibalo nga gilaraw aron matudloan ug maprotektahan ang komunidad gikan sa mga mapanganib nga digital nga hulga. Ang among misyon mao ang pagsiguro nga ang tanan, ilabi na ang mga madaogon nga populasyon, makapaglihok sa digital nga kalibutan nga luwas.',    'about.team_title1': 'Ang Pundok',
    'about.team_title2': 'Sa Luyo Niini',
    'home.join_title': 'Apil sa Among Misyon',
    'home.join_body': 'Kanunay kaming naghanap ug mga tawo aron moapil sa among katuyoan.',
    'home.volunteer_btn': 'Mag-boluntaryo Karon',
    'quiz.page_title': 'SULAYAN ANG IMONG MGA KAHANAS',
    'quiz.page_subtitle': '25 ka senaryo. Usa ka tumong: makit-an ba nimo ang scam?',
    'quiz.module_label': 'Modulo sa Pag-ila sa Scam',
    'quiz.btn_scam': 'SCAM KINI',
    'quiz.btn_legit': 'DALING LEHITIMO',
    'quiz.btn_next': 'Sunod nga Senaryo',
    'quiz.btn_restart': 'Sugdan Pag-usab',
    'quiz.complete_title': 'Kompleto ang Pagtuki',
    'footer.mission':
      'Ang among misyon mao ang paghatag ug gahom sa komunidad pinaagi sa edukasyon.',
    'footer.quick_links': 'Dali nga mga Link',
    'footer.copyright':
      '\u00a9 2026 P.R.O.O.F Kampanya sa Kahibalo sa Scam. Tanan nga katungod gitagana.',
    'a11y.title': 'Accessibility',
    'a11y.dark_mode': 'Dark Mode',
    'a11y.large_text': 'Dako nga Teksto',
    'a11y.readable_font': 'Sayon Basahon nga Font',
    'a11y.high_contrast': 'Taas nga Kontraste',
    'a11y.grayscale': 'Grayscale',
    'a11y.highlight_links': 'I-highlight ang mga Link',
    'a11y.stop_animations': 'Ihunong ang Animasyon',
    'a11y.big_cursor': 'Dako nga Cursor',
    'a11y.reset': 'I-reset Tanan',
    'a11y.language_title': 'Pinulongan',
  },
};
