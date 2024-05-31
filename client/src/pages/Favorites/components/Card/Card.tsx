import { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { ActionIcon, Loader, Rating } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

import noPhotoSrc from '../../../../assets/no-photo.jpg';
import { useGetAutopartById } from '../../../../queries/autoparts.query';

import styles from './Card.module.scss';

interface CardProps {
  autopartId: string;
  onDelete: VoidFunction;
}

const apiUrl = import.meta.env.VITE_STATIC_API_URL;

export const Card: FC<CardProps> = ({ autopartId, onDelete }) => {
  const { autopart, isAutopartLoading } = useGetAutopartById(autopartId);

  if (isAutopartLoading) {
    return <Loader type="dots" />;
  }

  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__image}>
          <LazyLoadImage
            src={autopart?.images && autopart.images?.length > 0 ? `${apiUrl}/${autopart.images[0]}` : noPhotoSrc}
            width={240}
          />
        </div>
        <div className={styles.card__description}>
          <div className={styles.card__name}>
            <Link
              to={`/autoparts/${autopartId}`}
              className={styles.link}
            >
              {autopart?.name}
            </Link>
          </div>
          <ul className={styles.card__attributes}>
            {autopart?.attributes.slice(0, 5).map(({ type, value }, index) => (
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
            value={autopart?.averageRating}
            className={styles.card__rating}
            size="lg"
          />
        </div>
        <ActionIcon
          className={styles.favorite}
          variant="white"
          aria-label="Favorite"
          onClick={onDelete}
        >
          <IconHeart
            fill="#2974ff"
            color="#2974ff"
          />
        </ActionIcon>
      </div>
    </div>
  );
};
