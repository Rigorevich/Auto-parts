export type Attribute = {
  type: string;
  value: string;
};

export type Autopart = {
  id?: string;
  subcategoryId: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  discount: string;
  images?: any;
  averageRating?: number;
  image?: string;
  attributes?: any;
};
