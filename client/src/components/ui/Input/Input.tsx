import { ComponentProps, FC } from 'react';
import { UseFormRegister } from 'react-hook-form';
import classNames from 'classnames';

import styles from './Input.module.scss';

export interface InputProps extends ComponentProps<'input'> {
  register?: UseFormRegister<any>;
  label?: string;
  description?: string;
  status?: 'error' | 'success';
}

export const Input: FC<InputProps> = ({
  name = 'input',
  className,
  label,
  description,
  register,
  status,
  ...props
}) => {
  return (
    <label className={styles.input__label}>
      {label && <span className={styles.input__content}>{label}</span>}
      <input
        className={classNames(className, styles.input__field, styles[`${status}`])}
        {...register?.(name)}
        {...props}
      />
      {status && description && (
        <span className={classNames(styles.input__description, styles[`${status}`])}>{description}</span>
      )}
    </label>
  );
};
