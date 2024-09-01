import { Text } from 'react-native';
import { FpSpacing } from '@/design-system/spacing';

type FpWhiteSpaceProps = {
  length?: number;
};

export default function FpWhiteSpace({ length }: FpWhiteSpaceProps) {
  return (
    <Text>
      {Array.from({ length: length ?? FpSpacing.sm })
        .map(() => ' ')
        .join('')}
    </Text>
  );
}
