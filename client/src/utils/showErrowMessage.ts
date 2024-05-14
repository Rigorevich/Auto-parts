import { enqueueSnackbar } from 'notistack';

export const showErrowMessage = (error: any) => enqueueSnackbar(error?.response?.data?.error, { variant: 'error' });

export const showErrowMessageWithMessage = (message: string) => enqueueSnackbar(message, { variant: 'error' });
