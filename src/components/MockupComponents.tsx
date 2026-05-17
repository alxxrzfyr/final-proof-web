// Visual Mockup Components for Scam Examples
// Realistic phone screens, emails, marketplace, and Messenger UIs
// Mobile-optimized — minimum supported width: 320px

import { BrandLogo } from './BrandLogo';

function stripText(s: string) {
  return s ?? '';
}

/** Collapse consecutive blank lines in pre-wrapped body copy */
function normalizeBody(s: string) {
  return (s ?? '').replace(/\n{2,}/g, '\n');
}

interface SMSMockupProps {
  sender: string;
  brand?: string;
  body: string;
  time?: string;
  isSpoofed?: boolean;
  senderDetail?: string;
}

function getProductImage(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('iphone') || (t.includes('apple') && t.includes('pro')))
    return 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=700&q=80';
  if (t.includes('samsung') || t.includes('galaxy'))
    return 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=700&q=80';
  if (t.includes('laptop') || t.includes('macbook') || t.includes('notebook'))
    return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700&q=80';
  if (t.includes('airpod') || t.includes('earphone') || t.includes('headphone') || t.includes('earbuds'))
    return 'https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?w=700&q=80';
  if (t.includes('watch'))
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80';
  if (t.includes('bag') || t.includes('lv') || t.includes('gucci') || t.includes('coach'))
    return 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=80';
  return 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700&q=80';
}

// ─── SMS Mockup ──────────────────────────────────────────────────────────────
export function SMSMockup({ sender, body, isSpoofed, senderDetail }: SMSMockupProps) {
  return (
    <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#b8c3cc] bg-[#e7edf2] shadow-md">
      {/* Header */}
      <div className="z-10 flex shrink-0 items-center gap-2.5 border-b border-[#d5dde5] bg-white px-3 py-3 text-sm sm:gap-3 sm:px-4 sm:py-3.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9e0e7] text-[#46515c] sm:h-9 sm:w-9">
          <span className="material-symbols-outlined text-base">person</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="truncate text-sm text-[#1a1816]" style={{ fontWeight: 700 }}>{stripText(sender)}</p>
          <p className="truncate text-[11px] text-[#4b5563]">
            {stripText(senderDetail || '')}
          </p>
        </div>
        <span className="material-symbols-outlined text-lg text-[#5f6b76]">info</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-5">
        <div className="my-1 text-center text-[11px] text-[#56616d]">Today 9:41 AM</div>
        <div className="flex items-end gap-2">
          <div className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9e0e7]">
            <span className="material-symbols-outlined text-[15px] leading-tight text-[#46515c]">person</span>
          </div>
          <div
            className="max-w-[86%] rounded-2xl rounded-bl-sm bg-white p-3 text-[14px] leading-snug whitespace-pre-line break-words text-[#111827] shadow-sm sm:p-3.5 sm:text-[15px]"
            style={{ fontWeight: 600 }}
            dangerouslySetInnerHTML={{ __html: normalizeBody(body) }}
          />
        </div>
      </div>

      {/* Composer */}
      <div className="flex shrink-0 items-center gap-2 border-t border-[#d5dde5] bg-white p-3 sm:p-3.5">
        <div className="flex h-9 flex-1 items-center rounded-full bg-gray-100 px-3 sm:px-4">
          <span className="text-sm text-[#6b7280]">Message...</span>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a2fad]">
          <span className="material-symbols-outlined text-[18px] text-white">send</span>
        </div>
      </div>
    </div>
  );
}

// ─── Email Mockup ─────────────────────────────────────────────────────────────
interface EmailMockupProps {
  from: string;
  brand?: string;
  subject: string;
  body: string;
  cta?: string;
  isSuspicious?: boolean;
}

