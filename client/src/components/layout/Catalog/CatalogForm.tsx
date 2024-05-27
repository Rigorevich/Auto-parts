import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Image } from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';

import { catalogSchema } from '../../../utils/validationForms';
import { Input } from '../../ui/Input/Input';

import styles from './CatalogForm.module.scss';

interface FormValues {
  name: string;
  image: any;
}

export interface CatalogFormProps {
  onSubmit: (formValue: FormValues) => void;
}

export const CatalogForm: FC<CatalogFormProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(catalogSchema),
  });

  const handleSubmitForm = (formValue: FormValues) => {
    onSubmit(formValue);
  };

  return (
    <form
      className={styles.сatalogForm}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Input
        name="name"
        label="Название"
        placeholder="Введите название"
        autoComplete="off"
        register={register}
        status={errors.name && 'error'}
        description={errors?.name?.message}
      />
      {file && (
        <Image
          className={styles.image}
          src={URL.createObjectURL(file)}
          alt="Изображение"
        />
      )}
      <Input
        name="image"
        type="file"
        label="Изображение"
        placeholder="Выберите изображение"
        onChange={(event) => setFile(event.target.files?.[0])}
        autoComplete="off"
        register={register}
        status={errors.name && 'error'}
        description={errors?.image?.message as string}
      />
      <Button
        type="submit"
        disabled={isSubmitting}
      >
        Создать
      </Button>
    </form>
  );
};
