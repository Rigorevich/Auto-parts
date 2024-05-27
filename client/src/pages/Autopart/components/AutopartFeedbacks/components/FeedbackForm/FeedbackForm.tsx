import { FC, useContext } from 'react';
import { Textarea, Rating, Button } from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Yup from 'yup';

import { AuthContext, AuthContextInterface } from '../../../../../../context/AuthContext';
import { feedbackSchema } from '../../../../../../utils/validationForms';
import { useCreateFeedback } from '../../../../../../queries/feedbacks';

import styles from './FeedbackForm.module.scss';

type FormValues = Yup.InferType<typeof feedbackSchema>;

interface FeedbackFormProps {
  autopartId?: string;
  onSubmit: VoidFunction;
}

export const FeedbackForm: FC<FeedbackFormProps> = ({ autopartId, onSubmit }) => {
  const { accountData } = useContext(AuthContext) as AuthContextInterface;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ mode: 'onChange', resolver: yupResolver(feedbackSchema) });
  const { createFeedback } = useCreateFeedback(onSubmit);

  const handleSubmitForm = ({ feedback, rating }: FormValues) => {
    if (autopartId && accountData?.id) {
      createFeedback({ feedback, rating: `${rating}`, autopartId, accountId: `${accountData.id}` });
    }
  };

  return (
    <form
      className={styles.feedbackForm}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Controller
        name="rating"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <Rating
              {...field}
              size="lg"
            />
            {fieldState.error?.message && <span className={styles.ratingError}>{fieldState.error?.message}</span>}
          </div>
        )}
      />
      <Controller
        name="feedback"
        control={control}
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            placeholder="Оставьте отзыв"
            rows={5}
            error={fieldState.error?.message}
          />
        )}
      />

      <Button
        type="submit"
        className={styles.submit}
        color="orange"
        disabled={isSubmitting}
      >
        Отправить
      </Button>
    </form>
  );
};
