import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IconShare, IconHeart } from '@tabler/icons-react';

import { AuthContext, AuthContextInterface } from '../../../../context/AuthContext';

import styles from './AutopartHeader.module.scss';

export interface AutopartHeaderProps {
  name?: string;
  autopartId: string;
}

export const AutopartHeader: FC<AutopartHeaderProps> = ({ name, autopartId }) => {
  const { favorites, setFavorites } = useContext(AuthContext) as AuthContextInterface;

  const isFavorite = favorites.includes(autopartId);

  const handleFavorite = () => {
    const updatedFavorites = isFavorite ? favorites.filter((fav) => fav !== autopartId) : [...favorites, autopartId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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
          onClick={handleFavorite}
        >
          <IconHeart fill={isFavorite ? '#2974ff' : '#ffffff'} />
          <span>В избранное</span>
        </Link>
      </div>
    </div>
  );
};
