import { Controller, useFormContext } from 'react-hook-form';
import { useRef } from 'react';
import FormGroup from '@/app/shared/form-group';
import cn from '@core/utils/class-names';
import { TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface ProductMediaProps {
  className?: string;
}

function SimpleUploadZone({
  value,
  onChange,
}: {
  value?: any;
  onChange: (file?: any) => void;
}) {
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
    onChange(null); // trigger perubahan di react-hook-form
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {value?.url ? (
        <div className="relative group w-40 h-40 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
          <img
            src={value.url}
            alt={value.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay delete */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium shadow"
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClickUpload}
          className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-primary hover:text-primary cursor-pointer transition-all duration-200 bg-gray-50 hover:bg-gray-100"
        >
          <PhotoIcon className="h-10 w-10 mb-1 opacity-60" />
          <span className="text-sm font-medium">Upload Image</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

export default function ProductMedia({ className }: ProductMediaProps) {
  const { control } = useFormContext();

  return (
    <FormGroup
      title="Material Image"
      description="Upload a single material image. You can delete and re-upload anytime."
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