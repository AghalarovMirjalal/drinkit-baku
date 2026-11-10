import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import Page from '../components/Page';
import Container from '../components/Container';
import Cup from '../components/Cup';
import { categories, menu, formatPrice, Category, MenuItem } from '../data/menu';
import { colors, fonts, radius } from '../theme';

type Filter = Category | 'all';

function Card({ item, width }: { item: MenuItem; width: number }) {
  const [added, setAdded] = useState(false);
  const darkBg = item.color === colors.black;

  return (
    <View style={[styles.card, { width }]}>
      <View style={[styles.cardTop, { backgroundColor: item.color }]}>
        {item.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newText}>new</Text>
          </View>
        )}
        <Cup color={darkBg ? colors.lime : colors.white} size={64} label="" />
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.name}>{item.name}</Text>
        {item.volume && <Text style={styles.volume}>{item.volume}</Text>}
        <Text style={styles.desc}>{item.desc}</Text>
      </View>

      <View style={styles.cardBottom}>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <Pressable
          onPress={() => setAdded(!added)}
          style={[styles.add, added && { backgroundColor: colors.lime }]}
        >
          <Text style={[styles.addText, added && { color: colors.black }]}>{added ? '✓' : '+'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function MenuScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const { width } = useWindowDimensions();

  const items = filter === 'all' ? menu : menu.filter((m) => m.category === filter);

  // считаем ширину карточки под количество колонок
  const inner = Math.min(width, 1200) - 40;
  const cols = width < 560 ? 2 : width < 900 ? 3 : 4;
  const gap = 14;
  const cardWidth = (inner - gap * (cols - 1)) / cols;

  return (
    <Page active="Menu">
      <View style={styles.top}>
        <Container>
          <Text style={[styles.title, width < 760 && { fontSize: 48 }]}>меню</Text>
          <Text style={styles.subtitle}>
            Цены указаны для заказа в приложении. Любой напиток можно поменять под себя: молоко,
            сиропы, сахар и количество шотов.
          </Text>
        </Container>
      </View>

      <Container style={styles.filtersWrap}>
        <View style={styles.filters}>
          {categories.map((c) => {
            const active = filter === c.key;
            return (
              <Pressable
                key={c.key}
                onPress={() => setFilter(c.key)}
                style={[styles.filter, active && styles.filterActive]}
              >
                <Text style={[styles.filterText, active && { color: colors.white }]}>{c.title}</Text>
              </Pressable>
            );
          })}
        </View>
      </Container>

      <Container style={styles.grid}>
        {items.map((item) => (
          <Card key={item.id} item={item} width={cardWidth} />
        ))}
      </Container>

      <Container style={{ paddingBottom: 80 }}>
        <View style={styles.note}>
          <Text style={styles.noteTitle}>Нет любимого напитка?</Text>
          <Text style={styles.noteText}>
            Меню в кофейнях может немного отличаться. Полный список и сезонные новинки всегда есть в
            приложении.
          </Text>
        </View>
      </Container>
    </Page>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: colors.black,
    paddingTop: 60,
    paddingBottom: 50,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 96,
    color: colors.white,
    letterSpacing: -4,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 25,
    color: '#BDBDBD',
    maxWidth: 520,
    marginTop: 12,
  },
  filtersWrap: {
    paddingTop: 28,
    paddingBottom: 20,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filter: {
    borderWidth: 1.5,
    borderColor: colors.black,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  filterActive: {
    backgroundColor: colors.black,
  },
  filterText: {
    fontFamily: fonts.textBold,
    fontSize: 14,
    color: colors.black,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.m,
    overflow: 'hidden',
  },
  cardTop: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.black,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  newText: {
    color: colors.lime,
    fontFamily: fonts.textBold,
    fontSize: 12,
  },
  cardBody: {
    padding: 16,
    paddingBottom: 8,
    flex: 1,
  },
  name: {
    fontFamily: fonts.titleMedium,
    fontSize: 16,
    color: colors.black,
  },
  volume: {
    fontFamily: fonts.text,
    fontSize: 13,
    color: colors.gray,
    marginTop: 2,
  },
  desc: {
    fontFamily: fonts.text,
    fontSize: 14,
    lineHeight: 19,
    color: '#444',
    marginTop: 8,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  price: {
    fontFamily: fonts.textBold,
    fontSize: 16,
    color: colors.black,
  },
  add: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.textBold,
    lineHeight: 22,
  },
  note: {
    backgroundColor: colors.pink,
    borderRadius: radius.l,
    padding: 36,
  },
  noteTitle: {
    fontFamily: fonts.title,
    fontSize: 28,
    color: colors.black,
    marginBottom: 10,
  },
  noteText: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 25,
    color: colors.black,
    maxWidth: 560,
  },
});
