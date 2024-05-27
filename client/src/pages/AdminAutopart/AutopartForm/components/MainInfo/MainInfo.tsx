import { FC, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, NumberInput, Textarea } from '@mantine/core';

import styles from './MainInfo.module.scss';

export interface MainInfoProps {}

export const MainInfo: FC<MainInfoProps> = () => {
  const {
    control,
    formState: { isSubmitSuccessful },
    reset,
  } = useFormContext();

  useEffect(() => {
    reset(undefined);
  }, [isSubmitSuccessful]);

  return (
    <div className={styles.mainInfo}>
      <h2 className={styles.mainInfo__title}>Основная информация</h2>
      <div className={styles.mainInfo__inputs}>
        <div className={styles.info}>
          <Controller
            name="mainInfo.partName"
            control={control}
            render={({ field, fieldState }) => (
              <Input.Wrapper
                label="Название запчасти"
                className={styles.name}
                error={fieldState.error?.message}
              >
                <Input
                  {...field}
                  placeholder="Напишите название запчасти"
                />
              </Input.Wrapper>
            )}
          />
          <Controller
            name="mainInfo.price"
            control={control}
            render={({ field, fieldState }) => (
              <Input.Wrapper
                label="Цена запчасти"
                className={styles.price}
                error={fieldState.error?.message}
              >
                <NumberInput
                  {...field}
                  min={0}
                  suffix=" BYN"
                  placeholder="Напишите цену запчасти"
                />
              </Input.Wrapper>
            )}
          />
          <div className={styles.orderInfo}>
            <Controller
              name="mainInfo.quantity"
              control={control}
              render={({ field, fieldState }) => (
                <Input.Wrapper
                  label="Количество запчастей"
                  className={styles.quantity}
                  error={fieldState.error?.message}
                >
                  <NumberInput
                    {...field}
                    placeholder="Введите количество запчастей"
                    suffix=" шт."
                    min={0}
                  />
                </Input.Wrapper>
              )}
            />
            <Controller
              name="mainInfo.discount"
              control={control}
              render={({ field, fieldState }) => (
                <Input.Wrapper
                  label="Скидка"
                  className={styles.discount}
                  error={fieldState.error?.message}
                >
                  <NumberInput
                    {...field}
                    placeholder="Введите скидку"
                    suffix="%"
                    max={50}
                    min={0}
                  />
                </Input.Wrapper>
              )}
            />
          </div>
        </div>
        <Controller
          name="mainInfo.description"
          control={control}
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              className={styles.description}
              label="Описание запчасти"
              placeholder="Напишите описание запчасти"
              rows={7}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
    </div>
  );
};
