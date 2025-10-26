import { Link, useParams } from 'react-router-dom';
import { PiPlusBold } from 'react-icons/pi';
import CreateEditMaterial from '@/app/shared/new-materials-page/product/create-edit';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui/button';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Edit Material',
  breadcrumb: [
    { href: routes.dashboard.main, name: 'E-Commerce' },
    { href: routes.dashboard.material, name: 'Materials' },
    { name: 'Edit' },
  ],
};

export default function EditMaterialPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          to={routes.dashboard.createMaterial}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Material
          </Button>
        </Link>
      </PageHeader>

      <CreateEditMaterial />
    </>
  );
}