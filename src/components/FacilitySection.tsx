import React from 'react';
import { ShieldCheck, Award, Zap, Ruler } from 'lucide-react';

interface FacilitySectionProps {
  onRequestQuote: () => void;
  onRequestSwatches: () => void;
  isArabic?: boolean;
}

export const FacilitySection: React.FC<FacilitySectionProps> = ({
  onRequestQuote,
  onRequestSwatches,
  isArabic = false,
}) => {
  return (
    <section className="py-20 bg-[#161617] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              {isArabic ? 'تقنيات ألمانية متطورة في قلب دبي' : 'The Dubai Industrial Atelier'}
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white leading-tight [text-wrap:balance]">
              {isArabic
                ? 'دقة الماكينات الألمانية وعناية الحرفيين اليدوية بالتفاصيل'
                : 'German Engineering Meets Bespoke Hand Craftsmanship in Dubai.'}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              {isArabic
                ? 'في مجمع القوز الصناعي 2، نجمع بين أحدث ماكينات هايدلبرغ الألمانية لطباعة الأوفست فائقة الجودة، وماكينات سكوديكس الرقمية ثلاثية الأبعاد للبصمة والورنيش، مع ورش تصنيع وتجميع العلب المقواة يدوياً لضمان أعلى درجات الفخامة.'
                : 'Situated in Al Quoz Industrial 2, our facility houses Heidelberg Speedmaster multi-color presses, Scodix 3D digital spot foil varnish, and automated Swiss laser plotters. Every luxury box is hand-wrapped and inspected under 5000K calibrated D50 daylight lamps before dispatch.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Heidelberg Speedmaster Offset</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">High-volume corporate runs with micro-dot dot gain calibration.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Scodix 3D Polymer Foil</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Raised tactile varnish and metallic sheen without traditional die limits.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Ruler className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">V-Groove Rigid Box Engineering</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Razor sharp 90-degree outer edges with invisible magnetic clasps.</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">FOGRA39 ISO 12647-2 Certified</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Strict spectrophotometer color balance matches brand manuals 100%.</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onRequestQuote}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold rounded-xl text-xs transition-colors"
              >
                {isArabic ? 'طلب تسعير لمناقصة خاصة' : 'Request Enterprise Tender Quote'}
              </button>

              <button
                type="button"
                onClick={onRequestSwatches}
                className="px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl text-xs transition-colors"
              >
                {isArabic ? 'طلب عينات خامات ومواد' : 'Request Tactile Material Swatches'}
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl relative aspect-[16/10]">
              <img
                src="/src/assets/images/facility_heidelberg_press_1790497128205.jpg"
                alt="Heidelberg commercial printing machinery at ALAN ADVERTISMENT AND PRINTING Dubai facility"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  Al Quoz Industrial Area 2, Dubai
                </span>
                <p className="text-sm font-medium text-neutral-200 mt-0.5">
                  Over 35,000 sq.ft of precision offset, digital indigo, and luxury box assembly suites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
