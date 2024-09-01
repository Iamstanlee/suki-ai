import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { FpVSpace } from '@/design-system/spacing';
import { useNavigation } from '@react-navigation/native';
import FpTextInput from '@/design-system/text-input';
import Clickable from '@/design-system/components/clickable';
import { Eye, EyeSlash } from '@/design-system/icons';
import { FpButton } from '@/design-system/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  changePasswordDataSchema,
  ChangePasswordFormData,
  useSettingsMutation,
} from '@/app/settings/hooks/use-settings-mutation';

export const ChangePasswordPageTag = 'ChangePassword';

export default function ChangePasswordPage() {
  const navigation = useNavigation();
  const [obscurePassword, setObscurePassword] = useState<boolean>(true);
  const { changePassword, changePasswordLoading } = useSettingsMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordDataSchema),
  });

  const onChangePassword = (data: ChangePasswordFormData) => {
    changePassword(data, { onSuccess: () => navigation.goBack() });
  };

  return (
    <FpScaffold withBackButton>
      <FpText type='h3'>Change Password</FpText>
      <FpVSpace.lg />
      <FpTextInput
        placeholder='Old Password'
        control={control}
        name='old_password'
        error={errors.password?.message}
        secureTextEntry={obscurePassword}
        suffix={
          <Clickable onPress={() => setObscurePassword(!obscurePassword)}>
            {obscurePassword ? <EyeSlash /> : <Eye />}
          </Clickable>
        }
      />
      <FpVSpace.md />
      <FpTextInput
        placeholder='New Password'
        control={control}
        name='password'
        error={errors.password?.message}
        secureTextEntry={obscurePassword}
        suffix={
          <Clickable onPress={() => setObscurePassword(!obscurePassword)}>
            {obscurePassword ? <EyeSlash /> : <Eye />}
          </Clickable>
        }
      />
      <FpVSpace.md />
      <FpTextInput
        placeholder='Retype new Password'
        control={control}
        name='confirm_password'
        error={errors.confirm_password?.message}
        secureTextEntry={obscurePassword}
        suffix={
          <Clickable onPress={() => setObscurePassword(!obscurePassword)}>
            {obscurePassword ? <EyeSlash /> : <Eye />}
          </Clickable>
        }
      />
      <FpVSpace.max />
      <FpButton
        isLoading={changePasswordLoading}
        onPress={handleSubmit(onChangePassword)}
        type='dark'
      >
        Change password
      </FpButton>
      <FpVSpace.xl />
    </FpScaffold>
  );
}
