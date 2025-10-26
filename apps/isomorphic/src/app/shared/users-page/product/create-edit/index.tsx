'use client';

import { useEffect, useState } from 'react';
import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text, Select, Input } from 'rizzui';
import cn from '@core/utils/class-names';
import FormFooter from '@core/components/form-footer';
import usersApiHandlers, { User } from '@/kedaimaster-api-handlers/usersApiHandlers';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

interface IndexProps {
  className?: string;
}

const ROLES = [
  { value: 'CASHIER', label: 'Cashier' },
  { value: 'BUSSINESS_OWNER', label: 'Business Owner' },
];

const userFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password minimal 6 karakter').optional(),
  role: z.enum(['CASHIER', 'BUSSINESS_OWNER']),
});

type UserFormInput = z.infer<typeof userFormSchema>;

export default function CreateEditUser({ className }: IndexProps) {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [fetching, setFetching] = useState(true);

  const pageHeader = {
    title: slug ? 'Edit User' : 'Create User',
    breadcrumb: [
      { href: routes.dashboard.main, name: 'Dashboard' },
      { href: routes.dashboard.users, name: 'Users' },
      { name: slug ? user?.email : 'Create' },
    ],
  };

  const methods = useForm<UserFormInput>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user
      ? { email: user.email, role: user.role }
      : { email: '', password: '', role: 'CASHIER' },
  });

  // Fetch existing user if slug exists
  useEffect(() => {
    async function fetchUser() {
      if (!slug) {
        setFetching(false);
        return;
      }
      try {
        const data = await usersApiHandlers.getById(slug);
        setUser(data);
        methods.reset({ email: data.email, role: data.role });
      } catch (error) {
        toast.error(<Text as="b">Failed to load user</Text>);
      } finally {
        setFetching(false);
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
    setLoading(true);
    try {
      let result;
      if (slug) {
        // Update user (email & role)
        result = await usersApiHandlers.update(slug, {
          email: data.email,
          role: data.role,
        });
      } else {
        // Create user (email, password, role)
        result = await usersApiHandlers.create({
          email: data.email,
          password: data.password || '',
          role: data.role,
        });
      }
      setUser(result);
      toast.success(
        <Text as="b">User successfully {slug ? 'updated' : 'created'}</Text>
      );
    } catch (error) {
      toast.error(<Text as="b">Failed to {slug ? 'update' : 'create'} user</Text>);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="p-6 text-gray-500">Loading user data...</div>;
  }

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            <div className="space-y-6">
              <div>
                <label className="block mb-1">
                  <span>Email</span>
                </label>
                <Input
                  {...methods.register('email')}
                  type="email"
                  placeholder="Enter email"
                  disabled={!!slug}
                />
              </div>
              {!slug && (
                <div>
                  <label className="block mb-1">
                    <span>Password</span>
                  </label>
                  <Input
                    {...methods.register('password')}
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
              )}
              <div>
                <label className="block mb-1">
                  <span>Role</span>
                </label>
                <Select
                  {...methods.register('role')}
                  options={ROLES}
                  defaultValue={methods.getValues('role')}
                />
              </div>
            </div>
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update User' : 'Create User'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
