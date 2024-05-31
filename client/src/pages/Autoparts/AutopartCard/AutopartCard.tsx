import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import noPhotoSrc from '../../../assets/no-photo.jpg';
import { Autopart } from '../../../api/autoparts';

import { OrderContent } from './components/OrderContent/OrderContent';

import styles from './AutopartCard.module.scss';

export interface AutopartCardProps {
  autopart: Autopart;
}

const apiUrl = import.meta.env.VITE_STATIC_API_URL;

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
        <OrderContent autopart={autopart} />
      </div>
    </div>
  );
};
