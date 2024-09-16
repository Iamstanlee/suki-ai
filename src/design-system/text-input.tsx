import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { FpColor } from '@/design-system/color';
import { Control, Controller, Path, PathValue } from 'react-hook-form';
import FpText from '@/design-system/text';
import { ReactNode } from 'react';
import { FpHSpace, FpSpacing } from '@/design-system/spacing';
import {
  DateTimePicker,
  DateTimePickerMode,
  Picker,
  PickerItemProps,
} from 'react-native-ui-lib';
import { formatAsDayMonthYear } from '@/core/utils/date';
import { CalendarBlank, CaretDown } from 'phosphor-react-native';

type FpTextInputProps<T> = {
  onChangeText?: (text: string) => void;
  name?: Path<T>;
  value?: PathValue<T, Path<T>>;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  control?: Control<T>;
  suffix?: ReactNode;
  prefix?: ReactNode;
  style?: StyleProp<ViewStyle>;
  autoFocus?: boolean;
  /// allow the input to fit the required viewport
  flexible?: boolean;
  returnKeyType?: 'done' | 'next' | 'go' | 'search' | 'send';
  onSubmitEditing?: (event: any) => void;
};

type FpPickerInputProps<T> = FpTextInputProps<T> & {
  onChange?: (value: string | number) => void;
  items: PickerItemProps[];
  showSearch?: boolean;
};

type FpDateInputProps<T> = FpTextInputProps<T> & {
  initialDate?: Date;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: DateTimePickerMode;
  value?: Date;
};

export default function FpTextInput<T>(props: FpTextInputProps<T>) {
  return (
    <View style={{ flex: props.flexible ? 1 : 0 }}>
      {props.control ? (
        <Controller
          control={props.control}
          name={props.name}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={[
                styles.inputContainer,
                props.style,
                props.error && styles.errorBorder,
              ]}
            >
              {props.prefix && (
                <>
                  {props.prefix}
                  <FpHSpace.sm />
                </>
              )}
              <TextInput
                {...props}
                multiline={!!props.numberOfLines}
                textAlignVertical={props.numberOfLines ? 'top' : 'center'}
                style={styles.input}
                onBlur={onBlur}
                editable={!!!props.disabled}
                onChangeText={onChange}
                value={value as string}
                autoCapitalize='none'
              />
              {props.suffix && (
                <>
                  <FpHSpace.sm />
                  {props.suffix}
                </>
              )}
            </View>
          )}
        />
      ) : (
        <View
          style={[
            styles.inputContainer,
            props.style,
            props.error && styles.errorBorder,
          ]}
        >
          {props.prefix && (
            <>
              {props.prefix}
              <FpHSpace.sm />
            </>
          )}
          <TextInput
            {...props}
            multiline={!!props.numberOfLines}
            editable={!!!props.disabled}
            value={props.value as string}
            style={styles.input}
          />
          {props.suffix && (
            <>
              <FpHSpace.sm />
              {props.suffix}
            </>
          )}
        </View>
      )}
      {props.error && (
        <FpText bold type='label' color={FpColor.error500}>
          {props.error}
        </FpText>
      )}
    </View>
  );
}

export function FpDateInput<T>(props: FpDateInputProps<T>) {
  return (
    <View>
      {props.control ? (
        <Controller
          control={props.control}
          name={props.name}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={[
                styles.customContainer,
                props.error && styles.errorBorder,
              ]}
            >
              <DateTimePicker
                {...props}
                style={styles.input}
                onBlur={onBlur}
                onChange={onChange}
                editable={!!!props.disabled}
                value={value as Date}
                display='spinner'
                dateTimeFormatter={(date) => formatAsDayMonthYear(date)}
                trailingAccessory={<CalendarBlank />}
              />
            </View>
          )}
        />
      ) : (
        <View
          style={[styles.customContainer, props.error && styles.errorBorder]}
        >
          <DateTimePicker
            {...props}
            style={styles.input}
            editable={!!!props.disabled}
            display='spinner'
            dateTimeFormatter={(date) => formatAsDayMonthYear(date)}
            trailingAccessory={<CalendarBlank />}
          />
        </View>
      )}
      {props.error && (
        <FpText bold type='label' color={FpColor.error500}>
          {props.error}
        </FpText>
      )}
    </View>
  );
}

export function FpPickerInput<T>(props: FpPickerInputProps<T>) {
  return (
    <View>
      {props.control ? (
        <Controller
          control={props.control}
          name={props.name}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={[
                styles.customContainer,
                props.error && styles.errorBorder,
              ]}
            >
              <Picker
                {...props}
                onChange={onChange}
                style={styles.input}
                editable={!!!props.disabled}
                onBlur={onBlur}
                value={value as string}
                trailingAccessory={<CaretDown />}
              />
            </View>
          )}
        />
      ) : (
        <View
          style={[styles.customContainer, props.error && styles.errorBorder]}
        >
          <Picker
            {...props}
            value={props.value as string}
            editable={!!!props.disabled}
            style={styles.input}
            trailingAccessory={<CaretDown />}
          />
        </View>
      )}
      {props.error && (
        <FpText bold type='label' color={FpColor.error500}>
          {props.error}
        </FpText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: FpSpacing.sm,
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 12,
  },
  customContainer: {
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1.2,
    borderColor: '#000',
    padding: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'workSans',
    fontSize: 16,
  },
  errorBorder: {
    borderColor: FpColor.error500,
  },
});
