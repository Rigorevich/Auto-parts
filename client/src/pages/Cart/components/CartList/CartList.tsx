import { FC, useContext } from 'react';

import { AuthContext, AuthContextInterface } from '../../../../context/AuthContext';

import { Card } from './components/Card/Card';

import styles from './CartList.module.scss';

export const CartList: FC = () => {
  const { cart, setCart } = useContext(AuthContext) as AuthContextInterface;

  return (
    <div className={styles.cartList}>
      {cart.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          quantity={item.quantity}
          setCart={setCart}
          cart={cart}
        />
      ))}
    </div>
  );
};
