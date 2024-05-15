import { api_config } from './api_config';
import { axiosInstance } from './axios';

export interface Category {
  id: number;
  name: string;
  image_path: string;
}

export interface Subcategory {
  id: number;
  category_id: string;
  name: string;
  image_path: string;
}

const catalogsApi = {
  getAllCategories: async () => {
    const route = api_config.API_URL + '/categories';

    const { data } = await axiosInstance.get<{ result: { categories: Category[] } }>(route);

    return data;
  },

  createCategory: async (name: string, image: File) => {
    const route = api_config.API_URL + '/categories/create';

    const formData = new FormData();

    formData.append('name', name);
    formData.append('image', image);

    const { data } = await axiosInstance.post<{ result: { category: Category } }>(route, formData);

    return data;
  },

  createSubcategory: async (categoryId: string, name: string, image: File) => {
    const route = api_config.API_URL + '/subcategories/create';

    const formData = new FormData();

    formData.append('categoryId', categoryId);
    formData.append('name', name);
    formData.append('image', image);

    const { data } = await axiosInstance.post<{ result: { category: Category } }>(route, formData);

    return data;
  },

  getSubategoriesByCategoryId: async (categoryId: string) => {
    const route = api_config.API_URL + '/categories/' + categoryId;

    const { data } = await axiosInstance.get<{ result: { categories: Subcategory[] } }>(route);

    return data;
  },
};

export default catalogsApi;
