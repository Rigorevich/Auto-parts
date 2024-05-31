import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ActionIcon, Loader } from '@mantine/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IconTrash } from '@tabler/icons-react';

import noPhotoSrc from '../../../../../../assets/no-photo.jpg';
import { Cart } from '../../../../../../context/AuthContext';
import { useGetAutopartById } from '../../../../../../queries/autoparts.query';
import { setDataToLocalStorage } from '../../../../../../utils/localStorage';

import styles from './Card.module.scss';

interface CardProps {
  id: string;
  quantity: number;
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
}

const apiUrl = import.meta.env.VITE_STATIC_API_URL;

export const Card: FC<CardProps> = ({ id, quantity, cart, setCart }) => {
  const { autopart, isAutopartLoading } = useGetAutopartById(id);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleChangeCounter = (type: 'increment' | 'decrement') => {
    if (type === 'increment' && currentQuantity < Number(autopart?.quantity)) {
      setCurrentQuantity(currentQuantity + 1);

      const updatedCart = cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: currentQuantity + 1,
            }
          : item
      );
      setCart(updatedCart);
      setDataToLocalStorage('cart', updatedCart);
    } else if (type === 'decrement' && currentQuantity > 1) {
      setCurrentQuantity(currentQuantity - 1);

      const updatedCart = cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: currentQuantity - 1,
            }
          : item
      );
      setCart(updatedCart);
      setDataToLocalStorage('cart', updatedCart);
    }
  };

  const handleDelete = () => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    setDataToLocalStorage('cart', updatedCart);
  };

  if (isAutopartLoading) {
    return <Loader type="dots" />;
  }

  return (
    <div className={styles.card}>
      <LazyLoadImage
        className={styles.productImage}
        src={autopart?.images && autopart.images?.length > 0 ? `${apiUrl}/${autopart.images[0]}` : noPhotoSrc}
        width={120}
      />
      <div className={styles.productDetails}>
        <div className={styles.productName}>{autopart?.name}</div>
        {autopart?.attributes.map((attr) => (
          <>
            <div className={styles.productAttr}>
              {attr.type}: {attr.value}
            </div>
          </>
        ))}
      </div>
      <div className={styles.quantityControl}>
        <button
          className={styles.quantityButton}
          onClick={() => handleChangeCounter('decrement')}
        >
          -
        </button>
        <span>{currentQuantity}</span>
        <button
          className={styles.quantityButton}
          onClick={() => handleChangeCounter('increment')}
        >
          +
        </button>
      </div>
      <div className={styles.priceInfo}>
        <div className={styles.newPrice}>{Number(autopart?.price) * currentQuantity} BYN</div>
        <div>{autopart?.price} BYN/шт.</div>
      </div>
      <ActionIcon
        className={styles.trashIcon}
        color="red"
        variant="transparent"
        onClick={handleDelete}
      >
        <IconTrash />
      </ActionIcon>
    </div>
  );
};
