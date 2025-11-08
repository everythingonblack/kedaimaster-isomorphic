'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';

interface ProductSummaryProps {
  className?: string;
  categoryOptions: { value: string; label: string }[];
  showUnitPrice?: boolean; // 👈 tambah prop baru
}

export default function ProductSummary({
  className,
  categoryOptions,
  showUnitPrice,
}: ProductSummaryProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup title="" description="" className={cn(className)}>
      {/* Material Name */}
      <Input
        label="Name"
        placeholder="Material name"
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
              Satuan
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

      {/* Stock */}
      <Input
        label="Stock"
        type="number"
        placeholder="Stok sekarang"
        {...register('stock')}
        error={errors.stock?.message as string}
      />
          {/* Tampilkan unitPrice hanya kalau stok naik */}
      {showUnitPrice && (
        <Input
          label="Unit Price"
          type="number"
          placeholder="Harga per satuan (kosongkan jika hanya mengurangi stok)"
          {...register('price')}
          error={errors.unitPrice?.message as string}
        />
      )}

    </FormGroup>
  );
}
