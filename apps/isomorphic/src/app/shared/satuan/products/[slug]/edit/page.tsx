import { Link, useParams } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditUom from '@/app/shared/satuan/product/create-edit';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Edit Satuan',
  breadcrumb: [
    { href: routes.dashboard.main, name: 'Dashboard' },
    { href: routes.dashboard.products, name: 'Satuan' }, // Assuming products route will be changed to uoms
    { name: 'Edit' },
  ],
};

export default function EditUomPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          to={routes.dashboard.createUom}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Satuan
          </Button>
        </Link>
      </PageHeader>

      <CreateEditUom />
    </>
  );
}