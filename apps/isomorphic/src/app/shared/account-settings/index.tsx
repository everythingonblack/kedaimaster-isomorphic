'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import { Text, Input, Button } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@core/components/form-footer';
import usersApiHandlers from '@/kedaimaster-api-handlers/usersApiHandlers';

// Helper to decode JWT
function decodeJWT(token: string) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

type ResetPasswordForm = {
  email: string;
  old_password: string;
  new_password: string;
};

export default function ResetPasswordPage({ className }: { className?: string }) {
  const [user, setUser] = useState<{ email: string; userId: string } | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const methods = useForm<ResetPasswordForm>({
    defaultValues: {
      email: '',
      old_password: '',
      new_password: '',
    },
  });

  // Ambil user dari JWT saat mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.email && decoded.userId) {
        setUser({ email: decoded.email, userId: decoded.userId });
        methods.setValue('email', decoded.email);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!user) {
      toast.error('User not found');
      return;
    }
    setLoading(true);
    try {
      await usersApiHandlers.updatePassword(user.userId, {
        newPassword: data.new_password,
        confPassword: data.new_password,
      });
      toast.success(<Text as="b">Password updated successfully!</Text>);
      setShowPasswordFields(false);
      methods.reset({ ...data, old_password: '', new_password: '' });
    } catch (error) {
      toast.error(<Text as="b">Failed to update password</Text>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn('@container', className)}>
      <div className="mb-8">
        <h1 className="text-xl font-semibold mb-1">Reset Password</h1>
        <p className="text-gray-500 text-sm">
          Silakan masukkan password lama dan password baru Anda.
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn('relative z-[19] [&_label.block>span]:font-medium')}
        >
          <div className="mb-10 flex flex-col gap-6">
            <FormGroup title="">
              <div className="flex flex-col gap-4">
                {/* EMAIL */}
                <Input
                  label="Email"
                  {...methods.register('email')}
                  readOnly
                  className="mb-2"
                />

                {/* TOMBOL GANTI PASSWORD */}
                {!showPasswordFields ? (
                  <Button
                    type="button"
                    className="w-fit"
                    onClick={() => setShowPasswordFields(true)}
                  >
                    Ganti Password
                  </Button>
                ) : (
                  <>
                    {/* PASSWORD FIELDS (SELALU DIBAWAH EMAIL) */}
                    <Input
                      label="Old Password"
                      type="text"
                      {...methods.register('old_password', { required: 'Old password required' })}
                      error={methods.formState.errors.old_password?.message}
                    />
                    <Input
                      label="New Password"
                      type="text"
                      {...methods.register('new_password', { required: 'New password required' })}
                      error={methods.formState.errors.new_password?.message}
                    />
                  </>
                )}
              </div>
            </FormGroup>
          </div>

          {showPasswordFields && (
            <FormFooter
              isLoading={isLoading}
              altBtnText="Lupa Password"
              submitBtnText="Reset Password"
            />
          )}
        </form>
      </FormProvider>

    </div>
  );
}
