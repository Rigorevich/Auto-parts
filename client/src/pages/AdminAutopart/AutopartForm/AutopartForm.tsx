import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';
import yup from 'yup';

import { autopartSchema } from '../../../utils/validationForms';

import { Applicability } from './components/Applicability/Applicability';
import { MainInfo } from './components/MainInfo/MainInfo';
import { Attributes } from './components/Attributes/Attributes';

import styles from './AutopartForm.module.scss';

export const AutopartForm = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(autopartSchema),
  });

  const handleSubmitForm = (formValues: yup.InferType<typeof autopartSchema>) => {
    console.log(formValues);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.autopartForm}
        onSubmit={methods.handleSubmit(handleSubmitForm)}
      >
        <MainInfo />
        <Applicability />
        <Attributes />
        <Button
          className={styles.addAutopart}
          type="submit"
        >
          Добавить запчасть
        </Button>
      </form>
    </FormProvider>
  );
};
