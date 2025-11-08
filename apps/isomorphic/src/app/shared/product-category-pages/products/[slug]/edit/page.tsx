import { Link, useParams } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditProduct from '@/app/shared/product-category-pages/product/create-edit';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Edit Product',
  breadcrumb: [
    { href: routes.dashboard.main, name: 'Dashboard' },
    { href: routes.dashboard.products, name: 'Products' },
    { name: 'Edit' },
  ],
};

export default function EditProductPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <CreateEditProduct />
    </>
  );
}