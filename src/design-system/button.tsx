import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import { FpColor } from '@/design-system/color';
import FpText, { FpTextProps } from '@/design-system/text';
import { FpHSpace } from '@/design-system/spacing';
import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { ArrowLeft } from 'phosphor-react-native';

type FpButtonProps = {
  type?: 'primary' | 'light' | 'dark';
  variant?: 'contained' | 'outlined';
  size?: 'xs' | 'sm' | 'md';
  onPress?: () => void;
  fullWidth?: boolean;
  suffixIcon?: ImageSourcePropType;
  children?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  align?: 'left' | 'center' | 'right';
  flexible?: boolean;
  elevation?: number;
};
export const FpBackIconButton = ({ type, onPress }: FpButtonProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          navigation.goBack();
        }
      }}
      style={{
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: type === 'light' ? FpColor.white : FpColor.black,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0.8,
      }}
    >
      <ArrowLeft
        color={type === 'light' ? FpColor.black : FpColor.white}
        size={18}
        weight='bold'
      />
    </TouchableOpacity>
  );
};

export const FpButton = ({
  type,
  variant,
  size,
  onPress,
  fullWidth,
  align,
  suffixIcon,
  isLoading,
  isDisabled,
  flexible,
  elevation,
  children,
}: FpButtonProps) => {
  let bgColor: string;
  let textColor: string;
  let height: number;
  let textType: FpTextProps['type'];
  switch (type) {
    case 'light':
      if (variant !== 'outlined') {
        bgColor = FpColor.white;
        textColor = FpColor.black;
      } else {
        bgColor = 'transparent';
        textColor = FpColor.white;
      }
      break;
    case 'dark':
      if (variant !== 'outlined') {
        bgColor = FpColor.black;
        textColor = FpColor.white;
      } else {
        bgColor = 'transparent';
        textColor = FpColor.black;
      }
      break;
    default:
      if (variant !== 'outlined') {
        bgColor = FpColor.black;
        textColor = FpColor.white;
      } else {
        bgColor = 'transparent';
        textColor = FpColor.primary500;
      }
  }

  switch (size) {
    case 'xs':
      height = 30;
      textType = 'spanXs';
      break;
    case 'sm':
      height = 40;
      textType = 'label';
      break;
    default:
      height = 60;
      textType = 'button';
  }

  return (
    <TouchableOpacity
      disabled={[isLoading, isDisabled].includes(true)}
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flex: flexible ? 1 : undefined,
        elevation: elevation,
        backgroundColor:
          isDisabled && variant != 'outlined' ? FpColor.gray500 : bgColor,
        paddingHorizontal: 20,
        borderColor: isDisabled ? FpColor.gray500 : textColor,
        borderWidth: variant === 'outlined' ? 1.2 : 0,
        borderRadius: 40,
        height: height,
        width: fullWidth ? '100%' : 'auto',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: suffixIcon ? 'space-between' : 'center',
        alignSelf:
          align === 'left'
            ? 'flex-start'
            : align === 'right'
              ? 'flex-end'
              : 'center',
      }}
    >
      <FpText
        bold
        type={textType}
        color={
          isDisabled && variant == 'outlined' ? FpColor.gray500 : textColor
        }
      >
        {children}
      </FpText>
      {suffixIcon && <FpHSpace.lg />}
      {isLoading && (
        <>
          <FpHSpace.xs />
          <ActivityIndicator color={textColor} />
        </>
      )}
      {suffixIcon && !isLoading && (
        <Image source={suffixIcon} style={{ height: 17, width: 17 }} />
      )}
    </TouchableOpacity>
  );
};
