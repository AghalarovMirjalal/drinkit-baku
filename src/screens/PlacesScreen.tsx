import { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Button from '../components/Button';
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

function openMap(p: Place) {
  const q = encodeURIComponent(`${p.name}, ${p.address}, Baku`);
  Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${q}`);
}

// упрощённая схема города в стиле чертежа
function MapScheme({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <View style={styles.map}>
      {Array.from({ length: 9 }).map((_, i) => (
        <View key={`v${i}`} style={[styles.gridV, { left: `${(i + 1) * 10}%` }]} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={`h${i}`} style={[styles.gridH, { top: `${(i + 1) * 14}%` }]} />
      ))}

      {/* улицы */}
      <View style={[styles.road, { top: '30%', left: '-10%', width: '120%', transform: [{ rotate: '-8deg' }] }]} />
      <View style={[styles.road, { top: '55%', left: '-10%', width: '120%', transform: [{ rotate: '14deg' }] }]} />
      <View style={[styles.road, { top: '50%', left: '20%', width: '90%', transform: [{ rotate: '90deg' }] }]} />

      {/* море */}
      <View style={styles.sea}>
        <Text style={styles.seaText}>Каспийское море</Text>
      </View>

      {places.map((p) => {
        const on = p.id === active;
        return (
          <Pressable
            key={p.id}
            onPress={() => onSelect(p.id)}
            style={[styles.pin, { left: `${p.x}%`, top: `${p.y}%` }, on && styles.pinActive]}
          >
            <Ionicons name="cafe" size={on ? 18 : 14} color={on ? colors.blue : colors.white} />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function PlacesScreen() {
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState(places[0].id);

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

      <MapScheme active={active} onSelect={setActive} />

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
              <View style={[styles.status, { backgroundColor: open ? '#E3F6EC' : colors.pink }]}>
                <View style={[styles.statusDot, { backgroundColor: open ? colors.green : '#E0524A' }]} />
                <Text style={styles.statusText}>{open ? 'Открыто' : 'Закрыто'}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <Ionicons name="time-outline" size={16} color={colors.gray} />
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
              <Button title="Построить маршрут" small onPress={() => openMap(p)} style={{ marginTop: 14 }} />
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
    color: colors.black,
    letterSpacing: -1,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 20,
    color: colors.gray,
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 16,
  },
  map: {
    height: 260,
    marginHorizontal: 12,
    borderRadius: radius.xl,
    backgroundColor: colors.blue,
    overflow: 'hidden',
    marginBottom: 12,
  },
  gridV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  gridH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  road: {
    position: 'absolute',
    height: 6,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  sea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '22%',
    borderTopWidth: 1.5,
    borderColor: colors.white,
    borderStyle: 'dashed',
    backgroundColor: colors.blueDark,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  seaText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  pin: {
    position: 'absolute',
    width: 30,
    height: 30,
    marginLeft: -15,
    marginTop: -15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinActive: {
    width: 42,
    height: 42,
    marginLeft: -21,
    marginTop: -21,
    borderRadius: 21,
    backgroundColor: colors.white,
  },
  card: {
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: colors.white,
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
    color: colors.black,
  },
  addr: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 18,
    color: colors.gray,
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
    color: colors.black,
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
    color: colors.blue,
  },
  soon: {
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: colors.sky,
    borderRadius: radius.l,
    padding: 20,
  },
  soonTitle: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: colors.blue,
  },
  soonText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 19,
    color: colors.text,
    marginTop: 4,
  },
});
