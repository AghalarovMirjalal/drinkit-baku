import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

type Props = {
  children: string;
  action?: string;
  onAction?: () => void;
};

export default function Title({ children, action, onAction }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{children}</Text>
      {action && (
        <Pressable onPress={onAction} hitSlop={10}>
          <Text style={styles.action}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.black,
    letterSpacing: -0.5,
  },
  action: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.blue,
  },
});
