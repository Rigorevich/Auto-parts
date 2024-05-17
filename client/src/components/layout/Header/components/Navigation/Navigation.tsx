import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { useGetAllCategories } from '../../../../../queries/catalogs.query';

import styles from './Navigation.module.scss';

interface NavigationOption {
  label: string;
  value: string;
  route: string;
}

interface NavigationProps {
  options?: NavigationOption[];
}

export const Navigation: FC<NavigationProps> = () => {
  const { categories } = useGetAllCategories();

  return (
    <nav className={styles.navigation}>
      {categories?.map(({ id, name }) => {
        const route = `/category/${id}`;

        return (
          <NavLink
            key={id}
            to={route}
            className={({ isActive }) =>
              classNames(styles.navigation__link, {
                [styles.active]: isActive,
              })
            }
          >
            {name}
          </NavLink>
        );
      })}
    </nav>
  );
};
