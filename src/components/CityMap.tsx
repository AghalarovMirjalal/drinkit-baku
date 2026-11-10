import { useEffect, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import { places, BAKU_REGION } from '../data/places';
import { colors, radius } from '../theme';

type Props = {
  active: string;
  onSelect: (id: string) => void;
};

// на iOS это Apple Maps, на Android — Google Maps
export default function CityMap({ active, onSelect }: Props) {
  const map = useRef<MapView>(null);

  useEffect(() => {
    const p = places.find((x) => x.id === active);
    if (!p) return;
    map.current?.animateCamera(
      { center: { latitude: p.lat, longitude: p.lng }, zoom: 15, pitch: 30 },
      { duration: 700 },
    );
  }, [active]);

  return (
    <View style={styles.wrap}>
      <MapView
        ref={map}
        style={StyleSheet.absoluteFill}
        initialRegion={BAKU_REGION}
        mapType={Platform.OS === 'ios' ? 'mutedStandard' : 'standard'}
        userInterfaceStyle="light"
        showsUserLocation
        showsPointsOfInterests={false}
        showsCompass={false}
        pitchEnabled
      >
        {places.map((p) => {
          const on = p.id === active;
          return (
            <Marker
              key={p.id}
              coordinate={{ latitude: p.lat, longitude: p.lng }}
              onPress={() => onSelect(p.id)}
              tracksViewChanges={false}
            >
              <View style={[styles.pin, on && styles.pinActive]}>
                <Ionicons name="cafe" size={on ? 20 : 15} color={on ? colors.white : colors.blue} />
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 300,
    marginHorizontal: 12,
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: colors.sky,
  },
  pin: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1B2A80',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  pinActive: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.blue,
    borderColor: colors.white,
    borderWidth: 3,
  },
});
