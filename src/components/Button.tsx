import { Pressable, StyleSheet, Text, ViewStyle, StyleProp } from 'react-native';
import { colors, fonts, radius } from '../theme';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'blue' | 'white' | 'light';
  small?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ title, onPress, variant = 'blue', small, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        small && styles.small,
        variant === 'blue' && { backgroundColor: colors.blue },
        variant === 'white' && { backgroundColor: colors.white },
        variant === 'light' && { backgroundColor: colors.sky },
        pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          small && { fontSize: 14 },
          variant !== 'blue' && { color: colors.blue },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 52,
    paddingHorizontal: 24,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    height: 38,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.white,
  },
});
