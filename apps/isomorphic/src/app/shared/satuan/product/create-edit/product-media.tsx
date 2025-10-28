import FormGroup from '@/app/shared/form-group';
import cn from '@core/utils/class-names';

interface UomMediaProps {
  className?: string;
}

export default function UomMedia({ className }: UomMediaProps) {
  return (
    <FormGroup
      title="UOM Media"
      description="UOMs do not have media. This section is for future expansion."
      className={cn(className)}
    >
      <div className="text-gray-500">No media options for UOMs.</div>
    </FormGroup>
  );
}