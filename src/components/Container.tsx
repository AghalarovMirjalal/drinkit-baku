import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { MAX_WIDTH } from '../theme';

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function Container({ children, style }: Props) {
  return <View style={[styles.box, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
});
