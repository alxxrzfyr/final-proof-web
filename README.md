
<div align="center">

<img src="https://img.shields.io/badge/status-live-brightgreen?style=for-the-badge" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
<img src="https://img.shields.io/badge/Updates-Every_12_Hours-0075CA?style=for-the-badge&logo=githubactions&logoColor=white" />

# 🛡️ P.R.O.O.F

### Program for Responsible Online Operations and Fraud-awareness

**A localized, tech-driven campaign platform designed to protect Filipinos from online scams and cyber fraud.**

P.R.O.O.F delivers real-time scam alerts, data-backed statistics, educational resources, and direct links to official government reporting agencies — all in one free, automatically updated website built for the Philippines.

**🌐 [Visit the Live Website →](https://proof-web.vercel.app)**

</div>

---

## 📌 Table of Contents

- [Executive Summary](#-executive-summary)
- [Why P.R.O.O.F?](#-why-proof)
- [Features](#-features)
  - [Live Scam Alerts](#-live-scam-alerts)
  - [Statistics Dashboard](#-statistics-dashboard)
  - [Scam Type Encyclopedia](#-scam-type-encyclopedia)
  - [Interactive Scenarios](#-interactive-scenarios-try-me)
  - [How to Report](#-how-to-report)
- [How the Automation and Logic Works](#-how-the-automation-and-logic-works)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started Locally](#-getting-started-locally)
- [GitHub Actions Workflows](#-github-actions-workflows)
- [Secrets and Environment Variables](#-secrets-and-environment-variables)
- [Official Reporting Channels](#-official-reporting-channels)
- [Contributing](#-contributing)
- [Code of Conduct](#-code-of-conduct)
- [Attributions and Acknowledgements](#-attributions-and-acknowledgements)
- [License](#-license)

---

## 📖 Executive Summary

With the rapid digitalization of financial and social services in the Philippines, phishing, identity theft, and online scams have surged to unprecedented levels. P.R.O.O.F was developed as an educational and preventive response to this growing national threat.

The platform bridges the gap between complex cybersecurity concepts and the general public. It pulls verified cybercrime advisories from trusted local domains and top-tier global journalism every single day, surfaces them in a bilingual (English and Filipino) accessible interface, and pairs them with factual statistics and educational resources. No subscriptions. No algorithms. Just free, accurate, and always-current scam awareness, deployed automatically to Vercel on every update.

---

## 🇵🇭 Why P.R.O.O.F?

Online fraud is one of the fastest-growing threats to Filipinos. Nearly **8 in 10 Filipino adults** encounter scams annually. Despite the scale of the problem, information about active scams remains fragmented across government websites, social media posts, and news articles that most people never see.

P.R.O.O.F exists to change that. It pulls verified cybercrime advisories from trusted Philippine sources, surfaces them in a clean and accessible interface, and pairs them with factual statistics and educational resources so every Filipino can stay one step ahead of bad actors.

---

## ✨ Features

### 🔴 Live Scam Alerts
> _Always current. Automatically updated every 12 hours._

The alerts feed is the core of P.R.O.O.F. A GitHub Actions workflow runs on a 12-hour schedule, pulling fresh RSS feeds from a curated whitelist of reliable cybersecurity journalists and local news sources. Every alert on the platform has been sourced from a verified, trusted domain and fact-checked via strict programmatic filters.

Each alert card displays:
- **Headline** — the title of the advisory or news report
- **Source logo** — so you immediately know which agency or outlet published it (powered by DuckDuckGo Favicon API)
- **Publication date** — formatted and normalized across all feed sources
- **Direct link** — takes you straight to the original article or advisory

### 📊 Statistics Dashboard
> _Real numbers. Real context. Powered by Recharts._

The statistics section presents verified Philippine cybercrime data through a set of fully interactive, responsive charts covering:
- **Scam Type Distribution**: A breakdown of the most reported fraud categories
- **Victim Demographics**: Age group and regional data showing which populations are most targeted
- **Financial Loss Trends**: Year-over-year data on total reported financial losses
- **Incident Volume Over Time**: Monthly and annual reported cybercrime incident counts

### 🎣 Scam Type Encyclopedia
> _Know what to look for before it's too late._

P.R.O.O.F documents the most common fraud tactics actively targeting Filipinos, written in plain and accessible language. Includes mechanics, red flags, and avoidance strategies for Phishing, Smishing, Vishing, Online Selling Scams, Love Scams, Investment Fraud, SIM Swap Attacks, Job Scams, and Parcel Scams.

### 🧪 Interactive Scenarios ("Try Me")
> _Practice identifying scams in a safe, consequence-free environment._

Engaging simulation modules let users test their ability to spot phishing attempts and fraudulent schemes before encountering them in the real world.

### 📣 How to Report
> _Because knowing who to call is half the battle._

The reporting section provides direct, up-to-date contact information for every major Philippine agency that handles cybercrime and fraud, outlining their mandates and hotlines clearly.

---

## ⚙️ How the Automation and Logic Works

P.R.O.O.F has no backend server or traditional database. Live data flows through a fully automated pipeline driven by **GitHub Actions** and a zero-dependency **Node.js** scraper. When new alerts are written, the updated JSON is committed back to the repository, which triggers a Vercel deployment automatically via a secure API token stored as a GitHub Actions secret.

### The Logic (`rss feed/fetch-alerts.js`)

**1. The Sources**

- **Local (PH):** Analyzes Google News RSS filtered tightly to Philippine domains (`gmanetwork.com`, `inquirer.net`, `mb.com.ph`, etc.) or articles containing Philippine-centric keywords.
- **International:** Relies on dedicated cybersecurity journalism (`Krebs On Security`, `The Guardian Scam feed`) plus a strict News aggregator filtered only to highly credible global publishers (`reuters`, `bbc`, `apnews`, `wired`, `wall street journal`, etc.).

**2. The Filter (Regex)**

Every single article downloaded is tested against a rigid Regular Expression looking for specific online scam identifiers (e.g., `phishing`, `pig butchering`, `crypto scam`, `sim swap`, `ransomware`). If an article does not explicitly discuss an online scam or fraud, or does not stringently match the domain whitelist, it is automatically dropped.

**3. The Output**

Verified articles are formatted, date-normalized, assigned a publisher logo, and saved directly into `rss feed/alerts.json` (max 12 alerts per category).

A simplified look at what the scraper does under the hood:

```javascript
// fetch-alerts.js — core pipeline logic (simplified)
const scamRegex = /phishing|pig butchering|crypto scam|sim swap|ransomware/i;

async function fetchAndFilter(feedUrl) {
  const items = await parseRSS(feedUrl);
  return items.filter(item => scamRegex.test(item.title + item.description));
}

async function run() {
  const local  = await fetchAndFilter(PH_GOOGLE_NEWS_RSS);
  const global = await fetchAndFilter(KREBS_RSS);

  const verified = [...local, ...global]
    .map(item => attachLogo(item))     // DuckDuckGo favicon API
    .map(item => normalizeDate(item))  // Consistent ISO date format
    .slice(0, 12);                     // Max 12 alerts per category

  fs.writeFileSync('rss feed/alerts.json', JSON.stringify(verified, null, 2));
  console.log(`✅ Done — ${verified.length} alerts written to alerts.json`);
}

run();
```

### The Pipeline

```
┌──────────────────────────────────────────────────────────────────┐
│           GitHub Actions Cron — Triggers Every 12 Hours          │
│                    (or manually via workflow_dispatch)           │
└───────────────────────────────┬──────────────────────────────────┘
                                │
                                ▼
                   ┌────────────────────────┐
                   │    fetch-alerts.js     │
                   │   (Node.js scraper)    │
                   └────────────┬───────────┘
                                │
           ┌────────────────────┼────────────────────┐
           ▼                    ▼                     ▼
    Pull RSS feeds        Apply scam regex       Attach favicons
    from whitelisted      filter — drop all      via DuckDuckGo
    PH + global           non-matching           Favicon API +
    sources               articles               normalize dates
           │                    │                     │
           └────────────────────┴─────────────────────┘
                                │
                                ▼
                  Writes → rss feed/alerts.json
                                │
                                ▼
             Git commit pushed by PROOF Alert Bot
                    to the main branch
                                │
                                ▼
                    Triggers deploy.yml workflow
                                │
                                ▼
              Vite builds the production bundle
              (dist/ with rss feed/ assets included)
                                │
                                ▼
         ┌──────────────────────────────────────────┐
         │         Vercel Deployment via API        │
         │                                          │
         │  Uses VERCEL_TOKEN secret stored in      │
         │  GitHub Actions to authenticate and      │
         │  push the fresh build to Vercel.         │
         │                                          │
         │  No GitHub Pages. Vercel handles all     │
         │  static hosting and CDN distribution.    │
         └──────────────────────────────────────────┘
                                │
                                ▼
              ✅ Live at https://proof-web.vercel.app
```

> **Why Vercel?** Vercel provides instant global CDN distribution, automatic HTTPS, zero-config deployment, and significantly faster cold-start times compared to GitHub Pages. The `VERCEL_TOKEN` secret stored in GitHub Actions is the only credential needed to authenticate and trigger deployments programmatically on every push.

---

## 🛠️ Tech Stack

| Technology | Role |
| --- | --- |
| [React 18](https://react.dev/) | UI framework |
| [Vite 5](https://vitejs.dev/) | Build tool and dev server |
| [TypeScript 5](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | Core scripting language for `fetch-alerts.js` |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) | Reusable component architecture |
| [Radix UI](https://www.radix-ui.com/) | Accessible, headless UI primitives |
| [Material UI (MUI)](https://mui.com/) | Additional comprehensive components |
| [Recharts](https://recharts.org/) | Interactive data visualization |
| [Framer Motion / Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) | Micro-interactions and animations |
| [Node.js](https://nodejs.org/) | Runtime for the `fetch-alerts.js` scraper |
| [GitHub Actions](https://github.com/features/actions) | 12-hour automation and CI/CD pipeline |
| [Vercel](https://vercel.com/) | Production hosting and global CDN |
| [Figma](https://figma.com/) | Original design source |
| [ESLint and Prettier](https://eslint.org/) | Code formatting and linting rules |

---

## 📁 Project Structure

```
PROOF-WEBSITE/
├── .github/
│   └── workflows/               # Builds Vite bundle and deploys to Vercel via API token
│       └── fetch-alerts.yml     # Cron: pulls latest scam news every 12 hours
├── guidelines/                  # Project guidelines and internal documentation
├── rss feed/                    # Static data storage (treated as Vite public dir)
│   ├── alerts.json              # Auto-generated alert database (overwritten each run)
│   └── fetch-alerts.js          # Core automation — RSS fetcher, filter, and formatter
├── src/
│   ├── assets/                  # Local images and background assets
│   ├── components/              # Reusable React components
│   │   ├── figma/               # Exported Figma design components
│   │   └── ui/                  # shadcn/ui and Radix UI primitives
│   ├── hooks/                   # Custom React hooks (e.g., use-mobile)
│   ├── lib/                     # Utility functions and helpers (e.g., utils.ts)
│   ├── styles/                  # Global fonts and Tailwind CSS configuration
│   ├── App.tsx                  # Root React component and page routing
│   └── main.tsx                 # Application entry point
├── eslint.config.js             # ESLint rules
├── index.html                   # Main HTML template
├── package.json                 # NPM dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
└── vite.config.ts               # Configured to expose 'rss feed/' as a public static dir
```

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone and Install

```bash
git clone https://github.com/alxxrzfyr/proof-web.git
cd proof-web
git checkout main
npm install
```

### 2. Fetch Alerts Locally

You can update the live scam feed manually on your machine before running the app. Run the fetcher script located in the `rss feed/` directory:

```bash
node "rss feed/fetch-alerts.js"
```

Expected output:

```console
[PROOF Alert Bot] Fetching PH sources...  ✔
[PROOF Alert Bot] Fetching global sources... ✔
[PROOF Alert Bot] Applying scam regex filter...
[PROOF Alert Bot] 9 PH articles matched. 7 global articles matched.
✅ Done — 12 alerts written to alerts.json
```

This command connects to the internet to pull the latest security RSS feeds, applies the strict scam regex filters, formats the remaining data, pulls domain favicons, and completely overwrites `rss feed/alerts.json` with fresh data.

### 3. Start the Development Server

```bash
npm run dev
```

```console
  VITE v5.x.x  ready in 312 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

> **Note:** The frontend automatically reads the local `alerts.json` via `fetch('alerts.json')` because Vite is configured (`vite.config.ts` via the `publicDir` flag) to treat the `rss feed/` directory exactly like a standard public static assets folder.

### 4. Build for Production

```bash
npm run build
```

```console
vite v5.x.x building for production...
✓ 84 modules transformed.
dist/index.html                  0.46 kB │ gzip:  0.30 kB
dist/assets/index-[hash].css    42.18 kB │ gzip:  8.91 kB
dist/assets/index-[hash].js    312.04 kB │ gzip: 91.23 kB
✓ built in 3.21s
```

This outputs an optimized React bundle to the `dist/` directory, copying the `rss feed/` assets alongside the compiled JavaScript and CSS. The `dist/` folder is what Vercel receives and deploys.

### 5. Lint and Format

```bash
# Catch errors with ESLint
npm run lint

# Auto-format with Prettier
npm run format
```

---

## 🤖 GitHub Actions Workflows

### `fetch-alerts.yml`

| Property | Value |
| --- | --- |
| Trigger | Cron schedule — every 12 hours (`0 */12 * * *`) |
| Manual trigger | `workflow_dispatch` — run on demand from the GitHub Actions UI |
| What it does | Runs `"rss feed/fetch-alerts.js"`, then commits the updated `alerts.json` back to the `main` branch via the PROOF Alert Bot |

### `deploy.yml`

| Property | Value |
| --- | --- |
| Trigger | Any push to the `main` branch, including auto-commits from `fetch-alerts.yml` |
| What it does | Installs dependencies, runs `vite build` using the `rss feed/` public dir, then deploys the resulting `dist/` folder to Vercel using the `VERCEL_TOKEN` secret |

> **Important:** The site is deployed exclusively to **Vercel**, not GitHub Pages. The `deploy.yml` workflow authenticates with Vercel's API using a secret token stored in your repository settings. There is no GitHub Pages configuration in this project.

---

## 🔑 Secrets and Environment Variables

Deployments are driven by a single secret stored in GitHub Actions. You must configure this in your repository before the `deploy.yml` workflow can push to Vercel.

### Required Secret

| Secret Name | Where to Get It | What It Does |
| --- | --- | --- |
| `VERCEL_TOKEN` | [Vercel Dashboard](https://vercel.com/account/tokens) under **Account Settings > Tokens** | Authenticates the GitHub Actions runner to deploy your project to Vercel via the Vercel API |

### How to Add the Secret

1. Go to your GitHub repository
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Set the name to `VERCEL_TOKEN` and paste your token from the Vercel dashboard
5. Click **Add secret**

Once this secret is in place, every push to `main` (including the automated 12-hour alert commits) will trigger a fresh Vercel deployment automatically. No manual deploy steps are needed.

> **Tip:** You may also need `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` depending on how your `deploy.yml` is configured. These can be retrieved by running `vercel link` locally in the project directory and reading the generated `.vercel/project.json` file.

---

## 🏛️ Official Reporting Channels

If you or someone you know has been victimized by an online scam in the Philippines, report it immediately to one of these agencies:

| Agency | Handles | Contact |
| --- | --- | --- |
| **CICC** | All cybercrime coordination | [cicc.gov.ph](https://cicc.gov.ph) · Hotline **1326** |
| **PNP Anti-Cybercrime Group** | Criminal enforcement and cybercrime cases | [acg.pnp.gov.ph](https://acg.pnp.gov.ph) |
| **NBI Cybercrime Division** | Serious and syndicated cybercrime offenses | [nbi.gov.ph](https://nbi.gov.ph) |
| **BSP** | Bank-related fraud and financial scams | [bsp.gov.ph](https://bsp.gov.ph) · consumer@bsp.gov.ph |
| **DICT** | Digital governance and cyber policy | [dict.gov.ph](https://dict.gov.ph) |

> 💡 **Tip:** When reporting, prepare your evidence in advance. Screenshots of messages, transaction records, URLs, phone numbers, and email headers all significantly strengthen your case.

---

## 🤝 Contributing

Contributions are welcome. Here's how to get involved:

1. **Fork** the repository to your own GitHub account
2. **Create a feature branch** off `main` with a clear and descriptive name (e.g., `feat/add-new-scam-type` or `fix/alert-date-formatting`)
3. **Make your changes** and ensure the code passes all linting checks (`npm run lint`)
4. **Open a Pull Request** against `main` with a clear description of what you changed and why
5. Wait for review. All PRs are reviewed before merging

### Contribution Guidelines

- Keep PRs focused. One change per PR is preferred.
- Follow the existing code style. Run `npm run format` before committing.
- If you are adding a new scam type to the encyclopedia, include mechanics, red flags, and at least one avoidance tip.
- Do not commit sensitive credentials, API tokens, or personal data of any kind.
- All contributions are subject to the project license.

---

## 📋 Code of Conduct

This project is a community awareness initiative built to protect people. All contributors are expected to:

- Be respectful and constructive in all communications
- Not introduce misinformation, misleading content, or unverified scam advisories
- Not use this project or its codebase for commercial exploitation, phishing, or any purpose that could harm the users it is designed to protect
- Report any security vulnerabilities responsibly by opening a private GitHub issue or contacting the maintainer directly

---

## 🤝 Attributions and Acknowledgements

The original design for this platform was conceptualized and generated in Figma. Built using React, Vite, Tailwind CSS, and TypeScript. Scam alert content is sourced exclusively from verified, independent open-internet journalism and official Philippine government cybercrime advisories.

Special thanks to the cybersecurity journalism community, particularly Krebs On Security and The Guardian, for consistently reporting on online fraud in the public interest.

---

## 📄 License

This project is open-source and free to use for non-commercial, educational, and public awareness purposes. If you build on top of P.R.O.O.F, please retain attribution and do not use it to spread misinformation.

---

<div align="center">

_P.R.O.O.F is a community awareness initiative._
_It is not affiliated with any Philippine government agency._
_All links to official channels are provided for public convenience._

**Stay safe. Stay informed. Don't be the next victim. 🇵🇭**

</div>
