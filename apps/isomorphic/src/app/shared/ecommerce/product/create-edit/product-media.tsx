import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/form-group';
import cn from '@core/utils/class-names';
import { useRef } from 'react';

interface ProductMediaProps {
  className?: string;
}

// Simple upload zone component
function SimpleUploadZone({ value, onChange }: { value?: any; onChange: (file?: any) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        onChange({
          name: file.name,
          url: ev.target?.result as string,
          size: file.size,
          raw: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    onChange(undefined);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      {value?.url ? (
        <div className="flex items-center gap-4">
          <img src={value.url} alt={value.name} className="h-24 w-24 object-cover rounded border" />
          <button
            type="button"
            onClick={handleDelete}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ) : (
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block"
        />
      )}
    </div>
  );
}

export default function ProductMedia({ className }: ProductMediaProps) {
  const { control } = useFormContext();

  return (
    <FormGroup
      title="Upload product image"
      description="Upload a single product image"
      className={cn(className)}
    >
      <Controller
        name="image"
        control={control}
        render={({ field: { value, onChange } }) => (
          <SimpleUploadZone value={value} onChange={onChange} />
        )}
      />
    </FormGroup>
  );
}
