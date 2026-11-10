import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Button from '../components/Button';
import Cup from '../components/Cup';
import Title from '../components/Title';
import ProductImage from '../components/ProductImage';
import { TabParamList } from '../navigation';
import { colors, drink, fonts, radius } from '../theme';
import { menu, formatPrice } from '../data/menu';
import { places } from '../data/places';

type Props = BottomTabScreenProps<TabParamList, 'Home'>;

const steps = [
  { icon: 'phone-portrait-outline', title: 'Закажите в приложении', text: 'Заранее, пока едете или идёте' },
  { icon: 'time-outline', title: 'Бариста приготовит', text: 'Обычно за 3–5 минут' },
  { icon: 'grid-outline', title: 'Заберите с полки', text: 'Ячейка с вашим именем подсветится' },
] as const;

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Доброе утро';
  if (h < 18) return 'Добрый день';
  return 'Добрый вечер';
}

export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const hits = menu.filter((m) => m.hit);
  const nearest = places[0];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* шапка */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>{greeting()}</Text>
          <Text style={styles.logo}>drinkit</Text>
        </View>
        <Pressable style={styles.city} onPress={() => navigation.navigate('Places')}>
          <Ionicons name="location" size={14} color={colors.blue} />
          <Text style={styles.cityText}>Баку</Text>
        </Pressable>
      </View>

      {/* главный баннер */}
      <LinearGradient
        colors={[colors.blueLight, colors.blue, colors.blueDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>Кофе, еда{'\n'}и технологии{'\n'}работают вместе</Text>
        <Text style={styles.heroText}>Заказывайте заранее и забирайте без очереди</Text>
        <Button
          title="Заказать"
          variant="white"
          style={styles.heroBtn}
          onPress={() => navigation.navigate('Menu')}
        />

        <View style={styles.heroCups} pointerEvents="none">
          <View style={{ marginTop: 30 }}>
            <Cup color={drink.berry} size={58} straw />
          </View>
          <View style={{ marginLeft: -8 }}>
            <Cup color={drink.latte} size={72} />
          </View>
        </View>
      </LinearGradient>

      {/* как это работает */}
      <Title>Как это работает</Title>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hList}
      >
        {steps.map((s, i) => (
          <View key={s.title} style={styles.step}>
            <View style={styles.stepTop}>
              <View style={styles.stepIcon}>
                <Ionicons name={s.icon} size={20} color={colors.blue} />
              </View>
              <Text style={styles.stepNum}>{i + 1}</Text>
            </View>
            <Text style={styles.stepTitle}>{s.title}</Text>
            <Text style={styles.stepText}>{s.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* популярное */}
      <Title action="Всё меню" onAction={() => navigation.navigate('Menu')}>
        Популярное
      </Title>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hList}
      >
        {hits.map((item) => (
          <Pressable key={item.id} style={styles.product} onPress={() => navigation.navigate('Menu')}>
            <View style={styles.productImg}>
              {item.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newText}>Новинка</Text>
                </View>
              )}
              <ProductImage item={item} size={54} />
            </View>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* бонусы */}
      <View style={styles.bonus}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bonusTitle}>Каждый 7-й напиток в подарок</Text>
          <Text style={styles.bonusText}>Копите стаканчики в приложении</Text>
        </View>
        <View style={styles.dots}>
          {Array.from({ length: 7 }).map((_, i) => (
            <View key={i} style={[styles.dot, i < 4 && { backgroundColor: colors.blue }]} />
          ))}
        </View>
      </View>

      {/* ближайшая кофейня */}
      <Title action="Все" onAction={() => navigation.navigate('Places')}>
        Рядом с вами
      </Title>
      <Pressable style={styles.place} onPress={() => navigation.navigate('Places')}>
        <View style={styles.placeIcon}>
          <Ionicons name="cafe" size={22} color={colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.placeName}>{nearest.name}</Text>
          <Text style={styles.placeAddr}>{nearest.address}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.gray} />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  hello: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.gray,
  },
  logo: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.blue,
    letterSpacing: -1,
  },
  city: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: radius.pill,
  },
  cityText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.black,
  },
  hero: {
    marginHorizontal: 12,
    borderRadius: radius.xl,
    padding: 24,
    minHeight: 280,
    overflow: 'hidden',
    marginBottom: 32,
  },
  heroTitle: {
    fontFamily: fonts.bold,
    fontSize: 28,
    lineHeight: 32,
    color: colors.white,
    letterSpacing: -0.5,
  },
  heroText: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 10,
    maxWidth: 190,
  },
  heroBtn: {
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  heroCups: {
    position: 'absolute',
    right: 16,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  hList: {
    paddingHorizontal: 20,
    gap: 10,
    paddingBottom: 32,
  },
  step: {
    width: 170,
    backgroundColor: colors.white,
    borderRadius: radius.l,
    padding: 16,
  },
  stepTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.sky,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.line,
  },
  stepTitle: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.black,
  },
  stepText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.gray,
    marginTop: 6,
  },
  product: {
    width: 150,
  },
  productImg: {
    overflow: 'hidden',
    height: 170,
    borderRadius: radius.l,
    backgroundColor: colors.sky,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: colors.blue,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  newText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.white,
  },
  productName: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 19,
    color: colors.black,
  },
  productPrice: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.blue,
    marginTop: 4,
  },
  bonus: {
    marginHorizontal: 12,
    marginBottom: 32,
    backgroundColor: colors.white,
    borderRadius: radius.l,
    padding: 20,
    gap: 16,
  },
  bonusTitle: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: colors.black,
  },
  bonusText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.sky,
  },
  place: {
    marginHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: radius.l,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  placeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeName: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.black,
  },
  placeAddr: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
});
