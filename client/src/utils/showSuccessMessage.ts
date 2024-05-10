import { enqueueSnackbar } from 'notistack';

export const showSuccessMessage = (successMessage: string) => enqueueSnackbar(successMessage, { variant: 'success' });
