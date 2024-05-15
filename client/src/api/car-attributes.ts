import { api_config } from './api_config';
import { axiosInstance } from './axios';

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
  fuel_type: number;
  name: string;
}

export interface CarModification {
  id: string;
  name: string;
  body_type: number;
  engine_id: string;
  generation_id: number;
}

const carAttributesApi = {
  getBrands: async () => {
    const route = api_config.API_URL + '/cars/brands';

    const { data } = await axiosInstance.get<{ result: { brands: CarBrand[] } }>(route);

    return data;
  },

  getModelsByBrand: async (brandId: string) => {
    const route = api_config.API_URL + '/cars/models/';

    const { data } = await axiosInstance.get<{ result: { models: CarModel[] } }>(route, {
      params: { brandId },
    });

    return data;
  },

  getGenerationsByModel: async (modelId: string) => {
    const route = api_config.API_URL + '/cars/generations/';

    const { data } = await axiosInstance.get<{ result: { generations: CarGenaration[] } }>(route, {
      params: { modelId },
    });

    return data;
  },

  getEngines: async () => {
    const route = api_config.API_URL + '/cars/engines/';

    const { data } = await axiosInstance.get<{ result: { engines: CarEngine[] } }>(route);

    return data;
  },

  getModifications: async (generationId: string, engineId: string) => {
    const route = api_config.API_URL + '/cars/modifications/';

    const { data } = await axiosInstance.get<{ result: { modifications: CarModification[] } }>(route, {
      params: { generationId, engineId },
    });

    return data;
  },
};

export default carAttributesApi;
