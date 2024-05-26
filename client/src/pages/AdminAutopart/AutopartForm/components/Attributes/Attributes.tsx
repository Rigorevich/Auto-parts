import { FC, useState } from 'react';
import { FileButton, Button, Input } from '@mantine/core';
import { IconPhotoScan } from '@tabler/icons-react';

import { Slider } from '../../../../../components/ui/Slider/Slider';

import styles from './Attributes.module.scss';

export const Attributes: FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className={styles.attributes}>
      <h2 className={styles.attributes__title}>Изображения и характеристики</h2>
      <div className={styles.attributes__block}>
        <div className={styles.images}>
          <Slider files={files} />
          <FileButton
            onChange={setFiles}
            accept="image/png,image/jpeg,image/webp"
            multiple
          >
            {(props) => (
              <Button
                {...props}
                leftSection={<IconPhotoScan />}
                className={styles.uploadButton}
              >
                Загрузить фотографии
              </Button>
            )}
          </FileButton>
        </div>
        <div className={styles.attributes}>
          <ul className={styles.attributes__list}>
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
          <div className={styles.attributes__save}>
            <Input
              className={styles.type}
              size="xs"
              radius="md"
              placeholder="Характеристика"
            />
            <Input
              className={styles.value}
              size="xs"
              radius="md"
              placeholder="Значение"
            />
            <Button size="xs">Добавить</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
