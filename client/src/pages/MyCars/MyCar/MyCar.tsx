import { FC } from 'react';
import { Button, Checkbox, Loader } from '@mantine/core';

import { useGetCar } from '../../../queries/car-attributes.query';

import styles from './MyCar.module.scss';

type MyCarProps = {
  modificationId: string;
  active: boolean;
  onDelete: VoidFunction;
  onChange: VoidFunction;
};

export const MyCar: FC<MyCarProps> = ({ modificationId, active, onDelete, onChange }) => {
  const { car, isCarLoading } = useGetCar(modificationId);

  if (isCarLoading) {
    return <Loader type="dots" />;
  }

  return (
    <li className={styles.myCar__item}>
      <Checkbox
        className={styles.myCar__checkbox}
        checked={active}
        onChange={onChange}
      />
      <span className={styles.myCar__auto}>
        {car?.brand.name} {car?.model.name} {car?.generation.name} | {car?.modification.body_type},{' '}
        {car?.modification.engine}, {car?.modification.name} | {car?.generation.year_start} -{' '}
        {car?.generation.year_end || '2024'}
      </span>
      <Button
        className={styles.myCar__delete}
        color="red"
        onClick={onDelete}
      >
        Удалить
      </Button>
    </li>
  );
};
