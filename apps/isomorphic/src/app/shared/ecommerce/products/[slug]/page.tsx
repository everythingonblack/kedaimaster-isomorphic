import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProductDetails from '@/app/shared/ecommerce/product/product-details';

export default async function ProductDetailsPage({ params }: any) {
  const slug = (await params).slug;

  const pageHeader = {
    title: 'Edit Produk',
    breadcrumb: [
      {
        href: routes.dashboard.main,
        name: 'Dashboard',
      },
      {
        href: routes.dashboard.products,
        name: 'Products',
      },
      {
        name: slug,
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetails />
    </>
  );
}
