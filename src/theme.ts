// тёмная тема, как в приложении drinkit
export const colors = {
  bg: '#13161D',
  card: '#0A0B0E',
  surface: '#1C2029',
  surface2: '#262B36',
  line: '#2A2E38',

  text: '#FFFFFF',
  muted: '#8B8E97',
  dim: '#5D616B',

  blue: '#334CDB',
  blueLight: '#5E74F6',
  blueDark: '#182DA8',
  glow: '#8FA0FF',

  white: '#FFFFFF',
  black: '#000000',
  green: '#3CCB7F',
  red: '#FF5A5F',
};

// цвета напитков для отрисовки стаканов
export const drink = {
  coffee: ['#C9976F', '#9C6B48'],
  latte: ['#D7AE88', '#B07F5A'],
  mocha: ['#B98166', '#8A5743'],
  black: ['#4A2C1D', '#24140C'],
  matcha: ['#A8C77A', '#6E9447'],
  pistachio: ['#C9C98E', '#9A9A5E'],
  cocoa: ['#9A6650', '#6B3F2E'],
  tea: ['#D98A3D', '#9C5418'],
  orange: ['#F7A440', '#D9731F'],
  berry: ['#B07AE0', '#7A45B8'],
  pomegranate: ['#E5566F', '#A8243D'],
  tonic: ['#6B4A35', '#2E1D12'],
} as const;

export type DrinkColor = keyof typeof drink;

export const fonts = {
  regular: 'Onest_400Regular',
  medium: 'Onest_500Medium',
  semibold: 'Onest_600SemiBold',
  bold: 'Onest_700Bold',
};

export const radius = {
  s: 16,
  m: 24,
  l: 32,
  xl: 36,
  pill: 999,
};
