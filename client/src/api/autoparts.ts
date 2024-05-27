import { api_config } from './api_config';
import { axiosInstance } from './axios';

export interface Attribute {
  type: string;
  value: string;
}

export type Autopart = {
  id?: string;
  subcategoryId: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  discount: string;
  image: string;
  images?: string[];
  averageRating?: number;
  attributes: Attribute[];
};

const autopartsApi = {
  getAutopartsWithPagination: async (
    page: string,
    search?: string,
    subcategoryId?: string,
    modificationId?: string
  ) => {
    const route = api_config.API_URL + '/autoparts';

    const { data } = await axiosInstance.get<{ result: { autoparts: Autopart[]; totalCount: number } }>(route, {
      params: { page, search, subcategoryId, modificationId },
    });

    return data;
  },

  getAutopartById: async (id: string) => {
    const route = api_config.API_URL + '/autoparts/' + id;

    const { data } = await axiosInstance.get<{ result: { autopart: Autopart } }>(route);

    return data;
  },

  deleteAutopart: async (id: string) => {
    const route = api_config.API_URL + '/autoparts/delete/' + id;

    const { data } = await axiosInstance.delete<{ result: { autopart: Autopart } }>(route);

    return data;
  },

  createAutopart: async (
    subcategoryId: string,
    name: string,
    description: string,
    price: string,
    quantity: string,
    discount: string,
    universal: boolean,
    modifications: string[],
    images: File[],
    attributes: Attribute[]
  ) => {
    const route = api_config.API_URL + '/autoparts/create';

    const formData = new FormData();

    formData.append('subcategoryId', subcategoryId);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('discount', discount);
    formData.append('attributes', JSON.stringify(attributes));
    formData.append('universal', JSON.stringify(universal));
    formData.append('modifications', JSON.stringify(modifications));

    images.forEach((image) => {
      formData.append('images', image);
    });

    const { data } = await axiosInstance.post<{ result: { autopart: any } }>(route, formData);

    return data;
  },
};

export default autopartsApi;