export function EmailMockup({ from, brand, subject, body, cta, isSuspicious }: EmailMockupProps) {
  const senderName = brand ? brand.toUpperCase() : (from.split('@')[0] || 'Sender');
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-[#c9d1d8] bg-white shadow-lg">

      {/* Gmail-style toolbar — mobile: 4 core icons only; desktop: full set */}
      <div className="flex items-center gap-0 border-b border-gray-200 bg-[#f6f8fc] px-1 py-0.5 sm:gap-0 sm:px-1 sm:py-1">
        {/* Always visible */}
        <button className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 sm:h-9 sm:w-9">
          <span className="material-symbols-outlined text-[14px] text-gray-600 sm:text-[22px]">arrow_back</span>
        </button>
        {/* Hidden on mobile */}
        <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-200">
          <span className="material-symbols-outlined text-[22px] text-gray-600">archive</span>
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 sm:h-9 sm:w-9">
          <span className="material-symbols-outlined text-[14px] text-gray-600 sm:text-[22px]">report</span>
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 sm:h-9 sm:w-9">
          <span className="material-symbols-outlined text-[14px] text-gray-600 sm:text-[22px]">delete</span>
        </button>
        {/* Separator — hidden on mobile */}
        <div className="mx-0.5 hidden h-5 w-px bg-gray-300 sm:block" />
        {/* Hidden on mobile */}
        <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-200">
          <span className="material-symbols-outlined text-[22px] text-gray-600">mark_email_unread</span>
        </button>
        <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-200">
          <span className="material-symbols-outlined text-[22px] text-gray-600">drive_file_move</span>
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-200 sm:h-9 sm:w-9">
          <span className="material-symbols-outlined text-[14px] text-gray-600 sm:text-[22px]">more_vert</span>
        </button>
        <span className="ml-auto pr-1 text-[10px] text-gray-500 sm:pr-2 sm:text-xs" style={{ fontWeight: 500 }}>
          <span className="sm:hidden">1/4,287</span>
          <span className="hidden sm:inline">1 of 4,287</span>
        </span>
      </div>

      {/* Subject */}
      <div className="flex items-start gap-2 px-2.5 pt-2.5 sm:gap-3 sm:px-4 sm:pt-4">
        <h4 className="min-w-0 flex-1 break-words text-[11px] text-[#1a1816] sm:text-base" style={{ fontWeight: 700 }}>
          {stripText(subject)}
        </h4>
        <span className="shrink-0 rounded px-1.5 py-1 text-[10px] uppercase bg-gray-200 text-gray-800 sm:px-2 sm:text-xs" style={{ fontWeight: 700 }}>
          Inbox
        </span>
      </div>

      {/* Sender row */}
      <div className="flex items-start gap-2 border-b border-gray-100 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
        {brand ? (
          <BrandLogo key={brand} brand={brand} size="md" />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-sm text-white sm:h-10 sm:w-10" style={{ fontWeight: 800 }}>
            {senderName.charAt(0)}
          </div>
        )}
        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate text-[11px] text-[#1a1816] sm:text-base" style={{ fontWeight: 700 }}>{senderName}</p>
          <p className="whitespace-nowrap overflow-hidden text-[9px] text-[#4b5563] sm:break-all sm:whitespace-normal sm:text-sm" style={{ fontWeight: 700 }}>
            from: <span className="text-[#1a1816] underline decoration-[0.5px] underline-offset-1">&lt;{from}&gt;</span>
          </p>
          <p className="text-[10px] text-[#4b5563] sm:text-sm" style={{ fontWeight: 600 }}>to me · 10:42 AM</p>
        </div>

        <div className="flex shrink-0 items-start gap-0 text-gray-700 sm:gap-2">
          <span className="material-symbols-outlined  sm:text-lg">star</span>
          <span className="material-symbols-outlined  sm:text-lg">reply</span>
          <span className="material-symbols-outlined  sm:text-lg">more_vert</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-2.5 py-2 sm:px-5 sm:py-5">
        <div
          className="whitespace-pre-line break-words text-[11px] leading-relaxed text-[#1a1816] sm:text-base"
          style={{ fontWeight: 600 }}
          dangerouslySetInnerHTML={{ __html: normalizeBody(body) }}
        />
        {cta && (
          <div className="mt-2.5 sm:mt-5">
            <button
              className="rounded-md bg-red-600 px-3 py-1.5 text-[10px] text-white shadow-md hover:bg-red-700 sm:px-6 sm:py-3 sm:text-base"
              style={{ fontWeight: 700 }}
              disabled
            >
              {stripText(cta)} -&gt;
            </button>
          </div>
        )}

        <p className="mt-2.5 text-[10px] text-gray-700 sm:mt-5 sm:text-sm" style={{ fontWeight: 500 }}>
          Thank you,<br />The {senderName} Team
        </p>
      </div>

      {/* Footer actions */}
      <div className="flex gap-1.5 border-t border-gray-200 bg-gray-50 px-3 py-2.5 sm:gap-2 sm:px-4 sm:py-3">
        <button className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm" style={{ fontWeight: 500 }}>
          <span className="material-symbols-outlined text-[16px] text-gray-600 sm:text-[18px]">reply</span>
          Reply
        </button>
        <button className="flex items-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm" style={{ fontWeight: 500 }}>
          <span className="material-symbols-outlined text-[16px] text-gray-600 sm:text-[18px]">forward</span>
          Forward
        </button>
      </div>
    </div>
  );
}

// ─── Phone Call Mockup ────────────────────────────────────────────────────────
interface PhoneCallMockupProps {
  caller: string;
  brand?: string;
  body: string;
  isSpoofed?: boolean;
}

export function PhoneCallMockup({ caller, brand, body }: PhoneCallMockupProps) {
  const rawBody = normalizeBody(body).replace(/^[""]|[""]$/g, '');

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#cfc7bd] bg-white shadow-[0_18px_45px_rgba(26,24,22,0.16)]">
      {/* Header */}
    <div className="flex shrink-0 items-center gap-2 border-b border-[#2d2926] bg-[#1a1816] p-2.5 text-white sm:gap-3 sm:p-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/20 sm:h-12 sm:w-12">
          {brand ? (
            <BrandLogo key={brand} brand={brand} size="sm" />
          ) : (
            <span className="material-symbols-outlined text-[16px] text-white sm:text-xl">call</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="break-words leading-tight text-[13px] text-white sm:text-lg" style={{ fontWeight: 800 }}>
            {stripText(caller)}
          </p>
          <p className="mt-0.5 text-[11px] text-white/60 sm:text-xs" style={{ fontWeight: 600 }}>
            Incoming call · 10:42 AM
          </p>
        </div>
      </div>

      {/* Transcript */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#f5f2eb] p-3 sm:p-5">
        <div className="w-full max-w-[480px]">
          <div className="mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#1a1816]">chat_bubble</span>
            <p className="text-xs uppercase tracking-widest text-[#1a1816]" style={{ fontWeight: 800 }}>
              Call Transcript
            </p>
            <div className="flex-1 border-t border-[#d6cfc6]" />
          </div>

          <div className="rounded-xl border border-[#e5ded4] bg-white p-3.5 shadow-sm sm:p-4">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <div className="mt-0.5 flex shrink-0 items-center gap-1 rounded-md bg-[#1a1816] px-1.5 py-1 sm:gap-1.5 sm:px-2">
                <span className="material-symbols-outlined text-[11px] text-white sm:text-[12px]">person</span>
                <span className="text-[8px] uppercase tracking-wider text-white sm:text-[9px]" style={{ fontWeight: 800 }}>Caller</span>
              </div>
              <p
                className="break-words leading-relaxed text-[#1a1816]"
                style={{ fontWeight: 600, fontSize: 'clamp(12px, 3.5vw, 15px)' }}
              >
                {rawBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Messenger Mockup ─────────────────────────────────────────────────────────
interface MessengerMockupProps {
  sender: string;
  brand?: string;
  body: string;
  isVerified?: boolean;
}

export function MessengerMockup({ sender, brand, body, isVerified = false }: MessengerMockupProps) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#c9d1d8] bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-3 py-2 sm:gap-3 sm:py-2.5">
        <span className="material-symbols-outlined text-lg text-[#0084ff] sm:text-xl">arrow_back</span>
        <div className="relative shrink-0">
          {brand ? (
            <BrandLogo key={brand} brand={brand} size="sm" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-xs text-white sm:h-9 sm:w-9" style={{ fontWeight: 800 }}>
              {sender.charAt(0)}
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 sm:h-3 sm:w-3" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1">
            <p
              className="min-w-0 break-words text-[13px] leading-tight text-[#1a1816] sm:text-sm"
              style={{ fontWeight: 700 }}
            >
              {sender}
            </p>
            {isVerified && <span className="shrink-0 text-[13px] text-[#0084ff]">✓</span>}
          </div>
          <p className="text-[11px] text-gray-700 sm:text-xs" style={{ fontWeight: 500 }}>Active 2m ago</p>
        </div>
        {/* Hide call icon on mobile — gives sender name room to breathe */}
        <span className="material-symbols-outlined hidden text-xl text-[#0084ff] sm:inline">call</span>
        <span className="material-symbols-outlined hidden text-xl text-[#0084ff] sm:inline">videocam</span>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-2 bg-[#f0f2f5] px-3 py-3 sm:py-4">
        <p className="text-center text-xs text-gray-700" style={{ fontWeight: 600 }}>
          {sender} sent you a message
        </p>

        <div className="flex items-end gap-2">
          {brand ? (
            <BrandLogo key={brand} brand={brand} size="sm" className="!h-7 !w-7" />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-[10px] text-white" style={{ fontWeight: 800 }}>
              {sender.charAt(0)}
            </div>
          )}
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">
            <p
              className="whitespace-pre-line break-words text-sm leading-relaxed text-[#1a1816] sm:text-base"
              style={{ fontWeight: 600 }}
              dangerouslySetInnerHTML={{ __html: normalizeBody(body) }}
            />
          </div>
        </div>

        <div className="ml-9 flex items-center gap-1 rounded-2xl bg-white px-3 py-2 shadow-sm w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
        </div>

        <p className="text-right text-xs text-[#4b5563]" style={{ fontWeight: 600 }}>10:42 AM - Sent</p>
      </div>

      {/* Composer — on mobile hide extra icons to prevent crowding */}
      <div className="flex items-center gap-1.5 border-t border-gray-200 bg-white px-3 py-2 sm:gap-2">
        <span className="material-symbols-outlined text-2xl text-[#0084ff]">add_circle</span>
        {/* Hidden on mobile */}
        <span className="material-symbols-outlined hidden text-2xl text-[#0084ff] sm:inline">photo_camera</span>
        <span className="material-symbols-outlined hidden text-2xl text-[#0084ff] sm:inline">image</span>
        <div className="flex-1 rounded-full bg-[#f0f2f5] px-3 py-2 text-sm text-gray-700" style={{ fontWeight: 500 }}>
          Aa
        </div>
        <span className="material-symbols-outlined text-2xl text-[#0084ff]">thumb_up</span>
      </div>
    </div>
  );
}

// ─── Popup Mockup ─────────────────────────────────────────────────────────────
interface PopupMockupProps {
  body: string;
  cta?: string;
  domain?: string;
  countdown?: string;
}

export function PopupMockup({ body, cta, domain = 'survey-prizewinners.info/ph', countdown }: PopupMockupProps) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-[#c9d1d8] bg-white shadow-lg">
      {/* Browser chrome */}
      <div className="flex flex-col border-b border-gray-200 bg-[#f1f3f4]">
        {/* Tab bar */}
        <div className="flex items-end gap-0 px-2 pt-2">
          <div className="flex items-center gap-1 rounded-t-lg border border-b-0 border-gray-300 bg-white px-2 py-1.5 min-w-0 max-w-[160px] sm:gap-1.5 sm:max-w-[180px] sm:px-3">
            <span className="h-3 w-3 shrink-0 rounded-sm bg-orange-400/80 flex items-center justify-center sm:h-3.5 sm:w-3.5">
              <span className="text-[5px] text-white font-black sm:text-[6px]">!</span>
            </span>
            <span className="truncate font-mono text-[9px] text-gray-600 sm:text-[10px]">survey-prizewinners.info</span>
            <span className="ml-auto text-gray-400 text-[10px] cursor-pointer">×</span>
          </div>
        </div>
        {/* Address bar */}
        <div className="flex items-center gap-1.5 px-2 py-2 sm:gap-2 sm:px-3">
          <div className="flex gap-1 shrink-0 sm:gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400 sm:h-2.5 sm:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-yellow-400 sm:h-2.5 sm:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-green-400 sm:h-2.5 sm:w-2.5" />
          </div>
          <span className="material-symbols-outlined hidden text-[14px] text-gray-400 sm:inline">arrow_back</span>
          <span className="material-symbols-outlined hidden text-[14px] text-gray-400 sm:inline">arrow_forward</span>
          <span className="material-symbols-outlined text-[13px] text-gray-400 sm:text-[14px]">refresh</span>
          {/* URL bar */}
          <div className="flex flex-1 items-center gap-1 rounded-full border border-gray-300 bg-white px-2 py-1 shadow-sm sm:gap-1.5 sm:px-3">
            <span className="material-symbols-outlined text-[11px] text-red-500 sm:text-[12px]">warning</span>
            <span className="truncate font-mono text-[10px] text-red-600 sm:text-[11px]" style={{ fontWeight: 500 }}>{domain}</span>
            <span className="material-symbols-outlined ml-auto text-[11px] text-gray-400 sm:text-[12px]">star_border</span>
          </div>
        </div>
      </div>

      {/* Page + popup overlay */}
      <div className="relative" style={{ minHeight: '280px' }}>
        {/* Background "page" — blurred */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4fd] to-[#ddeeff] overflow-hidden">
          <div className="absolute top-6 left-4 right-4 space-y-2 opacity-30 blur-[1px]">
            <div className="h-4 w-3/4 rounded bg-gray-400" />
            <div className="h-3 w-full rounded bg-gray-300" />
            <div className="h-3 w-5/6 rounded bg-gray-300" />
            <div className="h-3 w-4/5 rounded bg-gray-300" />
            <div className="mt-3 h-24 w-full rounded-lg bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-300" />
            <div className="h-3 w-3/4 rounded bg-gray-300" />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

        {/* Popup card */}
        <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-3">
          <div className="w-full max-w-[340px] overflow-hidden rounded-2xl bg-white shadow-[0_25px_60px_rgba(0,0,0,0.4)] ring-1 ring-black/10 sm:max-w-[360px]">
            {/* Header */}
            <div className="relative overflow-hidden px-3 py-3 sm:px-4 sm:py-3.5" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}>
              {[
                { top: '20%', left: '8%' }, { top: '70%', left: '12%' },
                { top: '30%', right: '10%' }, { top: '65%', right: '15%' },
                { top: '10%', left: '45%' },
              ].map((pos, i) => (
                <div key={i} className="absolute h-1.5 w-1.5 rounded-full bg-white/60" style={pos} />
              ))}
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-black text-white">🏆</div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/70" style={{ fontWeight: 700 }}>Official Notice</p>
                    <p className="text-xs text-white" style={{ fontWeight: 800 }}>PRIZE NOTIFICATION</p>
                  </div>
                </div>
                <span className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/20 text-sm text-white/80">×</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-3 sm:p-4">
              {countdown && (
                <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-2 py-2 text-center sm:px-3 sm:py-2.5">
                  <p className="mb-1.5 text-[9px] font-extrabold uppercase tracking-widest text-red-600">⏰ Offer expires in</p>
                  <div className="flex items-center justify-center gap-1">
                    {countdown.split(':').map((seg, i) => (
                      <div key={i} className="flex items-center gap-1">
                        {i > 0 && <span className="text-sm font-black text-red-500">:</span>}
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 shadow-sm sm:h-9 sm:w-9">
                          <span className="font-mono text-base font-black text-white leading-none sm:text-lg">{seg}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="whitespace-pre-line break-words text-[13px] leading-relaxed text-[#1a1816]" style={{ fontWeight: 600 }}>
                {normalizeBody(body)}
              </p>

              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-green-50 border border-green-200 px-2.5 py-1.5">
                <span className="text-sm">🟢</span>
                <p className="text-[10px] text-green-800" style={{ fontWeight: 700 }}>
                  247 people claimed prizes in the last 24 hours
                </p>
              </div>

              {cta && (
                <button
                  className="mt-3 w-full rounded-xl py-2.5 text-sm text-white shadow-lg sm:py-3"
                  style={{ fontWeight: 800, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', boxShadow: '0 4px 15px rgba(239,68,68,0.4)' }}
                  disabled
                >
                  🎁 {stripText(cta)}
                </button>
              )}

              <p className="mt-2.5 break-all font-mono text-[9px] text-[#9ca3af] text-center">{domain}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shopping / TikTok Live Mockup ───────────────────────────────────────────
interface ShoppingMockupProps {
  seller: string;
  productName?: string;
  fakePrice?: string;
  realPrice?: string;
  deliveryOutcome?: string;
}

export function ShoppingMockup({
  seller,
  productName = 'Original Uniqlo Heattech',
  fakePrice = '₱150',
  realPrice = '₱790',
  deliveryOutcome = 'Plastic wrap and a single piece of fake fabric — not the item advertised.',
}: ShoppingMockupProps) {
  const discountPct = Math.round(
    (1 - parseInt(fakePrice.replace(/[^\d]/g, '')) / parseInt(realPrice.replace(/[^\d]/g, ''))) * 100
  );

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-gray-800 bg-black shadow-2xl">
      {/* TikTok App chrome */}
      <div className="flex items-center gap-2 bg-black px-3 py-2 border-b border-white/10">
        <span className="material-symbols-outlined text-xl text-white/60">arrow_back</span>
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-black text-black">♪</span>
          <span className="text-sm font-bold text-white">TikTok Shop</span>
          <span className="rounded-sm bg-[#fe2c55] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-white">Live</span>
        </div>
        <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
          <span className="material-symbols-outlined text-xl text-white/60">search</span>
          <span className="material-symbols-outlined text-xl text-white/60">more_vert</span>
        </div>
      </div>

      {/* LIVE STREAM AREA */}
      <div className="relative" style={{ minHeight: '220px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0928] via-[#0f1f3d] to-[#0a2010]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-15"
          style={{ width: '90px', height: '130px', background: 'radial-gradient(ellipse at top, rgba(255,200,150,0.6) 0%, transparent 70%)', borderRadius: '50% 50% 0 0' }}
        />

        {/* TOP HUD */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 rounded-md bg-[#fe2c55] px-2 py-0.5 shadow-lg">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              <span className="text-[10px] font-black tracking-wider text-white">LIVE</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm">
              <span className="text-[10px]">👁</span>
              <span className="text-[10px] font-bold text-white">12.4K</span>
            </div>
            {/* Hide gifts on smallest screens */}
            <div className="hidden items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm xs:flex sm:flex">
              <span className="text-[10px]">🎁</span>
              <span className="text-[10px] font-bold text-amber-300">₱8.4K</span>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm border border-white/10">
            <div className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-[9px] font-black text-white ring-1 ring-[#fe2c55]/50 sm:h-5 sm:w-5">
              {seller.charAt(0)}
            </div>
            <span className="max-w-[60px] truncate text-[9px] font-semibold text-white sm:max-w-none sm:text-[10px]">{seller}</span>
            <span className="rounded-sm bg-[#fe2c55]/90 px-1 text-[8px] font-black text-white">+</span>
          </div>
        </div>

        {/* RIGHT ACTION BAR */}
        <div className="absolute right-2 bottom-14 flex flex-col items-center gap-2.5 z-10 sm:gap-3">
          {[
            { icon: 'favorite', label: '48K', color: 'text-[#fe2c55]' },
            { icon: 'chat_bubble', label: '1.2K', color: 'text-white' },
            { icon: 'card_giftcard', label: 'Gift', color: 'text-amber-300' },
            { icon: 'share', label: 'Share', color: 'text-white' },
          ].map(({ icon, label, color }) => (
            <div key={icon} className="flex flex-col items-center gap-0.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 ${color} sm:h-9 sm:w-9`}>
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">{icon}</span>
              </div>
              <span className={`text-[9px] font-bold ${color}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* FLOATING CHAT */}
        <div className="absolute bottom-14 left-2 flex flex-col gap-1 max-w-[58%] z-10 sm:gap-1.5 sm:max-w-[60%]">
          {[
            { user: 'user_98', msg: 'mura ah! 😮', color: 'text-pink-300' },
            { user: 'jnrvrs', msg: 'legit ba? 🤔', color: 'text-cyan-300' },
            { user: 'aling_nena', msg: 'mag-oorder!', color: 'text-yellow-200' },
          ].map(({ user, msg, color }) => (
            <div key={user} className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm w-fit border border-white/5 sm:gap-1.5 sm:px-2.5">
              <div className="h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex-none sm:h-4 sm:w-4" />
              <span className={`text-[9px] font-bold ${color}`}>{user}</span>
              <span className="text-[9px] text-white/80">{msg}</span>
            </div>
          ))}
        </div>

        {/* PINNED PRODUCT BAR */}
        <div className="absolute bottom-1.5 left-2 right-2 flex items-center gap-2 rounded-xl bg-white/12 px-2.5 py-2 backdrop-blur-md border border-white/15 z-10 sm:gap-2.5 sm:px-3">
          <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br from-gray-500/50 to-gray-700/50 border border-white/10 flex items-center justify-center sm:h-10 sm:w-10">
            <span className="material-symbols-outlined text-sm text-white/30 sm:text-base">shopping_bag</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="rounded-sm bg-[#fe2c55] px-1 py-0.5 text-[7px] font-black text-white uppercase tracking-wide">Pinned</span>
              <p className="truncate text-[10px] font-semibold text-white sm:text-[11px]">{productName}</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-black text-[#fe2c55]">{fakePrice}</span>
              <span className="text-[10px] text-gray-400 line-through sm:text-[11px]">{realPrice}</span>
              <span className="rounded bg-[#fe2c55]/70 px-1 py-0.5 text-[8px] font-black text-white">-{discountPct}%</span>
            </div>
          </div>
          <button className="shrink-0 rounded-lg bg-[#fe2c55] px-2.5 py-1.5 text-[11px] font-black text-white shadow-lg shadow-[#fe2c55]/30 sm:px-3 sm:py-2" disabled>
            Buy
          </button>
        </div>
      </div>

      {/* PAYMENT SCAM WARNING */}
      <div className="flex items-center gap-2 bg-red-950/90 border-y border-red-800/60 px-3 py-2">
        <span className="material-symbols-outlined text-base text-red-400 shrink-0">warning</span>
        <p className="text-[11px] font-semibold text-red-300 leading-snug">
          Payment via GCash direct — <span className="font-black text-red-200">no buyer protection</span>
        </p>
      </div>

      {/* SELLER INFO */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#111] px-3 py-2.5 sm:gap-2.5">
        <div className="relative shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-sm font-black text-white ring-2 ring-[#fe2c55]/40 sm:h-9 sm:w-9">
            {seller.charAt(0)}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-red-500 border-2 border-[#111] flex items-center justify-center sm:h-3.5 sm:w-3.5">
            <span className="text-[5px] text-white font-black sm:text-[6px]">S</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <p className="min-w-0 break-words text-[12px] font-bold leading-snug text-white sm:text-sm">{seller}</p>
            <span className="shrink-0 rounded-sm bg-white/10 px-1 text-[9px] font-bold text-gray-400">Shop</span>
          </div>
          <p className="text-[11px] text-gray-500">Joined 3 weeks ago · 4 reviews</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
              <span key={i} className={`text-xs ${i <= 4 ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
            ))}
          </div>
          <button className="rounded-full border border-[#fe2c55]/60 px-2 py-0.5 text-[10px] font-bold text-[#fe2c55]" disabled>
            Follow
          </button>
        </div>
      </div>

      {/* DELIVERY OUTCOME */}
      <div className="bg-[#0d0d0d] p-3">
        <div className="overflow-hidden rounded-lg border border-red-900/60 bg-red-950/60">
          <div className="flex items-center gap-2 border-b border-red-900/60 bg-red-900/40 px-3 py-2">
            <span className="material-symbols-outlined text-base text-red-400 shrink-0">inventory_2</span>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-red-300">
              What actually arrived — 2 weeks later
            </p>
          </div>
          <div className="flex items-start gap-2.5 p-3">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-red-500">cancel</span>
            <p className="break-words text-[13px] leading-snug text-red-200" style={{ fontWeight: 600 }}>
              {deliveryOutcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Marketplace Mockup ───────────────────────────────────────────────────────
interface MarketplaceMockupProps {
  title: string;
  price: string;
  seller: string;
  brand?: string;
  description: string;
  accountAge?: string;
  reviews?: number;
  location?: string;
  listingAge?: string;
  tags?: string[];
}

export function MarketplaceMockup({
  title,
  price,
  seller,
  brand,
  description,
  accountAge = '3 days ago',
  reviews = 0,
  location = 'Quezon City, Metro Manila',
  listingAge = 'Listed 1 hour ago',
  tags = ['Brand New', 'Sealed', 'GCash only'],
}: MarketplaceMockupProps) {
  const galleryIcon = /iphone|phone|mobile|cell/i.test(title) ? 'smartphone' : 'shopping_bag';

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-[#c9d1d8] bg-white shadow-lg">
      {/* FB Marketplace header */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-3 py-2.5">
        <span className="material-symbols-outlined text-xl text-[#1877F2]">arrow_back</span>
        <div className="flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#1877F2] text-xs text-white sm:h-6 sm:w-6" style={{ fontWeight: 900 }}>f</span>
          <span className="text-sm text-[#1a1816]" style={{ fontWeight: 700 }}>Marketplace</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="material-symbols-outlined text-xl text-gray-500">share</span>
          <span className="material-symbols-outlined hidden text-xl text-gray-500 sm:inline">bookmark_border</span>
          <span className="material-symbols-outlined text-xl text-gray-500">more_vert</span>
        </div>
      </div>

      {/* Image gallery */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#dfe4ea] via-[#eef1f5] to-[#e4eaf0] sm:h-52">
        {brand ? (
          <div className="scale-[2.2] opacity-90"><BrandLogo key={brand} brand={brand} size="lg" /></div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/70 shadow-sm sm:h-16 sm:w-16">
              <span className="material-symbols-outlined text-4xl text-[#6b7685] sm:text-5xl">{galleryIcon}</span>
            </div>
            <p className="text-[11px] uppercase tracking-wider text-[#8a94a0]" style={{ fontWeight: 700 }}>
              Seller photo
            </p>
          </div>
        )}
        <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white">
          <span className="material-symbols-outlined text-[14px]">open_in_full</span>
        </span>
      </div>

      {/* Product info */}
      <div className="p-3 sm:p-4">
        <p className="text-2xl leading-tight text-[#1a1816] sm:text-[1.75rem]" style={{ fontWeight: 800 }}>{price}</p>
        <p className="mt-1 break-words text-sm leading-snug text-[#1a1816] sm:text-base" style={{ fontWeight: 700 }}>{title}</p>

        {/* Location + age — wrap on mobile */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-1 gap-y-0.5 text-sm text-[#4b5563]">
          <span className="material-symbols-outlined text-[14px] text-[#8a94a0]">location_on</span>
          <span className="text-xs sm:text-sm" style={{ fontWeight: 500 }}>{location}</span>
          <span className="text-[#ccc]">·</span>
          <span className="text-xs text-[#8a94a0] sm:text-sm" style={{ fontWeight: 400 }}>{listingAge}</span>
        </div>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-1 sm:mt-2.5 sm:gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2 py-0.5 text-[11px] sm:px-2.5 sm:py-1 sm:text-xs ${tag.toLowerCase().includes('gcash') || tag.toLowerCase().includes('direct') ? 'border border-red-200 bg-red-50 text-red-700' : 'bg-[#eef2f5] text-[#25303b]'}`}
              style={{ fontWeight: 700 }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-1 rounded-lg bg-[#1877F2] py-2 text-xs text-white shadow-sm sm:gap-1.5 sm:py-2.5 sm:text-sm" style={{ fontWeight: 700 }} disabled>
            <span className="material-symbols-outlined text-[13px] sm:text-[15px]">chat</span>
            Message Seller
          </button>
          <button className="flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white py-2 text-xs text-[#1a1816] sm:gap-1.5 sm:py-2.5 sm:text-sm" style={{ fontWeight: 700 }} disabled>
            <span className="material-symbols-outlined text-[13px] sm:text-[15px]">bookmark_border</span>
            Save
          </button>
        </div>
        <button className="mt-1.5 w-full rounded-lg border border-[#1877F2]/30 bg-blue-50 py-2 text-xs text-[#1877F2] sm:text-sm" style={{ fontWeight: 600 }} disabled>
          Make Offer
        </button>

        <div className="my-3 border-t border-gray-100 sm:my-3.5" />

        {/* Description */}
        <p className="mb-1.5 text-[10px] uppercase tracking-widest text-gray-500" style={{ fontWeight: 700 }}>Description</p>
        <p className="whitespace-pre-line break-words text-sm leading-relaxed text-[#1a1816]" style={{ fontWeight: 500 }}>{normalizeBody(description)}</p>

        <div className="my-3 border-t border-gray-100 sm:my-3.5" />

        {/* Seller info card */}
        <div className="rounded-xl border border-gray-200 bg-[#f8f9fb] p-3">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-gray-400" style={{ fontWeight: 700 }}>Seller</p>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="relative flex-none">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-sm text-white sm:h-11 sm:w-11" style={{ fontWeight: 800 }}>
                {seller.charAt(0)}
              </div>
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-orange-400 border-2 border-[#f8f9fb] flex items-center justify-center sm:h-3.5 sm:w-3.5">
                <span className="text-[5px] text-white font-black sm:text-[6px]">!</span>
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="break-words text-[12px] leading-snug text-[#1a1816] sm:text-sm" style={{ fontWeight: 700 }}>{seller}</p>
              <p className="text-[11px] text-gray-500">
                Joined {accountAge} · {reviews} {reviews === 1 ? 'review' : 'reviews'}
              </p>
              <div className="mt-0.5 flex flex-wrap items-center gap-1">
                <span className="rounded-sm bg-orange-100 px-1.5 py-0.5 text-[9px] text-orange-700 uppercase tracking-wide" style={{ fontWeight: 800 }}>New Account</span>
                <span className="rounded-sm bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-500" style={{ fontWeight: 600 }}>No response rate</span>
              </div>
            </div>
            <button className="shrink-0 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs text-[#1a1816] shadow-sm sm:px-3" style={{ fontWeight: 600 }} disabled>
              View
            </button>
          </div>
        </div>

        {/* Report listing */}
        <div className="mt-2 flex justify-center">
          <button className="flex items-center gap-1 text-[11px] text-gray-400" style={{ fontWeight: 500 }} disabled>
            <span className="material-symbols-outlined text-[13px]">flag</span>
            Report this listing
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Shipping Receipt Mockup ──────────────────────────────────────────────────
interface ShippingReceiptMockupProps {
  sender: string;
  body: string;
  trackingNo?: string;
  recipient?: string;
  status?: string;
  amount?: string;
  date?: string;
}

export function ShippingReceiptMockup({
  sender,
  body,
  trackingNo = 'LBC9988120044PH',
  recipient = 'Maria Santos, Pasig',
  status = 'Accepted',
  amount = '₱4,500 balance due',
  date = 'Apr 3, 2026 - 2:18 PM',
}: ShippingReceiptMockupProps) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#c9d1d8] bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-[#e5ded4] bg-[#f8f7f5] px-3 py-3 sm:px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1a1816] text-white sm:h-10 sm:w-10">
          <span className="material-symbols-outlined text-lg sm:text-xl">storefront</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-[#1a1816]" style={{ fontWeight: 800 }}>
            {stripText(sender)}
          </p>
          <p className="text-xs text-[#4b5563]" style={{ fontWeight: 600 }}>
            Seller sent an image attachment
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-red-100 px-2 py-1 text-[9px] uppercase tracking-wider text-red-700 sm:text-[10px]" style={{ fontWeight: 800 }}>
          Unverified
        </span>
      </div>

      {/* Body */}
      <div className="space-y-3 bg-[#eef2f5] p-3 sm:p-4">
        <div className="max-w-[86%] rounded-2xl rounded-bl-sm bg-white p-3 text-sm leading-snug text-[#1a1816] shadow-sm" style={{ fontWeight: 600 }}>
          {normalizeBody(body)}
        </div>

        <div className="overflow-hidden rounded-xl border border-[#d6cfc6] bg-white shadow-sm">
          {/* Receipt header */}
          <div className="flex items-center justify-between bg-[#facc15] px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <BrandLogo brand="lbc" size="sm" />
              <div>
                <p className="text-xs uppercase tracking-wide text-[#1a1816] sm:text-sm" style={{ fontWeight: 900 }}>
                  Shipment Receipt
                </p>
                <p className="text-[9px] text-[#3d3530] sm:text-[10px]" style={{ fontWeight: 700 }}>
                  Screenshot copy only
                </p>
              </div>
            </div>
            <span className="shrink-0 rounded bg-red-600 px-1.5 py-1 text-[9px] uppercase tracking-wider text-white sm:text-[10px]" style={{ fontWeight: 800 }}>
              Fake proof
            </span>
          </div>

          {/* Receipt fields */}
          <div className="grid gap-2.5 p-3 text-sm sm:gap-3 sm:p-4">
            {[
              ['Tracking no.', trackingNo],
              ['Recipient', recipient],
              ['Status', status],
              ['Date', date],
              ['Requested payment', amount],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[5.5rem_1fr] gap-1.5 border-b border-[#eee7df] pb-2 last:border-b-0 last:pb-0 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
                <span className="text-[10px] uppercase tracking-wide text-[#5c544d]" style={{ fontWeight: 800 }}>
                  {label}
                </span>
                <span className="break-words text-[13px] text-[#1a1816] sm:text-sm" style={{ fontWeight: 700 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="border-t border-[#e5ded4] bg-red-50 px-3 py-2.5 sm:px-4 sm:py-3">
            <p className="break-words text-xs leading-snug text-red-800" style={{ fontWeight: 700 }}>
              Receipt screenshots can be edited or reused. Verify the tracking number on the courier website yourself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Charity Post Mockup ──────────────────────────────────────────────────────
interface CharityPostMockupProps {
  sender: string;
  body: string;
  domain?: string;
  reactions?: string;
  shares?: string;
  campaignTitle?: string;
  raised?: string;
  goal?: string;
  posted?: string;
}

export function CharityPostMockup({
  sender,
  body,
  domain = 'sagip-pilipinas-relief.org/donate',
  reactions = '841',
  shares = '2,400',
  campaignTitle = 'Emergency Relief Drive',
  raised = '₱843,210',
  goal = '₱1,000,000',
  posted = 'Sponsored - 18 min ago',
}: CharityPostMockupProps) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#c9d1d8] bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-[#e5ded4] px-3 py-3 sm:gap-3 sm:px-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a2fad] text-white sm:h-11 sm:w-11">
          <span className="material-symbols-outlined text-lg sm:text-xl">volunteer_activism</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-[#1a1816]" style={{ fontWeight: 800 }}>
            {stripText(sender)}
          </p>
          <p className="text-xs text-[#4b5563]" style={{ fontWeight: 600 }}>
            {posted}
          </p>
        </div>
        <span className="material-symbols-outlined text-xl text-[#4b5563]">more_horiz</span>
      </div>

      {/* Body */}
      <div className="space-y-3 p-3 sm:p-4">
        <p className="whitespace-pre-line break-words text-sm leading-relaxed text-[#1a1816]" style={{ fontWeight: 600 }}>
          {normalizeBody(body)}
        </p>

        <div className="overflow-hidden rounded-xl border border-[#d6cfc6]">
          {/* Campaign banner */}
          <div className="flex min-h-[130px] items-center justify-center bg-[#dbeafe] px-4 text-center sm:min-h-[150px]">
            <div>
              <span className="material-symbols-outlined text-4xl text-[#0a2fad]">volunteer_activism</span>
              <p className="mt-2 text-base uppercase text-[#1a1816] sm:text-lg" style={{ fontWeight: 900 }}>
                {campaignTitle}
              </p>
              <p className="mt-1 text-xs text-[#3d3530] sm:text-sm" style={{ fontWeight: 700 }}>
                Food packs, medicine, and shelter kits
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2.5 bg-white p-3 sm:space-y-3 sm:p-4">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#5c544d]" style={{ fontWeight: 800 }}>Raised</p>
                <p className="text-lg text-[#1a1816] sm:text-xl" style={{ fontWeight: 900 }}>{raised}</p>
              </div>
              <p className="text-xs text-[#4b5563] sm:text-sm" style={{ fontWeight: 700 }}>of {goal}</p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[84%] rounded-full bg-red-600" />
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-2 sm:px-3">
              <p className="font-mono text-[10px] text-red-800 break-all sm:text-xs" style={{ fontWeight: 800 }}>
                {domain}
              </p>
            </div>
          </div>
        </div>

        {/* Reactions / shares */}
        <div className="flex items-center justify-between border-t border-[#e5ded4] pt-2.5 text-xs text-[#4b5563] sm:pt-3" style={{ fontWeight: 700 }}>
          <span>{reactions} reactions</span>
          <span>{shares} shares</span>
        </div>
      </div>
    </div>
  );
}