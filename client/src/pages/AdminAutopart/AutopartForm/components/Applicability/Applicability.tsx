import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Select, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import {
  useGetCarBodyTypes,
  useGetCarBrands,
  useGetCarEngines,
  useGetCarGenerations,
  useGetCarModels,
  useGetCarModifications,
} from '../../../../../queries/car-attributes.query';

import styles from './Applicability.module.scss';

export interface ApplicabilityProps {}

export const Applicability: FC<ApplicabilityProps> = () => {
  const { control, watch } = useFormContext();

  const brand = watch('applicability.brand');
  const model = watch('applicability.model');
  const generation = watch('applicability.generation');
  const bodyType = watch('applicability.body');
  const engine = watch('applicability.engine');

  const { brands } = useGetCarBrands();
  const { models } = useGetCarModels(brand);
  const { generations } = useGetCarGenerations(model);
  const { engines } = useGetCarEngines(generation);
  const { bodyTypes } = useGetCarBodyTypes(generation);
  const { modifications } = useGetCarModifications(engine, generation, bodyType);

  return (
    <div className={styles.applicability}>
      <h2 className={styles.applicability__title}>Применимость к авто</h2>
      <div className={styles.applicability__modifications}>
        <Controller
          name="applicability.allCars"
          control={control}
          render={({ field: { value, ...field } }) => (
            <Checkbox
              {...field}
              label="Запчасть подходит для всех автомобилей"
              checked={value}
            />
          )}
        />
        <div className={styles.selects}>
          <Controller
            name="applicability.brand"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                data={brands}
                className={styles.select}
                label="Марка авто"
                placeholder="Выберите марку"
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="applicability.model"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                data={models}
                className={styles.select}
                label="Модель авто"
                placeholder="Выберите модель"
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="applicability.generation"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                data={generations}
                className={styles.select}
                label="Поколение авто"
                placeholder="Выберите поколение"
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="applicability.body"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                data={bodyTypes}
                className={styles.select}
                label="Кузов авто"
                placeholder="Выберите кузов"
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="applicability.engine"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                data={engines}
                className={styles.select}
                label="Двигатель авто"
                placeholder="Выберите двигатель"
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="applicability.modification"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                data={modifications}
                className={styles.select}
                label="Модификация авто"
                placeholder="Выберите модификацию"
                error={fieldState.error?.message}
              />
            )}
          />
        </div>
        <Button
          className={styles.addModification}
          leftSection={<IconPlus />}
        >
          Добавить модификацию
        </Button>
      </div>
    </div>
  );
};
