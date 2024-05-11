import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LogoIcon } from '../../ui/Icons/Icons';
import { AuthContext, AuthContextInterface } from '../../../context/AuthContext';
import { PAGES } from '../../../constants/pages';

import { NAVIGATION_OPTIONS } from './constants/navigation';
import { Navigation } from './components/Navigation/Navigation';
import { Controller } from './components/Controller/Controller';
import { SearchPanel } from './components/SearchPanel/SearchPanel';

import styles from './Header.module.scss';

export const Header = () => {
  const { isUserLogged } = useContext(AuthContext) as AuthContextInterface;

  const handleSearch = () => {};

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__content}>
          <Link to={PAGES.ROOT}>
            <LogoIcon />
          </Link>
          <SearchPanel onSearch={handleSearch} />
          <Controller />
        </div>
        <div className={styles.header__navigation}>
          <Navigation options={NAVIGATION_OPTIONS} />
        </div>
      </div>
    </header>
  );
};
