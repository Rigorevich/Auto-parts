import { FC, useContext } from 'react';

import { AuthContext, AuthContextInterface } from '../../context/AuthContext';

import { CartInfo } from './components/CartInfo/CartInfo';
import { CartList } from './components/CartList/CartList';

import styles from './Cart.module.scss';

const Cart: FC = () => {
  const { cart } = useContext(AuthContext) as AuthContextInterface;

  return (
    <div className={styles.cart}>
      <div className={styles.cart__container}>
        {!cart.length ? (
          <h2 className={styles.noContent}>Корзина пуста</h2>
        ) : (
          <>
            <CartList />
            <CartInfo />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
