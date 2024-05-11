import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';

import { profileEditSchema } from '../../../../utils/validationForms';
import { Input } from '../../../../components/ui/Input/Input';

import styles from './ProfileEditForm.module.scss';

type FormValues = {
  name: string;
  surname?: string;
  patronymic?: string;
};

export const ProfileEditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(profileEditSchema),
  });

  return (
    <form
      className={styles.profileEditForm}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <h3 className={styles.profileEditForm__title}>Персональные данные</h3>
      <Input
        name="surname"
        label="Фамилия"
        autoComplete="off"
        placeholder="Введите вашу фамилию"
        register={register}
        status={errors.surname && 'error'}
        description={errors?.surname?.message}
      />
      <Input
        name="name"
        label="Имя *"
        autoComplete="off"
        placeholder="Введите ваше имя"
        register={register}
        status={errors.name && 'error'}
        description={errors?.name?.message}
      />
      <Input
        name="patronymic"
        label="Отчество"
        autoComplete="off"
        placeholder="Введите ваше отчество"
        register={register}
        status={errors.patronymic && 'error'}
        description={errors?.patronymic?.message}
      />
      <Button
        type="submit"
        color="blue"
        size="md"
        className={styles.profileEditForm__submit}
        disabled={isSubmitting}
      >
        Сохранить
      </Button>
    </form>
  );
};
