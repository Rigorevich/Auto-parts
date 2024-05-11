import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/Sidebar/Sidebar';

import styles from './Profile.module.scss';

const Profile = () => {
  return (
    <main className={styles.profile}>
      <div className={styles.profile__container}>
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
};

export default Profile;
