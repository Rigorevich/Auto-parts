import { FC, useContext } from 'react';
import { Input, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Yup from 'yup';

import { AuthContext, AuthContextInterface } from '../../../../context/AuthContext';
import { setDataToLocalStorage } from '../../../../utils/localStorage';
import { showSuccessMessage } from '../../../../utils/showSuccessMessage';
import { orderCreateSchema } from '../../../../utils/validationForms';

import styles from './CartInfo.module.scss';

interface CartInfoProps {}

type FormValue = Yup.InferType<typeof orderCreateSchema>;

export const CartInfo: FC<CartInfoProps> = () => {
  const navigate = useNavigate();
  const { accountData, cart, setCart } = useContext(AuthContext) as AuthContextInterface;
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: yupResolver(orderCreateSchema),
    defaultValues: {
      phone: accountData?.phone_number,
    },
  });

  const handleSubmitForm = (formValue: FormValue) => {
    setCart([]);
    setDataToLocalStorage('cart', []);
    showSuccessMessage('Заказ оформлен!');
  };

  const totalSum = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalEconomy = cart.reduce((acc, item) => {
    return acc + item.discount * item.quantity;
  }, 0);

  return (
    <form
      className={styles.cartInfo}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
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
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Input.Wrapper
            label="Введите номер телефона"
            className={styles.phoneInput}
            error={fieldState.error?.message}
          >
            <Input
              {...field}
              placeholder="Номер телефона"
            />
          </Input.Wrapper>
        )}
      />
      <Button
        type="submit"
        className={styles.button}
        size="lg"
        color="orange"
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
    </form>
  );
};
