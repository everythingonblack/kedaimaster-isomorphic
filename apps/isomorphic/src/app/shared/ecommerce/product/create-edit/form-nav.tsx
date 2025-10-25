import cn from '@core/utils/class-names';

export const formParts = {
  summary: 'summary',
  media: 'media',
  pricingInventory: 'pricingInventory',
  productIdentifiers: 'productIdentifiers',
  shipping: 'shipping',
  seo: 'seo',
  deliveryEvent: 'deliveryEvent',
  variantOptions: 'variantOptions',
  tagsAndCategory: 'tagsAndCategory',
};

export const menuItems = [
  {
    label: 'Summary',
    value: formParts.summary,
  },
  {
    label: 'Images & Gallery',
    value: formParts.media,
  },
  {
    label: 'Pricing & Inventory',
    value: formParts.pricingInventory,
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: formParts.productIdentifiers,
  },
  {
    label: 'Shipping',
    value: formParts.shipping,
  },
  {
    label: 'SEO',
    value: formParts.seo,
  },
  {
    label: 'Variant Options',
    value: formParts.variantOptions,
  },
];

interface FormNavProps {
  className?: string;
}

export default function FormNav({ className }: FormNavProps) {
  return (
    <div
      className={cn(
        'sticky top-[68px] z-20 border-b border-gray-300 bg-white py-0 font-medium text-gray-500 @2xl:top-[72px] dark:bg-gray-50 2xl:top-20',
        className
      )}
    >
      <div className='custom-scrollbar overflow-x-auto scroll-smooth'>
        <div className="inline-grid grid-flow-col gap-5 md:gap-7 lg:gap-10">
          {menuItems.map((tab, idx) => (
            <button
              key={tab.value}
              onClick={() => {
                const element = document.getElementById(tab.value);
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - (idx === 0 ? 250 : 150), // Adjust offset as needed
                    behavior: 'smooth',
                  });
                }
              }}
              className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-1000"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
