import { useQuery } from '@tanstack/react-query';

import carAttributesApi from '../api/car-attributes';

export const useGetCarBrands = () => {
  const {
    data: brandsData,
    isError: isBrandsError,
    isLoading: isBrandsLoading,
    refetch: refetchBrands,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: () => carAttributesApi.getBrands(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    brands: brandsData?.result.brands,
    refetchBrands,
    isBrandsError,
    isBrandsLoading,
  };
};

export const useGetCarModels = (brandId: string) => {
  const {
    data: modelsData,
    isError: isBrandsError,
    isLoading: isBrandsLoading,
    refetch: refetchBrands,
  } = useQuery({
    queryKey: ['models', brandId],
    queryFn: () => carAttributesApi.getModelsByBrand(brandId),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    models: modelsData?.result.models,
    refetchBrands,
    isBrandsError,
    isBrandsLoading,
  };
};

export const useGetCarGenerations = (modelId: string) => {
  const {
    data: generationsData,
    isError: isGenerationsError,
    isLoading: isGenerationsLoading,
    refetch: refetchGenerations,
  } = useQuery({
    queryKey: ['generations', modelId],
    queryFn: () => carAttributesApi.getGenerationsByModel(modelId),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    generations: generationsData?.result.generations,
    refetchGenerations,
    isGenerationsError,
    isGenerationsLoading,
  };
};

export const useGetCarEngines = () => {
  const {
    data: enginesData,
    isError: isEnginesError,
    isLoading: isEnginesLoading,
    refetch: refetchEngines,
  } = useQuery({
    queryKey: ['engines'],
    queryFn: () => carAttributesApi.getEngines(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    engines: enginesData?.result.engines,
    refetchEngines,
    isEnginesError,
    isEnginesLoading,
  };
};

export const useGetCarModifications = (engineId: string, generationId: string) => {
  const {
    data: modificationsData,
    isError: isModificationsError,
    isLoading: isModificationsLoading,
    refetch: refetchModifications,
  } = useQuery({
    queryKey: ['modifications'],
    queryFn: () => carAttributesApi.getModifications(generationId, engineId),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    modifications: modificationsData?.result.modifications,
    refetchModifications,
    isModificationsError,
    isModificationsLoading,
  };
};
