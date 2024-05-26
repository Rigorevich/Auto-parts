import { FC, useContext } from 'react';
import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';

import { NoCarIcon } from '../../components/ui/Icons/Icons';
import { Filter } from '../../components/layout/Filter/Filter';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';

import { MyCar } from './MyCar/MyCar';

import styles from './MyCars.module.scss';

const MyCars: FC = () => {
  const { cars, setCars } = useContext(AuthContext) as AuthContextInterface;

  const handleDelete = (modificationId: string) => {
    modals.openConfirmModal({
      title: 'Вы уверены?',
      centered: true,
      labels: {
        cancel: 'Отмена',
        confirm: 'Удалить',
      },
      onConfirm: () => {
        const updatedCars = cars.filter((mod) => mod.id !== modificationId);

        setCars(updatedCars);
        localStorage.setItem('modifications', JSON.stringify(updatedCars));
      },
    });
  };

  const handleChange = (modificationId: string) => {
    const updatedCars = cars.map((car) => ({ ...car, active: modificationId === car.id }));

    setCars(updatedCars);
    localStorage.setItem('modifications', JSON.stringify(updatedCars));
  };

  const handleAddCar = () => {
    modals.open({
      centered: true,
      size: '100%',
      children: (
        <Filter
          buttonLabel="Добавить"
          onDestroy={() => modals.closeAll()}
        />
      ),
    });
  };

  return (
    <section className={styles.myCars}>
      <div className={styles.myCars__container}>
        <div className={styles.myCars__content}>
          {cars.length ? (
            <ul className={styles.myCars__list}>
              {cars?.map((mod) => (
                <MyCar
                  key={mod.id}
                  modificationId={mod.id}
                  active={mod.active}
                  onDelete={() => handleDelete(mod.id)}
                  onChange={() => handleChange(mod.id)}
                />
              ))}
            </ul>
          ) : (
            <div className={styles.noContent}>
              <NoCarIcon className={styles.noContent__image} />
              <div className={styles.noContent__description}>Нет сохраненных автомобилей</div>
            </div>
          )}
          <Button
            className={styles.myCars__add}
            color="orange"
            onClick={handleAddCar}
            leftSection={<IconPlus />}
          >
            Добавить авто
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MyCars;
