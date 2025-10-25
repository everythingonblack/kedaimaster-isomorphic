'use client';

import { useEffect, useState } from 'react';

import { routes } from '@/config/routes';

import PageHeader from '@/app/shared/page-header';

import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import ProductSummary from '@/app/shared/ecommerce/product/create-edit/product-summary';
import ProductMedia from '@/app/shared/ecommerce/product/create-edit/product-media';
import FormFooter from '@core/components/form-footer';
import { createProduct, updateProduct, fetchProductById } from '@/kedaimaster-api-handlers/productApiHandlers';
import {
  CreateProductInput,
  productFormSchema,
} from '@/kedaimaster-api-handlers/productApiHandlers';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useParams } from 'react-router-dom';
import productCategoriesApiHandlers from '@/kedaimaster-api-handlers/productCategoriesApiHandlers';

interface IndexProps {
  className?: string;
}

export default function CreateEditProduct({ className }: IndexProps) {
  const { slug } = useParams<{ slug: string }>();
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState<CreateProductInput | undefined>(undefined);
  const [fetching, setFetching] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const pageHeader = {
    title: 'Edit Produk',
    breadcrumb: [
      { href: routes.dashboard.main, name: 'Dashboard' },
      { href: routes.dashboard.products, name: 'Produk' },
      { name: `${product?.name}` },
    ],
  };

  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: product ?? {
      name: '',
      categoryId: '',
      price: 0,
      stock: 0,
      image: undefined,
    },
  });

  // Fetch categories for dropdown
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await productCategoriesApiHandlers.getDropdown();
        const options = categories.map((category: any) => ({
          value: category.id,
          label: category.name,
        }));
        setCategoryOptions(options);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    fetchCategories();
  }, []);

  // Fetch existing product if slug exists
  useEffect(() => {
    async function fetchProduct() {
      if (!slug) {
        setFetching(false);
        return;
      }
      try {
        const data = await fetchProductById(slug);
        setProduct(data);
        methods.reset(data); // langsung reset dengan data dari API
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error(<Text as="b">Failed to load product</Text>);
      } finally {
        setFetching(false);
      }
    }
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    setLoading(true);
    try {
      let result;
      if (slug) {
        result = await updateProduct(slug, data, product);
      } else {
        result = await createProduct(data);
      }

      if (result) {
        // Update state product agar breadcrumb ikut berubah
        setProduct(result);

        toast.success(
          <Text as="b">Product successfully {slug ? 'updated' : 'created'}</Text>
        );
      } else {
        toast.error(<Text as="b">Failed to {slug ? 'update' : 'create'} product</Text>);
      }
    } catch (error) {
      console.error('Error during product creation/update:', error);
      toast.error(<Text as="b">An error occurred</Text>);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-gray-500">Loading product data...</div>;
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
            submitBtnText={slug ? 'Update Product' : 'Create Product'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
