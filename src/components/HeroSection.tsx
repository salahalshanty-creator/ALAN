import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock, MapPin } from 'lucide-react';

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
    <section className="relative overflow-hidden bg-[#FAF9F5] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
              <span>{isArabic ? 'مطبعة رائدة في دولة الإمارات العربية المتحدة' : 'Commercial & Luxury Printing Atelier · Dubai'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 tracking-tight leading-[1.1] [text-wrap:balance]">
              {isArabic 
                ? 'أرقى مطبوعات الشركات، البصمة الحرارية الذهبية والتغليف الفاخر بدبي'
                : 'The Benchmark of Fine Corporate Printing & Bespoke Packaging in the UAE.'}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 font-sans max-w-2xl leading-relaxed">
              {isArabic
                ? 'من بطاقات الأعمال المخملية الفاخرة بتقنية البصمة الحرارية الذهبية، إلى العلب المقواة المخصصة للعطور والهدايا وكتالوجات المعارض. إنتاج ألماني متطور في القوز 2 مع توصيل فوري لكافة إمارات الدولة.'
                : 'Engineered for executive leadership, DIFC boardrooms, and luxury brands across the 7 Emirates. Precision Heidelberg offset, Scodix 3D tactile foil, and hand-wrapped rigid boxes produced in Dubai with same-day dispatch.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all shadow-sm active:scale-98"
              >
                <span>{isArabic ? 'تصفح الكتالوج واحسب سعرك فوراً' : 'Configure Products & Live Prices'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onRequestSwatches}
                className="px-5 py-3.5 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-xl text-sm font-medium transition-all"
              >
                <span>{isArabic ? 'طلب دفتر العينات مجاناً' : 'Request Free Paper Swatch Kit'}</span>
              </button>
            </div>

            {/* Quantitative Trust Markers (Claim to proof adjacency) */}
            <div className="pt-6 border-t border-neutral-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-neutral-700">
              <div>
                <div className="text-xl font-serif font-bold text-neutral-900 tabular-nums">24h / Same-Day</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Dubai Al Quoz Rush Print</div>
              </div>

              <div>
                <div className="text-xl font-serif font-bold text-neutral-900 tabular-nums">1,200 GSM</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Rigid Kappa Box Craft</div>
              </div>

              <div>
                <div className="text-xl font-serif font-bold text-neutral-900 tabular-nums">5% UAE VAT</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Quality Checked & Professionally Finished</div>
              </div>

              <div>
                <div className="text-xl font-serif font-bold text-neutral-900 tabular-nums">7 Emirates</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Direct Fleet Courier Delivery</div>
              </div>
            </div>
          </div>

          {/* Right Image Showcase Column (16:9 Aspect Ratio) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-100 aspect-[4/3] lg:aspect-[1/1] xl:aspect-[4/3]">
              <img
                src="/src/assets/images/hero_printing_press_luxury_1790497071834.jpg"
                alt="Luxury Dubai corporate stationery with gold foil stamping and bespoke rigid boxes"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  ALAN Production Atelier
                </span>
                <h2 className="text-lg font-serif font-bold mt-0.5">
                  Ultra-thick Cotton, Mirrored Foils & Hand-Assembled Boxes
                </h2>
                <div className="flex items-center gap-3 text-xs text-neutral-300 mt-1">
                  <span>Dubai Al Quoz 2 Facility</span>
                  <span aria-hidden="true">·</span>
                  <span>German Heidelberg Press</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
