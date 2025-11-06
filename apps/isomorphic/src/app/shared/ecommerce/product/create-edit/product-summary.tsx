'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { lazy, Suspense } from 'react';
import QuillLoader from '@core/components/loader/quill-loader';

// Lazy load QuillEditor untuk performa
const QuillEditor = lazy(() => import('@core/ui/quill-editor'));

interface ProductSummaryProps {
  className?: string;
  categoryOptions: { value: string; label: string }[];
  materialOptions: { value: string; label: string }[]; // Added materialOptions
}

export default function ProductSummary({ className, categoryOptions, materialOptions }: ProductSummaryProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title=""
      description=""
      className={cn(className)}
    >
      {/* Product Name */}
      <Input
        label="Name"
        placeholder="Product name"
        {...register('name')}
        error={errors.name?.message as string}
      />

      {/* Categories (Custom Select) */}
      <Controller
        name="categoryId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 dark:text-gray-300 mb-1">
              Categories
            </label>
            <select
              className={cn(
                'border rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800',
                'focus:outline-none focus:ring-2 focus:ring-primary',
                errors.categoryId ? 'border-red-500' : 'border-gray-300'
              )}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
            >
              <option value="">Select category...</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.categoryId.message as string}
              </p>
            )}
          </div>
        )}
      />

      {/* Price */}
      <Input
        label="Price"
        type="number"
        placeholder="Product price"
        {...register('price')}
        error={errors.price?.message as string}
      />

      {/* Material (Custom Select) */}
      <Controller
        name="material"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 dark:text-gray-300 mb-1">
              Material
            </label>
            <select
              className={cn(
                'border rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-800',
                'focus:outline-none focus:ring-2 focus:ring-primary',
                errors.material ? 'border-red-500' : 'border-gray-300'
              )}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
            >
              <option value="">Select material...</option>
              {materialOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.material && (
              <p className="text-red-500 text-xs mt-1">
                {errors.material.message as string}
              </p>
            )}
          </div>
        )}
      />
    </FormGroup>
  );
}
