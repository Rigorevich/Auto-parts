import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './Counter.module.scss';

interface CounterProps {
  className?: string;
  availableQuantity: number;
  onChange?: (quantity: number) => void;
}

export const Counter: FC<CounterProps> = ({ availableQuantity, onChange, className }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChangeCounter = (type: 'increment' | 'decrement') => {
    if (type === 'increment' && quantity < availableQuantity) {
      setQuantity(quantity + 1);
      onChange?.(quantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
      onChange?.(quantity - 1);
    }
  };

  return (
    <div className={classNames(styles.counter, className)}>
      <button
        className={styles.button}
        onClick={() => handleChangeCounter('decrement')}
      >
        -
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button
        className={styles.button}
        onClick={() => handleChangeCounter('increment')}
      >
        +
      </button>
    </div>
  );
};
