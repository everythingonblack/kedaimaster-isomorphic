'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import cn from '@core/utils/class-names';

export default function ProductCategorySummary({ className }: { className?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Category Details"
      description="Enter the category name and upload its image below."
      className={cn(className)}
    >
      <Input
        label="Category Name"
        placeholder="e.g. Electronics"
        {...register('name')}
        error={errors.name?.message as string}
      />
    </FormGroup>
  );
}
