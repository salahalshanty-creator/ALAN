import React, { useEffect, useState } from 'react';
import { Product, CartItem, Order } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { FacilitySection } from './components/FacilitySection';
import { Footer } from './components/Footer';
import { ProductConfiguratorModal } from './components/ProductConfiguratorModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { SwatchKitModal } from './components/SwatchKitModal';
import { CustomQuoteModal } from './components/CustomQuoteModal';
import { Sparkles, Truck, ShieldCheck, Zap } from 'lucide-react';
import { OffersPage, WorkPage, AboutPage } from './components/MarketingPages';
import { WhatsAppWidget } from './components/WhatsAppWidget';

export default function App() {
  const [isArabic, setIsArabic] = useState(false);
  const [route, setRoute] = useState(() => window.location.pathname || '/');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('alan_cart') || '[]'); } catch { return []; }
  });
  const [userOrders, setUserOrders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem('alan_orders') || '[]'); } catch { return []; }
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackingOrderNumber, setTrackingOrderNumber] = useState('');
  const [isSwatchModalOpen, setIsSwatchModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => { localStorage.setItem('alan_cart', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem('alan_orders', JSON.stringify(userOrders)); }, [userOrders]);
  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (path: string) => {
    if (path === route) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const scrollToCatalog = () => {
    if (route !== '/products') { navigate('/products'); return; }
    document.getElementById('print-catalog')?.scrollIntoView({ behavior: 'smooth' });
  };
  const openTracker = () => { setTrackingOrderNumber(''); setIsTrackerOpen(true); };
  const handleOrderCreated = (order: Order) => { setUserOrders(p => [order, ...p]); setLatestOrder(order); setCartItems([]); setIsConfirmationOpen(true); };

  const home = (
    <>
      <HeroSection onExploreCatalog={scrollToCatalog} onRequestSwatches={() => setIsSwatchModalOpen(true)} isArabic={isArabic} />
      <section className="bg-white border-b border-neutral-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-800">
          {[
            [ShieldCheck, 'Professional Quality', 'Careful production and finishing for business materials.'],
            [Sparkles, 'Premium Finishes', 'Foil, lamination, spot UV and custom finishing options.'],
            [Truck, 'UAE Delivery', 'Delivery support for customers across the Emirates.'],
            [Zap, 'Fast Service', 'Quick turnaround options for urgent print requirements.'],
          ].map(([Icon, title, desc]) => <div key={String(title)} className="flex items-start gap-3"><Icon className="w-5 h-5 text-amber-700 shrink-0"/><div><h4 className="text-xs font-bold text-neutral-900">{title as string}</h4><p className="text-[11px] text-neutral-500 mt-0.5">{desc as string}</p></div></div>)}
        </div>
      </section>
      <ProductCatalog onSelectProduct={setSelectedProduct} isArabic={isArabic} maxProducts={6} onOpenOnlineQuote={() => setIsQuoteModalOpen(true)} />
      <section className="py-3 bg-white text-center"><button onClick={() => navigate('/products')} className="px-5 py-3 bg-neutral-900 text-white rounded-xl text-sm font-semibold">View All Products</button></section>
      <FacilitySection onRequestQuote={() => setIsQuoteModalOpen(true)} onRequestSwatches={() => setIsSwatchModalOpen(true)} isArabic={isArabic} />
    </>
  );

  let page: React.ReactNode = home;
  if (route === '/products') page = <ProductCatalog onSelectProduct={setSelectedProduct} isArabic={isArabic} onOpenOnlineQuote={() => setIsQuoteModalOpen(true)} />;
  if (route === '/offers') page = <OffersPage isArabic={isArabic} onNavigate={navigate} onOpenQuote={() => setIsQuoteModalOpen(true)} />;
  if (route === '/work') page = <WorkPage isArabic={isArabic} onNavigate={navigate} onOpenQuote={() => setIsQuoteModalOpen(true)} />;
  if (route === '/about') page = <AboutPage isArabic={isArabic} onNavigate={navigate} onOpenQuote={() => setIsQuoteModalOpen(true)} />;

  return (
    <div className={`min-h-screen flex flex-col bg-[#FBFBFA] ${isArabic ? 'font-arabic' : 'font-sans'}`}>
      <aside aria-label="Announcement" className="bg-[#1C1B1A] text-neutral-300 text-[11px] py-2 px-4 border-b border-neutral-800"><div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /><span className="text-white font-medium">ALAN ADVERTISMENT AND PRINTING</span><span>Professional Advertising & Printing Solutions · UAE</span></div></aside>
      <Navbar cartCount={cartItems.length} onOpenCart={() => setIsCartOpen(true)} onOpenTracker={openTracker} onOpenSwatchModal={() => setIsSwatchModalOpen(true)} onOpenQuoteModal={() => setIsQuoteModalOpen(true)} onScrollToCatalog={scrollToCatalog} onNavigate={navigate} isArabic={isArabic} onToggleLanguage={() => setIsArabic(v => !v)} />
      <main className="flex-1">{page}</main>
      <Footer onOpenTracker={openTracker} onOpenSwatchModal={() => setIsSwatchModalOpen(true)} onOpenQuoteModal={() => setIsQuoteModalOpen(true)} onScrollToCatalog={scrollToCatalog} isArabic={isArabic} onNavigate={navigate} />

      <ProductConfiguratorModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={(item) => setCartItems(p => [item, ...p])} isArabic={isArabic} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onRemoveItem={(id) => setCartItems(p => p.filter(i => i.id !== id))} onProceedToCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} isArabic={isArabic} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={cartItems} onOrderCreated={handleOrderCreated} isArabic={isArabic} />
      <OrderConfirmationModal order={latestOrder} isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onTrackOrder={(n) => { setTrackingOrderNumber(n); setIsTrackerOpen(true); }} isArabic={isArabic} />
      <OrderTrackerModal isOpen={isTrackerOpen} onClose={() => setIsTrackerOpen(false)} initialOrderNumber={trackingOrderNumber} userOrders={userOrders} isArabic={isArabic} />
      <SwatchKitModal isOpen={isSwatchModalOpen} onClose={() => setIsSwatchModalOpen(false)} isArabic={isArabic} />
      <CustomQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} isArabic={isArabic} />
      <WhatsAppWidget />
    </div>
  );
}
