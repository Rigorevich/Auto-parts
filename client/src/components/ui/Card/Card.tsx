import { FC } from 'react';
import { Image } from '@mantine/core';
import classNames from 'classnames';

import { PlusIcon } from '../Icons/Icons';

import styles from './Card.module.scss';

export interface CardOptions {
  name: string;
  route?: string;
  image: string;
}

export interface CardProps {
  option: CardOptions;
}

export interface CardAddItemProps {
  onAdd: VoidFunction;
}

export const CardAddItem: FC<CardAddItemProps> = ({ onAdd }) => {
  return (
    <button
      className={classNames(styles.card, styles.card__add)}
      onClick={onAdd}
    >
      <PlusIcon />
    </button>
  );
};

export const Card: FC<CardProps> = ({ option }) => {
  return (
    <button className={styles.card}>
      <div className={styles.card__image}>
        <Image
          src={option.image}
          alt={option.name}
        />
      </div>
      <div className={styles.card__name}>{option.name}</div>
    </button>
  );
};
