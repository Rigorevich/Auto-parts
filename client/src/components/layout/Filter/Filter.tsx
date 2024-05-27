import { FC, useContext } from 'react';
import { Button } from '@mantine/core';

import {
  useGetCarBodyTypes,
  useGetCarBrands,
  useGetCarEngines,
  useGetCarGenerations,
  useGetCarModels,
  useGetCarModifications,
} from '../../../queries/car-attributes.query';
import { AuthContext, AuthContextInterface } from '../../../context/AuthContext';
import { useFilter, FilterType } from '../../../hooks/useFilter';

import { FilterSelect } from './FilterSelect/FilterSelect';

import styles from './Filter.module.scss';

interface FilterProps {
  onDestroy?: VoidFunction;
  buttonLabel?: string;
}

export const Filter: FC<FilterProps> = ({ buttonLabel = 'Искать', onDestroy }) => {
  const { cars, setCars } = useContext(AuthContext) as AuthContextInterface;
  const { attributes, dispatch } = useFilter();

  const { brands, isBrandsLoading } = useGetCarBrands();
  const { models, isModelsLoading } = useGetCarModels(attributes.brand?.value || '');
  const { generations, isGenerationsLoading } = useGetCarGenerations(attributes.model?.value || '');
  const { engines, isEnginesLoading } = useGetCarEngines(attributes.generation?.value || '');
  const { bodyTypes, isBodyTypesLoading } = useGetCarBodyTypes(attributes.generation?.value || '');
  const { modifications, isModificationsLoading } = useGetCarModifications(
    attributes.engine?.value || '',
    attributes.generation?.value || '',
    attributes.bodyType?.value || ''
  );

  const handleSearch = () => {
    const updatedCars = [
      ...cars.map((car) => ({ ...car, active: false })),
      { id: attributes.modification?.value || '', active: true },
    ];

    setCars(updatedCars);
    localStorage.setItem('modifications', JSON.stringify(updatedCars));

    onDestroy?.();
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__content}>
        <div className={styles.filter__title}>Выбор по параметрам автомобиля</div>
        <div className={styles.filter__selects}>
          <FilterSelect
            data={brands}
            value={attributes.brand?.value}
            onChange={(value, option) => dispatch({ type: FilterType.BRAND, payload: { value, option } })}
            placeholder="Марка"
            isLoading={isBrandsLoading}
          />
          <FilterSelect
            data={models}
            value={attributes.model?.value}
            onChange={(value, option) => dispatch({ type: FilterType.MODEL, payload: { value, option } })}
            placeholder="Модель"
            isLoading={isModelsLoading}
          />
          <FilterSelect
            data={generations}
            value={attributes.generation?.value}
            onChange={(value, option) => dispatch({ type: FilterType.GENERATION, payload: { value, option } })}
            placeholder="Поколение"
            isLoading={isGenerationsLoading}
          />
          <FilterSelect
            data={bodyTypes}
            value={attributes.bodyType?.value}
            onChange={(value, option) => dispatch({ type: FilterType.BODY_TYPE, payload: { value, option } })}
            searchable={false}
            placeholder="Кузов"
            isLoading={isBodyTypesLoading}
          />
          <FilterSelect
            data={engines}
            value={attributes.engine?.value}
            onChange={(value, option) => dispatch({ type: FilterType.ENGINE, payload: { value, option } })}
            searchable={false}
            placeholder="Двигатель"
            isLoading={isEnginesLoading}
          />
          <FilterSelect
            data={modifications}
            value={attributes.modification?.value}
            onChange={(value, option) => dispatch({ type: FilterType.MODIFICATION, payload: { value, option } })}
            searchable={false}
            placeholder="Модификация"
            isLoading={isModificationsLoading}
          />
        </div>
        <div className={styles.filter__actions}>
          <Button
            color="orange"
            onClick={handleSearch}
            disabled={!attributes.modification}
          >
            {buttonLabel}
          </Button>
          <Button onClick={() => dispatch({ type: FilterType.RESET, payload: null })}>Очистить фильтр</Button>
        </div>
      </div>
    </div>
  );
};
