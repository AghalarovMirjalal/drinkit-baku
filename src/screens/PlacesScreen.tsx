import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/Button';
import CityMap from '../components/CityMap';
import RouteSheet from '../components/RouteSheet';
import { places, Place } from '../data/places';
import { colors, fonts, radius } from '../theme';

function isOpen(p: Place) {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const toMin = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  return minutes >= toMin(p.open) && minutes < toMin(p.close);
}

export default function PlacesScreen() {
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState(places[0].id);
  const [route, setRoute] = useState<Place | null>(null);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Кофейни</Text>
      <Text style={styles.subtitle}>
        {places.length} кофейни в Баку. Закажите заранее и заберите в любой из них
      </Text>

      <CityMap active={active} onSelect={setActive} />

      {places.map((p) => {
        const open = isOpen(p);
        const on = p.id === active;

        return (
          <Pressable
            key={p.id}
            onPress={() => setActive(p.id)}
            style={[styles.card, on && styles.cardActive]}
          >
            <View style={styles.cardHead}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{p.name}</Text>
                <Text style={styles.addr}>
                  {p.address}
                </Text>
              </View>
              <View style={[styles.status, { backgroundColor: open ? 'rgba(60,203,127,0.15)' : 'rgba(255,90,95,0.15)' }]}>
                <View style={[styles.statusDot, { backgroundColor: open ? colors.green : colors.red }]} />
                <Text style={styles.statusText}>{open ? 'Открыто' : 'Закрыто'}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <Ionicons name="time-outline" size={16} color={colors.muted} />
              <Text style={styles.rowText}>
                Ежедневно {p.open}–{p.close}
              </Text>
            </View>

            <View style={styles.features}>
              {p.features.map((f) => (
                <View key={f} style={styles.feature}>
                  <Text style={styles.featureText}>{f}</Text>
                </View>
              ))}
            </View>

            {on && (
              <Button title="Построить маршрут" small onPress={() => setRoute(p)} style={{ marginTop: 14 }} />
            )}
          </Pressable>
        );
      })}

      <View style={styles.soon}>
        <Text style={styles.soonTitle}>Скоро больше</Text>
        <Text style={styles.soonText}>
          Мы открываем новые кофейни в Баку. Следите за новостями в приложении
        </Text>
      </View>

      <RouteSheet place={route} onClose={() => setRoute(null)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: colors.text,
    letterSpacing: -1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 20,
    color: colors.muted,
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.l,
    padding: 18,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardActive: {
    borderColor: colors.blue,
  },
  cardHead: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  name: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: colors.text,
  },
  addr: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.muted,
    marginTop: 4,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 28,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  feature: {
    backgroundColor: colors.bg,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  featureText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.blueLight,
  },
  soon: {
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.l,
    padding: 20,
  },
  soonTitle: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: colors.blueLight,
  },
  soonText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 19,
    color: colors.text,
    marginTop: 4,
  },
});
