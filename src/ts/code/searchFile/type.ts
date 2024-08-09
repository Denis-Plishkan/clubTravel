export enum Regions {
  All = 0,
  SharmElSheikh = 1,
  Hurghada = 2,
  Dubai = 3,
  AbuDhabi = 4,
  Bangkok = 5,
  KuahHin = 6,
  SunnyBeach = 7,
  GoldenSands = 8,
  Budva = 9,
  StefanBridge = 10,
  Bali = 11,
  Batumi = 13,
  Rodos = 15,
  Marmaris = 17,
  Paphos = 19,
  Suss = 21,
  Tenerife = 23,
  Majorca = 24,
  Bukovyn = 25,
  Uldag = 27,
  Bansko = 28,
  Borovets = 29,
}
export interface Hotel {
  name: string;
  country: string;
  isCountry: number;
  region: string;
  isRegion: number;
  meal: string;
  isMeals: number;
  star: string;
  isStar: number;
  price: number[];
  duration: string;
  isDuration: number;
  flight: boolean;
  touristPackage: boolean;
  departure: string;
  date: string;
  img: { url: string; urlWebp: string }[];
  description: { main: string; additional: string }[];
  room: string[];
  meals: string;
  beach: string;
  isKids: boolean;
  [key: string]: string | number | boolean | object;
id: string; 
departureIn: string;
}


