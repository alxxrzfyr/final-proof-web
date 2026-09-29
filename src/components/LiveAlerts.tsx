import { useMemo, useState } from 'react';
import type { Lang } from './data';

export interface Alert {
  id: string;
  title: string;
  url: string;
  source: string;
  category?: string;
  severity?: 'high' | 'medium';
  date?: string;
  rawDate?: string;
  logo?: string;
  scope?: 'local' | 'international';
}

export type AlertsStatus = 'loading' | 'ready' | 'error';
type Scope = 'local' | 'international';

const CATEGORY_LABEL: Record<string, Record<Lang, string>> = {
  phishing: { en: 'Phishing', fil: 'Phishing', ceb: 'Phishing' },
  ewallet: { en: 'Bank & e-wallet', fil: 'Bangko at e-wallet', ceb: 'Bangko ug e-wallet' },
  investment: { en: 'Investment', fil: 'Investment', ceb: 'Investment' },
  romance: { en: 'Romance', fil: 'Romance', ceb: 'Romance' },
  job: { en: 'Job & task', fil: 'Trabaho at task', ceb: 'Trabaho ug task' },
  shopping: { en: 'Shopping & travel', fil: 'Pamimili at biyahe', ceb: 'Pagpamalit ug biyahe' },
  impersonation: { en: 'Impersonation', fil: 'Pagpapanggap', ceb: 'Pagpakaaron-ingnon' },
  malware: { en: 'Hacking & malware', fil: 'Hacking at malware', ceb: 'Hacking ug malware' },
  general: { en: 'Scam news', fil: 'Balita sa scam', ceb: 'Balita sa scam' },
};

const copy = {
  en: {
    title: 'Latest scam news', sub: 'Headlines from trusted news outlets, checked twice a day.',
    local: 'Philippines', intl: 'International', updated: 'Updated', advisory: 'Advisory',
    read: 'Read on', loading: 'Loading the latest news…', error: 'We couldn’t load the news right now.',
    retry: 'Try again', empty: 'No recent stories here yet. Check back soon.', opens: '(opens in a new tab)',
    scopeLabel: 'Choose news region',
  },
  fil: {
    title: 'Pinakabagong balita sa scam', sub: 'Mga headline mula sa mapagkakatiwalaang balita, sinusuri dalawang beses sa isang araw.',
    local: 'Pilipinas', intl: 'Internasyonal', updated: 'Na-update', advisory: 'Babala',
    read: 'Basahin sa', loading: 'Kinukuha ang pinakabagong balita…', error: 'Hindi ma-load ang balita ngayon.',
    retry: 'Subukan muli', empty: 'Wala pang bagong balita dito. Bumalik mamaya.', opens: '(bubukas sa bagong tab)',
    scopeLabel: 'Pumili ng rehiyon ng balita',
  },
  ceb: {
    title: 'Pinakabag-ong balita sa scam', sub: 'Mga ulohan gikan sa kasaligan nga balita, gisusi kaduha sa usa ka adlaw.',
    local: 'Pilipinas', intl: 'Internasyonal', updated: 'Gi-update', advisory: 'Pasidaan',
    read: 'Basaha sa', loading: 'Gikuha ang pinakabag-ong balita…', error: 'Dili ma-load ang balita karon.',
    retry: 'Sulayi pag-usab', empty: 'Wala pay bag-ong balita dinhi. Balik unya.', opens: '(moabli sa bag-ong tab)',
    scopeLabel: 'Pilia ang rehiyon sa balita',
  },
} as const;

const LOCALE: Record<Lang, string> = { en: 'en-PH', fil: 'fil-PH', ceb: 'fil-PH' };

