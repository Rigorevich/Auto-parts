import { api_config } from './api_config';
import { Account, axiosInstance } from './axios';

export interface Feedback {
  id: number;
  feedback: string;
  rating: string;
  autopart_id: string;
  account_id: string;
  account?: Account;
}

const feedbacksApi = {
  getAllFeedbacks: async (autopartId: string, sortBy: 'default' | 'rating') => {
    const route = api_config.API_URL + '/feedbacks/' + autopartId;

    const { data } = await axiosInstance.get<{ result: { feedbacks: Feedback[]; averageRating: number } }>(route, {
      params: { sortBy },
    });

    return data;
  },

  deleteFeedback: async (id: string) => {
    const route = api_config.API_URL + '/feedbacks/delete/' + id;

    const { data } = await axiosInstance.delete<{ result: { feedback: Feedback } }>(route);

    return data;
  },

  createFeedback: async (autopartId: string, accountId: string, rating: string, feedback: string) => {
    const route = api_config.API_URL + '/feedbacks/create';

    const { data } = await axiosInstance.post<{ result: { feedback: Feedback } }>(route, {
      autopartId,
      accountId,
      rating,
      feedback,
    });

    return data;
  },
};

export default feedbacksApi;
