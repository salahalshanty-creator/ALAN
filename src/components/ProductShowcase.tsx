import React from 'react';
import { ArrowRight } from 'lucide-react';

const PRODUCT_CATEGORIES = [
  'Business Cards',
  'Packaging',
  'Bags',
  'Brochures',
  'Stickers & Labels',
  'Custom Products',
] as const;

interface ProductShowcaseProps {
  onBrowseProducts: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onBrowseProducts }) => {
  return (
    <section className="border-b border-neutral-200 bg-[#F7F6F2]" aria-labelledby="product-showcase-title">
      <div className="site-shell py-10 sm:py-12 lg:py-14">
        <div className="lg:grid lg:grid-cols-[clamp(250px,17vw,310px)_minmax(0,1fr)] lg:items-stretch lg:gap-8 xl:gap-10">
          <div className="max-w-md lg:flex lg:flex-col lg:self-stretch">
            <p className="text-base font-extrabold uppercase tracking-[0.16em] text-amber-700 lg:text-[clamp(1.125rem,1.1vw,1.25rem)]">
              Our Products
              <span className="mt-3 block h-px w-12 bg-amber-700/80" aria-hidden="true" />
            </p>
            <h2 id="product-showcase-title" className="mt-5 font-sans text-[clamp(2.125rem,2.2vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-neutral-950">
              <span className="block">Everything</span>
              <span className="block whitespace-nowrap">You Can Print</span>
            </h2>
            <p className="mt-6 max-w-[18rem] text-[clamp(1rem,.95vw,1.0625rem)] leading-[1.6] text-neutral-600">
              Premium print products for every idea, occasion and industry.
            </p>
            <button
              type="button"
              onClick={onBrowseProducts}
              className="group mt-7 inline-flex items-center gap-3 text-[clamp(1rem,1vw,1.0625rem)] font-bold text-neutral-900 transition-colors duration-200 ease-out hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600 lg:mt-auto lg:border-t lg:border-neutral-300 lg:pt-3"
            >
              Browse All Products
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>

          <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-0 lg:overflow-visible lg:px-0 lg:pb-0">
            <div className="grid auto-cols-[minmax(150px,42vw)] grid-flow-col gap-3 sm:auto-cols-[190px] lg:grid-flow-row lg:grid-cols-6 lg:gap-3">
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={onBrowseProducts}
                  className="group min-w-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-600"
                  aria-label={`Browse ${category}`}
                >
                  <span className="block aspect-[4/5] w-full border border-neutral-200 bg-[#ECEAE4] transition-colors group-hover:border-amber-700/40 group-hover:bg-[#E8E5DE]" aria-hidden="true" />
                  <span className="mt-3 flex items-start justify-between gap-2 border-t border-neutral-300 pt-3">
                    <span className="text-xs font-semibold leading-5 text-neutral-900">{category}</span>
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
