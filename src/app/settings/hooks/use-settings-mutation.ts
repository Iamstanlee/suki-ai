import { useMutation } from '@tanstack/react-query';
import { useSnackBar } from '@/core/context/snackbar-context';
import { z } from 'zod';
import { useUser } from '@/core/context/user-context';
import { fpAnalyticsEventIds, mixpanel, supabase } from '@/core/constants';
import { decodeBase64ToArrayBuffer } from '@/core/utils/serialize';
import { NotificationPrefs } from '@/core/types/notification';
import _ from 'lodash';
import { useHttp } from '@/core/hooks/use-http';

export const editProfileDataSchema = z.object({
  bio: z.string().nullable(),
  first_name: z.string({ message: 'First name is required' }),
  last_name: z.string({ message: 'Last name is required' }),
  phone_number: z.object({
    number: z
      .string({ message: 'Phone number is required' })
      .length(10, { message: 'Phone number should be 10 digits' }),
    country_code: z.string().default('+1'),
  }),
  address: z.object({
    city: z.string({ message: 'City is required' }),
    zip_code: z.string({ message: 'Zip code is required' }),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

export const changePasswordDataSchema = z
  .object({
    old_password: z
      .string({ message: 'Password is required' })
      .min(6, { message: 'Password must be atleast 6 characters' }),
    password: z
      .string({ message: 'Password is required' })
      .min(6, { message: 'Password must be atleast 6 characters' }),
    confirm_password: z
      .string({ message: 'Password is required' })
      .min(6, { message: 'Password must be atleast 6 characters' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type EditProfileFormData = z.infer<typeof editProfileDataSchema> & {
  avatar_url?: string;
};
export type ChangePasswordFormData = z.infer<typeof changePasswordDataSchema>;

export const useSettingsMutation = () => {
  const { member_id, updateUserData } = useUser();
  const snackBar = useSnackBar();
  const http = useHttp();

  const { mutate: editProfile, isPending: editProfileLoading } = useMutation({
    mutationFn: async ({
      avatarBase64,
      ...data
    }: EditProfileFormData & { avatarBase64?: string }) => {
      if (avatarBase64) {
        const endpoint = `${member_id}/avatar.png`;
        const { error } = await supabase.storage
          .from('members')
          .upload(endpoint, decodeBase64ToArrayBuffer(avatarBase64), {
            contentType: 'image/png',
            upsert: true,
          });

        if (error) {
          throw new Error(error.message);
        } else {
          data.avatar_url = `https://mreyeiribvobukkozgiq.supabase.co/storage/v1/object/public/members/${endpoint}`;
        }
      }
      // @ts-ignore
      updateUserData(data);
    },
    onSuccess: () => snackBar.SUCCESS('Profile updated successfully'),
    onError: (error) => snackBar.ERROR(error.message),
  });

  const { mutate: deleteAccount, isPending: deleteAccountLoading } =
    useMutation({
      mutationFn: async ({ delete_reasons }: { delete_reasons: string[] }) =>
        http.post(`/members/${member_id}/delete`, { delete_reasons }),
      onSuccess: (_, { delete_reasons }) => {
        mixpanel.track(fpAnalyticsEventIds.deleteAccount);
        mixpanel.getPeople().set({
          deleted_at: new Date().toISOString(),
          delete_reasons: delete_reasons.join(', '),
        });
        snackBar.SUCCESS('Account deleted successfully');
      },
      onError: (error) => snackBar.ERROR(error.message),
    });

  const { mutate: updateNotificationPrefs } = useMutation({
    mutationFn: async ({
      all,
      app_updates,
      vendor_updates,
    }: NotificationPrefs) => {
      const prefs = _.pickBy({ all, app_updates, vendor_updates }, _.isBoolean);
      // @ts-ignore
      updateUserData({ notification_prefs: prefs });
    },
    onError: (error) => snackBar.ERROR(error.message),
  });

  const { mutate: changePassword, isPending: changePasswordLoading } =
    useMutation({
      mutationFn: async ({
        password,
        old_password,
      }: ChangePasswordFormData) => {
        const { data: isOldCorrectPassword } = await supabase.rpc(
          'verify_user_password',
          { password: old_password },
        );

        if (!isOldCorrectPassword) {
          throw new Error('Incorrect password');
        }

        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
          throw new Error(error.message);
        }
      },
      onSuccess: () => snackBar.SUCCESS('Password changed successfully'),
      onError: (error) => snackBar.ERROR(error.message),
    });

  return {
    editProfile,
    editProfileLoading,
    changePassword,
    changePasswordLoading,
    updateNotificationPrefs,
    deleteAccount,
    deleteAccountLoading,
  };
};
