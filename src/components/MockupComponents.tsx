// Visual Mockup Components for Scam Examples
// Realistic phone screens, emails, marketplace, and Messenger UIs

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

export function SMSMockup({ sender, body, isSpoofed, senderDetail }: SMSMockupProps) {
  return (
    <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#b8c3cc] bg-[#e7edf2] shadow-md">
      <div className="z-10 flex shrink-0 items-center gap-3 border-b border-[#d5dde5] bg-white px-4 py-3.5 text-sm">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9e0e7] text-[#46515c]">
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

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="my-1 text-center text-[11px] text-[#56616d]">Today 9:41 AM</div>
        <div className="flex items-end gap-2">
          <div className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9e0e7]">
            <span className="material-symbols-outlined text-[15px] leading-tight text-[#46515c]">person</span>
          </div>
          <div 
            className="max-w-[86%] rounded-2xl rounded-bl-sm bg-white p-3.5 text-[15px] leading-snug whitespace-pre-line text-[#111827] shadow-sm sm:text-base" 
            style={{ fontWeight: 600 }}
            dangerouslySetInnerHTML={{ __html: normalizeBody(body) }}
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-[#d5dde5] bg-white p-3.5">
        <div className="flex h-9 flex-1 items-center rounded-full bg-gray-100 px-4">
          <span className="text-sm text-[#6b7280]">Message...</span>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a2fad]">
          <span className="material-symbols-outlined text-[18px] text-white">send</span>
        </div>
      </div>
    </div>
  );
}

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
      {/* Gmail-style toolbar */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-[#f6f8fc] px-3 py-2.5">
        <span className="material-symbols-outlined text-xl text-gray-700">arrow_back</span>
        <span className="material-symbols-outlined text-xl text-gray-700">archive</span>
        <span className="material-symbols-outlined text-xl text-gray-700">delete</span>
        <span className="material-symbols-outlined text-xl text-red-600">report</span>
        <span className="ml-auto text-xs text-gray-700" style={{ fontWeight: 600 }}>1 of 4,287</span>
      </div>

      {/* Subject */}
      <div className="flex items-start gap-3 px-4 pt-4">
        <h4 className="flex-1 text-[#1a1816]" style={{ fontWeight: 700, fontSize: '1.125rem' }}>
          {stripText(subject)}
        </h4>
        <span className="rounded px-2 py-1 text-xs uppercase bg-gray-200 text-gray-800" style={{ fontWeight: 700 }}>
          Inbox
        </span>
      </div>

      {/* Sender row */}
      <div className="flex items-start gap-3 border-b border-gray-100 px-4 py-3">
        {brand ? (
          <BrandLogo key={brand} brand={brand} size="md" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-sm text-white" style={{ fontWeight: 800 }}>
            {senderName.charAt(0)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-base text-[#1a1816]" style={{ fontWeight: 700 }}>{senderName}</p>
          </div>
          <p className="truncate font-mono text-sm text-red-700 underline decoration-wavy decoration-1" style={{ fontWeight: 600 }}>
            &lt;{from}&gt;
          </p>
          <p className="text-sm text-[#4b5563]" style={{ fontWeight: 600 }}>to me - 10:42 AM (2 minutes ago)</p>
        </div>
        <div className="flex shrink-0 gap-2 text-gray-700">
          <span className="material-symbols-outlined hidden text-lg sm:inline">star</span>
          <span className="material-symbols-outlined hidden text-lg sm:inline">reply</span>
          <span className="material-symbols-outlined text-lg">more_vert</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div 
            className="whitespace-pre-line text-base leading-relaxed text-[#1a1816]" 
            style={{ fontWeight: 600 }} 
            dangerouslySetInnerHTML={{ __html: normalizeBody(body) }} 
          />
        {cta && (
          <div className="mt-5">
            <button
              className="rounded-md bg-red-600 px-6 py-3 text-base text-white shadow-md hover:bg-red-700"
              style={{ fontWeight: 700 }}
              disabled
            >
              {stripText(cta)} -&gt;
            </button>
          </div>
        )}

        <p className="mt-5 text-sm text-gray-700" style={{ fontWeight: 500 }}>
          Thank you,<br />The {senderName} Team
        </p>
      </div>

      {/* Footer actions */}
      <div className="flex gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3">
        <button className="rounded-full border border-gray-400 bg-white px-4 py-2 text-sm text-gray-800" style={{ fontWeight: 600 }}>
          Reply
        </button>
        <button className="rounded-full border border-gray-400 bg-white px-4 py-2 text-sm text-gray-800" style={{ fontWeight: 600 }}>
          Forward
        </button>
      </div>
    </div>
  );
}

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
      <div className="flex shrink-0 items-center gap-3 border-b border-[#2d2926] bg-[#1a1816] p-4 text-white sm:p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 ring-2 ring-white/20">
          {brand ? (
            <BrandLogo key={brand} brand={brand} size="sm" />
          ) : (
            <span className="material-symbols-outlined text-xl text-white">call</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg text-white" style={{ fontWeight: 800 }}>
            {stripText(caller)}
          </p>
          <p className="mt-0.5 text-xs text-white/60" style={{ fontWeight: 600 }}>
            Incoming call · 10:42 AM
          </p>
        </div>
      </div>

      {/* Transcript */}
      <div className="flex flex-1 flex-col items-center justify-center bg-[#f5f2eb] p-4 sm:p-5">
        <div className="w-full max-w-[480px]">
          {/* Label */}
          <div className="mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#1a1816]">chat_bubble</span>
            <p className="text-xs uppercase tracking-widest text-[#1a1816]" style={{ fontWeight: 800 }}>
              Call Transcript
            </p>
            <div className="flex-1 border-t border-[#d6cfc6]" />
          </div>

          {/* Bubble */}
          <div className="rounded-xl border border-[#e5ded4] bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex shrink-0 items-center gap-1.5 rounded-md bg-[#1a1816] px-2 py-1">
                <span className="material-symbols-outlined text-[12px] text-white">person</span>
                <span className="text-[9px] uppercase tracking-wider text-white" style={{ fontWeight: 800 }}>Caller</span>
              </div>
              <p className="text-[15px] leading-relaxed text-[#1a1816] sm:text-base" style={{ fontWeight: 600 }}>
                {rawBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MessengerMockupProps {
  sender: string;
  brand?: string;
  body: string;
  isVerified?: boolean;
}

export function MessengerMockup({ sender, brand, body, isVerified = false }: MessengerMockupProps) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#c9d1d8] bg-white shadow-lg">
      {/* Messenger header */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-3 py-2.5">
        <span className="material-symbols-outlined text-xl text-[#0084ff]">arrow_back</span>
        <div className="relative">
          {brand ? (
            <BrandLogo key={brand} brand={brand} size="sm" />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-xs text-white" style={{ fontWeight: 800 }}>
              {sender.charAt(0)}
            </div>
          )}
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-base text-[#1a1816]" style={{ fontWeight: 700 }}>
            {sender}
            {isVerified && <span className="text-[#0084ff]">✓</span>}
          </p>
          <p className="text-xs text-gray-700" style={{ fontWeight: 500 }}>Active 2m ago</p>
        </div>
        <span className="material-symbols-outlined text-xl text-[#0084ff]">call</span>
        <span className="material-symbols-outlined hidden text-xl text-[#0084ff] sm:inline">videocam</span>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-2 bg-[#f0f2f5] px-3 py-4">
        <p className="text-center text-xs text-gray-700" style={{ fontWeight: 600 }}>
          {sender} sent you a message
        </p>

        {/* Their message bubble */}
        <div className="flex items-end gap-2">
          {brand ? (
            <BrandLogo key={brand} brand={brand} size="sm" className="!h-7 !w-7" />
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-500 text-[10px] text-white" style={{ fontWeight: 800 }}>
              {sender.charAt(0)}
            </div>
          )}
          <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
            <p 
              className="whitespace-pre-line text-base leading-relaxed text-[#1a1816]" 
              style={{ fontWeight: 600 }}
              dangerouslySetInnerHTML={{ __html: normalizeBody(body) }}
            />
          </div>
        </div>

        {/* Typing indicator */}
        <div className="ml-9 flex items-center gap-1 rounded-2xl bg-white px-3 py-2 shadow-sm w-fit">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
        </div>

        <p className="text-right text-xs text-[#4b5563]" style={{ fontWeight: 600 }}>10:42 AM - Sent</p>
      </div>

      {/* Composer */}
      <div className="flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-2">
        <span className="material-symbols-outlined text-2xl text-[#0084ff]">add_circle</span>
        <span className="material-symbols-outlined text-2xl text-[#0084ff]">photo_camera</span>
        <span className="material-symbols-outlined text-2xl text-[#0084ff]">image</span>
        <div className="flex-1 rounded-full bg-[#f0f2f5] px-3 py-2 text-sm text-gray-700" style={{ fontWeight: 500 }}>
          Aa
        </div>
        <span className="material-symbols-outlined text-2xl text-[#0084ff]">thumb_up</span>
      </div>
    </div>
  );
}

// ─── Popup Mockup ───────────────────────────────────────────────────────────
interface PopupMockupProps {
  body: string;
  cta?: string;
  domain?: string;
  countdown?: string;
}

export function PopupMockup({ body, cta, domain = 'survey-prizewinners.info/ph', countdown }: PopupMockupProps) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl border border-[#c9d1d8] bg-white shadow-lg">
      {/* Browser chrome — more realistic */}
      <div className="flex flex-col border-b border-gray-200 bg-[#f1f3f4]">
        {/* Tab bar */}
        <div className="flex items-end gap-0 px-2 pt-2">
          <div className="flex items-center gap-1.5 rounded-t-lg border border-b-0 border-gray-300 bg-white px-3 py-1.5 min-w-0 max-w-[180px]">
            <span className="h-3.5 w-3.5 shrink-0 rounded-sm bg-orange-400/80 flex items-center justify-center">
              <span className="text-[6px] text-white font-black">!</span>
            </span>
            <span className="truncate font-mono text-[10px] text-gray-600">survey-prizewinners.info</span>
            <span className="ml-auto text-gray-400 text-[10px] cursor-pointer">×</span>
          </div>
        </div>
        {/* Address bar */}
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="flex gap-1.5 shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <span className="material-symbols-outlined hidden text-[14px] text-gray-400 sm:inline">arrow_back</span>
          <span className="material-symbols-outlined hidden text-[14px] text-gray-400 sm:inline">arrow_forward</span>
          <span className="material-symbols-outlined text-[14px] text-gray-400">refresh</span>
          {/* URL bar */}
          <div className="flex flex-1 items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1 shadow-sm">
            <span className="material-symbols-outlined text-[12px] text-red-500">warning</span>
            <span className="truncate font-mono text-[11px] text-red-600" style={{ fontWeight: 500 }}>{domain}</span>
            <span className="material-symbols-outlined ml-auto text-[12px] text-gray-400">star_border</span>
          </div>
        </div>
      </div>

      {/* Page + popup overlay */}
      <div className="relative" style={{ minHeight: '280px' }}>
        {/* Background "page" content — blurred */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4fd] to-[#ddeeff] overflow-hidden">
          {/* Fake page content lines */}
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

        {/* Dimmed overlay */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

        {/* Popup card */}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <div className="w-full max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-[0_25px_60px_rgba(0,0,0,0.4)] ring-1 ring-black/10">
            {/* Popup header — gold gradient prize feel */}
            <div className="relative overflow-hidden px-4 py-3.5" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}>
              {/* Sparkle dots */}
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

            {/* Popup body */}
            <div className="p-4">
              {/* Countdown timer */}
              {countdown && (
                <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-center">
                  <p className="mb-1.5 text-[9px] font-extrabold uppercase tracking-widest text-red-600">⏰ Offer expires in</p>
                  <div className="flex items-center justify-center gap-1.5">
                    {countdown.split(':').map((seg, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-sm font-black text-red-500">:</span>}
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 shadow-sm">
                          <span className="font-mono text-lg font-black text-white leading-none">{seg}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Body text */}
              <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#1a1816]" style={{ fontWeight: 600 }}>
                {normalizeBody(body)}
              </p>

              {/* Social proof */}
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-green-50 border border-green-200 px-2.5 py-1.5">
                <span className="text-sm">🟢</span>
                <p className="text-[10px] text-green-800" style={{ fontWeight: 700 }}>
                  247 people claimed prizes in the last 24 hours
                </p>
              </div>

              {/* CTA button */}
              {cta && (
                <button
                  className="mt-3 w-full rounded-xl py-3 text-sm text-white shadow-lg"
                  style={{ fontWeight: 800, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)', boxShadow: '0 4px 15px rgba(239,68,68,0.4)' }}
                  disabled
                >
                  🎁 {stripText(cta)}
                </button>
              )}

              {/* Domain + disclaimer */}
              <p className="mt-2.5 break-all font-mono text-[9px] text-[#9ca3af] text-center">{domain}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Shopping / TikTok Live Mockup ──────────────────────────────────────────
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
      {/* TikTok App chrome — dark */}
      <div className="flex items-center gap-2 bg-black px-3 py-2 border-b border-white/10">
        <span className="material-symbols-outlined text-xl text-white/60">arrow_back</span>
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-black text-black">♪</span>
          <span className="text-sm font-bold text-white">TikTok Shop</span>
          <span className="rounded-sm bg-[#fe2c55] px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide text-white">Live</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="material-symbols-outlined text-xl text-white/60">search</span>
          <span className="material-symbols-outlined text-xl text-white/60">more_vert</span>
        </div>
      </div>

      {/* ── LIVE STREAM AREA ── */}
      <div className="relative" style={{ minHeight: '230px' }}>
        {/* Simulated video BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0928] via-[#0f1f3d] to-[#0a2010]" />
        {/* Scanline texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)' }}
        />
        {/* Person/seller silhouette hint */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-15"
          style={{ width: '90px', height: '130px', background: 'radial-gradient(ellipse at top, rgba(255,200,150,0.6) 0%, transparent 70%)', borderRadius: '50% 50% 0 0' }}
        />

        {/* ── TOP HUD ── */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          {/* Left: LIVE badge + viewers + gifts */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 rounded-md bg-[#fe2c55] px-2 py-0.5 shadow-lg">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              <span className="text-[10px] font-black tracking-wider text-white">LIVE</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm">
              <span className="text-[10px]">👁</span>
              <span className="text-[10px] font-bold text-white">12,483</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm">
              <span className="text-[10px]">🎁</span>
              <span className="text-[10px] font-bold text-amber-300">₱8.4K</span>
            </div>
          </div>
          {/* Right: Seller pill */}
          <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/10">
            <div className="h-5 w-5 shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-[9px] font-black text-white ring-1 ring-[#fe2c55]/50">
              {seller.charAt(0)}
            </div>
            <span className="text-[10px] font-semibold text-white">{seller}</span>
            <span className="rounded-sm bg-[#fe2c55]/90 px-1 text-[8px] font-black text-white">+</span>
          </div>
        </div>

        {/* ── RIGHT SIDE ACTION BAR ── */}
        <div className="absolute right-2 bottom-14 flex flex-col items-center gap-3 z-10">
          {[
            { icon: 'favorite', label: '48K', color: 'text-[#fe2c55]' },
            { icon: 'chat_bubble', label: '1.2K', color: 'text-white' },
            { icon: 'card_giftcard', label: 'Gift', color: 'text-amber-300' },
            { icon: 'share', label: 'Share', color: 'text-white' },
          ].map(({ icon, label, color }) => (
            <div key={icon} className="flex flex-col items-center gap-0.5">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/10 ${color}`}>
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
              </div>
              <span className={`text-[9px] font-bold ${color}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── FLOATING CHAT COMMENTS ── */}
        <div className="absolute bottom-14 left-2 flex flex-col gap-1.5 max-w-[60%] z-10">
          {[
            { user: 'user_98', msg: 'mura ah! 😮', color: 'text-pink-300' },
            { user: 'jnrvrs', msg: 'legit ba? 🤔', color: 'text-cyan-300' },
            { user: 'aling_nena', msg: 'mag-oorder na!', color: 'text-yellow-200' },
          ].map(({ user, msg, color }) => (
            <div key={user} className="flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm w-fit border border-white/5">
              <div className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex-none" />
              <span className={`text-[10px] font-bold ${color}`}>{user}</span>
              <span className="text-[10px] text-white/80">{msg}</span>
            </div>
          ))}
        </div>

        {/* ── PINNED PRODUCT BAR ── */}
        <div className="absolute bottom-1.5 left-2 right-2 flex items-center gap-2.5 rounded-xl bg-white/12 px-3 py-2 backdrop-blur-md border border-white/15 z-10">
          {/* Product thumbnail */}
          <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-gray-500/50 to-gray-700/50 border border-white/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-base text-white/30">shopping_bag</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="rounded-sm bg-[#fe2c55] px-1 py-0.5 text-[7px] font-black text-white uppercase tracking-wide">Pinned</span>
              <p className="truncate text-[11px] font-semibold text-white">{productName}</p>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black text-[#fe2c55]">{fakePrice}</span>
              <span className="text-[11px] text-gray-400 line-through">{realPrice}</span>
              <span className="rounded bg-[#fe2c55]/70 px-1 py-0.5 text-[8px] font-black text-white">-{discountPct}%</span>
            </div>
          </div>
          <button className="shrink-0 rounded-lg bg-[#fe2c55] px-3 py-2 text-[11px] font-black text-white shadow-lg shadow-[#fe2c55]/30" disabled>
            Buy
          </button>
        </div>
      </div>

      {/* ── PAYMENT SCAM WARNING ── */}
      <div className="flex items-center gap-2 bg-red-950/90 border-y border-red-800/60 px-3 py-2">
        <span className="material-symbols-outlined text-base text-red-400">warning</span>
        <p className="text-[11px] font-semibold text-red-300">
          Payment via GCash direct transfer — <span className="font-black text-red-200">no buyer protection</span>
        </p>
      </div>

      {/* ── SELLER INFO ROW ── */}
      <div className="flex items-center gap-2.5 border-b border-white/10 bg-[#111] px-3 py-2.5">
        <div className="relative">
          <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-sm font-black text-white ring-2 ring-[#fe2c55]/40">
            {seller.charAt(0)}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-[#111] flex items-center justify-center">
            <span className="text-[6px] text-white font-black">S</span>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold text-white">{seller}</p>
            <span className="rounded-sm bg-white/10 px-1 text-[9px] font-bold text-gray-400">Shop</span>
          </div>
          <p className="text-[11px] text-gray-500">Joined 3 weeks ago · 4 reviews</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
              <span key={i} className={`text-xs ${i <= 4 ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
            ))}
          </div>
          <button className="rounded-full border border-[#fe2c55]/60 px-2.5 py-0.5 text-[10px] font-bold text-[#fe2c55]" disabled>
            Follow
          </button>
        </div>
      </div>

      {/* ── DELIVERY OUTCOME ── */}
      <div className="bg-[#0d0d0d] p-3">
        <div className="overflow-hidden rounded-lg border border-red-900/60 bg-red-950/60">
          <div className="flex items-center gap-2 border-b border-red-900/60 bg-red-900/40 px-3 py-2">
            <span className="material-symbols-outlined text-base text-red-400">inventory_2</span>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-red-300">
              What actually arrived — 2 weeks later
            </p>
          </div>
          <div className="flex items-start gap-2.5 p-3">
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-lg text-red-500">cancel</span>
            <p className="text-[13px] leading-snug text-red-200" style={{ fontWeight: 600 }}>
              {deliveryOutcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[#1877F2] text-xs text-white" style={{ fontWeight: 900 }}>f</span>
          <span className="text-sm text-[#1a1816]" style={{ fontWeight: 700 }}>Marketplace</span>
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="material-symbols-outlined text-xl text-gray-500">share</span>
          <span className="material-symbols-outlined text-xl text-gray-500">bookmark_border</span>
          <span className="material-symbols-outlined text-xl text-gray-500">more_vert</span>
        </div>
      </div>

      {/* Image gallery */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-[#dfe4ea] via-[#eef1f5] to-[#e4eaf0]">
        {brand ? (
          <div className="scale-[2.2] opacity-90"><BrandLogo key={brand} brand={brand} size="lg" /></div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 shadow-sm">
              <span className="material-symbols-outlined text-5xl text-[#6b7685]">{galleryIcon}</span>
            </div>
            <p className="text-[11px] uppercase tracking-wider text-[#8a94a0]" style={{ fontWeight: 700 }}>
              Seller photo
            </p>
          </div>
        )}
        {/* Expand */}
        <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white">
          <span className="material-symbols-outlined text-[14px]">open_in_full</span>
        </span>
      </div>

      {/* Product info */}
      <div className="p-4">
        <p className="text-[1.75rem] leading-tight text-[#1a1816]" style={{ fontWeight: 800 }}>{price}</p>
        <p className="mt-1 text-base leading-snug text-[#1a1816]" style={{ fontWeight: 700 }}>{title}</p>

        {/* Location + age */}
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#4b5563]">
          <span className="material-symbols-outlined text-[14px] text-[#8a94a0]">location_on</span>
          <span style={{ fontWeight: 500 }}>{location}</span>
          <span className="text-[#ccc]">·</span>
          <span className="text-[#8a94a0]" style={{ fontWeight: 400 }}>{listingAge}</span>
        </div>

        {/* Tags */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-1 text-xs ${tag.toLowerCase().includes('gcash') || tag.toLowerCase().includes('direct') ? 'border border-red-200 bg-red-50 text-red-700' : 'bg-[#eef2f5] text-[#25303b]'}`}
              style={{ fontWeight: 700 }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-1.5 rounded-lg bg-[#1877F2] py-2.5 text-sm text-white shadow-sm" style={{ fontWeight: 700 }} disabled>
            <span className="material-symbols-outlined text-[15px]">chat</span>
            Message Seller
          </button>
          <button className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white py-2.5 text-sm text-[#1a1816]" style={{ fontWeight: 700 }} disabled>
            <span className="material-symbols-outlined text-[15px]">bookmark_border</span>
            Save
          </button>
        </div>
        <button className="mt-1.5 w-full rounded-lg border border-[#1877F2]/30 bg-blue-50 py-2 text-sm text-[#1877F2]" style={{ fontWeight: 600 }} disabled>
          Make Offer
        </button>

        <div className="my-3.5 border-t border-gray-100" />

        {/* Description */}
        <p className="mb-1.5 text-[10px] uppercase tracking-widest text-gray-500" style={{ fontWeight: 700 }}>Description</p>
        <p className="whitespace-pre-line text-sm leading-relaxed text-[#1a1816]" style={{ fontWeight: 500 }}>{normalizeBody(description)}</p>

        <div className="my-3.5 border-t border-gray-100" />

        {/* Seller info card */}
        <div className="rounded-xl border border-gray-200 bg-[#f8f9fb] p-3">
          <p className="mb-2.5 text-[10px] uppercase tracking-widest text-gray-400" style={{ fontWeight: 700 }}>Seller</p>
          <div className="flex items-center gap-2.5">
            <div className="relative flex-none">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-base text-white" style={{ fontWeight: 800 }}>
                {seller.charAt(0)}
              </div>
              <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-orange-400 border-2 border-[#f8f9fb] flex items-center justify-center">
                <span className="text-[6px] text-white font-black">!</span>
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1a1816]" style={{ fontWeight: 700 }}>{seller}</p>
              <p className="text-[11px] text-gray-500">
                Joined {accountAge} · {reviews} {reviews === 1 ? 'review' : 'reviews'}
              </p>
              <div className="mt-0.5 flex items-center gap-1 flex-wrap">
                <span className="rounded-sm bg-orange-100 px-1.5 py-0.5 text-[9px] text-orange-700 uppercase tracking-wide" style={{ fontWeight: 800 }}>New Account</span>
                <span className="rounded-sm bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-500" style={{ fontWeight: 600 }}>No response rate</span>
              </div>
            </div>
            <button className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-[#1a1816] shadow-sm" style={{ fontWeight: 600 }} disabled>
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
  amount = '\u20b14,500 balance due',
  date = 'Apr 3, 2026 - 2:18 PM',
}: ShippingReceiptMockupProps) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#c9d1d8] bg-white shadow-lg">
      <div className="flex items-center gap-3 border-b border-[#e5ded4] bg-[#f8f7f5] px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1816] text-white">
          <span className="material-symbols-outlined text-xl">storefront</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-[#1a1816]" style={{ fontWeight: 800 }}>
            {stripText(sender)}
          </p>
          <p className="text-xs text-[#4b5563]" style={{ fontWeight: 600 }}>
            Seller sent an image attachment
          </p>
        </div>
        <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] uppercase tracking-wider text-red-700" style={{ fontWeight: 800 }}>
          Unverified
        </span>
      </div>

      <div className="space-y-3 bg-[#eef2f5] p-4">
        <div className="max-w-[86%] rounded-2xl rounded-bl-sm bg-white p-3 text-sm leading-snug text-[#1a1816] shadow-sm" style={{ fontWeight: 600 }}>
          {normalizeBody(body)}
        </div>

        <div className="overflow-hidden rounded-xl border border-[#d6cfc6] bg-white shadow-sm">
          <div className="flex items-center justify-between bg-[#facc15] px-4 py-3">
            <div className="flex items-center gap-2">
              <BrandLogo brand="lbc" size="sm" />
              <div>
                <p className="text-sm uppercase tracking-wide text-[#1a1816]" style={{ fontWeight: 900 }}>
                  Shipment Receipt
                </p>
                <p className="text-[10px] text-[#3d3530]" style={{ fontWeight: 700 }}>
                  Screenshot copy only
                </p>
              </div>
            </div>
            <span className="rounded bg-red-600 px-2 py-1 text-[10px] uppercase tracking-wider text-white" style={{ fontWeight: 800 }}>
              Fake proof
            </span>
          </div>

          <div className="grid gap-3 p-4 text-sm">
            {[
              ['Tracking no.', trackingNo],
              ['Recipient', recipient],
              ['Status', status],
              ['Date', date],
              ['Requested payment', amount],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[6rem_1fr] gap-2 border-b border-[#eee7df] pb-2 last:border-b-0 last:pb-0 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
                <span className="text-[10px] uppercase tracking-wide text-[#5c544d] sm:tracking-wider" style={{ fontWeight: 800 }}>
                  {label}
                </span>
                <span className="break-words text-[#1a1816]" style={{ fontWeight: 700 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#e5ded4] bg-red-50 px-4 py-3">
            <p className="text-xs leading-snug text-red-800" style={{ fontWeight: 700 }}>
              Receipt screenshots can be edited or reused. Verify the tracking number on the courier website yourself.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  raised = '\u20b1843,210',
  goal = '\u20b11,000,000',
  posted = 'Sponsored - 18 min ago',
}: CharityPostMockupProps) {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl border border-[#c9d1d8] bg-white shadow-lg">
      <div className="flex items-center gap-3 border-b border-[#e5ded4] px-4 py-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a2fad] text-white">
          <span className="material-symbols-outlined text-xl">volunteer_activism</span>
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

      <div className="space-y-3 p-4">
        <p className="whitespace-pre-line text-sm leading-relaxed text-[#1a1816]" style={{ fontWeight: 600 }}>
          {normalizeBody(body)}
        </p>

        <div className="overflow-hidden rounded-xl border border-[#d6cfc6]">
          <div className="flex min-h-[150px] items-center justify-center bg-[#dbeafe] px-5 text-center">
            <div>
              <span className="material-symbols-outlined text-4xl text-[#0a2fad]">volunteer_activism</span>
              <p className="mt-2 text-lg uppercase text-[#1a1816]" style={{ fontWeight: 900 }}>
                {campaignTitle}
              </p>
              <p className="mt-1 text-sm text-[#3d3530]" style={{ fontWeight: 700 }}>
                Food packs, medicine, and shelter kits
              </p>
            </div>
          </div>
          <div className="space-y-3 bg-white p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#5c544d]" style={{ fontWeight: 800 }}>Raised</p>
                <p className="text-xl text-[#1a1816]" style={{ fontWeight: 900 }}>{raised}</p>
              </div>
              <p className="text-sm text-[#4b5563]" style={{ fontWeight: 700 }}>of {goal}</p>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-[84%] rounded-full bg-red-600" />
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <p className="font-mono text-xs text-red-800 break-all" style={{ fontWeight: 800 }}>
                {domain}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#e5ded4] pt-3 text-xs text-[#4b5563]" style={{ fontWeight: 700 }}>
          <span>{reactions} reactions</span>
          <span>{shares} shares</span>
        </div>
      </div>
    </div>
  );
}