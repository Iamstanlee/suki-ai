import FpScaffold from '@/design-system/scaffold';
import { Image, StyleSheet, View } from 'react-native';
import { FpHSpace, FpSpacing, FpVSpace } from '@/design-system/spacing';
import { FpButton } from '@/design-system/button';
import FpTextInput, {
  FpDateInput,
  FpPickerInput,
} from '@/design-system/text-input';
import {
  SignupFormData,
  supportedLocations,
} from '@/app/auth/signup/hooks/use-signup-mutation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editProfileDataSchema,
  EditProfileFormData,
  useSettingsMutation,
} from '@/app/settings/hooks/use-settings-mutation';
import { useUser } from '@/core/context/user-context';
import { FpColor } from '@/design-system/color';
import { Plus } from 'phosphor-react-native';
import Clickable from '@/design-system/components/clickable';
import { useState } from 'react';
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from 'expo-image-picker';
import { useSnackBar } from '@/core/context/snackbar-context';
import _ from 'lodash';

export const EditProfileSettingsPageTag = 'EditProfileSettings';

export default function EditProfileSettingsPage() {
  const { user, avatar_url } = useUser();
  const { editProfile, editProfileLoading } = useSettingsMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileDataSchema),
    defaultValues: user as EditProfileFormData,
  });

  const [avatarBase64, setAvatarBase64] = useState<string>();
  const [mediaPermissionGranted, requestPermission] =
    useMediaLibraryPermissions();
  const snackBar = useSnackBar();

  const pickImage = async () => {
    if (!mediaPermissionGranted) {
      await requestPermission();
    }

    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (
        result.assets[0].fileSize &&
        result.assets[0].fileSize > _.multiply(1024, 1024)
      ) {
        snackBar.INFO('Image size should be less than 1MB');
        return;
      }

      if (result.assets[0].type !== 'image' && !result.assets[0].base64) {
        snackBar.INFO('Unsupported file type');
        return;
      }

      setAvatarBase64(result.assets[0].base64);
    }
  };

  const onEdit = (data: SignupFormData) => {
    editProfile({ ...data, avatarBase64 });
  };

  return (
    <FpScaffold withBackButton scrollable>
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 50,
            borderWidth: 0.8,
            borderColor: FpColor.black,
          }}
          source={{
            uri: avatarBase64
              ? 'data:image/png;base64,' + avatarBase64
              : avatar_url,
          }}
        />
        <Clickable style={styles.plusBtn} onPress={() => pickImage()}>
          <Plus color={FpColor.white} weight='bold' size={18} />
        </Clickable>
      </View>
      <FpVSpace.md />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          paddingTop: FpSpacing.md,
        }}
      >
        <FpTextInput
          name='first_name'
          placeholder='First Name'
          control={control}
          error={errors.first_name?.message}
          flexible
        />
        <FpHSpace.sm />
        <FpTextInput
          name='last_name'
          placeholder='Last Name'
          control={control}
          error={errors.last_name?.message}
          flexible
        />
      </View>
      <FpVSpace.md />
      <FpTextInput
        name='bio'
        placeholder='Bio eg. Foodie, Traveler, etc.'
        control={control}
        error={errors.bio?.message}
        numberOfLines={4}
      />
      <FpVSpace.md />
      <FpTextInput
        name='email'
        placeholder='Email'
        value={user.email}
        disabled
      />
      <FpVSpace.md />
      <FpDateInput
        placeholder='Add your birthday'
        mode='date'
        disabled
        /*@ts-ignore*/
        value={user.birthday}
        maximumDate={new Date(2012, 0, 1)}
      />
      <FpVSpace.md />
      <FpTextInput
        placeholder='Phone number'
        control={control}
        name='phone_number.number'
        error={errors.phone_number?.number?.message}
        prefix={
          <Image
            style={{ borderRadius: 4, height: 16, width: 24 }}
            source={require('@/assets/icons/us-flag.png')}
          />
        }
      />
      <FpVSpace.md />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <FpPickerInput
          placeholder='Select city'
          control={control}
          name='address.city'
          error={errors.address?.city?.message}
          items={supportedLocations.map((location) => ({
            label: location,
            value: location,
          }))}
          flexible
        />
        <FpHSpace.sm />
        <FpTextInput
          placeholder='Zipcode'
          control={control}
          name='address.zip_code'
          error={errors.address?.zip_code?.message}
          flexible
        />
      </View>
      <FpVSpace.xxl />
      <FpButton
        type='dark'
        isLoading={editProfileLoading}
        onPress={handleSubmit(onEdit)}
      >
        Update
      </FpButton>
    </FpScaffold>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    height: 80,
    width: 80,
  },
  plusBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: FpColor.primary500,
    height: 24,
    width: 24,
    bottom: 0,
    right: 0,
  },
});
