'use client';

import { useState } from 'react';
import { lazy } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  CategoryFormInput,
  categoryFormSchema,
} from '@/validators/create-category.schema';
import UploadZone from '@core/ui/file-upload/upload-zone';
import { createProductCategory, updateProductCategory } from '@/kedaimaster-api/productCategoriesApi';

// a reusable form wrapper component
function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

// main category form component for create and update category
export default function CreateCategory({ id, category, isModalView = true }: { id?: string; isModalView?: boolean; category?: CategoryFormInput; }) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CategoryFormInput> = async (data) => {
    setLoading(true);
    try {
      // Ambil file image pertama saja
      const imageFile = data.images && data.images.length > 0 ? data.images[0] : null;

      const payload = {
        name: data.name,
        image: imageFile,
      };

      if (id) {
        await updateProductCategory(id, payload);
        alert('Category updated successfully!');
      } else {
        await createProductCategory(payload);
        alert('Category created successfully!');
        setReset({ name: '', slug: '', images: [] });
      }
    } catch (error) {
      console.error(error);
      alert('Failed to save category!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form<CategoryFormInput>
      validationSchema={categoryFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: category,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => (
        <>
          <HorizontalFormBlockWrapper
            title="Add new category:"
            description="Edit your category information from here"
            isModalView={isModalView}
          >
            <Input
              label="Category Name"
              placeholder="category name"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Slug"
              placeholder="slug"
              {...register('slug')}
              error={errors.slug?.message}
            />

            {/* ... (other fields here) ... */}

            <UploadZone
              name="images"
              getValues={getValues}
              setValue={setValue}
              className="col-span-full"
            />
          </HorizontalFormBlockWrapper>

          <div
            className={cn(
              'sticky bottom-0 z-40 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
              isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
            )}
          >
            <Button variant="outline" className="w-full @xl:w-auto">
              Save as Draft
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full @xl:w-auto"
            >
              {id ? 'Update' : 'Create'} Category
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
