import React from 'react';
import { Menu, LogOut, UserRound, X } from 'lucide-react';
import navbarLogo from '../assets/branding/alan-logo-full.png';
import { AuthPage } from './AuthPage';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  onOpenTracker: () => void;
  onOpenSwatchModal: () => void;
  onOpenQuoteModal: () => void;
  onScrollToCatalog: () => void;
  onNavigateToAIDesign: () => void;
  onNavigate: (path: string) => void;
  isArabic: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTracker,
  onOpenSwatchModal,
  onOpenQuoteModal,
  onScrollToCatalog,
  onNavigateToAIDesign,
  onNavigate,
  isArabic,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [authOpen, setAuthOpen] = React.useState(false);
  const [isSigningOut, setIsSigningOut] = React.useState(false);
  const { user, isLoading } = useAuth();
  const navigate = (path: string) => { setMobileOpen(false); onNavigate(path); };
  const accountLabel = user?.user_metadata.full_name || user?.email || 'Account';

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    setIsSigningOut(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="site-shell min-h-20 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="group shrink-0 translate-x-[18px] transition-[opacity,transform] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] starting:-translate-y-1 starting:scale-[0.97] starting:opacity-0 motion-reduce:transition-none motion-reduce:starting:translate-y-0 motion-reduce:starting:scale-100"
          aria-label="Go to homepage"
        >
          <img
            src={navbarLogo}
            alt="Alan Advertisement and Printing"
            className="h-12 w-auto max-w-[120px] object-contain transition-transform duration-[250ms] ease-out group-hover:-translate-y-px group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100 sm:h-14 sm:max-w-[150px] lg:h-16 lg:max-w-[180px]"
          />
        </button>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] xl:text-sm font-medium text-neutral-300 whitespace-nowrap">
          <button onClick={() => navigate('/')} className="hover:text-white transition-colors">{isArabic ? 'الرئيسية' : 'Home'}</button>
          <button onClick={() => navigate('/products')} className="hover:text-white transition-colors">{isArabic ? 'المنتجات' : 'Products'}</button>
          <button onClick={() => { setMobileOpen(false); onNavigateToAIDesign(); }} className="hover:text-white transition-colors">AI Design</button>
          <button onClick={() => navigate('/offers')} className="hover:text-white transition-colors">{isArabic ? 'العروض والإعلانات' : 'Offers & Ads'}</button>
          <button onClick={() => navigate('/work')} className="hover:text-white transition-colors">{isArabic ? 'أعمالنا' : 'Our Work'}</button>
          <button onClick={onOpenQuoteModal} className="hover:text-white transition-colors">{isArabic ? 'اطلب عرض سعر' : 'Get a Quote'}</button>
          <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">{isArabic ? 'من نحن' : 'About Us'}</button>
        </nav>

        <div className="flex items-center gap-2">
          {!isLoading && (user ? <>
            <span className="hidden max-w-32 truncate px-1 text-xs font-semibold text-neutral-200 sm:inline" title={accountLabel}>{accountLabel}</span>
            <button type="button" onClick={() => void handleSignOut()} disabled={isSigningOut} className="hidden p-2.5 text-neutral-300 transition-colors hover:text-white disabled:opacity-50 sm:block" aria-label="Log out" title="Log out"><LogOut className="w-4 h-4" /></button>
          </> : <button type="button" onClick={() => setAuthOpen(true)} className="hidden items-center gap-1.5 rounded-lg border border-neutral-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:border-neutral-400 hover:bg-neutral-900 sm:flex"><UserRound className="w-4 h-4" />Account</button>)}
          <button type="button" onClick={() => setMobileOpen(v => !v)} className="lg:hidden p-2 border border-neutral-700 rounded-lg text-white" aria-label="Open menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-4 space-y-2 text-neutral-200">
          {[
            ['/', isArabic ? 'الرئيسية' : 'Home'],
            ['/products', isArabic ? 'المنتجات' : 'Products'],
            ['#ai-design', 'AI Design'],
            ['/offers', isArabic ? 'العروض والإعلانات' : 'Offers & Ads'],
            ['/work', isArabic ? 'أعمالنا' : 'Our Work'],
          ].map(([path, label]) => <button key={path} onClick={() => path === '#ai-design' ? (setMobileOpen(false), onNavigateToAIDesign()) : navigate(path)} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-900 text-sm">{label}</button>)}
          <button onClick={onOpenQuoteModal} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm">{isArabic ? 'اطلب عرض سعر' : 'Get a Quote'}</button>
          <button onClick={() => navigate('/about')} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm">{isArabic ? 'من نحن' : 'About Us'}</button>
          {!isLoading && (user ? <button type="button" onClick={() => void handleSignOut()} disabled={isSigningOut} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-neutral-700 disabled:opacity-50"><LogOut className="w-4 h-4" />Log out</button> : <button type="button" onClick={() => { setMobileOpen(false); setAuthOpen(true); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-neutral-800"><UserRound className="w-4 h-4" />Account</button>)}
        </div>
      )}
      <AuthPage isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
};
