import { FC } from 'react';
import Swiper from 'react-slick';
import classNames from 'classnames';

import styles from './Slider.module.scss';

interface ArrowProps {
  onClick?: VoidFunction;
  className?: string;
}

interface SliderProps {
  files: File[];
}

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
    infinite: true,
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
              src={URL.createObjectURL(files[index])}
              alt={`Изображение ${index}`}
            />
          </div>
        ))}
      </Swiper>
    )
  );
};
