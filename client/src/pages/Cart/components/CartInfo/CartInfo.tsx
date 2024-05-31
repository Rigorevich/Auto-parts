import { FC, useContext, useState } from 'react';
import { Input, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { AuthContext, AuthContextInterface } from '../../../../context/AuthContext';
import { setDataToLocalStorage } from '../../../../utils/localStorage';
import { showSuccessMessage } from '../../../../utils/showSuccessMessage';

import styles from './CartInfo.module.scss';

interface CartInfoProps {}

export const CartInfo: FC<CartInfoProps> = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const { cart, setCart } = useContext(AuthContext) as AuthContextInterface;

  const handleClearCart = () => {
    if (phone) {
      setCart([]);
      setDataToLocalStorage('cart', []);
      setPhone('');
      showSuccessMessage('Заказ оформлен!');
    }
  };

  const totalSum = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalEconomy = cart.reduce((acc, item) => {
    return acc + item.discount * item.quantity;
  }, 0);

  return (
    <div className={styles.cartInfo}>
      <div className={styles.header}>
        <span>Ваша корзина</span>
        <span className={styles.itemsCount}>Товары: {cart.length}</span>
      </div>
      <div className={styles.items}>
        <span>Товары</span>
        <span>{totalSum} BYN</span>
      </div>
      <div className={styles.economy}>
        <span>Экономия</span>
        <span>-{totalEconomy} BYN</span>
      </div>
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalSum - totalEconomy} BYN</span>
      </div>
      <Input.Wrapper
        required
        className={styles.phoneInput}
        label="Введите номер телефона"
      >
        <Input
          placeholder="Номер телефона"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </Input.Wrapper>
      <Button
        className={styles.button}
        size="lg"
        color="orange"
        onClick={handleClearCart}
      >
        Отправить заказ
      </Button>
      <a
        href="#"
        className={styles.return}
        onClick={() => navigate(-1)}
      >
        Вернуться к покупкам
      </a>
    </div>
  );
};
