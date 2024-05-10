import { enqueueSnackbar } from 'notistack';

export const showErrowMessage = (error: any) => enqueueSnackbar(error?.response?.data?.error, { variant: 'error' });
