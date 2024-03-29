import { ComponentProps, FC } from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

export interface InputProps extends ComponentProps<'input'> {
  label?: string;
  description?: string;
  status?: 'error' | 'success';
}

export const Input: FC<InputProps> = ({ className, label, description, status, ...props }) => {
  return (
    <label className={styles.input__label}>
      {label && <span className={styles.input__content}>{label}</span>}
      <input
        className={classNames(className, styles.input__field, styles[`${status}`])}
        {...props}
      />
      {description && <span className={classNames(styles.input__description, styles[`${status}`])}>{description}</span>}
    </label>
  );
};