function relativeTime(iso: string | undefined, lang: Lang, fallback?: string) {
  if (!iso) return fallback ?? '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return fallback ?? '';
  const diff = (d.getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(LOCALE[lang], { numeric: 'auto' });
  const abs = Math.abs(diff);
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
  if (abs < 86400 * 14) return rtf.format(Math.round(diff / 86400), 'day');
  return d.toLocaleDateString(LOCALE[lang], { month: 'short', day: 'numeric', year: 'numeric' });
}

function SourceMark({ alert }: { alert: Alert }) {
  const [broken, setBroken] = useState(false);
  const initial = alert.source?.trim()?.[0]?.toUpperCase() ?? '•';
  return (
    <span className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#f4f1ea] ring-1 ring-[#1a1816]/10">
      {alert.logo && !broken ? (
        <img src={alert.logo} alt="" className="h-4 w-4 object-contain" loading="lazy" onError={() => setBroken(true)} />
      ) : (
        <span className="text-[11px] font-extrabold text-[#534d47]" aria-hidden="true">{initial}</span>
      )}
    </span>
  );
}

function Meta({ alert, lang }: { alert: Alert; lang: Lang }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 text-[14px] font-semibold text-[#534d47]">
      <SourceMark alert={alert} />
      <span className="truncate">{alert.source}</span>
      <span className="h-1 w-1 shrink-0 rounded-full bg-[#534d47]/40" aria-hidden="true" />
      <time dateTime={alert.rawDate} className="shrink-0 tabular-nums" title={alert.date}>
        {relativeTime(alert.rawDate, lang, alert.date)}
      </time>
    </div>
  );
}

function Tag({ alert, lang }: { alert: Alert; lang: Lang }) {
  const s = copy[lang] ?? copy.en;
  const cat = CATEGORY_LABEL[alert.category ?? 'general'] ?? CATEGORY_LABEL.general;
  const showCat = !!alert.category && alert.category !== 'general' && alert.category in CATEGORY_LABEL;
  if (alert.severity !== 'high' && !showCat) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {alert.severity === 'high' && (
        <span className="inline-flex items-center gap-1 rounded-full bg-[#b42318] px-2.5 py-1 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white">
          <span className="material-symbols-outlined text-[15px]" aria-hidden="true">campaign</span>
          {s.advisory}
        </span>
      )}
      {showCat && (
        <span className="rounded-full bg-[#0a2fad]/8 px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.06em] text-[#0a2fad]">
          {cat[lang] ?? cat.en}
        </span>
      )}
    </div>
  );
}

