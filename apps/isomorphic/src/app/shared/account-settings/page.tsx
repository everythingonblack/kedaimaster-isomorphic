import { Link, useParams } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import Page from './index';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Profil saya',
  breadcrumb: [
    { href: routes.dashboard.main, name: 'Dashboard' },
    { href: routes.profile, name: 'Profil' },
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
        </Link>
      </PageHeader>

      <Page />
    </>
  );
}
