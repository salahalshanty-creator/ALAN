import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroPrintingPress from '../assets/images/hero-modern-printing-press.png';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onRequestSwatches: () => void;
  isArabic?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onRequestSwatches,
  isArabic = false,
}) => {
  return (
    <section
      className="relative overflow-hidden border-b border-neutral-800"
    >
      <div
        className="hero-background-motion pointer-events-none absolute -inset-[1%] bg-cover bg-[position:62%_center] sm:bg-[position:58%_center] lg:bg-center"
        style={{ backgroundImage: `url(${heroPrintingPress})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a0f]/90 via-[#050a0f]/65 to-[#050a0f]/90 sm:hidden" aria-hidden="true" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-[#050a0f]/95 via-[#050a0f]/70 to-[#050a0f]/10 sm:block" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-4 py-10 sm:min-h-[650px] sm:px-6 sm:py-14 lg:min-h-[700px] lg:px-8 lg:py-16">
        <div className="max-w-4xl" dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300 sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.8)]" />
            <span>{isArabic ? 'مطبعة رائدة في دولة الإمارات العربية المتحدة' : 'PREMIUM PRINTING IN THE UAE'}</span>
          </div>

          <h1 className="mt-4 max-w-4xl font-sans text-4xl font-bold leading-[1.02] tracking-tight text-white [text-wrap:balance] sm:mt-5 sm:text-5xl lg:text-[clamp(4.75rem,6.25vw,5.35rem)]">
            {isArabic
              ? 'أرقى مطبوعات الشركات، البصمة الحرارية الذهبية والتغليف الفاخر بدبي'
              : <><span className="block">Your Ideas.</span><span className="mt-2 block text-[#D4AF37] sm:mt-3">Printed to Reality.</span></>}
          </h1>

          <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-neutral-200 sm:text-base lg:text-lg">
            {isArabic
              ? 'من بطاقات الأعمال الفاخرة إلى التغليف المخصص ومطبوعات الشركات. إنتاج احترافي في دبي مع خيارات تشطيب متميزة وتوصيل إلى كافة إمارات الدولة.'
              : 'From premium business cards and corporate gifts to signage, packaging and large-format printing — crafted with precision and delivered across the UAE.'}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={onExploreCatalog}
              className="flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-amber-500 px-6 py-3.5 font-sans text-sm font-bold text-neutral-950 shadow-lg shadow-black/20 transition-all hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 active:scale-[0.98]"
            >
              <span>{isArabic ? 'تصفح الكتالوج واحسب سعرك فوراً' : 'Explore Products'}</span>
              <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onRequestSwatches}
              className="min-h-12 rounded-xl border border-white/45 bg-white/10 px-5 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/70 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{isArabic ? 'طلب دفتر العينات مجاناً' : 'Get Instant Price'}</span>
            </button>
          </div>
        </div>

        <div className="mt-10 grid max-w-4xl grid-cols-3 gap-x-5 gap-y-5 border-t border-white/20 pt-6 font-sans text-white sm:mt-12 sm:gap-6">
          <div>
            <div className="text-lg font-bold tabular-nums sm:text-xl">500+</div>
            <div className="mt-0.5 text-[10px] leading-4 text-neutral-300 sm:text-[11px]">Projects Delivered</div>
          </div>

          <div>
            <div className="text-lg font-bold tabular-nums sm:text-xl">UAE</div>
            <div className="mt-0.5 text-[10px] leading-4 text-neutral-300 sm:text-[11px]">Fast Delivery</div>
          </div>

          <div>
            <div className="text-lg font-bold tabular-nums sm:text-xl">Premium</div>
            <div className="mt-0.5 text-[10px] leading-4 text-neutral-300 sm:text-[11px]">Quality Finish</div>
          </div>
        </div>
      </div>
    </section>
  );
};
