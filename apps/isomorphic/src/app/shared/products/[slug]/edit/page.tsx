import { Link, useParams } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import { productData } from '@/app/shared/ecommerce/product/create-edit/form-utils';
import CreateEditProduct from '@/app/shared/ecommerce/product/create-edit';
import PageHeader from '@/app/shared/page-header';
import { MetaObject } from '@/config/site.config';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';

export default function EditProductPage() {
  const { slug } = useParams<{ slug: string }>();

  const pageHeader = {
    title: 'Edit Product',
    breadcrumb: [
      {
        href: routes.eCommerce.dashboard,
        name: 'E-Commerce',
      },
      {
        href: routes.eCommerce.products,
        name: 'Products',
      },
      {
        name: 'Edit',
      },
    ],
  };

  return (
    <>
      {/* 🧠 Meta tags */}
      <MetaObject title={`Edit ${slug}`} description="Edit product page" />

      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          to={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Product
          </Button>
        </Link>
      </PageHeader>

      <CreateEditProduct slug={slug!} product={productData} />
    </>
  );
}
