import { useMutation, useQuery } from '@tanstack/react-query';

import { showErrowMessageWithMessage } from '../utils/showErrowMessage';
import { showSuccessMessage } from '../utils/showSuccessMessage';
import catalogsApi from '../api/catalogs';

export const useGetAllCategories = () => {
  const {
    data: categoriesData,
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => catalogsApi.getAllCategories(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    categories: categoriesData?.result.categories,
    refetchCategories,
    isCategoriesError,
    isCategoriesLoading,
  };
};

export const useGetSubcategoriesByCategoryId = (categoryId?: string) => {
  const {
    data: subcategoriesData,
    isError: isSubcategoriesError,
    isLoading: isSubcategoriesLoading,
    refetch: refetchSubcategories,
  } = useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: () => catalogsApi.getSubсategoriesByCategoryId(categoryId!),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!categoryId,
  });

  return {
    subcategories: subcategoriesData?.result.subcategories,
    refetchSubcategories,
    isSubcategoriesError,
    isSubcategoriesLoading,
  };
};

export const useCreateCatalog = (onSettled: VoidFunction) => {
  const {
    mutate: createCatalog,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ name, image }: { name: string; image: File }) => catalogsApi.createCategory(name, image),
    onSettled,
    onSuccess: () => showSuccessMessage('Категория успешно создана!'),
    onError: () => showErrowMessageWithMessage('Не удалось создать категорию!'),
  });

  return { createCatalog, isPending, isError };
};

export const useCreateSubcatalog = (onSettled: VoidFunction) => {
  const {
    mutate: createSubcatalog,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ categoryId, name, image }: { categoryId: string; name: string; image: File }) =>
      catalogsApi.createSubcategory(categoryId, name, image),
    onSettled,
    onSuccess: () => showSuccessMessage('Подкатегория успешно создана!'),
    onError: () => showErrowMessageWithMessage('Не удалось создать подкатегорию!'),
  });

  return { createSubcatalog, isPending, isError };
};
