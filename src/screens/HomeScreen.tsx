import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Button from '../components/Button';
import Title from '../components/Title';
import ProductImage from '../components/ProductImage';
import { TabParamList } from '../navigation';
import { colors, fonts, radius } from '../theme';
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
  const winter = menu.filter((m) => m.winter);
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
          <Ionicons name="location" size={14} color={colors.blueLight} />
          <Text style={styles.cityText}>Баку</Text>
        </Pressable>
      </View>

      {/* зимний баннер */}
      <Pressable onPress={() => navigation.navigate('Menu')}>
        <LinearGradient
          colors={['#1E2A6B', colors.card]}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroGlow} />
          <Text style={styles.heroTag}>winter ✨</Text>
          <Text style={styles.heroTitle}>Зимнее меню{'\n'}уже в Баку</Text>
          <Text style={styles.heroText}>Snow Raf, Gingerbread Latte{'\n'}и клюквенный чай</Text>
          <Button
            title="Смотреть"
            variant="white"
            small
            style={styles.heroBtn}
            onPress={() => navigation.navigate('Menu')}
          />

          <View style={styles.heroDrinks} pointerEvents="none">
            <View style={{ marginTop: 40 }}>
              <ProductImage item={winter[1]} size={56} />
            </View>
            <View style={{ marginLeft: 6 }}>
              <ProductImage item={winter[0]} size={74} />
            </View>
          </View>
        </LinearGradient>
      </Pressable>

      {/* популярное */}
      <Title action="Всё меню" onAction={() => navigation.navigate('Menu')}>
        Популярное
      </Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
        {hits.map((item) => (
          <Pressable key={item.id} style={styles.product} onPress={() => navigation.navigate('Menu')}>
            <View style={styles.productImg}>
              <ProductImage item={item} size={62} />
            </View>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* как это работает */}
      <Title>Как это работает</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
        {steps.map((s, i) => (
          <View key={s.title} style={styles.step}>
            <View style={styles.stepTop}>
              <View style={styles.stepIcon}>
                <Ionicons name={s.icon} size={20} color={colors.white} />
              </View>
              <Text style={styles.stepNum}>{i + 1}</Text>
            </View>
            <Text style={styles.stepTitle}>{s.title}</Text>
            <Text style={styles.stepText}>{s.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* бонусы */}
      <View style={styles.bonus}>
        <Text style={styles.bonusTitle}>Каждый 7-й напиток в подарок</Text>
        <Text style={styles.bonusText}>Осталось 3 стаканчика</Text>
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
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
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
    color: colors.muted,
  },
  logo: {
    fontFamily: fonts.bold,
    fontSize: 30,
    color: colors.text,
    letterSpacing: -1,
  },
  city: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    height: 36,
    borderRadius: radius.pill,
  },
  cityText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text,
  },
  hero: {
    marginHorizontal: 14,
    borderRadius: radius.xl,
    padding: 24,
    minHeight: 270,
    overflow: 'hidden',
    marginBottom: 32,
  },
  heroGlow: {
    position: 'absolute',
    right: -40,
    top: 30,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(94,116,246,0.25)',
  },
  heroTag: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.glow,
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: fonts.medium,
    fontSize: 28,
    lineHeight: 32,
    color: colors.text,
    letterSpacing: -0.5,
  },
  heroText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 19,
    color: colors.muted,
    marginTop: 10,
  },
  heroBtn: {
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  heroDrinks: {
    position: 'absolute',
    right: 30,
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  hList: {
    paddingHorizontal: 14,
    gap: 12,
    paddingBottom: 32,
  },
  product: {
    width: 160,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: 16,
  },
  productImg: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  productName: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 20,
    color: colors.text,
    minHeight: 40,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.text,
  },
  step: {
    width: 170,
    backgroundColor: colors.surface,
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
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.dim,
  },
  stepTitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 20,
    color: colors.text,
  },
  stepText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 17,
    color: colors.muted,
    marginTop: 6,
  },
  bonus: {
    marginHorizontal: 14,
    marginBottom: 32,
    backgroundColor: colors.surface,
    borderRadius: radius.l,
    padding: 20,
  },
  bonusTitle: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.text,
  },
  bonusText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.muted,
    marginTop: 4,
    marginBottom: 16,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.surface2,
  },
  place: {
    marginHorizontal: 14,
    backgroundColor: colors.surface,
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
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.text,
  },
  placeAddr: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
});
