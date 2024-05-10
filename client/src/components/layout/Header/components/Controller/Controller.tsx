import { Link } from 'react-router-dom';
import { ActionIcon, Tooltip } from '@mantine/core';

import { CONTROLLER_ITEMS } from '../../constants/controller';

import styles from './Controller.module.scss';

export const Controller = () => (
  <div className={styles.controller}>
    {CONTROLLER_ITEMS.map(({ icon, tooltipLabel, route }) => (
      <Link
        to={route}
        key={tooltipLabel}
      >
        <Tooltip label={tooltipLabel}>
          <ActionIcon variant="transparent">{icon}</ActionIcon>
        </Tooltip>
      </Link>
    ))}
  </div>
);
