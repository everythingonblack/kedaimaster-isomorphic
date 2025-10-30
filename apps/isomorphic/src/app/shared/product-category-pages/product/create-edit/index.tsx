'use client';

import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import FormFooter from '@core/components/form-footer';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useParams } from 'react-router-dom';
import productCategoriesApiHandlers, {
  ProductCategory,
} from '@/kedaimaster-api-handlers/productCategoriesApiHandlers';
import ProductCategorySummary from './product-summary';
import ProductMedia from './product-media';
import { z } from 'zod';

// ✅ Schema validasi form
const productCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  imageUrl: z.any().optional(),
});

export type ProductCategoryInput = z.infer<typeof productCategorySchema>;

interface IndexProps {
  className?: string;
}

export default function CreateEditProductCategory({ className }: IndexProps) {
  const { slug } = useParams<{ slug: string }>();
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [category, setCategory] = useState<ProductCategory | undefined>(undefined);
  const [fetching, setFetching] = useState(true);

  const pageHeader = {
    title: slug ? 'Edit Product Category' : 'Create Product Category',
    breadcrumb: [
      { href: routes.dashboard.main, name: 'Dashboard' },
      { href: routes.dashboard.products, name: 'Product Categories' },
      { name: slug ? `${category?.name}` : 'New Category' },
    ],
  };

  const methods = useForm<ProductCategoryInput>({
    resolver: zodResolver(productCategorySchema),
    defaultValues: {
      name: '',
      imageUrl: undefined,
    },
  });

  // Fetch existing category if slug exists
  useEffect(() => {
    async function fetchCategory() {
      if (!slug) {
        setFetching(false);
        return;
      }
      try {
        const data = await productCategoriesApiHandlers.getById(slug);
        setCategory(data);
        methods.reset(data);
      } catch (error) {
        console.error('Failed to fetch category:', error);
        toast.error(<Text as="b">Failed to load category</Text>);
      } finally {
        setFetching(false);
      }
    }
    fetchCategory();
  }, [slug]);

  const onSubmit: SubmitHandler<ProductCategoryInput> = async (data) => {
    setLoading(true);
    try {
      let result;
      if (slug) {
        result = await productCategoriesApiHandlers.update(slug, data);
      } else {
        result = await productCategoriesApiHandlers.create(data);
      }

      if (result) {
        setCategory(result);
        toast.success(
          <Text as="b">
            Category successfully {slug ? 'updated' : 'created'}
          </Text>
        );
      } else {
        toast.error(
          <Text as="b">
            Failed to {slug ? 'update' : 'create'} category
          </Text>
        );
      }
    } catch (error) {
      console.error('Error during category creation/update:', error);
      toast.error(<Text as="b">An error occurred</Text>);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-gray-500">Loading category data...</div>;
  }

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn('relative z-[19] [&_label.block>span]:font-medium', className)}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <div>
              <ProductCategorySummary />
            </div>
            <div>
              <ProductMedia className="pt-7 @2xl:pt-9 @3xl:pt-11" />
            </div>
          </div>
          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Category' : 'Create Category'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
