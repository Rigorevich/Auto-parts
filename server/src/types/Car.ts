export enum BodyType {
  'Седан' = 1,
  'Универсал' = 2,
  'Хэчбек' = 3,
  'Купе' = 4,
  'Кабриолет' = 5,
  'Минивэн' = 6,
  'Микроавтобус' = 7,
  'Лимузин' = 8,
  'Пикап' = 9,
  'Внедорожник' = 10,
}

export enum FuelType {
  'Бензин' = 1,
  'Бензин (пропан-бутан)',
  'Дизель' = 2,
  'Гибрид' = 3,
  'Электро' = 4,
}

export interface CarBrand {
  id: number;
  name: string;
  logo_path: string;
}

export interface CarModel {
  id: number;
  name: string;
  brand_id: number;
}

export interface CarGenaration {
  id: number;
  name: string;
  year_start: number;
  year_end: number;
  model_id: number;
}

export interface CarEngine {
  id: string;
  fuel_type: FuelType;
  name: string;
}

export interface CarModification {
  id: string;
  name: string;
  body_type: BodyType;
  engine_id: string;
  generation_id: number;
}
