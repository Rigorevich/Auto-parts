import { FC } from 'react';
import { Select } from '@mantine/core';

import {
  useGetCarBrands,
  useGetCarEngines,
  useGetCarGenerations,
  useGetCarModels,
  useGetCarModifications,
} from '../../../queries/car-attributes.query';

import styles from './Filter.module.scss';

export const Filter: FC = () => {
  const { brands, isBrandsLoading } = useGetCarBrands();

  return (
    <div className={styles.filter}>
      <div className={styles.filter__content}>
        <div className={styles.filter__title}>Выбор по параметрам автомобиля</div>
        <div className={styles.filter__selects}>
          <Select
            data={brands?.map((brand) => brand.name)}
            className={styles.filter__select}
            placeholder="Выберите марку"
          />
          <Select
            className={styles.filter__select}
            placeholder="Выберите модель"
          />
          <Select
            className={styles.filter__select}
            placeholder="Выберите поколение"
          />
          <Select
            className={styles.filter__select}
            placeholder="Выберите кузов"
          />
          <Select
            className={styles.filter__select}
            placeholder="Выберите двигатель"
          />
          <Select
            className={styles.filter__select}
            placeholder="Выберите модификацию"
          />
        </div>
      </div>
    </div>
  );
};
