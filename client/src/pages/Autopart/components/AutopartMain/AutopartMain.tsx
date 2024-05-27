import { FC } from 'react';
import { IconShoppingCart } from '@tabler/icons-react';
import { Button } from '@mantine/core';

import { Attribute } from '../../../../api/autoparts';
import { SliderImages } from '../../../../components/ui/Slider/Slider';
import { Counter } from '../../../../components/ui/Counter/Counter';

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
          <Counter availableQuantity={Number(quantity)} />
          <Button
            color="orange"
            leftSection={<IconShoppingCart />}
          >
            Оформить
          </Button>
        </div>
      </div>
    </div>
  );
};
