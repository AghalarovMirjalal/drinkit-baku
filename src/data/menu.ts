import { drink } from '../theme';

// фото с unsplash.com (бесплатная лицензия)
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=80`;

export type Category = 'coffee' | 'cold' | 'tea' | 'food';

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  volume?: string;
  category: Category;
  color: string;
  photo?: string;
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
    photo: unsplash('1761783768352-e7f42bfa9988'),
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
    photo: unsplash('1760175445000-0e01e193d1cd'),
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
    photo: unsplash('1772519597624-cd5284f318c4'),
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
    photo: unsplash('1766426910014-63a302fa137e'),
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
    photo: unsplash('1551030173-122aabc4489c'),
    name: 'Американо',
    desc: 'Эспрессо и горячая вода. Ничего лишнего',
    price: 4,
    volume: '300 мл',
    category: 'coffee',
    color: drink.espresso,
  },
  {
    id: 'latte-cheese',
    photo: unsplash('1517701550927-30cf4ba1dba5'),
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
    photo: unsplash('1629022194335-b2eca031e320'),
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
    photo: unsplash('1753700281029-b3d15df20ec4'),
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
    photo: unsplash('1749104028327-a33087ea4f47'),
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
    photo: unsplash('1603028769268-94e389e60414'),
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
    photo: unsplash('1515823064-d6e0c04616a7'),
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
    photo: unsplash('1558160074-4d7d8bdf4256'),
    name: 'Чай с чабрецом',
    desc: 'Чёрный чай, чабрец и немного мёда',
    price: 4,
    volume: '400 мл',
    category: 'tea',
    color: drink.tea,
  },
  {
    id: 'cocoa',
    photo: unsplash('1637572815755-c4b80092dce1'),
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
    photo: unsplash('1599940778173-e276d4acb2bb'),
    name: 'Круассан с сыром',
    desc: 'Тёплый, хрустящий, с сыром внутри',
    price: 4.5,
    category: 'food',
    color: '#E8C48A',
  },
  {
    id: 'toast',
    photo: unsplash('1528736235302-52922df5c122'),
    name: 'Тост с индейкой',
    desc: 'Хлеб на закваске, индейка, песто',
    price: 7.5,
    category: 'food',
    color: '#D9A86C',
  },
  {
    id: 'cheesecake',
    photo: unsplash('1774988867972-98caecc776d8'),
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
