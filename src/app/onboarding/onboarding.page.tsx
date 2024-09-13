import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import { useRef, useState } from 'react';
import { notTrue } from '@/core/utils/boolean';
import { FpButton } from '@/design-system/button';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import FpScaffold from '@/design-system/scaffold';
import FpText from '@/design-system/text';
import { FpColor } from '@/design-system/color';
import { NewsSourceSelectionPageTag } from '@/app/onboarding/news-source-selection.page';

export const OnboardingPageTag = 'OnboardingPage';

export default function OnboardingPage({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();

  return (
    <FpScaffold type='dark' withZeroPadding>
      <FlatList
        ref={ref}
        data={items}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={notTrue}
        initialNumToRender={1}
        onViewableItemsChanged={({ viewableItems }) => {
          if (!viewableItems[0]) return;
          setCurrentIndex(viewableItems[0].index);
        }}
        keyExtractor={(_, i) => 'onboarding-item-' + i}
        renderItem={({ item }) => {
          return (
            <View style={styles.flatListContainer}>
              <FpVSpace.lg />
              <FpText type='h3' color={FpColor.white} center p24>
                {item.title}
              </FpText>
              <Image style={styles.image} source={item.image} />
              <FpText color={FpColor.white} center p24>
                {item.description}
              </FpText>
            </View>
          );
        }}
      />
      <FpVSpace.xl />
      <FpButton
        type='light'
        onPress={() => {
          if (currentIndex == items.length - 1) {
            navigation.navigate(NewsSourceSelectionPageTag);
          } else {
            const nextIndex = currentIndex + 1;
            (ref as any).current.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
          }
        }}
      >
        {currentIndex == items.length - 1 ? 'Get started' : 'Next'}
      </FpButton>
      <FpVSpace.lg />
      <View style={styles.dots}>
        {items.map((_, idx) => (
          <View
            key={idx}
            style={{
              width: idx == currentIndex ? 23 : 7,
              height: 7,
              backgroundColor: idx == currentIndex ? '#fff' : 'grey',
              borderRadius: 5,
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>
      <FpVSpace.lg />
    </FpScaffold>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
  },
  image: {
    objectFit: 'contain',
    width: Dimensions.get('window').width - FpSpacing.lg,
    height: 280,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: FpSpacing.lg,
  },
});

type OnboardingItem = {
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  backgroundColor?: string;
};

const items: OnboardingItem[] = [
  {
    title: 'Daily feed of insights extracted from your go-to sources',
    description:
      'You don’t have to read everything, just the important bits, Get the latest insights from your goto sources in one place, Curated and summarized for you with AI.',
    image: require('@/assets/onboarding/o1.png'),
  },
  {
    title: 'Your knowledge base, Back in one scroll',
    description:
      'Suki is the mobile app that brings together your newsletters, research papers, podcasts, and more, in one place',
    image: require('@/assets/onboarding/o2.png'),
  },
  {
    title: 'Stay informed, stay ahead',
    description:
      'No more switching between apps/websites to get your daily dose of insights. Suki has you covered',
    image: require('@/assets/onboarding/o3.png'),
  },
];
