export interface Category {
  id: number;
  name: string;
  image_path: string;
}

export interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  image_path: string;
}
