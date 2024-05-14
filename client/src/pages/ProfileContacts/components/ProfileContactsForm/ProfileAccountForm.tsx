import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';

import { AuthContext, AuthContextInterface } from '../../../../context/AuthContext';
import { AccountClient } from '../../../../api/axios';
import { showErrowMessage, showErrowMessageWithMessage } from '../../../../utils/showErrowMessage';
import { showSuccessMessage } from '../../../../utils/showSuccessMessage';
import { profileAccountSchema } from '../../../../utils/validationForms';
import { Input } from '../../../../components/ui/Input/Input';

import styles from './ProfileAccountForm.module.scss';

type FormValues = {
  email: string;
  password?: string;
};

export const ProfileAccountForm = () => {
  const { accountData, setAccountData } = useContext(AuthContext) as AuthContextInterface;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(profileAccountSchema),
    defaultValues: {
      email: accountData?.email,
    },
  });

  const handleSubmitForm = async (formValue: FormValues) => {
    if (formValue.email === accountData?.email && formValue.password === accountData?.password) {
      return showErrowMessageWithMessage('Новые данные совпадают с текущими');
    }

    try {
      const updatedAccount = await AccountClient.patch(`/${accountData?.id}`, {
        ...formValue,
      });

      setAccountData(updatedAccount.data.result);
      setValue('password', '');
      showSuccessMessage('Данные успешно обновлены');
    } catch (error) {
      showErrowMessage(error);
    }
  };

  return (
    <form
      className={styles.profileContactsForm}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <h3 className={styles.profileContactsForm__title}>Данные для входа в аккаунт</h3>
      <Input
        name="email"
        label="Электронная почта"
        autoComplete="off"
        placeholder="Введите вашу электронную почту"
        register={register}
        status={errors.email && 'error'}
        description={errors?.email?.message}
      />
      <Input
        type="password"
        name="password"
        label="Пароль"
        autoComplete="off"
        placeholder="Введите новый пароль"
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
