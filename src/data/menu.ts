import { DrinkColor } from '../theme';

export type Category = 'coffee' | 'not-coffee' | 'food';

// форма стакана для отрисовки
export type Shape = 'cup' | 'tall' | 'iced' | 'shot' | 'tea' | 'croissant' | 'toast' | 'cake';

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  volume?: string;
  category: Category;
  sub: string;
  shape: Shape;
  color?: DrinkColor;
  art?: boolean; // латте-арт сверху
  cream?: boolean; // шапка из сливок
  hit?: boolean;
  winter?: boolean;
};

export const tabs = [
  { key: 'for-you', title: 'for you' },
  { key: 'winter', title: 'winter ✨' },
  { key: 'coffee', title: 'coffee' },
  { key: 'not-coffee', title: 'not coffee' },
  { key: 'food', title: 'food' },
] as const;

export type TabKey = (typeof tabs)[number]['key'];

export const subTabs: Partial<Record<TabKey, string[]>> = {
  coffee: ['milk coffee', 'black coffee', 'iced coffee with milk', 'iced black coffee'],
  'not-coffee': ['matcha', 'tea', 'cocoa', 'lemonades'],
  food: ['bakery', 'sandwiches', 'desserts'],
};

export const menu: MenuItem[] = [
  // milk coffee
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    desc: 'Двойной эспрессо и плотная молочная пена',
    price: 6.5,
    volume: '300 мл',
    category: 'coffee',
    sub: 'milk coffee',
    shape: 'cup',
    color: 'latte',
    art: true,
    hit: true,
  },
  {
    id: 'mocha',
    name: 'Hot Caffe Mocha',
    desc: 'Эспрессо, молоко и бельгийский шоколад',
    price: 8,
    volume: '350 мл',
    category: 'coffee',
    sub: 'milk coffee',
    shape: 'tall',
    color: 'mocha',
    art: true,
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    desc: 'Больше кофе, меньше молока',
    price: 6,
    volume: '250 мл',
    category: 'coffee',
    sub: 'milk coffee',
    shape: 'cup',
    color: 'coffee',
    art: true,
  },
  {
    id: 'raf-vanilla',
    name: 'Raf Vanilla',
    desc: 'Сливки, эспрессо и ванильный сахар',
    price: 8,
    volume: '350 мл',
    category: 'coffee',
    sub: 'milk coffee',
    shape: 'tall',
    color: 'latte',
    hit: true,
  },
  {
    id: 'latte',
    name: 'Latte',
    desc: 'Эспрессо и много молока',
    price: 6.5,
    volume: '350 мл',
    category: 'coffee',
    sub: 'milk coffee',
    shape: 'tall',
    color: 'latte',
    art: true,
  },
  {
    id: 'pistachio-latte',
    name: 'Pistachio Latte',
    desc: 'Мягкий латте с фисташковой пастой',
    price: 8.5,
    volume: '350 мл',
    category: 'coffee',
    sub: 'milk coffee',
    shape: 'tall',
    color: 'pistachio',
    art: true,
  },

  // зимнее меню
  {
    id: 'snow-raf',
    name: 'Snow Raf',
    desc: 'Сливочный раф с кокосом и белым шоколадом',
    price: 9,
    volume: '350 мл',
    category: 'coffee',
    sub: 'milk coffee',
    shape: 'tall',
    color: 'latte',
    winter: true,
    hit: true,
  },
  {
    id: 'gingerbread-latte',
    name: 'Gingerbread Latte',
    desc: 'Латте с имбирным пряником и шапкой из сливок',
    price: 9,
    volume: '350 мл',
    category: 'coffee',
    sub: 'milk coffee',
    shape: 'tall',
    color: 'mocha',
    cream: true,
    winter: true,
  },
  {
    id: 'cranberry-tea',
    name: 'Cranberry Tea',
    desc: 'Клюква, апельсин и корица',
    price: 6,
    volume: '400 мл',
    category: 'not-coffee',
    sub: 'tea',
    shape: 'tea',
    color: 'pomegranate',
    winter: true,
  },

  // black coffee
  {
    id: 'espresso',
    name: 'Espresso',
    desc: 'Классика на зерне нашей обжарки',
    price: 4,
    volume: '40 мл',
    category: 'coffee',
    sub: 'black coffee',
    shape: 'shot',
    color: 'black',
  },
  {
    id: 'americano',
    name: 'Americano',
    desc: 'Эспрессо и горячая вода',
    price: 5,
    volume: '300 мл',
    category: 'coffee',
    sub: 'black coffee',
    shape: 'tall',
    color: 'black',
  },

  // iced coffee with milk
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    desc: 'Холодный латте на любом молоке',
    price: 7,
    volume: '400 мл',
    category: 'coffee',
    sub: 'iced coffee with milk',
    shape: 'iced',
    color: 'latte',
    hit: true,
  },
  {
    id: 'cheese-foam',
    name: 'Iced Latte Cheese Foam',
    desc: 'Холодный латте и солёная сырная пенка',
    price: 8.5,
    volume: '400 мл',
    category: 'coffee',
    sub: 'iced coffee with milk',
    shape: 'iced',
    color: 'coffee',
    cream: true,
  },

  // iced black coffee
  {
    id: 'bumble',
    name: 'Bumble',
    desc: 'Апельсиновый сок, карамель и эспрессо со льдом',
    price: 8,
    volume: '400 мл',
    category: 'coffee',
    sub: 'iced black coffee',
    shape: 'iced',
    color: 'orange',
    hit: true,
  },
  {
    id: 'espresso-tonic',
    name: 'Espresso Tonic',
    desc: 'Тоник, лёд и шот эспрессо',
    price: 7.5,
    volume: '400 мл',
    category: 'coffee',
    sub: 'iced black coffee',
    shape: 'iced',
    color: 'tonic',
  },

  // not coffee
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    desc: 'Японский зелёный чай с молоком',
    price: 7.5,
    volume: '350 мл',
    category: 'not-coffee',
    sub: 'matcha',
    shape: 'tall',
    color: 'matcha',
    art: true,
  },
  {
    id: 'berry-matcha',
    name: 'Iced Berry Matcha',
    desc: 'Матча на молоке и ягодное пюре со льдом',
    price: 8.5,
    volume: '400 мл',
    category: 'not-coffee',
    sub: 'matcha',
    shape: 'iced',
    color: 'berry',
    hit: true,
  },
  {
    id: 'thyme-tea',
    name: 'Thyme Tea',
    desc: 'Чёрный чай, чабрец и немного мёда',
    price: 4.5,
    volume: '400 мл',
    category: 'not-coffee',
    sub: 'tea',
    shape: 'tea',
    color: 'tea',
  },
  {
    id: 'cocoa',
    name: 'Cocoa',
    desc: 'Густое какао на молоке',
    price: 6.5,
    volume: '350 мл',
    category: 'not-coffee',
    sub: 'cocoa',
    shape: 'cup',
    color: 'cocoa',
    cream: true,
  },
  {
    id: 'pomegranate-lemonade',
    name: 'Pomegranate Lemonade',
    desc: 'Азербайджанский гранат, лайм и газировка',
    price: 6,
    volume: '400 мл',
    category: 'not-coffee',
    sub: 'lemonades',
    shape: 'iced',
    color: 'pomegranate',
  },

  // food
  {
    id: 'croissant',
    name: 'Cheese Croissant',
    desc: 'Тёплый, хрустящий, с сыром внутри',
    price: 4.5,
    category: 'food',
    sub: 'bakery',
    shape: 'croissant',
  },
  {
    id: 'toast',
    name: 'Turkey Toast',
    desc: 'Хлеб на закваске, индейка, песто',
    price: 8,
    category: 'food',
    sub: 'sandwiches',
    shape: 'toast',
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    desc: 'Классический нью-йорк',
    price: 6.5,
    category: 'food',
    sub: 'desserts',
    shape: 'cake',
  },
];

export const sizes = [
  { title: 'S', extra: 0 },
  { title: 'M', extra: 1 },
  { title: 'L', extra: 2 },
];

export const milks = ['Обычное', 'Овсяное', 'Кокосовое', 'Безлактозное'];

export const isDrink = (item: MenuItem) => item.category !== 'food';

const noMilk = ['black', 'tea', 'orange', 'tonic', 'pomegranate'];
export const hasMilk = (item: MenuItem) =>
  isDrink(item) && item.shape !== 'tea' && !noMilk.includes(item.color ?? '');

// 6,50 ₼ или 8 ₼ — как в приложении
export const formatPrice = (p: number) => {
  const s = Number.isInteger(p) ? String(p) : p.toFixed(2).replace('.', ',');
  return `${s} ₼`;
};
