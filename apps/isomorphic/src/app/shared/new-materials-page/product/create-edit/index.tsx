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
import FormFooter from '@core/components/form-footer';
import {
  createMaterial,
  updateMaterial,
  fetchMaterialById,
  CreateMaterialInput,
  materialFormSchema,
} from '@/kedaimaster-api-handlers/materialApiHandlers';
import { useLayout } from '@/layouts/use-layout';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUoms } from '@/kedaimaster-api/uomApi';

interface IndexProps {
  className?: string;
}

export default function CreateEditMaterial({ className }: IndexProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { layout } = useLayout();

  const [isLoading, setLoading] = useState(false);
  const [material, setMaterial] = useState<CreateMaterialInput | undefined>();
  const [fetching, setFetching] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const pageHeader = {
    title: slug ? 'Edit Material' : 'Create Material',
    breadcrumb: [
      { href: routes.dashboard.main, name: 'Dashboard' },
      { href: routes.dashboard.material, name: 'Materials' },
      { name: slug ? 'Edit' : 'Create' },
    ],
  };

  const methods = useForm<CreateMaterialInput>({
    resolver: zodResolver(materialFormSchema),
    defaultValues: {
      name: '',
      categoryId: '',
      price: 0,
      stock: 0,
      image: undefined,
    },
  });

  // ✅ Fetch UOM (Category)
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getAllUoms();
        setCategoryOptions(
          categories.map((c: any) => ({
            value: c.id,
            label: c.name,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    fetchCategories();
  }, []);

  // ✅ Fetch material for edit
  useEffect(() => {
    async function fetchMaterial() {
      if (!slug) {
        setFetching(false);
        return;
      }
      try {
        const data = await fetchMaterialById(slug);
        if (data) {
          setMaterial(data);
          methods.reset(data);
        }
      } catch (error) {
        toast.error(<Text as="b">Failed to load material</Text>);
      } finally {
        setFetching(false);
      }
    }
    fetchMaterial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // ✅ Submit form
  const onSubmit: SubmitHandler<CreateMaterialInput> = async (data) => {
    setLoading(true);
    try {
      if (slug) {
        // ✏️ UPDATE
        const result = await updateMaterial(slug, data, material);
        if (result) {
          toast.success(<Text as="b">Material successfully updated</Text>);
        } else {
          toast.error(<Text as="b">Failed to update material</Text>);
          setLoading(false);
          return;
        }
      } else {
        // ➕ CREATE
        const result = await createMaterial(data);
        if (result) {
          toast.success(<Text as="b">Material successfully created</Text>);
        } else {
          toast.error(<Text as="b">Failed to create material</Text>);
          setLoading(false);
          return;
        }
      }

      // 🌀 Delay supaya spinner kelihatan mutar dulu
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ✅ Redirect setelah spinner sempat muncul
      navigate(routes.dashboard.material);
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
            <ProductSummary className="" categoryOptions={categoryOptions} />
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
