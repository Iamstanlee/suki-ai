import { StyleSheet, View } from 'react-native';
import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { useState } from 'react';
import { FpButton } from '@/design-system/button';
import { newsSources } from '@/core/data/news-source';
import { Chip } from 'react-native-ui-lib';
import { FpColor } from '@/design-system/color';
import { PreferredCategorySelectionPageTag } from '@/app/onboarding/preferred-category-selection.page';

export const NewsSourceSelectionPageTag = 'NewsSourceSelection';

export default function NewsSourceSelectionPage({ navigation }) {
  const [selection, setSelection] = useState<string[]>([]);

  const onChipPress = (id: string) => {
    if (selection.includes(id)) {
      setSelection(selection.filter((selectedId) => selectedId !== id));
    } else {
      setSelection([...selection, id]);
    }
  };

  return (
    <FpScaffold>
      <FpVSpace.lg />
      <FpText type='h3'>
        Let's get you setup!, Start by selecting your favourite and goto news
        sources
      </FpText>
      <FpText type='spanSm' color={FpColor.black100}>
        You can always change or update these later
      </FpText>
      <FpVSpace.lg />
      <View style={styles.container}>
        {newsSources.map((newSource) => {
          const isSelected = selection.includes(newSource.id);
          return (
            <Chip
              key={newSource.id}
              containerStyle={[styles.chip, isSelected && styles.chipSelected]}
              labelStyle={[styles.label, isSelected && styles.labelSelected]}
              backgroundColor={isSelected ? FpColor.black : FpColor.white}
              onPress={() => onChipPress(newSource.id)}
              label={newSource.name}
            />
          );
        })}
      </View>
      <FpVSpace.max />
      <FpButton
        isDisabled={selection.length === 0}
        onPress={() =>
          navigation.navigate(PreferredCategorySelectionPageTag, {
            news_sources: selection,
          })
        }
      >
        Continue
      </FpButton>
      <FpVSpace.lg />
    </FpScaffold>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: FpSpacing.sm,
  },
  chip: {
    height: 44,
    backgroundColor: FpColor.primary200,
  },
  chipSelected: {
    backgroundColor: FpColor.primary500,
  },
  label: {
    fontSize: 14,
    fontFamily: 'workSans',
  },
  labelSelected: {
    fontFamily: 'workSans',
    color: FpColor.white,
  },
});
