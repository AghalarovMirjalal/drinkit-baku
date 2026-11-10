import { colors } from '../theme';

export type Category = 'coffee' | 'cold' | 'tea' | 'food';

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  volume?: string;
  category: Category;
  color: string;
  hit?: boolean;
  isNew?: boolean;
};

export const categories: { key: Category | 'all'; title: string }[] = [
  { key: 'all', title: 'Всё' },
  { key: 'coffee', title: 'Кофе' },
  { key: 'cold', title: 'Холодное' },
  { key: 'tea', title: 'Чай и не кофе' },
  { key: 'food', title: 'Еда' },
];

export const menu: MenuItem[] = [
  {
    id: 'cappuccino',
    name: 'Капучино',
    desc: 'Двойной эспрессо и плотная молочная пена',
    price: 5.2,
    volume: '300 мл',
    category: 'coffee',
    color: colors.milk,
    hit: true,
  },
  {
    id: 'flat-white',
    name: 'Флэт уайт',
    desc: 'Больше кофе, меньше молока. Для тех, кто проснулся не до конца',
    price: 5.5,
    volume: '250 мл',
    category: 'coffee',
    color: colors.orange,
  },
  {
    id: 'raf-popcorn',
    name: 'Раф попкорн',
    desc: 'Сливочный раф со вкусом карамельного попкорна',
    price: 6.9,
    volume: '350 мл',
    category: 'coffee',
    color: colors.lime,
    hit: true,
  },
  {
    id: 'pistachio-latte',
    name: 'Фисташковый латте',
    desc: 'Мягкий латте с фисташковой пастой',
    price: 7.2,
    volume: '350 мл',
    category: 'coffee',
    color: colors.lime,
    isNew: true,
  },
  {
    id: 'espresso',
    name: 'Эспрессо',
    desc: 'Классика на зерне нашей обжарки',
    price: 3.5,
    volume: '40 мл',
    category: 'coffee',
    color: colors.black,
  },
  {
    id: 'bumble',
    name: 'Бамбл',
    desc: 'Апельсиновый сок, карамель и эспрессо со льдом',
    price: 6.5,
    volume: '400 мл',
    category: 'cold',
    color: colors.orange,
    hit: true,
  },
  {
    id: 'espresso-tonic',
    name: 'Эспрессо-тоник',
    desc: 'Тоник, лёд и шот эспрессо. Освежает лучше любого кондиционера',
    price: 6.2,
    volume: '400 мл',
    category: 'cold',
    color: colors.sky,
  },
  {
    id: 'ice-latte',
    name: 'Айс латте',
    desc: 'Холодный латте на любом молоке',
    price: 5.9,
    volume: '400 мл',
    category: 'cold',
    color: colors.milk,
  },
  {
    id: 'pomegranate-lemonade',
    name: 'Гранатовый лимонад',
    desc: 'Азербайджанский гранат, лайм и газировка',
    price: 5.5,
    volume: '400 мл',
    category: 'cold',
    color: colors.pink,
    isNew: true,
  },
  {
    id: 'matcha',
    name: 'Матча латте',
    desc: 'Японский зелёный чай с молоком. Можно холодным',
    price: 6.8,
    volume: '350 мл',
    category: 'tea',
    color: colors.lime,
    hit: true,
  },
  {
    id: 'thyme-tea',
    name: 'Чай с чабрецом',
    desc: 'Чёрный чай, чабрец и немного мёда',
    price: 4,
    volume: '400 мл',
    category: 'tea',
    color: colors.orange,
  },
  {
    id: 'cocoa',
    name: 'Какао с маршмеллоу',
    desc: 'Густое какао и много маршмеллоу сверху',
    price: 5.8,
    volume: '350 мл',
    category: 'tea',
    color: colors.lilac,
  },
  {
    id: 'croissant',
    name: 'Круассан с сыром',
    desc: 'Тёплый, хрустящий, с сыром внутри',
    price: 4.5,
    category: 'food',
    color: colors.milk,
  },
  {
    id: 'toast',
    name: 'Тост с индейкой',
    desc: 'Хлеб на закваске, индейка, соус песто',
    price: 7.5,
    category: 'food',
    color: colors.lilac,
  },
  {
    id: 'cheesecake',
    name: 'Чизкейк',
    desc: 'Нью-йорк, без лишнего',
    price: 6,
    category: 'food',
    color: colors.pink,
  },
];

export const formatPrice = (p: number) => `${p.toFixed(2).replace('.00', '')} AZN`;
