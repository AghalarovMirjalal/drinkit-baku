import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Page from '../components/Page';
import Container from '../components/Container';
import Button from '../components/Button';
import Cup from '../components/Cup';
import { RootStackParamList } from '../navigation';
import { colors, fonts, radius } from '../theme';
import { menu, formatPrice } from '../data/menu';

const steps = [
  {
    num: '01',
    title: 'Закажи в приложении',
    text: 'Выбери напиток, молоко, сироп и крепость. Всё как ты любишь.',
    color: colors.lime,
  },
  {
    num: '02',
    title: 'Бариста начнёт готовить',
    text: 'Заказ сразу попадает к баристе. Обычно это занимает 3–5 минут.',
    color: colors.pink,
  },
  {
    num: '03',
    title: 'Забери с полки',
    text: 'Напиток ждёт тебя в ячейке с твоим именем. Без очереди и ожидания.',
    color: colors.lilac,
  },
];

const options = ['овсяное молоко', 'кокосовое', 'без лактозы', '+ шот', 'без сахара', 'карамель', 'солёная карамель', 'ваниль', 'лёд', 'декаф'];

const ticker = ['без очереди', 'заказ в приложении', 'Bakı', 'кофе за 3 минуты', 'умная полка', 'свежая обжарка'];

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const mobile = width < 760;
  const hits = menu.filter((m) => m.hit);

  return (
    <Page active="Home">
      {/* hero */}
      <View style={styles.hero}>
        <Container style={[styles.heroRow, mobile && { flexDirection: 'column' as const }]}>
          <View style={styles.heroLeft}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Уже в Баку</Text>
            </View>
            <Text style={[styles.heroTitle, mobile && { fontSize: 44, lineHeight: 48 }]}>
              кофе, который{'\n'}
              <Text style={{ color: colors.lime }}>ждёт тебя</Text>
              {'\n'}а не наоборот
            </Text>
            <Text style={styles.heroText}>
              Заказываешь в приложении, забираешь с умной полки. Никаких очередей, только
              хороший кофе и пара свободных минут утром.
            </Text>
            <View style={styles.heroButtons}>
              <Button title="Смотреть меню" onPress={() => navigation.navigate('Menu')} />
              <Button title="Где мы" variant="outline" onPress={() => navigation.navigate('Places')} />
            </View>
          </View>

          <View style={[styles.cups, mobile && { marginTop: 40 }]}>
            <View style={{ marginTop: 50 }}>
              <Cup color={colors.pink} size={mobile ? 90 : 120} tilt={-10} />
            </View>
            <View style={{ zIndex: 2, marginHorizontal: -10 }}>
              <Cup color={colors.lime} size={mobile ? 120 : 160} />
            </View>
            <View style={{ marginTop: 70 }}>
              <Cup color={colors.lilac} size={mobile ? 80 : 110} tilt={12} />
            </View>
          </View>
        </Container>
      </View>

      {/* бегущая строка */}
      <View style={styles.ticker}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tickerRow}>
            {[...ticker, ...ticker].map((t, i) => (
              <Text key={i} style={styles.tickerText}>
                {t} <Text style={{ color: colors.white }}>✦</Text>
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* как это работает */}
      <Container style={styles.section}>
        <Text style={styles.sectionTitle}>как это работает</Text>
        <View style={styles.steps}>
          {steps.map((s) => (
            <View key={s.num} style={[styles.step, { backgroundColor: s.color }]}>
              <Text style={styles.stepNum}>{s.num}</Text>
              <Text style={styles.stepTitle}>{s.title}</Text>
              <Text style={styles.stepText}>{s.text}</Text>
            </View>
          ))}
        </View>
      </Container>

      {/* хиты */}
      <View style={styles.dark}>
        <Container style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={[styles.sectionTitle, { color: colors.white, marginBottom: 0 }]}>хиты недели</Text>
            <Button title="Всё меню →" variant="white" small onPress={() => navigation.navigate('Menu')} />
          </View>

          <View style={styles.hits}>
            {hits.map((item) => (
              <View key={item.id} style={styles.hit}>
                <View style={[styles.hitTop, { backgroundColor: item.color === colors.milk ? '#2B2B2B' : item.color }]}>
                  <Cup color={colors.white} size={70} label="" />
                </View>
                <Text style={styles.hitName}>{item.name}</Text>
                <Text style={styles.hitDesc}>{item.desc}</Text>
                <Text style={styles.hitPrice}>{formatPrice(item.price)}</Text>
              </View>
            ))}
          </View>
        </Container>
      </View>

      {/* кастомизация */}
      <Container style={[styles.section, styles.custom, mobile && { flexDirection: 'column' as const }]}>
        <View style={{ flex: 1, minWidth: 260 }}>
          <Text style={styles.sectionTitle}>собери свой напиток</Text>
          <Text style={styles.customText}>
            Больше 100 000 комбинаций. Меняй молоко, добавляй сиропы и шоты, делай слаще или
            крепче. Приложение запомнит твой любимый вариант.
          </Text>
        </View>
        <View style={styles.chips}>
          {options.map((o, i) => (
            <View
              key={o}
              style={[
                styles.chip,
                i % 3 === 0 && { backgroundColor: colors.black },
                i % 4 === 1 && { backgroundColor: colors.pink, borderColor: colors.pink },
              ]}
            >
              <Text style={[styles.chipText, i % 3 === 0 && { color: colors.white }]}>{o}</Text>
            </View>
          ))}
        </View>
      </Container>

      {/* приложение */}
      <Container style={{ paddingBottom: 80 }}>
        <View style={[styles.app, mobile && { padding: 28 }]}>
          <Text style={[styles.appTitle, mobile && { fontSize: 32, lineHeight: 36 }]}>
            скачай приложение{'\n'}и получай бонусы{'\n'}за каждый заказ
          </Text>
          <View style={styles.heroButtons}>
            <Button title="App Store" variant="dark" />
            <Button title="Google Play" variant="dark" />
          </View>
        </View>
      </Container>
    </Page>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.black,
    paddingVertical: 60,
    overflow: 'hidden',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLeft: {
    flex: 1,
    maxWidth: 620,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.lime,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 24,
  },
  badgeText: {
    color: colors.lime,
    fontFamily: fonts.textBold,
    fontSize: 13,
  },
  heroTitle: {
    fontFamily: fonts.title,
    color: colors.white,
    fontSize: 64,
    lineHeight: 68,
    letterSpacing: -2,
  },
  heroText: {
    fontFamily: fonts.text,
    color: '#BDBDBD',
    fontSize: 18,
    lineHeight: 27,
    marginTop: 24,
    maxWidth: 480,
  },
  heroButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 32,
  },
  cups: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  ticker: {
    backgroundColor: colors.lime,
    paddingVertical: 16,
  },
  tickerRow: {
    flexDirection: 'row',
    gap: 28,
    paddingHorizontal: 20,
  },
  tickerText: {
    fontFamily: fonts.titleMedium,
    fontSize: 20,
    color: colors.black,
  },
  section: {
    paddingVertical: 80,
  },
  sectionHead: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    marginBottom: 36,
  },
  sectionTitle: {
    fontFamily: fonts.title,
    fontSize: 40,
    letterSpacing: -1.5,
    color: colors.black,
    marginBottom: 36,
  },
  steps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  step: {
    flex: 1,
    minWidth: 260,
    borderRadius: radius.l,
    padding: 32,
    minHeight: 260,
  },
  stepNum: {
    fontFamily: fonts.title,
    fontSize: 56,
    color: colors.black,
  },
  stepTitle: {
    fontFamily: fonts.titleMedium,
    fontSize: 22,
    color: colors.black,
    marginTop: 40,
    marginBottom: 10,
  },
  stepText: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 23,
    color: '#222',
  },
  dark: {
    backgroundColor: colors.black,
  },
  hits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  hit: {
    flex: 1,
    minWidth: 230,
    backgroundColor: '#161616',
    borderRadius: radius.m,
    padding: 16,
  },
  hitTop: {
    height: 180,
    borderRadius: radius.s,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  hitName: {
    fontFamily: fonts.titleMedium,
    color: colors.white,
    fontSize: 18,
  },
  hitDesc: {
    fontFamily: fonts.text,
    color: colors.gray,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    minHeight: 40,
  },
  hitPrice: {
    fontFamily: fonts.textBold,
    color: colors.lime,
    fontSize: 18,
    marginTop: 12,
  },
  custom: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
  },
  customText: {
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 27,
    color: '#333',
    maxWidth: 460,
  },
  chips: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    minWidth: 260,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: colors.black,
    borderRadius: radius.pill,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  chipText: {
    fontFamily: fonts.textBold,
    fontSize: 15,
    color: colors.black,
  },
  app: {
    backgroundColor: colors.lime,
    borderRadius: radius.l,
    padding: 56,
  },
  appTitle: {
    fontFamily: fonts.title,
    fontSize: 48,
    lineHeight: 52,
    letterSpacing: -1.5,
    color: colors.black,
  },
});
