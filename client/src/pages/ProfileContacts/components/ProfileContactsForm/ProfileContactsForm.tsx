import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';

import { profileContactsSchema } from '../../../../utils/validationForms';
import { Input } from '../../../../components/ui/Input/Input';

import styles from './ProfileContactsForm.module.scss';

type FormValues = {
  phone: string;
  email?: string;
};

export const ProfileContactsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(profileContactsSchema),
  });

  return (
    <form
      className={styles.profileContactsForm}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <h3 className={styles.profileContactsForm__title}>Контактная информация</h3>
      <Input
        name="phone"
        label="Номер телефона *"
        autoComplete="off"
        placeholder="Введите ваш номер телефона"
        register={register}
        status={errors.phone && 'error'}
        description={errors?.phone?.message}
      />
      <Input
        name="email"
        label="Электронная почта"
        autoComplete="off"
        placeholder="Введите вашу электронную почту"
        register={register}
        status={errors.email && 'error'}
        description={errors?.email?.message}
      />
      <Button
        type="submit"
        color="blue"
        size="md"
        className={styles.profileContactsForm__submit}
        disabled={isSubmitting}
      >
        Сохранить
      </Button>
    </form>
  );
};
