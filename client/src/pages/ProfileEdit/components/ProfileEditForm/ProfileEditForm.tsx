import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';

import { AccountClient } from '../../../../api/axios';
import { showErrowMessage, showErrowMessageWithMessage } from '../../../../utils/showErrowMessage';
import { showSuccessMessage } from '../../../../utils/showSuccessMessage';
import { AuthContext, AuthContextInterface } from '../../../../context/AuthContext';
import { profileEditSchema } from '../../../../utils/validationForms';
import { Input } from '../../../../components/ui/Input/Input';

import styles from './ProfileEditForm.module.scss';

type FormValues = {
  name?: string;
  surname?: string;
  phone_number?: string;
};

export const ProfileEditForm = () => {
  const { accountData, setAccountData } = useContext(AuthContext) as AuthContextInterface;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(profileEditSchema),
    defaultValues: {
      surname: accountData?.surname ?? '',
      name: accountData?.name ?? '',
      phone_number: accountData?.phone_number ?? '',
    },
  });

  const handleSubmitForm = async (formValue: FormValues) => {
    if (
      formValue.name === accountData?.name &&
      formValue.surname === accountData?.surname &&
      formValue.phone_number === accountData?.phone_number
    ) {
      return showErrowMessageWithMessage('Новые данные совпадают с текущими');
    }

    try {
      const updatedAccount = await AccountClient.patch(`/${accountData?.id}`, {
        ...formValue,
      });

      setAccountData(updatedAccount.data.result);
      showSuccessMessage('Данные успешно обновлены');
    } catch (error) {
      showErrowMessage(error);
    }
  };

  return (
    <form
      className={styles.profileEditForm}
      onSubmit={handleSubmit(handleSubmitForm)}
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
        label="Имя"
        autoComplete="off"
        placeholder="Введите ваше имя"
        register={register}
        status={errors.name && 'error'}
        description={errors?.name?.message}
      />
      <Input
        name="phone_number"
        label="Номер телефона"
        autoComplete="off"
        placeholder="Введите ваш номер телефона"
        register={register}
        status={errors.phone_number && 'error'}
        description={errors?.phone_number?.message}
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