export function LiveAlerts({
  alerts, status, fetchedAt, lang, onRetry,
}: {
  alerts: Alert[]; status: AlertsStatus; fetchedAt?: string; lang: Lang; onRetry: () => void;
}) {
  const s = copy[lang] ?? copy.en;
  const [scope, setScope] = useState<Scope>('local');

  const byScope = useMemo(() => {
    const pick = (sc: Scope) =>
      alerts
        .filter((a) => a.scope === sc || (!a.scope && sc === 'local'))
        .sort((a, b) => new Date(b.rawDate ?? 0).getTime() - new Date(a.rawDate ?? 0).getTime())
        .slice(0, 12);
    return { local: pick('local'), international: pick('international') };
  }, [alerts]);

  const list = byScope[scope];
  // Lead with the newest official advisory if there is one, else the newest story.
  const leadIdx = Math.max(0, list.findIndex((a) => a.severity === 'high'));
  const lead = list[leadIdx];
  const rest = list.filter((_, i) => i !== leadIdx);

  const scopes: { key: Scope; label: string }[] = [
    { key: 'local', label: s.local },
    { key: 'international', label: s.intl },
  ];

  return (
    <div className="mb-12 sm:mb-16">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[60ch]">
          <h3
            className="text-balance leading-[1.05] tracking-[-0.02em] text-[#1a1816]"
            style={{ fontWeight: 900, fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)' }}
          >
            {s.title}
          </h3>
          <p className="mt-3 text-[17px] leading-relaxed text-[#534d47]" style={{ fontWeight: 500 }}>
            {s.sub}
            {fetchedAt && (
              <>
                {' '}
                <span className="whitespace-nowrap font-semibold text-[#1a1816]">
                  {s.updated} {relativeTime(fetchedAt, lang)}.
                </span>
              </>
            )}
          </p>
        </div>

        <div role="group" aria-label={s.scopeLabel} className="inline-flex self-start rounded-full bg-[#1a1816]/[0.06] p-1 lg:self-auto">
          {scopes.map(({ key, label }) => {
            const active = scope === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => setScope(key)}
                className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-5 text-[15px] font-bold transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0a2fad]/30 ${
                  active ? 'bg-white text-[#1a1816] shadow-[0_2px_8px_-2px_rgba(26,24,22,0.2)]' : 'text-[#534d47] hover:text-[#1a1816]'
                }`}
              >
                {label}
                {status === 'ready' && (
                  <span className={`tabular-nums text-[13px] ${active ? 'text-[#0a2fad]' : 'text-[#534d47]/70'}`}>
                    {byScope[key].length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {status === 'loading' && (
        <div aria-busy="true" aria-live="polite">
          <span className="sr-only">{s.loading}</span>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="h-64 animate-pulse rounded-2xl bg-[#1a1816]/[0.06] lg:col-span-5" />
            <div className="space-y-4 lg:col-span-7">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-xl bg-[#1a1816]/[0.06]" />
              ))}
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="flex flex-col items-start gap-4 rounded-2xl bg-white p-6 ring-1 ring-[#1a1816]/10 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-[17px] font-semibold text-[#1a1816]">{s.error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-[#0a2fad] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#08268c] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0a2fad]/30"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">refresh</span>
            {s.retry}
          </button>
        </div>
      )}

      {status === 'ready' && list.length === 0 && (
        <p className="rounded-2xl bg-white p-8 text-[17px] font-semibold text-[#534d47] ring-1 ring-[#1a1816]/10">{s.empty}</p>
      )}

      {status === 'ready' && lead && (
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Lead story */}
          <a
            href={lead.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between gap-8 rounded-2xl bg-[#0a2fad] p-6 text-white shadow-[0_24px_48px_-24px_rgba(10,47,173,0.6)] transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0a2fad]/40 sm:p-8 lg:sticky lg:top-36 lg:col-span-5 lg:min-h-[420px] lg:self-start"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {lead.severity === 'high' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-2.5 py-1 text-[12px] font-extrabold uppercase tracking-[0.06em] text-[#1a1816]">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">campaign</span>
                    {s.advisory}
                  </span>
                )}
                <span className="rounded-full bg-white/12 px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.06em] text-white">
                  {(CATEGORY_LABEL[lead.category ?? 'general'] ?? CATEGORY_LABEL.general)[lang]}
                </span>
              </div>
              <p className="mt-5 text-balance text-[1.5rem] font-extrabold leading-[1.2] tracking-[-0.015em] sm:text-[1.75rem]">
                {lead.title}
              </p>
            </div>
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0 text-[14px] font-semibold text-[#dbe3ff]">
                <p className="truncate">{lead.source}</p>
                <time dateTime={lead.rawDate} className="tabular-nums">{relativeTime(lead.rawDate, lang, lead.date)}</time>
              </div>
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0a2fad] transition-transform duration-300 group-hover:translate-x-1">
                <span className="material-symbols-outlined" aria-hidden="true">arrow_outward</span>
              </span>
            </div>
            <span className="sr-only">{s.opens}</span>
          </a>

          {/* The rest, as a scannable list */}
          <ul className="divide-y divide-[#1a1816]/10 border-y border-[#1a1816]/10 lg:col-span-7">
            {rest.map((alert) => (
              <li key={alert.id}>
                <a
                  href={alert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-3 flex items-start gap-4 rounded-xl px-3 py-5 transition-colors hover:bg-white focus-visible:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0a2fad]/25"
                >
                  <div className="min-w-0 flex-1 space-y-2.5">
                    <Tag alert={alert} lang={lang} />
                    <p className="text-[17px] font-bold leading-snug text-[#1a1816] transition-colors group-hover:text-[#0a2fad]">
                      {alert.title}
                    </p>
                    <Meta alert={alert} lang={lang} />
                  </div>
                  <span
                    className="material-symbols-outlined mt-1 shrink-0 text-[22px] text-[#534d47] transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0a2fad]"
                    aria-hidden="true"
                  >
                    arrow_outward
                  </span>
                  <span className="sr-only">{s.opens}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
