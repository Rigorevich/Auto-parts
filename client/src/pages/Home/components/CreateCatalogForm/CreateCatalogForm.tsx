import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, LoadingOverlay } from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';

import { useCreateCatalog } from '../../../../queries/catalogs.query';
import { catalogSchema } from '../../../../utils/validationForms';
import { Input } from '../../../../components/ui/Input/Input';

import styles from './CreateCatalogForm.module.scss';

export interface CreateCatalogFormProps {
  onSubmit: VoidFunction;
}

interface FormValues {
  name: string;
  image: any;
}

export const CreateCatalogForm: FC<CreateCatalogFormProps> = ({ onSubmit }) => {
  const { createCatalog, isPending } = useCreateCatalog();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(catalogSchema),
  });

  const handleSubmitForm = (formValue: FormValues) => {
    createCatalog({ name: formValue.name, image: formValue.image[0] });
    onSubmit();
  };

  if (isPending) {
    <LoadingOverlay
      visible
      zIndex={1000}
      overlayProps={{ radius: 'md' }}
    />;
  }

  return (
    <form
      className={styles.createCatalogForm}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Input
        name="name"
        label="Название каталога"
        autoComplete="off"
        placeholder="Введите название каталога"
        register={register}
        status={errors.name && 'error'}
        description={errors?.name?.message}
      />
      <Input
        name="image"
        type="file"
        label="Изображение каталога"
        autoComplete="off"
        placeholder="Выберите изображение каталога"
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
