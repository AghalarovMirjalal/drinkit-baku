export type Place = {
  id: string;
  name: string;
  address: string;
  open: string;
  close: string;
  features: string[];
  // координаты для карты (примерные, по адресу ТЦ)
  lat: number;
  lng: number;
  // позиция точки на схеме в веб-версии, в процентах
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
    lat: 40.3727,
    lng: 49.8632,
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
    lat: 40.3797,
    lng: 49.8483,
    x: 44,
    y: 40,
  },
];

export const BAKU_REGION = {
  latitude: 40.3765,
  longitude: 49.8555,
  latitudeDelta: 0.035,
  longitudeDelta: 0.035,
};
