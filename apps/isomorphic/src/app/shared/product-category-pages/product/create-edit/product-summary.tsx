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
}

export default function ProductSummary({ className }: ProductSummaryProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Category Details"
      description="Edit your product category details and necessary information from here"
      className={cn(className)}
    >
      {/* Category Name */}
      <Input
        label="Name"
        placeholder="Category name"
        {...register('name')}
        error={errors.name?.message as string}
      />
    </FormGroup>
  );
}
