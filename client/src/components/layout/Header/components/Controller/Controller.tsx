import { Link } from 'react-router-dom';
import { ActionIcon, Tooltip } from '@mantine/core';

import { CONTROLLER_ITEMS } from '../../constants/controller';

import styles from './Controller.module.scss';

export const Controller = ({ cartCount }: { cartCount: number }) => (
  <div className={styles.controller}>
    {CONTROLLER_ITEMS.map(({ icon, tooltipLabel, route }) => (
      <Link
        to={route}
        key={tooltipLabel}
        className={styles.link}
      >
        {tooltipLabel === 'Корзина' && !!cartCount && <span className={styles.badge}>{cartCount}</span>}
        <Tooltip label={tooltipLabel}>
          <ActionIcon variant="transparent">{icon}</ActionIcon>
        </Tooltip>
      </Link>
    ))}
  </div>
);
