<div align="center">

<img src="rss%20feed/logo.png" alt="P.R.O.O.F logo" width="96">

# P.R.O.O.F

**Learn the warning signs before a scam reaches you.**

A Philippine online scam awareness website with news links, educational guides, statistics, and a scenario-based assessment.

[Quick Start](#quick-start) · [Features](#features) · [How it works](#how-it-works) · [Documentation](#documentation) · [Development](#development)

[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](#tech-stack)
[![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](#tech-stack)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](#tech-stack)
[![License: Custom terms](https://img.shields.io/badge/License-Custom_terms-blue.svg)](src/components/TermsOfUseSection.tsx)

</div>

<br>

## Quick Start

### Requirements

- **Node.js 22 and npm**, matching the repository's automation workflow.
- **An internet connection for dependency setup.** The committed news data is sufficient to start the frontend; refreshing the feeds is optional.

### Run locally

From the repository root:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. The home page provides access to scam information, news links, and the assessment. No database or application API server needs to be configured.

<br>

## Features

P.R.O.O.F brings scam-awareness material into one place for readers in the Philippines. It combines explanations and examples with links readers can investigate for themselves.

- **Recognize common scams.** Explore how phishing, fake sellers, prize messages, account impersonation, and related tactics work. Each guide explains warning signs and precautions rather than simply naming the scam.
- **Browse local and international news.** Switch between article collections and open the original publisher's page. Headlines, publisher names, and dates help readers judge which sources to inspect.
- **Practise with scenarios.** Work through 25 predefined situations, decide whether each is a scam or legitimate, and read the explanation. The assessment includes clues, feedback, scoring, and a restart option.
- **Read the statistics.** Summary cards and charts present category breakdowns and annual case counts from the project's datasets. These figures are maintained separately from the news collection.
- **Adjust the reading experience.** Language options cover English, Filipino, and Cebuano. Display controls include text size, contrast, alternative fonts, and reduced animation; translation coverage remains partial.
- **Find reporting resources.** Follow links to Philippine agencies' own channels. The site does not receive incident reports or submit them on a reader's behalf.

<br>

## How it works

The React frontend uses two content paths. Educational material, scenarios, and statistics come from source-controlled data and components. News cards read a separate JSON file that can be refreshed without rewriting those materials.

| Content | Source | Update method |
| --- | --- | --- |
| Guides, assessment, and statistics | [data.ts](src/components/data.ts) and page components | Repository edits |
| Local and international article links | [alerts.json](rss%20feed/alerts.json) | Feed script and scheduled workflow |

The alerts view fetches `alerts.json` when it mounts; it does not continuously poll or fetch RSS feeds in the browser. [Vite configuration](vite.config.ts) exposes the `rss feed` directory as public assets and uses relative paths for the static build.

The separate [feed script](rss%20feed/fetch-alerts.js) fetches configured RSS/Atom feeds and news searches, filters titles and summaries, normalizes metadata, and removes near-duplicate stories. It merges recent entries into a 30-day window and retains up to 12 articles per collection. Relevance filtering does not independently fact-check the articles.

The [refresh workflow](.github/workflows/fetch-alerts.yml) is configured for every 12 hours and manual runs. When the JSON changes, it commits the update and invokes the configured `VERCEL_DEPLOY_HOOK_URL` secret. Feed freshness and publication depend on those operations succeeding; the schedule alone does not establish a live deployment's status.

<br>

## Tech Stack

The application builds as a static site. Its interactive state stays in React, while a separate Node.js job prepares the news data.

| Technology | Responsibility |
| --- | --- |
| React 18 and TypeScript/TSX | Page components, navigation, and assessment interactions |
| Vite 6 | Local development server and production bundle |
| Tailwind CSS 4 | Interface styling through the Vite integration |
| Recharts | Category and annual case-count charts |
| Node.js and GitHub Actions | Feed processing and conditional deployment-hook invocation |

<br>

## Development

The available commands are defined in [package.json](package.json). Run them from the repository root after dependency setup:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Write the static production bundle to `dist/` |
| `npm run lint` | Check configured source files with ESLint |
| `npm run format` | Rewrite file formatting with Prettier |

To refresh the committed article collection manually, use an internet-connected environment:

```bash
node "rss feed/fetch-alerts.js"
```

This command can modify `rss feed/alerts.json`; it does not update statistics or assessment questions. Review the resulting data before committing it.

Build and lint are separate checks. The repository supplies no automated test suite or dedicated type-check command, and a successful Vite build alone would not establish complete type safety.

<br>

## Documentation

The repository's reference material lives alongside the implementation:

- [Educational content and datasets](src/components/data.ts): scenario content, statistics, and language strings used by the site.
- [Campaign background](src/components/AboutSection.tsx): the content behind the About view, including contributor roles.
- [Terms of use](src/components/TermsOfUseSection.tsx): the published conditions for using and sharing project material.
- [News automation](.github/workflows/fetch-alerts.yml): the refresh schedule, commit step, and deployment-hook configuration.

<br>

## Known Limitations

- News freshness depends on feed availability, successful workflow runs, and deployment. Filtering cannot guarantee factual accuracy or complete coverage.
- Statistics and scenarios require repository edits. Their source labels do not independently verify every figure or example.
- Some content remains English despite the language selector. Display controls are implemented, but accessibility conformance has not been established.
- Fonts, publisher icons, and linked articles can depend on external services. Offline operation is not guaranteed.

<br>

## Acknowledgements

The campaign team contributed the research, educational material, and web interface; roles appear in the application's [About content](src/components/AboutSection.tsx). News cards link to their original publishers, and chart source labels are maintained with the [datasets](src/components/data.ts).

<br>

## License

The project uses the [custom terms published in the application](src/components/TermsOfUseSection.tsx). They describe personal, non-commercial educational use, require attribution for permitted educational sharing, and require prior written consent for reproduction, redistribution, or modification.

No standalone project license file or package license declaration is supplied. The badge links to these existing terms; it does not identify a standard open-source license.
