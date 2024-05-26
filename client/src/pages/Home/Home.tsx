import { useContext } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { modals } from '@mantine/modals';

import { Car } from '../../components/layout/Car/Car';
import { Filter } from '../../components/layout/Filter/Filter';
import { Card, CardAddItem } from '../../components/ui/Card/Card';
import { useCreateCatalog, useGetAllCategories } from '../../queries/catalogs.query';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';
import { CatalogForm } from '../../components/layout/Catalog/CatalogForm';

import styles from './Home.module.scss';

const apiUrl = import.meta.env.VITE_STATIC_API_URL;

const Home = () => {
  const { accountData, cars } = useContext(AuthContext) as AuthContextInterface;
  const { categories, isCategoriesLoading, refetchCategories } = useGetAllCategories();
  const { createCatalog, isPending } = useCreateCatalog(refetchCategories);

  const activeCar = cars?.find((car) => car.active);

  const navigate = useNavigate();

  const handleAddCatalog = () => {
    modals.open({
      centered: true,
      size: 'lg',
      children: (
        <CatalogForm
          onSubmit={(formValue) => {
            modals.closeAll();
            createCatalog({ name: formValue.name, image: formValue.image[0] });
          }}
        />
      ),
    });
  };

  if (isCategoriesLoading || isPending) {
    <LoadingOverlay
      visible
      zIndex={1000}
      overlayProps={{ radius: 'md' }}
    />;
  }

  return (
    <main className={styles.home}>
      <div className={styles.home__container}>
        {activeCar ? <Car modificationId={activeCar.id} /> : <Filter />}
        <h1 className={styles.catalog__title}>Категории автозапчастей</h1>
        <div className={styles.catalog}>
          <div className={styles.catalog__list}>
            {categories?.map((category) => {
              const imagePath = `${apiUrl}/${category.image_path}`;
              const route = `/category/${category.id}`;

              return (
                <Card
                  key={category.id}
                  onClick={() => navigate(route)}
                  className={styles.catalog__card}
                  option={{
                    name: category.name,
                    image: imagePath,
                  }}
                />
              );
            })}
            {accountData?.role === 1 && <CardAddItem onAdd={handleAddCatalog} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
