import { FC, useEffect, useState } from 'react';
import { FileButton, Button, Input } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { IconPhotoScan } from '@tabler/icons-react';

import { Slider } from '../../../../../components/ui/Slider/Slider';

import styles from './Attributes.module.scss';

type AttributeFields = {
  type: string;
  value: string;
};

const initialAttributeFields: AttributeFields = { type: '', value: '' };

export const Attributes: FC = () => {
  const {
    setValue,
    formState: { isSubmitSuccessful },
    reset,
  } = useFormContext();
  const [images, setImages] = useState<File[]>([]);
  const [attributes, setAttributes] = useState<AttributeFields[]>([]);
  const [attributeFields, setAttributeFields] = useState<AttributeFields>(initialAttributeFields);

  const handleChangeFiles = (payload: File[]) => {
    setImages(payload);
    setValue('attributes.images', payload);
  };

  const handleAddAttribute = () => {
    if (attributeFields.type && attributeFields.value) {
      const updatedAttributes = [...attributes, attributeFields];

      setAttributes(updatedAttributes);
      setAttributeFields(initialAttributeFields);
    }
  };

  const handleDeleteAttribute = (type: string) => {
    const filteredAttributes = attributes.filter((attr) => attr.type !== type);

    setAttributes(filteredAttributes);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setAttributes([]);
      setAttributeFields(initialAttributeFields);
      reset(undefined);
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    setValue('attributes.attributes', attributes);
    setValue('attributes.images', images);
  }, [attributes, images]);

  return (
    <div className={styles.attributes}>
      <h2 className={styles.attributes__title}>Изображения и характеристики</h2>
      <div className={styles.attributes__block}>
        <div className={styles.images}>
          <Slider files={images} />
          <FileButton
            onChange={handleChangeFiles}
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
          {attributes.length > 0 && (
            <ul className={styles.attributes__list}>
              {attributes.map((attribute, index) => (
                <li
                  className={styles.attributes__item}
                  key={`${attribute.type}-${index}`}
                >
                  <span className={styles.attribute}>{attribute.type}</span>
                  <span className={styles.dots}></span>
                  <span className={styles.attributeValue}>{attribute.value}</span>
                  <Button
                    size="compact-xs"
                    onClick={() => handleDeleteAttribute(attribute.type)}
                  >
                    Удалить
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.attributes__save}>
            <Input
              className={styles.type}
              value={attributeFields.type}
              onChange={(event) => setAttributeFields((prev) => ({ ...prev, type: event.target.value }))}
              size="xs"
              radius="md"
              placeholder="Характеристика"
            />
            <Input
              className={styles.value}
              value={attributeFields.value}
              onChange={(event) => setAttributeFields((prev) => ({ ...prev, value: event.target.value }))}
              size="xs"
              radius="md"
              placeholder="Значение"
            />
            <Button
              onClick={handleAddAttribute}
              size="xs"
            >
              Добавить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
