import { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconShoppingCart } from '@tabler/icons-react';
import { Button } from '@mantine/core';

import { Attribute } from '../../../../api/autoparts';
import { SliderImages } from '../../../../components/ui/Slider/Slider';
import { Counter } from '../../../../components/ui/Counter/Counter';
import { AuthContext, AuthContextInterface } from '../../../../context/AuthContext';
import { setDataToLocalStorage } from '../../../../utils/localStorage';

import styles from './AutopartMain.module.scss';

export interface AutopartMainProps
  extends Partial<{
    images: string[];
    attributes: Attribute[];
    price: string;
    discount: string;
    quantity: string;
  }> {}

export const AutopartMain: FC<AutopartMainProps> = ({ images, attributes, price, discount, quantity }) => {
  const { id } = useParams();
  const { cart, setCart } = useContext(AuthContext) as AuthContextInterface;
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const isInCart = cart.some((item) => item.id === id);

  const handleAddToCart = () => {
    if (id) {
      const updatedCart = isInCart
        ? cart.filter((item) => item.id !== id)
        : [
            ...cart,
            {
              id,
              quantity: currentQuantity,
              discount: discount ? +discount : 0,
              price: price ? +price : 0,
            },
          ];

      setCart(updatedCart);
      setDataToLocalStorage('cart', updatedCart);
    }
  };

  return (
    <div className={styles.autopart__main}>
      <div className={styles.images}>
        <SliderImages images={images} />
      </div>
      <div className={styles.attributes}>
        <ul className={styles.list}>
          {attributes?.map((attribute, index) => (
            <li
              className={styles.item}
              key={`${attribute.type}-${index}`}
            >
              <span className={styles.attribute}>{attribute.type}</span>
              <span className={styles.dots}></span>
              <span className={styles.attributeValue}>{attribute.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <div className={styles.discount}>{discount}%</div>
          <div className={styles.price}>{price} BYN/шт.</div>
        </div>
        <div className={styles.hero}>{price} BYN/шт.</div>
        <div className={styles.quantity}>
          <span>Доступно:</span>
          <span>{quantity} шт.</span>
        </div>
        <div className={styles.order}>
          <Counter
            availableQuantity={Number(quantity)}
            onChange={setCurrentQuantity}
          />
          <Button
            color={isInCart ? 'green' : 'orange'}
            leftSection={<IconShoppingCart />}
            onClick={handleAddToCart}
          >
            {isInCart ? 'В корзине' : 'В корзину'}
          </Button>
        </div>
      </div>
    </div>
  );
};
