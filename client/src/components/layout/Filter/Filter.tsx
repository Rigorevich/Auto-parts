import { FC, useContext, useMemo, useReducer } from 'react';
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

import { FilterSelect } from './FilterSelect/FilterSelect';

import styles from './Filter.module.scss';

enum FilterType {
  Brand = 'brand',
  Model = 'model',
  Generation = 'generation',
  Engine = 'engine',
  BodyType = 'bodyType',
  Modification = 'modification',
  Reset = 'reset',
}

interface AttributesState {
  [key: string]: string | null;
}

interface FilterProps {
  onDestroy?: VoidFunction;
  buttonLabel?: string;
}

const initialState: AttributesState = {
  brand: null,
  model: null,
  generation: null,
  engine: null,
  bodyType: null,
  modification: null,
};

const attributesReducer = (
  state: AttributesState,
  action: {
    type: FilterType;
    payload: string | null;
  }
) => {
  switch (action.type) {
    case FilterType.Brand:
      return {
        brand: action.payload,
        model: null,
        generation: null,
        engine: null,
        bodyType: null,
        modification: null,
      };
    case FilterType.Model:
      return { ...state, model: action.payload, generation: null, engine: null, bodyType: null, modification: null };
    case FilterType.Generation:
      return { ...state, generation: action.payload, engine: null, bodyType: null, modification: null };
    case FilterType.Engine:
      return { ...state, engine: action.payload, modification: null };
    case FilterType.BodyType:
      return { ...state, bodyType: action.payload, modification: null };
    case FilterType.Modification:
      return { ...state, modification: action.payload };
    case FilterType.Reset:
      return initialState;
    default:
      return state;
  }
};

export const Filter: FC<FilterProps> = ({ buttonLabel = 'Искать', onDestroy }) => {
  const { cars, setCars } = useContext(AuthContext) as AuthContextInterface;
  const [attributes, dispatch] = useReducer(attributesReducer, initialState);

  const { brands, isBrandsLoading } = useGetCarBrands();
  const { models, isModelsLoading } = useGetCarModels(attributes.brand || '');
  const { generations, isGenerationsLoading } = useGetCarGenerations(attributes.model || '');
  const { engines, isEnginesLoading } = useGetCarEngines(attributes.generation || '');
  const { bodyTypes, isBodyTypesLoading } = useGetCarBodyTypes(attributes.generation || '');
  const { modifications, isModificationsLoading } = useGetCarModifications(
    attributes.engine || '',
    attributes.generation || '',
    attributes.bodyType || ''
  );

  const handleSearch = () => {
    const updatedCars = [
      ...cars.map((car) => ({ ...car, active: false })),
      { id: attributes.modification || '', active: true },
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
            value={attributes.brand}
            onChange={(value) => dispatch({ type: FilterType.Brand, payload: value })}
            placeholder="Марка"
            isLoading={isBrandsLoading}
          />
          <FilterSelect
            data={models}
            value={attributes.model}
            onChange={(value) => dispatch({ type: FilterType.Model, payload: value })}
            placeholder="Модель"
            isLoading={isModelsLoading}
          />
          <FilterSelect
            data={generations}
            value={attributes.generation}
            onChange={(value) => dispatch({ type: FilterType.Generation, payload: value })}
            placeholder="Поколение"
            isLoading={isGenerationsLoading}
          />
          <FilterSelect
            data={bodyTypes}
            value={attributes.bodyType}
            onChange={(value) => dispatch({ type: FilterType.BodyType, payload: value })}
            searchable={false}
            placeholder="Кузов"
            isLoading={isBodyTypesLoading}
          />
          <FilterSelect
            data={engines}
            value={attributes.engine}
            onChange={(value) => dispatch({ type: FilterType.Engine, payload: value })}
            searchable={false}
            placeholder="Двигатель"
            isLoading={isEnginesLoading}
          />
          <FilterSelect
            data={modifications}
            value={attributes.modification}
            onChange={(value) => dispatch({ type: FilterType.Modification, payload: value })}
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
          <Button onClick={() => dispatch({ type: FilterType.Reset, payload: null })}>Очистить фильтр</Button>
        </div>
      </div>
    </div>
  );
};
