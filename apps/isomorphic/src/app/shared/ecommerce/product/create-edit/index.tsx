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
import { createProduct, updateProduct, fetchProductById, deleteProduct } from '@/kedaimaster-api-handlers/productApiHandlers';
import {
  CreateProductInput,
  productFormSchema,
} from '@/kedaimaster-api-handlers/productApiHandlers';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ tambahkan useNavigate
import productCategoriesApiHandlers from '@/kedaimaster-api-handlers/productCategoriesApiHandlers';
import { fetchMaterials } from '@/kedaimaster-api-handlers/materialApiHandlers'; // Import fetchMaterials

interface IndexProps {
  className?: string;
}

export default function CreateEditProduct({ className }: IndexProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate(); // ✅ inisialisasi navigate
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [product, setProduct] = useState<CreateProductInput | undefined>(undefined);
  const [fetching, setFetching] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [materialOptions, setMaterialOptions] = useState< // Added materialOptions state
    { value: string; label: string }[]
  >([]);

  const pageHeader = {
    title: slug ? 'Edit Produk' : 'Tambah Produk',
    breadcrumb: [
      { href: routes.dashboard.main, name: 'Dashboard' },
      { href: routes.dashboard.products, name: 'Produk' },
      { name: slug ? `${product?.name ?? 'Edit Produk'}` : 'Tambah Produk' },
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

  // ✅ Fetch kategori
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

    async function fetchMaterialOptions() { // Fetch material options
      try {
        const materials = await fetchMaterials();
        const options = materials.map((material: any) => ({
          value: material.id,
          label: material.name,
        }));
        setMaterialOptions(options);
      } catch (error) {
        console.error('Failed to fetch materials:', error);
      }
    }
    fetchMaterialOptions();
  }, []);

  // ✅ Fetch produk jika mode edit
  useEffect(() => {
    async function fetchProduct() {
      if (!slug) {
        setFetching(false);
        return;
      }
      try {
        const data = await fetchProductById(slug);
        setProduct(data);
        methods.reset(data);
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

  // ✅ Submit handler
  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
  setLoading(true);
  try {
    let result;

    if (slug) {
      // ✏️ UPDATE
      result = await updateProduct(slug, data, product);
      if (result) {
        toast.success(<Text as="b">Product successfully updated</Text>);
      } else {
        toast.error(<Text as="b">Failed to update product</Text>);
        setLoading(false);
        return;
      }
    } else {
      // ➕ CREATE
      result = await createProduct(data);
      if (result) {
        toast.success(<Text as="b">Product successfully created</Text>);
      } else {
        toast.error(<Text as="b">Failed to create product</Text>);
        setLoading(false);
        return;
      }
    }

   // 🌀 Delay supaya spinner kelihatan mutar dulu (1 detik)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ✅ Redirect setelah spinner sempat muncul
    navigate(routes.dashboard.products);
  } catch (error) {
    console.error('Error during product creation/update:', error);
    toast.error(<Text as="b">An error occurred</Text>);
  } finally {
    setLoading(false);
  }
};

// ✅ Delete handler (juga dengan efek spinner delay)
const handleDeleteProduct = async () => {
  if (!slug) return;
  setLoading(true);
  try {
    await deleteProduct(slug);
    toast.success(<Text as="b">Product successfully deleted</Text>);

    // 🌀 Biar spinner kelihatan dulu sebelum redirect
    navigate(routes.dashboard.products);
  } catch (error) {
    console.error('Error during product deletion:', error);
    toast.error(<Text as="b">Failed to delete product</Text>);
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
                materialOptions={materialOptions} // Pass materialOptions
              />
            </div>
            <div>
              <ProductMedia className="pt-7 @2xl:pt-9 @3xl:pt-11" />
            </div>
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Product' : 'Create Product'}
            deleteBtn={!!slug}
          
          />
        </form>
      </FormProvider>
    </div>
  );
}
