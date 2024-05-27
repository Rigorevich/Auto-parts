import { useMutation, useQuery } from '@tanstack/react-query';

import { showErrowMessageWithMessage } from '../utils/showErrowMessage';
import { showSuccessMessage } from '../utils/showSuccessMessage';
import feedbacksApi from '../api/feedbacks';

export const useGetAllFeedbacks = (autopartId: string = '', sortBy: 'default' | 'rating') => {
  const {
    data: feedbacksData,
    isError: isFeedbacksError,
    isLoading: isFeedbacksLoading,
    refetch: refetchFeedbacks,
  } = useQuery({
    queryKey: ['feedbacks', autopartId, sortBy],
    queryFn: () => feedbacksApi.getAllFeedbacks(autopartId, sortBy),
    refetchOnWindowFocus: false,
    retry: true,
    enabled: !!autopartId,
  });

  return {
    feedbacks: feedbacksData?.result.feedbacks,
    averageRating: feedbacksData?.result.averageRating,
    refetchFeedbacks,
    isFeedbacksError,
    isFeedbacksLoading,
  };
};

export const useCreateFeedback = (onSettled?: VoidFunction) => {
  const {
    mutate: createFeedback,
    isPending: isPendingCreate,
    isError: isErrorCreate,
  } = useMutation({
    mutationFn: ({
      autopartId,
      accountId,
      feedback,
      rating,
    }: {
      autopartId: string;
      accountId: string;
      feedback: string;
      rating: string;
    }) => feedbacksApi.createFeedback(autopartId, accountId, rating, feedback),
    onSettled,
    onSuccess: () => showSuccessMessage('Отзыв успешно добавлен!'),
    onError: () => showErrowMessageWithMessage('Не удалось добавить отзыв!'),
  });

  return { createFeedback, isPendingCreate, isErrorCreate };
};

export const useDeleteFeedback = (onSettled?: VoidFunction) => {
  const {
    mutate: deleteFeedback,
    isPending: isPendingDelete,
    isError: isErrorDelete,
  } = useMutation({
    mutationFn: (id: string) => feedbacksApi.deleteFeedback(id),
    onSettled,
    onSuccess: () => showSuccessMessage('Отзыв успешно удален!'),
    onError: () => showErrowMessageWithMessage('Не удалось удалить отзыв!'),
  });

  return { deleteFeedback, isPendingDelete, isErrorDelete };
};
