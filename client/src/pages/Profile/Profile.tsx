import { useContext } from 'react';

import { Button } from '../../components/ui/Button/Button';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';

import styles from './Profile.module.scss';

const Profile = () => {
  const { data, handleFetchProtected, handleLogOut } = useContext(AuthContext) as AuthContextInterface;

  return (
    <main className={styles.profile}>
      <div className={styles.profile__container}>
        <h2 className={styles.profile__title}>Личный профиль</h2>
        <div className={styles.profile__content}>{JSON.stringify(data)}</div>
        <div className={styles.profile__buttons}>
          <Button onClick={handleFetchProtected}>Защищенный запрос</Button>
          <Button onClick={handleLogOut}>Выйти из аккаунта</Button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
