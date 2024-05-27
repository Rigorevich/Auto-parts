import { FC } from 'react';

import styles from './AutopartDescription.module.scss';

interface AutopartDescriptionProps {
  description?: string;
}

export const AutopartDescription: FC<AutopartDescriptionProps> = ({ description }) => {
  return (
    <div className={styles.autopart__description}>
      <h3 className={styles.title}>Описание</h3>
      <div className={styles.description}>{description}</div>
    </div>
  );
};
