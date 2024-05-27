import { useMutation, useQuery } from '@tanstack/react-query';

import { showSuccessMessage } from '../utils/showSuccessMessage';
import { showErrowMessageWithMessage } from '../utils/showErrowMessage';
import autopartsApi, { Attribute } from '../api/autoparts';

export type CreateAutopartType = {
  subcategoryId: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  discount: string;
  universal: boolean;
  modifications: string[];
  images: File[];
  attributes: Attribute[];
};

export const useGetAutopartsWithPagination = (
  page: number = 1,
  search?: string,
  subcategoryId?: string,
  modificationId?: string
) => {
  const {
    data: autopartsData,
    isError: isAutopartsError,
    isLoading: isAutopartsLoading,
    refetch: refetchAutoparts,
  } = useQuery({
    queryKey: ['autoparts', search, page, subcategoryId, modificationId],
    queryFn: () => autopartsApi.getAutopartsWithPagination(page.toString(), search, subcategoryId, modificationId),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    autoparts: autopartsData?.result.autoparts,
    totalCount: autopartsData?.result.totalCount,
    refetchAutoparts,
    isAutopartsError,
    isAutopartsLoading,
  };
};

export const useCreateAutopart = (onSettled?: VoidFunction) => {
  const {
    mutate: createAutopart,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({
      subcategoryId,
      name,
      description,
      price,
      quantity,
      discount,
      universal,
      modifications,
      images,
      attributes,
    }: CreateAutopartType) =>
      autopartsApi.createAutopart(
        subcategoryId,
        name,
        description,
        price,
        quantity,
        discount,
        universal,
        modifications,
        images,
        attributes
      ),
    onSettled,
    onSuccess: () => showSuccessMessage('Запчасть добавлена!'),
    onError: () => showErrowMessageWithMessage('Не удалось добавить запчасть!'),
  });

  return { createAutopart, isPending, isError };
};

export const useDeleteAutopart = (onSettled?: VoidFunction) => {
  const {
    mutate: createAutopart,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (id: string) => autopartsApi.deleteAutopart(id),
    onSettled,
    onSuccess: () => showSuccessMessage('Запчасть удалена!'),
    onError: () => showErrowMessageWithMessage('Не удалось удалить запчасть!'),
  });

  return { createAutopart, isPending, isError };
};

export const useGetAutopartById = (id: string) => {
  const {
    data: autopartData,
    isError: isAutopartError,
    isLoading: isAutopartLoading,
    refetch: refetchAutopart,
  } = useQuery({
    queryKey: ['autoparts', id],
    queryFn: () => autopartsApi.getAutopartById(id),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    autopart: autopartData?.result.autopart,
    refetchAutopart,
    isAutopartError,
    isAutopartLoading,
  };
};
