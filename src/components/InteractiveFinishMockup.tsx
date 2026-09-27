import React, { useState, useRef } from 'react';
import { PrintFinish, PaperStock } from '../types';
import { Sparkles, Eye, CheckCircle2, ShieldCheck, Ruler, Layers } from 'lucide-react';

interface InteractiveFinishMockupProps {
  productTitle: string;
  selectedStock: PaperStock;
  selectedFinish: PrintFinish;
  uploadedArtworkName?: string;
  isArabic?: boolean;
}

export const InteractiveFinishMockup: React.FC<InteractiveFinishMockupProps> = ({
  productTitle,
  selectedStock,
  selectedFinish,
  uploadedArtworkName,
  isArabic = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [showBleedGuides, setShowBleedGuides] = useState(false);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLightPos({ x, y });
  };

  const handleMouseLeave = () => {
    setLightPos({ x: 50, y: 50 });
  };

  const isDarkStock = selectedStock?.id === 'fedrigoni-black';
  const isFoil = selectedFinish?.type === 'foil';
  const isUV = selectedFinish?.type === 'uv';
  const isEmboss = selectedFinish?.type === 'emboss';

  // Dynamic metallic gradient angle based on cursor position
  const foilGradient = `linear-gradient(${115 + (lightPos.x - 50) * 0.8}deg, 
    #BF953F 0%, 
    #FCF6BA ${Math.max(15, Math.min(85, lightPos.x)) - 15}%, 
    #B38728 ${Math.max(25, Math.min(85, lightPos.x))}%, 
    #FBF5B7 ${Math.max(35, Math.min(90, lightPos.x)) + 15}%, 
    #AA771C 100%)`;

  const roseGoldGradient = `linear-gradient(${115 + (lightPos.x - 50) * 0.8}deg, 
    #A75D67 0%, 
    #F4D0D2 ${Math.max(15, Math.min(85, lightPos.x)) - 15}%, 
    #C47B85 ${Math.max(25, Math.min(85, lightPos.x))}%, 
    #FDE5E7 ${Math.max(35, Math.min(90, lightPos.x)) + 15}%, 
    #934A54 100%)`;

  const silverGradient = `linear-gradient(${115 + (lightPos.x - 50) * 0.8}deg, 
    #8A95A5 0%, 
    #FFFFFF ${Math.max(15, Math.min(85, lightPos.x)) - 15}%, 
    #CAD2DB ${Math.max(25, Math.min(85, lightPos.x))}%, 
    #FFFFFF ${Math.max(35, Math.min(90, lightPos.x)) + 15}%, 
    #7B8696 100%)`;

  let activeMetallicFoil = foilGradient;
  if (selectedFinish?.id === 'rose-gold-foil') activeMetallicFoil = roseGoldGradient;
  if (selectedFinish?.id === 'silver-foil') activeMetallicFoil = silverGradient;

  return (
    <div className="flex flex-col gap-3">
      {/* Top control bar for preview */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-medium text-neutral-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {isArabic ? 'محاكي الخامات واللمعان التفاعلي' : 'Tactile Finish & Light Simulator'}
          </span>
          <span aria-hidden="true">·</span>
          <span>{isArabic ? 'حرّك المؤشر لمشاهدة انعكاس الضوء' : 'Hover to reflect light'}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowBleedGuides(!showBleedGuides)}
            className={`px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1 ${
              showBleedGuides 
                ? 'bg-amber-100 text-amber-900 font-medium' 
                : 'bg-neutral-100 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Ruler className="w-3 h-3" />
            {isArabic ? 'خطوط القص والأمان' : 'Bleed & Trim Guides'}
          </button>

          <button
            type="button"
            onClick={() => setActiveSide(activeSide === 'front' ? 'back' : 'front')}
            className="px-2.5 py-1 text-xs bg-neutral-100 text-neutral-600 hover:text-neutral-900 rounded transition-colors flex items-center gap-1"
          >
            <Layers className="w-3 h-3" />
            {activeSide === 'front' 
              ? (isArabic ? 'الوجه الأمامي' : 'Front View') 
              : (isArabic ? 'الوجه الخلفي' : 'Reverse View')}
          </button>
        </div>
      </div>

      {/* Interactive 3D Card Simulator Canvas */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden cursor-crosshair border border-neutral-200 shadow-inner flex items-center justify-center p-6"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #ECEBE7 0%, #DFDDD7 100%)',
        }}
      >
        {/* Soft studio ambient shadow underneath the substrate */}
        <div 
          className="absolute w-[82%] h-[68%] rounded-lg transition-transform duration-150 ease-out pointer-events-none"
          style={{
            transform: `translate(${ (lightPos.x - 50) * -0.15 }px, ${ 22 + (lightPos.y - 50) * -0.1 }px) scale(0.98)`,
            background: 'radial-gradient(ellipse at center, rgba(15,15,15,0.28) 0%, rgba(15,15,15,0.02) 70%, transparent 100%)',
            filter: 'blur(16px)',
          }}
        />

        {/* The Card / Print Substrate */}
        <div
          className="relative w-[82%] h-[72%] rounded-md transition-all duration-150 ease-out select-none flex flex-col justify-between p-6 sm:p-8"
          style={{
            transform: `perspective(900px) rotateY(${ (lightPos.x - 50) * 0.15 }deg) rotateX(${ (lightPos.y - 50) * -0.15 }deg)`,
            backgroundColor: isDarkStock ? '#141416' : '#FAF9F5',
            color: isDarkStock ? '#FFFFFF' : '#171717',
            boxShadow: `
              ${(lightPos.x - 50) * -0.2}px ${(lightPos.y - 50) * -0.2}px 12px rgba(0,0,0,0.06),
              0 20px 30px -10px rgba(0,0,0,0.18),
              inset 0 0 0 1px ${isDarkStock ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
            `,
          }}
        >
          {/* Paper Texture Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply rounded-md"
            style={{
              backgroundImage: 'radial-gradient(#d0cec7 0.75px, transparent 0.75px)',
              backgroundSize: '8px 8px',
            }}
          />

          {/* Glint & Specular Spot UV / Foil Lighting Pass */}
          <div
            className="absolute inset-0 pointer-events-none rounded-md transition-opacity duration-200"
            style={{
              opacity: isFoil || isUV ? 0.75 : 0.25,
              background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 35%, transparent 60%)`,
              mixBlendMode: 'overlay',
            }}
          />

          {/* Bleed lines overlay if enabled */}
          {showBleedGuides && (
            <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-red-500/60 rounded-md">
              <span className="absolute top-1 left-2 text-[9px] font-mono text-red-600 bg-white/90 px-1 rounded">
                Trim Cut Line (0mm)
              </span>
              <div className="absolute inset-2 border border-emerald-500/50">
                <span className="absolute bottom-1 right-2 text-[9px] font-mono text-emerald-700 bg-white/90 px-1 rounded">
                  Safe Zone Margin (4mm)
                </span>
              </div>
            </div>
          )}

          {/* Top Brand Element on Card */}
          <div className="relative z-10 flex items-start justify-between">
            <div>
              {/* Emblem / Monogram */}
              <div 
                className="w-10 h-10 rounded border flex items-center justify-center font-serif text-lg font-bold tracking-widest uppercase transition-all duration-150"
                style={{
                  borderColor: isFoil ? '#D4AF37' : (isDarkStock ? '#333' : '#E0DED7'),
                  background: isFoil ? activeMetallicFoil : 'transparent',
                  WebkitBackgroundClip: isFoil ? 'text' : undefined,
                  WebkitTextFillColor: isFoil ? 'transparent' : (isDarkStock ? '#FFF' : '#111'),
                  textShadow: isEmboss ? '1px 1px 1px rgba(0,0,0,0.5), -1px -1px 1px rgba(255,255,255,0.8)' : undefined,
                }}
              >
                AW
              </div>
              <p 
                className="text-[10px] tracking-[0.2em] uppercase mt-2 font-medium"
                style={{
                  color: isDarkStock ? '#9E9E9E' : '#737373',
                }}
              >
                ALAN Atelier · Dubai
              </p>
            </div>

            <div className="text-right">
              <div 
                className="text-xs font-serif italic"
                style={{
                  color: isFoil ? '#D4AF37' : (isDarkStock ? '#A3A3A3' : '#525252'),
                }}
              >
                {activeSide === 'front' ? 'Executive Edition' : 'Prepress Registered'}
              </div>
              <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                {selectedStock?.weightGsm} GSM · {selectedStock?.name.split(' ')[0]}
              </div>
            </div>
          </div>

          {/* Centerpiece Typographic Treatment with Active Finish Effect */}
          <div className="relative z-10 my-auto text-left">
            <h4
              className="text-xl sm:text-2xl font-serif font-bold tracking-tight transition-all duration-150"
              style={{
                background: isFoil ? activeMetallicFoil : undefined,
                WebkitBackgroundClip: isFoil ? 'text' : undefined,
                WebkitTextFillColor: isFoil ? 'transparent' : (isDarkStock ? '#FAF8F5' : '#141414'),
                filter: isFoil ? 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))' : undefined,
                textShadow: isEmboss 
                  ? `${(lightPos.x - 50) * 0.04}px ${(lightPos.y - 50) * 0.04}px 2px rgba(0,0,0,0.4), ${-(lightPos.x - 50) * 0.04}px ${-(lightPos.y - 50) * 0.04}px 2px rgba(255,255,255,0.7)` 
                  : undefined,
              }}
            >
              {uploadedArtworkName ? uploadedArtworkName.replace(/\.[^/.]+$/, "") : 'MOHAMMED AL QASSIMI'}
            </h4>

            <p 
              className="text-xs sm:text-sm font-sans tracking-wide mt-1"
              style={{
                color: isDarkStock ? '#D4AF37' : '#8C7324',
              }}
            >
              Managing Director · DIFC Emirates Towers
            </p>

            {isUV && (
              <div 
                className="inline-block mt-2 px-2 py-0.5 text-[10px] font-sans font-medium rounded transition-all duration-150"
                style={{
                  background: `linear-gradient(${120 + (lightPos.x - 50)}deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 100%)`,
                  color: isDarkStock ? '#FFFFFF' : '#111111',
                  boxShadow: '0 2px 8px rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                ✦ 3D Raised Polymer Varnish Layer Active
              </div>
            )}
          </div>

          {/* Bottom Coordinates & QR/Vector Mark */}
          <div className="relative z-10 flex items-end justify-between text-[10px] border-t pt-2"
            style={{
              borderColor: isDarkStock ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              color: isDarkStock ? '#8E8E93' : '#737373',
            }}
          >
            <div>
              <p>Gate Village 03, Dubai International Financial Centre</p>
              <p className="font-mono tracking-tight text-[9px] mt-0.5">052 364 0939</p>
            </div>

            <div className="font-mono text-[9px] text-right">
              <span className="inline-block px-1.5 py-0.5 rounded bg-black/5 text-neutral-600">
                {selectedFinish?.name.split(' ')[0]} {selectedFinish?.type.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-flight Instant Verification Bar */}
      <div className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium text-neutral-800">
            {isArabic ? 'الفحص الفني المسبق للطباعة (Pre-press Preflight):' : 'Pre-press Preflight Status:'}
          </span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isArabic ? 'جاهز للمطبعة بنسبة 100%' : '100% Press Ready'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-neutral-500 font-mono text-[11px]">
          <span>300 DPI Vector</span>
          <span aria-hidden="true">·</span>
          <span>FOGRA39 CMYK</span>
          <span aria-hidden="true">·</span>
          <span>3mm Bleed OK</span>
        </div>
      </div>
    </div>
  );
};
