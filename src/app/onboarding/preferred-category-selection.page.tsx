import { StyleSheet } from 'react-native';
import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { useState } from 'react';
import { FpButton } from '@/design-system/button';
import { ListItem } from 'react-native-ui-lib';
import { FpColor } from '@/design-system/color';
import { newsCategories } from '@/core/data/news-category';
import { SubscriptionPageTag } from '@/app/subscription/subscription.page';
import { User_prefs } from '@/core/types/user_prefs';

export const PreferredCategorySelectionPageTag =
  'PreferredCategorySelectionPage';

export default function PreferredCategorySelectionPage({ route, navigation }) {
  const [selection, setSelection] = useState<string[]>([]);

  const onChipPress = (id: string) => {
    if (selection.includes(id)) {
      setSelection(selection.filter((selectedId) => selectedId !== id));
    } else {
      setSelection([...selection, id]);
    }
  };

  return (
    <FpScaffold scrollable withBackButton withZeroPadding>
      <FpText type='h3' p16>
        Select your preferred news categories
      </FpText>
      <FpVSpace.md />
      {newsCategories.map((category, index) => {
        const isSelected = selection.includes(category.id);

        return (
          <ListItem
            key={category.name + index}
            style={[styles.listItem, isSelected && styles.selected]}
            onPress={() => onChipPress(category.id)}
          >
            <ListItem.Part>
              <FpText color={isSelected ? FpColor.white : FpColor.black}>
                {category.name}
              </FpText>
            </ListItem.Part>
          </ListItem>
        );
      })}
      <FpVSpace.md />
      <FpButton
        isDisabled={selection.length === 0}
        onPress={() =>
          navigation.navigate(SubscriptionPageTag, {
            newsIds: route.params.news_sources,
            categoryIds: selection,
          } as User_prefs)
        }
      >
        Continue
      </FpButton>
      <FpVSpace.lg />
    </FpScaffold>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: FpSpacing.sm,
    borderBottomWidth: 0.2,
    borderBottomColor: FpColor.primary100,
  },
  selected: {
    backgroundColor: FpColor.primary500,
  },
});
