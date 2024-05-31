import { FC, useContext } from 'react';

import { AuthContext, AuthContextInterface } from '../../context/AuthContext';
import { setDataToLocalStorage } from '../../utils/localStorage';

import { Card } from './components/Card/Card';

import styles from './Favorites.module.scss';

const Favorites: FC = () => {
  const { favorites, setFavorites } = useContext(AuthContext) as AuthContextInterface;

  const handleDeleteFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav !== id);

    setFavorites(updatedFavorites);
    setDataToLocalStorage('favorites', updatedFavorites);
  };

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__container}>
        {favorites.length ? (
          favorites.map((id) => (
            <Card
              key={id}
              autopartId={id}
              onDelete={() => handleDeleteFavorite(id)}
            />
          ))
        ) : (
          <h2 className={styles.noFavorites}>Избранное пока пусто</h2>
        )}
      </div>
    </div>
  );
};

export default Favorites;
