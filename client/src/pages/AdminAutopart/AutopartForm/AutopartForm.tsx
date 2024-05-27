import { useForm, FormProvider } from 'react-hook-form';
import { Button, LoadingOverlay } from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'react-router-dom';
import yup from 'yup';

import { autopartSchema } from '../../../utils/validationForms';
import { useCreateAutopart } from '../../../queries/autoparts.query';

import { Applicability } from './components/Applicability/Applicability';
import { MainInfo } from './components/MainInfo/MainInfo';
import { Attributes } from './components/Attributes/Attributes';

import styles from './AutopartForm.module.scss';

export type FormValues = yup.InferType<typeof autopartSchema>;

export const AutopartForm = () => {
  const [searchParams] = useSearchParams();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(autopartSchema),
  });
  const { createAutopart, isPending } = useCreateAutopart();

  const handleSubmitForm = ({ mainInfo, attributes: autoAttributes, applicability: autoApplicability }: FormValues) => {
    const { partName, description, price, quantity, discount } = mainInfo;
    const { attributes, images } = autoAttributes;
    const { allCars, applicability } = autoApplicability;
    const subcategoryId = searchParams.get('subcategoryId');

    if (!attributes || !images || (!applicability && !allCars) || !subcategoryId) {
      return;
    }

    createAutopart({
      subcategoryId: subcategoryId,
      name: partName,
      description: description,
      price: `${price}`,
      quantity: `${quantity}`,
      discount: `${discount || 0}`,
      images: images || [],
      attributes: attributes || [],
      modifications: applicability?.map((app) => app.modification.value) || [],
      universal: !!allCars,
    });
  };

  return (
    <FormProvider {...methods}>
      <LoadingOverlay visible={isPending} />
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
