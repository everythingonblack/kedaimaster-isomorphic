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
import uomApiHandlers, { CreateUomRequest, Uom } from '@/kedaimaster-api-handlers/uomApiHandlers';
import { z } from 'zod';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useParams, useNavigate } from 'react-router-dom';

// Define UOM Form Schema
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
  const [uom, setUom] = useState<Uom | undefined>(undefined);
  const [fetching, setFetching] = useState(true);

  const methods = useForm<CreateUomRequest>({
    resolver: zodResolver(uomFormSchema),
    defaultValues: {
      name: '',
      remarks: '',
    },
  });

  // Fetch existing UOM if slug exists
  useEffect(() => {
    async function fetchUom() {
      if (!slug) {
        setFetching(false);
        return;
      }
      try {
        const data = await uomApiHandlers.getById(slug);
        setUom(data);
        methods.reset(data);
      } catch (error) {
        console.error('Failed to fetch UOM:', error);
        toast.error(<Text as="b">Failed to load UOM</Text>);
      } finally {
        setFetching(false);
      }
    }
    fetchUom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const onSubmit: SubmitHandler<CreateUomRequest> = async (data) => {
    setLoading(true);
    try {
      let result;
      if (slug) {
        result = await uomApiHandlers.update(slug, data);
      } else {
        result = await uomApiHandlers.create(data);
      }

      if (result) {
        setUom(result);
        toast.success(
          <Text as="b">Satuan successfully {slug ? 'updated' : 'created'}</Text>
        );
        
        // Redirect to detail page after create to show proper breadcrumb
        if (!slug && result.id) {
          setTimeout(() => {
            navigate(routes.dashboard.editUom(result.id));
          }, 1000);
        }
      } else {
        toast.error(<Text as="b">Failed to {slug ? 'update' : 'create'} satuan</Text>);
      }
    } catch (error) {
      console.error('Error during UOM creation/update:', error);
      toast.error(<Text as="b">An error occurred</Text>);
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
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <div>
              <UomSummary
                className=""
              />
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