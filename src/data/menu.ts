import { drink } from '../theme';

export type Category = 'coffee' | 'cold' | 'tea' | 'food';

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  volume?: string;
  category: Category;
  color: string;
  foam?: boolean;
  cold?: boolean;
  hit?: boolean;
  isNew?: boolean;
};

export const categories: { key: Category | 'all'; title: string }[] = [
  { key: 'all', title: 'Всё' },
  { key: 'coffee', title: 'Кофе' },
  { key: 'cold', title: 'Холодное' },
  { key: 'tea', title: 'Не кофе' },
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
    color: drink.latte,
    foam: true,
    hit: true,
  },
  {
    id: 'flat-white',
    name: 'Флэт уайт',
    desc: 'Больше кофе, меньше молока',
    price: 5.5,
    volume: '250 мл',
    category: 'coffee',
    color: drink.coffee,
    foam: true,
  },
  {
    id: 'raf-popcorn',
    name: 'Раф попкорн',
    desc: 'Сливочный раф со вкусом карамельного попкорна',
    price: 6.9,
    volume: '350 мл',
    category: 'coffee',
    color: drink.latte,
    foam: true,
    hit: true,
  },
  {
    id: 'pistachio-latte',
    name: 'Фисташковый латте',
    desc: 'Мягкий латте с фисташковой пастой',
    price: 7.2,
    volume: '350 мл',
    category: 'coffee',
    color: drink.matcha,
    foam: true,
    isNew: true,
  },
  {
    id: 'americano',
    name: 'Американо',
    desc: 'Эспрессо и горячая вода. Ничего лишнего',
    price: 4,
    volume: '300 мл',
    category: 'coffee',
    color: drink.espresso,
  },
  {
    id: 'latte-cheese',
    name: 'Латте айс с сырной пенкой',
    desc: 'Холодный латте и солёная сырная пенка сверху',
    price: 7.5,
    volume: '400 мл',
    category: 'cold',
    color: drink.latte,
    foam: true,
    cold: true,
    hit: true,
    isNew: true,
  },
  {
    id: 'bumble',
    name: 'Бамбл',
    desc: 'Апельсиновый сок, карамель и эспрессо со льдом',
    price: 6.5,
    volume: '400 мл',
    category: 'cold',
    color: drink.orange,
    cold: true,
  },
  {
    id: 'espresso-tonic',
    name: 'Эспрессо-тоник',
    desc: 'Тоник, лёд и шот эспрессо',
    price: 6.2,
    volume: '400 мл',
    category: 'cold',
    color: drink.tonic,
    cold: true,
  },
  {
    id: 'berry-matcha',
    name: 'Ягодная матча',
    desc: 'Матча на молоке и ягодное пюре со льдом',
    price: 7.4,
    volume: '400 мл',
    category: 'cold',
    color: drink.berry,
    foam: true,
    cold: true,
    hit: true,
  },
  {
    id: 'pomegranate-lemonade',
    name: 'Гранатовый лимонад',
    desc: 'Азербайджанский гранат, лайм и газировка',
    price: 5.5,
    volume: '400 мл',
    category: 'cold',
    color: drink.pomegranate,
    cold: true,
    isNew: true,
  },
  {
    id: 'matcha',
    name: 'Матча латте',
    desc: 'Японский зелёный чай с молоком',
    price: 6.8,
    volume: '350 мл',
    category: 'tea',
    color: drink.matcha,
    foam: true,
  },
  {
    id: 'thyme-tea',
    name: 'Чай с чабрецом',
    desc: 'Чёрный чай, чабрец и немного мёда',
    price: 4,
    volume: '400 мл',
    category: 'tea',
    color: drink.tea,
  },
  {
    id: 'cocoa',
    name: 'Какао',
    desc: 'Густое какао на молоке',
    price: 5.8,
    volume: '350 мл',
    category: 'tea',
    color: drink.cocoa,
    foam: true,
  },
  {
    id: 'croissant',
    name: 'Круассан с сыром',
    desc: 'Тёплый, хрустящий, с сыром внутри',
    price: 4.5,
    category: 'food',
    color: '#E8C48A',
  },
  {
    id: 'toast',
    name: 'Тост с индейкой',
    desc: 'Хлеб на закваске, индейка, песто',
    price: 7.5,
    category: 'food',
    color: '#D9A86C',
  },
  {
    id: 'cheesecake',
    name: 'Чизкейк',
    desc: 'Классический нью-йорк',
    price: 6,
    category: 'food',
    color: '#F3E3C3',
  },
];

export const sizes = [
  { title: 'S', extra: 0 },
  { title: 'M', extra: 0.8 },
  { title: 'L', extra: 1.5 },
];

export const milks = ['Обычное', 'Овсяное', 'Кокосовое', 'Безлактозное'];

export const formatPrice = (p: number) => `${p.toFixed(2)} ₼`;
