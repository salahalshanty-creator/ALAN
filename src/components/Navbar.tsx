import React from 'react';
import { ShoppingBag, Globe, Menu, X } from 'lucide-react';
import navbarLogo from '../assets/images/alan-logo-new.png';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenSwatchModal: () => void;
  onOpenQuoteModal: () => void;
  onScrollToCatalog: () => void;
  onNavigateToAIDesign: () => void;
  onNavigate: (path: string) => void;
  isArabic: boolean;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTracker,
  onOpenSwatchModal,
  onOpenQuoteModal,
  onScrollToCatalog,
  onNavigateToAIDesign,
  onNavigate,
  isArabic,
  onToggleLanguage,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = (path: string) => { setMobileOpen(false); onNavigate(path); };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="site-shell min-h-20 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="group shrink-0 transition-[opacity,transform] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] starting:-translate-y-1 starting:scale-[0.97] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:translate-y-0 motion-reduce:starting:scale-100"
          aria-label="Go to homepage"
        >
          <img
            src={navbarLogo}
            alt="Alan Advertisement and Printing"
            className="h-12 w-auto max-w-[120px] object-contain transition-transform duration-[250ms] ease-out group-hover:-translate-y-px group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100 sm:h-14 sm:max-w-[150px] lg:h-16 lg:max-w-[180px]"
          />
        </button>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] xl:text-sm font-medium text-neutral-700 whitespace-nowrap">
          <button onClick={() => navigate('/')} className="hover:text-neutral-950 transition-colors">{isArabic ? 'الرئيسية' : 'Home'}</button>
          <button onClick={() => navigate('/products')} className="hover:text-neutral-950 transition-colors">{isArabic ? 'المنتجات' : 'Products'}</button>
          <button onClick={() => { setMobileOpen(false); onNavigateToAIDesign(); }} className="hover:text-amber-700 transition-colors">AI Design</button>
          <button onClick={() => navigate('/offers')} className="hover:text-neutral-950 transition-colors">{isArabic ? 'العروض والإعلانات' : 'Offers & Ads'}</button>
          <button onClick={() => navigate('/work')} className="hover:text-neutral-950 transition-colors">{isArabic ? 'أعمالنا' : 'Our Work'}</button>
          <button onClick={onOpenQuoteModal} className="hover:text-neutral-950 transition-colors">{isArabic ? 'اطلب عرض سعر' : 'Get a Quote'}</button>
          <button onClick={() => navigate('/about')} className="hover:text-neutral-950 transition-colors">{isArabic ? 'من نحن' : 'About Us'}</button>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onToggleLanguage} className="hidden sm:flex px-2.5 py-1.5 text-xs font-medium text-neutral-600 border border-neutral-200 rounded-lg items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /><span>{isArabic ? 'English' : 'العربية'}</span>
          </button>
          <button type="button" onClick={onOpenCart} className="relative p-2.5 bg-neutral-900 text-white rounded-lg flex items-center gap-2 text-xs font-semibold" aria-label="View Cart">
            <ShoppingBag className="w-4 h-4" /><span className="hidden sm:inline">{isArabic ? 'السلة' : 'Cart'}</span>
            {cartCount > 0 && <span className="w-5 h-5 bg-amber-500 text-neutral-950 rounded-full text-[11px] font-bold flex items-center justify-center">{cartCount}</span>}
          </button>
          <button type="button" onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 border border-neutral-200 rounded-lg" aria-label="Open menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 py-4 space-y-2">
          {[
            ['/', isArabic ? 'الرئيسية' : 'Home'],
            ['/products', isArabic ? 'المنتجات' : 'Products'],
            ['#ai-design', 'AI Design'],
            ['/offers', isArabic ? 'العروض والإعلانات' : 'Offers & Ads'],
            ['/work', isArabic ? 'أعمالنا' : 'Our Work'],
          ].map(([path, label]) => <button key={path} onClick={() => path === '#ai-design' ? (setMobileOpen(false), onNavigateToAIDesign()) : navigate(path)} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm">{label}</button>)}
          <button onClick={onOpenQuoteModal} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm">{isArabic ? 'اطلب عرض سعر' : 'Get a Quote'}</button>
          <button onClick={() => navigate('/about')} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm">{isArabic ? 'من نحن' : 'About Us'}</button>
        </div>
      )}
    </header>
  );
};
