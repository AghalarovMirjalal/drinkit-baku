import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { places } from '../data/places';
import { colors, fonts, radius } from '../theme';

type Props = {
  active: string;
  onSelect: (id: string) => void;
};

// react-native-maps не работает в браузере, поэтому тут схема в стиле чертежа
export default function CityMap({ active, onSelect }: Props) {
  return (
    <View style={styles.map}>
      {Array.from({ length: 9 }).map((_, i) => (
        <View key={`v${i}`} style={[styles.gridV, { left: `${(i + 1) * 10}%` }]} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={`h${i}`} style={[styles.gridH, { top: `${(i + 1) * 14}%` }]} />
      ))}

      <View style={[styles.road, { top: '30%', left: '-10%', width: '120%', transform: [{ rotate: '-8deg' }] }]} />
      <View style={[styles.road, { top: '55%', left: '-10%', width: '120%', transform: [{ rotate: '14deg' }] }]} />
      <View style={[styles.road, { top: '50%', left: '20%', width: '90%', transform: [{ rotate: '90deg' }] }]} />

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

const styles = StyleSheet.create({
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
});
