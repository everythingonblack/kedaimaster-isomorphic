'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import cn from '@core/utils/class-names';

export default function UomPricing({ className }: { className?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="UOM Pricing"
      description="UOMs do not have pricing. This section is for future expansion."
      className={cn(className)}
    >
      <div className="text-gray-500">No pricing options for UOMs.</div>
    </FormGroup>
  );
}