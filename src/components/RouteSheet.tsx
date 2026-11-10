import { useState } from 'react';
import { Linking, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Place } from '../data/places';
import { colors, fonts, radius } from '../theme';

type Mode = 'walk' | 'car';

type App = {
  key: string;
  title: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  url: (p: Place, mode: Mode) => string;
  // если приложение не установлено, открываем сайт
  fallback?: (p: Place, mode: Mode) => string;
};

const apps: App[] = [
  {
    key: 'apple',
    title: 'Apple Карты',
    color: colors.black,
    icon: 'logo-apple',
    url: (p, m) => `http://maps.apple.com/?daddr=${p.lat},${p.lng}&dirflg=${m === 'walk' ? 'w' : 'd'}`,
  },
  {
    key: 'google',
    title: 'Google Maps',
    color: '#34A853',
    icon: 'logo-google',
    url: (p, m) =>
      `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}&travelmode=${m === 'walk' ? 'walking' : 'driving'}`,
  },
  {
    key: 'yandex',
    title: 'Яндекс Карты',
    color: '#FC3F1D',
    icon: 'navigate',
    url: (p, m) => `yandexmaps://maps.yandex.ru/?rtext=~${p.lat},${p.lng}&rtt=${m === 'walk' ? 'pd' : 'auto'}`,
    fallback: (p, m) => `https://yandex.az/maps/?rtext=~${p.lat},${p.lng}&rtt=${m === 'walk' ? 'pd' : 'auto'}`,
  },
];

type Props = {
  place: Place | null;
  onClose: () => void;
};

export default function RouteSheet({ place, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<Mode>('walk');

  if (!place) return null;

  // Apple Карты показываем первыми только на iOS
  const list = Platform.OS === 'ios' ? apps : [...apps.slice(1), apps[0]];

  const open = async (app: App) => {
    try {
      await Linking.openURL(app.url(place, mode));
    } catch {
      if (app.fallback) Linking.openURL(app.fallback(place, mode));
    }
    onClose();
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.handle} />

        <View style={styles.head}>
          <View style={styles.headIcon}>
            <Ionicons name="cafe" size={22} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Drinkit · {place.name}</Text>
            <Text style={styles.addr}>{place.address}</Text>
          </View>
        </View>

        <View style={styles.segment}>
          {(['walk', 'car'] as Mode[]).map((m) => (
            <Pressable
              key={m}
              onPress={() => setMode(m)}
              style={[styles.segmentItem, mode === m && styles.segmentActive]}
            >
              <Ionicons
                name={m === 'walk' ? 'walk' : 'car'}
                size={18}
                color={mode === m ? colors.black : colors.gray}
              />
              <Text style={[styles.segmentText, mode === m && { color: colors.black }]}>
                {m === 'walk' ? 'Пешком' : 'На машине'}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Открыть в</Text>
        <View style={styles.list}>
          {list.map((app, i) => (
            <Pressable
              key={app.key}
              onPress={() => open(app)}
              style={({ pressed }) => [
                styles.row,
                i < list.length - 1 && styles.rowBorder,
                pressed && { backgroundColor: colors.bg },
              ]}
            >
              <View style={[styles.appIcon, { backgroundColor: app.color }]}>
                <Ionicons name={app.icon} size={18} color={colors.white} />
              </View>
              <Text style={styles.appTitle}>{app.title}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.gray} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.cancel} onPress={onClose}>
          <Text style={styles.cancelText}>Отмена</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(10, 20, 60, 0.35)',
  },
  sheet: {
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    alignSelf: 'center',
    marginBottom: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  headIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.black,
  },
  addr: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.gray,
    marginTop: 2,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.line,
    borderRadius: radius.pill,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    height: 40,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  segmentActive: {
    backgroundColor: colors.white,
  },
  segmentText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.gray,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.gray,
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 4,
  },
  list: {
    backgroundColor: colors.white,
    borderRadius: radius.m,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    height: 60,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  appIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    flex: 1,
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.black,
  },
  cancel: {
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  cancelText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.blue,
  },
});
