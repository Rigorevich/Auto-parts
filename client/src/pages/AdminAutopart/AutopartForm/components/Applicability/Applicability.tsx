import { ChangeEventHandler, FC, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox, Select, Button, Loader } from '@mantine/core';

import { FilterType, AttributesState, useFilter } from '../../../../../hooks/useFilter';
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
  const {
    setValue,
    formState: { isSubmitSuccessful },
    reset,
  } = useFormContext();
  const { attributes, dispatch } = useFilter();

  const [selectedAttributes, setSelectedAttributes] = useState<AttributesState<any>[]>([]);
  const [allCars, setAllCars] = useState(false);

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

  const handleSelectModification = (value: string | null, option: any) => {
    setSelectedAttributes((prev) => [...prev, { ...attributes, modification: { value, option } }]);

    dispatch({ type: FilterType.RESET, payload: null });
  };

  const handleDeleteModification = (value?: string | null) => {
    setSelectedAttributes((prev) => prev.filter((attribute) => attribute.modification?.value !== value));
  };

  const handleChangeAllCars: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAllCars(event.target.checked);
    setSelectedAttributes([]);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      dispatch({ type: FilterType.RESET, payload: null });
      setSelectedAttributes([]);
      setAllCars(false);
      reset(undefined);
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setValue('applicability.applicability', selectedAttributes);
    setValue('applicability.allCars', allCars);
  }, [selectedAttributes, allCars]);

  return (
    <div className={styles.applicability}>
      <h2 className={styles.applicability__title}>Применимость к авто</h2>
      {selectedAttributes.length > 0 && (
        <div className={styles.applicability__selected}>
          {selectedAttributes.map((attribute, index) => (
            <div
              className={styles.attribute}
              key={index}
            >
              <div className={styles.name}>
                {attribute.brand?.option.label} {attribute.model?.option.label} {attribute.generation?.option.label} |{' '}
                {attribute.bodyType?.option.label} | {attribute.engine?.option.label} |{' '}
                {attribute.modification?.option.label}
              </div>
              <Button
                className={styles.delete}
                onClick={() => handleDeleteModification(attribute.modification?.value)}
                size="xs"
              >
                Удалить
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className={styles.applicability__modifications}>
        <Checkbox
          label="Запчасть подходит для всех автомобилей"
          checked={allCars}
          onChange={handleChangeAllCars}
        />
        {!allCars && (
          <div className={styles.selects}>
            <Select
              searchable
              data={brands}
              className={styles.select}
              value={attributes.brand?.value || null}
              onChange={(value, option) => dispatch({ type: FilterType.BRAND, payload: { value, option } })}
              label="Марка авто"
              rightSection={isBrandsLoading && <Loader size="xs" />}
              placeholder="Выберите марку"
            />
            <Select
              searchable
              data={models}
              className={styles.select}
              value={attributes.model?.value || null}
              onChange={(value, option) => dispatch({ type: FilterType.MODEL, payload: { value, option } })}
              label="Модель авто"
              rightSection={isModelsLoading && <Loader size="xs" />}
              placeholder="Выберите модель"
            />
            <Select
              data={generations}
              className={styles.select}
              value={attributes.generation?.value || null}
              onChange={(value, option) => dispatch({ type: FilterType.GENERATION, payload: { value, option } })}
              label="Поколение авто"
              rightSection={isGenerationsLoading && <Loader size="xs" />}
              placeholder="Выберите поколение"
            />
            <Select
              data={bodyTypes}
              className={styles.select}
              value={attributes.bodyType?.value || null}
              onChange={(value, option) => dispatch({ type: FilterType.BODY_TYPE, payload: { value, option } })}
              label="Кузов авто"
              rightSection={isBodyTypesLoading && <Loader size="xs" />}
              placeholder="Выберите кузов"
            />
            <Select
              data={engines}
              className={styles.select}
              value={attributes.engine?.value || null}
              onChange={(value, option) => dispatch({ type: FilterType.ENGINE, payload: { value, option } })}
              label="Двигатель авто"
              rightSection={isEnginesLoading && <Loader size="xs" />}
              placeholder="Выберите двигатель"
            />
            <Select
              data={modifications}
              className={styles.select}
              value={attributes.modification?.value || null}
              onChange={handleSelectModification}
              label="Модификация авто"
              rightSection={isModificationsLoading && <Loader size="xs" />}
              placeholder="Выберите модификацию"
            />
          </div>
        )}
      </div>
    </div>
  );
};
