import { useQuery } from '@tanstack/react-query';

import carAttributesApi from '../api/car-attributes';

export const useGetCarBrands = () => {
  const {
    data: brandsData,
    isError: isBrandsError,
    isLoading: isBrandsLoading,
    refetch: refetchBrands,
  } = useQuery({
    queryKey: ['car-brands'],
    queryFn: () => carAttributesApi.getBrands(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const transformedBrands = brandsData?.result.brands.map((brand) => ({
    value: brand.id.toString(),
    label: brand.name,
  }));

  return {
    brands: transformedBrands,
    refetchBrands,
    isBrandsError,
    isBrandsLoading,
  };
};

export const useGetCarModels = (brandId: string = '') => {
  const {
    data: modelsData,
    isError: isModelsError,
    isLoading: isModelsLoading,
    refetch: refetchModels,
  } = useQuery({
    queryKey: ['models', brandId],
    queryFn: () => carAttributesApi.getModelsByBrand(brandId),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!brandId,
  });

  const transformedModels = modelsData?.result.models.map((model) => ({
    value: model.id.toString(),
    label: model.name,
  }));

  return {
    models: transformedModels,
    refetchModels,
    isModelsError,
    isModelsLoading,
  };
};

export const useGetCarGenerations = (modelId: string = '') => {
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
    enabled: !!modelId,
  });

  const transformedGenerations = generationsData?.result.generations.map((generation) => ({
    value: generation.id.toString(),
    label: `${generation.name} (${generation.year_start} - ${generation.year_end || '2024'})`,
  }));

  return {
    generations: transformedGenerations,
    refetchGenerations,
    isGenerationsError,
    isGenerationsLoading,
  };
};

export const useGetCarEngines = (generationId: string = '') => {
  const {
    data: enginesData,
    isError: isEnginesError,
    isLoading: isEnginesLoading,
    refetch: refetchEngines,
  } = useQuery({
    queryKey: ['engines', generationId],
    queryFn: () => carAttributesApi.getEnginesByGenerationId(generationId),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!generationId,
  });

  const transformedEngines = enginesData?.result.engines.map((engine) => ({
    value: engine.engine,
    label: engine.engine,
  }));

  return {
    engines: transformedEngines,
    refetchEngines,
    isEnginesError,
    isEnginesLoading,
  };
};

export const useGetCarBodyTypes = (generationId: string = '') => {
  const {
    data: bodyTypesData,
    isError: isBodyTypesError,
    isLoading: isBodyTypesLoading,
    refetch: refetchBodyTypes,
  } = useQuery({
    queryKey: ['bodyTypes', generationId],
    queryFn: () => carAttributesApi.getBodyTypesByGenerationId(generationId),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!generationId,
  });

  const transformedBodyTypes = bodyTypesData?.result.bodyTypes.map((bodyType) => ({
    value: bodyType.body_type,
    label: bodyType.body_type,
  }));

  return {
    bodyTypes: transformedBodyTypes,
    refetchBodyTypes,
    isBodyTypesError,
    isBodyTypesLoading,
  };
};

export const useGetCarModifications = (engineId: string = '', generationId: string = '', bodyTypeId: string = '') => {
  const {
    data: modificationsData,
    isError: isModificationsError,
    isLoading: isModificationsLoading,
    refetch: refetchModifications,
  } = useQuery({
    queryKey: ['modifications', engineId, generationId, bodyTypeId],
    queryFn: () => carAttributesApi.getModifications(generationId, engineId, bodyTypeId),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!engineId && !!generationId && !!bodyTypeId,
  });

  const transformedModifications = modificationsData?.result.modifications.map((modification) => ({
    value: modification.id.toString(),
    label: modification.name,
  }));

  return {
    modifications: transformedModifications,
    refetchModifications,
    isModificationsError,
    isModificationsLoading,
  };
};

export const useGetCar = (modificationId: string) => {
  const {
    data: carData,
    isError: isCarError,
    isLoading: isCarLoading,
    refetch: refetchCar,
  } = useQuery({
    queryKey: ['car', modificationId],
    queryFn: () => carAttributesApi.getCarByModificationId(modificationId),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!modificationId,
  });

  return {
    car: carData?.result.car,
    refetchCar,
    isCarError,
    isCarLoading,
  };
};
