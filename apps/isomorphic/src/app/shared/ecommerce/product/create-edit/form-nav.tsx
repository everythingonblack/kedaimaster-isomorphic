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
  { label: 'Summary', value: formParts.summary },
  { label: 'Images & Gallery', value: formParts.media },
  { label: 'Pricing & Inventory', value: formParts.pricingInventory },
];

interface FormNavProps {
  className?: string;
}

export default function FormNav({ className }: FormNavProps) {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div
      className={cn(
        'sticky top-[68px] z-20 border-b border-gray-300 bg-white font-medium text-gray-500 dark:bg-gray-50',
        className
      )}
    >
      <div className="custom-scrollbar overflow-x-auto scroll-smooth">
        <nav className="inline-grid grid-flow-col gap-5 md:gap-7 lg:gap-10">
          {menuItems.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => handleScroll(tab.value)}
              className="relative cursor-pointer whitespace-nowrap py-4 hover:text-gray-900 transition-colors"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
