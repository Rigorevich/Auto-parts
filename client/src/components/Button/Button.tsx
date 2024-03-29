import { ComponentProps, FC } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

export type ButtonSizes = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'size'> {
  size?: ButtonSizes;
}

export const Button: FC<ButtonProps> = ({ size = 'medium', children, className, ...props }) => {
  return (
    <button
      className={classNames(className, styles.button, styles[size])}
      {...props}
    >
      {children}
    </button>
  );
};
