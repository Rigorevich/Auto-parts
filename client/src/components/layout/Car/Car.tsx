import { FC } from 'react';
import { Button, Image, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { GarageIcon } from '../../ui/Icons/Icons';
import { useGetCar } from '../../../queries/car-attributes.query';
import { PAGES } from '../../../constants/pages';

import styles from './Car.module.scss';

export interface CarProps {
  modificationId: string;
}

export const Car: FC<CarProps> = ({ modificationId }) => {
  const { car, isCarLoading } = useGetCar(modificationId);

  const navigate = useNavigate();

  return (
    <div className={styles.modification}>
      <div className={styles.modification__left}>
        <GarageIcon className={styles.modification__icon} />
        <span className={styles.modification__section}>Мои авто</span>
      </div>
      <div className={styles.modification__middle}>
        <div className={styles.modification__image}>
          <Image src="https://i.pinimg.com/564x/0b/bd/40/0bbd401a93133fd3c309ef5b72f41a4f.jpg" />
        </div>
        {isCarLoading ? (
          <Loader type="dots" />
        ) : (
          <div className={styles.modification__description}>
            <span className={styles.modification__name}>
              {car?.brand.name} {car?.model.name} {car?.generation.name}
            </span>
            <span className={styles.modification__info}>
              {car?.modification.body_type}, {car?.modification.engine}, {car?.modification.name} |{' '}
              {car?.generation.year_start} - {car?.generation.year_end || '2024'}
            </span>
          </div>
        )}
      </div>
      <Button
        color="orange"
        className={styles.modification__right}
        onClick={() => navigate(PAGES.MY_CARS)}
      >
        Добавить авто
      </Button>
    </div>
  );
};
