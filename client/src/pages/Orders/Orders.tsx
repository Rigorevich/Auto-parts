import { FC } from 'react';

import styles from './Orders.module.scss';

const Orders: FC = () => {
  return (
    <div className={styles.orders}>
      <div className={styles.orders__container}>Orders</div>
    </div>
  );
};

export default Orders;
