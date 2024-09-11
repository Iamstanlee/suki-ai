import { StyleSheet } from 'react-native';
import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { useState } from 'react';

export const HomePageTag = 'For you';

export default function HomePage({ navigation }) {
  const [query, setQuery] = useState('');

  return (
    <FpScaffold>
      <FpText>FYP</FpText>
    </FpScaffold>
  );
}

const styles = StyleSheet.create({
  icon: { height: 50, width: 50, borderRadius: 100 },
});
