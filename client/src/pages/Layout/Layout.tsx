import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../../components/layout/Header/Header';

import styles from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
