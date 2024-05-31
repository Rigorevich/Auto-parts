import { FC, useContext, useState } from 'react';
import { Button } from '@mantine/core';

import { Counter } from '../../../../../components/ui/Counter/Counter';
import { Autopart } from '../../../../../api/autoparts';
import { ShoppingCartIcon } from '../../../../../components/ui/Icons/Icons';
import { setDataToLocalStorage } from '../../../../../utils/localStorage';
import { AuthContext, AuthContextInterface } from '../../../../../context/AuthContext';

import styles from './OrderContent.module.scss';

export interface OrderContentProps {
  autopart: Autopart;
}

export const OrderContent: FC<OrderContentProps> = ({ autopart }) => {
  const { cart, setCart } = useContext(AuthContext) as AuthContextInterface;
  const [quantity, setQuantity] = useState(1);

  const isInCart = cart.some((item) => item.id === autopart.id);

  const handleAddToCart = () => {
    if (autopart.id) {
      const updatedCart = isInCart
        ? cart.filter((item) => item.id !== autopart.id)
        : [...cart, { id: autopart.id, quantity, discount: +autopart.discount || 0, price: +autopart.price }];

      setCart(updatedCart);
      setDataToLocalStorage('cart', updatedCart);
    }
  };

  const handleChangeQuantity = (quantity: number) => {
    if (!isInCart) {
      return setQuantity(quantity);
    }

    const updatedCart = cart.map((item) => (item.id === autopart.id ? { ...item, quantity } : item));

    setCart(updatedCart);
    setDataToLocalStorage('cart', updatedCart);
  };

  return (
    <div className={styles.orderContent}>
      <div className={styles.price}>
        {autopart.price} <span>BYN/шт</span>
      </div>
      <Counter
        availableQuantity={Number(autopart.quantity)}
        onChange={handleChangeQuantity}
      />
      <div className={styles.register}>
        <Button
          color={isInCart ? 'green' : 'orange'}
          size="md"
          className={styles.inCart}
          leftSection={<ShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          {isInCart ? 'В корзине' : 'В корзину'}
        </Button>
        <Button
          size="xs"
          color="lime"
          className={styles.update}
        >
          Редактировать
        </Button>
        <span className={styles.availabel}>Доступно: {autopart.quantity}</span>
        {!!Number(autopart.discount) && (
          <span className={styles.text}>
            Скидка: <span>{autopart.discount}%</span>
          </span>
        )}
      </div>
    </div>
  );
};
