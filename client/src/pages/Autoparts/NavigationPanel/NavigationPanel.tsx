import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Card } from '../../../components/ui/Card/Card';
import { Subcategory } from '../../../api/catalogs';

import styles from './NavigationPanel.module.scss';

const apiUrl = import.meta.env.VITE_STATIC_API_URL;

export interface NavigationPanelProps {
  options?: Subcategory[];
}

export const NavigationPanel: FC<NavigationPanelProps> = ({ options = [] }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <div className={styles.navigationPanel}>
      {options.map((option) => {
        const imagePath = `${apiUrl}/${option.image_path}`;
        const route = `/autoparts`;

        const cardOption = {
          image: imagePath,
          name: option.name,
        };

        return (
          <Card
            key={option.id}
            className={classNames(styles.navigationPanel__card, {
              [styles.active]: searchParams.get('subcategoryId') === `${option.id}`,
            })}
            option={cardOption}
            onClick={() =>
              navigate({
                pathname: route,
                search: `?categoryId=${option.category_id}&subcategoryId=${option.id}`,
              })
            }
          />
        );
      })}
    </div>
  );
};
