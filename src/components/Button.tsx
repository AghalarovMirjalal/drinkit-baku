import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts, radius } from '../theme';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'lime' | 'white' | 'dark' | 'outline';
  small?: boolean;
};

export default function Button({ title, onPress, variant = 'lime', small }: Props) {
  const dark = variant === 'dark';
  const outline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed, hovered }: any) => [
        styles.btn,
        small && styles.small,
        variant === 'lime' && { backgroundColor: colors.lime },
        variant === 'white' && { backgroundColor: colors.white },
        dark && { backgroundColor: colors.black },
        outline && styles.outline,
        (hovered || pressed) && { transform: [{ scale: 0.97 }], opacity: 0.9 },
      ]}
    >
      <Text
        style={[
          styles.text,
          small && { fontSize: 13 },
          (dark || outline) && { color: colors.white },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  small: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.white,
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: fonts.textBold,
    fontSize: 15,
    color: colors.black,
  },
});
