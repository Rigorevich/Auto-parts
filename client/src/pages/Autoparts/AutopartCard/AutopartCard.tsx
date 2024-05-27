import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Rating } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import noPhotoSrc from '../../../assets/no-photo.jpg';
import { Counter } from '../../../components/ui/Counter/Counter';
import { ShoppingCartIcon } from '../../../components/ui/Icons/Icons';
import { Autopart } from '../../../api/autoparts';

import styles from './AutopartCard.module.scss';

export interface AutopartCardProps {
  autopart: Autopart;
}

const apiUrl = import.meta.env.VITE_STATIC_API_URL;

export const AutopartCardOrders: FC<AutopartCardProps> = ({ autopart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.autopartCard__orders}>
      <div className={styles.orders__price}>
        {autopart.price} <span>BYN/шт</span>
      </div>
      <Counter
        availableQuantity={Number(autopart.quantity)}
        onChange={setQuantity}
      />
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
        <span className={styles.orders__availabel}>Доступно: {autopart.quantity}</span>
        {!!Number(autopart.discount) && (
          <span className={styles.orders__discount}>
            Скидка: <span>{autopart.discount}%</span>
          </span>
        )}
      </div>
    </div>
  );
};

export const AutopartCard: FC<AutopartCardProps> = ({ autopart }) => {
  return (
    <div className={styles.autopartCard}>
      <div className={styles.autopartCard__container}>
        <div className={styles.autopartCard__image}>
          <LazyLoadImage
            src={autopart.image ? `${apiUrl}/${autopart.image}` : noPhotoSrc}
            width={280}
          />
        </div>
        <div className={styles.autopartCard__description}>
          <div className={styles.autopartCard__name}>
            <Link
              to={`/autoparts/${autopart.id}`}
              className={styles.link}
            >
              {autopart.name}
            </Link>
          </div>
          <ul className={styles.autopartCard__attributes}>
            {autopart.attributes.slice(0, 5).map(({ type, value }, index) => (
              <li
                className={styles.attributes__item}
                key={`${type}-${index}`}
              >
                <span className={styles.attribute}>{type}</span>
                <span className={styles.dots}></span>
                <span className={styles.attributeValue}>{value}</span>
              </li>
            ))}
          </ul>
          <Rating
            readOnly
            value={autopart.averageRating}
            className={styles.autopartCard__rating}
            size="lg"
          />
        </div>
        <AutopartCardOrders autopart={autopart} />
      </div>
    </div>
  );
};
