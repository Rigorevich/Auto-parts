import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IconShare, IconHeart } from '@tabler/icons-react';

import styles from './AutopartHeader.module.scss';

export interface AutopartHeaderProps {
  name?: string;
}

export const AutopartHeader: FC<AutopartHeaderProps> = ({ name }) => {
  return (
    <div className={styles.autopart__header}>
      <h2 className={styles.title}>{name}</h2>
      <div className={styles.links}>
        <Link
          className={styles.link}
          to="#"
        >
          Написать отзыв
        </Link>
        <Link
          className={styles.link}
          to="#"
        >
          <IconShare />
          <span>Поделиться</span>
        </Link>
        <Link
          className={styles.link}
          to="#"
        >
          <IconHeart />
          <span>В избранное</span>
        </Link>
      </div>
    </div>
  );
};
