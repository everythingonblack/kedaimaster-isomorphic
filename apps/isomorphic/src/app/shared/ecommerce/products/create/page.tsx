'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/ecommerce/product/create-edit/form-utils';
import { lazy, Suspense } from 'react';
import SelectLoader from '@core/components/loader/select-loader';
import QuillLoader from '@core/components/loader/quill-loader';

// Lazy load QuillEditor untuk performa
const QuillEditor = lazy(() => import('@core/ui/quill-editor'));

export default function CreateProductPage({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Summary"
      description="Edit your product description and necessary information from here"
      className={cn(className)}
    >
      {/* Title */}
      <Input
        label="Title"
        placeholder="Product title"
        {...register('title')}
        error={errors.title?.message as string}
      />

      {/* SKU */}
      <Input
        label="SKU"
        placeholder="Product SKU"
        {...register('sku')}
        error={errors.sku?.message as string}
      />

      {/* Product Type */}
      <Controller
        name="type"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={typeOption}
            value={value}
            onChange={onChange}
            label="Product Type"
            error={errors?.type?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      />

      {/* Categories */}
      <Controller
        name="categories"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={categoryOption}
            value={value}
            onChange={onChange}
            label="Categories"
            error={errors?.categories?.message as string}
            getOptionValue={(option) => option.value}
            dropdownClassName="h-auto"
          />
        )}
      />

      {/* Description (lazy-loaded QuillEditor) */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <Suspense fallback={<QuillLoader className="col-span-full h-[143px]" />}>
            <QuillEditor
              value={value}
              onChange={onChange}
              label="Description"
              className="col-span-full [&_.ql-editor]:min-h-[100px]"
              labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
            />
          </Suspense>
        )}
      />
    </FormGroup>
  );
}
