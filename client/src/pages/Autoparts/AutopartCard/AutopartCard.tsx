import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Rating } from '@mantine/core';

import { ShoppingCartIcon } from '../../../components/ui/Icons/Icons';

import styles from './AutopartCard.module.scss';

export const AutopartCardOrders: FC = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.autopartCard__orders}>
      <div className={styles.orders__price}>
        61.60 <span>BYN/шт</span>
      </div>
      <div className={styles.orders__quantity}>
        <button
          className={styles.quantity__button}
          onClick={() => setQuantity(quantity - 1)}
        >
          -
        </button>
        <span className={styles.quantity}>{quantity}</span>
        <button
          className={styles.quantity__button}
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <div className={styles.orders__register}>
        <Button
          color="orange"
          size="md"
          className={styles.button__order}
          leftSection={<ShoppingCartIcon />}
        >
          Оформить
        </Button>
        <Button
          size="xs"
          color="lime"
          className={styles.button__update}
        >
          Редактировать
        </Button>
        <span className={styles.orders__availabel}>Доступно: 5 шт</span>
        <span className={styles.orders__discount}>Скидка: -5%</span>
      </div>
    </div>
  );
};

export const AutopartCard: FC = () => {
  return (
    <div className={styles.autopartCard}>
      <div className={styles.autopartCard__container}>
        <div className={styles.autopartCard__image}>
          <Image src="https://i.pinimg.com/564x/c8/eb/aa/c8ebaab9543e844ecf97aba72f75fe62.jpg" />
        </div>
        <div className={styles.autopartCard__description}>
          <div className={styles.autopartCard__name}>
            <Link
              to="#"
              className={styles.link}
            >
              Тормозной диск A.B.S. 17520
            </Link>
          </div>
          <ul className={styles.autopartCard__attributes}>
            {[...new Array(5)].map((_, index) => (
              <li
                className={styles.attributes__item}
                key={index}
              >
                <span className={styles.attribute}>Характеристика</span>
                <span className={styles.dots}></span>
                <span className={styles.attributeValue}>Значение</span>
              </li>
            ))}
          </ul>
          <Rating
            className={styles.autopartCard__rating}
            defaultValue={5}
            size="lg"
          />
        </div>
        <AutopartCardOrders />
      </div>
    </div>
  );
};
