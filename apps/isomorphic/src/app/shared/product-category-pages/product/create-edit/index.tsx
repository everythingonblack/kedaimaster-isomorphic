'use client';

import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import ProductSummary from '@/app/shared/product-category-pages/product/create-edit/product-summary';
import ProductMedia from '@/app/shared/ecommerce/product/create-edit/product-media';
import FormFooter from '@core/components/form-footer';
import productCategoriesApiHandlers, {
  ProductCategory,
  CreateProductCategoryInput,
  productCategoryFormSchema,
  mapApiCategoryToFormInput, // Import the mapper function
} from '@/kedaimaster-api-handlers/productCategoriesApiHandlers';
import { useLayout } from '@/layouts/use-layout';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ tambahkan navigate

interface IndexProps {
  className?: string;
}

export default function CreateEditProductCategory({ className }: IndexProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate(); // ✅ inisialisasi navigate
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [productCategory, setProductCategory] = useState<ProductCategory | undefined>(undefined);
  const [fetching, setFetching] = useState(true);

  const pageHeader = {
    title: slug ? 'Edit Product Category' : 'Create Product Category',
    breadcrumb: [
      { href: routes.dashboard.main, name: 'Dashboard' },
      { href: routes.dashboard.productCategories, name: 'Product Categories' },
      { name: slug ? productCategory?.name ?? 'Edit' : 'Create' },
    ],
  };

  const methods = useForm<CreateProductCategoryInput>({
    resolver: zodResolver(productCategoryFormSchema),
    defaultValues: {
      name: '',
    },
  });

  // ✅ Fetch existing product category if slug exists
  useEffect(() => {
    async function fetchProductCategory() {
      if (!slug) {
        setFetching(false);
        return;
      }
      try {
        const apiProductCategory = await productCategoriesApiHandlers.getById(slug);
        setProductCategory(apiProductCategory);
        if (apiProductCategory) {
          methods.reset(mapApiCategoryToFormInput(apiProductCategory));
        }
      } catch (error) {
        console.error('Failed to fetch product category:', error);
        toast.error(<Text as="b">Failed to load product category</Text>);
      } finally {
        setFetching(false);
      }
    }

    fetchProductCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // ✅ Submit handler dengan efek spinner delay
  const onSubmit: SubmitHandler<CreateProductCategoryInput> = async (data) => {
    setLoading(true);
    try {
      let result;

      if (slug) {
        // ✏️ UPDATE
        result = await productCategoriesApiHandlers.update(slug, data);
        if (result) {
          toast.success(<Text as="b">Product category successfully updated</Text>);
        } else {
          toast.error(<Text as="b">Failed to update product category</Text>);
          setLoading(false);
          return;
        }
      } else {
        // ➕ CREATE
        result = await productCategoriesApiHandlers.create(data);
        if (result) {
          toast.success(<Text as="b">Product category successfully created</Text>);
        } else {
          toast.error(<Text as="b">Failed to create product category</Text>);
          setLoading(false);
          return;
        }
      }

      // 🌀 Delay supaya spinner kelihatan mutar dulu
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // ✅ Redirect setelah spinner sempat muncul
      navigate(routes.dashboard.productCategories);
    } catch (error) {
      console.error('Error during product category creation/update:', error);
      toast.error(<Text as="b">An error occurred</Text>);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-gray-500">Loading product category data...</div>;
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
              <ProductSummary className="" />
            </div>
            <div>
              <ProductMedia className="pt-7 @2xl:pt-9 @3xl:pt-11" />
            </div>
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Product Category' : 'Create Product Category'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
