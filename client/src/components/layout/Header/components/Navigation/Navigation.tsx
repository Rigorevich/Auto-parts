import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Navigation.module.scss';

interface NavigationOption {
  label: string;
  value: string;
  route: string;
}

interface NavigationProps {
  options: NavigationOption[];
}

export const Navigation: FC<NavigationProps> = ({ options }) => {
  return (
    <nav className={styles.navigation}>
      {options?.map(({ label, value, route }) => (
        <NavLink
          key={value}
          to={route}
          className={({ isActive }) =>
            classNames(styles.navigation__link, {
              [styles.active]: isActive,
            })
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
