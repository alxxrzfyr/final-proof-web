# PRODUCT.md — P.R.O.O.F.

## What it is
P.R.O.O.F. (Program for Responsible Online Operations and Fraud-Awareness) is an academic
research campaign website that teaches people in the Philippines how to recognize, avoid,
and report online scams (phishing, fake prizes, fraudulent links, identity theft).

Live at https://proofph.vercel.app. Trilingual: English, Filipino, Cebuano.

## Who it is for
- Primary: Filipino adults aged 40 to 65 who use online banking, e-wallets (GCash, Maya),
  and social media but have limited cybersecurity awareness.
- Secondary: their families, teachers and panelists evaluating the research.

Implications: large readable type, high contrast, obvious controls, no hidden gestures as
the only way to do something, calm motion, works on mid-range Android phones.

## What visitors should feel
Trustworthy and official, but warm and approachable. Informed, not scared.

## Pages
- Home: what P.R.O.O.F. is, common scam types, who is vulnerable, why it matters, stats.
- About Scams: scam types in depth, plus "Alerts & Resources" (live news feed of local and
  international scam news, and official reporting agencies: CICC, NBI-CCD, PNP-ACG, BSP).
- Try Me: interactive scam-spotting quiz.
- About Us: campaign intro, research summary, group photo slideshow, Meet the Team.
- Terms of Use.

## Content truth (do not change without asking)
- Campaign name, acronym expansion, mission copy, research copy, citations.
- Team: 14 members, each shown with photo, name and role only (no bios).
- Agency logos and the CICC report link (https://cicc.gov.ph/report/).

## Brand constants
- Logo: `src/components/BrandLogo.tsx`.
- Core colors in use: deep blue `#0a2fad`, yellow `#facc15`, warm off-white `#f4f1ea` /
  `#f8f7f5`, near-black `#1a1816`.

## Data pipeline
`rss feed/fetch-alerts.js` runs on a GitHub Actions schedule
(`.github/workflows/fetch-alerts.yml`), writes `rss feed/alerts.json`, which Vite serves as a
public file (`publicDir: 'rss feed'`) and the About Scams page fetches at runtime.
