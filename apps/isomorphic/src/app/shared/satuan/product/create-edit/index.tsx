'use client';

import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import UomSummary from '@/app/shared/satuan/product/create-edit/product-summary';
import FormFooter from '@core/components/form-footer';
import uomApiHandlers, {
  CreateUomRequest,
  UpdateUomRequest,
  Uom,
} from '@/kedaimaster-api-handlers/uomApiHandlers';
import { z } from 'zod';
import { useLayout } from '@/layouts/use-layout';
import { useParams, useNavigate } from 'react-router-dom';

// ✅ Schema
const uomFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  remarks: z.string().optional(),
});

interface IndexProps {
  className?: string;
}

export default function CreateEditUom({ className }: IndexProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uom, setUom] = useState<Uom | null>(null);

  const methods = useForm<CreateUomRequest>({
    resolver: zodResolver(uomFormSchema),
    defaultValues: {
      name: '',
      remarks: '',
    },
  });

  // ✅ Fetch existing data (Edit mode)
  useEffect(() => {
    async function fetchUom() {
      if (!slug) {
        setFetching(false);
        return;
      }

      try {
        const data = await uomApiHandlers.getById(slug);
        setUom(data);
        methods.reset({
          name: data.name,
          remarks: data.remarks || '',
        });
      } catch (error) {
        console.error('Failed to fetch UOM:', error);
        toast.error(<Text as="b">Failed to load Satuan</Text>);
      } finally {
        setFetching(false);
      }
    }

    fetchUom();
  }, [slug, methods]);

  // ✅ Handle submit
  const onSubmit: SubmitHandler<CreateUomRequest> = async (data) => {
    setLoading(true);
    try {
      if (slug) {
        // ✏️ UPDATE
        const payload: UpdateUomRequest = { ...data };
        await uomApiHandlers.update(slug, payload);
        toast.success(<Text as="b">Satuan updated successfully</Text>);
      } else {
        // ➕ CREATE
        const result = await uomApiHandlers.create(data);
        if (result) {
          toast.success(<Text as="b">Satuan created successfully</Text>);
        }
      }

      // 🌀 Tambahkan sedikit delay supaya spinner terlihat mutar dulu
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // ✅ Redirect ke halaman daftar UOM
      navigate(routes.dashboard.uoms);
    } catch (error) {
      console.error('Error during create/update UOM:', error);
      toast.error(<Text as="b">Failed to save Satuan</Text>);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-gray-500">Loading satuan data...</div>;
  }

  return (
    <div className="@container">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
          noValidate
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <div>
              <UomSummary className="" />
            </div>
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Satuan' : 'Create Satuan'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
