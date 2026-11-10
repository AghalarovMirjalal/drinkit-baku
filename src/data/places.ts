export type Place = {
  id: string;
  name: string;
  address: string;
  open: string;
  close: string;
  features: string[];
  // позиция точки на схеме карты, в процентах
  x: number;
  y: number;
};

export const places: Place[] = [
  {
    id: 'port-baku',
    name: 'Port Baku Mall',
    address: 'проспект Нефтяников, 151',
    open: '08:00',
    close: '23:00',
    features: ['Умная полка', 'Wi-Fi', 'Розетки'],
    x: 62,
    y: 58,
  },
  {
    id: '28-mall',
    name: '28 Mall',
    address: 'улица Азадлыг, 15A',
    open: '09:00',
    close: '22:00',
    features: ['Умная полка', 'Wi-Fi'],
    x: 44,
    y: 40,
  },
];
