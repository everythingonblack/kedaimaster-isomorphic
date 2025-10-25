import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProductDetailsComponent from '@/app/shared/ecommerce/product/product-details';
import { MetaObject } from '@/config/site.config';

interface ProductDetailsPageProps {
  slug: string;
}

export default function ProductDetailsPage({ slug }: ProductDetailsPageProps) {
  const pageHeader = {
    title: 'Shop',
    breadcrumb: [
      {
        href: routes.eCommerce.dashboard,
        name: 'E-Commerce',
      },
      {
        href: routes.eCommerce.shop,
        name: 'Shop',
      },
      {
        name: slug || 'Product',
      },
    ],
  };

  return (
    <>
      {/* 🧠 Meta tags */}
      <MetaObject title={`Product Details - ${slug}`} description="View product details page" />

      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetailsComponent product={{} as any} />
    </>
  );
}
