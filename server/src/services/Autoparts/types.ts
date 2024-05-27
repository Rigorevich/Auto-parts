export type Attribute = {
  type: string;
  value: string;
};

export type Autopart = {
  subcategoryId: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  discount: string;
  images: any[];
  modifications: string[];
  universal: boolean;
  attributes: Attribute[];
};
