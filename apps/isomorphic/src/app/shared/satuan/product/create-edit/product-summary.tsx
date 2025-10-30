'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';

interface UomSummaryProps {
  className?: string;
}

export default function UomSummary({ className }: UomSummaryProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="UOM Details"
      description="Edit your UOM name and remarks here"
      className={cn(className)}
    >
      <Input
        label="Name"
        placeholder="UOM name"
        {...register('name')}
        error={errors.name?.message as string}
      />

      <Input
        label="Remarks"
        placeholder="Optional remarks"
        {...register('remarks')}
        error={errors.remarks?.message as string}
      />
    </FormGroup>
  );
}