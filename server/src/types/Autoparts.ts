export interface AutopartBrand {
  id: number;
  name: string;
  logo_path?: string;
}

export interface Autopart {
  id: number;
  brand_id: number;
  subcategory_id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discount: number;
}

export interface AutopartImage {
  id: number;
  autopart_id: number;
  image_path: string;
}

export interface AutopartAttribute {
  id: number;
  autopart_id: number;
  type: string;
  value: string;
}
