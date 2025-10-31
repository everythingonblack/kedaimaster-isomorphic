import { Link, useParams } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/product-category-pages/product/create-edit';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Edit Product',
  breadcrumb: [
    { href: routes.dashboard.main, name: 'E-Commerce' },
    { href: routes.dashboard.products, name: 'Products' },
    { name: 'Edit' },
  ],
};

export default function EditProductPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          to={routes.dashboard.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Product
          </Button>
        </Link>
      </PageHeader>

      <CreateEditProduct />
    </>
  );
}