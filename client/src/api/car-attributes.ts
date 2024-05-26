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
  engine: string;
}

export interface CarBodyType {
  body_type: string;
}

export interface CarModification {
  id: string;
  name: string;
  body_type: string;
  engine: string;
  generation_id: number;
}

export interface Car {
  brand: CarBrand;
  model: CarModel;
  generation: CarGenaration;
  modification: CarModification;
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

  getEnginesByGenerationId: async (generationId: string) => {
    const route = api_config.API_URL + '/cars/engines/';

    const { data } = await axiosInstance.get<{ result: { engines: CarEngine[] } }>(route, {
      params: { generationId },
    });

    return data;
  },

  getBodyTypesByGenerationId: async (generationId: string) => {
    const route = api_config.API_URL + '/cars/body-types/';

    const { data } = await axiosInstance.get<{ result: { bodyTypes: CarBodyType[] } }>(route, {
      params: { generationId },
    });

    return data;
  },

  getModifications: async (generationId: string, engine: string, bodyType: string) => {
    const route = api_config.API_URL + '/cars/modifications/';

    const { data } = await axiosInstance.get<{ result: { modifications: CarModification[] } }>(route, {
      params: { generationId, engine, bodyType },
    });

    return data;
  },

  getCarByModificationId: async (modificationId: string) => {
    const route = api_config.API_URL + '/cars/car';

    const { data } = await axiosInstance.get<{ result: { car: Car } }>(route, {
      params: { modificationId },
    });

    return data;
  },
};

export default carAttributesApi;
