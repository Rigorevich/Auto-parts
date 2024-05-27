import { FC } from 'react';
import Swiper from 'react-slick';
import classNames from 'classnames';

import noPhotoSrc from '../../../assets/no-photo.jpg';

import styles from './Slider.module.scss';

interface ArrowProps {
  onClick?: VoidFunction;
  className?: string;
}

interface SliderProps {
  files: File[];
}

interface SliderImagesProps {
  images?: string[];
}

const apiUrl = import.meta.env.VITE_STATIC_API_URL;

const NextArrow: FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div
      className={classNames(className, styles.arrow)}
      onClick={onClick}
    />
  );
};

const PrevArrow: FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div
      className={classNames(className, styles.arrow)}
      onClick={onClick}
    />
  );
};

export const Slider: FC<SliderProps> = ({ files }) => {
  const settings = {
    infinite: files.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    files.length > 0 && (
      <Swiper
        className={styles.swiper}
        {...settings}
      >
        {files.map((file, index) => (
          <div
            key={index}
            className={styles.slide}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Изображение ${index}`}
            />
          </div>
        ))}
      </Swiper>
    )
  );
};

export const SliderImages: FC<SliderImagesProps> = ({ images }) => {
  const settings = {
    infinite: images && images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (images?.length === 0) {
    return (
      <img
        style={{ width: '500px' }}
        src={noPhotoSrc}
        alt="Изображение"
      />
    );
  }

  return (
    <Swiper
      className={styles.swiper}
      {...settings}
    >
      {images?.map((image, index) => (
        <div
          key={index}
          className={styles.slide}
        >
          <img
            src={`${apiUrl}/${image}`}
            alt={`Изображение ${index}`}
          />
        </div>
      ))}
    </Swiper>
  );
};
