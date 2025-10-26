'use client';

import { useEffect, useState } from 'react';

import { routes } from '@/config/routes';

import PageHeader from '@/app/shared/page-header';

import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import ProductSummary from '@/app/shared/new-materials-page/product/create-edit/product-summary';
import ProductMedia from '@/app/shared/new-materials-page/product/create-edit/product-media';
import FormFooter from '@core/components/form-footer';
import { createMaterial, updateMaterial, fetchMaterialById, CreateMaterialInput, materialFormSchema } from '@/kedaimaster-api-handlers/materialApiHandlers';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useParams } from 'react-router-dom';
// import materialCategoriesApiHandlers from '@/kedaimaster-api-handlers/materialCategoriesApiHandlers'; // Assuming a similar handler for material categories

interface IndexProps {
  className?: string;
}

export default function CreateEditMaterial({ className }: IndexProps) {
  const { slug } = useParams<{ slug: string }>();
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [material, setMaterial] = useState<CreateMaterialInput | undefined>(undefined);
  const [fetching, setFetching] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const pageHeader = {
    title: 'Edit Material',
    breadcrumb: [
      { href: routes.dashboard.main, name: 'Dashboard' },
      { href: routes.dashboard.material, name: 'Materials' }, // Assuming a new route for materials
      { name: `${material?.name}` },
    ],
  };

  const methods = useForm<CreateMaterialInput>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: material ?? {
      name: '',
      categoryId: '', // Assuming categoryId for materials
      price: 0, // Assuming price for materials
      stock: 0,
      image: undefined, // Assuming image for materials
    },
  });

  // Fetch categories for dropdown
  useEffect(() => {
    async function fetchCategories() {
      try {
        // Placeholder for material categories - assuming UOM as categories for now
        const options = [
          { value: '1', label: 'Kg' },
          { value: '2', label: 'Liter' },
          { value: '3', label: 'Piece' },
        ];
        setCategoryOptions(options);
      } catch (error) {
        console.error('Failed to fetch material categories:', error);
      }
    }
    fetchCategories();
  }, []);

  // Fetch existing material if slug exists
  useEffect(() => {
    async function fetchMaterial() {
      if (!slug) {
        setFetching(false);
        return;
      }
      try {
        const data = await fetchMaterialById(slug);
        setMaterial(data);
        methods.reset(data); // langsung reset dengan data dari API
      } catch (error) {
        console.error('Failed to fetch material:', error);
        toast.error(<Text as="b">Failed to load material</Text>);
      } finally {
        setFetching(false);
      }
    }
    fetchMaterial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const onSubmit: SubmitHandler<CreateMaterialInput> = async (data) => {
    setLoading(true);
    try {
      let result;
      if (slug) {
        result = await updateMaterial(slug, data, material);
      } else {
        result = await createMaterial(data);
      }

      if (result) {
        // Update state material agar breadcrumb ikut berubah
        setMaterial(result as CreateMaterialInput);

        toast.success(
          <Text as="b">Material successfully {slug ? 'updated' : 'created'}</Text>
        );
      } else {
        toast.error(<Text as="b">Failed to {slug ? 'update' : 'create'} material</Text>);
      }
    } catch (error) {
      console.error('Error during material creation/update:', error);
      toast.error(<Text as="b">An error occurred</Text>);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-gray-500">Loading material data...</div>;
  }

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <div>
              <ProductSummary
                className=""
                categoryOptions={categoryOptions}
              />
            </div>
            <div>
              <ProductMedia className="pt-7 @2xl:pt-9 @3xl:pt-11" />
            </div>
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Material' : 'Create Material'}
          />
        </form>
      </FormProvider>
    </div>
  );
}