'use client';

import { useEffect, useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from 'rizzui';
import toast from 'react-hot-toast';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import FormFooter from '@core/components/form-footer';
import usersApiHandlers, {
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from '@/kedaimaster-api-handlers/usersApiHandlers';
import { useParams, useNavigate } from 'react-router-dom';
import UserSummary from '@/app/shared/users-page/product/create-edit/product-summary';

const userFormSchema = z
  .object({
    id: z.string().optional(),
    email: z.string().email('Invalid email address'),
    password: z.string().optional(),
    role: z.string().min(1, 'Role is required'),
  })
  .superRefine((data, ctx) => {
    if (!data.id && !data.password) {
      ctx.addIssue({
        path: ['password'],
        code: z.ZodIssueCode.custom,
        message: 'Password is required for new users',
      });
    }
  });

export type UserFormInput = z.infer<typeof userFormSchema>;

export default function CreateEditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const methods = useForm<UserFormInput>({
    resolver: zodResolver(userFormSchema),
    defaultValues: { id: undefined, email: '', password: '', role: '' },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setFetching(false);
        return;
      }
      try {
        const data = await usersApiHandlers.getById(id);
        setUser(data);
        methods.reset({
          id: data.id,
          email: data.email,
          role: data.role,
          password: '',
        });
      } catch (error) {
        toast.error('Failed to load user');
      } finally {
        setFetching(false);
      }
    };
    fetchUser();
  }, [id, methods]);

  const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
  setLoading(true);
  try {
    if (id) {
      // ✏️ EDIT USER
      const payload: UpdateUserRequest = {
        email: data.email,
        role: data.role,
      };
      await usersApiHandlers.update(id, payload);
      toast.success('User updated successfully');
    } else {
      // ➕ CREATE USER
      const payload: CreateUserRequest = {
        email: data.email,
        password: data.password ?? '',
        role: data.role,
      };
      await usersApiHandlers.create(payload);
      toast.success('User created successfully');
    }

    // 🌟 Biar efek spinner-nya kelihatan smooth
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ✅ Redirect ke halaman Users
    navigate(routes.dashboard.users);
  } catch (error) {
    toast.error('Error saving user');
  } finally {
    // 🔁 Delay kecil agar transisi terasa natural
    setTimeout(() => setLoading(false), 300);
  }
};


  if (fetching) {
    return <div className="p-6 text-gray-500">Loading user data...</div>;
  }

  const pageHeader = {
    title: id ? 'Edit User' : 'Create User',
    breadcrumb: [
      { href: routes.dashboard.main, name: 'Dashboard' },
      { href: routes.dashboard.users, name: 'Users' },
      { name: id ? user?.email || 'Edit' : 'Create' },
    ],
  };

  return (
    <div className="@container">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8"
          noValidate
        >
          <UserSummary />
          <FormFooter
            isLoading={loading}
            submitBtnText={id ? 'Update User' : 'Create User'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
